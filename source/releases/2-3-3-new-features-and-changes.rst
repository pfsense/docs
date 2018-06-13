.. include:: /substitutions.rsti

2.3.3 New Features and Changes
==============================

Security / Errata
-----------------

-  Updated to FreeBSD 10.3-RELEASE-p16

   -  FreeBSD Security Advisories

      -  `FreeBSD-SA-16:29.bspatch <https://www.freebsd.org/security/advisories/FreeBSD-SA-16:29.bspatch.asc>`__
      -  `FreeBSD-SA-16:31.libarchive <https://www.freebsd.org/security/advisories/FreeBSD-SA-16:31.libarchive.asc>`__
      -  `FreeBSD-SA-16:33.openssh <https://www.freebsd.org/security/advisories/FreeBSD-SA-16:33.openssh.asc>`__
      -  `FreeBSD-SA-16:35.openssl <https://www.freebsd.org/security/advisories/FreeBSD-SA-16:35.openssl.asc>`__
      -  `FreeBSD-SA-16:37.libc <https://www.freebsd.org/security/advisories/FreeBSD-SA-16:37.libc.asc>`__
      -  `FreeBSD-SA-16:38.bhyve <https://www.freebsd.org/security/advisories/FreeBSD-SA-16:38.bhyve.asc>`__
      -  `FreeBSD-SA-16:39.ntp <https://www.freebsd.org/security/advisories/FreeBSD-SA-16:39.ntp.asc>`__
      -  `FreeBSD-SA-17:01.openssh <https://www.freebsd.org/security/advisories/FreeBSD-SA-17:01.openssh.asc>`__

   -  FreeBSD Errata Notices

      -  `FreeBSD-EN-16:17.vm <https://www.freebsd.org/security/advisories/FreeBSD-EN-16:17.vm.asc>`__
      -  `FreeBSD-EN-16:18.loader <https://www.freebsd.org/security/advisories/FreeBSD-EN-16:18.loader.asc>`__

-  pfSense Advisories

   -  `pfSense-SA-17_01.webgui <https://pfsense.org/security/advisories/pfSense-SA-17_01.webgui.asc>`__

      -  Fixed validation and encoding on Captive Portal status pages
         `#7019 <https://redmine.pfsense.org/issues/7019>`__

   -  `pfSense-SA-17_02.webgui <https://pfsense.org/security/advisories/pfSense-SA-17_02.webgui.asc>`__

      -  Fixed update_config_field() in wizard.php so it does not pass
         user input through eval()
         `#7230 <https://redmine.pfsense.org/issues/7230>`__

   -  `pfSense-SA-17_03.webgui <https://pfsense.org/security/advisories/pfSense-SA-17_03.webgui.asc>`__

      -  Added encoding for 'from' and 'to' before output on
         pkg_mgr_install.php
         `#7225 <https://redmine.pfsense.org/issues/7225>`__
      -  Added encoding for the contents of pkg_filter before output
         `#7227 <https://redmine.pfsense.org/issues/7227>`__
      -  Converted easyrule.php to use a confirmation landing page so
         that the parameters can be submitted via POST
         `#7228 <https://redmine.pfsense.org/issues/7228>`__

-  Updated numerous third-party libraries and supporting programs
-  Changed behavior of fsck during bootup to improve filesystem
   stability `#6340 <https://redmine.pfsense.org/issues/6340>`__
-  Added protection to /etc/ttys to prevent corruption or missing lines

Known Issues
------------

-  The Captive Portal **Disconnect All Users** button does not fully
   disconnect all users
   `PR#3565 <https://github.com/pfsense/pfsense/pull/3565>`__
-  RFC 2136 Dynamic DNS Entries will show red on the Dashboard widget
   even when correctly updated
   `#7290 <https://redmine.pfsense.org/issues/7290>`__
-  If an OpenVPN server set for *SSL/TLS+User Auth* contains a single
   user certificate shared between multiple users with different
   usernames, the **Duplicate Connections** option must be enabled on
   the server. In this situation, each user must have their own unique
   certificate or the certificate requirement should be removed (User
   Auth only). As this configuration is not valid nor a recommended
   practice, this issue is not considered a bug. When this condition is
   present only a single user can connect, additional users may see a
   client log entry such as "CreateIpForwardEntry: The object already
   exists".
