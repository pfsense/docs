.. include:: /substitutions.rsti

Troubleshooting Traceroute Output
=================================

When *traceroute* is run from LAN to a destination on the Internet, the
router itself may be missing from the *traceroute* output depending on
the firewall configuration.

This happens on Multi-WAN due to the way that *route-to* and *reply-to*
work. policy routing(route-to/reply-to) does not decrease the IP TTL
when forwarding packets, so the router does not appear as a hop.

This may also happen with IPsec due to the way IPsec traffic is handled
in the kernel. The traffic is not “routed” in a traditional sense.

This behavior may change in future versions of pfSense, see here:
http://redmine.pfsense.org/issues/932

