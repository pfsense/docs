*******
OpenVPN
*******

`OpenVPN`_ is an Open Source VPN server and client that is supported on a
variety of platforms, including pfSense® software. It can be used for 
Site-to-Site or Remote Access VPN configurations.

OpenVPN can work with shared keys or with a PKI setup for SSL/TLS. Remote Access
VPNs may be authenticated locally, or using an external authentication source
such as RADIUS or LDAP.

There are many possible ways to configure OpenVPN in pfSense software, for more
information see the resources below:

.. toctree::
   :maxdepth: 1

   openvpn-remote-access-server
   configuring-a-site-to-site-pki-ssl-openvpn-instance
   configuring-a-site-to-site-static-key-openvpn-instance
   configuring-a-single-multi-purpose-openvpn-instance
   openvpn-settings
   openvpn-traffic-filtering
   openvpn-logs
   openvpn-status
   connecting-from-apple-ios-devices-with-openvpn
   connecting-openvpn-sites-with-conflicting-ip-subnets
   connecting-pfsense-to-an-openvpn-access-server
   openvpn-bridging
   authenticating-openvpn-users-with-freeradius
   authenticating-openvpn-users-with-radius-via-active-directory
   routing-internet-traffic-through-a-site-to-site-openvpn-connection-in-pfsense-2-1
   sharing-a-port-between-openvpn-and-a-web-server
   openvpn-adapter-address-icmp-behavior
   troubleshooting-openvpn-internal-routing-iroute
   troubleshooting-openvpn-push-routes
   troubleshooting-openvpn-remote-access-client-ip-address-assignments
   troubleshooting-windows-openvpn-client-connectivity
   troubleshooting-windows-smb-share-access-from-openvpn-clients
   using-the-openvpn-client-export-package

.. _OpenVPN: https://www.openvpn.net
