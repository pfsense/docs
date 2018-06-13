.. include:: /substitutions.rsti

Tuning and Troubleshooting Network Cards
========================================

General Issues
==============

mbuf / nmbclusters
------------------

To oversimplify, "mbufs" are network memory buffers; portions of RAM set
aside for use by networking for moving data around.

The count of active mbufs is shown on the dashboard and is tracked by a
graph under **Status > RRD Graphs**.

If the mbuf usage is at or near the maximum, or a crash happened with a
report that referenced mbufs/uma/memory allocation, then increasing the
amount of available mbufs is likely required.

There are two ways to increase mbufs, either by using **System
Tunables** or by using */boot/loader.conf.local*

The default value is typically *26584*. To start, increase that to
*131072*. That number can be again be doubled or more as needed, but be
careful not to exceed available kernel memory. On 64 bit systems with
multiple GB of RAM, set it to 1 million (1000000).

Adding as a System Tunable
~~~~~~~~~~~~~~~~~~~~~~~~~~

To add the value as a tunable:

-  Navigate to **System > Advanced**, **System Tunables** tab.
-  Click |fa-pencil| to edit the entry if kern.ipc.nmbclusters is already in the
   list

-OR-

-  Click |fa-plus| to create a new entry if it does not exist.
-  Set the **Tunable** field to *kern.ipc.nmbclusters*
-  Set the **Value** field to *131072* or the desired number.
-  Click **Save**
-  Click **Apply Changes**

The value will take effect immediately.

Adding to loader.conf.local
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create or edit */boot/loader.conf.local* using a text editor in the
shell, or **Diagnostics > Edit File**. In that file, add the following
line::

  kern.ipc.nmbclusters="131072"

The new value will not take effect until after a reboot.

TSO/LRO
-------

The settings for **Hardware TCP Segmentation Offload** (TSO) and
**Hardware Large Receive Offload** (LRO) under **System > Advanced** on
the **Networking** tab default to **checked** (disabled) for good
reason. Nearly all hardware/drivers have issues with these settings, and
they can lead to throughput issues. Ensure the options are checked.
Sometimes disabling via sysctl is also necessary.

In */boot/loader.conf.local* - Add the following (or create the file if
it does not exist)::

  net.inet.tcp.tso=0

MSI/MSIX
--------

`Message Signaled
Interrupts <http://en.wikipedia.org/wiki/Message_Signaled_Interrupts>`__
are an alternative to classic style Interrupts for retrieving data from
hardware. Some cards behave better with MSI, MSIX, or classic style
Interrupts, but the card will try the "best" available choice (MSIX,
then MSI, then Interrupts).

MSIX and MSI can be disabled via loader tunables. In
*/boot/loader.conf.local* - Add the following (or create the file if it
does not exist)::

  hw.pci.enable_msix=0
  hw.pci.enable_msi=0

To nudge the card to use MSI, disable only MSIX. To nudge the card to
use regular Interrupts, disable both MSI and MSIX.

IP Input Queue (intr_queue)
---------------------------

This will show the current setting::

  sysctl net.inet.ip.intr_queue_maxlen

However, in largely loaded installations this may not be enough. Here is how to
check::

  sysctl net.inet.ip.intr_queue_drops

If the above shows values above ``0``, try doubling the current value of
``net.inet.ip.intr_queue_maxlen``.

For example::

  sysctl net.inet.ip.intr_queue_maxlen=3000

Keep performing the above until the point is found where drops are eliminated
without any adverse effects.

Afterwards, add an entry under **System > Advanced**, **System Tunables** tab to
set ``net.inet.ip.intr_queue_maxlen`` to ``3000``

Card-Specific Issues
====================

Broadcom bce(4) Cards
---------------------

Several users have noted issues with certain Broadcom network cards,
especially those built into Dell hardware. If the bce cards in the
firewall are behaving erratically, dropping packets, or causing system
crashes, then the following tweaks may help, especially on amd64.

In */boot/loader.conf.local* - Add the following (or create the file if
it does not exist)::

  kern.ipc.nmbclusters="131072"
  hw.bce.tso_enable=0
  hw.pci.enable_msix=0

That will increase the amount of network memory buffers, disable TSO
directly, and disable msix.

Packet loss with many (small) UDP packets
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If a lot of packet loss is observed with UDP on bce cards, try changing
the netisr settings. These can be set as system tunables under **System
> Advanced**, on the **System Tunables** tab. On that page, add two new
tunables::

  net.isr.direct_force=1
  net.isr.direct=1

Broadcom bge(4) Cards
---------------------

See above, but change "bce" to "bge" in the setting names.

Intel igb(4) and em(4) Cards
----------------------------

Certain intel igb cards, especially multi-port cards, can very easily
exhaust mbufs and cause kernel panics, especially on amd64. The
following tweak will prevent this from being an issue:

In */boot/loader.conf.local* - Add the following (or create the file if
it does not exist)::

  kern.ipc.nmbclusters="1000000"

That will increase the amount of network memory buffers, allowing the
driver enough headroom for its optimal operation.

Not all NICs and PHYs are the same, even if they share a common driver
or chipset. pfSense tries to drive network cards as fast and efficiently
as possible, and some hardware combinations are unable to handle the
load properly when pushed past their limits, or in certain
configurations or network environments. Even if the NICs and drivers
claim to support certain features like multiple queues, they may fail in
practice when they are used, either due to the hardware or a specific
configuration that requires a single queue. In these cases, it may be
necessary to reduce the queues to one per card. Accomplish this by
placing the following in */boot/loader.conf.local*::

  hw.igb.num_queues=1

Intel ix(4) Cards
-----------------

In */boot/loader.conf.local*::

  kern.ipc.nmbclusters="1000000"
  kern.ipc.nmbjumbop="524288"

As a sysctl (system tunable)::

  hw.intr_storm_threshold=10000

On releases prior to pfSense 2.2, the following may be necessary. If
using VLANs with Intel 10 Gb ix(4) cards, some features of the driver
for VLANs may need to be disabled to work correctly. For instance, to
apply these settings on NIC ix0, run the following::

  ifconfig ix0 -vlanhwfilter

That alone should be enough, but in some cases it may be necessary to
disable TSO in addition to VLAN hardware filtering, which can be done
like so::

  ifconfig ix0 -vlanhwfilter -vlanhwtso -tso

These commands may be placed into a :doc:`shellcmd tag </development/executing-commands-at-boot-time>`
to execute at boot time to make the change persistent.

Flow Control
------------

In some circumstances, flow control may need to be disabled. The exact
method of this depends on the hardware involved, but here are a couple
examples:

All of these go in */boot/loader.conf.local*

em(4)::

  hw.em.fc_setting=0

igb(4)::

  hw.igb.fc_setting=0

ixgbe(4) (aka ix):

* Either this (pfSense 2.3+)::

    dev.ix.0.fc=0

* Or this (pfSense 2.2.x and before)::

    hw.ix.0.fc=0

For ix and others, the flow control value can be further tuned:

-  0: No Flow Control
-  1: Receive Pause
-  2: Transmit Pause
-  3: Full Flow Control, Default
