.. include:: /substitutions.rsti

2.0.2 New Features and Changes
==============================

pfSense 2.0.2 is a maintenance release with some bug and security fixes
since 2.0.1 release. It is possible to upgrade from any previous release
to 2.0.2.

What follows is a mostly-complete changelog for pfSense 2.0.2-RELEASE

FreeBSD Security Advisories
---------------------------

Base OS updated to 8.1-RELEASE-p13 to address the following FreeBSD
Security Advisories:

-  FreeBSD-SA-12:01.openssl (v1.0/v1.1)
   http://security.freebsd.org/advisories/FreeBSD-SA-12:01.openssl.asc
-  FreeBSD-SA-12:02.crypt
   http://security.FreeBSD.org/advisories/FreeBSD-SA-12:02.crypt.asc
-  FreeBSD-SA-12:04.sysret (v1.0/v1.1)
   http://security.FreeBSD.org/advisories/FreeBSD-SA-12:04.sysret.asc
-  FreeBSD-SA-12:07.hostapd
   https://www.freebsd.org/security/advisories/FreeBSD-SA-12:07.hostapd.asc

-  NOTE: FreeBSD-SA-12:03.bind, FreeBSD-SA-12:05.bind, and
   FreeBSD-SA-12:06.bind do not apply to us, since we do not use nor
   include bind. FreeBSD-SA-12:08.linux does not apply since we do not
   use nor include the Linux compatibility layer of FreeBSD.

PPTP
----

-  Added a warning to PPTP VPN configuration page: **PPTP is no longer
   considered a secure VPN technology because it relies upon MS-CHAPv2
   which has been compromised. If you continue to use PPTP be aware that
   intercepted traffic can be decrypted by a third party, so it should
   be considered unencrypted. We advise migrating to another VPN type
   such as OpenVPN or IPsec.**

   -  More information on this can be found at
      https://isc.sans.edu/diary/End+of+Days+for+MS-CHAPv2/13807 and
      https://www.cloudcracker.com/blog/2012/07/29/cracking-ms-chap-v2/

-  Fix reference to PPTP secondary RADIUS server shared secret.
-  PPTP upgrade fixes.

NTP Changes
-----------

-  OpenNTPD was dropped in favor of the ntp.org NTP daemon, used by
   FreeBSD.
-  Status page added (Status > NTP) to show status of clock sync
-  NTP logging fixed.
-  NOTE: ntpd will bind/listen to all interfaces by default, and it has
   to in order to receive replies. Selective interface binding may still
   be used to control which IP addresses will accept traffic, but be
   aware that the default behavior has changed.

Dashboard & General GUI Fixes
-----------------------------

-  Various fixes for typos, wording, and so on.
-  Do not redirect on saving services status widget.
-  Don't use $pconfig in widgets, it has unintended side effects.
-  Fix display of widgets with configuration controls in IE.
-  Changed some padding/margin in the CSS in order to avoid wrapping the
   menu.
-  `#2165 <https://redmine.pfsense.org/issues/2165>`__ Change to embed to
   prevent IE9 from misbehaving when loading the Traffic Graph page

OpenVPN Fixes
-------------

-  Safer for 1.2.3 upgrades to assume OpenVPN interface == any, since
   1.2.3 didn't have a way to bind to an interface. Otherwise people
   accepting connections on opt interfaces on 1.2.3 will break on
   upgrade until the proper interface is selected in the GUI
-  Don't ignore when multiple OpenVPN DNS, NTP, WINS, etc servers were
   specified in 1.2.3 when upgrading. 1.2.3 separated by ;, 2.x uses
   separate vars.
-  Fix upgrade code for 1.2.3 with assigned OpenVPN interface.
-  Fix LZO setting for Upgraded OpenVPN (was turning compression on even
   if old config had it disabled.)
-  Be more intelligent when managing OpenVPN client connections bound to
   CARP VIPs. If the interface is in BACKUP status, do not start the
   client. Add a section to rc.carpmaster and rc.carpbackup to trigger
   this start/stop. If an OpenVPN client is active on both the master
   and backup system, they will cause conflicting connections to the
   server. Servers do not care as they only accept, not initiate.

IPsec fixes
-----------

-  Only do foreach on IPsec p2's if it's actually an array.
-  `#2201 <https://redmine.pfsense.org/issues/2201>`__ Don't let an empty
   subnet into racoon.conf, it can cause parse errors.
-  `#2201 <https://redmine.pfsense.org/issues/2201>`__ Reject an
   interface without a subnet as a network source in the IPsec Phase 2
   GUI.
