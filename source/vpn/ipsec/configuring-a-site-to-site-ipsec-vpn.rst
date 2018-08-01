.. include:: /substitutions.rsti

Configuring a Site-to-Site IPsec VPN
====================================

Summary
-------

This article covers configuring a site to site VPN link between two firewalls
using IPsec. This document primarily concerns firewalls running pfSense
software, but also discusses how to configure site to site links with third
party IPsec-compliant devices.

.. seealso:: The :doc:`IPsec section </vpn/ipsec/index>` contains example VPN
   Configurations that cover site to site IPsec configuration with some third
   party IPsec devices. If pfSense is known to work in a site to site IPsec
   configuration with a third party IPsec device not listed, we would appreciate
   a short submission containing configuration details, preferably with
   screenshots where applicable.

.. warning:: This document makes security recommendations based on current best
   practices. Failing to adhere to these recommendations will weaken security
   and may lead to a compromise of the VPN and its contents. For additional
   IPsec security recommendations and links to more sources, read the
   `strongSwan Security Recommendations`_.

What is IPsec
-------------

IPsec (IP security) is a standard for providing security to IP packets via
encryption and/or authentication, typically employing both. Its use in pfSense
is for Virtual Private Networks (VPNs).

There are two types of IPsec VPN capabilities in pfSense, site to site and
remote access (mobile).

Site to Site VPN Explained
~~~~~~~~~~~~~~~~~~~~~~~~~~

A site to site VPN links two networks as if were directly connected, even if the
networks are many hops apart across an untrusted circuit such as an Internet
connection. To clients behind the firewalls at either end, they do not need to
know a VPN is present; Clients need only attempt to contact the network on the
other side. The VPN handles managing the secure connection to the other peers,
including ensuring that the peer is authorized and that the traffic is encrypted
between the peers.

Current best practices dictate that **any** circuit leaving a site must not be
trusted, so a VPN is advised even over a dedicated private circuit.

While site to site VPNs are a good solution in many cases. IPsec adds processing
overhead, and the Internet has far greater latency than a private network, so
VPN connections are typically slower than dedicated private links (while maybe
not throughput-wise, they at least have much higher latency). A point to point
circuit typically has single digit latency to the other end, while a typical VPN
connection will be 30-80+ ms depending on the number of hops on the Internet
between the two VPN endpoints.

When deploying a VPN, if possible, stay with the same ISP for all sites. At a
minimum, stay with ISPs that use the same backbone provider. Geographic
proximity usually has no relation to Internet proximity. A server in the same
city but on a different Internet-backbone provider could be as far away in
Internet distance (hops) as a server on the other side of the continent. This
difference in Internet proximity can make the difference between a VPN with 30
ms latency and one with 80+ ms latency.

Remote Access IPsec VPN
~~~~~~~~~~~~~~~~~~~~~~~

pfSense provides several means of remote access VPN, including IPsec, OpenVPN,
and PPTP, and L2TP. Mobile IPsec functionality on pfSense has some limitations
that could hinder its practicality for some deployments. pfSense supports NAT-
Traversal which helps if any of the client machines are behind NAT, which is the
typical case.

One good use of the pfSense IPsec client VPN capabilities is to secure all
traffic sent by hosts on a wireless network or other untrusted network. This
will be described later in this chapter.

.. seealso:: Remote users can connect back to a firewall running pfSense
   software using a variety of different IPsec client software. See
   :doc:`/vpn/remote-access-mobile-vpn-client-compatibility`

Prerequisites
-------------

Before getting started, the following items must be complete.

* The firewall must be configured and working properly for the existing local
  network environment.
* Both locations must be using *non-overlapping* LAN IP subnets.

  For example, if both sites are using ``192.168.1.0/24`` on the LAN, no site to
  site VPN will work. This is not a limitation in pfSense, but of basic IP
  routing. When any host on either of the networks tries to communicate with
  ``192.168.1.0/24``, it will consider that host to be on its local LAN and the
  packets will never reach the firewall to be passed over the VPN connection.
  Similarly, if one site is using ``192.168.0.0/16`` and one using
  ``192.168.1.0/24``, these subnets are also overlapping and a site to site VPN
  will not work. Keep in mind the more networks that are linked together the
  more important this basic fact becomes. Do not use unnecessarily large subnet
  masks. If the LAN is ``10.0.0.0/8``, but it only has 100 hosts on it, that is
  unnecessarily limiting the ability to add VPN networks anywhere in the
  ``10.x.x.x`` space. NAT can work around scenarios where there are conflicting
  subnets, though it's preferable to avoid NAT in such circumstances and may be
  a requirement depending on what kind of functionality is required across the
  VPN.

