L2TP/IPsec
==========

L2TP/IPsec is a common VPN type that wraps L2TP, an insecure tunneling
protocol, inside a secure channel built using transport mode IPsec.

L2TP/IPsec is supported starting with pfSense 2.2-RELEASE. This article
will explain how to configure the service and setup clients.

 .. warning:: Users have reported issues with Windows L2TP/IPsec clients behind
    NAT. If the clients will be behind NAT, Windows clients will most likely not
    function. Consider an IKEv2 implementation instead.

Setup L2TP
----------

Configure L2TP Server
^^^^^^^^^^^^^^^^^^^^^

*  Navigate to **VPN > L2TP**
*  Select *Enable L2TP server*
*  Set **Interface** to *WAN*
*  Set **Server Address** to an unused private subnet
   IP, such as *192.168.32.1*

   .. note:: This is **not** a public IP address or "listen" IP for the
      L2TP service, it is a local IP address set as the "gateway" on the
      clients

*  Set **Remote Address Range** to an unused private subnet, such as
   *192.168.32.128*
*  Set **Subnet Mask** to an appropriate value for the client address
   range, such as *25*
*  Set **Number of L2TP Users** to the highest concurrent number of
   expected L2TP users, such as *8*
*  Leave **Secret** blank
*  Set **Authentication Type** to *CHAP*
*  Set **L2TP DNS Servers** as needed, or leave blank
*  Set **RADIUS** options if desired

Add L2TP Users
^^^^^^^^^^^^^^

If RADIUS is not being used, add L2TP users to pfSense.

*  Navigate to **VPN > L2TP**, **Users** tab
*  Click |fa-plus| To add a new user
*  Fill in **Username**, **Password/Confirmation**
*  Set a static **IP address** if needed, in the chosen subnet
*  Click Save

Repeat as needed for additional users.

Setup IPsec
-----------

With the L2TP server prepared, the next task is to configure the
necessary IPsec settings. The settings below have been tested and found
to work, but other similar settings may function as well. Feel free to
try other encryption algorithms, hashes, etc. Report any additional
combinations found to work or not work on the forum.

Mobile Clients Tab
^^^^^^^^^^^^^^^^^^

*  Navigate to **VPN > IPsec**, **Mobile Clients** tab on pfSense
*  Check **Enable IPsec Mobile Client Support**
*  Set **User Authentication** to *Local Database* (Not used, but the
   option must have something selected)
*  Uncheck **Provide a virtual IP address to clients**
*  Uncheck **Provide a list of accessible networks to
   clients**
*  Click **Save**

Phase 1
^^^^^^^

*  Click the **Tunnels** Tab
*  Check **Enable IPsec**
*  Click **Save**
*  Click the **Create Phase1** button at the top if it appears, or edit
   the existing Mobile IPsec Phase 1

   *  If there is no Phase 1, and the **Create Phase1** button does not
      appear, navigate back to the **Mobile Clients** tab and click it
      there.

*  Set **Key Exchange version** to *v1*
*  Enter an appropriate **Description**
*  Set **Authentication method** to *Mutual PSK*
*  Set **Negotiation Mode** to *Main*
*  Set **My Identifier** to *My IP address*
*  Set **Encryption algorithm** to *AES 256*
*  Set **Hash algorithm** to *SHA1*
*  Set **DH key group** to *14 (2048 bit)*

   .. note:: iOS and other platforms may work with a **DH key group** of
      *2* instead.

*  Set **Lifetime** to *28800*
*  Uncheck **Disable Rekey**
*  Uncheck **Disable Reauth**
*  Set **NAT Traversal** to *Auto*
*  Check **Enable DPD**, set for *10* seconds and *5* retries
*  Click **Save**

Phase 2
^^^^^^^

*  Click |fa-plus| to show the Mobile IPsec Phase 2 list
*  Click |fa-plus| to add a new Phase 2 entry if one does not exist, or click
   |fa-pencil| to edit an existing entry
*  Set **Mode** to **Transport**
*  Enter an appropriate **Description**
*  Set **Protocol** to *ESP*
*  Set **Encryption algorithms** to ONLY *AES 128*
*  Set **Hash algorithms** to ONLY *SHA1*
*  Set **PFS Key Group** to *off*
*  Set **Lifetime** to *3600*
*  Click **Save**

