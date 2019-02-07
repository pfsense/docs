Connecting to Cisco IOS Devices with IPsec
==========================================

This page describes how to configure IPsec to connect pfSense and a
Cisco IOS router with IPsec capabilities.

Example Network
---------------

This diagram shows the specifics of the network where this VPN is being
configured. For the sake of this documentation, both hosts were on
private subnets, but functionally equivalent to two hosts across the
Internet.

.. image:: /_static/vpn/ipsec/ios-to-pfsense-ipsec-diagram.png

Configuring the router
----------------------

First, configure the phase 1 settings with a crypto isakmp policy. The
following sets it for 3DES, SHA and group 2 to match the pfSense
configuration shown later.

.. code::

  crypto isakmp policy 10
   encr 3des
   authentication pre-share
   group 2

Next, configure the pre-shared key. The key in this example is ABCDEFG,
but be sure to use something random and secure for any production
deployments. *10.0.66.22* is the WAN IP of the pfSense system being
used.

.. code::

  crypto isakmp key ABCDEFG address 10.0.66.22 no-xauth

Next configure the transform set for phase 2. This uses *ESP*, *3DES*
and *SHA*. The transform set is named *3DES-SHA*, which is how it will
be referred to later.

.. code::

  crypto ipsec transform-set 3DES-SHA esp-3des esp-sha-hmac

Now configure an access list that will match the local and remote
subnets on the pfSense end. This is configured as *access-list 100*,
which will be used in the next step. Remember this uses wildcard masks,
so a /24 network (255.255.255.0 mask) is represented as *0.0.0.255*.

.. code::

  access-list 100 permit ip 192.168.11.0 0.0.0.255 172.26.5.0 0.0.0.255
  access-list 100 permit ip 172.26.5.0 0.0.0.255 192.168.11.0 0.0.0.255

Now configure the crypto map for this VPN::

  crypto map PFSVPN 15 ipsec-isakmp
   set peer 10.0.66.22
   set transform-set 3DES-SHA
   set pfs group2
   match address 100

Lastly, under the interface configuration for the interface where the
VPN will terminate (the one with the public IP), assign the crypto map::

  interface FastEthernet0/0
  crypto map PFSVPN

The configuration is then finished on the Cisco side.

Configuring pfSense
-------------------

This screenshot shows the pfSense configuration matching the above Cisco
configuration.

In the above example, the pfSense IPsec tunnel should be set as follows:

Phase 1:

    **Remote Gateway**: *10.0.64.175*
    **Authentication Method**: *Pre-Shared Key*
    **Negotiation Mode**: *Main*
    **My Identifier**: *My IP Address*
    **Pre-Shared Key**: *ABCDEFG*
    **Encryption Algorithm**: *3DES*
    **Hash Algorithm**: *SHA1*
    **DH Key Group**: *2*
    **Lifetime**: *28800*
    **NAT Traversal**: *Disable*

It may also be advisable to set **Proposal Checking** to *Obey* to avoid
some issues with building a tunnel when the other side initiates.

Phase 2:

    **Mode**: *Tunnel IPv4*
    **Local Network**: *LAN Subnet*
    **Remote Network**: *172.26.5.0/24*
    **Protocol**: *ESP*
    **Encryption Algorithm**: *3DES* (others may also be checked, but be
    sure to leave 3DES checked)
    **Hash Algorithm**: *SHA1*
    **PFS Key Group**: *2*
    **Lifetime**: *3600*

Testing the connection
----------------------

To test the connection, from pfSense, do the following:

-  Navigate to **Diagnostics > Ping**
-  Enter an IP address on the remote network
-  Choose the LAN interface
-  Click Ping.

The initial negotiation may make all three of the first pings timeout,
so try it a second time as well. If configured as depicted above, once
the tunnel connects, the following will be seen:

.. image:: /_static/vpn/ipsec/ios-to-pfsense-ipsec-pingtest.png

Troubleshooting
---------------

If the connection doesn't come up, there is a mismatch somewhere in the
configuration. Depending on specifics, more useful information may be
obtained from pfSense or the Cisco. Checking logs on both ends is
recommended. For pfSense, browse to **Status > System Logs** on the
**IPsec** tab. For Cisco, run **debug crypto isakmp** and **term mon**
(if not connected via serial console) to make the debug messages appear
in a session. The output can be verbose, but will usually tell
specifically what was mismatched.

"No NAT" List on Cisco IOS
~~~~~~~~~~~~~~~~~~~~~~~~~~

It may also be necessary to tell Cisco IOS *not* to NAT the traffic that
is destined for the IPsec tunnel. There are several ways to accomplish
this, depending on how the router has NAT configured. If the following
example does not help, there are several examples that turn up in a
Google search for "cisco ios nonat ipsec"::

  ip nat inside source route-map NONAT interface FastEthernet0/0 overload
  access-list 110 deny   ip 172.26.5.0 0.0.0.255 192.168.11.0 0.0.0.255
  access-list 110 permit ip 172.26.5.0 0.0.0.255 any
  route map NONAT permit 10
   match ip address 110

This will direct the router to prevent NAT if the traffic is going from
the subnet behind the Cisco router to the subnet behind the pfSense
router, but allow it in all other cases.