* If the firewall running pfSense is not the default gateway on the LAN where it
  is installed, static routes must be added to the default gateway, pointing the
  remote VPN subnet to an IP address on pfSense in a subnet shared between
  pfSense and the default gateway. Less desirable, but also functional, would be
  to add static/persistent routes to the client PCs who need access to the VPN.
* Control of the other end of the VPN, or contact with the person who controls
  the other end of the VPN. If it is another firewall running pfSense, then
  share this document with the other administrator. If it is not, then have them
  consult the documentation for the IPsec device in use at the other site.
* Host and application level security become more important when connecting
  multiple networks, depending on how much the other network is trusted. If a
  device on the remote network is compromised by an attacker, they could easily
  hop over the VPN to attack local devices without any firewall protection all
  traffic is allowed to pass on the VPN tunnel.

  .. warning:: **Pay attention to what is being configured!** If a VPN is
     created to the office, and a VPN to a friend's home network, the friend can
     now hop over to the company network. Or, if a friend gets infected with a
     worm, it could then infect local machines and continue to propagate over
     the VPN connection to the office. This could result in termination/firing
     by the company if someone else was caught on their network coming in over
     this VPN. Best bet here is if there is a site to site VPN into a network at
     work, do not connect with friends. Or use one network and firewall for
     accessing work and one for accessing a friend's network.

Configuring the VPN Tunnel
--------------------------

First, log into the firewall running pfSense for the local network and click
**VPN > IPsec**

IPsec tunnels have two components: A Phase 1 area that defines the remote peer
and how the tunnel is authenticated, and one or more Phase 2 entries that define
how traffic is carried across the tunnel.

If the information is incorrect in either section, the tunnel will likely fail
to successfully negotiate phase 1 and/or phase 2. The trick here, as for all
other parts of VPN configuration, is to make sure that both VPN servers have
*EXACTLY THE SAME SETTINGS* for every field, with only a few exceptions to that
rule: Both sides will have different a Identifier and Remote Gateway. Subnet
definitions, timeouts, encryption settings, etc, all need to match.

Phase 1
~~~~~~~

To configure a new tunnel, a new Phase 1 must be created. Click the |fa-plus|
**Add P1** button to add a new IPsec tunnel Phase 1 definition.

Phase 1:

:Disabled: This is an "on / off" switch. If the tunnel should be disabled for
  any reason, check this option. When tunnel is needed again, uncheck it.
:Key Exchange Version: This can be *IKEv1*, *IKEv2*, or *Auto*.

  :IKEv1: IKEv1 is more common and widely supported, but has known issues with
    supporting common modern issues such as dealing with NAT or mobile clients.
  :IKEv2: An updated version of the protocol which has increased capabilities
    and security, as well as built-in support for mobile clients and NAT.
  :Auto: This option uses IKEv2 when initiating, but will accept either IKEv2 or
    IKEv1 when responding.

:Internet Protocol: Selects whether the tunnel will connect to an IPv4 or IPv6
  remote peer. IKEv1 does not allow mixing protocols. If an IKEv1 Phase 1 will
  carry IPv4 traffic in Phase 2, it must also connect to an IPv4 peer on Phase
  1. This limitation does not exist in IKEv2, which may carry both IPv4 and IPv6
  no matter which is used on Phase 1.
:Interface: This determines which part of the network will be the termination
  point (end point) for the IPsec tunnel. If the tunnel will be connecting to a
  remote server, then WAN is likely the desired setting. This can also be a
  virtual IP address. A gateway group can also be used for automatic failover
:Remote Gateway: This is the IP Address for the peer to which the tunnel will be
  established. This is most likely the WAN IP address of the remote firewall. A
  hostname may also be used in this field. Entering a hostname allows a tunnel
  to be defined between endpoints that have dynamic IP addresses.
