.. include:: /substitutions.rsti

Configuring a Single Multi-Purpose OpenVPN Instance
===================================================

This Howto details one way to make a single OpenVPN server go a long
way. Using this method access can be provided to a large pool of
addresses for general access and then make use of some of the less
intuitive features of OpenVPN to provide properly locked down access for
various classes of user.

The end result is this:

-  Single OpenVPN server instance listening on port 443/tcp
-  A pool of addresses for general access on a single subnet
-  A series of tiny address ranges (/30) that effectively allocate a
   static IP address to specific end users that can be easily grouped
   and firewalled

Setup
-----

OpenVPN server
~~~~~~~~~~~~~~

-  Create the OpenVPN server as normal
-  Set *TCP*, port *443*, and mode *tun*
-  Set the **IPV4 Tunnel Network** as something similar to
   *10.33.249.0/24*
-  Do not set **IPv4 Local Network(s)**.

The third octet should be a number far removed from VLAN/subnet numbers,
a /24 is enough for most configurations.

This means that all connections will get an address from a global pool
but they are useless unless access is allowed from that subnet in the
firewall rules for the OpenVPN “interface”

Pick a subnet such as *10.33.250.0/24* which is not in use. This will be
broken up into /30 mini subnets - one per client. If those run out, then
start on *10.33.251.0/24*. Each of these new subnets needs a route in
the main OpenVPN server Advanced settings, such as::

  route 10.33.250.0 255.255.255.0;

OpenVPN certificate
~~~~~~~~~~~~~~~~~~~

Create a certificate in the usual way. I suggest setting the common name
to first.last or company.first.last.

OpenVPN Client specific overrides
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For each client create a **Client specific override**.

The tunnel networks will be **/30s** (i.e. One address for the network,
one for the pfSense OpenVPN server, one for the client and one for
broadcast). So the first one will be *10.33.127.0/30* and the second one
will be *10.33.127.4/30* and so on.

-  Set the **Common Name** to first.last or what ever was used for the
   certificate
-  **Description** - set to the Tunnel Network range, to make it easy to
   spot who has what
-  **Tunnel Network** = last one allocated + 4 (see above)
-  **Advanced** - *push “route 10.33.x.0 255.255.255.0”;*

In the *route* above *x* is the customer network that this client may
access.

Firewall rules
~~~~~~~~~~~~~~

The client specific override forces a static IP onto the client which
will be the third address in the range, for example:

::

    10.33.250.8/30
    10.33.250.9
    10.33.250.10 - this is the static IP address for the client.
    10.33.250.11

If there are several clients that access the same VLANs/subnets then put
them together in an alias. Now add a rule on the OpenVPN tab of the
Firewall rules granting access from the alias to the relevant subnets.

Notes
-----

-  Remember a client in this scheme needs to have a push route and a
   firewall rule to be be able access resources.
-  It is recommended to allow ICMP everywhere on the OpenVPN firewall
   rules tab to help debugging.

Why use port 443/tcp ?
~~~~~~~~~~~~~~~~~~~~~~

Listening on port 443/tcp is optional but can be useful. Many firewalls
allow outbound access to destination port 443/tcp (https) or the ability
of OpenVPN to go through web proxies may be utilized. There tend to be
less problems using port 433. If there is only one external IP address
available and need to run a web server on it then this will be
impractical, use port 1194 in that case, or see `Sharing a Port with
OpenVPN and a Web
Server <Sharing_a_Port_with_OpenVPN_and_a_Web_Server>`__. UDP is best
for VPNs, but port 443 is used, then use TCP.
