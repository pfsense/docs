.. include:: /substitutions.rsti

Troubleshooting VPN Connectivity to a High Availability Secondary Node
======================================================================

If there is a VPN connection to a CARP cluster (site-to-site or
mobile/road warrior), often one can communicate with the master but the
backup node is unreachable.

The reason for this is that the VPN is configured on both firewalls. The
packet from the client goes to the primary over the VPN tunnel that is
UP, then goes from the primary to the secondary, and the secondary
attempts to send it back over its own copy of the VPN which is DOWN
because it is the backup. The packet never makes it back to the user.

To fix it, manual outbound NAT must be configured so that the firewall
does NAT on the traffic from the VPN subnet going to the secondary
node's IP, and vice versa. that way it appears to originate from the
opposing firewall and not the VPN, so the traffic returns as expected.
Manual Outbound NAT is likely already set since is is typically a
requirement of CARP. If not, Manual Outbound NAT must be enabled for
this to work, or Hybrid Outbound NAT may be used on pfSense 2.2 and
later.

For example, add a manual outbound NAT rule on the LAN interface, source
being the VPN subnet, destination being an alias that contains both the
primary and secondary node LAN IPs. Translation would be **Interface
Address** (NOT the CARP VIP!).

With the NAT rule present when attempting to access the opposing node
over the VPN the traffic will appear to originate from the node to which
the VPN is currently connected and the return traffic will go back as
expected.

E.g.

Rules:

NATed source:ANY, destination:backup firewall LAN, NAT address: LAN CARP
NATed source:ANY, destination:master firewall LAN, NAT address: LAN CARP
