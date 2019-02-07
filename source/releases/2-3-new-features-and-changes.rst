2.3 New Features and Changes
============================

Security/Errata
---------------

-  FreeBSD Security Advisories:

   -  `FreeBSD-SA-16:01.sctp <https://www.freebsd.org/security/advisories/FreeBSD-SA-16%3A01.sctp.asc>`__
   -  `FreeBSD-SA-16:02.ntp <https://www.freebsd.org/security/advisories/FreeBSD-SA-16%3A02.ntp.asc>`__
   -  `FreeBSD-SA-16:05.tcp <https://www.freebsd.org/security/advisories/FreeBSD-SA-16%3A05.tcp.asc>`__
   -  `FreeBSD-SA-16:07.openssh <https://www.freebsd.org/security/advisories/FreeBSD-SA-16%3A07.openssh.asc>`__
   -  `FreeBSD-SA-16:09.ntp <https://www.freebsd.org/security/advisories/FreeBSD-SA-16%3A09.ntp.asc>`__
   -  `FreeBSD-SA-16:11.openssl <https://www.freebsd.org/security/advisories/FreeBSD-SA-16%3A11.openssl.asc>`__
   -  `FreeBSD-SA-16:12.openssl <https://www.freebsd.org/security/advisories/FreeBSD-SA-16%3A12.openssl.asc>`__
   -  `FreeBSD-SA-16:15.sysarch <https://www.freebsd.org/security/advisories/FreeBSD-SA-16%3A15.sysarch.asc>`__

-  pfSense Security Advisories:

   -  `pfSense-SA-16_01.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-16_01.webgui.asc>`__
   -  `pfSense-SA-16_02.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-16_02.webgui.asc>`__

Several obsolete items were removed from this release. The items are
noted again in the sections below, but worth emphasizing:

-  The PPTP **VPN Server** has been completely removed. The protocol has
   been broken for over three years.

   -  The PPTP WAN client remains for use with ISPs still using PPTP.

-  Layer 7 classification support has been removed from the traffic
   shaper.

   -  It was rarely used, had been broken for all of 2.2.x, had absurdly
      high CPU usage, and snort filters better/faster

-  WEP support has been removed from Wireless interfaces.
   `#5123 <https://redmine.pfsense.org/issues/5123>`__

   -  No reason to still be using this in this day and age. If it is
      still needed, use external AP.

-  Single DES support has been removed from IPsec (3DES remains).

   -  It should not be used, it is not secure.

-  1GB NanoBSD images have been removed, as they were not large enough
   to proper accommodate the system and upgrade data. The supported
   sizes for NanoBSD images are now 2GB and 4GB.
-  The default system password hash has been changed to bcrypt. Current
   passwords will continue to work. Existing users need to reset their
   password to convert to the new hash. More info below under
   "Authentication". `#4120 <https://redmine.pfsense.org/issues/4120>`__
-  The LiveCD platform has been removed. The ISO is a bootable
   installer, as always, but it cannot run a live system.

   -  The installer ISO image is now named "pfSense--RELEASE-.iso", with
      the .iso extension signifying the type of image it is (optical
      media installer).
   -  For the very few people who were still using LiveCD, if the
      hardware can boot from USB, install to a USB thumb drive and run
      from it instead. If the options to keep /var and /tmp in RAM are
      active, and no packages are installed, the net result should be
      similar but ultimately more functional.

Dashboard/Widgets/GUI
---------------------

-  Converted GUI to the `Bootstrap framework`_, completely new look
-  Changed the GUI and Captive Portal web server to nginx; removed
   lighttpd. `#5719 <https://redmine.pfsense.org/issues/5719>`__
-  Cleaned up a lot of GUI code, option text, etc
-  TLS v1.0 disabled for the GUI.
   `#5984 <https://redmine.pfsense.org/issues/5984>`__
-  Removed old style themes, introduced new CSS-based themes
-  Refactored JavaScript and CSS, moved included items to more
   convenient locations
-  Added more AJAX updating in widgets and other places
-  Changed to more intuitive and modern icons and action buttons rather
   than the old confusing icon set (now using font-awesome icons)
-  Changed log display to be more consistent (single page for most logs,
   common filtering options)
-  Removed obsolete fifolog support. It was never used or fully
   implemented, and had no GUI option.
-  Improved notices in the GUI
-  Made breadcrumbs and page title handling more consistent
-  Added an option to have the top menu follows the user when scrolling
-  Renamed several GUI file names to match menu structure.
   `#5628 <https://redmine.pfsense.org/issues/5628>`__
