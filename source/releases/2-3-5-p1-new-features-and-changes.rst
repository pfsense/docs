2.3.5-p1 New Features and Changes
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
-  Fixed a potential clickjacking issue in the CSRF error page
-  Fixed a potential XSS issue in status_filter_reload.php
   `#8143 <https://redmine.pfsense.org/issues/8143>`__
   `pfSense-SA-17_11.packages.asc <https://www.pfsense.org/security/advisories/pfSense-SA-17_11.packages.asc>`__

Misc
----

-  Fixed an issue in the User and Group Manager pages when operating on
   entries immediately after deleting an entry
   `#7733 <https://redmine.pfsense.org/issues/7733>`__
-  Fixed sorting of Services on the dashboard widget and Services Status
   page `#8069 <https://redmine.pfsense.org/issues/8069>`__
-  Fixed display of available updates on the Installed Packages
   Dashboard widget `#8035 <https://redmine.pfsense.org/issues/8035>`__
-  Fixed display of packages which have been removed from the repository
   in the Package Manager
   `#7946 <https://redmine.pfsense.org/issues/7946>`__
-  Fixed the OpenVPN Client Certificate Revocation List option
   `#8088 <https://redmine.pfsense.org/issues/8088>`__
-  Fixed an issue with the Pictures widget when there is no valid
   picture saved `#7896 <https://redmine.pfsense.org/issues/7896>`__
-  Fixed an indexing issue when deleting Host Override entries from the
   DNS Forwarder `#8159 <https://redmine.pfsense.org/issues/8159>`__
-  Fixed a premature session timeout issue on pages which update
   exclusively using AJAX, such as status_graph.php
   `#8116 <https://redmine.pfsense.org/issues/8116>`__
-  Fixed ping_hosts.sh so it does not unnecessarily run a CARP check
   when there are no IPsec hosts to ping
   `#8172 <https://redmine.pfsense.org/issues/8172>`__
-  Fixed a missing global variable declaration in interface IP address
   detection

