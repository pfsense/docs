.. include:: /substitutions.rsti

OpenVPN Settings
================

`OpenVPN <http://openvpn.net/>`__ is an Open Source, OpenSSL-based,
routed VPN. It can be used for site-to-site or remote access VPN setups,
and due to its open and robust nature, its use is encouraged wherever
possible. There are clients for multiple platforms (Windows, OS X, BSD,
Linux, Android, iOS, etc), and it allows much more flexibility in
routing than IPsec.

OpenVPN configuration is performed under **VPN > OpenVPN**. For more
details and How-To articles, see
`:Category:OpenVPN <:Category:OpenVPN>`__ or for the most thorough and
easy-to-follow documentation, see `pfSense: The Definitive
Guide <http://pfsense.org/book>`__.

OpenVPN requires the use of a PKI CA/certificate structure setup for
configurations using SSL/TLS. The certificates for a PKI setup can be
managed as described in the :doc:`Certificate Management </certificates/certificate-management>` article. Setup the certificates
there beforehand.

OpenVPN also has an add-on package for a :doc:`OpenVPN Client Export Package </vpn/openvpn/using-the-openvpn-client-export-package>` which automatically creates
configuration files and Windows client installers to download.

The interface will change depending on the options chosen. Options which
are not relevant to the type of setup being performed are hidden, rather
than disabled.

Server
------

The **Server** tab is where OpenVPN server processes are
managed. These are processes
that will listen for incoming connections from a remote peer.

With a remote access (road warrior) setup, pfSense is the server. A
remote access setup can use SSL/TLS, user authentication, or both.

With a peer-to-peer setup, one site is a server and the other site is a
client, it does not matter much which is which, though if one site has a
static IP address then it would work best as a server. A peer-to-peer
setup can be either SSL/TLS or Shared Key.

Client
------

The **Client** tab contains OpenVPN clients which make connections to
remote OpenVPN servers. These could be Site-to-Site VPNs, or to VPN
providers.

The OpenVPN client is only for peer-to-peer setups, not remote access.
As with the server definitions, SSL/TLS or Shared Key may be used.

Client Specific Overrides
-------------------------

When using a SSL/TLS setup, additional client-specific configurations
may be managed under this tab.
These are distinguished based on the **Common Name** attribute of the
certificate being used to connect, or the username if authentication is
enabled.

These overrides may be used to specify per-user IP addresses, routes or
iroutes specific to a remote site, and so on.