Pre-Shared Key
^^^^^^^^^^^^^^

With the IPsec tunnel itself ready, now the pre-shared key must be
configured in a special way, which is common for all clients.

*  Navigate to **VPN > IPsec**, **Pre-Shared Keys** tab on pfSense
*  Click |fa-plus| to add a new PSK
*  Set the **Identifier** to *allusers*

   .. note:: The "allusers" name is a special keyword used by pfSense to
      configure a wildcard PSK, which is necessary for L2TP/IPsec to
      function. Do not use any other **Identifier** for this PSK!

*  Set **Secret Type** to *PSK*
*  Enter a **Pre-Shared Key**, such as *aaabbbccc* -- ideally one a lot
   longer and more random/secure than this example!
*  Click **Save**
*  Click **Apply Changes**

Firewall Rules and NAT
----------------------

Firewall rules are necessary to pass traffic from the client host over
IPsec to establish the L2TP tunnel, and inside L2TP to pass the actual
tunneled VPN traffic to systems across the VPN.

IPsec Rules
^^^^^^^^^^^

*  Navigate to **Firewall > Rules**, **IPsec** tab
*  Review the current rules. If there is an "allow all" style rule, then
   there is no need to add another. Continue to the next task.
*  Click |fa-plus| to add a new rule
*  Set the **Protocol** to *any*, and set the **Source** and
   **Destination** to *any* as well

   .. note:: This does not have to pass all traffic, but must at least
      pass L2TP (UDP port 1701) to the WAN IP address of the firewall

*  Click **Save**
*  Click **Apply Changes**

L2TP Rules
^^^^^^^^^^

*  Navigate to **Firewall > Rules**, **L2TP VPN** tab
*  Review the current rules. If there is an "allow all" style rule, then
   there is no need to add another. Continue to the next task.
*  Click |fa-plus| to add a new rule
*  Set the **Protocol** to *any*, and set the **Source** and
   **Destination** to *any* as well

   .. note:: This does not have to pass all traffic, stricter rules are
      possible to limit where clients can go

*  Click **Save**
*  Click **Apply Changes**

Outbound NAT
^^^^^^^^^^^^

If clients must pass over the VPN and then back out to the Internet,
outbound NAT will most likely be necessary.

*  Navigate to **Firewall > NAT**, **Outbound** tab
*  Check the rules and see if they will apply to L2TP clients. In
   automatic or hybrid modes, the L2TP subnet should be listed in the
   automatic rules section.
*  Add rule(s) to cover the L2TP clients if Manual Outbound NAT is
   enabled and none are present.

DNS Configuration
-----------------

If DNS servers are supplied to the clients, and if the Unbound DNS
Resolver is used, then the subnet chosen for the L2TP clients must be
added to its access list.

*  Navigate to **Services > DNS Resolver**, **Access Lists** tab
*  Click |fa-plus| to add a new access list
*  Enter an **Access List Name**, such as *VPN Users*
*  Set **Action** to *Allow*
*  Click |fa-plus| under **Networks** to add a new network
*  Enter the VPN client subnet into the **Network** box, e.g.
   *192.168.32.128*
*  Choose the proper **CIDR**, e.g. *25*
*  Click **Save**
*  Click **Apply Changes**

Client Setup
------------

Windows
^^^^^^^

Now it is time to create the client VPN connection. There are several
ways to add such a connection, depending on the version of Windows being
used. Adapt as needed.

*  Open **Network and Sharing Center** on the client PC
*  Click **Set up a new connection or network**
*  Select *Connect to a workplace*
*  Click **Next**
*  Select *No, create a new connection*
*  Click **Next**
*  Click **Use my Internet Connection (VPN)**
*  Enter the IP address or hostname of the server into the Internet
   address field
*  Enter a **Destination Name** to identify the connection
*  Click **Create**

The connection has been added but with several undesirable defaults. For
example the type defaults to automatic and it will latch onto a PPTP
connection if one exists, which is very bad. So a few settings should be
set by hand first:

*  In Network Connection / Adapter Settings in Windows, find the
   connection created above
