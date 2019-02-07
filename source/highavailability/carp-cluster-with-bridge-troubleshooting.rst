Troubleshooting CARP and Bridge Interfaces
==========================================

.. warning:: Combining CARP and bridging is strongly discouraged.

If a High Availability cluster is created with systems that have bridged
interfaces, switches will often (correctly) detect the Layer 2 loop
created by that configuration and shut down one of the switch ports.

Symptoms of this include traffic continuing to flow through a secondary
node even when the primary node is online and running.

By using a proper port priority and path cost, the switch can be trained
to prefer the correct port.

Configuration example for a Cisco Switch::

  interface FastEthernet0/1
   description Firewall - Primary - DMZ Port
   switchport access vlan 20
   spanning-tree vlan 20 port-priority 64
   no cdp enable

.. code::

  interface FastEthernet0/2
   description Firewall - Secondary - DMZ Port
   switchport access vlan 20
   spanning-tree vlan 20 cost 500
   no cdp enable

See also `this forum thread`_.

The bridge settings on pfSense may also need to have their spanning tree
options changed in a similar manner.

.. _this forum thread: https://forum.netgate.com/topic/4691/getting-pfsense-to-failover-with-a-bridge-using-the-cd-rom-platform
