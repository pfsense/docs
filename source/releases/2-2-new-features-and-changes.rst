.. include:: /substitutions.rsti

2.2 New Features and Changes
============================

Special Notes
-------------

Due to CSS and JavaScript changes, forcing the browser to clear its
cache or reload the pages after an update is advised. This is especially
true if any cosmetic anomalies are observed, such as alignment problems
or spurious bits of text in widgets.

Security Fixes
--------------

-  Update to openssl 1.0.1k to address `FreeBSD
   SA-15:01 <https://www.freebsd.org/security/advisories/FreeBSD-SA-15:01.openssl.asc>`__
-  Multiple XSS vulnerabilities in web interface
   `pfSense-SA-15_01 <https://www.pfsense.org/security/advisories/pfSense-SA-15_01.webgui.asc>`__
-  OpenVPN update for
   `CVE-2014-8104 <http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-8104>`__
-  NTP update
   `FreeBSD-SA-14:31.ntp <https://www.freebsd.org/security/advisories/FreeBSD-SA-14:31.ntp.asc>`__
   though these circumstances `don't seem to impact
   pfSense <https://blog.pfsense.org/?p=1514>`__.

Default Configuration Changes
-----------------------------

-  **DNS Resolver (unbound) enabled for new installs**.
   `#3396 <https://redmine.pfsense.org/issues/3396>`__
-  **DNS Forwarder (dnsmasq) disabled for new installs**.
   `#3396 <https://redmine.pfsense.org/issues/3396>`__
-  **Change default NICs from vr to em** -- vr is on the way out and em
   is the most common NIC in use today.
-  Default config.xml has been cleaned up. Outdated comments have been
   removed that used to loosely document the config file, but had been
   neglected for quite some time and aren't all that useful anyway.
-  Default sysctls have moved out of config.xml and now reside in
   globals.inc to reduce the size of config.xml
-  Default sysctl values do not need to be set in config.xml. The
   default values are obtained from sysctl now. Also to reduce
   config.xml size.
-  Tracking IDs added to default rules

Security Enhancements
---------------------

-  Verify SSL certificates for HTTPS URLs
-  Detect if an unofficial package repository is in use and warn the
   user. Warning is displayed on the dashboard and package management
   pages. `#484 <https://redmine.pfsense.org/issues/484>`__
-  Check and verify the package server's SSL certificate if using HTTPS.
   `#484 <https://redmine.pfsense.org/issues/484>`__
-  For dyndns providers that support HTTPS, use it when performing
   updates.
-  Replaced lots of GET actions with POST actions in various places in
   the GUI as they were touched.
-  Update jquery to 1.11.1
-  Remove almost all calls to history.back() and make Cancel button back
   to HTTP_REFERER
-  Hide FreeBSD version from sshd banner.
   `#3840 <https://redmine.pfsense.org/issues/3840>`__
-  Disable SSLv3 in lighttpd
-  Disable RC4 ciphers in lighttpd
-  Teach the certificate generation code how to make a self-signed
   certificate, and change the GUI cert generation code to use it. Also,
   move the GUI cert generation code to its own function so we can add a
   GUI option to regenerate it later. Also use some more sane defaults
   for the contents of the default self-signed certificate's fields so
   it will be more unique and less likely to trigger problems in browser
   certificate storage handling.
-  Add command line script to generate and activate a new GUI
   certificate (generateguicert)
-  Catch some more sensitive information when sanitizing the contents of
   config.xml output on /status.php.

OS Changes
----------

-  Updated base OS to FreeBSD 10.1-RELEASE
-  PHP backend switched from FastCGI to PHP-FPM
-  PHP Moved to 5.5
-  Migrate captive portal code to SQLite3 PHP module
-  Fix some lingering call-time pass-by-reference instances that fail on
   PHP 5.5
-  Default serial speed is now 115200
   `#3715 <https://redmine.pfsense.org/issues/3715>`__
-  Sync gettytab and etc/ttys with FreeBSD 10-STABLE and reduce
   customizations
