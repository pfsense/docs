.. include:: /substitutions.rsti

2.1.0 New Features and Changes
==============================

Security Fixes
--------------

Three FreeBSD security advisories are applicable to prior pfSense
releases. These aren't remotely exploitable in and of themselves, but
anyone who can execute arbitrary code on the firewall could use one or
more of these to escalate privileges.
`FreeBSD-SA-13:13.nullfs <http://www.freebsd.org/security/advisories/FreeBSD-SA-13:13.nullfs.asc>`__
`FreeBSD-SA-13:12.ifioctl.asc <http://www.freebsd.org/security/advisories/FreeBSD-SA-13:12.ifioctl.asc>`__
`FreeBSD-SA-13:09.ip\_multicast.asc <http://www.freebsd.org/security/advisories/FreeBSD-SA-13:09.ip_multicast.asc>`__

IPv6 Support
------------

IPv6 Added to many areas of the GUI. At least the following
areas/features are IPv6-enabled. Others may work as well

-  Aliases (Firewall) - Aliases can contain both IPv4 and IPv6, only
   addresses relevant to a given rule will be used
-  CARP RA
-  CARP Failover
-  DHCP Server w/Prefix Delegation
-  SLAAC WAN
-  6to4 WAN
-  6to4 WAN w/Prefix Delegation
-  6rd WAN
-  6rd WAN w/Prefix Delegation
-  DHCP6 WAN
-  DHCP6 WAN w/Prefix Delegation
-  DHCPv6 Relay
-  DNS Forwarder
-  Firewall Rules
-  Gateway Groups/Multi-WAN - See :doc:`/routing/multi-wan-for-ipv6`
-  Gateway Status (apinger)
-  GIF Tunnels
-  GRE Tunnels
-  GUI Access
-  IPsec
-  L2TP
-  NPt
-  NTP
-  OpenVPN
-  Packet Capture
-  PPPoE WAN
-  Router Advertisements
-  Routing
-  Server LB
-  Static IP
-  Syslog (remote)
-  Limiters (dummynet pipes)
-  Virtual IPs - IP Alias
-  Virtual IPs - CARP
-  DNS from RA
-  Accept RA when forwarding
-  Auth via RADIUS
-  Auth via LDAP
-  XMLRPC Sync
-  RRD Graphs
-  DHCP Static Mapping - Works by DUID
-  DynDNS (HE.net hosted DNS, RFC2136, custom)
-  MAC OUI database lookup support for NDP and DHCPv6. (Was already
   present for DHCP leases and ARP table) requires the nmap package to
   be installed to activate

NOTE: Unlike earlier snapshots, BETA, etc, currently we do NOT flip the
"Allow IPv6" checkbox on upgrade, to preserve existing behavior. To
activate IPv6 traffic, a user will have to flip this setting manually

Packages
--------

-  PBI (push button installer) package support - all of a package's
   files and dependencies are kept in an isolated location so packages
   cannot interfere with one another in the way that was possible on
   2.0.x and before using tbz packages
-  RIP (routed) moved to a package
-  OLSRD moved to a package
-  Unbound moved back to a package (Will try integration again for 2.2)
-  Increase the verboseness of the package reinstallation process in the
   system logs for a post-firmware-update package reinstallation
   operation

OS/Binary/Supporting Program Updates
------------------------------------

-  Based on FreeBSD 8.3
-  Updated Atheros drivers
-  OpenSSL 1.0.1e (or later) used by OpenVPN, PHP, IPsec, etc
-  PHP to 5.3.x
-  OpenVPN to 2.3.x
-  Added mps kernel module
-  Added ahci kernel module
-  Updated ixgbe driver
-  Many other supporting packages have been updated

Dashboard & General GUI
-----------------------

-  Switch from Prototype to jQuery
-  Improved navigation and service status in the GUI (shortcut icons in
   each section to quickly access config, logs, status, control
   services, etc)
-  Multiple language support, a mostly-complete translation for
   Brazilian Portuguese is included
-  Read-only privilege to create a user that cannot modify config.xml
-  Dashboard update check can be disabled
-  Fixed theme inconsistencies between the login form and other parts of
   the GUI
