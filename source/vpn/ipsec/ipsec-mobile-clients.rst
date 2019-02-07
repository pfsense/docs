IPsec Mobile Client Settings
============================

IPsec mobile client settings (**VPN > IPsec**, **Mobile clients** tab)
control how remote IPsec users will connect without a defined remote
peer address.

Normally, this includes "road warrior" style clients, but may also
include routers in some rare cases.

The IPsec mobile client system supports extended authentication (xauth),
and a lot more client auto-configuration options.

After enabling Mobile Client support, a prompt is displayed to create a
Phase 1 entry. When adding a phase 2 entry for mobile clients, only the
**Local Network** is defined since the **Remote Network** is either
unknown or automatically configured.

See Also:

-  :doc:`IPsec Road Warrior/Mobile Client How-To </vpn/ipsec/configuring-an-ipsec-remote-access-mobile-vpn-using-ikev1-xauth>` - Example Mobile
   IPsec configuration
-  :doc:`/vpn/ipsec/index` - All other IPsec articles.

