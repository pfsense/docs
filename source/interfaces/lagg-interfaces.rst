LAGG Interfaces
===============

Multiple network interfaces may be bonded ("teamed") together using `lagg(4)`_
for fault tolerance and/or increased bandwidth.

Creating/Editing a LAGG
-----------------------

LAGG interfaces are managed at **Interfaces > (assign)**, on the **LAGG** tab.

When adding or editing a LAGG group, Ctrl-click to select the **Parent
interfaces** to bond and then select a **protocol**. Several protocols are
available and they are explained on the LAGG editing page. These descriptions
have been reproduced in the next section.

A **Description** may also be entered for this LAGG group.

LAGG Protocols
--------------

The most common protocol for use with LAGG is LACP. Using LACP also requires
that the switch and ports to which these NICs connect be configured properly for
LACP.

:Failover: Sends and receives traffic only through the master port. If the
  master port becomes unavailable, the next active port is used. The first
  interface added is the master port; any interfaces added after that are used
  as failover devices.
:LACP: Supports the IEEE 802.3ad Link Aggregation Control Protocol (LACP) and
  the Marker Protocol. LACP will negotiate a set of aggregable links with the
  peer in to one or more Link Aggregated Groups. Each LAG is composed of ports
  of the same speed, set to full-duplex operation. The traffic will be balanced
  across the ports in the LAG with the greatest total speed, in most cases there
  will only be one LAG which contains all ports. In the event of changes in
  physical connectivity, Link Aggregation will quickly converge to a new
  configuration.
:LoadBalance: Balances outgoing traffic across the active ports based on hashed
  protocol header information and accepts incoming traffic from any active port.
  This is a static setup and does not negotiate aggregation with the peer or
  exchange frames to monitor the link. The hash includes the Ethernet source and
  destination address, and, if available, the VLAN tag, and the IP source and
  destination address.
:RoundRobin: Distributes outgoing traffic using a round-robin scheduler through
  all active ports and accepts incoming traffic from any active port.
:None: This protocol is intended to do nothing: it disables any traffic without
  disabling the lagg interface itself.

Usage with Multiple Switches
----------------------------

Some protocols such as LACP will only work across multiple switches if the
switches are `Stackable`_.

LAGG Bandwidth
--------------

Using a LAGG does not necessarily guarantee full throughput equal to the sum of
all interfaces. In particular, a single flow will not exceed the throughput of a
LAGG member interface. Traffic on a LAGG is hashed in such a way that flows
between two hosts, such as pfSense and an upstream gateway, would only use a
single link since the flow is between a single MAC address on each side.

In networks where there are many hosts communicating with different MAC
addresses, the usage can approach the sum of all interfaces in the LAGG.

.. _lagg(4): https://www.freebsd.org/cgi/man.cgi?query=lagg&apropos=0&sektion=0&manpath=FreeBSD+11.2-RELEASE+and+Ports&arch=default&format=html
.. _Stackable: https://en.wikipedia.org/wiki/Stackable_switch

