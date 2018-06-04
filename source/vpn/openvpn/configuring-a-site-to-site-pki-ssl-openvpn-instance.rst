.. include:: /substitutions.rsti

Configuring a Site-to-Site PKI (SSL) OpenVPN Instance
=====================================================

This how-to covers how to setup OpenVPN using Site-to-Site PKI (SSL).
For users who want to make a hub-and-spoke multi-site setup, as opposed
to a mesh, this method may be a good fit.

One pfSense router is the server and the others are clients. The
primary/main office is typically the server, but whichever site has the
most bandwidth and fastest firewall may be the best choice.

Generate keys/Certificates
--------------------------

This how-to will be using pfSense for the PKI infrastructure. If there
is already an existing infrastructure or do not wish to use pfSense for
this task, existing certificates may be used or generated elsewhere.
CAs/Certificates generated outside pfSense must be :doc:`imported into pfSense </certificates/certificate-management>`.

The CA and Certificates :doc:`may be created </certificates/certificate-management>`
under **System > Cert Manager** on pfSense, or use certificates made
with the OpenVPN wizard. The certificates are stored in config.xml, so a
normal configuration backup will keep them safe.

Ensure there is one CA, one *Server* Certificate, and one *User*
certificate for each client site. For the **Common Name** of each
certificate, use the hostname of the firewall or some other easily
distinguishable unique name for each site.

Server Setup
------------

The bulk of the OpenVPN server setup is fairly straightforward, similar
to that for a :doc:`remote access setup </vpn/openvpn/openvpn-remote-access-server>`.

-  **Server Mode**: *Peer to Peer (SSL/TLS)*
-  **TLS Authentication**: Check box boxes
-  **Peer Certificate Authority**: The CA created in the :doc:`cert manager </certificates/certificate-management>`
-  **Server Certificate**: The *Server* certificate created in the :doc:`cert manager </certificates/certificate-management>`
-  **IPv4 Tunnel Network**: An *unused* subnet. When using subnet
   topology, OpenVPN will assign one address out of this pool to each
   client. When using the older “net30” topology, OpenVPN will carve /30
   networks (4 IP addresses each) for each client connection out of this
   network. Make sure this network is large enough to handle all of the
   clients. With net30 allocations, a /24 will fit 63 clients (64 total
   /30 entries, but the server itself uses the first.)
-  **IPv4 Local Networks**: Local subnet that clients can access here at
   the server location. Additional local subnets may be added, separated
   by commas.
-  **IPv4 Remote Networks**: A comma-separated list of all the remote
   client LAN networks (e.g. *10.10.10.0/24, 192.168.10.0/24*)

Finish the Server Configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Look over the settings, and adjust any other required settings, such as
the **Encryption Algorithm**, **Compression**, etc.

Press **Save** when done.

iroutes
^^^^^^^

In order for the server to reach the client networks behind each
connection, both a route to the network (**IPv4 Remote Networks** entry)
to tell the system that OpenVPN knows about that network, and also an
*iroute* that tells OpenVPN to which specific connection a subnet
belongs.

To add an *iroute*, visit **VPN > OpenVPN** on the **Client Specific
Overrides** tab.

Add an entry for each client, and on each one:

- Set the **Common Name** field to the name of the certificate for the
  site
- On pfSense 2.2, use the **IPv4 Remote Network/s** here on the Client
  Specific Override to add *iroute* networks.
- On older versions of pfSense, in the custom options/advanced box, add
  an **iroute** statement for the client network::

    iroute a.a.a.a b.b.b.b;

  Where **a.a.a.a** is the subnet's starting IP, and **b.b.b.b** is the subnet
  mask.

Firewall Rules
^^^^^^^^^^^^^^

Be sure to add firewall rules under **Firewall > Rules**, on the
**OpenVPN** tab.

Also add a firewall rule on WAN to permit traffic to the OpenVPN port
configured for the server.

Client Setup
------------

Export the CA certificate only (not the CA key), along with the client
certificate and client key for this site. Import them into the client
firewall under **System > Cert Manager**.

For the client VPN configuration:

-  **Server host or address**: The server's IP address
-  **Server port**: The server's OpenVPN port.
-  **TLS Authentication**:

   -  Check **Enable authentication of TLS packets**.
   -  *Uncheck* **Automatically generate a shared TLS authentication
      key.**
   -  Copy/Paste the TLS shared key from the server configuration.

-  **IPv4 Tunnel Network** should be left *blank*
-  **Peer Certificate Authority**: The CA imported to the :doc:`cert manager </certificates/certificate-management>`
-  **Client Certificate**: The *User* certificate imported to the :doc:`cert manager </certificates/certificate-management>`
-  Use the same **Protocol**, **Encryption Algorithm**, and
   **Compression** settings as chosen on the server.

Finish Up
^^^^^^^^^

Save the client configuration. It will attempt a connection to the
server. If it does not connect immediately, check the logs under
**Status > System Logs** on the OpenVPN tab on both the client and
server firewalls.

