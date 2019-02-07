Using IPv6 Network Prefix Translation (NPt)
===========================================

**Network Prefix Translation**, or NPt, allows the user to map one IPv6
prefix to another.

With IPv6 it is generally best to avoid any and all NAT where possible,
but there are some use cases where NPt can help such as :doc:`Multi-WAN for IPv6 </routing/multi-wan-for-ipv6>`.

NPt functions similarly to 1:1 NAT on IPv4, but unlike 1:1 NAT, NPt is
more often used with entire prefixes and not single IPv6 addresses.

It is important to note that NPt **does NOT** function like traditional
outbound/overload NAT/PAT. NPt cannot be used to map an internal prefix
to prefix in use on a WAN, it must be used with a routed subnet!
Otherwise a few billion VIPs would be needed to handle NDP on the WAN
for the mapped IPs!

See Also: :doc:`Multi-WAN for IPv6 </routing/multi-wan-for-ipv6>`
