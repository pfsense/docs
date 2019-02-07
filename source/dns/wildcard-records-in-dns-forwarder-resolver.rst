Creating Wildcard Records in DNS Forwarder/Resolver
===================================================

A wildcard DNS record resolves **anything**.example.com to a single IP,
which can be useful in certain cases.

DNS Forwarder (dnsmasq)
-----------------------

A wildcard entry may be created in the DNS Forwarder by using the
advanced options box, and an entry like so::

  address=/example.com/192.168.1.54

That would make any host under *example.com* resolve to 192.168.1.54
(www.example.com, thissitedoesnotexist.example.com, mystuff.example.com,
and so on).

If a specific Host Overrides is set for example::

  specific.example.com 192.168.1.100
  knownhost.example.com 192.168.1.101

Then those would be returned when doing a query for those hosts, only
when no specific host has been specified in the host overrides would the
advanced wildcard entry be used.

To resolve the domain to an IP address::

  example.com 192.168.1.45

Leave the host field blank in the host overrides. So if the query is now
for *example.com*, 192.168.1.45 would be returned. If
*knownhost.example.com* was queried for then 192.168.1.101 would be
returned.

If a blank hostname *example.com* host override entry has not been
created, then a query for *example.com* would return the wildcard IP
address set in the advanced option.

If *madeupname.example.com* was queried, then since no specific host
record for *madeupname* exists in the host overrides. The wildcard entry
of 192.168.1.54 would be returned.

DNS Resolver (Unbound)
----------------------

The same effect may be obtained in the DNS Resolver (Unbound) using its
advanced options::

  server:
  local-zone: "example.com" redirect
  local-data: "example.com 86400 IN A 192.168.1.54"

