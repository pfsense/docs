.. include:: /substitutions.rsti

2.1.1 New Features and Changes
==============================

Security Fixes
--------------

-  `FreeBSD-SA-14:01.bsnmpd <http://www.freebsd.org/security/advisories/FreeBSD-SA-14:01.bsnmpd.asc>`__
   / CVE-2014-1452
-  `FreeBSD-SA-14:02.ntpd <http://www.freebsd.org/security/advisories/FreeBSD-SA-14:02.ntpd.asc>`__
   / CVE-2013-5211
-  `FreeBSD-SA-14:03.openssl <http://www.freebsd.org/security/advisories/FreeBSD-SA-14:03.openssl.asc>`__
   / CVE-2013-4353, CVE-2013-6449, CVE-2013-6450

    Note: This FreeBSD SA is only for the FreeBSD 10.x base, but we
    include that version of OpenSSL from ports.

-  The following FreeBSD Security Advisories were not relevant to
   pfSense:

   -  `FreeBSD-SA-13:14.openssh <http://www.freebsd.org/security/advisories/FreeBSD-SA-13:14.openssh.asc>`__
   -  `FreeBSD-SA-14:04.bind <http://www.freebsd.org/security/advisories/FreeBSD-SA-14:04.bind.asc>`__

-  Use HTTPS to get updates.
   `#2952 <http://redmine.pfsense.org/issues/2952>`__
-  Escape necessary chars to avoid XSS injection.
   `#2952 <http://redmine.pfsense.org/issues/2952>`__
-  Add escapeshellarg() calls on more exec parameters.
-  Replace some exec() calls by php functions like symlink, copy,
   unlink, etc.
-  Use HTTPS for pfsense.org URLs.
-  Protect output to browser by using htmlspecialchars.
   `#3461 <http://redmine.pfsense.org/issues/3461>`__
-  Improve checks for params 'id', 'dup' and other similar ones to make
   sure they are numeric integer, also, pass them through
   htmlspecialchars before printing.
-  Remove special characters that can lead to shell/XSS compromises from
   submitted input when installing packages.
   `#3461 <http://redmine.pfsense.org/issues/3461>`__
-  Ask for validation when real package operation will be done and ask
   for the operation with POST to get protection from CSRF.
   `#3460 <http://redmine.pfsense.org/issues/3460>`__
-  Use HTTPS for fetching packages.

Interfaces
----------

-  Updated em/igb/ixgb/ixgbe drivers that add support for i210 and i354
   NICs and fix issues with ix\* cards.
-  Prevent assigned vlans from having their tag changed.
-  Fix ifconfig error on gif in certain cases.
-  If rc.newwanip is run on an interface that should not have an IP
   address, do not take any action. This could lead to certain
   interfaces bouncing link if they had no IP address.
-  In rc.newwanip, if the interface is configured and not enabled, bail.
   We do not need to change settings for disabled interfaces.
   `#3313 <http://redmine.pfsense.org/issues/3313>`__
-  Skip processing in rc.newwanip if the interface has no IP address.
-  Fix pkg\_edit.php to show interface description instead of interface
   name
-  Make sure vlan interface exist when they are configured
   `#3270 <http://redmine.pfsense.org/issues/3270>`__
-  Limit CIDR choices for IPv4 on GRE interface.
   `#3277 <http://redmine.pfsense.org/issues/3277>`__
-  Do not destroy an interface when it's being disabled
   `#3350 <http://redmine.pfsense.org/issues/3350>`__
-  Prevent network or broadcast address to be set on interface (console,
   GUI and wizard). `#3196 <http://redmine.pfsense.org/issues/3196>`__
-  Reduce unnecessary operations and other fixes to MTU code. This fixes
   slow boot times and proper handling of mtu for VLANs.
-  Provide a dynamic gateway for GIF and GRE v6 tunnels so it can be
   used on firewall rules etc.
   `#3484 <http://redmine.pfsense.org/issues/3484>`__
-  Bring up appropriate interface for GRE/GIF.
   `#3281 <http://redmine.pfsense.org/issues/3281>`__
