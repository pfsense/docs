2.4.3 New Features and Changes
==============================

New features and changes for this release of pfSense® software:

Security / Errata
-----------------

-  `FreeBSD-SA-18:01.ipsec <https://security.freebsd.org/advisories/FreeBSD-SA-18:01.ipsec.asc>`__
-  Kernel PTI mitigations for Meltdown (optional tunable)
   `FreeBSD-SA-18:03.speculative_execution.asc <https://www.freebsd.org/security/advisories/FreeBSD-SA-18:03.speculative_execution.asc>`__
-  IBRS mitigation for Spectre V2 (requires updated CPU microcode)
   `FreeBSD-SA-18:03.speculative_execution.asc <https://www.freebsd.org/security/advisories/FreeBSD-SA-18:03.speculative_execution.asc>`__
-  Added a CPU Microcode update mechanism (cpuctl module,
   sysutils/devcpu-data port)
-  Imported a FreeBSD patch to fix boot issues when running as a
   hypervisor guest on AMD Family 15h processors (`FreeBSD PR
   #213155 <https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=213155>`__)
-  Added validation for RRD parameters to ensure passed filenames are
   valid `#8269 <https://redmine.pfsense.org/issues/8269>`__
-  Fixed a potential XSS vector in RRD error output encoding
   `#8269 <https://redmine.pfsense.org/issues/8269>`__
   `pfSense-SA-18_01.packages <https://www.pfsense.org/security/advisories/pfSense-SA-18_01.packages>`__
-  Fixed a potential XSS vector in diag_system_activity.php output
   encoding `#8300 <https://redmine.pfsense.org/issues/8300>`__
   `pfSense-SA-18_02.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-18_02.webgui>`__
-  Fixed a potential XSS vector in traffic_graphs.widget.php settings
   `#8302 <https://redmine.pfsense.org/issues/8302>`__
   `pfSense-SA-18_03.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-18_03.webgui>`__
-  Fixed a potential CSRF issue in service control request processing
   `#8296 <https://redmine.pfsense.org/issues/8296>`__
-  Enabled CSRF protection for all dashboard widgets
   `#8301 <https://redmine.pfsense.org/issues/8301>`__
-  Added encoding for firewall schedule range descriptions
   `#8259 <https://redmine.pfsense.org/issues/8259>`__

-  Changed sshd to use delayed compression
   `#8245 <https://redmine.pfsense.org/issues/8245>`__
-  Increased PHP-FPM resources on systems with over 1GB RAM to improve
   performance `#8125 <https://redmine.pfsense.org/issues/8125>`__
-  Imported a netstat fix for ARM platforms to improve performance and
   reduce CPU usage, especially on the Dashboard
   `#8237 <https://redmine.pfsense.org/issues/8237>`__
-  Fixed a memory leak in the pfSense_getall_interface_addresses()
   function in the pfSense PHP module
   `#8249 <https://redmine.pfsense.org/issues/8249>`__
-  Hardware support for the XG-7100, including:

   -  C3000 NIC support (factory installations only)
   -  C3000 SoC support (factory installations only)
   -  Marvell 88E6190 switch support (factory installations only)

Traffic Shaping / Limiters
--------------------------

-  Fixed hangs due to Limiters and pfsync in HA
   `#4310 <https://redmine.pfsense.org/issues/4310>`__
-  Added the Chelsio *cxl* driver to the list of ALTQ capable interfaces
   `#7607 <https://redmine.pfsense.org/issues/7607>`__
-  Fixed an issue with limiters that had fractional bandwidth values
   `#8091 <https://redmine.pfsense.org/issues/8091>`__
-  Changed status_queues.php to provide 'realtime' statistics
   `#8185 <https://redmine.pfsense.org/issues/8185>`__

IPsec
-----

-  Changed IPsec Phase 1 to allow selecting both IPv4 and IPv6 so the
   local side can allow inbound connections to either address family
   `#6886 <https://redmine.pfsense.org/issues/6886>`__
-  Changed IPsec Phase 1 to allow configuration of multiple IKE
   encryption algorithms, key lengths, hashes, and DH groups
   `#8186 <https://redmine.pfsense.org/issues/8186>`__
-  Fixed a problem when IPsec bypasslan was enabled while the LAN
   interface is disabled or doesn't have an IP address
   `#8239 <https://redmine.pfsense.org/issues/8239>`__
-  Added IPv6 LAN Network to the IPsec LAN bypass list
   `#8321 <https://redmine.pfsense.org/issues/8321>`__

OpenVPN
-------

-  Fixed an error message encountered by a few users when manually
   killing OpenVPN connections
   `#8266 <https://redmine.pfsense.org/issues/8266>`__
-  Added an OpenVPN tap bridge configuration option to push the bridged
   interface address to clients as a route-gateway for routes/redirects
   `#8267 <https://redmine.pfsense.org/issues/8267>`__
