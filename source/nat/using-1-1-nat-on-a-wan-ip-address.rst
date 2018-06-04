.. include:: /substitutions.rsti

Using 1:1 NAT on a WAN IP Address
=================================

Yes, 1:1 NAT may be used from the WAN IP address to an internal IP
address. But be aware that this maps every port and services on the
firewall will no longer be reachable from the outside. To reach the
firewall from the outside, port forward entries must be added to negate
the 1:1 NAT for the specific ports on the firewall to be reached.

If there is only one WAN IP, and a Linksys (or other SOHO router) style
“DMZ”\ :sup:`1` configuration is being attempted, consider only forward
the ranges of ports and protocols that are absolutely necessary, and use
appropriate firewall rules to protect access to these ports.

1: That term is used very, very loosely. See the `Wikipedia Definition
of DMZ <http://en.wikipedia.org/wiki/DMZ_(computing)>`__ for more
information.

