.. include:: /substitutions.rsti

Advanced pfSense Settings
=========================

The advanced settings available under **System > Advanced** do not
normally need adjusting on a typical setup. There are there for
additional tweaking or for those who need the functionality given.

The options available are all described in detail on their individual
pages, but are split into separate tabs.

Admin Access
------------

Contains settings for the WebGUI such as the protocol (HTTP/HTTPS) and
port, security settings for management, SSH daemon settings, Serial
console settings, and console options.

Firewall/NAT
------------

Contains settings that tweak the behavior of the firewall, such as
fragmentation, optimization algorithms, and state table settings.

Also has the settings for NAT Reflection.

The FreeBSD documentation is a bit unspecific when it comes to the PF
optimization algorithms. Here are the actual values which are chosen for
each optimization algorithm (taken from the source code, first line is
raw value, second line is human readable form):

+----------------------+-----------+------------------+----------------+--------------+
|                      | Normal    | High Latency     | Conservative   | Aggressive   |
+======================+===========+==================+================+==============+
| | tcp.first          | | 60      | | 180            | | 3600         | | 30         |
| | First TCP packet   | | 1min    | | 3min           | | 60min        | | 30sec      |
+----------------------+-----------+------------------+----------------+--------------+
| | tcp.opening        | | 30      | | 35             | | 900          | | 5          |
| | No response yet    | | 30sec   | | 35sec          | | 15min        | | 5sec       |
+----------------------+-----------+------------------+----------------+--------------+
| | tcp.established    | | 86400   | | 86400          | | 432000       | | 18000      |
| | Established        | | 24h     | | 24h            | | 5days        | | 5h         |
+----------------------+-----------+------------------+----------------+--------------+
| | tcp.closing        | | 900     | | 905            | | 3600         | | 60         |
| | Half closed        | | 15min   | | 15min + 5sec   | | 1h           | | 60sec      |
+----------------------+-----------+------------------+----------------+--------------+
| | tcp.finwait        | | 45      | | 50             | | 600          | | 30         |
| | Got both FINs      | | 45sec   | | 50sec          | | 10min        | | 30sec      |
+----------------------+-----------+------------------+----------------+--------------+
| | tcp.closed         | | 90      | | 95             | | 180          | | 30         |
| | Got an RST         | | 90sec   | | 95sec          | | 3min         | | 30sec      |
+----------------------+-----------+------------------+----------------+--------------+
| | tcp.tsdiff         | | 30      | | 60             | | 60           | | 10         |
| | Allowed TS diff    | | 30sec   | | 60sec          | | 60sec        | | 10sec      |
+----------------------+-----------+------------------+----------------+--------------+

The optimization algorithm satellite is an alias for high-latency; it is
therefore not available in the pfSense GUI.

**Firewall Maximum States** controls the number of concurrent
connections which can be tracked by the firewall. The rule of thumb is
that one state table entry roughly consumes 1kB of kernel RAM. For an
**i386** version of pfSense, some special restrictions apply, as the
kernel address space is limited to 1GB. Exceeding that value will cause
a kernel panic and should therefore be avoided at all cost. While more
than 1,200,000 state table entries have been achieved on a i386 machine
with 2GB of physical RAM, a safe Firewall Maximum States setting would
be 1,000,000 (one million states). There is no 1GB kernel address space
limit on the AMD64 (x86-64) versions so higher values may be used on
that architecture.

When the state table is full, no further connections will be accepted
until existing connections are dropped from the state table. The
firewall will not prematurely force active entries out of the table (no
existing connection will be dropped in favor of new ones). However, the
**Firewall Adaptive Timeouts** can be used to reduce timeouts and
possibly time-out existing connections earlier when the state table is
getting full.

**Firewall Adaptive Timeouts** speed up the expiration of state table
entries as the state table gets fuller. The first parameter (a1 in the
formulas) is the number of state table entries where adaptive timeouts
start. The second parameter (a2 in the formulas) is the number of state
table entries at which the timeouts would become zero. If the number of
state table entries is between the two values, the timeouts are scaled
linearly. The second parameter must be above the Firewall Maximum States
limit - otherwise the firewall would drop all connections when it is
reached.