-  Prevent removing the IP from the underlying GRE interface in the OS
   when assigning GRE interface and configuring an IP address.
   `#3280 <http://redmine.pfsense.org/issues/3280>`__
-  When an interface goes down try to shut the RAs and dhcpd6 service on
   that interface. `#2627 <http://redmine.pfsense.org/issues/2627>`__
-  Sync up ALTQ-capable interfaces list
-  Trigger rc.newwaipv6 from pppoe when it gets an inet6 configuration
-  Update list of mobile service providers.
-  Correct check to enable ieee8021x.

Gateways/Routing
----------------

-  Respect default gateway option when adding a gateway from interfaces
   page. `#3230 <http://redmine.pfsense.org/issues/3230>`__
-  Use a more accurate error message when attempting to add/edit a
   gateway that does not have an appropriate IP address for the type.
   `#3282 <http://redmine.pfsense.org/issues/3282>`__
-  Make return\_gateways\_array() return all disabled gateways when
   $disabled is true. `#3291 <http://redmine.pfsense.org/issues/3291>`__
-  Don't flush interface cache on each call of the function when looping
   through all gateways.
-  Fix an issue that changes wrong gateway entry when items are hidden
-  Delete static route when monitor IP is removed, also save monitor IP
   even when it's disabled
-  Return Gateway Group IP protocol version even when no gateway IP can
   be located.
-  Remove broken 'dynamic6' gateway, we already have ipprotocol to tell
   us the IP version, leave it more simple using only 'dynamic'

NAT/Firewall Rules/Aliases
--------------------------

-  Reload filter rules when activate or deactivate dhcpdv6
   `#3218 <http://redmine.pfsense.org/issues/3218>`__
-  Make sure no extra spaces end up in the parsed IP in the filter logs
   as it can lead to issues in other places (Easy Rule, etc)
-  Use (self) rather than any as the destination for the lockout rules
-  Use (self) instead of any for web lockout
-  Avoid pf table names conflict.
   `#3268 <http://redmine.pfsense.org/issues/3268>`__
-  Fix display of full URL in URL table listing as seen in an Alias
   popup. `#3242 <http://redmine.pfsense.org/issues/3242>`__
-  Make it more explicit that 'update freq.' for URL table aliases unit
   is days
-  Fix situation where removing an alias entry and then adding a new one
   resulted in an entry box with broken formatting.
   `#3283 <http://redmine.pfsense.org/issues/3283>`__
-  Make sure pf rule labels never have more than 63 chars.
   `#3208 <http://redmine.pfsense.org/issues/3208>`__
-  Rewrite the display\_host\_results() function to use spaces instead
   of tabs. It does a much better job of aligning the fields in each
   column and works in all the browsers, particularly chrome which
   doesn't support the tab character.
-  Handle comma-separated list of remote networks when making
   vpn\_networks table
-  Fix rules that pass out traffic for Proxy ARP VIP entries which had
   incorrect destination
   `#3331 <http://redmine.pfsense.org/issues/3331>`__
-  Load only the options rather than clearing the whole ruleset.
-  Validate IP address ranges correctly on Alias Bulk Import
-  Fix display of CIDR/Update Freq in Alias Edit
-  In the filter log, the protocol might also say “icmpv6” so account
   for that when making a rule using Easy Rule.
-  Move 'allow dhcpv6 client' rules above block bogonsv6 ones.
   `#3395 <http://redmine.pfsense.org/issues/3395>`__
-  Only add dhcpv6 client allow rules if ipv6allow is set
-  Add all advanced options to rule table hover text.
-  Open up Firewall Rules Advanced Options section if any values have
   been set.
-  Validate rule Advanced Options numeric entries properly
-  Disable default allow incoming rules for 6to4 and 6rd interfaces.
   This rule unintentionally allows all services on the interface.
-  Skip OpenVPN interfaces when creating the first set of manual rules
   to be consistent with the behavior of Automatic Outbound NAT.
   `#3528 <http://redmine.pfsense.org/issues/3528>`__
-  Try to restore last working ruleset rather than staying without
   configuration at all if an invalid ruleset is encountered.
-  Fix days and weeks selection on schedules
-  Prevent prevent putting an subnet in the IPv6 address field since it
   then breaks the filter generation process.