:Description: It is a good practice to leave notes about the purpose of a
  tunnel. Enter a few works to describe what this VPN tunnel is used for, or
  about the remote end of the tunnel. This serves as a reminder for anyone
  managing the firewall (present or future) as to who or what will be using the
  tunnel.
:Authentication Method: There are two possible methods: *Mutual PSK* and *Mutual
  RSA*.

  :Mutual PSK: Pre-Shared Key authentication. Both endpoints must create and
    exchange a single matching secure key to use.
  :Mutual RSA: Authentication using RSA Certificates. Each peer must have a copy
    of the Certificate Authority used to sign the peer certificate to validate
    its identity and validity.

:Negotiation Mode: (IKEv1 only) This is the type of authentication security that
  this tunnel will use. This can be either **Main** or **Aggressive**.

  :Main: More secure, but also slower and more strict. This mode is best for
    security, but not speed.
  :Aggressive: Less secure, but much faster and will insure that the VPN tunnel
    will rebuild itself quickly and probably won't time out an application if
    the tunnel was down when the resource on the other end was requested.

:My Identifier: Identifies this firewall to the far side. It is best left at *My
  IP Address* and the firewall will fill it in as needed. In some cases an FQDN
  or similar may be entered so that the value is constant. So long as both sides
  agree on the identifier, it will work.
:Peer Identifier: Identifies the peer on the far side of the tunnel. It is best
  left at *Peer IP Address* and the firewall will fill it in as needed. In some
  cases an FQDN or similar may be entered so that the value is constant. So long
  as both sides agree on the identifier, it will work.
:Pre-Shared Key: (*Mutual PSK* authentication only) This key must be exactly the
  same on both VPN peers. It is case sensitive. Think of this like a "password"
  for the tunnel. Since this only gets entered once on each side and there is no
  need to remember it, it is better to make this as long and complex as
  possible.

  .. warning:: This Pre-Shared Key must be as random as possible to protect the
     contents of the tunnel. See :ref:`ipsec-generate-psk` for details on making
     a secure key.

:My Certificate: (*Mutual RSA* authentication only) Defines the certificate
  which identifies this firewall. The CA which signed this certificate must be
  known by the peer, which may be sending them a copy of the CA certificate. If
  one is not shown, create or import it under **System > Cert Manager** on the
  **Certificates** tab.
:Peer Certificate Authority: (*Mutual RSA* authentication only) Defines the CA
  which has signed the certificate sent by the peer. This is used to validate
  the peer certificate. If it does not show in the list, import it under
  **System > Cert Manager** on the **Certificate Authorities** tab.

:Phase 1 Encryption Options: Multiple combinations of these options can be
  defined using the |fa-plus| **Add Algorithm** button to add another line.
:Encryption Algorithm: If both sides support AES-GCM, use *AES128-GCM* with a
  *128* bit **Key Length**. This will combine strong encryption and hashing
  together and can be accelerated by AES-NI. Failing that, use *AES* With a
  **Key Length** of *128*. If the peer does not support any of these, use the
  strongest available option supported by the peer.
:Hash Algorithm: Hash algorithms are used with IPsec to verify the authenticity
  of packet data and as a Pseudo-Random Function (PRF). When using AES-GCM, this
  is used solely as a PRF because AES-GCM already performs hashing internally.
  The best choice for use with AES-GCM is *AES-XCBC*. If a different type of
  **Encryption Algorithm** is in use, then use *SHA256* if possible. If the peer
  does not support any of these, use the strongest available option supported by
  the peer.
:DH Key Group: We recommend not using less than DH Group *14 (2048 bit)* if both
  sides support it. Avoid using groups 1, 2, 22, 23, and 24 as they do not
  provide sufficient security. As with the other options, if the suggested value
  is not supported by the peer, use the strongest available option.
:Lifetime: The lifetime defines how often the connection will be rekeyed, in
  seconds. ``28800`` seconds is a good balance of frequent rekeying without
  being too aggressive.

:Disable Rekey: Prevents the IPsec daemon from rekeying this tunnel. The far
  side must initiate the rekey. Leave this *unchecked* so that either side may
  initiate a rekey event.
:Margintime (Seconds): Leave blank. Defines an alternate time frame in which a
  rekey attempt should be made.
