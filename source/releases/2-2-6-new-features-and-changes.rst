.. include:: /substitutions.rsti

2.2.6 New Features and Changes
==============================

Security/Errata Notices
-----------------------

-  Updated to FreeBSD 10.1-RELEASE-p25

   -  `FreeBSD-SA-15:26.openssl <https://www.freebsd.org/security/advisories/FreeBSD-SA-15:26.openssl.asc>`__
      Multiple vulnerabilities in OpenSSL

-  Updated to strongSwan 5.3.5

   -  Includes fix for `CVE-2015-8023 authentication bypass
      vulnerability <https://www.strongswan.org/blog/2015/11/16/strongswan-vulnerability-(cve-2015-8023).html>`__
      in the eap-mschapv2 plugin.

-  `pfSense-SA-15\_09.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-15_09.webgui.asc>`__:
   Local File Inclusion Vulnerability in the pfSense WebGUI
-  `pfSense-SA-15\_10.captiveportal <https://www.pfsense.org/security/advisories/pfSense-SA-15_10.captiveportal.asc>`__:
   SQL Injection Vulnerability in the pfSense captive portal logout
-  `pfSense-SA-15\_11.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-15_11.webgui.asc>`__:
   Multiple XSS and CSRF Vulnerabilities in the pfSense WebGUI

Logging
-------

-  Fixed log duplication for some log entries.
   `#5606 <https://redmine.pfsense.org/issues/5606>`__

IPsec
-----

-  `strongSwan 5.3.5 update fixes several
   bugs <https://wiki.strongswan.org/projects/strongswan/wiki/Changelog53>`__.

Config sync
-----------

-  Fixed config synchronization failure in some circumstances.
   `#5509 <https://redmine.pfsense.org/issues/5509>`__

Captive Portal
--------------

-  Fixed captive portal database handling issue that could reset
   database instead of waiting for lock to clear.
   `#5622 <https://redmine.pfsense.org/issues/5622>`__
-  Fixed problem with 0 byte files in captive portal file manager.
   `#5642 <https://redmine.pfsense.org/issues/5642>`__
