.. include:: /substitutions.rsti

Mixing Public and Private IP Addresses on an Interface
======================================================

This can be accomplished by defining an IP alias VIP for the additional
subnet on the internal interface, and adjusting firewall rules and
outbound NAT accordingly. DHCP cannot be provided to both subnets from
pools on the same layer 2 network.

Note that while this is technically possible, it is not recommended for
security reasons. It is generally a bad idea to mix public and private
traffic on the same segment if it can be avoided. It is best to define a
separate interface for the public traffic to keep it isolated from the
private network.

