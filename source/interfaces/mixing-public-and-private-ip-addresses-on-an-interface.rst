.. include:: /substitutions.rsti

Mixing Public and Private IP Addresses on an Interface
======================================================

Private and globally routable "Public" IP addresses can coexist on a single
interface.

.. warning:: While this is technically possible, we do not recommend this as it
   is insecure. It is generally a bad idea to mix public and private traffic on
   the same segment. Among other problems, if a device on a public IP address is
   compromised, it is trivial for an attacker to gain access to private network
   hosts.

   The best practice is to define separate interfaces for public subnets with
   strict rulesets to keep traffic isolated from private networks. See
   :doc:`/config/example-basic-configuration`.

To add a public subnet to an existing privately numbered interface:

* Define an IP alias or CARP type VIP for the additional subnet on the internal
  interface to give the firewall a "foothold" in the additional subnet.
* Adjust firewall rules to allow traffic outbound from this local interface as
  needed, and add WAN rules to pass traffic inbound to hosts in this subnet as
  needed.
* Switch to **Hybrid** Outbound NAT and make a "Do Not NAT" rule for the public
  subnet, or switch to **Manual** Outbound NAT and remove all outbound NAT rules
  that reference the public subnet.

.. note:: DHCP cannot be provided to both subnets from pools on the same layer 2
   network.