-  Fixed AES-NI hardware display in the system information widget.
   `#4911 <https://redmine.pfsense.org/issues/4911>`__
-  Added widescreen support to the Dashboard.
   `#5195 <https://redmine.pfsense.org/issues/5195>`__
-  Improved password field handling security. Stored passwords are not
   presented back to the user in HTML. A masked value is returned
   instead. All password fields have also been changed to require
   confirmation.
-  Many pages have been reworked for improved internationalization
-  Changed info box functions, removed print_info_box_np, now
   print_info_box and print_apply_box are used to print appropriate
   boxes without problematic automatic detection
-  Moved RRD graphs to **Status > Monitoring**
   `#5498 <https://redmine.pfsense.org/issues/5498>`__
-  Changed RRD GUI interface to D3 rather than using the RRD graph
   command, so that a newer rrdtool base could be used with minimal
   added dependencies.
   `#5498 <https://redmine.pfsense.org/issues/5498>`__
-  Monitor IP added to gateways widget.
   `#4782 <https://redmine.pfsense.org/issues/4782>`__
-  Increased max_input_vars from 1000 to 5000 to accommodate larger
   aliases. `#4780 <https://redmine.pfsense.org/issues/4780>`__
-  Fixed NTP RRD graphs to accommodate negative values.
   `#4423 <https://redmine.pfsense.org/issues/4423>`__

OS/Backend
----------

-  Moved to a FreeBSD 10.3-RELEASE base
-  Added tryforward() support to get (nearly all of) the performance of
   fastforward with IPsec enabled
-  Overhauled the build system

   -  Eliminated the -tools repository
   -  Removed Patches, changes are now applied a vendor branch of
      FreeBSD
   -  Rewrote/changed the build scripts significantly
   -  Moved the new build scripts to the main pfSense repository

-  PHP Upgraded to 5.6
-  Replaced pecl-APC with opcache.
   `#4744 <https://redmine.pfsense.org/issues/4744>`__
-  Added support for -c parameters to /etc/rc.initial.
   `#4422 <https://redmine.pfsense.org/issues/4422>`__
-  Added optional package for kernel debug symbols.
   `#5330 <https://redmine.pfsense.org/issues/5330>`__
-  Rewrote system_set_harddisk_standby() for the current CAM-based
   ATA stack. `#4569 <https://redmine.pfsense.org/issues/4569>`__
-  Fixed a Panic/Crash with "sbflush_internal: cc 4294967166 \|\| mb 0
   \|\| mbcnt 0". `#4689 <https://redmine.pfsense.org/issues/4689>`__
-  Fixed a kernel panic with AES-NI.
   `#4702 <https://redmine.pfsense.org/issues/4702>`__
-  Updated AES-GCM/AES-NI bits from FreeBSD -HEAD.
   `#4841 <https://redmine.pfsense.org/issues/4841>`__
-  Removed zoneinfo.tgz file for Time Zones, move to the same format as
   FreeBSD. `#4726 <https://redmine.pfsense.org/issues/4726>`__
-  Fixed tcpdump with zerocopy enabled (net.bpf.zerocopy_enable=1).
   `#5257 <https://redmine.pfsense.org/issues/5257>`__
-  Added ability to disable PV disks and NICs on Xen.
   `#5452 <https://redmine.pfsense.org/issues/5452>`__
-  Removed the built-in but unused MySQL PHP modules and added them to
   the pkg server instead. They may be added as package dependencies or
   manually installed as needed.
-  Followed FreeBSD (r294560) in ceasing generation of rsa1 and dsa ssh
   server host keys by default
-  Removed support for nanobsd images < 2GB
   `#5836 <https://redmine.pfsense.org/issues/5836>`__
-  Overhauled IP address handling code in various parts of the system
-  scponly package is included by default.
   `#5190 <https://redmine.pfsense.org/issues/5190>`__
-  Shortened F1 boot prompt delay on nanobsd.
   `#3426 <https://redmine.pfsense.org/issues/3426>`__

Packages
--------

-  The list of available packages in pfSense 2.3 has been significantly
   trimmed. We have removed packages that have been deprecated upstream,
   no longer have an active maintainer, or were never stable. A few have
   yet to be converted for Bootstrap and may return if converted. See
   the :doc:`2.3 Removed Packages </packages/2-3-removed-packages>` list for details.
