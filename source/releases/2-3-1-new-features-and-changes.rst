2.3.1 New Features and Changes
==============================

Security/Errata
---------------

-  FreeBSD Security Advisories

   -  `FreeBSD-SA-16:17
      OpenSSL <https://www.freebsd.org/security/advisories/FreeBSD-SA-16:17.openssl.asc>`__
   -  `FreeBSD-SA-16:18
      atkbd <https://www.freebsd.org/security/advisories/FreeBSD-SA-16:18.atkbd.asc>`__
   -  `FreeBSD-SA-16:19
      sendmsg <https://www.freebsd.org/security/advisories/FreeBSD-SA-16:19.sendmsg.asc>`__

-  OpenVPN upgraded from 2.3.10 to 2.3.11. Fixes two potential security
   issues.

   -  `OpenVPN 2.3.11 Change
      Log <https://community.openvpn.net/openvpn/wiki/ChangesInOpenvpn23>`__

-  pfSense Advisories

   -  `pfSense-SA-16_03.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-16_03.webgui.asc>`__
   -  `pfSense-SA-16_04.filterlog <https://www.pfsense.org/security/advisories/pfSense-SA-16_04.filterlog.asc>`__
   -  2.3.1 update 1 patches
      `pfSense-SA-16_05.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-16_05.webgui.asc>`__.

Config Upgrade
--------------

-  Fixed config upgrade for CARP VIPs on gateway groups, GRE and gif for
   uniqid format. `#6222 <https://redmine.pfsense.org/issues/6222>`__
-  Fixed config upgrade for IP aliases with CARP IP parent.
   `#6164 <https://redmine.pfsense.org/issues/6164>`__
-  Correct OpenVPN topology config upgrade to retain 2.2.x and prior
   net30 topology. `#6140 <https://redmine.pfsense.org/issues/6140>`__
-  Correct and adjust apinger parameters to dpinger parameters
   automatically on upgrade.
   `#6142 <https://redmine.pfsense.org/issues/6142>`__

Gateways
--------

-  Fix static route for IPv6 monitor IP with link-local gateway.
   `#6353 <https://redmine.pfsense.org/issues/6353>`__
-  Fix default gateway switching with IPv6 and link-local gateways.
   `#6258 <https://redmine.pfsense.org/issues/6258>`__

OS / Backend
------------

-  NanoBSD is now permanent read-write, to avoid issues with slow rw->ro
   mount times and systems getting stuck read-only mounted.
   `#6184 <https://redmine.pfsense.org/issues/6184>`__
-  Systems using a RAM disk for /var/ have their alias tables backed up
   and restored during bootup.
   `#6189 <https://redmine.pfsense.org/issues/6189>`__
-  Set console settings (serial configuration, password protection,
   etc.) post-upgrade.
   `#6120 <https://redmine.pfsense.org/issues/6120>`__
-  Ensure package repo is updated with latest metadata when checking for
   latest version. `#6115 <https://redmine.pfsense.org/issues/6115>`__
-  Display consistent firmware version on dashboard and in update
   checker. `#6320 <https://redmine.pfsense.org/issues/6320>`__
-  Correct description of update branch options.
   `#6136 <https://redmine.pfsense.org/issues/6136>`__
-  Prevent update checking failures from killing webGUI.
   `#6177 <https://redmine.pfsense.org/issues/6177>`__
-  Make pkg use configured proxy server settings where they exist.
   `#6149 <https://redmine.pfsense.org/issues/6149>`__

Web GUI
-------

-  Fix row delete button on unsaved aliases, NTP, UPnP and other
   screens. `#6101 <https://redmine.pfsense.org/issues/6101>`__
-  Captive portal MAC passthrough credits waiting period box restored.
   `#6290 <https://redmine.pfsense.org/issues/6290>`__
-  Outbound NAT edit screen destination field alias auto-completion
   restored. `#6287 <https://redmine.pfsense.org/issues/6287>`__
