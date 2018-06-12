.. include:: /substitutions.rsti

2.3.4 New Features and Changes
==============================

Security / Errata
-----------------

-  Updated base OS to FreeBSD 10.3-RELEASE-p19

-  FreeBSD/ports Security Advisories

   -  Updated ntpd to 4.2.8p10\_2 (
      `FreeBSD-SA-17:03.ntp.asc <https://www.freebsd.org/security/advisories/FreeBSD-SA-17:03.ntp.asc>`__
      )
   -  Updated cURL to 7.54.0 ( CVE-2017-7407, CVE-2017-7468 )
   -  Updated libevent to 2.1.8 ( CVE-2016-10197, CVE-2016-10196,
      CVE-2016-10195 )

-  pfSense Advisories

   -  Fixed encoding of displayed values from DHCP leases to prevent a
      badly formatted DHCP lease hostname from causing a potential XSS
      `#7497 <https://redmine.pfsense.org/issues/7497>`__ (
      `pfSense-SA-17\_04.webgui <https://pfsense.org/security/advisories/pfSense-SA-17_04.webgui.asc>`__
      )

-  See the Certificates section below for an important note about GUI
   certificate errors on Chrome 58 and later

Certificates
------------

-  Improved certificate generation to always include the CN as the first
   Subject Alternative Name (SAN), which fixes issues with Chrome 58+
   `#7496 <https://redmine.pfsense.org/issues/7496>`__

   -  To work around an error with the firewall GUI certificate on
      Chrome 58+, take one of the following actions:

      -  Generate and activate a new GUI certificate automatically, from
         the console/shell: pfSsh.php playback generateguicert
      -  Utilize the :doc:`ACME package </certificates/acme-package>` to generate a
         trusted certificate for the GUI via Let's Encrypt
      -  Create your own new CA/Server certificate and use that for the
         GUI
      -  Activate the local browser
         "`EnableCommonNameFallbackForLocalAnchors <https://www.chromium.org/administrators/policy-list-3#EnableCommonNameFallbackForLocalAnchors>`__"
         option in Chrome 58 (this setting will be removed by Chrome
         eventually, so this is only a temporary fix)

-  Fixed linking of a certificates to its CA after submitting the signed
   version of a CSR `#7512 <https://redmine.pfsense.org/issues/7512>`__

Firewall Rules/NAT/Shaper
-------------------------

-  Fixed restarting the Load Balancer (relayd) clearing system
   tables/aliases `#7396 <https://redmine.pfsense.org/issues/7396>`__
-  Fixed ruleset generation to notify when an unresolvable alias is
   encountered by the parser
   `#7421 <https://redmine.pfsense.org/issues/7421>`__
-  Fixed handling of a rule using an empty port alias
   `#7428 <https://redmine.pfsense.org/issues/7428>`__
-  Fixed the traffic shaping wizard handling of SMB rules in Raise/Lower
   Other Protocols, it was producing an invalid rule
   `#7434 <https://redmine.pfsense.org/issues/7434>`__
-  Fixed handling of alias renaming after input validation
   `#7473 <https://redmine.pfsense.org/issues/7473>`__
-  Fixed handling of long rule descriptions
   `#7294 <https://redmine.pfsense.org/issues/7294>`__

Dashboard
---------

-  Improved formatting in the gateways widget by reducing the numeric
   precision of displayed values
   `#6841 <https://redmine.pfsense.org/issues/6841>`__
-  Fixed the NTP widget to show the server time instead of client time
   `#7245 <https://redmine.pfsense.org/issues/7245>`__
-  Added a "None" option to Widgets with filtering options
   `#7318 <https://redmine.pfsense.org/issues/7318>`__
-  Added PPPoE uptime display on the Interfaces dashboard widget
   `#6032 <https://redmine.pfsense.org/issues/6032>`__
-  Added filters to more dashboard widgets
   `#7122 <https://redmine.pfsense.org/issues/7122>`__
