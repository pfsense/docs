L2TP VPN Settings
=================

The Layer 2 Tunneling Protocol (L2TP) VPN protocol allows L2TP-only
clients to connect remotely. It is capable of tunneling Layer 2 Traffic and
above.

.. warning:: L2TP is **not** a secure protocol by itself; it only provides
   tunneling, **not encryption**.

Setup
-----

The L2TP server settings can be found in the pfSense® webGUI under
**VPN > L2TP**.

Options specific to L2TP are available to set: **Interface**, **Server
Address**, **Subnet Mask**, and other items. These are all explained on
the configuration page.

It can use internal authentication or pass off authentication to a
:doc:`RADIUS server </usermanager/user-authentication-servers>`.

L2TP/IPsec
----------

L2TP/IPsec is a way to secure L2TP traffic by sending it through an
encrypted IPsec tunnel. This may be used in combination with a mobile
IPsec setup to configure L2TP+IPsec; see :doc:`/vpn/ipsec/l2tp-ipsec`
for more details.