-  Log pfSense version to syslog after bootup
-  Set the sysctl net.inet.icmp.reply_from_interface to 1 to use the
   incoming interface to send ICMP replies.
   `#3666 <https://redmine.pfsense.org/issues/3666>`__
-  Switched the hash method in pf to XXHASH for speed improvements

DNS
---

-  Imported Unbound for use as the default DNS Resolver. The old dnsmasq
   DNS Forwarder is available as a non-default option. Upgraded systems
   will retain existing settings.
-  Various changes to Unbound and supporting programs to complete its
   integration.
-  Removal of bind from FreeBSD base necessitated the switch to
   alternate programs for DNS utilities (e.g. drill for dig, different
   nsupdate)
-  AJAX DNS updates for firewall logs (when clicked)
-  Make sure that the DNS Forwarder/Resolver is always capable of
   accepting queries on localhost before using it as a DNS server.
-  If localhost is configured to be included in resolv.conf, force its
   selection in Unbound. The resolv.conf logic prevents that from being
   a problem, but users don't seem to realize they have to pick that to
   use Unbound for the host itself.
-  IPv6 support in Unbound
-  Check port of dnsmasq/unbound and skip 127.0.0.1 in resolv.conf if
   not port 53. `#4022 <https://redmine.pfsense.org/issues/4022>`__
-  Add a note to the wizard about the DNS Resolver ignoring manual name
   servers by default. (They are still used as secondary/tertiary
   servers for the firewall itself, however)
-  Domain and search should not both be defined in resolv.conf per
   FreeBSD man page and handbook (only the latter is actually used).
   Only search is set now.

CARP
----

-  Changes to CARP for new FreeBSD 10 CARP system
-  Provide a way to 'permanently' set CARP to 'maintenance mode'
   (advskew 254) persisting through a reboot so the primary machines
   stays as backup/inactive unless the secondary no longer exists on the
   network. This can be desirable when there are problems (possibly with
   the hardware) and the primary machine needs to be booted and checked
   again before regaining master status.
-  Key off net.inet.carp.demotion and display a warning to the user if
   the system has self-demoted its CARP status.
-  Allow CARP IP address to be outside interface and alias subnets

Interfaces
----------

-  Implement an option to allow using the IPv4 connectivity interface
   for sending the dhcpv6 information. Usually useful for PPP[oE] type
   links and some ISPs
-  Add gre and gif checks for for IPv4 function
   interface_has_gateway($friendly), like they are already for IPv6
-  Do not allow the user to set IPs for GRE interfaces on interface edit
   page. `#3575 <https://redmine.pfsense.org/issues/3575>`__
-  On interfaces_assign.php, let user select network port to add
   instead of picking the first available
   `#3846 <https://redmine.pfsense.org/issues/3846>`__
-  When changing an existing VIP, use previous configured interface for
   checking, this fixes the issue that happens when trying to change a
   VIP to a new interface.
   `#3807 <https://redmine.pfsense.org/issues/3807>`__
-  Validate the GIF interface MTU (must be something between 1280 and
   8192) `#3927 <https://redmine.pfsense.org/issues/3927>`__
-  Properly set MTU for lagg(4) interface
   `#3922 <https://redmine.pfsense.org/issues/3922>`__
-  Fix formatting of the Interfaces Widget on the Dashboard.
   `#3937 <https://redmine.pfsense.org/issues/3937>`__
-  Don't allow interface descriptions that are strictly numbers as that
   generates an invalid ruleset.
   `#4005 <https://redmine.pfsense.org/issues/4005>`__
-  Disable delete_old_states in dhclient-script. rc.newwanip handles
   this correctly in 2.2, and this killed states in multiple
   circumstances where that isn't necessary nor desirable.
-  Do not unset configuration values from PPP config if not needed.
   `#3727 <https://redmine.pfsense.org/issues/3727>`__
