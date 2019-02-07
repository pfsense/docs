2.2.2 New Features and Changes
==============================

Security/Errata Notices
-----------------------

-  `pfSense-SA-15_05.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-15_05.webgui.asc>`__:
   Multiple XSS Vulnerabilities in the pfSense WebGUI

-  `FreeBSD-SA-15:09.ipv6 <https://www.freebsd.org/security/advisories/FreeBSD-SA-15:09.ipv6.asc>`__:
   Denial of Service with IPv6 Router Advertisements. Where a system is
   using DHCPv6 WAN type, devices on the same broadcast domain as that
   WAN can send crafted packets causing the system to lose IPv6 Internet
   connectivity.

-  `FreeBSD-SA-15:06.openssl <https://www.freebsd.org/security/advisories/FreeBSD-SA-15:06.openssl.asc>`__:
   Multiple OpenSSL vulnerabilities. Most aren't applicable, and worst
   impact is denial of service.

Rules / NAT
-----------

-  Added `hidden config option to disable blocking of link-local
   IPv4 <https://forum.netgate.com/post/82238>`__
   (169.254.0.0/16) for the rare instances where it's required. Not
   recommended, violates RFC 3927.

-  Fixed invalid ruleset generation when using port forwards with
   destination "any" on a DHCP client WAN-type interface, have pure NAT
   mode reflection enabled, and have the interface with link up but
   unable to reach a DHCP server for an extended period.
   `#4564 <https://redmine.pfsense.org/issues/4564>`__

-  Allow the use of version IPv4+IPv6 on firewall rules without
   restrictions on protocol. The former restrictions date back to
   earlier base software versions, and are no longer applicable.

-  Omit route-to from rules specifying a specific gateway when that
   gateway is forced down.
   `#4566 <https://redmine.pfsense.org/issues/4566>`__

-  Use the subnet address when forming rules for networks, rather than
   the interface IP address

-  Added SCTP to the protocol drop-down for firewall rules

IPsec
-----

-  Enforce disabling of "prefer old SAs" option. When the GUI
   configuration checkbox was removed in 2.2.1, it fell through to the
   default of the underlying software in many cases, leaving the option
   enabled instead of disabled. Having this option enabled will cause
   connectivity problems after rekeying in many circumstances. Upgrading
   to 2.2.2 will fix this.

-  strongSwan upgraded to 5.3.0

-  Don't apply mobile IPsec phase 2 PFS configuration to non-mobile
   IPsec. `#4538 <https://redmine.pfsense.org/issues/4538>`__

-  Correct applying of uniqueid configuration.
   `#4359 <https://redmine.pfsense.org/issues/4359>`__

-  Bring back automatic exclusion of LAN subnet to LAN IP for scenarios
   where remote IPsec overlaps with local LAN subnet.
   `#4504 <https://redmine.pfsense.org/issues/4504>`__

-  Enable ike_name for daemon logging, adding connection identifiers to
   IPsec logs that can be correlated to output of 'ipsec statusall' (GUI
   log viewer integration to come).

DNS Forwarder/Resolver
----------------------

-  Fix DNS registration of hostname "0"
   `#4573 <https://redmine.pfsense.org/issues/4573>`__

-  Domain overrides to multiple server IPs are possible in DNS Resolver.
   Add message noting this, and how to achieve it.
   `#4350 <https://redmine.pfsense.org/issues/4350>`__

-  Always configure user-specified DNS servers in the Unbound
   configuration, to make its behavior consistent with dnsmasq

-  Only list nameservers once in resolv.conf

Wireless
--------

-  Atheros wireless driver updated to latest from FreeBSD 11-CURRENT.
   Not many changes since 2.2.1-RELEASE.
   `#4582 <https://redmine.pfsense.org/issues/4582>`__
-  Wireless cards removed from ALTQ-capable interfaces (traffic shaper
   capability) since that isn't supported at the moment.
   `#4406 <https://redmine.pfsense.org/issues/4406>`__
-  New option "auto" added for Standard. This omits configuring mode
   with ifconfig, which currently can trigger driver problems that don't
   exist when not specified. Standard "auto" is preferred, and possibly
   required, for BSS and IBSS wireless modes with Atheros cards (at a
   minimum, potentially others).

IPv6
----

-  Make sure 'DHCPv6 Prefix Delegation size' is provided if 'Send IPv6
   prefix hint' flag is checked to avoid generating invalid dhcp6c
   configuration file.
-  DHCPv6 Relay fixed.
   `#4572 <https://redmine.pfsense.org/issues/4572>`__
-  Allow "0" for id-assoc na ID, id-assoc pd ID, sla-id and sla-len
   DHCP6 configuration options.
   `#4547 <https://redmine.pfsense.org/issues/4547>`__
-  Fix the use of multiple prefixes in IPv6 router advertisements.
   `#4468 <https://redmine.pfsense.org/issues/4468>`__

Other
-----

-  Clean up logic in OpenVPN resync code. `Discussion
   here <https://github.com/pfsense/pfsense/commit/4aefcf915112b38784b06abc8dd9a26d9a4960b3>`__
   and `additional change
   here <https://github.com/pfsense/pfsense/commit/3c3a3bf9c5a691786d65afa78914d5e498530663>`__.
-  SSL certificate validation disabled for selfhost - their certificate
   chain had a problem that made OpenSSL fail verification, making the
   service non-functional.
   `#4545 <https://redmine.pfsense.org/issues/4545>`__ The provider
   fixed the issue after 2.2.2-RELEASE, so verification has been
   re-enabled for 2.2.3 and newer.
-  Fix error in traffic shaping wizard.
   `#4529 <https://redmine.pfsense.org/issues/4529>`__
-  Fix broken image path.
   `#4530 <https://redmine.pfsense.org/issues/4530>`__
-  A variety of minor text clean up in web interface.
-  Remove some code no longer used in a few places.
-  Clean up of code path when adding a new user.
   `#4620 <https://redmine.pfsense.org/issues/4620>`__
-  Make sure RRD backup is not restored when /var memory disk is not in
   use. `#4531 <https://redmine.pfsense.org/issues/4531>`__
-  Show friendly name of the interface on custom RRD graph drop-down
   selection
-  PHP upgraded to 5.5.23
-  Prevent a user from adding a VLAN using the invalid ID "0"
-  Cleanup display of times in DHCP leases
-  Use the correct field for voucher "expired" and "no access" messages
-  Fix traffic shaper wizard bandwidth input validation calculations
   [https://redmine.pfsense.org/issues/4259 #4259
-  Changed Diagnostics > Sockets to display sockets bound to localhost
-  Allow single interface bridges, useful for span ports and when
   migrating interfaces to a bridge