:Disable Reauth: (IKEv2 Only) Skips the authentication step when performing a
  rekey. Faster, but less secure. Leave *unchecked* for stronger security.
:Responder Only: Instructs the IPsec daemon to not initiate connections, even
  if traffic needs to use the tunnel. The remote peer must initiate the
  connection. Leave *unchecked* so that either side may initiate as needed.
:MOBIKE: (IKEv2 Only) When enabled, allows a roaming or multi-homed peer to
  change IP addresses. Leave set to *Disable* unless this scenario is required.
:Split Connections: (IKEv2 Only) When an IKEv2 tunnel has multiple Phase 2
  definitions, some peer equipment does not properly handle how the traffic
  selectors are generated. This is especially common in Cisco equipment. Only
  check this option if the remote peer cannot properly negotiate in this
  situation.
:NAT Traversal: (IKEv1 Only) The default *Auto* option will detect and use NAT
  Traversal when one or both peers is determined to be behind NAT. This can also
  be set to *Force* if the auto detection is not properly switching as expected.
:Dead Peer Detection: Leave enabled at the default settings. This detects when
  an IPsec peer has lost connectivity or otherwise is unreachable. It lets the
  IPsec daemon know to attempt a fresh negotiation.

  :Delay: Time between DPD probe attempts. The default of ``10`` is best.
  :Max Failures: Number of failures before the peer is considered down. The
    default of ``5`` is best.

Click **Save** to store the Phase 1 settings. Do not click **Apply Changes**.

Phase 2
~~~~~~~

Phase 2 is what sets the parameters for traffic encryption, and defines what
traffic will use the tunnel and how.

To create a new Phase 2:

* Find the Phase 1 entry in the list on **VPN > IPsec**
* Click |fa-plus-circle| **Show Phase 2 Entries** to expand the Phase 2 list
* Click |fa-plus| **Add P2** to configure a new Phase 2 entry

The Phase 2 information can be filled in as follows:

:Disabled: An on/off switch for this Phase 2 entry only.
:Mode: In almost all cases this will be a tunnel mode, such as *Tunnel IPv4*.
  With IKEv1, this will match the outer protocol of the tunnel, for example an
  IPv4 peer would be Tunnel IPv4. IKEv2 can have either/or (or both).

  :Tunnel IPv4: A tunnel that will carry traffic between IPv4 networks.
  :Tunnel IPv6: A tunnel that will carry traffic between IPv6 networks.
  :Transport: Encrypts all traffic between the endpoints rather than tunneling
    specific interesting internal traffic.
  :Routed (VTI): Routed IPsec using Virtual Tunnel Interfaces. See
    :doc:`/vpn/ipsec/ipsec-routed`.

:Local Network: For *Tunnel IPv4/IPv6*, this defines which subnet or host can be
  accessed from the other side of the VPN tunnel. The easiest thing to do is to
  set this to "LAN subnet". This means the entire LAN will be accessible from
  the remote network. For *Routed (VTI)*, this sets the local IP address and
  subnet mask for the ``ipsecX`` interface tunnel network.

  .. warning:: The other end of the tunnel has this same field, except on the
     far side it is **Remote Subnet**. Ensure that the other end is set exactly
     the same. For example, if *Single host* is chosen in this section and the
     IP address of a host was entered, the other side would need to set that
     host in the **Remote Network** field.

:NAT/BINAT Translation: If the actual **Local Network** must be hidden from the
  far side, enter the settings to present to the far side (NAT+IPsec). For more
  details, see :doc:`NAT with IPsec Phase 2 Networks
  </vpn/ipsec/nat-with-ipsec-phase-2-networks>`.
:Remote Network: For *Tunnel IPv4/IPv6* this defines which subnet or host to be
  accessed on the other end of the tunnel. As mentioned in the previous item, it
  is paramount that this is set this exactly like the other end's **Local
  Network** section. If not, phase 2 of the VPN connection will fail and traffic
  will not pass from one VPN segment to the other. For *Routed (VTI)*, this sets
  the remote IP address and for the ``ipsecX`` interface tunnel network (the
  peer address on the tunnel interface).
:Description: A description for this Phase 2 entry. Shows up in the IPsec status
  for reference.
