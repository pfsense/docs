.. include:: /substitutions.rsti

Using VPNs with IPv6
====================

This page will cover issues with using VPNs on IPv6 on pfSense

General Issues
--------------

With IPv6, there will be access issues with VPNs that require some care.
Because most people will be using routable addresses, NAT can no longer
be relied upon to "hide" the internal networks. As such, firewall rules
must be carefully crafted to allow traffic in from remote networks. If
the rules are too permissive traffic could reach LAN to LAN without
actually going across the VPN!

Ensure that the WAN-side firewall rules do not permit traffic from
remote LAN subnets in such situations, and only allow that traffic on
the VPN interface. For example, only allow the remote LAN networks to
reach the WAN side of the firewall on the VPN port(s).

If the VPN is only used for connectivity and do not care about the level
of encryption (for instance, if services are already encrypted and are
appropriately filtered), then with IPv6 a VPN is not needed, and traffic
can be permitted to pass through LAN to LAN at the WAN interface.

OpenVPN
-------

IPv6 on OpenVPN works from router to router, and from client to server.
The Windows client works and other notable OpenVPN clients, such as
Viscosity and Tunnelblick are also working now as of their most recent
versions. Clients for Android and iOS are also working.

To get IPv6 on OpenVPN tunnels, configure the OpenVPN server with an
IPv6 network to use for the tunnel network, and appropriate routes as
needed.

IPsec
-----

Currently IPv6 with IPsec is functional, but traffic cannot be mixed
families in a tunnel. Meaning, IPv6 traffic can only be carried inside a
tunnel which has IPv6 endpoints, and IPv4 traffic can only be carried
over a tunnel using IPv4 endpoints. A single tunnel cannot carry both
types of traffic.

