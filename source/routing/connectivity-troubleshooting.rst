.. include:: /substitutions.rsti

Troubleshooting Network Connectivity
====================================

The following list covers nearly every cause of outbound connectivty
failure in common usage scenarios. Each test assumes the items above it
have been checked.

WAN Interface
-------------

-  Check that the WAN IP address is correct (**Interfaces > WAN**)

    - Using the wrong address could cause a failure of the ISP to
      deliver traffic to/from the firewall, among other issues

-  Check that the WAN IP address has the correct subnet mask
   (**Interfaces > WAN**)

    - An improper subnet mask such as /1 could cause connectivity issues
      to large portions of the Internet, using /32 for a mask can prevent
      the gateway from being found/used

-  Check that WAN has a gateway and that the gateway IP is correct
   (**Interfaces > WAN**)

    - This will interfere with automatic outbound NAT and
      route-to/reply-to handling

-  Check that the WAN gateway is set as default (**System > Routing**)

    - Without a default gateway traffic has no exit path

-  Check that the WAN gateway shows Online (**Status > Gateways**)

    - If it is not, verify the WAN settings and gateway settings, or use
      an alternate monitor IP

-  Verify that the defined WAN gateway is actually the default
   (**Diagnostics > Routes**)

    - Some other source such as a VPN may have changed the default
      gateway

LAN Interface
-------------

-  Check that the LAN IP address is correct (**Interfaces > LAN**)

    - Using an invalid IP address (e.g. .0 or .255 in a /24) will cause
      problems reaching addresses locally and will not work properly.

-  Check that the LAN subnet mask is correct (**Interfaces > LAN**)

    - Using an incorrect subnet mask, such as /32, will prevent other
      hosts in LAN from finding the LAN to use as a gateway and vice versa

-  Check that LAN does NOT have a gateway set (**Interfaces > LAN**)

    - This will interfere with automatic outbound NAT

-  Check that LAN does NOT have "Block Private Networks" set
   (**Interfaces > LAN**)

    - Should be obvious

-  Check that LAN does NOT have "Block Bogon Networks" set (**Interfaces
   > LAN**)

    - See above

Firewall/Rules
--------------

-  Check the firewall log for blocked connections from the LAN (**Status
   > System Logs**, **Firewall** tab)

    - If blocks are observed, check the rule that blocked and adjust
      rules accordingly (**Firewall > Rules**, **LAN** tab)

-  Check that the LAN rule allows all protocols, or at least TCP and UDP
   ports for reaching DNS and HTTP/HTTPS, and allows ICMP for testing.
   (**Firewall > Rules**, **LAN** tab)

    - Not allowing UDP would make DNS fail, among other things.
      Similarly, on a DNS rule, using UDP only and not TCP/UDP will cause
      larger queries to fail.
    - Not allowing ICMP would cause ping to fail, but other protocols
      may work
    - Not allowing TCP would cause HTTP, HTTPS, and other protocols to
      fail.

-  Check that the LAN rule allows to a destination of *any* (**Firewall
   > Rules**, **LAN** tab)

    - Traffic going to the Internet will need an "*any*" destination.
      Using the wrong destination would not allow traffic to reach the
      Internet (e.g. "*WAN net*" which is only the subnet of the WAN
      interface, **NOT** the Internet.)

-  Check that the LAN rule does not have an improper gateway set
   (**Firewall > Rules**, **LAN** tab)

    - If it is set to leave by some other (possibly broken) non-WAN
      gateway it would cause the connections to fail

Outbound NAT
------------

-  Check **Outbound NAT**, ensure it is set for *Automatic Outbound NAT*
   unless Manual is required (**Firewall > NAT**, **Outbound** tab)

    - Incorrect NAT settings will prevent traffic from reaching WAN

-  Check Manual Outbound NAT rules, if in use, to ensure that the source
   of local traffic is matched

    - Incorrect NAT settings will prevent traffic from reaching WAN

Diagnostic Tests
----------------

-  Check connectivity from the firewall itself: Try to ping *8.8.8.8*
   (**Diagnostics > Ping**)

    - If this does not work, ensure proper WAN settings, gateway, etc.

-  Check DNS: Try to lookup *pfsense.org* (**Diagnostics > DNS Lookup**)

    - If this does not work, fix/change the DNS servers on **System >
      General**

-  Test NAT: Try to ping *8.8.8.8* (**Diagnostics > Ping**) using *LAN*
   as the **Source Address**

    - If this fails but the other tests work, then the problem is likely
      Outbound NAT (See the WAN/LAN gateway checks above)

Client Tests
------------

-  Test if the client can ping the LAN IP of the firewall

    - If this fails, check the LAN rules, client IP/subnet mask, LAN
      IP/subnet mask, etc.

-  Test if the client can ping the WAN IP of the firewall

    - If this fails, check the client's subnet mask and gateway

-  Test if the client can ping the WAN Gateway IP of the firewall

    - If this fails, check the client's subnet mask and gateway, and
      double check Outbound NAT on the firewall

-  Test if the client can ping an Internet host by IP address (e.g.
   *8.8.8.8*)

    - If this fails, check the client's subnet mask and gateway, and
      triple check Outbound NAT on the firewall

-  Test if the client can ping an Internet host by Host name (e.g.
   *www.google.com*)

    - If this fails, check the client's DNS settings, and/or the DNS
      Forwarder on the firewall (**Services > DNS Forwarder**,
      **Diagnostics > DNS Lookup**)

Miscellaneous Additional Areas
------------------------------

-  If Captive Portal is enabled, temporarily disable it (**Services >
   Captive Portal**).

    - See :doc:`Captive Portal Troubleshooting </captiveportal/captive-portal-troubleshooting>` if that helps.

-  Check for packages such as Squid that might interfere, disable them
   if necessary

    - Improperly configured proxies would allow certain traffic such as
      ICMP ping to work but might prevent access to HTTP and/or HTTPS
      sites.

