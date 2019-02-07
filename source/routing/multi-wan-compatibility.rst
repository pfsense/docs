Multi-WAN Compatibility
=======================

Outbound traffic to the Internet
--------------------------------

All services running locally on pfSense will strictly obey the system's
routing table. This means they go out the primary WAN unless static
routes are defined that match the traffic. This only applies to services
which initiate connections to the Internet, such as the DNS forwarder,
and several packages such as squid.

Inbound traffic from Internet
-----------------------------

On current versions of pfSense, from the perspective of traffic coming
in to services on pfSense from the Internet, connections will return
through the WAN which they entered. This works for TCP-based services
and UDP services bound to specific IP addresses. For UDP services bound
to any/all IP addresses, there may still be issues with return traffic
as UDP will attempt to reply from the closest interface IP address to
the client.

Web site incompatibility with changing IP addresses
---------------------------------------------------

Some websites do not work properly if requests from the LAN are
initiated from multiple public IP addresses. Hence load balancing is
incompatible with these sites. Common examples are sites that maintain
login sessions, most frequently online banking. This is most commonly
observed with HTTPS sites so usually HTTPS should not be load balanced.
Occasionally it is a problem with HTTP sites that maintain session, but
this is rare.

For sites that do not function with load balancing, add firewall rules
to not load balance traffic to these destinations or protocols.