-  Captive portal allowed IPs direction selection on edit fixed.
   `#6267 <https://redmine.pfsense.org/issues/6267>`__
-  Restored input validation on port forwards to prohibit IPv6.
   `#6265 <https://redmine.pfsense.org/issues/6265>`__
-  Restored input validation on firewall rules to prohibit IPv6 IPs in
   IPv4 rules and vice versa.
   `#6211 <https://redmine.pfsense.org/issues/6211>`__
-  Fixed PHP error on edit of PPP interfaces.
   `#6264 <https://redmine.pfsense.org/issues/6264>`__
-  Fixed radio button placement on gateways dashboard widget settings.
   `#6259 <https://redmine.pfsense.org/issues/6259>`__
-  Fixed display post-refresh of system information dashboard widget.
   `#6251 <https://redmine.pfsense.org/issues/6251>`__
-  Restored in/out bytes counters on Status>Interfaces.
   `#6244 <https://redmine.pfsense.org/issues/6244>`__
-  Correctly show and hide OpenVPN topology field as applicable.
   `#6236 <https://redmine.pfsense.org/issues/6236>`__
   `#6214 <https://redmine.pfsense.org/issues/6214>`__
-  Correct voucher character set input validation.
   `#6231 <https://redmine.pfsense.org/issues/6231>`__
-  Disable background update checking on dashboard update check is
   disabled. `#6212 <https://redmine.pfsense.org/issues/6212>`__
-  Restore input validation of IP address family and rule type,
   verifying IPv6 IPs with IPv6 rules, and IPv4 for IPv4 rules.
   `#6218 <https://redmine.pfsense.org/issues/6218>`__
-  Add validation of address family and protocol combinations on packet
   capture page. `#6219 <https://redmine.pfsense.org/issues/6219>`__
-  Add validation of IP aliases with CARP parent interfaces to ensure
   matching address family.
   `#6218 <https://redmine.pfsense.org/issues/6218>`__
-  Restore GET parameters on status_graph.php.
   `#6192 <https://redmine.pfsense.org/issues/6192>`__
-  Fixed PHP error on input validation failure with floating rules in
   some cases. `#6175 <https://redmine.pfsense.org/issues/6175>`__
-  Use CDATA for firewall rule separator descriptions so non-English
   characters work. `#6174 <https://redmine.pfsense.org/issues/6174>`__
-  Fix port forward edit destination field filling when virtual IPs
   configured. `#6173 <https://redmine.pfsense.org/issues/6173>`__
-  Fix load balancer monitor edit.
   `#6171 <https://redmine.pfsense.org/issues/6171>`__
-  Restore "none" in load balancer fall-back pool.
   `#6170 <https://redmine.pfsense.org/issues/6170>`__
-  Restore use of aliases in load balancer.
   `#6169 <https://redmine.pfsense.org/issues/6169>`__
-  Fix duplicate for load balancer pools and virtual servers.
   `#6168 <https://redmine.pfsense.org/issues/6168>`__
-  Restore description field on lagg edit page.
   `#6163 <https://redmine.pfsense.org/issues/6163>`__
-  Fix saving of bogons update frequency.
   `#6162 <https://redmine.pfsense.org/issues/6162>`__
-  Restore description field on captive portal IP passthrough.
   `#6161 <https://redmine.pfsense.org/issues/6161>`__
-  Fix saving of sticky connections timeout field.
   `#6146 <https://redmine.pfsense.org/issues/6146>`__
-  Show all restore areas in backup/restore screen.
   `#6144 <https://redmine.pfsense.org/issues/6144>`__
-  Fix moving of rule separator before saving.
   `#6128 <https://redmine.pfsense.org/issues/6128>`__
-  Use consistent up and down arrow formats on dashboard widgets.
   `#6123 <https://redmine.pfsense.org/issues/6123>`__
-  Fix typo on OpenVPN server description.
   `#6102 <https://redmine.pfsense.org/issues/6102>`__