-  Removed use of PBI-based packages, moved to pkg(ng)
-  Fixed installation and handling of packages to use pkg, now works
   identically in the GUI and shell/console
-  Changed packages to use the FreeBSD ports format/layout to work with
   pkg
-  XMLRPC calls for package information and installation have been
   removed, replaced with native pkg functions.
   `#4575 <https://redmine.pfsense.org/issues/4575>`__
-  Added support for packages to be (re)built automatically by Poudriere
-  Added search capability to Available Packages list to filter packages
   by keywords. `#5324 <https://redmine.pfsense.org/issues/5324>`__
-  Fixed the version comparison code in the Package manager.
   `#4924 <https://redmine.pfsense.org/issues/4924>`__
-  Added support for tags in listtopic fields for use by packages
-  Factory reset now completely uninstalls packages.
   `#5829 <https://redmine.pfsense.org/issues/5829>`__
-  Improved handling of package install post-upgrade.
   `#3597 <https://redmine.pfsense.org/issues/3597>`__

System Updates
--------------

-  Major changes to update management
-  Removed "full update" or "full slice" upgrade for systems on 2.3 to
   later versions

   -  These files will remain available for use by older versions
      updating to 2.3.

-  The "Full Backup" feature has been deprecated.
-  Changed system updates to be handled via pkg
-  Changed Base, kernel, and standard pre-installed binares to packages
-  Removed "Firmware" nomenclature, now only referred to as "Update"
-  Fixed updating of base to work the same from the console or the GUI
-  Added preliminary support for restarting system services without
   rebooting in cases when the base is updated but the kernel is the
   same.

Gateways/Routing
----------------

-  Replaced apinger with dpinger(!).
   `#5624 <https://redmine.pfsense.org/issues/5624>`__

   -  This fixes many gateway monitoring related issues, including
      incorrect latency and loss in various edge cases.
   -  Eliminates status file race conditions that caused update failures
      on services bound to gateway groups in some edge cases.
      `#5180 <https://redmine.pfsense.org/issues/5180>`__ and
      `#3818 <https://redmine.pfsense.org/issues/3818>`__ among others.
   -  Fixed gateway monitoring startup at boot time with assigned
      OpenVPN interfaces.
      `#4587 <https://redmine.pfsense.org/issues/4587>`__
   -  Check gateway monitor settings after upgrade, dpinger has
      different options than apinger.

-  Added code to allow gateways outside of an interface subnet.
   `#972 <https://redmine.pfsense.org/issues/972>`__
-  Corrected "State Killing on Gateway Failure" description.
   `#4709 <https://redmine.pfsense.org/issues/4709>`__
-  Fixed disabling of a static route set to use a disabled gateway.
   `#4813 <https://redmine.pfsense.org/issues/4813>`__
-  Added standard deviation to gateway status and widget
-  Fixed dynamic gateway logic to prevent GIF/GRE from making
   dummy/unusable gateways that show up for monitoring/routing/etc
   `#5766 <https://redmine.pfsense.org/issues/5766>`__
-  Changed static routes handling for DNS servers so they are removed
   when a gateway is disabled
   `#4921 <https://redmine.pfsense.org/issues/4921>`__
-  Increased gateway weight limit from 5 to 30.
   `#5843 <https://redmine.pfsense.org/issues/5843>`__
-  Fixed issues with PPP type WANs and the Default Gateway Switching
   option. `#1837 <https://redmine.pfsense.org/issues/1837>`__
-  Fixed dynamic gateway handling for OpenVPN tap clients.
   `#5981 <https://redmine.pfsense.org/issues/5981>`__
-  Fixed display of full interface name in Diagnostics>Routes.
   `#5484 <https://redmine.pfsense.org/issues/5484>`__

Rules/NAT/pf
------------

-  Added drag-and-drop rule reordering for firewall and NAT rules.
-  Fixed a situation where pf drops IPv6 packets with fragment header
   followed by a last fragment only.
   `#2762 <https://redmine.pfsense.org/issues/2762>`__
-  Fixed "LAN network" in v6 rules not working when a link-local address
   is assigned to LAN.
   `#3656 <https://redmine.pfsense.org/issues/3656>`__
-  Added reordering for 1:1 NAT rules.
   `#3888 <https://redmine.pfsense.org/issues/3888>`__
-  Improved handling of firewall rule tracker IDs for port forward
   associated rules
-  Added support for a separator bar in firewall and NAT rules for use
   as a visual reference.
   `#5373 <https://redmine.pfsense.org/issues/5373>`__
