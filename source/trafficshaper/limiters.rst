.. include:: /substitutions.rsti

Using Limiters to Restrict Bandwidth Usage
==========================================

The **Limiters** feature sets up
`dummynet(4) <https://www.freebsd.org/cgi/man.cgi?format=html&query=dummynet%284%29>`__
pipes. Dummynet was designed to simulate any kind of network connection.
Various types of connections can be simulated such as Dialup, T1, a T1
run through a microwave oven, or a satellite connection to the Moon. A
side effect of being able to simulate any type of network connection is
that they can also be used to limit the amount of bandwidth a host or
group of hosts have access to.

Both the packet shaper and limiters can be used at the same time so
traffic can be shaped as a whole, and also limit certain traffic to a
certain amount of bandwidth.

There are 2 basic steps to setting up a limiter to control bandwidth.

#. Setup the limiters
#. Assign traffic to those limiters

Setup Limiters
--------------

Limiters are setup by creating them under **Firewall > Traffic Shaper**,
on the **Limiters** tab.

One pipe may be used for both inbound and outbound traffic, but that
would be simulating a `half-duplex
connection <http://en.wikipedia.org/wiki/Half_duplex#Half-duplex>`__.

The recommended method is to create 2 pipes, one for inbound traffic and
one for outbound traffic. The direction is from the perspective of the
interface. If using limiters on LAN, the inbound queue is upload and the
outbound queue is download. Name the pipes so that they are easy to
distinguish and identify, such as *InLimitLan* and *OutLimitLan*, or
*LAN\_Up* and *LAN\_Down*

Dynamic queue creation
~~~~~~~~~~~~~~~~~~~~~~

Dummynet pipes have a feature called dynamic queue creation which allows
unique queues based on the uniqueness of a connections source protocol,
IP address, source port, destination address or destination port. They
can also be used in combination. pfSense currently only allows setting
the source address or the destination address as the mask. This means
each host behind the firewall, or subnet, will have its own set of pipes
so that each node is restricted to using a certain amount of bandwidth.
To do this, give the *In* pipe a **Source Address** mask, so that each
host sending packets gets it's own dynamic pipe for uploading. Give the
*Out* pipe a destination address mask, so that each host receiving
packets gets it's own dynamic pipe for downloading.

Assign Traffic
--------------

The next step is to assign traffic to the limiter by setting the
**In/Out** option in a firewall rule. Remember that **in** and **out**
are from the *perspective of that interface* on the firewall. When
choosing limiters on the LAN interface, **out** is download (traffic
from the LAN NIC out to the LAN) and **in** is upload (traffic from the
LAN into the LAN NIC).

Simply creating the limiters does not do anything, they **must** be
assigned on a firewall rule.

Limiter status
--------------

Bandwidth usage and other limiter information is available under
**Diagnostics > Limiter Info**.

Captive Portal Notes
--------------------

Captive portal can automatically setup its own pipes for each logged in
user, no need to set this up manually. Take a look at Captive Portal
page to set this up.

Using Limiters for Bandwidth Guarantees
---------------------------------------

To guarantee a certain amount of bandwidth using Limiters instead of
enforcing an upper limit, make four limiters as follows:

#. Bandwidth to guarantee upload
#. Bandwidth to guarantee download
#. Total bandwidth upload (less guaranteed above)
#. Total bandwidth download (less guaranteed above)

The Mask must be "*none*" for these to work properly, otherwise it
cannot enforce a total limit.

If the WAN has 8Mb down and 2Mb up, to guarantee 512Kb/s for service X
create queues sized like so:

#. 512 Kb/s
#. 512 Kb/s
#. 1536 Kb/s
#. 7680 Kb/s

Then direct the guaranteed service traffic into the first two limiters,
and everything else into the "total" limiters.

Limiters on Bridges
-------------------

When using limiters on bridges, the bridge interface must be assigned
and it must contain the IP address for the bridge. Place the limiters on
the member interfaces.

Known limitations
-----------------

-  On pfSense 2.2 and 2.3, limiters cannot be used on firewall rules
   residing on interfaces where NAT applies. This limits their use to
   LAN-type interfaces only, and not WANs, in most circumstances. This
   has been fixed on pfSense 2.4. `Bug
   #4326 <https://redmine.pfsense.org/issues/4326>`__

-  Limiters cannot be used where pfsync is enabled. `Bug
   #4310 <https://redmine.pfsense.org/issues/4310>`__

Troubleshooting
---------------

Display Pipes
~~~~~~~~~~~~~

Visit **Diagnostics > Limiter Info** in the GUI, and it will show the
output of:

`` ipfw pipe show``

Which lists all of the pipes currently configured on the system, and
related information about their status.

Dummynet Documentation
----------------------

-  Dummy Net documentation: http://info.iet.unipi.it/~luigi/dummynet/

