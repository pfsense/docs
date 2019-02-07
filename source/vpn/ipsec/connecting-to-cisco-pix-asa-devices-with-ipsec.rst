Connecting to Cisco PIX/ASA Devices with IPsec
==============================================

Using IPsec to create a VPN tunnel between pfSense and a Cisco PIX
should work OK. As always with IPsec, be sure that the Phase 1 and Phase
2 settings match up on both sides. If an acceptable transform set and
policy are already in place, they may be used.

Example PIX IPsec Configuration
-------------------------------

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------+
| 10.1.1.0           | Network Behind the PIX                                                                                                                         |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------+
| 192.168.1.0        | Network Behind the pfSense Router                                                                                                              |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------+
| 1.2.3.4            | IP of the pfSense router (WAN IP, CARP IP, etc)                                                                                                |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------+
| dyn-map 10         | Name of the existing crypto map (if any) and a unique ID for this tunnel. If there is an existing map, use its name, but a different number.   |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------+
| PFSVPN             | Access list name for this connection.                                                                                                          |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------+
| (Pre-Shared Key)   | PSK For this tunnel                                                                                                                            |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------+

.. code::

  access-list PFSVPN permit ip 192.168.1.0 255.255.255.0 10.1.1.0 255.255.255.0
  access-list PFSVPN permit ip 10.1.1.0 255.255.255.0 192.168.1.0 255.255.255.0
  access-list nonat permit ip 10.1.1.0 255.255.255.0 192.168.1.0 255.255.255.0
  nat (inside) 0 access-list nonat
  sysopt connection permit-ipsec
  crypto ipsec transform-set 3dessha1 esp-3des esp-sha-hmac
  crypto ipsec security-association lifetime seconds 86400 kilobytes 50000
  crypto map dyn-map 10 ipsec-isakmp
  crypto map dyn-map 10 match address PFSVPN
  crypto map dyn-map 10 set pfs group2
  crypto map dyn-map 10 set peer 1.2.3.4
  crypto map dyn-map 10 set transform-set 3dessha1
  crypto map dyn-map 10 set security-association lifetime seconds 86400 kilobytes 4608000
  crypto map dyn-map interface outside
  isakmp enable outside
  isakmp key (Pre-Shared Key) address 1.2.3.4 netmask 255.255.255.255 no-xauth no-config-mode
  isakmp identity address
  isakmp nat-traversal 20
  isakmp policy 1 authentication pre-share
  isakmp policy 1 encryption 3des
  isakmp policy 1 hash sha
  isakmp policy 1 group 2
  isakmp policy 1 lifetime 86400

Corresponding pfSense IPsec Config
----------------------------------

In the above example, the pfSense IPsec tunnel should be set as follows:

Phase 1:

    **Remote Gateway**: (outside IP of the PIX)
    **Authentication Method**: *Pre-Shared Key*
    **Negotiation Mode**: *Main*
    **My Identifier**: *My IP Address*
    **Pre-Shared Key**: (The Pre-Shared Key)
    **Encryption Algorithm**: *3DES*
    **Hash Algorithm**: *SHA1*
    **DH Key Group**: *2*
    **Lifetime**: *86400*
    **NAT Traversal**: *Disable*

It may also be advisable to set **Proposal Checking** to *Obey* to avoid
some issues with building a tunnel when the other side initiates.

Phase 2:

    **Mode**: *Tunnel IPv4*
    **Local Network**: *LAN Subnet*
    **Remote Network**: *10.1.1.0/24*
    **Protocol**: *ESP*
    **Encryption Algorithm**: *3DES* (others may also be checked, but be
    sure to leave 3DES checked)
    **Hash Algorithm**: *SHA1*
    **PFS Key Group**: *2*
    **Lifetime**: *86400*

Rules must also be added to **Firewall > Rules** on the **IPsec** Tab to
permit traffic from *10.1.1.0/24* (or specific IPs/Alias) to the LAN Net
(or specific IPs/Alias).