-  Add routes even when IPsec is on WAN, as WAN may not be the default
   gateway.
-  `#1986 <https://redmine.pfsense.org/issues/1986>`__ Revamped IPsec
   status display and widget to properly account for mobile clients.
-  Fixed a bug that caused the IPsec status and widget to display slowly
   when mobile clients were enabled.

User Manager Fixes
------------------

-  `#2066 <https://redmine.pfsense.org/issues/2066>`__ Improve
   adding/removing of users accounts to the underlying OS, especially
   accounts with a numeric username.
-  Include admin user in bootup account sync
-  Fix permission and certificate display for the admin user
-  Fix ssh key note to refer to DSA not just RSA since both work.
-  ":" chars are invalid in a comment field, filter them out.
-  When renaming a user, make sure to remove the previous user or it
   gets left in /etc/passwd.
-  `#2326 <https://redmine.pfsense.org/issues/2326>`__ Do not allow empty
   passwords since this might cause problems for some authentication
   servers like LDAP.

Captive Portal Fixes
--------------------

-  Take routing table into account when figuring out which IP address to
   use for talking to CP clients.
-  Prevent browser auto-fill username and password on voucher config, as
   it can interfere with the settings being properly saved if sync isn't
   fully configured, which this can make happen accidentally.
-  Correct the Called-Station-Id attribute setting to be the same on
   STOP/START packets
-  Correct the Called-Station-Id attribute setting to be consistent on
   the data sent
-  `#2082 <https://redmine.pfsense.org/issues/2082>`__ Correct the log to
   display the correct information about an existing session
-  `#2052 <https://redmine.pfsense.org/issues/2052>`__ Remove duplicate
   rule
-  Fix which roll to write when writing the active voucher db
-  Always load ipfw when enabling CP to ensure the pfil hooks are setup
   right
-  `#2378 <https://redmine.pfsense.org/issues/2378>`__ Fix selection of
   CP interfaces when using more than 10 opt interfaces.
-  Strengthen voucher randomization.

NAT/Firewall Rules/Alias Fixes
------------------------------

-  `#2327 <https://redmine.pfsense.org/issues/2327>`__ Respect the value
   of the per-rule "disable reply-to" checkbox.
-  `#1882 <https://redmine.pfsense.org/issues/1882>`__ Fix an invalid pf
   rule generated from a port forward with dest=any on an interface with
   ip=none
-  `#2163 <https://redmine.pfsense.org/issues/2163>`__ 1:1 Reflection
   fixes for static route subnets and multiple subnets on the same
   interface.
-  Better validation on URL table alias input from downloaded files.
-  `#2293 <https://redmine.pfsense.org/issues/2293>`__ Don't put an extra
   space after "pass" when assuming it as the default action or later
   tests will fail to match this as a pass rule.
-  Update help text for Host aliases to indicate FQDNs are allowed.
-  `#2210 <https://redmine.pfsense.org/issues/2210>`__ Go back to scrub
   rather than "scrub in", the latter breaks MSS clamping for egress
   traffic the way we use it.
-  Fix preservation of the selection of interfaces on input errors for
   floating rules.
-  Fix URL table update frequency box.
-  Fix input validation for port forwards, Local Port must be specified.
-  Added a setting to increase the maximum number of pf tables, and
   increased the default to 3000.
-  Properly determine active GUI and redirect ports for anti-lockout
   rule, for display and in the actual rule.
-  Handle loading pf limits (timers, states, table/entry limits, etc) in
   a separate file to avoid a chicken-and-egg scenario where the limits
   would never be increased properly.

Interface/Bridging Fixes
------------------------

-  Correct checking if a gif is part of bridge so that it actually works
   correctly adding a gif after having created it on bootup
-  Use the latest functions from pfSense module for getting interface
   list
-  Use the latest functions from pfSense module for creating bridges
-  Implement is_jumbo_capable in a more performant way. This should
   help with large number of interfaces
-  Since the CARP interface name changed to "vipN" from "carpN", devd
   needs to follow that change as well.
-  `#2242 <https://redmine.pfsense.org/issues/2242>`__ Show lagg protocol
   and member interfaces on Status > Interfaces.
-  `#2212 <https://redmine.pfsense.org/issues/2212>`__ Correctly stop
   dhclient process when an interface is changed away from DHCP.
-  Fixed 3G SIM PIN usage for Huawei devices
-  Properly obey MTU set on Interface page for PPP type WANs.

Other Misc. Fixes
-----------------