-  Fix missing string on notification "mark as read" button.
   `#6104 <https://redmine.pfsense.org/issues/6104>`__
-  Fix firewall rule separator positioning with easy rule addition.
   `#6105 <https://redmine.pfsense.org/issues/6105>`__
-  Prevent closing of info box on monitoring page.
   `#6106 <https://redmine.pfsense.org/issues/6106>`__
-  Add custom date range option to monitoring page.
-  Use infoblock on IPsec PSK screen.
   `#6107 <https://redmine.pfsense.org/issues/6107>`__
-  Fixed loss of "Do not NAT" enable on edit on outbound NAT.
   `#6112 <https://redmine.pfsense.org/issues/6112>`__
-  Correct label of 1:1 NAT edit screen.
   `#6114 <https://redmine.pfsense.org/issues/6114>`__
-  Add AJAX updates to NTP status page.
   `#6117 <https://redmine.pfsense.org/issues/6117>`__
-  Fix button spacing on Edit File and Command pages.
   `#5995 <https://redmine.pfsense.org/issues/5995>`__
-  Fix specification of port in DNS Resolver domain overrides.
   `#6091 <https://redmine.pfsense.org/issues/6091>`__
-  Fix moving of multiple items to bottom of list on firewall, NAT and
   IPsec screens. `#6092 <https://redmine.pfsense.org/issues/6092>`__
-  Fix setup wizard with only WAN assigned and using static IP.
   `#6093 <https://redmine.pfsense.org/issues/6093>`__
-  Remove logo from wizard since it's now redundant.
   `#6095 <https://redmine.pfsense.org/issues/6095>`__
-  Fix gateway widget cut-off with 3 column dashboard.
   `#6096 <https://redmine.pfsense.org/issues/6096>`__
-  Fixed force update on RFC 2136 DDNS.
   https://redmine.pfsense.org/issues/6359
-  Fix reboot prompt when changing RAM disk setting and encountering an
   input error. `#6349 <https://redmine.pfsense.org/issues/6349>`__
-  Fix highlighted tab when editing IPsec mobile P1.
   `#6341 <https://redmine.pfsense.org/issues/6341>`__
-  Fix selection of configured speed and duplex on interface page.
   `#6331 <https://redmine.pfsense.org/issues/6331>`__
-  Fix division by zero in status_queues.php.
   `#6329 <https://redmine.pfsense.org/issues/6329>`__
-  Fix alignment issues in forms.
   `#6327 <https://redmine.pfsense.org/issues/6327>`__
-  Fix entry of CIDR range in host aliases for conversion to IPs.
   `#6322 <https://redmine.pfsense.org/issues/6322>`__
-  Allow use of # and ! again in DNS Forwarder domain overrides.
   `#6310 <https://redmine.pfsense.org/issues/6310>`__
-  Restored hostname infobox in menu bar.
   `#6306 <https://redmine.pfsense.org/issues/6306>`__
-  Fixed editing and deleting of additional DHCP pools.
   `#6303 <https://redmine.pfsense.org/issues/6303>`__
-  Fixed requests to diag_system_activity.php piling up on slow
   systems. `#6166 <https://redmine.pfsense.org/issues/6166>`__

Interfaces
----------

-  Unset LAN DHCPv6/RA configuration if LAN interface is removed.
   `#6152 <https://redmine.pfsense.org/issues/6152>`__

IPsec
-----

-  Fix starting of strongswan twice.
   `#6160 <https://redmine.pfsense.org/issues/6160>`__

DNS Resolver
------------

-  Switched domain overrides from stub-zone to forward-zone so domain
   overrides don't require the target server provide recursion.
   `#6065 <https://redmine.pfsense.org/issues/6065>`__
-  Allow adding 0.0.0.0/0 to access lists.
   `#6073 <https://redmine.pfsense.org/issues/6073>`__
