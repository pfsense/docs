2.4.2-p1 New Features and Changes
=================================

New features and changes for this release of pfSense® software:

Security / Errata
-----------------

-  Updated OpenSSL to address CVE-2017-3737 and CVE-2017-3738
   `FreeBSD-SA-17:12.openssl <https://www.freebsd.org/security/advisories/FreeBSD-SA-17:12.openssl.asc>`__
-  Fixed a potential authenticated command execution issue in
   certificate data handling
   `#8153 <https://redmine.pfsense.org/issues/8153>`__
   `pfSense-SA-17_10.packages.asc <https://www.pfsense.org/security/advisories/pfSense-SA-17_10.packages.asc>`__
-  Fixed a potential XSS issue in status_filter_reload.php
   `#8143 <https://redmine.pfsense.org/issues/8143>`__
   `pfSense-SA-17_11.packages.asc <https://www.pfsense.org/security/advisories/pfSense-SA-17_11.packages.asc>`__

Misc
----

-  Fixed an issue with the subnet mask not being preserved properly when
   editing existing 1:1 NAT entries
   `#8112 <https://redmine.pfsense.org/issues/8112>`__
-  Fixed an indexing issue when deleting Host Override entries from the
   DNS Forwarder `#8159 <https://redmine.pfsense.org/issues/8159>`__
-  Fixed logging for L2TP and PPPoE server login/logout events
   `#8164 <https://redmine.pfsense.org/issues/8164>`__
-  Removed ix from the ALTQ interface list since ALTQ support for the ix
   driver is not currently viable
   `#7378 <https://redmine.pfsense.org/issues/7378>`__
-  Fixed a premature session timeout issue on pages which update
   exclusively using AJAX, such as status_graph.php
   `#8116 <https://redmine.pfsense.org/issues/8116>`__
-  Fixed ping_hosts.sh so it does not unnecessarily run a CARP check
   when there are no IPsec hosts to ping
   `#8172 <https://redmine.pfsense.org/issues/8172>`__
-  Fixed a missing global variable declaration in interface IP address
   detection
-  Fixed issues with local authentication when using translated
   languages

