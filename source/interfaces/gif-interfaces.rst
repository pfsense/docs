.. include:: /substitutions.rsti

GIF Interfaces
==============

GIF tunneling interfaces are added from **Interfaces > (assign)** on the
**GIF** tab.

GIF is a generic tunneling mechanism that can be used for IPv4 and IPv6
traffic.

GIF tunnels can be added, edited, or deleted from the list view.

Configuration
-------------

When adding or editing a GIF interface, the following fields are
required:

-  **Parent interface** - Interface on which to bind the GIF tunnel
   (typically a WAN)
-  **GIF Remote address** - Far side peer address *outside* the tunnel
-  **GIF Tunnel local address** - Local address for *inside* the GIF
   tunnel (typically a small private network)
-  **GIF Tunnel remote address** - Remote address for *inside* the GIF
   tunnel (typically a small private network)

The following are optional:

-  **Route caching** - Routes for traffic to cross the GIF interface
   will be remembered, should be unchecked in most cases especially with
   dynamic routing.
-  **ECN friendly behavior** - Be `friendly to
   ECN <https://tools.ietf.org/html/draft-ietf-ipsec-ecn-02>`__ but
   violate RFC2893. Should only be used if both sides agree.
-  **Description** - Text for reference about the name/purpose of this
   tunnel.

Firewall Rules
--------------

Traffic must be passed on the GIF interface and there is no general tab
for GIF traffic. This means that it is required to add and then enable
it under **Interfaces > (assign)**. When doing so, keep the IP types set
to *None* on the Interface page as that is managed by the configuration
here on the **GIF** tab.

Example
-------

Site A:

-  **Parent interface** - *WAN*
-  **GIF Remote address** - *2.2.2.2* (Public IP of Site B)
-  **GIF Tunnel local address** - *192.0.2.66*
-  **GIF Tunnel remote address** - *192.0.2.65/30*

Site B:

-  **Parent interface** - *WAN*
-  **GIF Remote address** - *1.1.1.1* (Public IP of Site A)
-  **GIF Tunnel local address** - *192.0.2.65*
-  **GIF Tunnel remote address** - *192.0.2.66/30*

Limitations
-----------

With GIF interfaces and bridging, it is not possible to ping the router
endpoints but clients can ping each other. Without bridging, the router
endpoint IP addresses are reachable with ping.

IPv4 / IPv6
-----------

Tunnels can only be used for either IPv4 or IPv6 at one time, not both.

For more information on using GIF with an IPv6 Tunnel Broker, see:
:doc:`Using IPv6 with a Tunnel Broker </interfaces/using-ipv6-with-a-tunnel-broker>`

