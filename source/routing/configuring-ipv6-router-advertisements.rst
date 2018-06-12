.. include:: /substitutions.rsti

Configuring IPv6 Router Advertisements
======================================

**Router Advertisements** (RA) tell an IPv6 network not only which
routers are available to reach other networks, but also tell clients how
to obtain an IPv6 address. These options are configured per-interface
and work similar to and/or in conjunction with DHCPv6.

:doc:`DHCPv6 </dhcp/dhcpv6-server>` is not able to send clients a router for use
as a gateway as is traditionally done with IPv4 DHCP. The task of
announcing gateways falls to RA.

**Operating Mode**: Controls how clients behave. All modes advertise
this firewall as a router for IPv6. The following modes are available:

-  **Router Only**: Clients will need to set addresses statically
-  **Unmanaged**: Client addresses obtained only via `Stateless Address
   Autoconfiguration <http://en.wikipedia.org/wiki/IPv6#Stateless_address_autoconfiguration_.28SLAAC.29>`__
   (SLAAC).
-  **Managed**: Client addresses assigned only via
   :doc:`DHCPv6 </dhcp/dhcpv6-server>`.
-  **Assisted**: Client addresses assigned by either DHCPv6 or SLAAC (or
   both).

In either Managed or Assisted mode, it is not required to activate the
DHCPv6 server on this firewall when set to "Managed". DHCPv6 service can
be offered by another host on the network. This flag tells clients to
request an address separately.

DHCPv6 support varies by operating system. It is not uncommon to need
**Assisted** mode for full IPv6 support across multiple operating
systems, as some support SLAAC only and others work best with DHCPv6.

**Router Priority**: The priority for the Router Advertisement daemon.
When multiple routers exist on a network, clients may select them
automatically using the priorities set forth here. If a high priority
router becomes unavailable, clients will use the next available one.
Possible settings are *High*, *Normal*, and *Low*.

**RA Subnet(s)**: Subnets are specified in CIDR format. Select the CIDR
mask that pertains to each entry. /128 specifies a single IPv6 host; /64
specifies a normal IPv6 network; etc. If no subnets are specified here,
the Router Advertisement (RA) Daemon will advertise to the subnet to
which the router's interface is assigned. This is used for selectively
performing RA on only some but not all of the subnets configured on an
interface.

DNS
---

Some, but not all, IPv6 clients support obtaining DNS information from
RA (RDNSS, DNSSL) as laid out in RFC 6106. For those that support it,
the information may be set on this page.

-  **DNS servers**: List of IPv6 DNS servers to provide to the client
-  **Domain search list**: List of domain names to search for
   unqualified hostname queries
-  **Use same settings as DHCPv6 server**: Checkbox to pull the above
   two values from the DHCPv6 page rather than setting them manually.