-  Firewall rules without an IP protocol set in the configuration which
   also have an ICMP type set may not load or display correctly.
   `#7299 <https://redmine.pfsense.org/issues/7299>`__
   `#7300 <https://redmine.pfsense.org/issues/7300>`__

General Info
------------

-  Added Packages: tinc, cellular, LCDproc, TFTP Server
-  Fixed numerous typos and wording issues
-  Added marking for required fields on various pages
   `#7083 <https://redmine.pfsense.org/issues/7083>`__
-  Input validation fixes on various pages
-  Cleaned up some unneeded files/pages/functions
-  Fixed broken/outdated links

OpenVPN
-------

-  Changed OpenVPN RADIUS authentication to send proper NAS-Port-Type,
   NAS-Port, and NAS-Identifier values
   `#6609 <https://redmine.pfsense.org/issues/6609>`__
-  Added compression option to handle connecting to OpenVPN peers which
   do not have LZO compiled into their OpenVPN executable
   `#6739 <https://redmine.pfsense.org/issues/6739>`__
-  Added a workaround to block outside DNS on Windows 10 OpenVPN clients
   to prevent DNS leaks
   `#6719 <https://redmine.pfsense.org/issues/6719>`__
-  Improved OpenVPN server handling when using CARP VIPs in Gateway
   Groups
-  Improved handling of chained/intermediate CAs in OpenVPN
   `#2800 <https://redmine.pfsense.org/issues/2800>`__
-  Changed OpenVPN widget so it updates dynamically
   `#6723 <https://redmine.pfsense.org/issues/6723>`__
-  Adapted the encryption cipher list to the new output format in
   OpenVPN 2.3.12, also now displays key and block lengths
   `#6849 <https://redmine.pfsense.org/issues/6849>`__
-  Changed OpenVPN server list to display more information
-  Improved error message to explicitly state allowable characters for
   certificate fields in the OpenVPN wizard
   `#6432 <https://redmine.pfsense.org/issues/6432>`__
-  Fixed handling of OpenVPN authentication when the backend server name
   contains special characters (e.g. '&')
   `#7002 <https://redmine.pfsense.org/issues/7002>`__
-  Fixed saving an OpenVPN instance on a DHCP interface that does not
   currently have an IP address
   `#7031 <https://redmine.pfsense.org/issues/7031>`__
-  Added an IPv6 Tunnel Network field to OpenVPN Client-Specific
   Overrides `#7053 <https://redmine.pfsense.org/issues/7053>`__
-  Fixed changing between tun and tap mode for OpenVPN Clients
-  Changed OpenVPN startup to avoid overwriting its configuration, and
   to wait for its PID file to be written
-  Fixed OpenVPN binding to an IP Alias VIP
   `#7136 <https://redmine.pfsense.org/issues/7136>`__
-  Fixed display of disabled OpenVPN clients
   `#7180 <https://redmine.pfsense.org/issues/7180>`__
-  Fixed handling of "redirect-gateway" in Client-Specific Overrides
   `#6633 <https://redmine.pfsense.org/issues/6633>`__

IPsec
-----

-  Clarified IPsec Key Exchange Version drop-down to specify IKEv1/IKEv2
   `#6898 <https://redmine.pfsense.org/issues/6898>`__
-  Fixed handling of static routes for IPsec peers on tunnels bound to
   IP Aliases VIPs with CARP parents
-  Fixed MSS clamping for mobile IPsec clients
   `#7005 <https://redmine.pfsense.org/issues/7005>`__
-  Added IPsec to the State Table interface list

Interfaces
----------

-  Fixed handling of LAGG MTU when child QinQ interfaces are present
   `#6227 <https://redmine.pfsense.org/issues/6227>`__
-  Improved behavior when using DHCP before RA
   `#5993 <https://redmine.pfsense.org/issues/5993>`__
-  Added the ability to send a DHCP Release from Status > Interfaces,
   rather than only stopping dhclient
