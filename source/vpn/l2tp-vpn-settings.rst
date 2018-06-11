.. include:: /substitutions.rsti

L2TP VPN Settings
=================

Overview
--------

The L2TP (Layer 2 Tunneling Protocol) VPN protocol allows L2TP-only
clients to connect remotely. It works much like the
`PPTP <PPTP_VPN_Settings>`__ server, in that it tunnels Layer 2 Traffic.

Note that by itself, L2TP is **not** a secure protocol; it only provides
tunneling, but not any cencruption.

Setup
-----

The L2TP server settings can be found under **VPN > L2TP**.

Options specific to L2TP are available to set: **Interface**, **Server
Address**, **Subnet Mask**, and other items. These are all explained on
the configuration page.

It can use internal authentication or pass off authentication to a
:doc:`RADIUS server </usermanager/user-authentication-servers>`.

L2TP/IPsec
----------

L2TP/IPsec is a way to secure L2TP traffic by sending it through an
encrypted IPsec tunnel.

2.1.x and earlier
~~~~~~~~~~~~~~~~~

pfSense 2.1.x and earlier do **not** support L2TP+IPsec; they only
support for plain L2TP tunneling. See `Ticket
#475 <http://redmine.pfsense.org/issues/475>`__

2.2 and up
~~~~~~~~~~

pfSense 2.2 and later this may be used in combination with a mobile
IPsec setup to configure L2TP+IPsec; see :doc:`L2TP/IPsec </vpn/ipsec/l2tp-ipsec>` for
details.