-  Overhaul handling of flags for hardware offloading and make it work
   correctly for system_advanced page settings. Lagg is still a special
   case that may require a reboot initially to apply.
   `#1047 <https://redmine.pfsense.org/issues/1047>`__
-  Don't try to launch 3gstats unless it's on a valid device.
-  Updated list of mobile service providers

Gateways/Routing
----------------

-  Add an option to force a gateway to be down.
   `#2847 <https://redmine.pfsense.org/issues/2847>`__
-  List GWGs in Interface to send DynDNS update from
-  Allow reordering, batch delete, and disable of static routes
-  Option to disable a gateway added
-  Check gateway for IPv6 also for reply-to rules.
-  Fix issue where ICMP6 messages sometimes have the wrong source IP
   address when a monitor IP address has been set
   `#3607 <https://redmine.pfsense.org/issues/3607>`__
-  Improve look of gateways widget
-  Provide a toggle for apinger debug messages to be logged to syslog
-  Setting an interface IP to 0.0.0.0 with mask 0.0.0.0 overwrites the
   default route with that interface's link route. Follow FreeBSD 10.1
   and use a /8 mask instead.
   `#3941 <https://redmine.pfsense.org/issues/3941>`__
-  Use static route with -iface option for PPPoE to help when more than
   one PPPoE connection has the same gateway.
   `#4040 <https://redmine.pfsense.org/issues/4040>`__
-  net.inet6.ip6.rfc6204w3 needs to be 1 for dhcpv6 to work correctly.
   `#3361 <https://redmine.pfsense.org/issues/3361>`__