-  Standardized the NPt options in the GUI so their options and
   appearance are more similar to 1:1 NAT
-  Added a "no binat" checkbox to 1:1 NAT screen for exclusions.
   `#3887 <https://redmine.pfsense.org/issues/3887>`__
-  Limited pfsync syncpeer to IPv4 since it does not support IPv6
   `#4648 <https://redmine.pfsense.org/issues/4648>`__
-  Changed the default CARP pass rules to use "no state" to avoid issues
   with broken L2 gear that duplicates packets
   `#5800 <https://redmine.pfsense.org/issues/5800>`__
-  Added sorting to Alias lists
   `#4195 <https://redmine.pfsense.org/issues/4195>`__
-  Added a hit counter to the firewall rule display with states and
   bandwidth consumed by packets matching rules.
-  Fixed issues with the DNS Forwarder and DNS Resolver being enabled
   concurrently (on different ports) in an HA environment
   `#5882 <https://redmine.pfsense.org/issues/5882>`__
-  Added a visual indication in the rule list for floating rules with
   the "quick" property set
   `#5860 <https://redmine.pfsense.org/issues/5860>`__
-  Improved state display on **Diagnostics > States**, now shows packets
   and bytes for each state
-  Fixed aliases containing both FQDNs and IPv6 subnets.
   `#5872 <https://redmine.pfsense.org/issues/5872>`__
-  Fixed removal of downloaded URL table alias contents when alias is
   deleted. `#5856 <https://redmine.pfsense.org/issues/5856>`__
-  Significantly improved validation of downloaded data for URL Table
   aliases. `#5848 <https://redmine.pfsense.org/issues/5848>`__
-  Fixed possibilities for creating an invalid ruleset with missing URL
   Table Ports aliases.
   `#5845 <https://redmine.pfsense.org/issues/5845>`__
-  Fixed filterdns issues with significant system clock time jumps.
   `#4166 <https://redmine.pfsense.org/issues/4166>`__
-  Added firewall rules hit counter.
   `#3504 <https://redmine.pfsense.org/issues/3504>`__

Interfaces/VIPs
---------------

-  Fixed pfSense_getall_interface_addresses truncating IPv6 link
   local IP addresses.
   `#4062 <https://redmine.pfsense.org/issues/4062>`__
-  Add GUI setting for VLANs PCP.
   `#4133 <https://redmine.pfsense.org/issues/4133>`__
-  Fixed GRE interfaces failing to have a RUNNING state after reboot.
   `#4191 <https://redmine.pfsense.org/issues/4191>`__
-  Fixed setting non-default MTUs in some edge cases.
   `#4397 <https://redmine.pfsense.org/issues/4397>`__
-  Added input validation on bridges to prevent adding the same
   interface to multiple bridges.
   `#4595 <https://redmine.pfsense.org/issues/4595>`__
-  Fixed CARP not working under bhyve.
   `#4623 <https://redmine.pfsense.org/issues/4623>`__
-  Improved input validation for 6RD, GRE and gif interfaces, helping
   prevent invalid configurations.
-  Changed input validation to allow /31 to be used for CARP VIPs since
   that is now supported and works in FreeBSD.
   `#5533 <https://redmine.pfsense.org/issues/5533>`__
-  Added debug logging option for DHCP6 client.
   `#4534 <https://redmine.pfsense.org/issues/4534>`__
-  Fixed cases where DHCP6 client (dhcp6c) was being launched multiple
   times in some circumstances.
   `#5621 <https://redmine.pfsense.org/issues/5621>`__
-  Upgraded dhcp6c. `#5734 <https://redmine.pfsense.org/issues/5734>`__
-  Upgraded DHCP client to ISC dhcpd 4.3.3P1.
-  Fixed applying of non-default MTU on gif interfaces post-boot with
   dynamic IP WANs. `#5842 <https://redmine.pfsense.org/issues/5842>`__
-  Added support for PPPoE with MTU/MRU > 1492, RFC 4638.
   `#4542 <https://redmine.pfsense.org/issues/4542>`__
-  Fixed issues with link cycling on some Intel 10G ix NICs
   `#5913 <https://redmine.pfsense.org/issues/5913>`__
-  Corrected ALTQ test to show that ix/ixgbe NICs are capable of traffic
   shaping. `#5923 <https://redmine.pfsense.org/issues/5923>`__
-  Improved handling of default interface assignment for some hardware.
   `#4535 <https://redmine.pfsense.org/issues/4535>`__