-  Various fixes to pages to reduce potential exposure to certain
   CSRF/XSS vectors
-  Updated CSRF Magic
-  Set CSRF Magic token timeout to be the same as the login expiration
-  Added IE Mobile for WP8 to list of browsers that get an alternate
   theme at login
-  Truncate service status so long package descriptions cannot break
   formatting of the status table
-  Many fixes to HTML/XHTML to improve rendering and validation
-  Added a note to the setup wizard letting the user know that it can be
   canceled at any time by clicking the logo image
-  Make dashboard update check respect nanobsd-vga
   `#3078 <http://redmine.pfsense.org/issues/3078>`__
-  Firewall Logs Widget filtering and column changes
-  Added totals for some dashboard widget meters (memory, swap, disk
   usage)
-  Changed dashboard display for states and mbufs to be meters, and to
   show usage as a percentage
-  Update dashboard mbuf count via AJAX
-  Show a count and layout of CPUs in the dashboard if multiple CPUs are
   detected

Captive Portal
--------------

-  Multi instance Captive Portal
-  Multiple Captive Portal RADIUS authentication sources (e.g. one for
   users, one for cards)
-  Logic fixes for voucher encryption
-  Many optimizations to Captive Portal processing, including a database
   backend and moving functions to a php module to improve speed
-  Optional Captive Portal user privilege
-  Add checks to make sure CP hard timeout is less than or equal DHCP
   server default lease time, to avoid issues with CP sessions being
   valid for incorrect IPs, and users switching IPs while they should
   still be connected to the portal
-  Fixes for captive portal voucher syncing on HTTPS with a custom port
   `#3001 <http://redmine.pfsense.org/issues/3001>`__
-  Fixes for custom Captive Portal files leaving symlinks on the
   filesystem after files were removed
-  Added MAC OUI database lookup support to CP status (requires nmap
   package to be installed)

OS/System Management
--------------------

-  Ability to select serial port speed
-  Added a manual way to enable TRIM if someone needs it
-  Added a manual way to trigger a fsck on reboot
-  AES-NI support (Cryptographic Accelerator feature on new Intel/AMD
   CPUs) -- Still experimental, not supported by some areas of the OS
   yet.
-  Support for certain thermal sensors via ACPI, coretemp, and amdtemp
-  System startup beep can be disabled
-  Separate powerd setting for when on battery
-  Add optional ability to change the size of RAM disks for /var/ and
   /tmp/ for systems that have RAM to spare
-  Add optional ability for full installs to use RAM disks for /var/ and
   /tmp/ as is done on NanoBSD. Reduces overall writes to the media,
   should be more SSD-friendly
-  Use a custom sysDescr for snmp similar to m0n0wall's format. Fixes
   `#2893 <http://redmine.pfsense.org/issues/2893>`__
-  Added tunable to allow disabling net.inet.udp.checksum - disabling
   UDP checksums can improve performance, but can also have negative
   side effects
-  Added an mtree database with the correct default permissions, owner,
   sha256 sum, and some other information that is used to verify file
   permissions post-install and post-upgrade
-  APC is not started for PHP unless the system has over 512MB RAM, to
   reduce memory usage on systems with low RAM

Multi-WAN
---------

-  DynDNS multi-WAN failover
-  IPsec multi-WAN failover
-  OpenVPN multi-WAN failover
-  Changed descriptions of the values for gateway monitoring
-  Display apinger (gateway monitoring daemon) as a service when it is
   enabled
-  Fixes for apinger to reload via SIGHUP properly, to avoid unnecessary
   restarts and loss of gateway status data
-  "State Killing on Gateway Failure" now kills ALL states when a
   gateway has been detected as down, not just states on the failing
   WAN. This is done because otherwise the LAN-side states were not
   killed before, and thus some connections would be in limbo,
   especially SIP.
-  Due to the change in its behavior, "State Killing on Gateway Failure"
   is now disabled by default in new configurations and is disabled
   during upgrade. If the feature is desired, it must be manually
   re-enabled post-upgrade.

NTP
---

-  NTP daemon now has GPS support

IPsec
-----

