.. include:: /substitutions.rsti

Configuring a Site-to-Site IPsec VPN
====================================

Summary
-------

This article covers configuring a site to site VPN link between two
pfSense firewalls using IPsec, and discusses how to configure site to
site links with third party IPsec-compliant devices.

In other parts of the `IPsec category <:Category:IPsec>`__ there are
example VPN Configurations that cover how to configure site to site
IPsec links with some third party IPsec devices. If pfSense is known to
work in a site to site IPsec configuration with some third party IPsec
device not listed, we would appreciate if a short write up could be
submitted of how the configuration was made, preferably with screenshots
where applicable.

What is IPsec
-------------

IPsec (IP security) is a standard for providing security to IP protocols
via encryption and/or authentication, typically employing both. Its use
in pfSense is for Virtual Private Networks (VPN's).

There are two types of IPsec VPN capabilities in pfSense, site to site
and remote access (mobile).

Site to Site VPN Explained
~~~~~~~~~~~~~~~~~~~~~~~~~~

While site to site VPNs are a good solution in many cases, private WAN
links also have their benefits. IPsec adds processing overhead, and the
Internet has far greater latency than a private network, so VPN
connections are typically slower (while maybe not throughput-wise, they
at least have much higher latency). A point to point T1 typically has
latency of around 4-8 ms, while a typical VPN connection will be 30-80+
ms depending on the number of hops on the Internet between the two VPN
endpoints. That said, current best practices dictate that any circuit
leaving a site must not be trusted, so a VPN would still be advised over
a dedicated private circuit.

When deploying a VPN, stay with the same ISP for all sites if possible.
At a minimum, stay with ISPs that use the same backbone provider.
Geographic proximity usually has no relation to Internet proximity. A
server in the same city but on a different Internet-backbone provider
could be as far away in Internet distance (hops) as a server on the
other side of the continent. This difference in Internet proximity can
make the difference between a VPN with 30 ms latency and one with 80+ ms
latency.

Remote Access IPsec VPN
~~~~~~~~~~~~~~~~~~~~~~~

pfSense provides several means of remote access VPN, including IPsec,
OpenVPN, and PPTP, and L2TP. The mobile IPsec functionality on pfSense
has some limitations that could hinder its practicality for some
deployments. pfSense supports NAT-Traversal which helps if any of the
client machines are behind NAT. Since remote users will almost always
need access from behind NAT. Many home networks use a NAT router of some
sort, as do most hot spot locations, hotel networks, etc.

One good use of the pfSense IPsec client VPN capabilities is to secure
all traffic sent by hosts on a wireless network or other untrusted
network. This will be described later in this chapter.

Remote users running Windows can connect back to a pfSense router using
IPsec client software, such as the `Shrew Soft VPN
Client <http://www.shrew.net/>`__.

Prerequisites
-------------

Before getting started, the following items must be complete.

#. pfSense must be setup and working properly for the existing local
   network environment.
#. Both locations must be using *non-overlapping* LAN IP subnets.

   #. For example, if both sites are using 192.168.1.0/24 on the LAN, no
      site to site VPN will work. This is not a limitation in pfSense,
      it's basic IP routing. When any host on either of the networks
      tries to communicate with 192.168.1.0/24, it will consider that
      host to be on its local LAN and the packets will never reach
      pfSense to be passed over the VPN connection. Similarly, if one
      site is using, for example, 192.168.0.0/16 and one using
      192.168.1.0/24, these subnets are also overlapping and a site to
      site VPN will not work. Keep in mind the more networks that are
      linked together the more important this basic fact becomes. Do not
      use unnecessarily large subnet masks. If the LAN is 10.0.0.0/8,
      but it only has 100 hosts on it, that is unnecessarily limiting
      the ability to add VPN networks anywhere in the 10.x.x.x space.
      NAT can work around scenarios where there are conflicting subnets,
      though it's preferable to avoid NAT in such circumstances and may
      be a requirement depending on what kind of functionality is
      required across the VPN.

#. If pfSense is not the default gateway on the LAN where it is
   installed, static routes must be added to the default gateway,
   pointing the remote VPN subnet to the IP address on pfSense in the
   LAN subnet. Less desirable, but also functional, would be to add
   static/persistent routes to the client PCs who need access to the
   VPN.
#. Control of the other end of the VPN, or contact with the person who
   does control the other end of the VPN. If it is another pfSense
   system, then share this document with the other administrator. If it
   isn't then have them consult the documentation that came with the
   IPsec device they are using.
#. Host and application level security become more important when
   connecting multiple networks, how much depending on how much the
   other network is trusted. If a system on the remote network is
   compromised by an attacker, they could easily hop over the VPN to
   attack local systems without any firewall protection all traffic is
   allowed to pass on the VPN tunnel.
#. **Pay attention to what is being configured!** If a VPN is created to
   the office, and a VPN to a friend's home network, the friend can now
   hop over to the company network. Or, if a friend gets infected with a
   worm, it could then infect local machines and continue to propagate
   over the VPN connection to the office. This could result in
   termination/firing by the company if someone else was caught on their
   network coming in over this VPN. Best bet here is if there is a site
   to site VPN into a network at work, do not connect with friends. Or
   use one network and firewall for accessing work and one for accessing
   a friend's network.

Ok, now that we have the basics let's get started on the firewall
settings.

Configuring the VPN Tunnel
--------------------------

First, log into the pfSense router for the network and click **VPN >
IPsec**

On this first screen, check **Enable IPsec** and click **Save** to
enable IPsec. If IPsec is not enabled, then none of the tunnels will
function. This may also be done after completing the tunnel
configuration.

IPsec tunnels have two components: A Phase 1 area that defines the
remote peer and how the tunnel is authenticated, and one or more Phase 2
entries that define how traffic is carried across the tunnel.

If the information is incorrect in either section, the tunnel will
likely fail to successfully negotiate phase 1 and/or phase 2. The trick
here, as for all other parts of VPN configuration, is to make sure that
both VPN servers have *EXACTLY THE SAME SETTINGS* for all of these
fields, with only a few exceptions to that rule: Both sides will have
different a Identifier and Remote Gateway. Subnet definitions, timeouts,
encryption settings, etc, all need to match.

Phase 1
~~~~~~~

To configure a new tunnel, a new Phase 1 must be created. Click the
**+** icon to add a new IPsec tunnel Phase 1 definition.

Phase 1:

#. **Disabled**: This is an “on / off” button. If the tunnel should be
   disabled for any reason, check this option. When tunnel is needed
   again, uncheck it.
#. **Internet Protocol**: Selects whether the tunnel will connect to an
   IPv4 or IPv6 remote peer. IPsec does not currently allow mixing
   protocols. If the tunnel will carry IPv4 traffic in Phase 2, it must
   also connect to an IPv4 peer on Phase 1.
#. **Interface**: This determines which part of the network will be the
   termination point (end point) for the IPsec tunnel. If the tunnel
   will be connecting to a remote server, then WAN is likely the desired
   setting.
#. **Remote Gateway**: This is the IP Address for the router to which
   the tunnel will be established. This is most likely the WAN IP of the
   remote system. A hostname may also be used in this field. By entering
   a dyndns hostname, a tunnel can be defined between two systems that
   both have dynamic IPs.
#. **Description**: It is a good practice to leave notes about the
   purpose of a tunnel. Enter something about what this VPN tunnel is
   used for, or about the remote end of the tunnel. This will serve as a
   reminder for anyone managing the router (present or future) as to who
   or what will be using the tunnel.
#. **Authentication Method**: Most people will use Pre-Shared Key, but
   pfSense also supports using an RSA Signature.
#. **Negotiation Mode**: This is the type of authentication security
   that will be used. Unless need extreme levels of security are called
   for, it is best to leave this as aggressive. It is indeed far faster
   and will insure that the VPN tunnel will rebuild itself quickly and
   probably won't time out an application if the tunnel was down when
   the resource on the other end was requested. (more about that under
   Lifetime)
#. **My Identifier**: Identifies this router to the far side. It is best
   left at *My IP Address* and the firewall will fill it in as needed.
   In some cases an FQDN or similar may be entered so that the value is
   constant. So long as both sides agree on the Identifier it will work.
#. **Peer Identifier**: Identifies the router on the far side. It is
   best left at *Peer IP Address* and the firewall will fill it in as
   needed. In some cases an FQDN or similar may be entered so that the
   value is constant. So long as both sides agree on the Identifier it
   will work.
#. **Pre-Shared Key**: This key must be exactly the same on both VPN
   routers. It is case sensitive, and it does support special
   characters. Using both is a good idea, such as: f00m0nk3y@BubbaLand.
   The longer the key, the better. Think of this like a “password” for
   the tunnel. Since this only gets entered once on each side and there
   is no need to remember it, it is better to make this as long and
   complex as possible.
#. **Policy Generation**: Controls how the keying daemon creates SPD
   entries. Leave this at the default setting unless instructed
   otherwise.
#. **Proposal Checking**: Controls how strict (or loose) the Phase 1
   parameters are verified during the negotiation. The default value is
   fine, but it is common to set **Proposal Checking** to *Obey* to
   avoid some issues with building a tunnel when the other side
   initiates. This can allow for lowered security than what has been
   chosen.
#. **Encryption Algorithm**: **3DES** has been the world de facto
   standard for years but is being surpassed by AES (Preferably AES
   256). If the other side is another pfSense router, or a system that
   will support it, change this to AES 256. If the other end is a VPN
   device that only supports DES (*NOT* 3DES) then downgrade and hope no
   one decrypts the key exchange. **Make sure both sides of the VPN
   tunnel are using the same encryption algorithm!**.
#. **Hash Algorithm**: This is the hash used for checksum. *SHA1* is
   stronger and more reliable than *MD5*. However, some devices may only
   support *MD5*. Again make sure the same settings are in use on both
   ends of the tunnel, and if *SHA1* is available on both sides, by all
   means use it.
#. **DH Key Group**: Most systems will support at least up to Group *2*
   (1024 bit). This is a good value to start with.
#. **Lifetime**: This field is far more important then it appears. This
   lifetime, as opposed to the one in phase 2, is how long this router
   will wait for phase 1 to be completed. *86400* is a good suggested
   value for this field.
#. **My Certificate**: If RSA authentication is used, select the
   certificate for this firewall here. If one is not shown, create or
   import it under **System > Cert Manager** on the **Certificates**
   tab.
#. **My Certificate Authority**: The Certificate Authority associated
   with the above certificate. If it does not show in the list, import
   it under **System > Cert Manager** on the **Certificate Authorities**
   tab.
#. **NAT Traversal**: Should nearly always be set to *Disable* unless it
   is certain that one firewall or the other has a WAN behind another
   NAT device.
#. **DPD (Dead Peer Detection)**: This will help fully reestablish
   tunnel when the other side has a problem. The default values of *10*
   seconds and *5* retries are good.
#. Click Save

Phase 2
~~~~~~~

Phase 2 is what builds the actual tunnel, sets the protocol to use, and
sets the length of time to keep the tunnel up when there is no traffic.

To create a new Phase 2, click the large **+** inside the Phase 1 entry
in the list, on the left-hand side. This expands the list to display all
Phase 2 entries for this Phase 1. Click the **+** button on the right to
add a new entry.

The Phase 2 information can be filled in as follows:

#. **Disabled**: An on/off switch for this Phase 2 entry only.
#. **Mode**: In almost all cases this will be a tunnel mode that matches
   the outer protocol, such as *Tunnel IPv4*. *Transport* mode is also
   possible, which encrypts all traffic between the endpoints rather
   than tunneling other interesting traffic.
#. **Local Network**: This defines which subnet or host can be accessed
   from the other side of the VPN tunnel. The easiest thing to do is to
   set this to “LAN subnet”. This means the entire LAN will be
   accessible from the remote network. **IMPORTANT**: The other end of
   the tunnel has this same field, except on the far side it is “Remote
   Subnet”. Ensure that the other end is set exactly the same. For
   example, if “Single host” is chosen in this section and the IP
   address of a host was entered, the other side would need to set that
   host in the “Remote Subnet” field.
#. **Local Network: NAT**: If the actual **Local Network** must be
   hidden from the far side, enter the settings to present to the far
   side (NAT+IPsec). For more details, see :doc:`NAT with IPsec Phase 2 Networks
   </vpn/ipsec/nat-with-ipsec-phase-2-networks>`.
#. **Remote Network**: This defines which subnet or host to be accessed
   on the other end of the tunnel. As mentioned in the previous item, it
   is paramount that this is set this exactly like the other end's
   “local subnet” section. If not, phase 2 of the VPN connection will
   fail and traffic will not pass from one VPN segment to the other.
#. **Description**: A description for this Phase 2 entry. Shows up in
   the IPsec status for reference.
#. **Protocol**: ESP is the de facto standard for what most VPN systems
   use as a transport protocol. This is the recommended setting. Note:
   The system should auto generate a firewall rule to allow ESP or AH to
   the endpoint of the VPN. If it does not, a firewall rule allowing ESP
   (or AH) traffic to the endpoint interface will need to be created.
#. **Encryption Algorithm**: As before in phase 1, make sure the
   algorithm is set exactly as it is set on the other VPN router.
   Several can be used if desired; Everything selected is available for
   use. That said, it is recommended to only check the one that will be
   used. Use AES-256 if available.
#. **Hash Algorithm**: As in phase 1 make sure the selected hash matches
   the one on the other end. And as with the previous step, don't add
   things that are not needed. SHA1 is a good setting, but like phase 1,
   some routers may only support MD5.
#. **PFS Key Group**: This works similarly to the DH group in phase 1.
   1024 bit is a good setting, the default is off.
#. **Lifetime**: This is the lifetime the negotiated keys will be valid
   for. Do not set this to too high of a number (e.g. more than about a
   day: 86400) as doing so will give people more time to crack the key.
   Don't be over paranoid either; there is no need to set this to 20
   minutes either. One hour (3600) is a good setting.
#. **Automatically ping host**: An address in the remote Phase 2 network
   to ping to keep the tunnel alive. See :doc:`What should I ping for IPsec Keep
   Alive </vpn/ipsec/configuring-ipsec-keep-alive>` for details.
#. Click Save
#. Click Apply Changes

Add Firewall Rules
------------------

Firewall rules must be added (**Firewall > Rules**, **IPsec** tab) that
govern what traffic is allowed to pass on the VPN tunnels. At the very
least, an allow all rule (Pass protocol any, src host any, dst host any)
is needed. That said, more restrictive rules are better to enforce
proper network security protocols.

If the firewall rules are too lenient, then any host on the remote side
will be able to directly contact any host on the local network as if
they were on the same LAN.

Rules are automatically added to the WAN to allow the tunnel to connect,
but if the option to disable automatic VPN rules is checked, then manual
rules may be required. In that case, check the WAN rules to ensure that
the traffic from the remote pfSense host is allowed. IPsec uses UDP port
500 and 4500, and *protocol* ESP (or AH if set that way). If there is
trouble establishing a tunnel, check the firewall logs (Status > System
Logs, Firewall tab), and if blocked packets are seen, add appropriate
rules to allow that traffic.

What if the pfSense isn't the main Internet Firewall?
-----------------------------------------------------

In some cases there is a different firewall or router sitting between
pfSense and the Internet. If this is the case, then it is necessary to
add a port forward for ESP and UDP 500 to pfSense. The outside router
must be able to properly handle NAT of this traffic, and some do not. A
modem's “DMZ” mode may also help here. In this case, **NAT Traversal**
should also be enabled on Phase 1.

This may introduce routing difficulties on the internal network. More
details can be found on this in the pfSense book.

IPSec/L2TP
----------

pfSense versions 2.2 and up support IPSec+L2TP as well. See
:doc:`L2TP/IPsec </vpn/ipsec/l2tp-ipsec>` for implementation details.
