.. include:: /substitutions.rsti

Configuring the DNS Resolver
============================

`Unbound <https://unbound.net/>`__ is a validating, recursive and
caching DNS resolver. It provides various modules so that DNSSEC (secure
DNS) validation and stub-resolvers are possible.

On pfSense 2.2, Unbound has been integrated into the base system.
Unbound is also the default DNS Resolver for new installations.

This page covers usage of Unbound in the base system of pfSense 2.2 and
later.

Configuration
-------------

To configure Unbound on pfSense 2.2, visit **Services > DNS Resolver**.
By default the service is enabled for new installations. Systems
upgraded from earlier versions of pfSense would have upgraded with the
:doc:`DNS Forwarder </dns/dns-forwarder>` enabled.

Unbound requires that the :doc:`DNS Forwarder </dns/dns-forwarder>` be disabled
or be moved to a different port. They provide the same functionality on
the same port, so they cannot both bind to port 53 to provide DNS
services.

- **Enable DNS Resolver**: Enable or Disable the Unbound DNS Resolver
  daemon.
- **Network Interfaces**: Interfaces used by Unbound for
  listening/binding. Default is to listen and respond to queries on all
  interfaces. The networks associated with the selected interfaces will
  automatically be added to an allowed list that can use Unbound for
  DNS queries. To allow other networks to query Unbound, use the
  **Access Lists** tab.
- **Outgoing Network Interfaces**: Specific interface(s) to use for
  sourcing outbound queries. By default any interface may be used. Can
  be useful for selecting a specific WAN or local interface for VPN
  queries.
- **Enable DNSSEC Support**: Uses DNSSEC to validate DNS queries. Be
  aware that it is recommended to *disable forwarding* and allow
  Unbound to handle all DNS resolution via root servers, which is the
  default behavior.
- **Enable Forwarding Mode**: Controls whether Unbound will query root
  servers directly (unchecked, disabled) or if queries will be
  forwarded to the upstream DNS servers defined under **System >
  General** or those obtained by DHCP/PPPoE/etc (checked, enabled).
  Forwarding mode may be enabled if the upstream DNS servers are
  trusted and also provide DNSSEC support. Forwarding mode is necessary
  for Multi-WAN configurations unless default gateway switching is
  enabled.
- **Register DHCP leases in the DNS Resolver**: DHCP static mappings
  can be registered in Unbound which enables the resolving of hostnames
  that have been assigned addresses by the DHCP server in pfSense. This
  should only be enabled on networks where the client hostnames can be
  trusted or controlled.
- **Register DHCP static mappings in the DNS Resolver**: As above, but
  for static mappings.
- **TXT Comment support**: Provides the ability to view comments
  associated with static host entries using DNS. To view these comments
  one would simply execute the following command::

    host -t TXT host_entry <pfSense_ip>

- **Advanced**: Text entry for advanced directives to be passed
  directly to Unbound.

  If there are problems adding parameters such as::

    local-data: "click01.example.com A 10.10.10.1"

  Place server: in line before that like this::

    server:
    local-data: "click01.example.com A 10.10.10.1"

Unbound also supports :doc:`DNS Rebinding Protections </dns/dns-rebinding-protections>`. To override these
protections, **Advanced** options may be added to whitelist specific
domains. See :doc:`DNS Rebinding Protections </dns/dns-rebinding-protections>`
for details.

**Host Overrides** allows creation of custom DNS responses/records to
create new entries that do not exist in DNS outside the firewall, or to
override DNS responses for other hosts.

**Domain Overrides** are for domains that should be queried by a
specific remote server. For example, if all records for
mysite.example.com exist on a private DNS server at 192.0.2.5, then a
domain override can be set to forward all queries for that domain to
that server. If there are multiple DNS servers available for a domain
then make a separate entry for each, using the same domain name.

Advanced Settings Tab
---------------------

The Advanced option tab has additional useful settings, such as:

-  Configure the size of the message cache. The Message cache is used to
   store `DNS Return
   Codes <http://www.iana.org/assignments/dns-parameters>`__ and
   validation statuses. The Resource Record Set cache size selected will
   automatically be set to twice the amount, which is used to store
   Resource Records data.

Access Lists Tab
----------------

When using specific interface bindings on the main tab, or when allowing
queries across VPNs, **Access Lists** are needed to allow the clients to
reach the DNS Resolver. Specific known-bad clients or networks could
also be denied.

When editing an Access List entry, the following options are available:

-  **Access List name**: A name for reference.
-  **Action**: What to do with the queries that match this access list.
   Possible actions include:

   -  **Deny**: Stops queries from hosts.
   -  **Refuse**: Stops queries from hosts and sends a DNS rcode REFUSED
      error message back to the client. This is nicer to clients than
      Deny, but less secure since clients will know that a DNS server is
      present.
   -  **Allow**: Allows queries from hosts within defined network.
   -  **Allow Snoop**: Allows recursive and non-recursive access from
      hosts within the defined network. Used for cache snooping and
      ideally should only be configured for an administrative host for
      troubleshooting.

-  **Networks**: A list of **Networks** / CIDR masks, with a
   **Description**. These are the actual networks to use for matching
   this access list. Hosts that match these **Networks** will have the
   selected **Action** applied.
-  **Description**: A longer description of the access list for
   reference.

Additional Notes
----------------

Unbound provides various command line utilities to manage the DNS Cache
server. The following control commands are currently not available in
the webGUI but can be executed from the command line on a pfSense
system.

**To remove items from the cache:**

-  unbound-control flush *name* - removes "name" from the cache all
   record types which include A, AAAA, NS< SOA, CNAME, DNAME, MX, PTR,
   SRV and NAPTR records.
-  unbound-control flush_type "name" "type" - removes the "name" and
   "type" from the cache where "type" is a particular record type.
-  unbound-control flush_zone "name" - removes all information at or
   below the name from cache. For example if .com is specified, all
   entries below .com will be removed. Note this process is slow as the
   entire cache needs to be inspected.

**To determine the name servers that will be queried to lookup a zone:**

-  unbound-control lookup "name"

.. note:: Unbound does not use the default conf file location, so you will need
   to use the ``-c`` flag to tell it where it is::

     unbound-control -c /var/unbound/unbound.conf <unbound-command-to-run>
