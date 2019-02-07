Troubleshooting OpenVPN Push Routes
===================================

If it appears that OpenVPN will not push routes to a client, ensure that a
:doc:`Multi-site style PKI/SSL setup
</vpn/openvpn/configuring-a-site-to-site-pki-ssl-openvpn-instance>` is in use
and not a :doc:`shared key setup
</vpn/openvpn/configuring-a-site-to-site-static-key-openvpn-instance>` or an
SSL/TLS setup using a /30 tunnel network.

Routes cannot be pushed on a shared key setup or an SSL/TLS setup using a /30
tunnel network. Routes may be directly added to the client configuration using
the **IPv4 Remote Networks** list (e.g. ``192.168.99.0/24, 192.168.203.0/24``)