The following formula calculates the adaptive timeout factor at the
Firewall Maximum States limit:

.. image:: /_static/config/firewall_adaptive_timeouts_solved_for_factor_at_limit.png

For example, if the limit is 100.000, the first parameter is 60.000 and
the second parameter is 120.000, timeouts would be reduced to 1/3 (~33%)
when the state table is full.

Solving the formula for the second parameter yields:

.. image:: /_static/config/firewall_adaptive_timeouts_solved_for_a2.png

For example, if the state table limit is set to 100.000, adaptive
timeouts should start at 60.000 and the desired timeout factor for a
full state table is 0.25 (25%), the second parameter is calculated as
113.333.

If either parameter is zero, adaptive timeouts are disabled.

Networking
----------

Contains settings for IPv6, and various network interface settings such
as hardware checksums, device polling, and ARP message suppression.

Hardware Large Receive Offloading (LRO)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

LRO works by aggregating multiple incoming packets from a single stream
into a larger buffer before they are passed higher up the networking
stack, thus reducing the number of packets to be processed. LRO should
not be used on machines acting as routers as it breaks the end-to-end
principle and can significantly impact performance. pfSense is most
frequently used as a router or an equivalent.

Hardware TCP Segmentation Offloading (TSO)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

TSO is similar to LRO, but for sending. It works by queuing large
buffers and letting the network interface card (NIC) split them into
separate packets just before transmit.

Implications
~~~~~~~~~~~~

Both LRO and TSO can help when pfSense is an endpoint and **not a
router**. If pfSense is being used as an appliance (e.g. for DNS), it is
possible the options could enhance performance.

Hardware Checksum Offloading
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Ethernet hardware calculates the Ethernet CRC32 checksum and the
receive engine validates this checksum. If the received checksum is
wrong pfSense normally won't even see the packet, as the Ethernet
hardware internally throws away the packet (though there are exceptions,
such as when the interface is in promiscuous mode).

Higher-level checksums are “traditionally” calculated by the protocol
implementation and the completed packet is then handed over to the
hardware. Recent network hardware can perform the IP checksum
calculation, also known as checksum offloading. The network driver won't
calculate the checksum itself but will simply hand over an empty (zero
or garbage-filled) checksum field to the hardware.

Some cards will additionally process TCP and UDP checksums, as above,
but this isn't of value on a router.

It's possible, when everything else is right, that IP checksum
offloading can provide a modest performance improvement, but this is
unlikely to be more than “noticeable” with the traffic processed by most
pfSense installations. However, at 10Gbps or above, such offloading can
become quite useful. Support for these is an important component of the
pfSense “3.0” effort.

Defaults
~~~~~~~~

pfSense 2.x defaults both the LRO and TSO settings to **disabled** and
the Hardware Checksum Offloading settings to **enabled**.

Miscellaneous
-------------

Contains settings that do not fit into the other categories:

-  Load Balancing (sticky connections)
-  PowerD
-  Temperature sensors
-  Hardware cryptographic acceleration
-  IPsec Advanced settings (until pfSense 2.2)
-  Disable clearing of states with scheduled rules

System Tunables
---------------

Contains an interface to manage setting various FreeBSD sysctl values that
tweak various system behaviors.

Notifications
-------------

Controls how the system will notify administrators when an alert
happens. Current options include SMTP (e-mail) notifications and growl
notifications.

-  **Growl**

   -  **IP Address**: This is the IP address which will receive growl
      notifications
   -  **Password**: The password of the remote growl notification device

-  **SMTP E-Mail**

   -  **IP Address of E-Mail server**: IP address or FQDN of the SMTP
      E-Mail server through which notifications will be sent
   -  **From e-mail address**: E-mail address that will appear in the
      from field. (Ex. hostname@domain.com)
   -  **Notification E-Mail address**: E-mail address which will receive
      email notifications
   -  **Notification E-Mail auth username (optional)**: Username for
      SMTP authentication
   -  **Notification E-Mail auth password (optional)**: Password for
      SMTP authentication

Click **Test SMTP** to send a test message after configuring and saving
e-mail notifications to verify that the settings are correct.
