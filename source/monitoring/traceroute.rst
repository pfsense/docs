.. include:: /substitutions.rsti

Traceroute
==========

The traceroute page, located at **Diagnostics > Traceroute**, works like
the *traceroute* command found on many platforms. It sends special
packets which, as the name implies, trace a route across the network
from the pfSense host to a remote host. A list of hops between hosts
will be displayed, along with response times, as long as the intervening
hosts support (or don't filter) traffic required for traceroute to work.

-  **Host**: A hostname or IP address to which the route will be traced.
-  **IP Protocol**: The address type to use when a hostname is entered
   that has both A (*IPv4*) and AAAA (*IPv6*) records.
-  **Source Address**: The IP address from which the trace will be sent.
   This is especially important when testing LAN-to-LAN VPN
   connectivity.
-  **Maximum number of hops**: The maximum length of the path to trace.
   The trace will stop if the path cannot be traced completely after
   this number of hops.
-  **Reverse Address Lookup**: When checked, traceroute will attempt to
   perform a PTR lookup to locate hostnames for hops along the path.
   Will slow down the process as it has to wait for DNS replies.
-  **Use ICMP**: By default, traceroute uses UDP but that may be blocked
   by some routers. Check this box to use ICMP instead, which may
   succeed.

The output will be displayed once the trace is complete. The **Stop**
button may be pressed at any time to see the current output of the trace
if it is still running or stalled.

