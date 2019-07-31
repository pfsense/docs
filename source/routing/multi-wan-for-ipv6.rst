Using Multiple IPv6 WAN Connections
===================================

With pfSense® software version 2.1 and later Multi-WAN with IPv6 is
possible provided that multiple ISPs or tunnels are setup and working.
See :doc:`Using IPv6 with a Tunnel Broker </interfaces/using-ipv6-with-a-tunnel-broker>`
if help is needed setting up a tunnel.

Throughout this document "Second WAN" refers to the second or additional
interface with IPv6 connectivity. It might be the "real" interface if
native connectivity is present, or a tunnel if a tunnel broker is being
used. Keep that in mind, as it will make understanding the rest of this
document easier.

IPv6 Multi-WAN Caveats
----------------------

Traditionally with IPv6 everything is routed and there is no NAT. That's
great for connectivity, and for businesses or locations that can afford
PI space and a BGP peering. It doesn't work so well in practice for home
users.

Network Prefix Translation (NPt) will allow one subnet to be used for
LAN and have full connectivity with that subnet via its "native" WAN,
and also have it translated on the additional WANs so it appears to
originate there. While not "true" connectivity for the LAN subnet via
that path, it is better than no connectivity at all if the primary WAN
is down.

This may not work at all for completely dynamic IPv6 types where the
subnet is not static. (DHCP-PD, etc)

Requirements
------------

To setup Multi-WAN for IPv6 the following items are needed:

-  Two WANs, and IPv6 connectivity setup on both.
-  Gateways added to **System > Routing** for both, and confirmed
   connectivity on both.
-  LAN using a static routed /64 or similar
-  A routed /64 or larger block available on both WANs

Setup
-----

-  Under **System > Routing** on the **Gateway Groups** tab, add Gateway
   Groups for the V6 gateways, this works like IPv4
   :doc:`Multi-WAN </routing/multi-wan>`
-  Under **System > General**, ensure there is an IPv6 DNS server set
   for each IPv6 WAN. Again, the same as IPv4
-  Add an NPt entry under **Firewall > NAT** on the **NPt** tab:

   -  Interface: Secondary WAN (or tunnel if using a broker)
   -  Internal IPv6 Prefix: The LAN IPv6 subnet
   -  Destination IPv6 Prefix: The second WAN's routed IPv6 subnet (not
      the /64 of the WAN interface itself -- the /64 routed to pfSense
      on that WAN by the upstream)

    What this does is act similar to 1:1 NAT for IPv4. As traffic leaves the
    second WAN, if it's coming from the LAN subnet, it will be translated to the
    equivalent IP in the other subnet. For example if ``2001:xxx:yyy::/64`` is
    on LAN, and ``2001:aaa:bbb::/64`` is the routed subnet on the second WAN,
    then ``2001:xxx:yyy::5`` would appear as ``2001:aaa:bbb::5`` if the traffic
    goes out the second WAN.

-  As with IPv4 the Gateway Groups must be used on the LAN firewall
   rules. Edit the LAN rules for IPv6 traffic and make them use the
   gateway group, making sure to have rules for directly connected
   subnets/VPNs without a gateway set so they are not policy routed.
   More information on that is on the :doc:`Multi-WAN </routing/multi-wan>` page.

Alternate Tactics
-----------------

Some may prefer to use a "private" IPv6 subnet in LAN from the ``fc00::/7``
space, and setup NPt for both WANs.