-  Corrected input validation for invalid IPv6 IPs with leading or
   trailing colon. `#6024 <https://redmine.pfsense.org/issues/6024>`__
-  Fixed orphaning of VLANs on lagg interfaces after editing the lagg.
   `#6014 <https://redmine.pfsense.org/issues/6014>`__
-  Fixed loss of some dhcpleases and dhcpleases6 logs.
   `#5968 <https://redmine.pfsense.org/issues/5968>`__
-  Fixed adding of routes immediately post-reboot for delegated IPv6
   prefixes to sub-routers.
   `#5957 <https://redmine.pfsense.org/issues/5957>`__
-  Fixes to DHCPv6 leases status page and prefixes.php.
   `#5944 <https://redmine.pfsense.org/issues/5944>`__
   `#4206 <https://redmine.pfsense.org/issues/4206>`__
-  Fixed loss of IPv6 IP on track6 interfaces when saving and applying
   changes on that interface.
   `#5945 <https://redmine.pfsense.org/issues/5945>`__
-  Fixed incorrect interface mismatch prompt post-config restore when
   using VLANs on lagg.
   `#5892 <https://redmine.pfsense.org/issues/5892>`__
-  Added support for multiple span interfaces on bridges.
   `#5871 <https://redmine.pfsense.org/issues/5871>`__
-  Prevent naming conflicts between interfaces and interface groups.
   `#5795 <https://redmine.pfsense.org/issues/5795>`__
-  Prevent naming conflicts between interfaces and aliases.
   `#5778 <https://redmine.pfsense.org/issues/5778>`__
-  Fixed use of IP aliases with GRE tunnels.
   `#4450 <https://redmine.pfsense.org/issues/4450>`__
-  Fixed application of bridge advanced options after interface added to
   bridge. `#4312 <https://redmine.pfsense.org/issues/4312>`__
-  Set MTU back to default after clearing the field.
   `#3926 <https://redmine.pfsense.org/issues/3926>`__
-  Fixed IPv6 IP aliases on CARP IPs.
   `#3716 <https://redmine.pfsense.org/issues/3716>`__
-  Fixed IP alias on CARP IPs where IP alias above CARP parent in list.
   `#3257 <https://redmine.pfsense.org/issues/3257>`__
-  Fixed modifying unassigned VLAN interfaces changing assigned VLAN.
   `#3209 <https://redmine.pfsense.org/issues/3209>`__

Authentication
--------------

-  Fixed the WebGUI becoming slow or unusable when an LDAP server used
   for GUI auth is unreachable.
   `#3383 <https://redmine.pfsense.org/issues/3383>`__
-  Fixed a problem with using 'local' as the name of an authentication
   server 'Descriptive Name'.
   `#4469 <https://redmine.pfsense.org/issues/4469>`__
-  Fixed default Auth Server selection on
   system_usermanager_settings.php.
   `#5440 <https://redmine.pfsense.org/issues/5440>`__
-  Added support for bcrypt as a passwd hash and enabled it as the
   system default `#4120 <https://redmine.pfsense.org/issues/4120>`__
-  Replaced the default passwd hash for root/admin using bcrypt
   (blowfish).

   -  Existing user passwords will continue to work in their existing
      format until the user's password is changed.
   -  User passwords cannot be automatically converted as they are not
      stored plain text. To convert the password hash of an existing
      user to bcrypt, edit the user and change their password.

-  Added the ability to filter privileges when adding them to a user or
   group, to make finding them easier.
-  Fixed updating of group file for renamed groups.
   `#6013 <https://redmine.pfsense.org/issues/6013>`__
-  Fixed handling of groups with spaces in their names. Local group
   names can no longer contain spaces. New group scope option "Remote"
   added for LDAP and RADIUS use where spaces in group names are valid.
   `#6012 <https://redmine.pfsense.org/issues/6012>`__
-  Added support for RFC2307 style LDAP groups.
   `#4923 <https://redmine.pfsense.org/issues/4923>`__

Services
--------

-  Fixed handling of the SNMP Bind Interface.
   `#3883 <https://redmine.pfsense.org/issues/3883>`__
-  Fixed ntpd crashes on 32 bit with dynamic WAN reconnections and
   OpenVPN client configured.
   `#4155 <https://redmine.pfsense.org/issues/4155>`__
-  Fixed a kernel panic with APU and SNMP with mibII.
   `#4403 <https://redmine.pfsense.org/issues/4403>`__