-  Fixed issues adding/editing QinQ entries
-  Fixed input validation of QinQ entries
-  Fixed validation to prevent an interface, interface group, and alias
   from using the same name
   `#6976 <https://redmine.pfsense.org/issues/6976>`__
-  Updated interface group name validation rules to match limits of the
   operating system
-  Prevented interface group names, interface names, and aliases from
   starting with ``pkg_`` to reserve it for packages use (e.g. tinc)
   `#7173 <https://redmine.pfsense.org/issues/7173>`__
-  Added validation to prevent Interface Group Names from containing a
   dash `#7173 <https://redmine.pfsense.org/issues/7173>`__
-  Added validation to prevent Interface Groups from being renamed to an
   existing name `#7183 <https://redmine.pfsense.org/issues/7183>`__
-  Fixed issues with Interface Statistics widget display
   `#7134 <https://redmine.pfsense.org/issues/7134>`__
-  Fixes for interfaces_ppps_edit.php to fix MTU validation, interface
   friendly names, advanced options expansion
-  Changed linkup event handling to ignore events for interfaces that
   are member of bridges which have no IP address configured
-  Fixed input validation for L2TP and PPTP WAN type interfaces
   `#6732 <https://redmine.pfsense.org/issues/6732>`__
-  Added validation to prevent adding duplicate gateways from the
   Interface configuration page
-  Fixed handling of IPv6 checksum options for "Disable hardware
   checksum offload" `#5321 <https://redmine.pfsense.org/issues/5321>`__
-  Fixed handling of the confirmation dialog when deleting a VLAN
   `#6916 <https://redmine.pfsense.org/issues/6916>`__
-  Fixed handling of wireless MAC address spoofing
-  Fixed wireless channel changing
   `#6833 <https://redmine.pfsense.org/issues/6833>`__
-  Improved labels and help text for IPv6 tunneling options
-  Added the ability for an L2TP or PPTP WAN to use a hostname for the
   remote gateway `#6899 <https://redmine.pfsense.org/issues/6899>`__

Certificate Management
----------------------

-  Added missing recommended key lengths and digests to certificate
   manager
-  Fixed CRL editing so that certificates already contained the CRL are
   not displayed

Users / Authentication / Privileges
-----------------------------------

-  Fixed SSH Keyboard-Interactive authentication
   `#6963 <https://redmine.pfsense.org/issues/6963>`__
-  Added STARTTLS to LDAP Authentication Server Configuration
-  Improved WebGUI usability when a remote LDAP server is not available
-  Fixed issues with local_sync_accounts failing during boot when
   using an LDAP server on a non-local network or hostname
   `#6857 <https://redmine.pfsense.org/issues/6857>`__
-  Fixed port build options for scponly
   `#7012 <https://redmine.pfsense.org/issues/7012>`__
-  Fixed notifications so that the Mark All as Read button is not shown
   to users who do not have sufficient privileges to use it
   `#3454 <https://redmine.pfsense.org/issues/3454>`__
-  Added privileges to control display of notices
   `#7051 <https://redmine.pfsense.org/issues/7051>`__
-  Standardized privilege name capitalization
-  Fixed issues with low-privilege users accessing Help pages
   `#7139 <https://redmine.pfsense.org/issues/7139>`__
   `#7140 <https://redmine.pfsense.org/issues/7140>`__
-  Added a privilege for UPnP & NAT-PMP configuration
   `#7141 <https://redmine.pfsense.org/issues/7141>`__
-  Simplified tcsh prompt and changed the prompt so it respects default
   terminal colors

Firewall / Rules / NAT / Aliases / States
-----------------------------------------

-  Fixed restoring rule type selection after input errors while saving
   firewall rules
-  Fixed a copy/paste error in variable test when validating firewall
   rule ports.
-  Corrected the descriptions and behavior of the Adaptive Start and
   Adaptive End settings for firewall state handling
-  Fixed display of the number of states in the Firewall Rules page
-  Moved "Any" to top of protocol list in firewall rules
-  Fixed issues with hidden fields on firewall_rules_edit.php
   `#7057 <https://redmine.pfsense.org/issues/7057>`__