-  More IPsec hash algorithms and DH key groups added, "base"
   negotiation mode added
-  Mobile IPsec supports separate "split dns" field and doesn't just
   assume the default domain for split DNS domains
-  Properly ignore disabled IPsec phase 2 entries
-  NAT before IPsec (1:1 or many:1) outbound
-  Set default Proposal Check setting to Obey for mobile IPsec
-  LDAP and RADIUS are now possible authentication sources for IPsec
   mobile xauth
-  Delete the SPDs for an old IPsec entry when it is disabled or removed
   `#2719 <http://redmine.pfsense.org/issues/2719>`__
-  Manage active SPDs on CARP secondary during sync
   `#2303 <http://redmine.pfsense.org/issues/2303>`__
-  Add an option to force IPsec to reload on failover, which is needed
   in some cases for IPsec to fail from one interface to another.
   `#2896 <http://redmine.pfsense.org/issues/2896>`__

OpenVPN
-------

-  OpenVPN can accept attributes from RADIUS via avpairs for things like
   inacl, outacl, dns-server, routes
-  OpenVPN checkbox for "topology subnet" to use one IP per client in
   tun mode
-  OpenVPN local/remote network boxes can accept multiple
   comma-separated networks
-  OpenVPN status for SSL/TLS server instances can now display the
   routing table for the VPN instance
-  OpenVPN now allows selecting "localhost" as the interface
-  Gateways are created for assigned OpenVPN server instances as well as
   clients
-  OpenVPN instances can run on the same port on different interfaces
-  OpenVPN status page now has service controls to show the status of
   the daemon running each instance, and allow for stop/start/restart
   from that page
-  Changed wording of the error displayed when a daemon is not running
   or the management interface of OpenVPN cannot be reached for an
   instance
-  OpenVPN client-specific Override cleanup fixes
-  Fixed double-click to edit of OpenVPN Client-Specific Overrides

NAT/Firewall Rules/Alias
------------------------

-  Aliases separated into tabs for Hosts, Ports, and URLs to improve
   manageability
-  NAT reflection options re-worded to be less confusing
-  Adjustable source tracking timeout for Sticky connections
-  Firewall rules now support matching on ECE and CWR TCP flags
-  Filtering on ECE and CWR TCP flags is now possible
-  Added ICMP to protocol list when creating rdr (port forward) rules
-  Keep proper positioning of duplicated outbound NAT rules
   `#1118 <http://redmine.pfsense.org/issues/1118>`__
-  When using the + at the top of Outbound NAT rules, add the rule to
   the top of the list and not the bottom
-  Fix ordering of interface group rules in the ruleset
   `#2837 <http://redmine.pfsense.org/issues/2837>`__
-  Track time and user@host which created or updated a firewall, NAT
   port forward, or outbound NAT rule. If timestamp records are present,
   display them at the bottom of the rule page when editing. Have the
   created time/user pre-filled for automated rules such as NAT port
   forward associated rules and the switch from automatic to manual
   outbound NAT
-  Fix generation of manual outbound NAT rules so that localhost and VPN
   rules are not unnecessarily duplicated
-  Prevent using "block" for an alias name, as it is a pf reserved
   keyword
-  Allow TCP flags to be used on block or reject rules, since they are
   also valid there
-  Updates/fixes to DSCP handling
-  Allow advanced options state-related parameters to be used for TCP,
   UDP and ICMP -- Formerly only allowed on TCP
-  Respect ports found in rules when policy route negation rules are
   made, `#3173 <http://redmine.pfsense.org/issues/3173>`__
-  Do not include disabled OpenVPN networks in generated policy route
   negation rules

Certificates
------------

-  Improved denoting of certificate purposes in the certificate list
-  Imported CRLs can be edited and replaced
-  Can set digest algorithm for CA/Certs (sha1, sha256, etc)
-  Default digest algorithm is now SHA256
-  Show CA and certificate start and end dates in the their listings
-  Correct tooltip description when adding a certificate
   `#3017 <http://redmine.pfsense.org/issues/3017>`__
-  Relax input validation on a CA/Cert description since it is only used
   cosmetically in pfSense and not in the actual CA/cert subject
