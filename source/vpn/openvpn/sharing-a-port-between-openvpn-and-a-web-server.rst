.. include:: /substitutions.rsti

Sharing a Port between OpenVPN and a Web Server
===============================================

To be extra sneaky/careful with an OpenVPN server, take advantage of
OpenVPN's port-share capability that allows it to pass any non-OpenVPN
traffic to another IP behind the firewall.

Often on locked-down networks, only ports like 80 and 443 will be
allowed out for security reasons, and running OpenVPN instances on these
allowed ports can help to get out in situations where access may
otherwise be restricted.

The usual use case for this would be to run the OpenVPN server on port
tcp/443, and in place of a port forward, let OpenVPN hand off the HTTPS
traffic to a web server.

To set this up, configure an OpenVPN server to listen on TCP port 443,
and add a firewall rule to pass traffic to the WAN IP (or whatever IP
used for OpenVPN) on port 443. There are no port forwards or firewall
rules required to pass the traffic to the internal IP.

In the custom options of the OpenVPN instance, add the following::

  port-share x.x.x.x 443

Where *x.x.x.x* is the internal IP address of the web server to which
the non-VPN traffic will be forwarded.

Now if OpenVPN client hits that port, it will connect and work fine, and
if a web browser is pointed at the same IP and port using HTTPS, it will
be connected to the web server.

.. note:: This requires using TCP, and may result in reduced VPN
   performance.
