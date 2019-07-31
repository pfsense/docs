GRE Interfaces
==============

In pfSense® software, GRE tunnels are configured under 
**Interfaces > (assign)** on the **GRE** tab.

GRE (Generic Route Encapsulation) is defined in RFC 2784. It is
supported by many vendors, and is a standards-compliant means to tunnel
traffic.

GRE tunnels can be managed from the list view.

Configuration
-------------

Required settings:

-  **Parent interface** - Interface on which to bind the GRE tunnel
   (typically a WAN)
-  **Remote tunnel endpoint IP address** - Far side peer address
   *outside* the tunnel
-  **Local tunnel IP address** - Local address for *inside* the GRE
   tunnel (typically a small private network)
-  **Remote tunnel IP address** - Remote address for *inside* the GRE
   tunnel (typically a small private network)

The following are optional:

-  **Mobile encapsulation**: Check this box to use mobile encapsulation
   (IP protocol 55, RFC 2004). When unchecked, uses GRE encapsulation
   (IP protocol 47, RFC 1701, RFC 1702).
-  **Route search type**: For correct operation, the GRE device needs a
   route to the destination that is less specific than the one over the
   tunnel. (Basically, there needs to be a route to the decapsulating
   host that does not run over the tunnel, as this would be a loop.
-  **WCCP version**: Check this box for WCCP encapsulation version 2, or
   leave unchecked for version 1.
-  **Description** - Text for reference about the name/purpose of this
   tunnel.

Firewall Rules
--------------

Traffic must be passed on the GRE interface and there is no general tab
for GRE traffic. This means that it is required to add and then enable
it under **Interfaces > (assign)**. When doing so, keep the IP types set
to *None* on the Interface page as that is managed by the configuration
here on the **GRE** tab.

