***
DNS
***

DNS, or Domain Name System, is the mechanism by which a network device resolves
a name like ``www.example.com`` to an IP address such as ``198.51.100.25``, or
vice versa. Clients must have functional DNS if they are to reach other devices
such as servers using their hostnames or fully qualified domain names.

DNS Resolver/Forwarder
''''''''''''''''''''''

These topics cover using pfSense® software as a caching DNS resolver or forwarder, which
handles DNS requests from local clients. When acting as a resolver or forwarder,
pfSense software will performs DNS resolution or hand off queries to an upstream DNS
forwarding server.

.. toctree::
   :maxdepth: 1

   unbound-dns-resolver
   dns-forwarder
   dns-lookup
   dns-rebinding-protections
   dns-forwarder-troubleshooting

DNS Guides
''''''''''

How to perform various tasks related to DNS.

.. toctree::
   :maxdepth: 1

   blocking-dns-queries-to-external-resolvers
   redirecting-all-dns-requests-to-pfsense
   clearing-the-dns-forwarder-cache
   dig-command-on-pfsense-2-2-and-later
   wildcard-records-in-dns-forwarder-resolver

Dynamic DNS
'''''''''''

Dynamic DNS will update an external DNS server with an interface IP address when
it changes. This enables a firewall with a dynamic WAN such as DHCP or PPPoE to
host public services even when its IP address changes periodically.

.. toctree::
   :maxdepth: 1

   dynamic-dns
   rfc2136-dynamic-dns
   ip-address-check-services
