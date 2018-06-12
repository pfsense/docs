.. include:: /substitutions.rsti

Troubleshooting Low Interface Throughput
========================================

In some situations, one might find that the firewall is not transferring
as much data as desired. There are many potential causes for this
condition, most of which are listed here along with some possible
resolutions

Insufficient Hardware
---------------------

The first thing to check is that the hardware is capable of pushing the
expected amount of traffic. In some cases this is more obvious, such as
a newer multi-core server being unable to transfer small amounts of
packets, or an older firewall not being able to transfer high loads.
Other cases are more subtle and require some testing and verification.

The most obvious test is to watch the system's CPU load while
transferring data. This can be observed from **Diagnostics > System
Activity** or from the shell by running:

``top -aSH``

If an IRQ process for a network card is using a significant amount of
CPU on a core, then either the hardware is being fully (or over)
utilized, or the driver may need some adjustments to work as expected.
If the system is not under any stress whatsoever while transferring
data, the problem likely lies elsewhere.

If the amount of “System” CPU is high and the amount of interrupts is
low, the problem may be in the amount of packet processing happening in
pf or being used for encryption. If pf is pushing the CPU as high as it
can, it may require a faster CPU. On pfSense 2.1.x and earlier, pf is
limited to a single core for processing packets. On 2.2 and later, pf is
able to use multiple cores. If this condition is encountered after 2.2
has been released, upgrade and try again.

If the CPU is being used for encryption, a faster cipher may be chosen,
or in some cases a cryptographic accelerator may be utilized.

Hardware/Driver Tuning Required
-------------------------------

If a CPU core is fully utilized by interrupts, the network card driver may need
some tuning. Most of these tweaks are covered on :doc:`Tuning and
Troubleshooting Network Cards </hardware/tuning-and-troubleshooting-network-cards>`.
Some cards, such as igb, are able to use more queues for processing packets
which will spread the load across multiple cores and result in higher
throughput, but not every workload is helped by these options, so less queues
may also help.

Another item to check is under **System > Advanced** on the
**Networking** tab. Ensure that the boxes are checked for **Disable
hardware TCP segmentation offload** and **Disable hardware large receive
offload**. If they are already checked, try toggling **Disable hardware
checksum offload**. If no difference is observed, toggle it back.

Duplex Mismatch
---------------

On circuits of 100Mbit/s or less, a duplex mismatch is also possible.
Some providers are stuck in the stone age and still insist on
hard-coding ports on CPEs such as fiber converters at *100Mbit/s
full-duplex*. If the CPE is hard-coded but your firewall is not, it
would show as using 100Mbit/s half-duplex on **Status > Interfaces**. The duplex
mismatch will lead to interface errors, collisions, and low throughput. Setting
the speed and duplex is covered on :doc:`Forcing Interface Speed or Duplex
Settings </interfaces/forcing-interface-speed-or-duplex-settings>`.

Traffic Shaping
---------------

If the traffic shaping wizard was run previously before an increase in
upstream bandwidth, the old limits may still be in effect. Visit
**Firewall > Traffic Shaper** and check the root interface queues, and
*qInternet* queues to ensure that any listed interface bandwidths are
appropriately specified and current.

Also check the **Limiters** tab under the traffic shaper settings,
verify that any configured limiters are set for appropriate speeds.

MTU Issues
----------

Issues with upload speed frequently end up being issues with the MTU. If
the MTU on pfSense (default 1500), is higher than the MTU of the
upstream link, it can result in packets being fragmented, lost, or
otherwise mishandled. Setting MSS clamping on the WANs or changing the
MTU of the interface may help.

VPN + MTU Issues
~~~~~~~~~~~~~~~~

Similar to the above, if large packets or high-throughput seems to break
over a VPN, enable MSS Clamping for VPN Networks under **System >
Advanced** on the **Miscellaneous** tab on pfSense 2.1.x and before, and
under **VPN > IPsec**, **Advanced Settings** tab on pfSense 2.2+. The
default value for the option is *1400*, but try lower values such as
1350, 1300, 1250, etc.

WAN Connection
--------------

There could also be issues between the WAN and the Modem/CPE. It could
be a cable, or a quirk in how the two interfaces talk to each other.
Place a small switch between the firewall and the Modem/CPE as a test.

Client/Testing Method
---------------------

The slowness may not be from any cause on the firewall. It could be the
client itself or how it connects. Testing a 100Mbit/s WAN over 802.11g
wireless, for example, would never show full speed. Testing a 300Mbit/s
WAN from a 100Mbit/s LAN connection would likewise not be a valid test.

Ensure the client is connected to the firewall through a connection at
least as fast as the WAN supports.

ISP Issues
----------

If every other factor has been eliminated, test the modem without the
firewall involved. If the speed is still low, it may be the ISP to
blame, or the Modem/CPE.