-  Added BIOS information to the System Information widget
-  Added Netgate Unique ID to the System Information widget

   -  This `identifier for support
      services <https://www.netgate.com/blog/pfsense-2-3-4-release-now-available.html>`__
      is only displayed on the Dashboard for information purposes and is
      **not** transmitted anywhere automatically by default. In the
      future, customers can use this identifier when requesting support
      information from our staff or systems.

Configuration
-------------

-  Fixed issues restoring a configuration containing packages when the
   firewall does not have Internet connectivity
   `#6594 <https://redmine.pfsense.org/issues/6594>`__
-  Fixed factory reset when Captive Portal has Vouchers enabled
   `#7508 <https://redmine.pfsense.org/issues/7508>`__
-  Cleaned up unused code in diag\_backup.php

Interfaces
----------

-  Changed interface handling so it retains the original vendor MAC
   address at power up when spoofing, so it can be restored without a
   reboot `#7011 <https://redmine.pfsense.org/issues/7011>`__
-  Fixed interface assignment of QinQ interfaces
   `#4669 <https://redmine.pfsense.org/issues/4669>`__
-  Fixed errors in PPP service provider selection when a country without
   providers is selected
   `#7399 <https://redmine.pfsense.org/issues/7399>`__
-  Fixed input handling when editing static IP address fields on
   interfaces `#7493 <https://redmine.pfsense.org/issues/7493>`__
-  Added the ability for DHCP Client WANs to specify a list of IP
   addresses from which to reject leases
   `#7510 <https://redmine.pfsense.org/issues/7510>`__

User Manager / Authentication
-----------------------------

-  Added a warning to system\_authservers.php to warn that RADIUS does
   not work with IPv6
   `#4154 <https://redmine.pfsense.org/issues/4154>`__
-  Added a status icon to the User Manager to show if a user is enabled
   or disabled `#7517 <https://redmine.pfsense.org/issues/7517>`__

General GUI
-----------

-  Added navigation links to breadcrumbs
   `#7099 <https://redmine.pfsense.org/issues/7099>`__
-  Improved service name support and error handling in pfSenseHelpers.js
   `#7445 <https://redmine.pfsense.org/issues/7445>`__

DHCP
----

-  Changed dhcpleases so it does not start when DHCP Relay is enabled
   `#6750 <https://redmine.pfsense.org/issues/6750>`__
-  Fixed checks for DHCP Relay being enabled/disabled so they are
   skipped when editing an additional pool

ARP / NDP
---------

-  Added the ability to delete NDP entries
   `#7513 <https://redmine.pfsense.org/issues/7513>`__
-  Added expiration field to NDP listing
   `#7514 <https://redmine.pfsense.org/issues/7514>`__

Misc
----

-  Fixed DNS issues when upgrading NanoBSD
   `#7345 <https://redmine.pfsense.org/issues/7345>`__
-  Fixed the Reset Demotion Status for CARP to function when the
   demotion value is negative
   `#7424 <https://redmine.pfsense.org/issues/7424>`__
-  Fixed editing of Host Overrides in the DNS Resolver/Forwarder pages
   `#7435 <https://redmine.pfsense.org/issues/7435>`__
-  Fixed service handling (start/stop/restart) for Captive Portal
   `#7444 <https://redmine.pfsense.org/issues/7444>`__
-  Fixed display of the ALTQ "queue" view in pfTop due to recent changes
   in the pfTop port `#7461 <https://redmine.pfsense.org/issues/7461>`__
-  Added support for the Dynamic DNS Client Hover
   `#7511 <https://redmine.pfsense.org/issues/7511>`__
-  Fixed UTF-8 handling in Base64 decoding on diag\_edit.php
-  Fixed handling of traffic graph data irregularities
   `#7515 <https://redmine.pfsense.org/issues/7515>`__
-  Added visual separation to the legend on the installed packages list
   `#7203 <https://redmine.pfsense.org/issues/7203>`__
-  Changed SMTP and Growl notification test to use the new, unsaved
   settings `#7516 <https://redmine.pfsense.org/issues/7516>`__

