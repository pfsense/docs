NAT with IPsec Phase 2 Networks
===============================

As of pfSense® software version 2.1, there is support for NAT on IPsec
Phase 2 networks.

Configuration
-------------

NAT is configured using the options on Phase 2 directly under the local
network specification.

In the **Upper** section of the **Local Network** settings, Type and
Address specify the actual local network (such as the LAN network).

In the **Lower** section of the **Local Network** settings, Type and
Address specify the *translated* network which will be seen by the far
side.

For example, connecting to a Vendor where they want the pfSense router to
use **172.16.5.0/24**, but the LAN is actually **192.168.1.0/24**, set the
top box to **Network**, enter ``192.168.1.0/24`` into the address entry
box, then select **Network** in the lower box and put ``172.16.5.0/24``
into the address entry box.

NAT Types
---------

There are two main modes for NAT with IPsec:

#. Binat - 1:1 NAT - When both the actual and translated local networks
   use the same subnet mask, they will be directly translated to one
   another inbound and outbound. Can also be used for single addresses.
#. NAT - Overload/PAT Style - Local network is a subnet, but the
   translated address is a single IP. Works for outbound connections
   only.

NAT+IPsec cannot be configured between two differently sizes subnets
(such as a /24 to a /27).

Firewall Rules
--------------

NAT is processed before firewall rules, so firewall rules on the IPsec
tab refer to the actual LAN subnet

Remote End Notes
----------------

The far side of the tunnel does not need any knowledge of the actual LAN
network. Their tunnel is built between their local network and the
translated post-NAT network.

Packet Capturing Quirk
----------------------

In a packet capture, the actual address will be shown on outbound
traffic, not the translated address. This does not indicate any problem.

