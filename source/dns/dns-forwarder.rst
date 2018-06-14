.. include:: /substitutions.rsti

Configuring the DNS Forwarder
=============================

The DNS forwarder (**Services > DNS Forwarder**) is a powerful tool that
allows fine-grained control over the DNS service provided to clients on
a network. The DNS Forwarder refers to the *dnsmasq* daemon. For
Unbound, see :doc:`Unbound DNS Resolver </dns/unbound-dns-resolver>`.

The DNS forwarder will answer DNS requests from clients, and in turn
attempt to resolve queries using all currently available configured DNS
servers. This way, it is not necessary to configure public DNS servers
directly on client systems.

If the DNS forwarder is enabled, the internal interface IP for pfSense
will be handed out to :doc:`DHCP clients </dhcp/dhcp-server>` as a DNS server. If
the DNS forwarder is disabled, the DNS servers configured on pfSense
will be handed out instead.

Optionally, the DNS forwarder can register hostnames from DHCP leases so
that local hostnames can be resolved via DNS. The same can be done with
static DHCP mappings. This should only be enabled on networks where the
client hostnames can be trusted or controlled.

Host and domain overrides may also be entered which will be used in
place of the responses that would have otherwise come from the upstream
DNS servers. This can be used for Split DNS, or making undesirable
domains (e.g. myspace.com) resolve to a non-existent IP address.

On pfSense 2.1 and later, Host Overrides work for both IPv4 and IPv6
addresses.

On pfSense 2.2, The DNS Forwarder is not active by default. It has been
replaced by :doc:`Unbound </dns/unbound-dns-resolver>` as a DNS Resolver. It may
still be used, and is still active on upgraded configurations. To use
the DNS Forwarder (dnsmasq) on 2.2, first disable Unbound and then
enable the DNS Forwarder.

**Important Note: This service should not be exposed publicly. Ensure
inbound rules on WANs do not allow connections from the Internet to
reach the DNS Forwarder service on the firewall.**

See Also

- :doc:`/nat/accessing-port-forwards-from-local-networks` (Information on Split DNS)
- :doc:`/dns/clearing-the-dns-forwarder-cache`