-  Added an option to the DNS Resolver which allows registering the CN
   of OpenVPN clients as hostnames
   `#6847 <https://redmine.pfsense.org/issues/6847>`__
-  Added an option to OpenVPN clients and servers to suppress creation
   of IPv4 or IPv6 gateway addresses for an interface
   `#6848 <https://redmine.pfsense.org/issues/6848>`__
-  Fixed issues with OpenVPN when using a /31 IPv4 Tunnel Network
   `#8261 <https://redmine.pfsense.org/issues/8261>`__
-  Updated the OpenVPN wizard with the current UDP and TCP protocol
   selections `#8298 <https://redmine.pfsense.org/issues/8298>`__
-  Added the interface for a VPN to the OpenVPN client and server list
   screens

Notifications
-------------

-  Changed SMTP notifications handling so they are batched, to avoid
   sending multiple e-mail messages in a short amount of time
   `#4031 <https://redmine.pfsense.org/issues/4031>`__
-  Added a notification when the firewall boot sequence is complete
   `#7643 <https://redmine.pfsense.org/issues/7643>`__

Dashboard
---------

-  Fixed issues with the IPsec dashboard widget causes GUI failure
   `#6318 <https://redmine.pfsense.org/issues/6318>`__
-  Changed the Dynamic DNS Widget so it shows the description of custom
   entries to identify them
   `#7843 <https://redmine.pfsense.org/issues/7843>`__
-  Fixed a reference to deprecated updateGatewayDisplays() function in
   the Gateways dashboard widget
   `#8303 <https://redmine.pfsense.org/issues/8303>`__
-  Added a setting to the temperature widget to display readings in
   Fahrenheit `8205 <https://redmine.pfsense.org/issues/8205>`__
-  Changed the picture widget so the picture is stored on the firewall
   filesystem and not in config.xml to reduce the size of backup data
   `#8371 <https://redmine.pfsense.org/issues/8371>`__

   -  On upgrade, pictures will be moved out of config.xml, so backup
      this file separately if it is important

DHCP
----

-  Added an option to the DHCP Server Dynamic DNS configuration to set
   the server key algorithm
   `#6621 <https://redmine.pfsense.org/issues/6621>`__
-  Added DDNS Client Updates option to DHCPv4
   `#7131 <https://redmine.pfsense.org/issues/7131>`__
-  Fixed handling of the DHCPv6 DDNS reverse zone key
   `#6319 <https://redmine.pfsense.org/issues/6319>`__
-  Fixed DHCPv4 static mappings so that multiple MAC for same DHCP
   address or hostname are allowed
   `#8220 <https://redmine.pfsense.org/issues/8220>`__
-  Fixed a potential issue in detecting primary/secondary node in a
   failover configuration
-  Improved DHCP relay destination interface discovery
-  Fixed DHCPv6 lease display for entries that were not parsed properly
   from the lease database
   `#7413 <https://redmine.pfsense.org/issues/7413>`__

Dynamic DNS
-----------

-  Added an option for RFC 2136 Dynamic DNS server key algorithm
   `#8244 <https://redmine.pfsense.org/issues/8244>`__
-  Added an option for RFC 2136 source address used to send updates
   `#8278 <https://redmine.pfsense.org/issues/8278>`__
-  Fixed issues with Dynamic DNS updates using a gateway group when the
   primary route is down
   `#8333 <https://redmine.pfsense.org/issues/8333>`__
-  Added GoDaddy Dynamic DNS provider

Interfaces / VIPs
-----------------

-  Fixed issues on assign_interfaces.php with large numbers of
   interfaces `#6400 <https://redmine.pfsense.org/issues/6400>`__
-  Fixed handling of CARP VIPs on disabled interfaces at boot time
   `#6677 <https://redmine.pfsense.org/issues/6677>`__
-  Fixed issues with radvd being enabled on a disconnected interface
   `#6974 <https://redmine.pfsense.org/issues/6974>`__
-  Fixed issues with rtsold on VLAN interfaces
   `#7412 <https://redmine.pfsense.org/issues/7412>`__
-  Fixed issues with dhcp6c lock files after unclean shutdown when using
   "Do not wait for an RA" on IPv6 WAN interface
   `#8106 <https://redmine.pfsense.org/issues/8106>`__
-  Added a feature to allow pppoe on a CARP VIP so it will only be
   active on whichever node is master
   `#8184 <https://redmine.pfsense.org/issues/8184>`__
-  Fixed an error when editing PPP interfaces on a system with no VIPs
   `#8322 <https://redmine.pfsense.org/issues/8322>`__
-  Added VLAN priority tagging for DHCPv6 client requests
   `#8200 <https://redmine.pfsense.org/issues/8200>`__
-  Added support for configuring the DUID type for an IPv6 interfaces
   `#8191 <https://redmine.pfsense.org/issues/8191>`__
-  Allow custom INIT string for PPP modem SIM Pin and APN settings
-  Added an indicator for disabled interfaces on status_interfaces.php
-  Fixed an issue with the PPP linkup and linkdown scripts and cellular
   modems