-  Allow removing blank/empty CA and Cert entries

Logging
-------

-  More system log separation, Gateways, Routing, Resolver split into
   their own tabs
-  Firewall logs can now be filtered by many different criteria
-  Firewall logs can be sorted by any column
-  Firewall logs can optionally show the matching rule description in a
   separate column or in between rows
-  Firewall logs now show an indicator icon if the direction of a log
   entry is OUT rather than IN
-  Add popup DNS resolution method to firewall log view
-  Reduced logging output from IGMP proxy
-  Reduced logging output from DynDNS
-  Relocated filterdns logs to the resolver log file/tab
-  Relocated DHCP client logs to the DHCP tab
-  Fix system script logging so the correct script filename is printed
   in the log, rather than omitting the script name entirely
-  Add independent logging choices to disable logging of bogon network
   rules and private network rules. Add upgrade code to obey the
   existing behavior for users (if default block logging was disabled,
   so is bogon/private rule blocking)
-  Add a checkbox to disable the lighttpd log for people who don't want
   their system log full of messages from lighttpd in some cases where
   they are filling the log unnecessarily

Notifications
-------------

-  Add the ability to disable Growl or SMTP notifications but keep their
   settings intact, so the mail settings can be used for other purposes
   (packages, etc)
-  Add a test button to selectively test Growl or SMTP notifications
   without re-saving settings
-  Do not automatically generate a test notification on saving
   notification settings, as there are now individual test buttons

High Availability (CARP, pfSync, XML-RPC)
-----------------------------------------