-  Updated igmpproxy to the latest version.
   `#4672 <https://redmine.pfsense.org/issues/4672>`__

   -  The old version had some custom patches, so be wary of behavior
      changes

-  Added encoding for DHCP/DHCPv6 server additional BOOTP text options
   to preserve data when stored in XML
   `#5623 <https://redmine.pfsense.org/issues/5623>`__
-  Fixed duplication action for Load Balancer Monitor entries
   `#4441 <https://redmine.pfsense.org/issues/4441>`__
-  Upgraded DHCP Server and Relay to ISC dhcpd 4.3.3P1
-  Added statistics gathering for DHCP Server leases.
   `#5387 <https://redmine.pfsense.org/issues/5387>`__
-  Fixed DDNS key issues with DHCP and DHCPv6 Server enabled on multiple
   interfaces. `#5603 <https://redmine.pfsense.org/issues/5603>`__
-  Added custom ACLs for NTP (restrictions by network)
   `#4463 <https://redmine.pfsense.org/issues/4463>`__
-  Prevent starting of radvd in circumstances where it shouldn't.
   `#5812 <https://redmine.pfsense.org/issues/5812>`__
-  Added description column to DHCP leases status screen.
   `#5729 <https://redmine.pfsense.org/issues/5729>`__
-  inetd replaced with xinetd (used for proxy mode NAT reflection and
   TFTP proxy). `#5707 <https://redmine.pfsense.org/issues/5707>`__
-  DHCP lease counters added to Status>DHCP Leases.
   `#5186 <https://redmine.pfsense.org/issues/5186>`__
-  Allow configuration of RAs when DHCPv6 Relay is enabled.
   `#6063 <https://redmine.pfsense.org/issues/6063>`__
-  Fixed DHCPv6 Server's DDNS.
   `#4675 <https://redmine.pfsense.org/issues/4675>`__
-  DHCP Server menu item now defaults to the first interface with an
   enabled DHCP Server instance.
   `#4647 <https://redmine.pfsense.org/issues/4647>`__
-  Allow configuring DHCPv6 and RAs on track6 interfaces.
   `#3029 <https://redmine.pfsense.org/issues/3029>`__
-  Fixed RADIUS NAS IP in PPPoE server.
   `#185 <https://redmine.pfsense.org/issues/185>`__
-  Deprecated ntpdate_sync_once.sh, replacing with ntpd -g.
   `#6053 <https://redmine.pfsense.org/issues/6053>`__

DNS
---

-  Fixed Unbound IPv6 link local handling.
   `#4021 <https://redmine.pfsense.org/issues/4021>`__
-  Added validation for advanced configuration directives in Unbound.
   `#4411 <https://redmine.pfsense.org/issues/4411>`__
-  Upgraded dnsmasq to 2.76.0test8 to fix crashes in 2.75.
   `#5341 <https://redmine.pfsense.org/issues/5341>`__
-  Fixed Unbound binding to IP alias virtual IPs.
   `#5464 <https://redmine.pfsense.org/issues/5464>`__
-  Changed Namecheap dynamic DNS to use separate hostname and domain
   name fields `#4366 <https://redmine.pfsense.org/issues/4366>`__
-  Added Multi-WAN support to RFC 2136 Dynamic DNS.
-  Added RFC 2136 support to the Dynamic DNS widget
-  Added input validation to prevent the same DNS server from being
   added multiple times on **System > General**
   `#5915 <https://redmine.pfsense.org/issues/5915>`__
-  Fixed CloudFlare dynamic DNS to not configure 'proxiable' and
   'proxied' parameters.
   `#6005 <https://redmine.pfsense.org/issues/6005>`__
-  Fixed dnsmasq host overrides when both DNS Forwarder and Resolver are
   enabled. `#5883 <https://redmine.pfsense.org/issues/5883>`__
-  Added RFC 2136 dynamic DNS to dashboard widget.
   `#5862 <https://redmine.pfsense.org/issues/5862>`__
-  Added multi-WAN support to RFC 2136 dynamic DNS client.
   `#5862 <https://redmine.pfsense.org/issues/5862>`__
-  Don't specify 127.0.0.0/8 IPs as forward-addr in Unbound
   configuration. `#5750 <https://redmine.pfsense.org/issues/5750>`__
-  Added input validation to require configured DNS servers before
   enabling Resolver's forwarding mode.
   `#4747 <https://redmine.pfsense.org/issues/4747>`__
-  Added Google Domains DDNS support.
   `#4322 <https://redmine.pfsense.org/issues/4322>`__