-  `#2057 <https://redmine.pfsense.org/issues/2057>`__ Add a checkbox
   that disables automatically generating negate rules for directly
   connected networks and VPNs.
-  Mark "Destination server" as a required field for DHCP Relay
-  Clarify the potential pitfalls when setting the Frequency Probe and
   Down parameters.
-  Add a PHP Shell shortcut to disable referer check (playback
   disablereferercheck)
-  `#2040 <https://redmine.pfsense.org/issues/2040>`__ Make Wireless
   Status tables sortable
-  `#2068 <https://redmine.pfsense.org/issues/2068>`__ Fix multiple keys
   in a file for RFC2136 dyndns updates.
-  Check to see if the pid file exists before trying to kill a process
-  `#2144 <https://redmine.pfsense.org/issues/2144>`__ Be smarter about
   how to split a Namecheap hostname into host/domain.
-  Add a small script to disable APM on ATA drives if they claim to
   support it. Leaving this on will kill drives long-term, especially
   laptop drives, by generating excessive Load Cycles. The APM bit set
   will persist until the drive is power cycled, so it's necessary to
   run on each boot to be sure.
-  `#2158 <https://redmine.pfsense.org/issues/2158>`__ Change SNMP
   binding option to work on any eligible interface/VIP. If the old
   bindlan option is there, assume the lan interface for binding.
-  Fix reference to PPTP secondary RADIUS server shared secret.
-  PPTP upgrade fixes.
-  `#2147 <https://redmine.pfsense.org/issues/2147>`__ Add button to
   download a .p12 of a cert+key.
-  `#2233 <https://redmine.pfsense.org/issues/2233>`__ Carry over the key
   length on input errors when creating a certificate signing request.
-  `#2207 <https://redmine.pfsense.org/issues/2207>`__ Use PHP's built-in
   RFC 2822 date format, rather than trying to make our own.
-  Allow specifying the branch name after the repository URL for gitsync
   command-line arguments and remove an unnecessary use of the backtick
   operator.
-  Correct send_multiple_events to conform with new
   check_reload_status behaviour
-  Do not wipe logs on reboot on full install
-  Set FCGI_CHILDREN to 0 since it does not make sense for php to
   manage itself when lighttpd is doing so. This makes it possible to
   recover from 550-Internal... error.
-  Support for xmlrpcauthuser and xmlrpcauthpass in $g.
-  Fix Layer 7 pattern upload, button text check was incorrect.
-  Correct building of traffic shaping queue to not depend on parent
   mask
-  `#2239 <https://redmine.pfsense.org/issues/2239>`__ Add alias support
   to static routes
-  Use !empty instead of isset to prevent accidental deletion of the
   last used repository URL when firmware update gitsync settings have
   been saved without a repository URL.
-  Better error handling for crypt_data and also better password
   argument handling
-  Stop service needs to wait for the process to be stopped before
   trying to restart it.
-  Use a better default update url
-  Fix missing description in rowhelper for packages.
-  `#2402 <https://redmine.pfsense.org/issues/2402>`__,
   `#1564 <https://redmine.pfsense.org/issues/1564>`__ Move the
   stop_packages code to a function, and call the function from the
   shell script, and call the function directly for a reboot.
-  `#1917 <https://redmine.pfsense.org/issues/1917>`__ Fix DHCP domain
   search list
-  Update Time Zone zoneinfo database using latest zones from FreeBSD
-  Handle HTTPOnly and Secure flags on cookies
-  Fixed notifications for firmware upgrade progress
-  Removed an invalid declaration that considered 99.0.0.0/8 a private
   address.
-  Fixed redirect request for IE8/9
-  `#1049 <https://redmine.pfsense.org/issues/1049>`__ Fix crashes on
   NanoBSD during package removal/reinstall. Could result in the GUI
   being inaccessible after a firmware update.
-  Fix some issues with upgrading NanoBSD+VGA and NanoBSD+VGA Image
   Generation
-  Fix issues upgrading from systems with the old "Uniprocessor" kernel
   which no longer exists.
-  Fix a few potential XSS/CSRF vectors.
-  Fixed issue with login page not showing the correct selected theme in
   certain configurations.
-  Fix limiters+multi-wan

Binary/Supporting Program Updates
---------------------------------

-  Some cleanup to reduce overall image size
-  Fixes to ipfw-classifyd file reading and handling
-  Updated miniupnpd
-  ISC DHCPD 4.2.4-P1
-  mdp5 upgraded to 5.6
-  pftop updated
-  lighttpd updated to 1.4.32, for CVE-2011-4362 and CVE-2012-5533.

