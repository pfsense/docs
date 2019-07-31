2.1.5 New Features and Changes
==============================

The pfSense® software version 2.1.5 release follows shortly after
:doc:`2.1.4 </releases/2-1-4-new-features-and-changes>` and is primarily a security
release.

Security Fixes
--------------

-  `pfSense-SA-14_14.openssl <https://www.pfsense.org/security/advisories/pfSense-SA-14_14.openssl.asc>`__

   -  See http://www.openssl.org/news/secadv_20140806.txt
   -  Updated to OpenSSL 0.9.8zb and 1.0.1i

-  `pfSense-SA-14_15.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-14_15.webgui.asc>`__
-  `pfSense-SA-14_16.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-14_16.webgui.asc>`__
-  `pfSense-SA-14_17.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-14_17.webgui.asc>`__

Other Fixes
-----------

-  Handle a missing DHCPD config section properly during a configuration
   upgrade
-  Fix a regression that broke CARP+IP alias VIP functionality
-  Fix the Pass, Block, Reject and Interface filters in the Firewall
   Logs Widget `#3725 <https://redmine.pfsense.org/issues/3725>`__
-  Use HTTPS for dyndns providers that support it
-  Avoid resetting the firewall hostname from a WAN DHCP server
   `#3746 <https://redmine.pfsense.org/issues/3746>`__
-  Add missing qlimit keyword in some shaper rules
-  Change Cancel button to call history.back() when editing firewall
   aliases to fix issues with IE 11
   `#3728 <https://redmine.pfsense.org/issues/3728>`__
-  Allow hostnames in bulk import since they are valid entries in a
   network type alias
-  Fix input validation logic on diag_testport.php, escape more shell
   arguments for good measure
-  Escape the individual dnsmasq advanced/custom options
-  Encode the detail field of an alias entry before displaying its
   contents back to the user
-  Encode interface/VIP descriptions before displaying them on the NTP
   daemon settings, and GIF/GRE interfaces
-  Per the dhcpd.conf man page and other documentation from ISC, mclt
   must not be defined on the secondary
-  Shorten the wait at "reload" in startup wizard to 5 seconds from 60
-  Do not execute DNS lookups on GET, only pre-fill Host box so the user
   can press the button to execute
-  Turn alias creation links from DNS lookups into submit buttons for
   POST
-  Remove javascript alert DNS resolution action from the firewall log
   view. It was already removed from 2.2, and it's better not to allow a
   GET action to perform that action
-  Require click-through POST confirmation when restoring or deleting a
   configuation from the backup history page
-  Avoid a "Cannot use string offset as an array" error if the packages
   section of the config is missing
-  Avoid generating an invalid IPsec (racoon) config if the user
   specified a mobile pool that is too small
-  IPsec phase 2 pinghost was not used if the source IP was a virtual IP
   address `#3798 <https://redmine.pfsense.org/issues/3798>`__
-  Move dhcp6c log to dhcpd.log
   `#3799 <https://redmine.pfsense.org/issues/3799>`__
-  Do not reset source and destination port range values when it's an
   associated rule created by NAT port forward.
   `#3778 <https://redmine.pfsense.org/issues/3778>`__
-  Added filter.so to list of extensions loaded for filter_var()
   support.
-  The pfSense PHP module was setting the subnet mask of lo0 to /0,
   which could break some routes and cause other unintended routing side
   effects.

