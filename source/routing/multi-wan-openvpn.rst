.. include:: /substitutions.rsti

Using OpenVPN with Multi-WAN
============================

OpenVPN servers can be used with any WAN, or multiple WANs, as can
OpenVPN clients. This document covers only a remote access OpenVPN
server, but a similar process could be applied for site to site VPNs.

There are many different ways to configure multiple WANs with OpenVPN on
pfSense for remote access or site to site VPNs. Many of these were
covered during the September 2014 |hangout_link|.

.. seealso:: The "Advanced OpenVPN Concepts" presentation is available through
  |hangout_link|.

OpenVPN Configuration
---------------------

First, get OpenVPN working as desired on the primary WAN interface. Once
it is properly functioning, make a backup just in case.

Bind to Localhost and Setup Port Forwards
-----------------------------------------

The OpenVPN configuration needs to be adjusted so it can be reached from
either WAN. The simplest way to do this is by changing the **Interface**
on the VPN connection to be *Localhost*, and then adding a port forward
on each WAN to redirect the OpenVPN port to *Localhost* (127.0.0.1).

For example: If there are two WANs and the OpenVPN server is running on
port *1194*, set the **Interface** to *Localhost*, then add two port
forwards:

-  WAN1 - *UDP*, Source \*, Destination *WAN1 Address* port *1194*,
   redirect target *127.0.0.1* port *1194*
-  WAN2 - *UDP*, Source \*, Destination *WAN2 Address* port *1194*,
   redirect target *127.0.0.1* port *1194*

Configure Clients
-----------------

Clients may be configured to use the second WAN by adding a second
*remote* statement to their configuration, such as::

  remote x.x.x.x 1194 udp

Where *x.x.x.x* is the second WAN IP address or host name.

This process can be automated by using the OpenVPN Client Export
package. When exporting a client, in **Host Name Resolution** choose one
of:

-  Automagic Multi-WAN IPs (port forward targets): Adds a remote
   statement for each port forward found targeting the interface binding
   and port used by this VPN, uses the IP address of each WAN as-is.
-  Automagic Multi-WAN DDNS Hostnames (port forward targets): Like
   above, but uses the first located Dynamic DNS hostname for a given
   WAN. If the WAN is a private IP, this may be the better choice.

More than two WAN connections
-----------------------------

The same steps can be repeated to add more WAN connections. Add a port
forward to any additional WAN. Clients will need an updated
configuration file if another WAN is added later.