-  Added 100,000 and 200,000 options for Unbound cache limit.
   `#6230 <https://redmine.pfsense.org/issues/6230>`__
-  Fix Unbound startup where both DNS Forwarder and Resolver are
   enabled. `#6354 <https://redmine.pfsense.org/issues/6354>`__

DHCP Server
-----------

-  Hostnames now allowed for NTP servers.
   `#6239 <https://redmine.pfsense.org/issues/6239>`__

IPsec
-----

-  Fixed LAN interfaces stopping functioning when IPsec is in use.
   `#6296 <https://redmine.pfsense.org/issues/6296>`__
-  Mobile PSK matching issue with multiple PSKs fixed.
   `#6286 <https://redmine.pfsense.org/issues/6286>`__
-  leftsendcert=always specified for all RSA types.
   `#6082 <https://redmine.pfsense.org/issues/6082>`__
-  rc.newipsecdns fixed to check correct enabled status.
   `#6351 <https://redmine.pfsense.org/issues/6351>`__

Notifications
-------------

-  Fixed growl notifications to unresolvable hostname generating crash
   report. `#6187 <https://redmine.pfsense.org/issues/6187>`__
-  Fixed growl notification test with no password.
   `#6221 <https://redmine.pfsense.org/issues/6221>`__

Captive Portal
--------------

-  Fixed error handling captive portal username with single quote.
   `#6203 <https://redmine.pfsense.org/issues/6203>`__
-  Fixed issues with mixed-case zone names.
   `#6278 <https://redmine.pfsense.org/issues/6278>`__

OpenVPN
-------

-  Prevent leading space in tunnel network configuration causing invalid
   configuration. `#6198 <https://redmine.pfsense.org/issues/6198>`__

User Manager
------------

-  Fix RADIUS login with attribute class (25) when the server returns
   multiple attribute entries with different data.
   `#6086 <https://redmine.pfsense.org/issues/6086>`__
-  Honor deny config write for RADIUS users.
   `#6088 <https://redmine.pfsense.org/issues/6088>`__

Package System
--------------

-  Uninstall all packages pre-upgrade from <= 2.2.x to 2.3 to avoid
   problems from old packages. Reinstall them post-upgrade.
   `#6137 <https://redmine.pfsense.org/issues/6137>`__
-  Fix reinstall of renamed packages post-upgrade to 2.3.
   `#6118 <https://redmine.pfsense.org/issues/6118>`__
-  Fix package reinstallation getting stuck in loop when there is no
   Internet connectivity post-upgrade.
   `#6180 <https://redmine.pfsense.org/issues/6180>`__

Other
-----

-  Removed lua support from nginx to not deprecate old CPUs lacking CMOV
   support. `#6185 <https://redmine.pfsense.org/issues/6185>`__
-  Added validation to console menu interface assignment to prevent
   creating duplicate VLANs.
   `#6183 <https://redmine.pfsense.org/issues/6183>`__
-  Blacklisted S.M.A.R.T. options with Hyper-V to prevent crash.
   `#6147 <https://redmine.pfsense.org/issues/6147>`__
-  Silence SSH host key log spam.
   `#6143 <https://redmine.pfsense.org/issues/6143>`__
-  Fix order of gateway and gateway group name in gateway down log
   message. `#6134 <https://redmine.pfsense.org/issues/6134>`__
-  Allow use of @ in hostname field for Namecheap DDNS.
   `#6122 <https://redmine.pfsense.org/issues/6122>`__
-  Fix console error where $nat_if_list isn't an array.
   `#6307 <https://redmine.pfsense.org/issues/6307>`__
-  Include patch number in version display.
   `#6309 <https://redmine.pfsense.org/issues/6309>`__
-  Fix pw groupdel error in log during boot.
   `#6352 <https://redmine.pfsense.org/issues/6352>`__
-  Fixed stale xmlrpc.lock preventing config sync from functioning.
   `#6328 <https://redmine.pfsense.org/issues/6328>`__
