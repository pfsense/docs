.. include:: /substitutions.rsti

Configuring the DHCPv6 Server
=============================

The DHCPv6 server in pfSense will hand out addresses to DHCPv6 clients
and automatically configure them for network access. By default, the
DHCPv6 server is enabled on the LAN interface and set to use a prefix
obtained by tracking WAN's DHCPv6 delegation.

The DHCPv6 server page, found under **Services > DHCPv6 Server**, has a
tab for each available interface. The DHCPv6 daemon can only run and be
configured on interfaces with a Static IP address, so if a tab for an
interface is not present, check that it is enabled and set with a Static
IP. It is not currently possible to adjust settings for tracked
interface DHCP service.

The DHCPv6 server cannot be active on any interface if the :doc:`DHCPv6 Relay </dhcp/dhcp-relay>` service is in use.

DHCP Instance Options
---------------------

For each Interface, there are many options to choose from. At a minumum,
the **Enable** box must be checked on the interface tab and an address
range (starting and ending IPv6 addresses) to use for DHCPv6 clients
must be defined. For the DHCPv6 server to be active on the network,
:doc:`Router Advertisements </routing/configuring-ipv6-router-advertisements>` must also be set to
either *Managed* or *Assisted* mode on the **Router Advertisements**
tab.

The other settings may be configured, but are optional. Each option is
explained in more detail on the page and also in the |book_link|.

.. note:: DHCPv6 does not provide gateway information. :doc:`Router Advertisements </routing/configuring-ipv6-router-advertisements>` tell hosts on the network how
   to reach a router. DHCPv6 is for other host configuration such as DNS,
   delegation, and so on.

See the :doc:`DNS Forwarder </dns/dns-forwarder>` article for information on the
default DNS server behavior.

Some other options which may be set for clients include Network booting
options, LDAP URI, and the ability to add in any custom DHCP option
number and value.

Prefix Delegation
-----------------

The **Prefix Delegation Range** allows this firewall to hand out
portions of a routed subnet in turn to other local clients so they may
also act as routers or firewalls. For example, if a /48 prefix is routed
to this firewall, a chunk of that such as a /56 could be used for this
purpose. Clients must request a delegation, so only
firewalls/routers/etc would typically claim blocks of addresses from
this space.

This range would NOT be within an existing prefix on an interface (WAN,
LAN, etc) and must be a routed segment.

The **Prefix Delegation Size** indicates how large of a chunk to
allocate to clients requesting a delegation. It may be a single subnet
(/64) or a larger block such as a /60.

For example, if *FC07:1010:1010::/48* is routed to a firewall, the
**Prefix Delegation Range** of *FC07:1010:1010:F000::* to
*FC07:1010:1010:FF00::* could be used with a **Prefix Delegation Size**
of 60.

Static IP Mappings
------------------

Static IP mappings can be added at the bottom of the DHCPv6 server tab
for a given interface.

To add a Static IP mapping, click |fa-plus|, and then enter a **DUID**, **IPv6
Address**, **Hostname**, and **Description**. These mappings can also be
created from the :doc:`DHCPv6 Leases </dhcp/dhcpv6-leases>` view.

DUID Format
~~~~~~~~~~~

The DUID format is listed on the page, but it roughly follows the
format::

  DUID-LLT - ETH -- TIME --- ---- address ----

DUID-LLT is link-layer plus time, which means it uses the link type of a
network interface on the system (Generally 00:01 to indicate the format,
plus 00:01, or 00:06 for Ethernet), plus the timestamp at which the DUID
was generated in hex, plus the MAC address of the first NIC. It may be
difficult or impossible to predict a system's DUID. Unless the operating
system has a way to look it up, it may be best to allow the client to
obtain a dynamic lease and then copy the DUID from the leases view.

Numbered Options Notes
----------------------

When using numbered custom options, be careful of the type. Some will be
OK on text/string but others are not. Also beware that numbered options
do NOT correspond exactly to the DHCP numbered options for IPv4

For more information on DHCP option numbers and types, see
https://tools.ietf.org/html/draft-ietf-dhc-v6opts-00