:Protocol: *ESP* is the de facto standard for what most VPN systems
   use as a transport protocol. This is the recommended setting.

   .. note:: The firewall will automatically generate a firewall rule to allow
      ESP or AH to the endpoint of the VPN. If it does not, a firewall rule
      allowing ESP (or AH) traffic to the endpoint interface will need to be
      created.
:Encryption Algorithms: As before in phase 1, make sure the algorithm is set
  exactly as it is set on the other VPN peer. Several can be used if desired;
  Everything selected is available for use. That said, it is recommended to only
  check the one that will be used. Use AES128-GCM if available, or AES 128
  otherwise.
:Hash Algorithm: As in phase 1, make sure the selected hash matches the other
  end. And as with the previous step, don't add unnecessary entries. SHA256 is
  the preferred default, but like phase 1, some routers may only support SHA1 or
  MD5. When using AES-GCM, do not select any **Hash Algorithm** entries as AES-
  GCM already performs hashing.
:PFS Key Group: This works similarly to the **DH group** in phase 1. *14 (2048
  bit)* is a good setting, the default is off.
:Lifetime: The lifetime for which the negotiated keys will be valid. One hour
  (``3600``) is a good setting. Do not set this to too high (e.g. more than
  about a day: ``86400``) as doing so will give people more time to crack the
  key. Don't be over paranoid either; there is no need to set this to 20 minutes
  either.
:Automatically ping host: An IP address in the remote Phase 2 network to ping to
  keep the tunnel alive. See :doc:`What should I ping for IPsec Keep Alive
  </vpn/ipsec/configuring-ipsec-keep-alive>` for details.

Click **Save**, then click **Apply Changes**. The IPsec configuration is
complete, but there are still some details to handle.

Add Firewall Rules
------------------

Firewall rules must exist (**Firewall > Rules**, **IPsec** tab) that govern
traffic allowed to pass on the VPN tunnels. At a minimum, an allow all rule
(Pass protocol any, src host any, dst host any) is needed. That said, more
restrictive rules are better to enforce proper network security protocols.

If the firewall rules are too lenient then any host on the remote side will be
able to directly contact any host on the local network as if they were on the
same LAN.

Rules are automatically added to the WAN to allow the tunnel to connect, but if
the option to disable automatic VPN rules is checked, then manual rules may be
required. In that case, check the WAN rules to ensure that the traffic from the
remote peer is allowed. IPsec uses UDP port 500 and 4500, and *protocol* ESP (or
AH if set that way). If there is trouble establishing a tunnel, check the
firewall logs (**Status > System Logs**, **Firewall** tab), and if blocked
packets from the peer appear in the log, add appropriate rules to allow that
traffic.

What if pfSense is not the main Internet Firewall?
--------------------------------------------------

In some cases there is a different firewall or router sitting between this
firewall and the Internet. If this is the case it is necessary to add a port
forward for ESP and UDP 500 to send the traffic to this firewall. The outside
router must be able to properly handle NAT of this traffic, and some do not. A
modem's "DMZ" mode or 1:1 NAT may also help here. In this case, **NAT
Traversal** will be needed, but the default *Auto* setting should be sufficient.

This may introduce routing difficulties on the internal network. More details
can be found on this in the pfSense book.

IPsec/L2TP
----------

pfSense versions 2.2 and up support IPsec+L2TP as well. See :doc:`L2TP/IPsec
</vpn/ipsec/l2tp-ipsec>` for implementation details.

.. _ipsec-generate-psk:

Securely Generating a Pre-Shared Key
------------------------------------

We strongly recommend using a password generator or other means of generating
randomness. `SHA224`_ was invented for exactly this purpose of generating
shorter hash strings, and it can be used to generate strong random strings for
use as Pre-Shared Keys.

The following example will feed random data through SHA 224::

$ dd status=none if=/dev/random bs=4096 count=1 | openssl sha224 | cut -f2 -d' '

The random string output from that command can then be used in the **Pre-Shared
Key** field.

For a shorter key, take a smaller chunk of the output::

$ dd status=none if=/dev/random bs=4096 count=1 | openssl sha224 | cut -f2 -d' ' | cut -c1-16

.. _SHA224: https://tools.ietf.org/html/rfc3874
.. _strongSwan Security Recommendations: https://wiki.strongswan.org/projects/strongswan/wiki/SecurityRecommendations