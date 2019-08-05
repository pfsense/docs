2.3.5-p2 New Features and Changes
=================================

New features and changes for this release of pfSense® software:

Security / Errata
-----------------

-  FreeBSD SA for CVE-2018-8897
   `FreeBSD-SA-18:06.debugreg <https://www.freebsd.org/security/advisories/FreeBSD-SA-18:06.debugreg.asc>`__
-  FreeBSD EN for CVE-2018-6920 and CVE-2018-6921
   `FreeBSD-EN-18:05.mem <https://www.freebsd.org/security/advisories/FreeBSD-EN-18:05.mem.asc>`__
-  Fixed a potential XSS vector in RRD error output encoding
   `#8269 <https://redmine.pfsense.org/issues/8269>`__
   `pfSense-SA-18_01.packages <https://www.pfsense.org/security/advisories/pfSense-SA-18_01.packages>`__
-  Fixed a potential XSS vector in diag_system_activity.php output
   encoding `#8300 <https://redmine.pfsense.org/issues/8300>`__
   `pfSense-SA-18_02.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-18_02.webgui>`__
-  Fixed a potential LFI in pkg_mgr_install.php
   `#8485 <https://redmine.pfsense.org/issues/8485>`__
   `pfSense-SA-18_04.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-18_04.webgui>`__
-  Fixed a potential XSS in pkg_mgr_install.php
   `#8486 <https://redmine.pfsense.org/issues/8486>`__
   `pfSense-SA-18_05.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-18_05.webgui>`__
-  Changed sshd to use delayed compression
   `#8245 <https://redmine.pfsense.org/issues/8245>`__
-  Added encoding for firewall schedule range descriptions
   `#8259 <https://redmine.pfsense.org/issues/8259>`__

Misc
----

-  Added an option to disable HSTS for the GUI web server
   `#6650 <https://redmine.pfsense.org/issues/6650>`__
-  Added filtering to pfTop page
-  Added ospf6d to the routing log
-  Change get_interface_subnet() to use configured value if available
-  Corrected sethelp call on firewall_rules_edit.php
   `#8242 <https://redmine.pfsense.org/issues/8242>`__
-  Fixed an issue with selecting a gateway when switching a firewall
   rule away from IPv4+IPv6 mode
   `#8447 <https://redmine.pfsense.org/issues/8447>`__
-  Fixed an issue with the address familiy selection for remote syslog
   servers using IPv6
   `#8323 <https://redmine.pfsense.org/issues/8323>`__
-  Fixed a problem when IPsec bypasslan was enabled while the LAN
   interface is disabled or doesn't have an IP address
   `#8239 <https://redmine.pfsense.org/issues/8239>`__
-  Fixed config.xml corruption handling
-  Fixed input validation for Certificate SAN values to disallow IP
   addresses for FQDN/Hostname entries
   `#8275 <https://redmine.pfsense.org/issues/8275>`__
-  Fixed issues with OpenVPN when using a /31 IPv4 Tunnel Network
   `#8261 <https://redmine.pfsense.org/issues/8261>`__
-  Fixed NTP Status server time for zones with minute offsets (fractions
   of an hour) `#8129 <https://redmine.pfsense.org/issues/8129>`__
-  Fixed selection of IPv6 gateways when creating a new firewall rule
   `#8053 <https://redmine.pfsense.org/issues/8053>`__
-  Fixed various pf "busy" errors when the ruleset is reloaded
-  Improved handling of aliases that mix IP addresses and FQDNs
   `#8290 <https://redmine.pfsense.org/issues/8290>`__
-  Improved update repository controls
-  Increased the default Firewall Maximum Table Entries value to 400000
   to cope with the increased size of the IPv6 bogon address lists
   `#8417 <https://redmine.pfsense.org/issues/8417>`__