-  Fixed an issue where the combination of CARP with bridging could lead
   to a deadlock `#8056 <https://redmine.pfsense.org/issues/8056>`__

Packages
--------

-  Fixed reinstall process for missing packages
   `#8183 <https://redmine.pfsense.org/issues/8183>`__

Captive Portal
--------------

-  Fixed Pass-through MAC automatic additions so it does not add
   duplicate entries `#8226 <https://redmine.pfsense.org/issues/8226>`__
-  Fixed a missing global definition in Captive Portal pass-through MAC
   removal `#8238 <https://redmine.pfsense.org/issues/8238>`__
-  Fixed Captive Portal voucher sync errors when vouchers are expired or
   disconnected while the secondary node is master
   `#8317 <https://redmine.pfsense.org/issues/8317>`__
-  Fixed Captive Portal voucher synchronization between HA nodes
   `#7972 <https://redmine.pfsense.org/issues/7972>`__

Certificates
------------

-  Fixed automatic SAN handling when the CN of a certificate contains a
   space `#8252 <https://redmine.pfsense.org/issues/8252>`__
-  Fixed input validation for Certificate SAN values to disallow IP
   addresses for FQDN/Hostname entries
   `#8275 <https://redmine.pfsense.org/issues/8275>`__

Gateways/Routing
----------------

-  Fixed handling of the Router Lifetime value on
   services_router_advertisements.php so it allows a value of *0*
   `#7502 <https://redmine.pfsense.org/issues/7502>`__
-  Added ospf6d to the routing log
-  Allow recursive aliases to be used with static routes

Rules/NAT
---------

-  Fixed various pf "busy" errors when the ruleset is reloaded
-  Fixed issues with editing firewall rules in non-English languages
   that contain single quotes in translated strings
   `#8219 <https://redmine.pfsense.org/issues/8219>`__
-  Added an option to disable drag-and-drop of firewall and NAT rules
-  Added a check to prevent 1:1 NAT rules with missing information from
   being added to the ruleset
-  Added firewall rule tracking ID to rule list (in counter tooltip) and
   firewall rule edit page
   `#8348 <https://redmine.pfsense.org/issues/8348>`__
-  Fixed cases where automatic or scripted rules were not getting
   tracking IDs `#8353 <https://redmine.pfsense.org/issues/8353>`__
-  Added a check to prevent automatic outbound firewall rules with
   missing information from being added to the ruleset
   `#8360 <https://redmine.pfsense.org/issues/8360>`__

Users/Authentication
--------------------

-  Fixed issues with XMLRPC user account synchronization causing GUI
   inaccessibility on secondary HA nodes
   `#7469 <https://redmine.pfsense.org/issues/7469>`__
-  Fixed an issue where a user with no privileges could not logout
   `#8297 <https://redmine.pfsense.org/issues/8297>`__
-  Increased maximum username length from 16 to 32 characters to catch
   up to the current allowed length in FreeBSD
-  Fixed required field markings on LDAP authentication server
   configuration fields
   `#8337 <https://redmine.pfsense.org/issues/8337>`__
-  Fixed display of the LDAP host when testing the GUI authentication
   source `#8338 <https://redmine.pfsense.org/issues/8338>`__

Misc
----

-  Fixed NTP Status server time for zones with minute offsets (fractions
   of an hour) `#8129 <https://redmine.pfsense.org/issues/8129>`__
-  Added support for custom shutdown scripts in /usr/local/etc/rc.d
   `#8182 <https://redmine.pfsense.org/issues/8182>`__
-  Fixed a references to an undefined function while restoring a
   config.xml file from an older version
   `#8231 <https://redmine.pfsense.org/issues/8231>`__
-  Added support to diag_packet_capture.php to capture traffic on the
   loopback interface
   `#8257 <https://redmine.pfsense.org/issues/8257>`__
-  Fixed an issue with the RAM disk warning pop-up appearing when no
   changes were made `#8268 <https://redmine.pfsense.org/issues/8268>`__
-  Fixed an issue with the address family selection for remote syslog
   servers using IPv6
   `#8323 <https://redmine.pfsense.org/issues/8323>`__
-  Silenced warnings from sysctl that otherwise went to stderr
-  Added a disk size check to ZFS to prevent it from being used on disk
   which are too small to contain the OS and swap space
   `#7308 <https://redmine.pfsense.org/issues/7308>`__
-  Added a check to prevent pfSense-upgrade from running as a non-root
   user `#7762 <https://redmine.pfsense.org/issues/7762>`__
-  Added an option to disable the IGMP Proxy service
   `#8356 <https://redmine.pfsense.org/issues/8356>`__
-  Fixed an issue with package handling when restoring a configuration
   that contains a branch configuration that is not valid for the target
   system version `#8208 <https://redmine.pfsense.org/issues/8208>`__