-  Fixed issues with moving rules that required scrolling while dragging
   `#6895 <https://redmine.pfsense.org/issues/6895>`__
-  Enhanced ICMP type handling in rules
-  Fixed issues when hovering the mouse pointer over aliases on disabled
   rules making the hint difficult to read
   `#6448 <https://redmine.pfsense.org/issues/6448>`__
-  Fixed handling of firewall rule separators when a NAT associated rule
   is deleted `#6676 <https://redmine.pfsense.org/issues/6676>`__
-  Added field to specify source-hash key for outbound NAT rules
-  Fixed issues with **Firewall > NAT > Edit** forgetting destination
   type selection when input errors occur
   `#6224 <https://redmine.pfsense.org/issues/6224>`__
-  Removed "self" as a destination from NAT 1:1 rules
-  Fixed NAT rules so that when a port forward is disabled, its
   associated firewall rule is also disabled
   `#6472 <https://redmine.pfsense.org/issues/6472>`__
-  Fixed 1:1 NAT address family validation
   `#6927 <https://redmine.pfsense.org/issues/6927>`__
-  Fixed problems with nested aliases containing FQDNs
   `#6982 <https://redmine.pfsense.org/issues/6982>`__
-  Changed the Status > Filter Reload page so it shows the entire filter
   reload progress, rather than only the last state
   `#6931 <https://redmine.pfsense.org/issues/6931>`__
-  Fixed labels on diag_states_summary.php
   `#6711 <https://redmine.pfsense.org/issues/6711>`__
-  Fixed initial state of confirmation checkboxes on
   diag_resetstate.php
-  Changed Diag > States so it can optionally require a filter before
   displaying states, to improve handling with large state tables
   `#7069 <https://redmine.pfsense.org/issues/7069>`__

Traffic Shaping
---------------

-  Added Chelsio network cards (cxl) to the list of drivers that are
   capable of using ALTQ
   `#6830 <https://redmine.pfsense.org/issues/6830>`__
-  Fixed the traffic shaper wizard so it uses whole numbers instead of
   decimals `#6779 <https://redmine.pfsense.org/issues/6779>`__

HA / CARP
---------

-  Fixed issues when XMLRPC synchronizes IP Alias type Virtual IP
   addresses bound to Localhost
   `#7010 <https://redmine.pfsense.org/issues/7010>`__
-  Fixed a bug where the CARP VIP status was incorrect when the
   interface has more than one CARP VIP

DHCP/DHCPv6 Server / Router Advertisements
------------------------------------------

-  Updated the ISC DHCP Daemon to fix issues with missing hostnames in
   leases, and removed workarounds that are no longer needed
   `#6840 <https://redmine.pfsense.org/issues/6840>`__
-  Fixed reversed behavior of "Change DHCPv6 display lease time from UTC
   to local time" `#6640 <https://redmine.pfsense.org/issues/6640>`__
-  Fixed incorrect index for edit action on DHCP Leases
   `#7233 <https://redmine.pfsense.org/issues/7233>`__
-  Added an option to force a Dynamic DNS hostname in DHCP/DHCP6 Server
   settings
-  Changed DHCP lease times to always display in 24-hour clock format
-  Added an option to allow BOOTP to be specifically disabled in the
   DHCP Server settings
   `#4351 <https://redmine.pfsense.org/issues/4351>`__
-  Fixed validation to allow URLs for TFTP Server in DHCP Server
   settings `#6634 <https://redmine.pfsense.org/issues/6634>`__
-  Improve dhcpd and dhcpleases reload handling
-  Fixed DHCP NTP Server form validation to allow hyphens
   `#6806 <https://redmine.pfsense.org/issues/6806>`__
-  Fixed restore of DHCP6 leases on full install when using MFS /var
-  Fixed a problem with the DHCP range being reset if the Setup Wizard
   was re-run when a custom DHCP range already exists
   `#4820 <https://redmine.pfsense.org/issues/4820>`__
-  Fixed issues with DHCP traffic being blocked with DHCP Relay enabled
   `#6996 <https://redmine.pfsense.org/issues/6996>`__