-  Put a timeout of 30 seconds on the bogon update download.
   `#3412 <http://redmine.pfsense.org/issues/3412>`__
-  Before downloading file to process urltable, there is a random wait
   time between 5 and 60 seconds. Because of this, the difference
   between file mtime and current time can be less than $freq \* 86400
   and it'll be skipped. Add 90 seconds (60 of max random wait + 30 just
   to be sure) to avoid skipping a file that should be updated.
   `#3469 <http://redmine.pfsense.org/issues/3469>`__
-  Validate if src OR dst have IP address set when protocol is IPv4+v6.
   `#3499 <http://redmine.pfsense.org/issues/3499>`__
-  Improve data validation to avoid save a host/subnet or a IPv4 with
   invalid mask. The reported error is on javascript and only happen on
   IE8, but this fix will prevent the same issue happening in the future
   on a different browser.
   `#3449 <http://redmine.pfsense.org/issues/3449>`__

Traffic Shaping
---------------

-  Fixed typo in CoDel wiki link
-  Fix codel not being applied on non-priq queue types
-  Fix saving and range checking of 'Packet loss rate' and 'Bucket Size'
   in limiters.
-  Add previously missing DSCP VA.
-  Clarify note on limiter queue weight to state that higher values get
   a larger share.

Dashboard & General GUI
-----------------------

-  Convert mac address to lowercase when saving to avoid duplicates. It
   fixes `#3195 <http://redmine.pfsense.org/issues/3195>`__
-  Include the CP zone in the form parameters if one is defined. Fixes
   access to concurrent graph on zones other than the first/default.
-  Miscellaneous HTML cleanup
-  Fix interface names shown in the traffic graphs widget.
   `#3245 <http://redmine.pfsense.org/issues/3245>`__
-  Send the help links to HTTPS destinations on web servers that support
   HTTPS.
-  Specify favicon in pages directly
-  Add some missing privileges to the list.
   `#3279 <http://redmine.pfsense.org/issues/3279>`__
-  Many fixes on privileges.
   `#3216 <http://redmine.pfsense.org/issues/3216>`__
-  Allow setting a default scale type preference for the traffic graphs
   widget
-  Account for a widget being null/not defined, and not just closed/open
   when deciding if a widget function should be called. This allows the
   system information dashboard widgets to update properly.
-  Avoid dashboard divide by zero errors
-  Detect Zones and Cores for thermal sensors using regex.
   `#3337 <http://redmine.pfsense.org/issues/3337>`__
-  Do not sort users when adding privileges. It's unnecessary and lead
   to unintentional edits to the wrong account.
-  Add specific privilege for easyrule.
-  Return all stats when all or remote is selected on Traffic Graph and
   make the default query return “Local” traffic.
-  Update year, links for 2.1.1.

Captive Portal
--------------

-  Fix CP stats generation for concurrent users.
   `#3225 <http://redmine.pfsense.org/issues/3225>`__
-  Remove redundant copies of getNasIP()
   `#3234 <http://redmine.pfsense.org/issues/3234>`__
-  Set default captive portal RADIUS authentication value to
   radius\_protocol during upgrade
   `#3226 <http://redmine.pfsense.org/issues/3226>`__
-  Add Captive Portal Zones privileges definition.
   `#3216 <http://redmine.pfsense.org/issues/3216>`__
-  Prevent a possible division by zero in Captive Portal.
   `#3212 <http://redmine.pfsense.org/issues/3212>`__
-  Fix saving of voucher sync settings
-  Reduce the total minutes by the remote minutes used, do not use the
   value directly. Otherwise the voucher will be cut short or listed
   invalid when it otherwise should have time left over.
-  Make sure to give the Captive Portal zone a name during the upgrade,
   or else it comes through with a blank/null name.
-  Properly set zone dedicated rules in the rules/pipes DBs to properly
   release when a zone is deactivated
-  Don't generate rules for disabled captive portal instances
-  Do some more error checking and put secondary radius attributes only
   if configured on a Captive Portal instance.
-  If set use the default bandwidth setting on the Captive Portal even
   for MAC passthrough.