-  Added DNS Made Easy DDNS support.
   `#1258 <https://redmine.pfsense.org/issues/1258>`__
-  Allow @ in Dynamic DNS hostnames.
   `#3900 <https://redmine.pfsense.org/issues/3900>`__
-  Improve IPv6 link local handling in DNS Resolver and Forwarder so it
   works across configuration restores and with HA config sync.
   `#3802 <https://redmine.pfsense.org/issues/3802>`__

IPsec
-----

-  Upgraded to strongSwan 5.4.0.
-  Fixed multiple possibilities for IPsec status hangs.
   `#5520 <https://redmine.pfsense.org/issues/5520>`__
-  Revised handling of IPsec reloading when strongswan.conf is changed.
   `#4353 <https://redmine.pfsense.org/issues/4353>`__
-  Fixed problems with the search domain in IPsec mobile clients.
   `#4418 <https://redmine.pfsense.org/issues/4418>`__
-  Added support for elliptic curve for IPsec on webconfigurator.
   `#4683 <https://redmine.pfsense.org/issues/4683>`__
-  Added input validation for authentication backend when using
   EAP-RADIUS with IKEv2 Mobile IPsec.
   `#5219 <https://redmine.pfsense.org/issues/5219>`__
-  Fixed unit display on IPsec status pages for time and data to be more
   human-friendly. `#5364 <https://redmine.pfsense.org/issues/5364>`__
-  Removed support for single DES from IPsec
   `#5543 <https://redmine.pfsense.org/issues/5543>`__ (3DES Remains)
-  Removed global IPsec disable flag as it is no longer necessary. On
   upgrade, if the IPsec enable box was unchecked, all Phase 1 entries
   are disabled individually instead.
-  Changed IPsec 'up' commands to start in the backgound so they are
   non-blocking `#5882 <https://redmine.pfsense.org/issues/5882>`__
-  Disabled the strongSwan unity plugin by default, and improved the
   method used to disable the plugin
   `#4178 <https://redmine.pfsense.org/issues/4178>`__
-  Removed unnecessary and troublesome 'pass out' rules for mobile IPsec
   `#5819 <https://redmine.pfsense.org/issues/5819>`__
-  Fixed "no valid leases object found" log spam with IPsec dashboard
   widget. `#5855 <https://redmine.pfsense.org/issues/5855>`__
-  Fixed automatically added WAN rules (UDP 500, 4500, ESP) when using
   IPsec with IP aliases.
   `#5500 <https://redmine.pfsense.org/issues/5500>`__
-  Fixed IKEv2 to Cisco ASA resulting in traffic selector mismatch when
   initiated by traffic.
   `#4719 <https://redmine.pfsense.org/issues/4719>`__
-  Added "split connections" option to phase 1 for IKEv2 for
   interoperability with third party devices that do not support
   multiple traffic selectors on one child SA (Cisco ASA, others).
   `#4704 <https://redmine.pfsense.org/issues/4704>`__
-  Added dynamic AJAX update to status_ipsec.php.
   `#6049 <https://redmine.pfsense.org/issues/6049>`__

OpenVPN
-------

-  Changed the default behavior of the OpenVPN server to use topology
   subnet, not net30.
   `#5526 <https://redmine.pfsense.org/issues/5526>`__
-  Changed Client-Specific Overrides so they can be set to apply to
   specific servers rather than being globally set.
   `#5526 <https://redmine.pfsense.org/issues/5526>`__
-  Fixed OpenVPN Server validation of self-signed certificates with a
   depth of 2. `#4329 <https://redmine.pfsense.org/issues/4329>`__
-  Fixed overwriting of custom ``/etc/dh-parameters.*`` on upgrade.
   `#4816 <https://redmine.pfsense.org/issues/4816>`__
-  Fixed invalid rules generated with some AVPair-defined ACLs.
   `#5451 <https://redmine.pfsense.org/issues/5451>`__
-  Improved display of server certificates on OpenVPN servers to help
   avoid users incorrectly picking user certificates for servers.
   `#5602 <https://redmine.pfsense.org/issues/5602>`__
-  Fixed OpenVPN client specification of auth-user-pass in shared key
   modes where it's not valid.
   `#5941 <https://redmine.pfsense.org/issues/5941>`__
-  Fixed problems with OpenVPN and some use of special characters in the
   username or password.
   `#4605 <https://redmine.pfsense.org/issues/4605>`__

MPD/PPP VPN/Services
--------------------