-  Changed the DHCP/DHCPv6 server GUI so it can be configured (but not
   run) while DHCP Relay is enabled
   `#6997 <https://redmine.pfsense.org/issues/6997>`__
-  Added Client ID to DHCP Leases display, if present
-  Added Client ID to DHCP Mapping list, if present
-  Disabled DHCP server on interfaces with subnet >= 31
   `#6930 <https://redmine.pfsense.org/issues/6930>`__
-  Changed DHCP6 client to allow a prefix size of /59
-  Changed DHCP6 server to allow a prefix size of /59 and /61
-  Added new "Ignore client identifiers" option to DHCP Server
-  Fixed handling of DNS entries for IPv6 static mappings when using
   delegated prefixes
   `#6768 <https://redmine.pfsense.org/issues/6768>`__
-  Improved the help text for Router Advertisement configuration
   `#6889 <https://redmine.pfsense.org/issues/6889>`__

DNS / Resolver / Forwarder
--------------------------

-  Allow a variable number of DNS servers
   `#5549 <https://redmine.pfsense.org/issues/5549>`__
-  Changed interface boxes in the DNS Resolver so they can be resized
-  Fixed sorting of DNS Forwarder hosts and domains in config.xml
   `#6903 <https://redmine.pfsense.org/issues/6903>`__
-  Fixed DNS Resolver (unbound) logging after clearing logs
   `#6915 <https://redmine.pfsense.org/issues/6915>`__
-  Added support for "deny_non_local" and "refuse_non_local" ACLs in
   the DNS Resolver `#6914 <https://redmine.pfsense.org/issues/6914>`__
-  Fixed DNS Server Gateway validation
-  Changed behavior of DNS Resolver overrides to only add FQDN entries,
   not short hostnames
   `#6064 <https://redmine.pfsense.org/issues/6064>`__
-  Fixed issues with DNS Resolver Host Overrides not being updated
   properly `#6712 <https://redmine.pfsense.org/issues/6712>`__

NTP / GPS
---------

-  Fixed display of Prefer/No Select checkboxes invisible when adding
   entries in NTP Server settings
   `#6788 <https://redmine.pfsense.org/issues/6788>`__
-  Fixed handling of NTP IPv6 restrict clauses
-  Fixed setting default NTP access restrictions when there are no
   custom restrictions
   `#6454 <https://redmine.pfsense.org/issues/6454>`__
-  Fixed NTP status widget IPv6 address handling so addresses are not
   truncated `#4815 <https://redmine.pfsense.org/issues/4815>`__
-  Fixed the NTP Orphan Mode stratum field
   `#7034 <https://redmine.pfsense.org/issues/7034>`__
-  Fixed issues with NTP GPS status
-  Fixed a case that could result in an empty 'restrict' line in the NTP
   configuration `#7110 <https://redmine.pfsense.org/issues/7110>`__
-  Added a limit for NTP time source fields so they cannot exceed the
   maximum number saved to configuration
   `#7164 <https://redmine.pfsense.org/issues/7164>`__
-  Fixed display and behavior issues with NTP ACLs
   `#6984 <https://redmine.pfsense.org/issues/6984>`__
-  Improved parsing of GPS initialization and output, and add support
   for more GPS output formats and extended status
-  Added an autocorrect tool for checksums on GPS initialization
   commands `#7159 <https://redmine.pfsense.org/issues/7159>`__

Captive Portal
--------------

-  Changed Captive Portal MACs page to be sortable
   `#6786 <https://redmine.pfsense.org/issues/6786>`__
-  Fixed handling of Captive Portal user bandwidth set to 0
   `#6872 <https://redmine.pfsense.org/issues/6872>`__
-  Changed Captive portal to send "Admin Reset" as termination cause
   when disconnecting a user from the WebGUI
-  Added option to Captive Portal to include idle time in total session
   time
-  Fix bandwidth limitation settings in Captive Portal MAC passthrough
-  Fixed links to view current Captive Portal page for all interfaces
   `#6391 <https://redmine.pfsense.org/issues/6391>`__
-  Converted Captive Portal active sessions to a sortable table
-  Added code to hide the client MAC address column in Captive Portal
   status when MAC filtering is disabled, rather than displaying an
   empty column
