.. include:: /substitutions.rsti

Troubleshooting the DNS Forwarder
=================================

On rare occasions one might need to troubleshoot issues with certain
queries to the DNS Forwarder (dnsmasq) or DNS Resolver (Unbound). In
such cases it can be helpful to view the queries received by the DNS
Forwarder and to see the responses generated.

For the DNS Forwarder, this can be done by adding the following keyword
to the Advanced Options box on a new line::

  log-queries

For the DNS Resolver, add this line::

  log-queries: yes

When saved, the DNS Forwarder/Resovler will begin logging the received
queries and their replies, along with some information about the result
such as whether it was pulled from the cache.

Here are some examples of exchanges that might find in the query log:

A query using the system's defined DNS servers to answer the query (the
answer was not yet known)::

  Dec  3 08:51:27 dnsmasq[1068]: query[A] daisy.ubuntu.com from 192.0.2.5
  Dec  3 08:51:27 dnsmasq[1068]: forwarded daisy.ubuntu.com to 8.8.8.8
  Dec  3 08:51:27 dnsmasq[1068]: forwarded daisy.ubuntu.com to 8.8.4.4
  Dec  3 08:51:27 dnsmasq[1068]: reply daisy.ubuntu.com is 91.189.95.55

A query where the response was given from the DNS cache::

  Dec  3 08:56:46 dnsmasq[1068]: query[A] dnl-14.geo.kaspersky.com from 10.0.10.128
  Dec  3 08:56:46 dnsmasq[1068]: cached dnl-14.geo.kaspersky.com is 4.28.136.39

A cached negative response::

  Dec  3 08:56:49 dnsmasq[1068]: query[A] wpad.example.com from 192.0.2.5
  Dec  3 08:56:49 dnsmasq[1068]: cached wpad.example.com is NXDOMAIN-IPv4

A query where the reply cannot be sent because of an improper client IP
(subnet ID, invalid IP):

  Dec  3 08:49:21 dnsmasq[1068]: query[A] teredo.ipv6.microsoft.com from 192.0.2.0
  Dec  3 08:49:21 dnsmasq[1068]: forwarded teredo.ipv6.microsoft.com to 8.8.8.8
  Dec  3 08:49:21 dnsmasq[1068]: forwarded teredo.ipv6.microsoft.com to 8.8.4.4
  Dec  3 08:49:21 dnsmasq[1068]: reply teredo.ipv6.microsoft.com.nsatc.net is 157.56.144.215
  Dec  3 08:49:21 dnsmasq[1068]: failed to send packet: Permission denied
