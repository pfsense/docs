Configuring DHCP Relay
======================

The DHCP Relay daemon at **Services > DHCP Relay** will relay DHCP
requests between broadcast domains for IPv4 DHCP. For IPv6 clients, use
**Services > DHCPv6 Relay**. Aside from working on different address
families, the two services have the same configuration style.

To use the DHCP Relay daemon, the :doc:`DHCP Server </dhcp/dhcp-server>` must be
disabled on all interfaces. The same restriction applies to DHCPv6 relay
and the :doc:`DHCPv6 Server </dhcp/dhcpv6-server>`.

Check **Enable**, then click or ctrl-click the **Interface(s)** to
relay. Optionally check the box to **Append circuit ID and agent ID to
requests**, and then enter an IP address for the **Destination server**
which is the actual DHCP/DHCPv6 server.

.. note:: Relay may not work as intended from the firewall if the target
   DHCP server is across an IPsec tunnel. If possible, it is best to enable
   a DHCP helper on the switch instead.
