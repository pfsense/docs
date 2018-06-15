.. include:: /substitutions.rsti

Configuring a Site-to-Site Static Key OpenVPN Instance
======================================================

Connecting two sites using OpenVPN is very simple. One side is
configured as a client, and the other as a server. OpenVPN in shared key
mode is the recommend method for site to site connections, unless there
are a half dozen or more sites. For PKI and advanced
options/configurations see
:doc:`/vpn/openvpn/configuring-a-site-to-site-pki-ssl-openvpn-instance` and the
|book_link|.

The instructions below are for basic site to site connectivity. For
other modes such as SSL/TLS, or remote access, look in the
:doc:`/vpn/openvpn/index` section.

Info
----

Both IPsec and OpenVPN may be enabled/in use at the same time, however,
not for the same subnets. Any IPsec tunnel that references the same pair
of subnets configured for use in OpenVPN must be disabled. IPsec and
OpenVPN do not conflict otherwise.

The way OpenVPN works is that one end of the tunnel needs to be the
"server" and the other the "client", it does not matter which, though if
there is more than one remote site, the main "hub" site should be the
server. If one site has a dynamic IP address and the other has a static
IP address, then the static IP address end should be the server.

**A firewall rule must be created on the Server to allow traffic through
to the interface and port where the server is running**, otherwise the
traffic will be blocked and the VPN will fail to connect. To allow or
filter incoming traffic inside the VPN tunnel, add rules to the
**OpenVPN** tab under **Firewall > Rules**.

For more than 6 site to site connections, :doc:`SSL/TLS (PKI) </vpn/openvpn/configuring-a-site-to-site-pki-ssl-openvpn-instance>`
can be a better fit for ease of management. Both methods work and require a fair
amount of configuration on the server for each site, but there is lower overhead
with SSL/TLS since it runs a single server process.

Server Settings
---------------

Navigate to **VPN > OpenVPN**, **Servers** tab (default tab). Click |fa-plus|
to create a new OpenVPN server.

Use the following options: **Server Mode** : *Peer to Peer (Shared Key)*

**Protocol** : *UDP* - TCP is undesirable because every lost packet is
retransmitted, and if TCP is used inside the tunnel it will be
retransmitted anyway. This will slow down the VPN if there is a lot of
lost traffic on the WAN connection. TCP is really only useful to bypass
firewalls, in which case the port should be set to *443* as almost no
one blocks access to that port. The protocol must match on each side.

**Device Mode** : *tun*

**Interface** : Whichever interface server will use for incoming
connections. Typically *WAN*, but may be an OPT WAN.

**Local Port** : The port this OpenVPN server will listen on. 1194 is
the default OpenVPN port. Each server requires a unique port. Make sure
not to use a port in use by another service otherwise problems can
occur. If using port *443*, ensure the WebGUI is not running on that
port first.

**Description** : A name for this VPN. Shows up in various places where
the VPN can be selected from a list, such as **Status > Services**, or
**Diagnostics > Packet Capture**.

**Shared key** : The keys can be made in the GUI. Check "Automatically
generate a shared key.", and when the settings are saved, a key will be
generated. Then copy/paste the key into the client.

**Encryption algorithm** : This setting must match on both sides. Any of
the crypto options are fine, it depends on the user preference. If using
ALIX hardware, use *aes-128-cbc*, see :doc:`Are cryptographic accelerators supported </hardware/cryptographic-accelerator-support>` For most others,
*aes-256-cbc* is a good choice.

**Hardware Crypto** : If the device has hardware crypto support, choose
it from this list. For ALIX and many others, use *BSD cryptodev engine*
to use supported onboard devices.

**IPv4 Tunnel Network** : The suggested default in the GUI of
*10.0.8.0/24* is sufficient, but any random unused network inside of the
RFC1918 space is recommended. For site-to-site shared key, only a /30 is
used, not a /24, even if /24 is specified.

**IPv4 Remote networks** : Enter the remote (Client Side) LAN here. To
access more than one network, add them all here separated by a comma
(e.g. *10.10.10.0/24, 192.168.10.0/24*).

**Compression** : Set this if to compress data on the tunnel. If bulk
data or encrypted protocols like https/ssh are used primarily, this may
only add unnecessary overhead. *Enabled with Adaptive Compression* is a
good compromise as it will periodically test the compression of data and
enable/disable as needed when it can help.

**Type-of-Service** : Set the TOS IP header value of tunnel packets to
match the encapsulated packet value. Useful for traffic shaping on the
OpenVPN traffic itself, but it does expose some data about the contents
of the packet so it is a potential security risk.

**Firewall Rules** : Don't forget to add a firewall rule on the WAN tab
under **Firewall > Rules** (or whichever interface the server is running
on) to allow traffic to reach the OpenVPN server's IP:port where it is
listening. Also don't forget rules on the OpenVPN tab to allow traffic
inside the tunnel.

Client Settings
---------------

Navigate to **VPN > OpenVPN**, **Clients** tab. Click |fa-plus| to create a
new OpenVPN client.

**Server Mode** : *Peer to Peer (Shared Key)*

**Protocol** : Match the setting from the server side.

**Device Mode** : *tun*

**Interface** : Interface to use for outbound traffic. Typically WAN,
but may be an OPT WAN.

**Local Port** : Leave this blank for a random port. The port this
OpenVPN client will use for its side (source port). Each process
requires a unique port. Make sure not to use a port in use by another
service otherwise problems can occur. Leaving this box blank is best.

**Server host or address**: IP (*203.0.113.19*) or FQDN
(*vpn.example.com*)

**Server Port**: The port used by the OpenVPN server.

**Description** : A name for this VPN.

**Shared key** : Copy/paste the key from the server.

**Encryption algorithm** : Match the setting from the server side.

**Hardware Crypto** : Hardware specific. See the same setting in the
server section.

**IPv4 Tunnel Network** : Match the setting from the server side.

**IPv4 Remote networks** : Enter the remote (Server Side) LAN here. To
access more than one network, add them all here separated by a comma
(e.g. *10.10.9.0/24, 192.168.9.0/24*).

**Compression** : Match the setting from the server side.

**Type-of-Service** : See the same setting in the server section.

**Firewall Rules** : Don't forget to add rules to **Firewall > Rules**
on the **OpenVPN** tab to allow traffic inside the tunnel.
