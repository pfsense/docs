Accessing Port Forwards from Local Networks
===========================================

By default, pfSense® software does not redirect internally connected devices to
reach forwarded ports and 1:1 NAT on WAN interfaces. If a client is
trying to reach a service on port 80 or 443 (or the port a web interface
is using if it has been changed), the connection will hit the web
interface and they will be presented with a certificate error if the GUI
is running HTTPS, and a DNS rebinding error since it's an unrecognized
hostname.

NAT Reflection employs techniques to redirect these connections if
required. Split DNS is usually the better way if it is possible on a
network because it allows for retaining of the original source IP and
avoids unnecessarily looping internal traffic through the firewall. Both
are explained here.

Method 1: NAT Reflection
------------------------

In order to access ports forwarded on the WAN interface from internal
networks, NAT reflection must be enabled.

In order to do this, navigate to **System > Advanced**, **Firewall/NAT**
tab. On that page, select *Pure NAT* for **NAT Reflection mode for port
forwards**, check **Enable NAT Reflection for 1:1 NAT**, and check
**Enable automatic outbound NAT for Reflection**. Click **Save**.

*Pure NAT* mode for port forward reflections uses only pf NAT rules to
accomplish reflection without any external daemons. It will work with
TCP, UDP, and other protocols.

*NAT+Proxy* mode for port forward reflection sets up a proxy daemon and
rules to receive and reflect only TCP connections. This method the only
available means of reflection in earlier versions of pfSense software.
It can work in certain rare circumstances where Pure NAT mode does not.
This will only work with single port forwards or ranges of less than 500
ports. It does not work with UDP or other protocols.

.. image:: /_static/nat/natreflection.png
   :align: center

Method 2: Split DNS
-------------------

The more elegant solution to this problem involves using Split DNS.
Basically this means that internal and external clients resolve
hostnames differently.

Internal clients would access resources by hostname, not IP, and clients
on the local network would resolve that hostname to the LAN IP address
of the actual server, and not the WAN IP as others outside the network
would see.

In order for this to work using the DNS Forwarder or Resolver in
pfSense software, clients will need to have the IP Address of the pfSense
router as their primary DNS server.

Example:

-  www.example.com resolves to public IP 1.2.3.4, which is the WAN IP
-  Forward port 80 on 1.2.3.4 to port 80 on 192.168.1.5
-  Override www.example.com using **System > DNS Resolver** (or DNS
   Forwarder, if using it instead) and point www.example.com to
   192.168.1.5

   -  Another internal DNS mechanism could also be used to enact the
      override.

Screenshots that show the above in practice:

.. image:: /_static/nat/splitdns-forwarder-add.png
   :align: center

.. image:: /_static/nat/splitdns-forwarder-example.png
   :align: center
