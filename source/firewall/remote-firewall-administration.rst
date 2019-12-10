Allowing Remote Access to the webGUI
====================================

Several ways exist to remotely administer a pfSense® firewall that come
with varying levels of recommendation. They all work, but their use may
vary for any number of reasons (Client restrictions, corporate policies,
etc.)

Use a VPN
---------

The safest way to accomplish the task is to setup a VPN that will allow
access to the pfSense firewall and the network it protects. There are
several VPN options available in pfSense, such as
:doc:`OpenVPN </vpn/openvpn/openvpn-remote-access-server>` or
:doc:`IPsec </vpn/ipsec/configuring-an-ipsec-remote-access-mobile-vpn-using-ikev1-xauth>`. SSH tunneling to
the GUI is also possible. Once a VPN is in place, the GUI may be reached
safely by using a local address such as the LAN IP address. The exact
details will vary depending on the VPN configuration.

Restricted Firewall Access
--------------------------

If the webGUI port must be to the Internet, restrict it by IP
address/range as much as possible. Ideally, if there is a static IP
address at the location to manage from, allow traffic from that IP or
subnet and nowhere else. Aliases are good to use, and they may include
fully qualified domain names as well. If the remote management clients
have a dynamic DNS address, add it to a management alias.

Use HTTPS
---------

HTTPS should always be used to encrypt access to the webGUI port. Modern
browsers may complain about the certificate, but an exception can
usually be stored so it will only complain the first time. To use HTTPS
then it will be necessary to enable it under **System > Advanced**,
**Admin Access** tab, using the *Protocol* option in the
**webConfigurator** section.

Move the webGUI to an Alternate port
------------------------------------

Is is also a good idea to move the webGUI to a non-standard, random
port. Just make sure to remember what it is! This does not improve the
actual security of the GUI itself, but can potentially reduce the number
of brute force attempts against it. It can still be found by scanners
unless the port is properly filtered.

The port for the GUI can be changed under **System > Advanced**, **Admin
Access** tab, using the *TCP Port* option in the **webConfigurator**
section. Avoid common ports like *443*, *31337*, *8080*, *8888*, etc.

I really don't care much about security, how do I open it all the way up?
-------------------------------------------------------------------------

To open the firewall GUI up completely, create a firewall rule to allow
remote firewall administration - do not create a port forward or any
other NAT configuration.

Example Firewall Rule Setup
---------------------------

**Firewall > Rules**, WAN Tab

*  **Action**: *pass*
*  **Interface**: *WAN*
*  **Protocol**: *TCP*
*  **Source**: *Any* (or restrict by IP/subnet)
*  **Destination**: *WAN Address*
*  **Destination port range**: *HTTPS* (Or the custom port)
*  **Description**: *Allow remote management from anywhere (Dangerous!)*

.. image:: /_static/firewall/remoteadminexample.png
   :align: center

Strict Management
-----------------

For a better example of strict GUI access control, see :doc:`Restrict access to management interface </firewall/restrict-access-to-management-interface>`.