-  Fix various problems with Captive Portal voucher synchronization
   introduced during conversion to zones.
-  Properly compile the Captive Portal database query to insert the
   values.
-  Fix deletion of IPFW rules and pipes for passthru MAC.
   `#3538 <http://redmine.pfsense.org/issues/3538>`__
-  Use the 11th column for the radius context rather than overriding the
   interim interval field with it.
   `#3447 <http://redmine.pfsense.org/issues/3447>`__
-  Use descr as the field name for voucher description so it gets CDATA
   protection. `#3441 <http://redmine.pfsense.org/issues/3441>`__
-  Consider setting of noconcurrent login for passthrough expiration of
   users. `#3340 <http://redmine.pfsense.org/issues/3340>`__
-  Use the default bandwidth specification if configured even for
   allowed IP address and hostname.
-  Properly detect when there are issues with communicating with syncip
   and to use the local DB for this. Otherwise detect if the remote says
   the voucher is not valid say its not valid.

VPN
---

-  Fix find\_service\_by\_openvpn\_vpnid() on OpenVPN Status
-  Allow special characters to be used on IPsec mobile login banner.
   `#3247 <http://redmine.pfsense.org/issues/3247>`__
-  Fix cisco-avpair processing for IPsec and OpenVPN, and route
   processing from avpair replies.
-  Fix logic in detecting if OpenVPN resync needed
-  Fix vpn\_pppoe\_get\_id and stop duplicating pppoeid for multiple
   servers. `#2286 <http://redmine.pfsense.org/issues/2286>`__
-  Use env var provided by openvpn to determine if it's tun or tap.
   `#3475 <http://redmine.pfsense.org/issues/3475>`__
-  Add an option to verify IPsec peers\_identifier when it's ASN.1
   distinguished name.
   `#2904 <http://redmine.pfsense.org/issues/2904>`__

Certificates
------------

-  Certificate Manager, for 'Create an internal Certificate' use the
   correct 'Digest Algorithm'
-  OpenSSL does not like country codes longer than two letters, so
   remove entries that are not actually country codes.
-  Perform a much more accurate comparison between two certificates to
   determine if they are identical when checking their revocation
   status. `#3237 <http://redmine.pfsense.org/issues/3237>`__
-  Allow an “empty” CRL to be exported, since this is still a valid
   action.
-  Fixes for “Alternative Names” on certificates.
-  Fix issue with CSR generation.
   `#2820 <http://redmine.pfsense.org/issues/2820>`__
-  Increase default openssl to bits 2048.

DHCP
----

-  Optimize DHCPv4 lease display online status for static leases. Do not
   re-parse complete ARP table for each lease, as it can be slow with
   large ARP tables.
-  Add upgrade code to change the DHCP next-server value to nextserver
   since it was renamed sometime in 2.1 but upgrade code didn't follow.
-  Give clients the IPV6 address of the DNS server via DHCPv6 Server
-  Check if dhcp start and end addresses are inside interface subnet.
   `#3196 <http://redmine.pfsense.org/issues/3196>`__
-  Remove 'deny unknown clients' option from DHCPv6 since it's not
   supported. `#3364 <http://redmine.pfsense.org/issues/3364>`__
-  Fix DHCP lease time display, strftime already convert it to local
   timezone, so we no need to calc offset
-  Use correct parameter (bootfile-url) to configure netboot on DHCPdv6.
   `#3421 <http://redmine.pfsense.org/issues/3421>`__
-  Only use IPv4 DNS servers in IPv4 DHCP configuration.
   `#3483 <http://redmine.pfsense.org/issues/3483>`__
-  Fix PHP error when saving DHCP settings if no manually configured DNS
   servers exist.
-  Send a HUP to dhcp6 to signal a reload.
   `#3514 <http://redmine.pfsense.org/issues/3514>`__

Load Balancing
--------------

-  Prevent a Fall Back Pool from being selected when the DNS protocol is
   in use. If one is present in the config, ignore it.
   `#3300 <http://redmine.pfsense.org/issues/3300>`__
-  Fix display of pools in the LB status widget and on the LB Virtual
   Server status.

Time
----

