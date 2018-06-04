.. include:: /substitutions.rsti

OpenVPN
=======

`OpenVPN <https://www.openvpn.net>`__ is an Open Source VPN server and
client that is supported on a variety of platforms, including pfSense.
It can be used for Site-to-Site or Remote Access VPN configurations.

OpenVPN can work with shared keys or with a PKI setup for SSL/TLS.
Remote Access VPNs may be authenticated locally, or using an external
authentication source such as RADIUS or LDAP.

There are many possible ways to configure OpenVPN in pfSense.

Some common uses include:

-  :doc:`OpenVPN Remote Access Server </vpn/openvpn/openvpn-remote-access-server>`,
   which can automatically export client installers and configurations
   using the :doc:`OpenVPN Client Export Package </vpn/openvpn/using-the-openvpn-client-export-package>`.
-  :doc:`OpenVPN Site To Site </vpn/openvpn/configuring-a-site-to-site-static-key-openvpn-instance>`, shared key
   Site-to-Site VPNs (One site pair per tunnel).
-  `OpenVPN Site-to-Site PKI (SSL) <OpenVPN_Site-to-Site_PKI_(SSL)>`__,
   a Site-to-Multi-Site VPN with one server and many remote sites.
