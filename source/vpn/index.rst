***
VPN
***

Virtual Private Networks, on VPNs, encrypt and authenticate traffic across
untrusted networks. VPN functionality is built into pfSense® software.

A VPN can link together two remote networks as if they were directly connected,
or it can allow remote clients to securely reach local resources. They can also
be used to redirect outbound Internet traffic so that it exits through a
different location.

VPNs offer a secure alternative to exposing sensitive or fragile local services
to the Internet. For example, network management services, security systems and
cameras, file servers, printers, and many other similar network devices.

.. toctree::
   :maxdepth: 1

   vpn-capability-overview
   ipv6-and-vpns
   remote-access-mobile-vpn-client-compatibility
   android-vpn-compatibility
   l2tp-vpn-settings
   using-cisco-vpn-pass-through-behind-pfsense
   pptp-troubleshooting
   what-are-the-limitations-of-pptp-in-pfsense

.. toctree::
   :maxdepth: 2

   openvpn/index

.. toctree::
   :maxdepth: 2

   ipsec/index