-  Add a route debug option to log info about route commands executed
   (where those aren't already logged) to help with troubleshooting
   various routing scenarios.
-  Make sure srcip and target have scope when link-local addresses are
   used in apinger. `#3969 <https://redmine.pfsense.org/issues/3969>`__
-  Properly generate and use the default gw for 6rd.

Firewall Rules
--------------

-  Custom logging daemon that provides easy-to-parse output on a single
   line
-  Persistent tracking ID for firewall rules so that logs may always be
   traced back to their corresponding rules
-  Removed settings for maximum tables and maximum table entries since
   pf on FreeBSD 10 does not have any limits for these.
-  Expose all p0f OS types that it supports so that subtypes of various
   Operating Systems can be detected (e.g. blocking Windows XP)
-  The "(self)" concept of "Any IP address on this firewall" is now a
   choice for firewall rule destination (and floating rule source for
   out direction rules), port forward destination, and outbound NAT
   source.
-  Can now optionally log default pass rules as well as default block
   rules
-  Add IP alias subnets to interface subnet macro on GUI.
   `#983 <https://redmine.pfsense.org/issues/983>`__
-  Adjust states summary for new pfctl -ss output.
   `#2121 <https://redmine.pfsense.org/issues/2121>`__
-  Add a more obvious note on group rules about how they do not work as
   expected for WANs
-  block IPv4 link-local/APIPA 169.254.0.0/16. Per RFC 3927, hosts "MUST
   NOT send the packet to any router for forwarding", and "any network
   device receiving such a packet MUST NOT forward it". FreeBSD won't
   route it (route-to can override in some circumstances), so it can't
   be in use as a real network anywhere with the possible exception of
   local-only networks. Unlikely any such situation exists anywhere
   `#2073 <https://redmine.pfsense.org/issues/2073>`__
-  Fix JavaScript confirmation dialog for EasyRule.
-  Use 'clog -f /var/log/filter.log' to view firewall log entries from
   the console so they are displayed in the new format.
-  Set MSS clamping on VPNs in both directions rather than requiring it
   be set on both ends.
-  Add option to kill all states on IP change, currently a hidden option
   for more testing. `#1629 <https://redmine.pfsense.org/issues/1629>`__
-  Kill states associated with the old WAN IP when WAN IP has changed.
   `#1629 <https://redmine.pfsense.org/issues/1629>`__

NAT
---

-  Hybrid outbound NAT style that allows the user to keep the existing
   automatic behavior but layer manual rules on top of it.
-  Option to disable outbound NAT without disabling pf
-  Display networks used in automatic outbound NAT when using that mode
-  Allow reordering, batch delete, and disable of 1:1 NAT rules
-  Take virtual IPs into consideration for automatic outbound NAT rules
   `#983 <https://redmine.pfsense.org/issues/983>`__
-  Outbound NAT can apply to any type of interface, make WAN-type
   specific reference generic

Aliases
-------

-  Allow individual line descriptions on alias bulk import
-  Implement URL Table aliases for ports
-  Optimizations for URL table aliases to use less memory and be more
   robust in general
-  Alias name cannot have more than 31 chars, add maxlength to the field
   as an extra check.
   `#3827 <https://redmine.pfsense.org/issues/3827>`__
-  Prevent Internal Server Error if an IP range is entered backwards.
-  Expand range or subnet entered into a host type alias.
-  Warn that IPv6 address ranges are not supported in aliases.
-  When an alias contain hosts, add IPs and networks to filterdns too,
   otherwise the ruleset ends up with a pre-defined and non-persistent
   table. `#3939 <https://redmine.pfsense.org/issues/3939>`__

Dashboard & General GUI
-----------------------

-  Various fixes for XHTML compliance
-  Various fixes for typos
-  Add a setting to allow the user to specify the clog file size so more
   (or less) entries may be kept in the raw logs. Retain previous
   default size values if the user has not specified a preferred size.
   Files can only be resized when initialized, so provide a "Reset All
   Logs" button as well to force clear all logs and set them up at the
   new size.
-  Add an option for users to be able to adjust how many configuration
   revisions are kept in the local backup cache.
-  Show backup file size in config history.
-  Display pfSense interface name on status interfaces
-  Dashboard cleanups/fixes for jQuery
-  Add "pfsense_ng_fs" full screen/widescreen theme
-  GUI redirect works on both IPv4 and IPv6
   `#3437 <https://redmine.pfsense.org/issues/3437>`__
-  Disk usage section of the System Information widget now shows all
   UFS, ZFS, and cd9660 filesystems, not just the root (/) slice, and
   also indicates if they are a RAM disk.
-  Add a message about Gold to the setup wizard and add a link in the
   menu to the Gold signup page.
-  Add pages missing from the Status > Traffic Graph privilege that are
   required for the full page to load
-  Fix traffic graph widget default autoscale
-  Be more strict on user and group removal to avoid removing
   accidentally removing additional users
   `#3856 <https://redmine.pfsense.org/issues/3856>`__
-  Add an option to restart php-fpm from console
-  Add .inc file for gmirror status widget to give it a better title and
   link to the management page.
-  Allow the Virtual IP list table to be sorted (cosmetic only)

Translations
------------

-  Change default charset on pages to utf-8
-  Updates to pt_BR translation
-  Added Japanese translation
-  Added Turkish translation
-  Fixes for gettext

Captive Portal
--------------

-  Add a way to download CP portal, error and logout html pages.
   `#3339 <https://redmine.pfsense.org/issues/3339>`__
-  Add an option to restore default logout/error/portal custom pages on
   Captive Portal. `#3362 <https://redmine.pfsense.org/issues/3362>`__
-  For more than 100 MAC pass-through entries create pipes in line with
   the rules file to speedup the process.
   `#3932 <https://redmine.pfsense.org/issues/3932>`__
-  Zone backend changed from text-based (e.g. "cpzone") to using the
   zone id (e.g. "2") for specifying the context.
-  ipfw_context has been removed. To list zones, use "ipfw zone list"
-  Default lighttpd daemon port for a Captive Portal zone is based on
   the zone ID. For example, zone ID 2 uses port 8002. There may not be
   a daemon on port 8000.

IPsec
-----

-  IPsec backend changed from racoon to
   `strongSwan <https://www.strongswan.org/>`__
-  IKEv2 settings have been enabled in the GUI
-  Default IPsec configuration settings for newly created site to site
   configurations updated to use main mode and AES 256 on both phase 1
   and 2.
-  IPsec status page and dashboard widget changes to accommodate
   different output from strongSwan
-  Move the IPsec settings from System > Advanced, Misc tab to "Advanced
   Settings" tab under VPN > IPsec.
-  It is now possible to configure :doc:`L2TP/IPsec </vpn/ipsec/l2tp-ipsec>`
-  Add AES-GCM and AES-XCBC to the list of available IPsec algorithms
   and hashes, respectively. Expand P1 DH groups up to 24.
-  Allow hash algorithms to be empty for phase 2 where the encryption is
   AES-GCM
-  Allow to reorder IPsec Phase 1 and Phase 2 items, remove multiple
   P1/P2 items, toggle enable/disable status of P1/P2 items
   `#3328 <https://redmine.pfsense.org/issues/3328>`__
-  Provide a first implementation of EAP-TLS authentication with IKEv2.
   It is a start and might not work on all cases
-  Do not accept non-ASCII characters on IPsec PSK
   `#3931 <https://redmine.pfsense.org/issues/3931>`__
-  Fix ping_hosts.sh to not ping IPsec if CARP is in backup.
-  Allow accept_unencrypted_mainmode_messages to be enabled for IPsec
   if needed.
-  Check that subnet masks are equal when choosing binat type for IPsec
   to avoid errors on ruleset.
   `#3198 <https://redmine.pfsense.org/issues/3198>`__
-  Change NAT Traversal options as strongSwan only has two options:
   force or auto.
-  Don't allow P2 local+remote network combinations that overlap with
   interface+remote-gateway of the P1.
   `#3812 <https://redmine.pfsense.org/issues/3812>`__

OpenVPN
-------

-  Allow entering OpenVPN client credentials in the GUI
-  Add fields for local (push route) and remote (iroute) network
   definitions in an OpenVPN client-specific override entry.
-  Change OpenVPN compression settings to cover the full range of
   allowed settings on OpenVPN (unset, off, on, adaptive) rather than a
   simple off/on switch that either doesn't set the value or enables it
   with adaptive (OpenVPN's default).
-  Add an Authentication Digest Algorithm drop-down to OpenVPN
   server/client and to the wizard (SHA1 is the default since that is
   OpenVPN's default)
-  Add option to specify client management port for OpenVPN client
   export use
-  Ensure e-mail address carries over from the CA screen to the Cert
   screen in the OpenVPN wizard.
-  Allow the user to select "None" for OpenVPN client certificate, so
   long as they supply an auth user/pass.
   `#3633 <https://redmine.pfsense.org/issues/3633>`__
-  Byte counts on OpenVPN status are now human readable rather than huge
   unformatted numbers.
-  OpenVPN instances have new options: "Disable IPv6", route-nopull,
   route-noexec, verb selector
-  Use stronger defaults in the OpenVPN wizard.
-  Fix ovpn-linkup for tun + topology subnet case setting router as
   ifconfig_local envvar when route_vpn_gateway and ifconfig_remote
   are both not defined.
   `#3968 <https://redmine.pfsense.org/issues/3968>`__

DHCP
----

-  Add code for UEFI booting and DHCP
-  Advanced RFC 2136 configuration for DHCPd service
-  Add ability to not supply a DHCP gateway to clients
-  Allow defining DHCP static mappings using dhcp-client-identifier
-  Do not call write_config() when Applying Changes on DHCP settings
   `#3797 <https://redmine.pfsense.org/issues/3797>`__

Packages
--------

-  Package signing to ensure validity/authenticity
-  Single package manifest (XML) file rather than one per architecture
-  Various improvements to PBI setup/structure from upstream (PC BSD)
-  Added the capability for package hooks in /etc/rc.carpmaster and
   /etc/rc.carpbackup
-  Split package category display into separate tabs for categories, and
   provide an "All" tab
-  Move the fetching of a package's config file and additional files to
   separate functions, and then have the "xml" package button perform
   these so that it is not only a redundant copy of the "pkg" reinstall
   button. This can help ensure a package files are in a known-good
   state before other actions are performed, in case the deinstall would
   fail or behave erratically due to other files being missing.
-  Clarify logs generated by newwanip(v6) when restarting packages, it's
   not only IP changes that end up here (by design).
-  When reinstalling a package, try to start it after the install
   completes.

Dynamic DNS
-----------

- Added support for DynDNS Provider "City Network"
- Added support for DynDNS Provider "OVH DynHOST"
- Added support for DynDNS Provider "GratisDNS"
- Added support for DynDNS Provider "Euro DNS"
- Added support for DynDNS Provider "CloudFlare"
- Add support for custom IPv6 DDNS.
- Add backend support for HE.net AAAA record updates.
- Add additional options to Custom DynDNS
- Allow hostname to start with '@.' for namecheap
  `#3568 <https://redmine.pfsense.org/issues/3568>`__
- Do not disable certificate verification in DynDNS. Proper CA
  certificates are now in place to validate SSL in these cases.
- "+" is a valid character in some dynamic DNS providers' usernames.
  `#3912 <https://redmine.pfsense.org/issues/3912>`__

GEOM Mirrors (gmirror)
----------------------

-  New gmirror library to perform various gmirror tasks and get
   information, using some of the former widget logic to start.
-  Added a Diag > GEOM Mirrors page that displays information about
   existing mirrors and performs various management tasks. This will
   only show in the menu if a gmirror is detected at bootup. Current
   actions include rebuilding a drive, forgetting disconnected mirror
   drives, insert/remove, deactivate/activate, clearing metadata. It's
   now possible to use the GUI to rebuild a failed mirror by performing
   a forget, then insert action to replace a missing/dead drive.
-  Also included is a notification setup. Mirror status is polled every
   60 seconds, and if any aspect of the mirror changes, notifications
   are issued that alert in the GUI and by SMTP, etc.

**NOTE**: If a manual gmirror configuration was performed post-install
and not using the pfSense installer gmirror option before install, there
is a chance that the mirror will not function on pfSense 2.2 because the
manual post-install method did not create a completely proper mirror
setup. If the upgraded mirror does not function on 2.2, the following
``/boot/loader.conf.local`` entry may be used to work around the integrity
check that would otherwise fail::

  kern.geom.part.check_integrity=0

If one of these configurations is present, we strongly recommend backing
up the configuration and reinstalling using the built-in gmirror option
in the pfSense installer.

Traffic Shaping
---------------

-  Fix DSCP values and provide a config upgrade to fix values stored in
   config.xml. `#3688 <https://redmine.pfsense.org/issues/3688>`__
-  Remove 'multi lan/single wan' and 'multi wan/single lan' traffic
   shaper wizards, multi lan/wan can be used to replace any of them.
-  Only show the correct type of interfaces (LAN/WAN) on traffic shaper
   wizards `#3535 <https://redmine.pfsense.org/issues/3535>`__
-  Shaper wizard will automatically attempt to guess the correct number
   of WANs and LANs.
-  Updated and expanded traffic shaping for games, game consoles, and
   other applications.
-  Allow up to 2900 limiters. This was set to 30.
   `#3213 <https://redmine.pfsense.org/issues/3213>`__
-  Fix logic to find available next number for limiters and queues.
   `#3998 <https://redmine.pfsense.org/issues/3998>`__
-  Add vmx and hn to list of ALTQ capable interfaces.
-  Remove the "Limiter burst" parameter as it currently doesn't work
   with dummynet in pf.

Misc
----

-  Cleaned up various older files/scripts that were no longer being used
-  Dropped all support for cvsup. cvs is dead, long live svn and git.
-  Optimizations/changes to the XML Parsing code
-  NTP updates to handle a wider ranges of GPS devices and more NTP
   options
-  Move to zerocopy_enable for bpf to optimize logging which uses bpf
   interface. This should increase the general performance since pflog
   is always enabled.
-  Add sshd service to list (if enabled)
-  Add a "status" subcommand to the svc php shell script.
-  When using the reset webConfigurator password option on the console,
   if authentication server is not Local Database, ask user if they want
   to revert back to it.
   `#3341 <https://redmine.pfsense.org/issues/3341>`__
-  Fix interface selections on UPnP to show the customized descriptions
   entered by the user. While here, add an external interface selection
   knob. Fixes `#3141 <https://redmine.pfsense.org/issues/3141>`__
-  Layer 7 Pattern: EAOrigin.pat
-  Layer 7 Pattern: SWF (Flash)
-  Remove some old obsolete code that referred to the now-defunct
   "embedded" platform that was replaced with NanoBSD back in 1.2.x.
-  Sometimes fsck requires a second run, teach rc script to call it more
   than once when it's necessary
-  Add column for internal port on UPnP status page
-  Make listening on interface rather than IP optional for UPnP
-  Use interface name for miniupnpd rather than IPv4 address
   `#3874 <https://redmine.pfsense.org/issues/3874>`__
-  Packet Capture: Host field supports rudimentary boolean logic.
   Captures can specify multiple IP addresses and use and/or between IP
   addresses. Example: To perform an "and" match where both hosts must
   match: "192.168.1.1, 192.168.1.2". To perform an "or" match where any
   of the specified hosts can match:
   "192.168.1.1\|192.168.1.2\|192.168.1.3"
-  Packet Capture: Protocol, host, and port now support negation.
-  Added interface column to Diagnostics > States
-  Change is_port() to only validate a single port, we have
   is_portrange() for specific cases.
   `#3857 <https://redmine.pfsense.org/issues/3857>`__
-  Fix guess_interface_from_ip() to account for differences in
   netstat output. `#3853 <https://redmine.pfsense.org/issues/3853>`__
-  Fix Certificate Authority SAN name handling
   `#3347 <https://redmine.pfsense.org/issues/3347>`__
-  Add a basic command line password reset script.
-  Use configured proxy URL/port for downloading bogon list. Does not
   use credentials. #3789
-  Underscores are valid characters in domains.
   `#3219 <https://redmine.pfsense.org/issues/3219>`__
-  Let user decide to proceed with upgrade when sha256 fails to
   download. `#3576 <https://redmine.pfsense.org/issues/3576>`__
-  Remove the command number shown in the shell prompt.
-  Use a better method of finding disks for SMART.
-  Process obsolete files in shell script instead of PHP.
-  Do not allow FQDN in fields that should only accept a hostname.
-  Set proxy environment variables on interactive shell and also on
   crontab so that they may be used by all scripts.
   `#3789 <https://redmine.pfsense.org/issues/3789>`__
-  Add input checkboxes to remove multiple users and groups
-  Make sure an empty group or user is not created when editing
-  Update URLs in help.php.
-  Change wording at the end of the wizard to remove "donate" since that
   is no longer an option.
-  Put the booting signal in globals.inc since it makes all the other
   scripts detect we are booting. Otherwise separate PHP instances will
   not detect that. rc.bootup clears this flag so all should work
   correctly
-  Force serial console when it was selected by the installer.
   `#4009 <https://redmine.pfsense.org/issues/4009>`__
-  Wait 10 minutes before retrying bogon fetch on soft failures to avoid
   us getting DoSed if something is wrong there (like someone's system
   can't validate the cert)
-  Use IPv4 for ntpq if IPv6 is not allowed

HEADS UP for Xen Users
----------------------

The FreeBSD 10.1 base used by pfSense 2.2 includes PVHVM drivers for Xen
in the kernel. This can cause Xen to automatically change the disk and
network device names during an upgrade to pfSense 2.2, which the
hypervisor should not do but does anyway.

The disk change can be worked around by running
/usr/local/sbin/ufslabels.sh *before* the upgrade to convert the fstab
to UFS labels rather than disk device names.

The NIC device change issue has no workaround. Manual reassignment is
required at this time. Note there have been performance issues reported
in Xen with this NIC device change.

