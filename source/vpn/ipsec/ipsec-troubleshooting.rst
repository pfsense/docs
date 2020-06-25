Troubleshooting IPsec VPNs
==========================

Renegotiation Errors
--------------------

If a tunnel comes up initially, but then fails after a Phase 1 or Phase
2 expiration, try changing the following settings on both ends of the
tunnel:

-  On the IPsec Phase 1 settings, disable **NAT Traversal** (NAT-T)
-  On the IPsec Phase 1 settings, enable **DPD**
-  On the IPsec Phase 2 settings, enter an **Automatically Ping Host**
   in the remote Phase 2 subnet.

Common Errors
-------------

The following examples have logs edited for brevity but significant
messages remain.

Logging for IPsec is configured at **VPN > IPsec**, **Advanced
Settings** tab. The most useful logging settings for diagnosing tunnel
issues with strongSwan on pfSense® software version 2.2.x are:

-  **IKE SA**, **IKE Child SA**, and **Configuration Backend** on *Diag*
-  All others on *Control*

Other notable behaviors:

-  If there is an *Aggressive*/*Main* mode mismatch and the side set for
   *Main* initiates, the tunnel will still establish
-  **Lifetime** mismatches do not cause a failure in Phase 1 or Phase 2

Normal / OK Connection
~~~~~~~~~~~~~~~~~~~~~~

Initiator::

  charon: 09[IKE] IKE_SA con2000[11] established between 192.0.2.90[192.0.2.90]...192.0.2.74[192.0.2.74]
  charon: 09[IKE] CHILD_SA con2000{2} established with SPIs cf4973bf_i c1cbfdf2_o and TS 192.168.48.0/24|/0 === 10.42.42.0/24|/0

Responder::

  charon: 03[IKE] IKE_SA con1000[19] established between 192.0.2.74[192.0.2.74]...192.0.2.90[192.0.2.90]
  charon: 16[IKE] CHILD_SA con1000{1} established with SPIs c1cbfdf2_i cf4973bf_o and TS 10.42.42.0/24|/0 === 192.168.48.0/24|/0

Phase 1 Main / Aggressive Mismatch
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Initiator (Aggressive set, responder on Main)::

  charon: 15[IKE] initiating Aggressive Mode IKE_SA con2000[1] to 192.0.2.74
  charon: 15[IKE] received AUTHENTICATION_FAILED error notify
  charon: 13[ENC] parsed INFORMATIONAL_V1 request 1215317906 [ N(AUTH_FAILED) ]
  charon: 13[IKE] received AUTHENTICATION_FAILED error notify

Responder::

  charon: 13[IKE] Aggressive Mode PSK disabled for security reasons
  charon: 13[ENC] generating INFORMATIONAL_V1 request 2940146627 [ N(AUTH_FAILED) ]

Phase 1 Identifier Mismatch
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Initiator::

  charon: 10[ENC] parsed INFORMATIONAL_V1 request 4216246776 [ HASH N(AUTH_FAILED) ]
  charon: 10[IKE] received AUTHENTICATION_FAILED error notify

Responder::

  charon: 12[CFG] looking for pre-shared key peer configs matching 192.0.2.74...192.0.2.90[someid]
  charon: 12[IKE] no peer config found
  charon: 12[ENC] generating INFORMATIONAL_V1 request 4216246776 [ HASH N(AUTH_FAILED) ]

Phase 1 Pre-Shared Key Mismatch
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Initiator::

  charon: 09[ENC] invalid HASH_V1 payload length, decryption failed?
  charon: 09[ENC] could not decrypt payloads
  charon: 09[IKE] message parsing failed

Responder::

  charon: 09[ENC] invalid ID_V1 payload length, decryption failed?
  charon: 09[ENC] could not decrypt payloads
  charon: 09[IKE] message parsing failed

Phase 1 Encryption Algorithm Mismatch
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Initiator::

  charon: 14[ENC] parsed INFORMATIONAL_V1 request 3851683074 [ N(NO_PROP) ]
  charon: 14[IKE] received NO_PROPOSAL_CHOSEN error notify

Responder::

  charon: 14[CFG] received proposals: IKE:AES_CBC_128/HMAC_SHA1_96/PRF_HMAC_SHA1/MODP_1024
  charon: 14[CFG] configured proposals: IKE:AES_CBC_256/HMAC_SHA1_96/PRF_HMAC_SHA1/MODP_1024
  charon: 14[IKE] no proposal found
  charon: 14[ENC] generating INFORMATIONAL_V1 request 3851683074 [ N(NO_PROP) ]

Phase 1 Hash Algorithm Mismatch
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Initiator::

  charon: 10[ENC] parsed INFORMATIONAL_V1 request 2774552374 [ N(NO_PROP) ]
  charon: 10[IKE] received NO_PROPOSAL_CHOSEN error notify

Responder::

  charon: 14[CFG] received proposals: IKE:AES_CBC_256/MODP_1024
  charon: 14[CFG] configured proposals: IKE:AES_CBC_256/HMAC_SHA1_96/PRF_HMAC_SHA1/MODP_1024
  charon: 14[IKE] no proposal found
  charon: 14[ENC] generating INFORMATIONAL_V1 request 2774552374 [ N(NO_PROP) ]

Phase 1 DH Group Mismatch
~~~~~~~~~~~~~~~~~~~~~~~~~

Initiator::

  charon: 11[ENC] parsed INFORMATIONAL_V1 request 316473468 [ N(NO_PROP) ]
  charon: 11[IKE] received NO_PROPOSAL_CHOSEN error notify

Responder::

  charon: 14[CFG] received proposals: IKE:AES_CBC_256/HMAC_SHA1_96/PRF_HMAC_SHA1/MODP_8192
  charon: 14[CFG] configured proposals: IKE:AES_CBC_256/HMAC_SHA1_96/PRF_HMAC_SHA1/MODP_1024
  charon: 14[IKE] no proposal found
  charon: 14[ENC] generating INFORMATIONAL_V1 request 316473468 [ N(NO_PROP) ]

Phase 2 Network Mismatch
~~~~~~~~~~~~~~~~~~~~~~~~

Initiator::

  charon: 08[CFG] proposing traffic selectors for us:
  charon: 08[CFG] 192.168.48.0/24|/0
  charon: 08[CFG] proposing traffic selectors for other:
  charon: 08[CFG] 10.42.43.0/24|/0
  charon: 08[ENC] generating QUICK_MODE request 316948142 [ HASH SA No ID ID ]
  charon: 08[NET] sending packet: from 192.0.2.90[500] to 192.0.2.74[500] (236 bytes)
  charon: 08[NET] received packet: from 192.0.2.74[500] to 192.0.2.90[500] (76 bytes)
  charon: 08[ENC] parsed INFORMATIONAL_V1 request 460353720 [ HASH N(INVAL_ID) ]
  charon: 08[IKE] received INVALID_ID_INFORMATION error notify

Responder::

  charon: 08[ENC] parsed QUICK_MODE request 2732380262 [ HASH SA No ID ID ]
  charon: 08[CFG] looking for a child config for 10.42.43.0/24|/0 === 192.168.48.0/24|/0
  charon: 08[CFG] proposing traffic selectors for us:
  charon: 08[CFG] 10.42.42.0/24|/0
  charon: 08[CFG] proposing traffic selectors for other:
  charon: 08[CFG] 192.168.48.0/24|/0
  charon: 08[IKE] no matching CHILD_SA config found
  charon: 08[IKE] queueing INFORMATIONAL task
  charon: 08[IKE] activating new tasks
  charon: 08[IKE] activating INFORMATIONAL task
  charon: 08[ENC] generating INFORMATIONAL_V1 request 1136605099 [ HASH N(INVAL_ID) ]

Phase 2 Encryption Algorithm Mismatch
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Initiator::

  charon: 14[CFG] configured proposals: ESP:AES_CBC_128/HMAC_SHA1_96/NO_EXT_SEQ
  charon: 14[ENC] generating QUICK_MODE request 759760112 [ HASH SA No ID ID ]
  charon: 14[NET] sending packet: from 192.0.2.90[500] to 192.0.2.74[500] (188 bytes)
  charon: 14[NET] received packet: from 192.0.2.74[500] to 192.0.2.90[500] (76 bytes)
  charon: 14[ENC] parsed INFORMATIONAL_V1 request 1275272345 [ HASH N(NO_PROP) ]
  charon: 14[IKE] received NO_PROPOSAL_CHOSEN error notify

Responder::

  charon: 13[CFG] selecting proposal:
  charon: 13[CFG] no acceptable ENCRYPTION_ALGORITHM found
  charon: 13[CFG] received proposals: ESP:AES_CBC_128/HMAC_SHA1_96/NO_EXT_SEQ
  charon: 13[CFG] configured proposals: ESP:AES_CBC_256/HMAC_SHA1_96/NO_EXT_SEQ
  charon: 13[IKE] no matching proposal found, sending NO_PROPOSAL_CHOSEN
  charon: 13[IKE] queueing INFORMATIONAL task
  charon: 13[IKE] activating new tasks
  charon: 13[IKE] activating INFORMATIONAL task
  charon: 13[ENC] generating INFORMATIONAL_V1 request 1275272345 [ HASH N(NO_PROP) ]

Phase 2 Hash Algorithm Mismatch
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Initiator::

  charon: 10[CFG] configured proposals: ESP:AES_CBC_256/HMAC_SHA2_512_256/NO_EXT_SEQ
  charon: 10[ENC] generating QUICK_MODE request 2648029707 [ HASH SA No ID ID ]
  charon: 10[NET] sending packet: from 192.0.2.90[500] to 192.0.2.74[500] (188 bytes)
  charon: 10[NET] received packet: from 192.0.2.74[500] to 192.0.2.90[500] (76 bytes)
  charon: 10[ENC] parsed INFORMATIONAL_V1 request 757918402 [ HASH N(NO_PROP) ]
  charon: 10[IKE] received NO_PROPOSAL_CHOSEN error notify

Responder::

  charon: 11[CFG] selecting proposal:
  charon: 11[CFG] no acceptable INTEGRITY_ALGORITHM found
  charon: 11[CFG] received proposals: ESP:AES_CBC_256/HMAC_SHA2_512_256/NO_EXT_SEQ
  charon: 11[CFG] configured proposals: ESP:AES_CBC_256/HMAC_SHA1_96/NO_EXT_SEQ
  charon: 11[IKE] no matching proposal found, sending NO_PROPOSAL_CHOSEN
  charon: 11[IKE] queueing INFORMATIONAL task
  charon: 11[IKE] activating new tasks
  charon: 11[IKE] activating INFORMATIONAL task
  charon: 11[ENC] generating INFORMATIONAL_V1 request 757918402 [ HASH N(NO_PROP) ]

Phase 2 PFS Mismatch
~~~~~~~~~~~~~~~~~~~~

Initiator::

  charon: 06[ENC] generating QUICK_MODE request 909980434 [ HASH SA No KE ID ID ]
  charon: 06[NET] sending packet: from 192.0.2.90[500] to 192.0.2.74[500] (444 bytes)
  charon: 06[NET] received packet: from 192.0.2.74[500] to 192.0.2.90[500] (76 bytes)
  charon: 06[ENC] parsed INFORMATIONAL_V1 request 3861985833 [ HASH N(NO_PROP) ]
  charon: 06[IKE] received NO_PROPOSAL_CHOSEN error notify

Responder::

  charon: 08[CFG] selecting proposal:
  charon: 08[CFG] no acceptable DIFFIE_HELLMAN_GROUP found
  charon: 08[CFG] received proposals: ESP:AES_CBC_256/HMAC_SHA1_96/MODP_2048/NO_EXT_SEQ
  charon: 08[CFG] configured proposals: ESP:AES_CBC_256/HMAC_SHA1_96/NO_EXT_SEQ
  charon: 08[IKE] no matching proposal found, sending NO_PROPOSAL_CHOSEN
  charon: 08[ENC] generating INFORMATIONAL_V1 request 3861985833 [ HASH N(NO_PROP) ]

Mismatched Identifier with NAT
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In this case, strongSwan is set for a **Peer Identifier** of *Peer IP
address*, but the remote router is actually behind NAT. In this case
strongSwan expects the actual private before-NAT IP address as the
identifier.

Responder::

  charon: 10[IKE] remote host is behind NAT
  charon: 10[IKE] IDir '192.0.2.10' does not match to '203.0.113.245'
  [...]
  charon: 10[CFG] looking for pre-shared key peer configs matching 198.51.100.50...203.0.113.245[192.0.2.10]

To correct this condition, change the **Peer Identifier** setting to *IP
Address* and then enter the pre-NAT IP address, which in this example is
*192.0.2.10*.

Incorrect Destination Address
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When multiple WAN IP addresses are available, such as with CARP VIPs or
IP Alias VIPs, an additional failure mode can occur where the connection
appears in the logs but matches bypasslan or "%any...%any". In this
case, IPsec is configured to listen to one IP address but the client is
connecting to another address. For example, an IPsec Phase 1 entry may
be configured to use the WAN IP address but clients are connecting to a
CARP VIP. In this case, the destination address in the logs will be the
VIP address and not the interface address. Confirm by checking the logs
against "ipsec statusall".

Disappearing Traffic
~~~~~~~~~~~~~~~~~~~~

If IPsec traffic arrives but never appears on the IPsec interface
(enc0), check for conflicting routes/interface IP addresses. For
example, if an IPsec tunnel is configured with a remote network of
192.0.2.0/24 and there is a local OpenVPN server with a tunnel network
of 192.0.2.0/24 then the ESP traffic may arrive, strongSwan may process
the packets, but they never show up on enc0 as arriving to the OS for
delivery.

Resolve the duplicate interface/route and the traffic will begin to
flow.

IPsec Status Page Issues
~~~~~~~~~~~~~~~~~~~~~~~~

If the IPsec status page prints errors such as::

  Warning: Illegal string offset 'type' in /etc/inc/xmlreader.inc on line 116

That is a sign that the incomplete xmlreader XML parser is active, which
is triggered by the presence of the file */cf/conf/use_xmlreader*. This
alternate parser can be faster for reading large config.xml files, but
lacks certain features necessary for other areas to function well.
Removing */cf/conf/use_xmlreader* will return the system to the default
parser immediately, which will correct the display of the IPsec status
page.