-  Added popup with session details to the Captive Portal active
   sessions list on the status page
-  Added button to disconnect all Captive Portal users
-  Worked around race condition between captiveportal_disconnect_all()
   and captiveportal_prune_old()
-  Added locking to avoid race conditions between rc.prunecaptiveportal
   and captiveportal_disconnect_all()
-  Reworked logging and RADIUS accounting when disabling a Captive
   Portal zone or rebooting
-  Increased speed of captiveportal_disconnect_all()

Dynamic DNS
-----------

-  Added the ability to change the URL queried by Dynamic DNS entries to
   check the external IP address (Services > Dynamic DNS, Check IP
   Services tab) `#6591 <https://redmine.pfsense.org/issues/6591>`__
-  Added support for All-Inkl Dynamic DNS provider
-  Added support for duiadns.net Dynamic DNS provider
-  Added support for CloudFlare Proxy to Dynamic DNS
-  Added Cloudflare Dynamic DNS IPv6 support
   `#6623 <https://redmine.pfsense.org/issues/6623>`__
-  Fixed status checking on Dynamic DNS (RFC2136), updates were always
   considered successful even on failure
   `#6357 <https://redmine.pfsense.org/issues/6357>`__
-  Fixed handling of multiple RFC2136 entries
   `#6153 <https://redmine.pfsense.org/issues/6153>`__
-  Fixed links in RFC2136 entries in the Dynamic DNS widget
   `#7126 <https://redmine.pfsense.org/issues/7126>`__
-  Fixed HTTP header processing for Dynamic DNS updates
-  Fixed handling of custom IPv6 Dynamic DNS in the widget
   `#6922 <https://redmine.pfsense.org/issues/6922>`__
-  Changed Cloudflare and Gratis plus Dynamic DNS to store passwords in
   base64
-  Updated Route 53 Dynamic DNS to fix several reported issues
   `#3973 <https://redmine.pfsense.org/issues/3973>`__
   `#6751 <https://redmine.pfsense.org/issues/6751>`__
   `#5054 <https://redmine.pfsense.org/issues/5054>`__
-  Fixed handling of ZoneEdit Dynamic DNS when used with a CARP VIP
   `#6992 <https://redmine.pfsense.org/issues/6992>`__
-  Removed excess loops from the Dynamic DNS Widget

Gateways / Routing
------------------

-  Added the ability to disable gateway monitoring actions without
   disabling gateway monitoring
   `#3151 <https://redmine.pfsense.org/issues/3151>`__
-  Changed gateway notifications to notify by email and syslog when a
   gateway goes up or down
-  Improved gateway notification mechanisms
-  Fixed handling of deleting or disabling static default gateways so
   they are properly removed from the routing table
   `#6659 <https://redmine.pfsense.org/issues/6659>`__
-  Fixed L2TP WAN dynamic gateway naming
   `#6980 <https://redmine.pfsense.org/issues/6980>`__
-  Fixed status display for unmonitored gateways
-  Fixed static blackhole route handling
-  Fixed handling of long hostnames on Diagnostics > Routes
   `#6869 <https://redmine.pfsense.org/issues/6869>`__
-  Corrected behavior of disabled static routes
   `#3560 <https://redmine.pfsense.org/issues/3560>`__
-  Created a PHP Shell playback script to view the gateway status from
   the shell and status output
   `#7046 <https://redmine.pfsense.org/issues/7046>`__

Notifications
-------------

-  Fixed SMTP settings test so it properly displays results
-  Fixed validation of secure SMTP Connection Modes (SSL/TLS and
   STARTTLS are mutually exclusive)
-  Removed validation of password mismatches when SMTP or Growl
   notifications are disabled
   `#7129 <https://redmine.pfsense.org/issues/7129>`__
-  Changed format of file_notice() alerts in webgui for easier reading

Graphs / Monitoring
-------------------

-  Changed traffic graphs to use d3.js (Dashboard and Status > Traffic
   Graphs)
-  Moved export button to heading for Status > Monitoring page
-  Moved graph lables so long hostnames do not overlap as easily
   `#6138 <https://redmine.pfsense.org/issues/6138>`__