*  Right click the connection
*  Click **Properties**
*  Click the **Security** tab
*  Set **Type of VPN** to *Layer 2 Tunneling Protocol with IPsec
   (L2TP/IPsec)*
*  Click **Advanced settings**
*  Select *Use preshared key for authentication*
*  Enter the **Key** used above, e.g. *aaabbbccc*
*  Click **OK**
*  Set **Data Encryption** to *Require Encryption (disconnect if server
   declines)*
*  Set **Authentication / Allow these protocols** to *Challenge
   Handshake Authentication Protocol (CHAP)* -- set to match the value
   chosen in L2TP
*  Click **OK**

Troubleshooting
---------------

Firewall traffic blocked outbound
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If the firewall logs show traffic blocked "out" on L2TP, then add a
floating firewall rule to work around the block:

*  Navigate to **Firewall > Rules**, **Floating** tab
*  Click |fa-plus| to add a new rule
*  Set **Action** to *Pass*
*  Check **Quick**
*  Select *L2TP VPN* for the **Interface**
*  Set **Direction** to *Out*
*  Set **Protocol** to *TCP*
*  Set **Source**/**Destination** as needed, or set to *any*
*  Advanced Features:

   *  Set **TCP Flags** to *Any flags*
   *  Set **State Type** to *Sloppy State*

Example Logs
------------

IPsec Connect
^^^^^^^^^^^^^

Log entries from a successful IPsec connect::

  Feb 4 13:56:37 charon: 16[NET] received packet: from 192.0.2.52[500] to 192.0.2.90[500] (408 bytes)
  Feb 4 13:56:37 charon: 16[ENC] parsed ID_PROT request 0 [ SA V V V V V V V V ]
  Feb 4 13:56:37 charon: 16[ENC] received unknown vendor ID: 01:52:8b:bb:c0:06:96:12:18:49:ab:9a:1c:5b:2a:51:00:00:00:01
  Feb 4 13:56:37 charon: 16[IKE] <1> received MS NT5 ISAKMPOAKLEY vendor ID
  Feb 4 13:56:37 charon: 16[IKE] received MS NT5 ISAKMPOAKLEY vendor ID
  Feb 4 13:56:37 charon: 16[IKE] <1> received NAT-T (RFC 3947) vendor ID
  Feb 4 13:56:37 charon: 16[IKE] received NAT-T (RFC 3947) vendor ID
  Feb 4 13:56:37 charon: 16[IKE] <1> received draft-ietf-ipsec-nat-t-ike-02\n vendor ID
  Feb 4 13:56:37 charon: 16[IKE] received draft-ietf-ipsec-nat-t-ike-02\n vendor ID
  Feb 4 13:56:37 charon: 16[IKE] <1> received FRAGMENTATION vendor ID
  Feb 4 13:56:37 charon: 16[IKE] received FRAGMENTATION vendor ID
  Feb 4 13:56:37 charon: 16[ENC] received unknown vendor ID: fb:1d:e3:cd:f3:41:b7:ea:16:b7:e5:be:08:55:f1:20
  Feb 4 13:56:37 charon: 16[ENC] received unknown vendor ID: 26:24:4d:38:ed:db:61:b3:17:2a:36:e3:d0:cf:b8:19
  Feb 4 13:56:37 charon: 16[ENC] received unknown vendor ID: e3:a5:96:6a:76:37:9f:e7:07:22:82:31:e5:ce:86:52
  Feb 4 13:56:37 charon: 16[IKE] <1> 192.0.2.52 is initiating a Main Mode IKE_SA
  Feb 4 13:56:37 charon: 16[IKE] 192.0.2.52 is initiating a Main Mode IKE_SA
  Feb 4 13:56:37 charon: 16[ENC] generating ID_PROT response 0 [ SA V V V V V ]
  Feb 4 13:56:37 charon: 16[NET] sending packet: from 192.0.2.90[500] to 192.0.2.52[500] (180 bytes)
  Feb 4 13:56:37 charon: 15[NET] received packet: from 192.0.2.52[500] to 192.0.2.90[500] (388 bytes)
  Feb 4 13:56:37 charon: 15[ENC] parsed ID_PROT request 0 [ KE No NAT-D NAT-D ]
  Feb 4 13:56:37 charon: 15[ENC] generating ID_PROT response 0 [ KE No NAT-D NAT-D ]
  Feb 4 13:56:37 charon: 15[NET] sending packet: from 192.0.2.90[500] to 192.0.2.52[500] (372 bytes)
  Feb 4 13:56:37 charon: 15[NET] received packet: from 192.0.2.52[500] to 192.0.2.90[500] (76 bytes)
  Feb 4 13:56:37 charon: 15[ENC] parsed ID_PROT request 0 [ ID HASH ]
  Feb 4 13:56:37 charon: 15[CFG] looking for pre-shared key peer configs matching 192.0.2.90...192.0.2.52[192.0.2.52]
  Feb 4 13:56:37 charon: 15[CFG] selected peer config "con1"
  Feb 4 13:56:37 charon: 15[IKE] <con1|1> IKE_SA con1[1] established between 192.0.2.90[192.0.2.90]...192.0.2.52[192.0.2.52]
  Feb 4 13:56:37 charon: 15[IKE] IKE_SA con1[1] established between 192.0.2.90[192.0.2.90]...192.0.2.52[192.0.2.52]
  Feb 4 13:56:37 charon: 15[IKE] <con1|1> scheduling reauthentication in 28069s
  Feb 4 13:56:37 charon: 15[IKE] scheduling reauthentication in 28069s
  Feb 4 13:56:37 charon: 15[IKE] <con1|1> maximum IKE_SA lifetime 28609s
  Feb 4 13:56:37 charon: 15[IKE] maximum IKE_SA lifetime 28609s
  Feb 4 13:56:37 charon: 15[IKE] <con1|1> DPD not supported by peer, disabled
  Feb 4 13:56:37 charon: 15[IKE] DPD not supported by peer, disabled
  Feb 4 13:56:37 charon: 15[ENC] generating ID_PROT response 0 [ ID HASH ]
  Feb 4 13:56:37 charon: 15[NET] sending packet: from 192.0.2.90[500] to 192.0.2.52[500] (76 bytes)
  Feb 4 13:56:37 charon: 14[NET] received packet: from 192.0.2.52[500] to 192.0.2.90[500] (316 bytes)
  Feb 4 13:56:37 charon: 14[ENC] parsed QUICK_MODE request 1 [ HASH SA No ID ID ]
  Feb 4 13:56:37 charon: 14[IKE] <con1|1> received 250000000 lifebytes, configured 0
  Feb 4 13:56:37 charon: 14[IKE] received 250000000 lifebytes, configured 0
  Feb 4 13:56:37 charon: 14[ENC] generating QUICK_MODE response 1 [ HASH SA No ID ID ]
  Feb 4 13:56:37 charon: 14[NET] sending packet: from 192.0.2.90[500] to 192.0.2.52[500] (188 bytes)
  Feb 4 13:56:37 charon: 14[NET] received packet: from 192.0.2.52[500] to 192.0.2.90[500] (60 bytes)
  Feb 4 13:56:37 charon: 14[ENC] parsed QUICK_MODE request 1 [ HASH ]
  Feb 4 13:56:37 charon: 14[IKE] <con1|1> CHILD_SA con1{1} established with SPIs cfcf5cfc_i 4beb8c5a_o and TS 192.0.2.90/32|/0[udp/l2f] === 192.0.2.52/32|/0[udp/l2f]
  Feb 4 13:56:37 charon: 14[IKE] CHILD_SA con1{1} established with SPIs cfcf5cfc_i 4beb8c5a_o and TS 192.0.2.90/32|/0[udp/l2f] === 192.0.2.52/32|/0[udp/l2f]
  Feb 4 13:56:40 charon: 14[KNL] interface l2tp0 activated
  Feb 4 13:56:40 charon: 15[KNL] 192.168.32.1 appeared on l2tp0

L2TP Connect
^^^^^^^^^^^^

Log entries from a successful L2TP Connect::

  Feb 4 13:56:38 l2tps: Incoming L2TP packet from 192.0.2.52 1701
  Feb 4 13:56:38 l2tps: L2TP: Control connection 0x80301b608 connected
  Feb 4 13:56:38 l2tps: L2TP: Incoming call #0 via connection 0x80301b608 received
  Feb 4 13:56:38 l2tps: [l2tp0] L2TP: Incoming call #0 via control connection 0x80301b608 accepted
  Feb 4 13:56:38 l2tps: [l2tp0] opening link "l2tp0"...
  Feb 4 13:56:38 l2tps: [l2tp0] link: OPEN event
  Feb 4 13:56:38 l2tps: [l2tp0] LCP: Open event
  Feb 4 13:56:38 l2tps: [l2tp0] LCP: state change Initial --> Starting
  Feb 4 13:56:38 l2tps: [l2tp0] LCP: LayerStart
  Feb 4 13:56:38 l2tps: [l2tp0] L2TP: Call #0 connected
  Feb 4 13:56:38 l2tps: [l2tp0] link: UP event
  Feb 4 13:56:38 l2tps: [l2tp0] link: origination is remote
  Feb 4 13:56:38 l2tps: [l2tp0] LCP: Up event
  Feb 4 13:56:38 l2tps: [l2tp0] LCP: state change Starting --> Req-Sent
  Feb 4 13:56:38 l2tps: [l2tp0] LCP: SendConfigReq #1
  Feb 4 13:56:38 l2tps: ACFCOMP
  Feb 4 13:56:38 l2tps: PROTOCOMP
  Feb 4 13:56:38 l2tps: MRU 1500
  Feb 4 13:56:38 l2tps: MAGICNUM 2ded8fa2
  Feb 4 13:56:38 l2tps: AUTHPROTO CHAP MD5
  Feb 4 13:56:38 l2tps: [l2tp0] LCP: rec'd Configure Request #0 (Req-Sent)
  Feb 4 13:56:38 l2tps: MRU 1400
  Feb 4 13:56:38 l2tps: MAGICNUM 16c02943
  Feb 4 13:56:38 l2tps: PROTOCOMP
  Feb 4 13:56:38 l2tps: ACFCOMP
  Feb 4 13:56:38 l2tps: CALLBACK 6
  Feb 4 13:56:38 l2tps: [l2tp0] LCP: SendConfigRej #0
  Feb 4 13:56:38 l2tps: CALLBACK 6
  Feb 4 13:56:38 l2tps: [l2tp0] LCP: rec'd Configure Request #1 (Req-Sent)
  Feb 4 13:56:38 l2tps: MRU 1400
  Feb 4 13:56:38 l2tps: MAGICNUM 16c02943
  Feb 4 13:56:38 l2tps: PROTOCOMP
  Feb 4 13:56:38 l2tps: ACFCOMP
  Feb 4 13:56:38 l2tps: [l2tp0] LCP: SendConfigAck #1
  Feb 4 13:56:38 l2tps: MRU 1400
  Feb 4 13:56:38 l2tps: MAGICNUM 16c02943
  Feb 4 13:56:38 l2tps: PROTOCOMP
  Feb 4 13:56:38 l2tps: ACFCOMP
  Feb 4 13:56:38 l2tps: [l2tp0] LCP: state change Req-Sent --> Ack-Sent
  Feb 4 13:56:40 l2tps: [l2tp0] LCP: SendConfigReq #2
  Feb 4 13:56:40 l2tps: ACFCOMP
  Feb 4 13:56:40 l2tps: PROTOCOMP
  Feb 4 13:56:40 l2tps: MRU 1500
  Feb 4 13:56:40 l2tps: MAGICNUM 2ded8fa2
  Feb 4 13:56:40 l2tps: AUTHPROTO CHAP MD5
  Feb 4 13:56:40 l2tps: [l2tp0] LCP: rec'd Configure Ack #2 (Ack-Sent)
  Feb 4 13:56:40 l2tps: ACFCOMP
  Feb 4 13:56:40 l2tps: PROTOCOMP
  Feb 4 13:56:40 l2tps: MRU 1500
  Feb 4 13:56:40 l2tps: MAGICNUM 2ded8fa2
  Feb 4 13:56:40 l2tps: AUTHPROTO CHAP MD5
  Feb 4 13:56:40 l2tps: [l2tp0] LCP: state change Ack-Sent --> Opened
  Feb 4 13:56:40 l2tps: [l2tp0] LCP: auth: peer wants nothing, I want CHAP
  Feb 4 13:56:40 l2tps: [l2tp0] CHAP: sending CHALLENGE len:20
  Feb 4 13:56:40 l2tps: [l2tp0] LCP: LayerUp
  Feb 4 13:56:40 l2tps: [l2tp0] LCP: rec'd Ident #2 (Opened)
  Feb 4 13:56:40 l2tps: MESG: MSRASV5.20
  Feb 4 13:56:40 l2tps: [l2tp0] LCP: rec'd Ident #3 (Opened)
  Feb 4 13:56:40 l2tps: MESG: MSRAS-0-WIN-LIIRCM8BRIK
  Feb 4 13:56:40 l2tps: [l2tp0] LCP: rec'd Ident #4 (Opened)
  Feb 4 13:56:40
  Feb 4 13:56:40 l2tps: [l2tp0] CHAP: rec'd RESPONSE #1
  Feb 4 13:56:40 l2tps: Name: "jim"
  Feb 4 13:56:40 l2tps: [l2tp0] AUTH: Auth-Thread started
  Feb 4 13:56:40 l2tps: [l2tp0] AUTH: Trying INTERNAL
  Feb 4 13:56:40 l2tps: [l2tp0] AUTH: INTERNAL returned undefined
  Feb 4 13:56:40 l2tps: [l2tp0] AUTH: Auth-Thread finished normally
  Feb 4 13:56:40 l2tps: [l2tp0] CHAP: ChapInputFinish: status undefined
  Feb 4 13:56:40 l2tps: Response is valid
  Feb 4 13:56:40 l2tps: Reply message: Welcome
  Feb 4 13:56:40 l2tps: [l2tp0] CHAP: sending SUCCESS len:7
  Feb 4 13:56:40 l2tps: [l2tp0] LCP: authorization successful
  Feb 4 13:56:40 l2tps: [l2tp0] Bundle up: 1 link, total bandwidth 64000 bps
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: Open event
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: state change Initial --> Starting
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: LayerStart
  Feb 4 13:56:40 l2tps: [l2tp0] CCP: Open event
  Feb 4 13:56:40 l2tps: [l2tp0] CCP: state change Initial --> Starting
  Feb 4 13:56:40 l2tps: [l2tp0] CCP: LayerStart
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: Up event
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: state change Starting --> Req-Sent
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: SendConfigReq #1
  Feb 4 13:56:40 l2tps: IPADDR 192.168.32.1
  Feb 4 13:56:40 l2tps: COMPPROTO VJCOMP, 16 comp. channels, no comp-cid
  Feb 4 13:56:40 l2tps: [l2tp0] CCP: Up event
  Feb 4 13:56:40 l2tps: [l2tp0] CCP: state change Starting --> Req-Sent
  Feb 4 13:56:40 l2tps: [l2tp0] CCP: SendConfigReq #1
  Feb 4 13:56:40 l2tps: [l2tp0] rec'd unexpected protocol IPV6CP, rejecting
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: rec'd Configure Request #6 (Req-Sent)
  Feb 4 13:56:40 l2tps: IPADDR 0.0.0.0
  Feb 4 13:56:40 l2tps: NAKing with 192.168.32.128
  Feb 4 13:56:40 l2tps: PRIDNS 0.0.0.0
  Feb 4 13:56:40 l2tps: NAKing with 192.168.48.1
  Feb 4 13:56:40 l2tps: PRINBNS 0.0.0.0
  Feb 4 13:56:40 l2tps: SECDNS 0.0.0.0
  Feb 4 13:56:40 l2tps: SECNBNS 0.0.0.0
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: SendConfigRej #6
  Feb 4 13:56:40 l2tps: PRINBNS 0.0.0.0
  Feb 4 13:56:40 l2tps: SECDNS 0.0.0.0
  Feb 4 13:56:40 l2tps: SECNBNS 0.0.0.0
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: rec'd Configure Reject #1 (Req-Sent)
  Feb 4 13:56:40 l2tps: COMPPROTO VJCOMP, 16 comp. channels, no comp-cid
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: SendConfigReq #2
  Feb 4 13:56:40 l2tps: IPADDR 192.168.32.1
  Feb 4 13:56:40 l2tps: [l2tp0] LCP: rec'd Protocol Reject #7 (Opened)
  Feb 4 13:56:40 l2tps: [l2tp0] LCP: protocol CCP was rejected
  Feb 4 13:56:40 l2tps: [l2tp0] CCP: protocol was rejected by peer
  Feb 4 13:56:40 l2tps: [l2tp0] CCP: state change Req-Sent --> Stopped
  Feb 4 13:56:40 l2tps: [l2tp0] CCP: LayerFinish
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: rec'd Configure Request #8 (Req-Sent)
  Feb 4 13:56:40 l2tps: IPADDR 0.0.0.0
  Feb 4 13:56:40 l2tps: NAKing with 192.168.32.128
  Feb 4 13:56:40 l2tps: PRIDNS 0.0.0.0
  Feb 4 13:56:40 l2tps: NAKing with 192.168.48.1
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: SendConfigNak #8
  Feb 4 13:56:40 l2tps: IPADDR 192.168.32.128
  Feb 4 13:56:40 l2tps: PRIDNS 192.168.48.1
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: rec'd Configure Ack #2 (Req-Sent)
  Feb 4 13:56:40 l2tps: IPADDR 192.168.32.1
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: state change Req-Sent --> Ack-Rcvd
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: rec'd Configure Request #9 (Ack-Rcvd)
  Feb 4 13:56:40 l2tps: IPADDR 192.168.32.128
  Feb 4 13:56:40 l2tps: 192.168.32.128 is OK
  Feb 4 13:56:40 l2tps: PRIDNS 192.168.48.1
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: SendConfigAck #9
  Feb 4 13:56:40 l2tps: IPADDR 192.168.32.128
  Feb 4 13:56:40 l2tps: PRIDNS 192.168.48.1
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: state change Ack-Rcvd --> Opened
  Feb 4 13:56:40 l2tps: [l2tp0] IPCP: LayerUp
  Feb 4 13:56:40 l2tps: 192.168.32.1 -> 192.168.32.128
  Feb 4 13:56:40 l2tps: [l2tp0] IFACE: Up event
  Feb 4 13:56:40 l2tps: [l2tp0] no interface to proxy arp on for 192.168.32.128

L2TP Disconnect
^^^^^^^^^^^^^^^

Log entries from a successful L2TP Disconnect::

  Feb 4 13:57:07 l2tps: [l2tp0] LCP: rec'd Terminate Request #10 (Opened)
  Feb 4 13:57:07 l2tps: [l2tp0] LCP: state change Opened --> Stopping
  Feb 4 13:57:07 l2tps: [l2tp0] AUTH: Accounting data for user jim: 29 seconds, 8139 octets in, 737 octets out
  Feb 4 13:57:07 l2tps: [l2tp0] Bundle up: 0 links, total bandwidth 9600 bps
  Feb 4 13:57:07 l2tps: [l2tp0] IPCP: Close event
  Feb 4 13:57:07 l2tps: [l2tp0] IPCP: state change Opened --> Closing
  Feb 4 13:57:07 l2tps: [l2tp0] IPCP: SendTerminateReq #3
  Feb 4 13:57:07 l2tps: [l2tp0] error writing len 8 frame to bypass: Network is down
  Feb 4 13:57:07 l2tps: [l2tp0] IPCP: LayerDown
  Feb 4 13:57:07 l2tps: [l2tp0] IFACE: Down event
  Feb 4 13:57:07 l2tps: [l2tp0] CCP: Close event
  Feb 4 13:57:07 l2tps: [l2tp0] CCP: state change Stopped --> Closed
  Feb 4 13:57:07 l2tps: [l2tp0] IPCP: Down event
  Feb 4 13:57:07 l2tps: [l2tp0] IPCP: LayerFinish
  Feb 4 13:57:07 l2tps: [l2tp0] No NCPs left. Closing links...
  Feb 4 13:57:07 l2tps: [l2tp0] closing link "l2tp0"...
  Feb 4 13:57:07 l2tps: [l2tp0] IPCP: state change Closing --> Initial
  Feb 4 13:57:07 l2tps: [l2tp0] CCP: Down event
  Feb 4 13:57:07 l2tps: [l2tp0] CCP: state change Closed --> Initial
  Feb 4 13:57:07 l2tps: [l2tp0] AUTH: Cleanup
  Feb 4 13:57:07 l2tps: [l2tp0] LCP: SendTerminateAck #3
  Feb 4 13:57:07 l2tps: [l2tp0] LCP: LayerDown
  Feb 4 13:57:07 l2tps: [l2tp0] link: CLOSE event
  Feb 4 13:57:07 l2tps: [l2tp0] LCP: Close event
  Feb 4 13:57:07 l2tps: [l2tp0] LCP: state change Stopping --> Closing
  Feb 4 13:57:09 l2tps: [l2tp0] LCP: rec'd Terminate Request #11 (Closing)
  Feb 4 13:57:09 l2tps: [l2tp0] LCP: SendTerminateAck #4
  Feb 4 13:57:09 l2tps: [l2tp0] LCP: state change Closing --> Closed
  Feb 4 13:57:09 l2tps: [l2tp0] LCP: LayerFinish
  Feb 4 13:57:09 l2tps: [l2tp0] link: DOWN event
  Feb 4 13:57:09 l2tps: [l2tp0] LCP: Down event
  Feb 4 13:57:09 l2tps: [l2tp0] LCP: state change Closed --> Initial
  Feb 4 13:57:09 l2tps: [l2tp0] L2TP: Call #0 terminated locally
  Feb 4 13:57:09 l2tps: L2TP: Control connection 0x80301b608 terminated: 0 (no more sessions exist in this tunnel)
  Feb 4 13:57:20 l2tps: L2TP: Control connection 0x80301b608 destroyed

IPsec Disconnect
^^^^^^^^^^^^^^^^

.. code::

  Feb 4 13:57:07 charon: 12[KNL] 192.168.32.1 disappeared from l2tp0
  Feb 4 13:57:07 charon: 12[KNL] interface l2tp0 deactivated
  Feb 4 13:57:11 charon: 13[NET] received packet: from 192.0.2.52[500] to 192.0.2.90[500] (76 bytes)
  Feb 4 13:57:11 charon: 13[ENC] parsed INFORMATIONAL_V1 request 3840243157 [ HASH D ]
  Feb 4 13:57:11 charon: 13[IKE] <con1|1> received DELETE for ESP CHILD_SA with SPI 4beb8c5a
  Feb 4 13:57:11 charon: 13[IKE] received DELETE for ESP CHILD_SA with SPI 4beb8c5a
  Feb 4 13:57:11 charon: 13[IKE] <con1|1> closing CHILD_SA con1{1} with SPIs cfcf5cfc_i (12669 bytes) 4beb8c5a_o (3120 bytes) and TS 192.0.2.90/32|/0[udp/l2f] === 192.0.2.52/32|/0[udp/l2f]
  Feb 4 13:57:11 charon: 13[IKE] closing CHILD_SA con1{1} with SPIs cfcf5cfc_i (12669 bytes) 4beb8c5a_o (3120 bytes) and TS 192.0.2.90/32|/0[udp/l2f] === 192.0.2.52/32|/0[udp/l2f]
  Feb 4 13:57:11 charon: 13[NET] received packet: from 192.0.2.52[500] to 192.0.2.90[500] (92 bytes)
  Feb 4 13:57:11 charon: 13[ENC] parsed INFORMATIONAL_V1 request 1351826790 [ HASH D ]
  Feb 4 13:57:11 charon: 13[IKE] <con1|1> received DELETE for IKE_SA con1[1]
  Feb 4 13:57:11 charon: 13[IKE] received DELETE for IKE_SA con1[1]
  Feb 4 13:57:11 charon: 13[IKE] <con1|1> deleting IKE_SA con1[1] between 192.0.2.90[192.0.2.90]...192.0.2.52[192.0.2.52]
  Feb 4 13:57:11 charon: 13[IKE] deleting IKE_SA con1[1] between 192.0.2.90[192.0.2.90]...192.0.2.52[192.0.2.52]

