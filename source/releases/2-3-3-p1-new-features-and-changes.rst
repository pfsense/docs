2.3.3-p1 New Features and Changes
=================================

The pfSense® software version 2.3.3-p1 errata release is a minor release after
:doc:`2.3.3 </releases/2-3-3-new-features-and-changes>` and contains beneficial
security and bug fixes.

Security / Errata
-----------------

-  Updated to FreeBSD 10.3-RELEASE-p17

   -  `FreeBSD-SA-17:02.openssl <https://www.freebsd.org/security/advisories/FreeBSD-SA-17:02.openssl.asc>`__
      (CVE-2016-7055, CVE-2017-3731, CVE-2017-3732)

-  Upgraded cURL to 7.53.0 (CVE-2017-2629)

Bug Fixes
---------

-  Fixed issues with the upgrade check seeing the version of
   pfSense-upgrade instead of pfSense in some circumstances.
   `#7343 <https://redmine.pfsense.org/issues/7343>`__
-  Fixed handling of domain-only (@ record) updates for CloudFlare
   Dynamic DNS `#7357 <https://redmine.pfsense.org/issues/7357>`__
-  Fixed a problem with the Dynamic DNS Widget where RFC2136 entries
   showed an incorrect status
   `#7290 <https://redmine.pfsense.org/issues/7290>`__
-  Fixed Dynamic DNS status widget formatting for medium with browser
   window `#7301 <https://redmine.pfsense.org/issues/7301>`__
-  Fixed a problem with HTML tags showing in certificate description
   drop-down lists in the Certificate Manager
   `#7296 <https://redmine.pfsense.org/issues/7296>`__
-  Fixed an error loading some older rules with ICMP types
   `#7299 <https://redmine.pfsense.org/issues/7299>`__
-  Fixed display of selected ICMP types for old rules without an
   ipprotocol option set
   `#7300 <https://redmine.pfsense.org/issues/7300>`__
-  Fixed Log widget filter interface selection with custom interface
   descriptions `#7306 <https://redmine.pfsense.org/issues/7306>`__
-  Fixed the widget Filter All button so it does not affect all widgets
   `#7317 <https://redmine.pfsense.org/issues/7317>`__
-  Fixed the password reset script so it resets the expiration date for
   the admin account when run, to avoid the user still being locked out
   `#7354 <https://redmine.pfsense.org/issues/7354>`__
-  Fixed the password reset script so it properly handles the case when
   the admin account has been removed from config.xml
   `#7354 <https://redmine.pfsense.org/issues/7354>`__
-  Fixed input validation of TCP State Timeout on firewall rules so it
   is not arbitrarily limited to a maximum of 3600 seconds
   `#7356 <https://redmine.pfsense.org/issues/7356>`__
-  Fixed console settings for XG-1540/XG-1541 to use the correct default
   console `#7358 <https://redmine.pfsense.org/issues/7358>`__
-  Fixed initial setup handling of VLAN interfaces when they were
   assigned at the console before running the Setup Wizard
   `#7364 <https://redmine.pfsense.org/issues/7364>`__
-  Fixed display of OpenSSL and input errors when working in the
   Certificate Manager
   `#7370 <https://redmine.pfsense.org/issues/7370>`__
-  Fixed Captive Portal "disconnect all" button
-  Fixed pkg handling timeouts
   `#6594 <https://redmine.pfsense.org/issues/6594>`__
-  Updated blog URL in the RSS widget
-  Removed whirlpool from the list of CA/certificate digest algorithms
   since it does not work
   `#7370 <https://redmine.pfsense.org/issues/7370>`__