-  Improved error checking in case JSON isn't returned when building
   graphs `#6748 <https://redmine.pfsense.org/issues/6748>`__
-  Added a missing RRD step value to lookup table
   `#6860 <https://redmine.pfsense.org/issues/6860>`__
-  Added support for multiple views in Status > Monitoring graphs (Adds
   tab shortcuts to different graph views)
-  Added a per-view "Refresh Interval" option to Status > Monitoring
   graphs
-  Fixed fix null acronyms and axis label for queues/queuedrops graph in
   Status > Monitoring
-  Enabled Area and Bar graph types for Status > Monitoring graphs

WebGUI
------

-  Added an option to allow display of the firewall hostname on the
   login page
-  Added filtering to widgets where appropriate
-  Standardized PHP memory limit configuration
-  Fixed formatting issues with the Installed Packages widget
   `#6601 <https://redmine.pfsense.org/issues/6601>`__
-  Improved Compact-RED theme
-  Changed service running/stopped icons
-  Fixed issues with JavaScript confirmation prompts missing words (e.g.
   "Are you sure you wish to?")
   `#6972 <https://redmine.pfsense.org/issues/6972>`__
-  Fixed issues with packages that toggle visibility of advanced options
   areas `#7100 <https://redmine.pfsense.org/issues/7100>`__
-  Removed the crash reporter link from the dashboard when a user does
   not have crash_reporter page access
   `#7043 <https://redmine.pfsense.org/issues/7043>`__
-  Fixed display of Package installation message
   `#7226 <https://redmine.pfsense.org/issues/7226>`__
-  Fixed "" tag processing in package XML handling
-  Fixed inconsistent handling of empty/null configuration settings in
   config.xml `#6893 <https://redmine.pfsense.org/issues/6893>`__

Logging
-------

-  Increased filtering tail limit for logging to ensure enough entries
   will be displayed `#6652 <https://redmine.pfsense.org/issues/6652>`__
-  Added a means for packages to request a syslogd socket inside a
   chroot environment
   `#4898 <https://redmine.pfsense.org/issues/4898>`__
-  Added BIND logging to proper facility
   `#5524 <https://redmine.pfsense.org/issues/5524>`__
-  Improved handling of the TFTP Proxy/xinetd process when it is
   disabled, to reduce log messages
   `#6308 <https://redmine.pfsense.org/issues/6308>`__

Misc
----

-  Updated simplepie (RSS Parsing library) to 1.4.3
-  Fixed storing of IPv6 addresses so they are always saved in lower
   case `#6864 <https://redmine.pfsense.org/issues/6864>`__
-  Fixed bsnmpd "printcap" log errors
   `#6838 <https://redmine.pfsense.org/issues/6838>`__
-  Fixed a foreach error when restoring a configuration without packages
-  Fixed handling of signal traps in the console menu
   `#6741 <https://redmine.pfsense.org/issues/6741>`__
-  Fixed "Goto line #" action on diag_edit.php so pressing the enter
   key also activates the function
-  Changed the PHP Execute feature of Diagnostics > Command so that it
   does not generate a crash report from a syntax error
   `#6702 <https://redmine.pfsense.org/issues/6702>`__
-  Added enable link to Status > UPnP & NAT-PMP error message if
   disabled `#6689 <https://redmine.pfsense.org/issues/6689>`__
-  Changed the time zone help text to clarify and warn against the use
   of the Etc time zones that use POSIX style signs, which are the
   opposite of what most users expect
   `#7089 <https://redmine.pfsense.org/issues/7089>`__
-  Added validation to prevent duplicate Wake on LAN entries
-  Fixed permissions on /var/tmp when /var is a RAM disk
   `#7120 <https://redmine.pfsense.org/issues/7120>`__
-  Added a fallback for get_pkg_info() to use pkg info if there is no
   local copy of the repository catalog
-  Removed spurious output from the PHP Shell executable when running a
   playback script from a command prompt
   `#7045 <https://redmine.pfsense.org/issues/7045>`__
-  Updated status.php with new info and changed its output organization
   `#7246 <https://redmine.pfsense.org/issues/7246>`__

