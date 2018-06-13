.. include:: /substitutions.rsti

2.3.4-p1 New Features and Changes
=================================

The 2.3.4-p1 errata release is a minor release after
:doc:`2.3.4 </releases/2-3-4-new-features-and-changes>` and contains beneficial
security and bug fixes.

Security / Errata
-----------------

-  pfSense Advisories

   -  `pfSense-SA-17_05.webgui <https://pfsense.org/security/advisories/pfSense-SA-17_05.webgui.asc>`__:

      -  Fixed a potential XSS issue in the diag_edit.php file browser
         `#7650 <https://redmine.pfsense.org/issues/7650>`__
      -  Fixed a potential XSS in handling of the 'type' parameter on
         diag_table.php
         `#7652 <https://redmine.pfsense.org/issues/7652>`__
      -  Fixed validation and a potential XSS in interface names on
         firewall_nat_edit.php
         `#7651 <https://redmine.pfsense.org/issues/7651>`__

   -  `pfSense-SA-17_06.webgui <https://pfsense.org/security/advisories/pfSense-SA-17_06.webgui.asc>`__:

      -  Added a warning screen to the GUI and prevent access if the
         client IP address is currently in the lockout table, and also
         remove the client's connection states
         `#7693 <https://redmine.pfsense.org/issues/7693>`__

Bug Fixes
---------

Captive Portal
^^^^^^^^^^^^^^

-  Fixed Captive Portal RADIUS Authentication to only cache credentials
   when required to perform reauthentication
   `#7528 <https://redmine.pfsense.org/issues/7528>`__
-  Restored the captive portal feature to view the captive portal page
   directly from the portal web server as an additional button
   `#7646 <https://redmine.pfsense.org/issues/7646>`__

Dynamic DNS
^^^^^^^^^^^

-  Fixed issues with wildcard CNAME records disappearing from Loopia
   when doing a DNS update
-  Fixed issues with CloudFlare Dynamic DNS
-  Fixed Hover Dynamic DNS updates so they Verify the SSL Peer

Logging
^^^^^^^

-  Added syslogd service definition to enable status display and control
   `#4382 <https://redmine.pfsense.org/issues/4382>`__
-  Fixed issues with syslogd stopping when installing or uninstalling
   some packages `#7256 <https://redmine.pfsense.org/issues/7256>`__

Virtual IP Addresses
^^^^^^^^^^^^^^^^^^^^

-  Fixed issues with CARP status display overmatching some VIP numbers
   `#7638 <https://redmine.pfsense.org/issues/7638>`__
-  Fixed pid file handling for choparp (Proxy ARP Daemon)
-  Added the ability to sort the Virtual IP address list

DNS
^^^

-  Fixed diag_dns.php so it will not create an empty alias if name does
   not resolve
-  Fixed diag_dns.php to not show Add Alias if the user does not have
   privileges to add an alais
-  Fixed diag_dns.php to change the update alias button text after
   adding an alias
-  Fixed diag_dns.php to disable the Add Alias button when the host
   field is changed
-  Fixed calls to unbound-control to have the full configuration path
   specified so they do not fail
   `#7667 <https://redmine.pfsense.org/issues/7667>`__
-  Fixed handling of "redirect" zone entries in the DNS Resolver so they
   do not produce invalid zones
   `#7690 <https://redmine.pfsense.org/issues/7690>`__
-  Changed the way the DNS Resolver code writes out host entries, so the
   zones are more well-formed
   `#7690 <https://redmine.pfsense.org/issues/7690>`__
-  Changed the way the DNS Resolver process (unbound) is stopped, to
   allow it to exit cleanly.
   `#7326 <https://redmine.pfsense.org/issues/7326>`__

Interfaces
^^^^^^^^^^

-  Fixed DHCPv6 to request a prefix delegation even if no interfaces are
   set to track6 `#4544 <https://redmine.pfsense.org/issues/4544>`__
-  Updated handling of original MAC address retention for interfaces
   with spoofed MACs
-  Fixed an array handling problem when working with gateway entries on
   the Interface configuration page
   `#7659 <https://redmine.pfsense.org/issues/7659>`__
-  Fixed handling of MSS clamping values for PPPoE/L2TP/PPTP WANs
   `#7675 <https://redmine.pfsense.org/issues/7675>`__

DHCP
^^^^

-  Fixed an issue where some DHCP Lease information was encoded twice
   with htmlentities/htmlspecialchars
-  Fixed an issue where in some edge cases, a variable was not properly
   set in a loop, leading to a previous value being reused

Misc
^^^^

-  Removed "/usr/local/share/examples" from obsolete files list, some
   packages rely on the files being there
-  Added a few more items to status.php for support purposes, such as a
   download button, socket buffer info, and the netgate ID
-  Fixed status.php to redact BGP MD5 password/key in output
   `#7642 <https://redmine.pfsense.org/issues/7642>`__
-  Fixed OpenVPN to use is_numeric() to make sure $prefix is not 0
-  Changed the "Rule Information" section so it is consistent between
   firewall and NAT rule pages
-  Fixed APU2 detection for devices running coreboot v4.x
-  Fixed the tunable description for net.inet.ip.random_id
   `#6087 <https://redmine.pfsense.org/issues/6087>`__
-  Fixed some outdated links for help and support
-  Fixed some issues with empty config tags in packages
   `#7624 <https://redmine.pfsense.org/issues/7624>`__
-  Fixed issues with entry IDs after deleting Authentication Server
   instances `#7682 <https://redmine.pfsense.org/issues/7682>`__