-  Allow multiple valid time servers to be entered in the wizard, as
   they are allowed under System > General
-  Update time zone data to 2013i
-  Teach system\_timezone\_configure() to deal with symlinks to avoid
   having timezone misconfigured.
   `#3293 <http://redmine.pfsense.org/issues/3293>`__
-  Add 'limited' to ntpd restrict list to workaround
   FreeBSD-SA-14:02.ntpd/CVE-2013-5211.
   `#3384 <http://redmine.pfsense.org/issues/3384>`__
-  Use “disable monitor” in NTP config to mitigate
   FreeBSD-SA-14:02.ntpd/CVE-2013-5211.
-  Update ntp to ntp-devel for FreeBSD-SA-14:02.ntpd/CVE-2013-5211.
-  Avoid placing an empty “interface listen” directive in ntpd.conf.

Misc
----

-  Fix ALIX upgrade crash during RRD processing
-  Fix “Could not open shared memory for read 1000” issue on Diagnostics
   > NanoBSD. `#3235 <http://redmine.pfsense.org/issues/3235>`__
-  Fix ufslabels.sh logic to avoid trying to convert slices which are
   already using appropriate labels. Fixes
   `#3207 <http://redmine.pfsense.org/issues/3207>`__
-  Fix removal of the first cron job entry in the list.
-  We do not use nor include newsyslog, so remove the cron job from the
   default configuration and on upgrade.
-  Split SSL/TLS into separate checkboxes so that plaintext connections
   can be made secured by using STARTTLS. Support for SMTPS connections
   should probably be done away with in future.
   `#3180 <http://redmine.pfsense.org/issues/3180>`__
-  Add source address selection to syslog settings, so it can work more
   effectively over a VPN.
   `#355 <http://redmine.pfsense.org/issues/355>`__
-  Rework the usage of the shell i/o during stop\_packages(), fixes the
   “Syntax error: bad fd number” for the remaining people who still saw
   it on shutdown
-  Switch to rw mode before file operations on RFC2136 cache. Fixes
   `#3201 <http://redmine.pfsense.org/issues/3201>`__
-  Make the RADIUS settings respect the description of the timeout
   field. If the timeout value is left blank, use 5 seconds, don't print
   an error.
-  Call conf\_mount\_rw before deleting a user.
   `#3294 <http://redmine.pfsense.org/issues/3294>`__
-  Handle the reinstallall case with confirmation.
   `#3548 <http://redmine.pfsense.org/issues/3548>`__
-  Do not list the same CARP ip as an option for its own Interface.
-  Accept adding an IP Aliases on top of CARP VIP when the parent
   interface does have a valid IP address in the alias subnet.
-  Simplify log filtering logic calling grep less times, as done on
   mail\_reports.inc on 2c6efc9.
-  Fix console recent config restore, allow restoration of the last
   backup listed. `#3438 <http://redmine.pfsense.org/issues/3438>`__
-  Enhanced validation of general DNS servers and gateways
-  Add a mechanism by which the serial port can be forced on always
   regardless of the config setting. (useful for nano+vga setups)
-  Add a knob to let the user select which console (video or serial) is
   preferred in cases where there are multiple consoles present.
-  Skip input validation when choosing an existing certificate in the
   User Manager. `#3505 <http://redmine.pfsense.org/issues/3505>`__
-  pfSense\_interface\_deladdress() only knows how to delete an ip
   address, not a subnet.
   `#3513 <http://redmine.pfsense.org/issues/3513>`__
-  Make is\_linklocal case-insensitive.
   `#3433 <http://redmine.pfsense.org/issues/3433>`__
-  Errors in in RRD graph calculations
-  Delete /var/crash content when the user clicks 'No'.
   `#3486 <http://redmine.pfsense.org/issues/3486>`__
-  Make sure filesystem is read-write when operating on groups.
   `#3492 <http://redmine.pfsense.org/issues/3492>`__
-  Fix OpenVPN XML section name for selective configuration backup.
-  Remove TRIM\_set and TRIM\_unset support. This method isn't very
   elegant and isn't necessary in the long run. It's better handled
   during the install process or while booted off other media (e.g. CD
   or Memstick).