-  Fixed failed chown on startup with /var as a RAM disk.
   `#6131 <https://redmine.pfsense.org/issues/6131>`__
-  Crash reporter now ignores warnings in release versions.
   `#6178 <https://redmine.pfsense.org/issues/6178>`__
-  Fixed crash reporter to show full PHP warnings in development
   versions. `#6097 <https://redmine.pfsense.org/issues/6097>`__

Update 1
--------

2.3.1 update 1 (2.3.1_1) was released on May 25, 2016 with the
following fixes/changes since 2.3.1-RELEASE.

-  Security issue `pfSense-SA-16_05.webgui
   patched <https://www.pfsense.org/security/advisories/pfSense-SA-16_05.webgui.asc>`__.
-  Lowered default LDAP timeout from 25 seconds to 5 seconds.
   `#6367 <https://redmine.pfsense.org/issues/6367>`__
-  Fixed handling of IPsec negotiation mode with IKE version set to
   auto. `#6360 <https://redmine.pfsense.org/issues/6360>`__
-  Increase PHP's memory limit to 512 MB on 64 bit versions to better
   accommodate systems with a large number of active states.
   `#6364 <https://redmine.pfsense.org/issues/6364>`__
-  Set request_terminate_timeout the same as max_execution_time to
   prevent many possible circumstances of "504 gateway error" from
   occurring. `#6396 <https://redmine.pfsense.org/issues/6396>`__
-  Fix use of URL IP type aliases in firewall rules.
   `#6403 <https://redmine.pfsense.org/issues/6403>`__
-  Fix show/hide fields Javascript in Chrome on Mac OS X.
   `#6401 <https://redmine.pfsense.org/issues/6401>`__
-  Fixed save of "IPv6 over IPv4 Tunneling" address on System>Advanced,
   Networking. `#6381 <https://redmine.pfsense.org/issues/6381>`__

Update 2 through 4
------------------

These were internal-only versions that weren't publicly-released.

Update 5
--------

2.3.1 update 5 (2.3.1_5) was released on June 16, 2016 with the
following fixes/changes since 2.3.1_1.

-  Fixed command injection vulnerability in auth.inc via User Manager.
   `#6475 <https://redmine.pfsense.org/issues/6475>`__
-  Fixed command injection vulnerability in pkg_mgr_install.php id
   parameter. `#6474 <https://redmine.pfsense.org/issues/6474>`__
-  Upgraded PHP to 5.6.22
-  Fixed Captive Portal redirect hangs caused by longer
   keepalive_timeout in nginx.
   `#6421 <https://redmine.pfsense.org/issues/6421>`__
-  Fixed DDNS PTR zone in dhcpd.conf with third octet of 0.
   `#6413 <https://redmine.pfsense.org/issues/6413>`__
-  Fixed save and reset buttons on load balancer status page.
   `#6254 <https://redmine.pfsense.org/issues/6254>`__
-  Fixed schedule editing on firewall rules page.
   `#6428 <https://redmine.pfsense.org/issues/6428>`__
-  Allow "-" character in TFTP server field on DHCP Server page.
   `#6433 <https://redmine.pfsense.org/issues/6433>`__
-  Allow "-" and "_" characters in system tunables.
   `#6438 <https://redmine.pfsense.org/issues/6438>`__
-  Fixed changing of link type on PPPs edit screen.
   `#6439 <https://redmine.pfsense.org/issues/6439>`__
-  Fixed setting of "RADIUS issued IPs" on L2TP page.
   `#6440 <https://redmine.pfsense.org/issues/6440>`__
-  Restored apply changes button for interface mismatch post-config
   restore. `#6460 <https://redmine.pfsense.org/issues/6460>`__
-  Fixed display of Outbound NAT port aliases.
   `#6463 <https://redmine.pfsense.org/issues/6463>`__
-  Fixed schedule edit allowing invalid time range.
   `#6468 <https://redmine.pfsense.org/issues/6468>`__