IPsec Debugging
---------------

The logging options for the IPsec daemon are located under **VPN > IPsec** on
the **Advanced Settings** tab and may be adjusted live without affecting the
operation of IPsec tunnels. As mentioned above, the recommended setting for most
common debugging is to set **IKE SA**, **IKE Child SA**, and
**Configuration Backend** on *Diag* and set all others on *Control*.

Shrew Soft VPN Client Debugging
-------------------------------

Open the Trace app. Stop the IKE Service, and go to File, Options.
Change the log output level to debug and click OK. Start the IKE Service
and attempt to connect.

Packet Loss with Certain Protocols
----------------------------------

If packet loss is experienced only when using specific protocols (SMB,
RDP, etc), MSS clamping may be required to reduce the effective MTU of
the VPN. IPsec does not handle fragmented packets very well, and a
reduced MTU will ensure that the packets traversing the tunnel are all
of a size which can be transmitted whole. A good starting point would be
1300, and if that works, slowly increase the MSS until the breaking
point is located, then back off a little from there.

MSS clamping is configured under **System > Advanced** on the
**Miscellaneous** tab on pfSense software version 2.1.x and before. On 
pfSense software version 2.2, it is under **VPN > IPsec** on the 
**Advanced Settings** tab. Check the box to enable MSS Clamping for VPNs,
and fill in the appropriate value.