-  Removed PPTP Server.
   `#4226 <https://redmine.pfsense.org/issues/4226>`__
-  Add MS-CHAPv2 option to L2TP Configuration.
   `#4732 <https://redmine.pfsense.org/issues/4732>`__
-  Fixed editing of multiple PPPoE connections with dial on demand
   enabled changing the port assignment.
   `#4378 <https://redmine.pfsense.org/issues/4378>`__
-  Added a user login count option to the PPPoE server

UPnP/NAT-PMP
------------

-  Enabled port-in-use checking in miniupnpd.
   `#4320 <https://redmine.pfsense.org/issues/4320>`__
-  Enabled IPv6 for miniupnpd.
   `#4321 <https://redmine.pfsense.org/issues/4321>`__
-  Set secure_mode=yes in miniupnpd configuration
   `#5627 <https://redmine.pfsense.org/issues/5627>`__

Wireless
--------

-  Removed WEP. `#5123 <https://redmine.pfsense.org/issues/5123>`__
-  Improved default settings for Wireless interfaces

Captive Portal
--------------

-  Fixed Captive Portal to support more than 120 VLAN interfaces.
   `#4150 <https://redmine.pfsense.org/issues/4150>`__
-  Added an option in Captive Portal for FreeRADIUS-friendly stop/start
   RADIUS accounting updates that solves problems with user session time
   limits. `#2164 <https://redmine.pfsense.org/issues/2164>`__
-  Fixed selection of RADIUS NAS IP with VIPs when editing Captive
   Portal zone. `#5656 <https://redmine.pfsense.org/issues/5656>`__

Traffic Shaping
---------------

-  Fixed CODELQ scheduler defaults.
   `#4692 <https://redmine.pfsense.org/issues/4692>`__
-  Removed Layer 7 classification support from the traffic shaper
   `#5508 <https://redmine.pfsense.org/issues/5508>`__
-  Relaxed the shaper wizard interface validation when there are no
   interfaces with gateways selected
   `#4524 <https://redmine.pfsense.org/issues/4524>`__
-  Fixed traffic shaper failure with "bandwidth for q... higher than
   interface" in some edge cases.
   `#5721 <https://redmine.pfsense.org/issues/5721>`__

Misc
----

-  Allow wildcards in Certificate Subject Alternative Names.
   `#3733 <https://redmine.pfsense.org/issues/3733>`__
-  Removed the "Certificate Authority" option on the **Certificates**
   tab of the Cert Manager when creating a **Certificate**. To make a
   Certificate Authority, use the **CAs** tab instead.
   `#5924 <https://redmine.pfsense.org/issues/5924>`__
-  Adapted gitsync to new repo structure.
   `#4999 <https://redmine.pfsense.org/issues/4999>`__
-  Changed the packet capture output in the GUI so that when the
   protocol is set for CARP, tcpdump interprets it as CARP for more
   accurate output
-  Added pfsync protocol option to packet capture page.
   `#5866 <https://redmine.pfsense.org/issues/5866>`__
-  Added "GoTo line #" control to Diagnostics > Edit File
-  Corrected help in pfSsh.php to properly reflect how recording works
-  Fixed validation of playback file passed to pfSsh.php
   `#5657 <https://redmine.pfsense.org/issues/5657>`__
-  Fixed disabling of filter.log logging where local logging is
   disabled. `#6018 <https://redmine.pfsense.org/issues/6018>`__
-  Updated included software on licenses.php page.
   `#5903 <https://redmine.pfsense.org/issues/5903>`__
-  Internationalization improvements.
   `#5777 <https://redmine.pfsense.org/issues/5777>`__
-  Fixed use of IP aliases on Test Port page.
   `#5185 <https://redmine.pfsense.org/issues/5185>`__
-  Fixed key map, screen map and font selection in installer.
   `#4387 <https://redmine.pfsense.org/issues/4387>`__
-  Prevent deletion of certificates in use by packages.
   `#4142 <https://redmine.pfsense.org/issues/4142>`__

Update Patches
--------------

This section lists the changes contained in patch updates post-release.

2.3_1
~~~~~~

The 2.3_1 update upgrades NTP to fix `FreeBSD security advisory
SA-16:16.ntp <https://www.freebsd.org/security/advisories/FreeBSD-SA-16:16.ntp.asc>`__.
The only change is upgrading ntpd from 4.2.8p6 to 4.2.8p7.

.. _Bootstrap framework: https://www.netgate.com/blog/pfsense-webgui-update-2.html
