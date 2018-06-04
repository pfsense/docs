.. include:: /substitutions.rsti

OpenVPN Adapter Address ICMP Behavior
=====================================

Sometimes OpenVPN will not respond to ping on certain virtual addresses
used solely for routing endpoints when using the *net30* topology. Do
not rely on pinging the OpenVPN endpoint addresses as a means of
determining if the tunnel is passing traffic properly. Instead, ping
something in the remote subnet, such as the LAN IP of the server.

According to the `OpenVPN
FAQ <http://www.openvpn.net/index.php/documentation/faq.html>`__, in the
section titled *Why does OpenVPN's “ifconfig-pool” option use a /30
subnet (4 private IP addresses per client) when used in TUN mode?*:

.. pull-quote::

   As 192.168.1.5 is only a virtual IP address inside the OpenVPN
   server, used as an endpoint for routes, OpenVPN doesn't bother to
   answer pings on this address, while the 192.168.1.1 is a real IP
   address in the servers O/S, so it will reply to pings.

This may seem a little counter-intuitive, since on the server something
like this is seen in the ifconfig output::

  tun0: flags=8051<UP,POINTOPOINT,RUNNING,MULTICAST> metric 0 mtu 1500
          inet6 fe80::202:b3ff:fe03:8028%tun0 prefixlen 64 scopeid 0xc
          inet 192.168.100.1 --> 192.168.100.2 netmask 0xffffffff
          Opened by PID 27841

While the client shows::

  tun0: flags=8051<UP,POINTOPOINT,RUNNING,MULTICAST> metric 0 mtu 1500
          inet6 fe80::202:b3ff:fe24:978c%tun0 prefixlen 64 scopeid 0xa
          inet 192.168.100.6 --> 192.168.100.5 netmask 0xffffffff
          Opened by PID 1949

In this case, *.5* or *.1* will not likely respond to ping. *.5* because
it's a virtual address, and *.1* because the client has no route to
reach it directly. The *.5* and *.6* addresses are part of a */30* that
goes from *.4* to *.7*, and trying to ping *.1* would go out the default
route instead.

There are many cases where the far side of an OpenVPN tunnel **can**
respond to ping, but not the local. This is also counter-intuitive, but
works especially in cases where there is a site-to-site link. If the
server shows its tun addresses as “x.x.x.1 -> x.x.x.2” and the client
shows the reverse - “x.x.x.2 -> x.x.x.1”, then the far side will likely
respond to ping from both ends.

In contrast, when using “topology subnet” these virtual addresses and
/30 subnets are not used so these issues are not present.