Some Hosts Work, Others Do Not
------------------------------

If some hosts can communicate across a VPN tunnel and others cannot, it
typically means that for some reason the packets from that client system
are not being routed to the pfSense system. This could happen for a
number of reasons, but the two most common are:

-  Incorrect gateway on client system: the pfSense router needs to be
   the gateway, or the gateway must have a static route for tunnel traffic
   which forwards those packets to the pfSense router.
-  Incorrect subnet mask on the client system: If the VPN subnets are
   close, say 192.168.0.x and 192.168.1.x, ensure that the subnet mask
   is 255.255.255.0 on the client systems. If one of them has an
   incorrect mask, such as 255.255.0.0, it will try to reach the remote
   systems locally and not send the packets out via the gateway.

Dropping Tunnels on ALIX/embedded
---------------------------------

If tunnels are dropped during periods of high IPsec throughput on an
ALIX or other embedded hardware, it may be necessary to disable DPD on
the tunnel. When the CPU on an ALIX is tied up with sending IPsec
traffic, it may not take the time to respond to a DPD request on the
tunnel. As a consequence, the tunnel will fail a DPD check and be
disconnected.

Crash/Panic in NIC driver with IPsec in Backtrace
-------------------------------------------------

If a crash occurs and the backtrace shows signs of both the NIC driver
and IPsec in the backtrace, such as the following edited example::

  Sleeping thread (tid 100066, pid 12) owns a non-sleepable lock
  [...]
  igb_mq_start_locked() at igb_mq_start_locked+0xe4/frame 0xfffffe001c39cda0
  igb_mq_start() at igb_mq_start+0x224/frame 0xfffffe001c39ce10
  ether_output() at ether_output+0x58d/frame 0xfffffe001c39ce80
  [...]
  ipsec4_common_input_cb() at ipsec4_common_input_cb+0x20d/frame 0xfffffe001c39d410
  esp_input_cb() at esp_input_cb+0x4ce/frame 0xfffffe001c39d4a0
  swcr_process() at swcr_process+0x89/frame 0xfffffe001c39d6d0
  crypto_dispatch() at crypto_dispatch+0x6e/frame 0xfffffe001c39d700
  esp_input() at esp_input+0x5a9/frame 0xfffffe001c39d790
  ipsec_common_input() at ipsec_common_input+0x29a/frame 0xfffffe001c39d800
  ipsec4_common_input() at ipsec4_common_input+0x91/frame 0xfffffe001c39d860
  [...]
  igb_rxeof() at igb_rxeof+0x698/frame 0xfffffe001c39dad0
  igb_msix_que() at igb_msix_que+0x16d/frame 0xfffffe001c39db20

Try adding the following tunable to **System > Advanced**, **System
Tunables tab**::

  net.inet.ipsec.directdispatch=0