-  High Availability Synchronization options (Formerly known as "CARP
   Settings" under Virtual IPs Promoted to its own menu entry, System >
   High Avail. Sync

   -  This is to make it easier to find, as well as make its purpose
      more clear. "CARP" is a part of High Availability, as is
      XMLRPC/pfsync state synchronization, but it's a bit of a misnomer
      to refer to the sync settings as CARP

-  Ensure that the user does not remove only the last IP alias needed
   for a CARP VIP in an additional subnet
-  Disable pfsync interface when state synchronization is not in use
-  Fixed issues with DHCP server config synchronization ordering on
   secondary nodes `#2600 <http://redmine.pfsense.org/issues/2600>`__
-  Restart OpenVPN servers when CARP transitions to master (clients were
   already restarted), otherwise if CARP was disabled, the servers would
   never recover
-  Removed the automatic pfsync rule, since the documentation always
   recommends adding it manually, and to add it behind the scenes with
   no way to block it can be counter-productive (and potentially
   insecure). **If the documentation was not followed and a pfsync or
   allow all rule was not added on the sync interface, then state
   synchronization may break after this upgrade. Add an appropriate rule
   to the sync interface and it will work again.**
-  Allow XMLRPC to sync IP Alias VIPs set to Localhost for their
   interface
-  In DHCP leases view, use the internal interface name (lan/opt1/etc)
   for the failover pool name, rather than a number. In certain cases
   the number can get out of sync between the two nodes, but the
   interface names will always match
-  Print the user-configured interface description next to the DHCP
   failover pool name, rather than only the internal name (lan/opt1/etc)
-  Add option to synchronize authentication servers (RADIUS, LDAP) via
   XMLRPC

NanoBSD
-------

-  Fixes for conf\_mount\_ro/conf\_mount\_rw reference checking/locking
-  Diag > NanoBSD now has button to switch media between read/write and
   read-only
-  Diag > NanoBSD now has a checkbox option to keep the media read/write
-  Fixed an issue with NanoBSD time zones not being properly respected
   by all processes the first reboot after a firmware upgrade

DHCP Server
-----------

-  DHCP can support multiple pools inside a single subnet, with distinct
   options per pool
-  DHCP can allow/deny access to a DHCP pool by partial (or full) MAC
   address
-  DHCP static mappings can have custom settings for gateway, DNS, etc
-  DHCP static mappings can optionally have a static ARP entry created
-  Fix Dynamic DNS updates from DHCP (ISC changed the config layout and
   requires zone declarations)
-  When crafting DHCP Dynamic DNS zones, do not use invalid DNS servers
   for the IP type (e.g. skip IPv6 DNS servers, because the DHCP daemon
   rejects them)
-  Added a config backup section choice for DHCPv6

Traffic Shaper
--------------

-  Schedules can now be used with limiters
-  Traffic shaper queues view updated
-  CoDel AQM Shaper Discipline
-  Allow PRIQ queues to be deleted.
   `#3037 <http://redmine.pfsense.org/issues/3037>`__
-  Limiters now allow the user to set the mask they want to use, rather
   than assuming masking will always be per-IP. This allows per-subnet
   limits and similar
-  Limiters now allow setting masking for IPv6
-  Limiters now allow setting a burst size. This will pass X amount of
   data (TOTAL, NOT a rate) after an idle period before enforcing the
   limit

DNS Forwarder
-------------

-  In DNS forwarder, DNS query forwarding section with options for
   sequential and require domain
-  Allow a null forwarding server in DNS Forwarder domain overrides to
   ensure that queries stay local and never go outside the firewall
-  Add DNS Forwarder option to not forward private reverse lookups
-  DNS Forwarder domain overrides can now specify a source address for
   the query, to help resolve hostnames over VPN tunnels
-  DNS Forwarder now can change the port upon which it listens, for
   better cohabitation with other DNS software such as tinydns or
   unbound, if both are needed
-  DNS Forwarder now has an option to select the interfaces/IP Addresses
   upon which it will respond to queries
-  DNS Forwarder can now be set to only bind to specific IPv4 IPs (the
   underlying software, dnsmasq, does not support selectively binding to
   IPv6 IPs)
-  Improved handling of some dnsmasq custom config options

User Manager
------------

-  Configurable RADIUS authentication timeout in User Manager
-  Print the error message from LDAP in the log for a bind failure.
   Helps track down reasons for authentication failures
-  Re-enable admin user if it's disabled when 'Reset webConfigurator
   password' option is used. Fixes
   `#2877 <http://redmine.pfsense.org/issues/2877>`__
-  Restrict maximum group name length to 16 characters or less (OS
   restriction)
-  Added option to UTF-8 encode LDAP parameters to improve handling of
   international characters
-  CDATA protected LDAP fields in config to avoid invalid XML with
   international characters

DynDNS
------

-  Fixed handling of DynDNS 25-day update and add ability to configure
   update interval
-  Added DynDNS No-IP Free Account Support
-  Add AAAA support to RFC2136 updates
-  Add cached IP support to RFC2136, add GUI button to force update for
   single host
-  Fix double click row to edit for RFC2136
-  Add option to RFC2136 to find/use the public IP if the interface IP
   is private. (Off by default to preserve existing behavior on upgrade)
-  Add server IP column and cached IP display to RFC2136 host list
-  Include RFC2136 hosts in DNS rebinding checks
-  Include both dyndns and RFC2136 hosts in referer check

Graphs
------

-  Add ability to reverse-resolve IPs on Status > Traffic Graph in the
   rate table
-  Add ability to filter local or remote IPs on Status > Traffic Graph
   in the rate table
-  Change maximum values for RRD throughput to account for 10G links.
   Previous maximums would have caused blank spots on the graph during
   periods of high throughput
-  Fixes to RRD data resolution/retention
-  Added RRD Graph for mbuf clusters
-  Changed default RRD graph colors to be more visually distinct to help
   avoid ambiguity between multiple values on the same graph

Misc
----

-  Add option to the packet capture page to control whether or not
   promiscuous mode is used on the NIC. Certain drivers have issues with
   promiscuous mode
-  Make parent interface and all VLANs share MTU
   `#2786 <http://redmine.pfsense.org/issues/2786>`__
-  Fix cellular signal strength indicator
-  Fix PPP config cleanup when removing an interface
   `#2758 <http://redmine.pfsense.org/issues/2758>`__
-  Disallow adding IP Alias or CARP VIP that would be the network or
   broadcast address of a subnet
-  Diagnostics > Sockets page to show open network sockets on the
   firewall
-  Diagnostics > Test Port page to perform a simple TCP connection test
   to see if a port is open
-  The pftop page has additional options to display more detailed
   information and sort it
-  Fixed conflict between static IP and static route in the same subnet
   `#2039 <http://redmine.pfsense.org/issues/2039>`__
-  Do not apply static ARP entries to disabled interfaces
   `#1988 <http://redmine.pfsense.org/issues/1988>`__
-  Do not allow bridge members to be assigned to itself
   `#1153 <http://redmine.pfsense.org/issues/1153>`__
-  Changed Diag > Ping to use more available source addresses (CARP
   VIPs, IP Alias VIPs, OpenVPN interfaces, IPv6 Link-Local IPs)
-  Changed Diag > Traceroute to use more available source addresses
   (CARP VIPs, IP Alias VIPs, OpenVPN interfaces, IPv6 Link-Local IPs)
-  Changed shell prompt to not force background color, to be kinder to
   those not using black as a background in their terminal
-  Add a field to allow rejecting DHCP leases from a specific upstream
   DHCP server. `#2704 <http://redmine.pfsense.org/issues/2704>`__
-  Updated the help system to handle some recent added files for 2.x and
   clean out some old/obsolete files
-  Allow selecting "Localhost" as an interface for IP Alias VIPs - this
   way IP Alias VIPs may be used for binding firewall services (e.g.
   Proxy, VPN, etc) in routed subnets without burning IPs for CARP
   unnecessarily
-  Updated list of mobile service providers
-  Fix max length for wpa passphrase. A 64-char passphrase would be
   rejected by hostapd and leave an AP in an open state
   `#3034 <http://redmine.pfsense.org/issues/3034>`__
-  Added MSS clamping to the setup wizard
-  Add a setting to configure the filterdns hostname resolution interval
   (defaults to 300s, 5 minutes)
-  Omit IP mismatch warnings (e.g. behind a port forward, VPN IP, etc)
   if HTTP\_REFERER protection is disabled
-  Fixes for selecting/detecting PPP devices such as 3G/4G modems
-  Rather than doing auto-detection to find serial PPP devices, use a
   glob when listing potential PPP serial devices
-  Prevent sshlockout from a crash/coredump if a format string like %s
   is present in the buffer
-  Fix SMART to see adaX devices
-  Fix SMART interpretation of output from SCSI devices
-  Fixed display of user SSH keys when present
-  Updated p0f database from FreeBSD
-  Fix UPnP Interface name selection to show the configured description
   entered by the user
-  Allow setting the external UPnP interface (must be default route WAN)
-  Fix Diag > Tables AJAX fadeOut after deletion for rows with CIDR mask
   format
-  Improve Diagnostics > Routes to fetch output via AJAX and have
   configurable filtering and sizes. Improves handling of large routing
   tables, such as a full BGP feed
-  When deleting or renaming a virtual server from the Load Balancer
   (relayd) manually clean up the NAT rules it leaves behind to avoid
   conflicts
-  Many, many bug fixes
-  Various fixes for typos, formatting, input validation, etc

SH/PHP Shell Scripts
--------------------

- Git package for gitsync is now pulled in as a pfSense-style PBI
  package
- Shell scripts added to enable/disable CARP:

    pfSsh.php playback enablecarp
    pfSsh.php playback disablecarp

- Shell scripts to add and remove packages from the command line::

    pfSsh.php playback installpkg "Some Package"
    pfSsh.php playback uninstallpkg "Some Package"
    pfSsh.php playback listpkg

- Added shell script to remove shaper settings::

    pfSsh.php playback removeshaper

- Add shell script to control services from the command line::

    pfSsh.php playback svc start <service name>
    pfSsh.php playback svc restart <service name>
    pfSsh.php playback svc stop <service name>

- Add a simple CLI mail script capable of sending an SMTP message using
  echo/piped input (uses SMTP notification settings for server
  details)::

    ifconfig -a | mail.php -s"ifconfig output"

- Added a script to convert a user's filesystem from device names to
  UFS labels, for easier portability in case the disk device changes
  names (e.g. adX to adY, adX to daY, or adX to adaX). ONLY FOR FULL
  INSTALLS. NanoBSD already uses labels.

  .. code::

    /usr/local/sbin/ufslabels.sh
