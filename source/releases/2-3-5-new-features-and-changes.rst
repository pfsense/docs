.. include:: /substitutions.rsti

2.3.5 New Features and Changes
==============================

2.3.x is a Security and Errata maintenance release. 2.4.x is the primary
stable supported branch. If the firewall hardware is capable of running
2.4.x, consider upgrading to that release instead.

Updating to 2.3.5 from 2.3.4 on an amd64 installation that could
otherwise use 2.4.x requires configuring the firewall to stay on 2.3.x
as follows:

-  Navigate to **System > Update**, **Update Settings** tab
-  Set **Branch** to **Security / Errata Only**
-  Navigate back to the **Update** tab to see the latest 2.3.x update

If the update system offers an upgrade to 2.3.5 but the upgrade will not
proceed, ensure the firewall has correct versions of the repository
configuration and upgrade script for 2.3.x by running the following
commands from the console or shell::

  pkg install -fy pfSense-repo pfSense-upgrade

Firewalls running 32-bit (i386) installations of pfSense software do not
need to take any special actions to remain on 2.3.x as they are unable
to run later versions.

Operating System / Architecture changes
---------------------------------------

-  Upgrade of base OS to FreeBSD **10.3-RELEASE-p20**
-  Fixed issues with major version base upgrades via pkg

Security / Errata
-----------------

-  `pfSense-SA-17\_07.packages <https://www.pfsense.org/security/advisories/pfSense-SA-17_07.packages.asc>`__
-  Fixes for the set of WPA2 Key Reinstallation Attack issues commonly
   known as `KRACK <https://www.krackattacks.com/>`__ in wpa\_supplicant
   and hostapd
   (`FreeBSD-SA-17:07.wpa <https://www.freebsd.org/security/advisories/FreeBSD-SA-17:07.wpa.asc>`__)
-  A number of base system packages have been updated to address
   security issues, including `dnsmasq,
   perl <https://www.netgate.com/blog/no-plan-survives-contact-with-the-internet.html>`__,
   cURL, and others.

Interfaces
----------

-  Added support for the IPv6 AUTO\_LINKLOCAL flag on bridge interfaces
-  Added an option to use static IPv6 over an IPv4 PPP parent (e.g.
   PPPoE) `#7598 <https://redmine.pfsense.org/issues/7598>`__
-  Added IPv6 Prefix Delegation interface selection
-  Improved input validation for GIF interfaces
   `#7789 <https://redmine.pfsense.org/issues/7789>`__

Dashboard
---------

-  Rewrote Dashboard AJAX updating in a centralized and optimized way to
   reduce load, improve accuracy, and increase speed
-  Added a new Customer Support dashboard widget, enabled by default and
   on upgrade
-  Changed the way AJAX updates are handled on the Dashboard widgets to
   improve efficiency and fix issues with some widgets refreshing in a
   timely manner
-  Changed how pkg metadata is handled to reduce the load on the
   Dashboard and reduce unnecessary calls to the pkg server for the
   System Information dashboard widget update check, and for the
   Installed Packages dashboard widget
-  Improved error checking to prevent dashboard widget parsing errors
-  Fixed a variable conflict in the NTP Status Dashboard widget
   `#7795 <https://redmine.pfsense.org/issues/7795>`__
-  Fixed a problem with the Picture Dashboard widget when it does not
   have a picture defined
   `#7896 <https://redmine.pfsense.org/issues/7896>`__
-  Changed IPsec Dashboard Widget tunnel status to handle newer
   strongSwan childid format
   `#7499 <https://redmine.pfsense.org/issues/7499>`__
-  Fixed time display for UTC in the NTP Dashboard Widget
   `#7714 <https://redmine.pfsense.org/issues/7714>`__

WebGUI
------

-  Changed the design of the login page for the WebGUI to a more modern
   style, with several color choices available
-  Added URL fingerprinting to JavaScript and CSS file references to
   improve client-side behavior when files change between versions
   `#7251 <https://redmine.pfsense.org/issues/7251>`__
-  Updated Logo to the new logo and made it a vectorized SVG image for
   better scaling
-  Updated favicon to the new logo and added multiple sizes for
   different platforms
-  Added an option for sorting the Interfaces menu by description
-  Added “auth\_check” type of simple test that a page can use to verify
   a user is logged in and has access, using less cpu, which is better
   for AJAX data polling
-  Improved handling of PHP errors for user-entered PHP code on
   diag\_command.php
-  Changed Interfaces menu “(Assign)” to “Assignments” and added support
   for menu divider bars
-  Fixed automatic selection of '128' as prefix/mask for IPv6 address
   fields `#7625 <https://redmine.pfsense.org/issues/7625>`__
-  Replaced Math.trunc with Math.floor to make IE properly handle
   traffic graphs `#7804 <https://redmine.pfsense.org/issues/7804>`__
-  Changed nginx configuration so it does not allow direct download of
   .inc files `#8005 <https://redmine.pfsense.org/issues/8005>`__
-  Fixed hostname input handling on diag\_dns.php

Gateways
--------

-  Added a delay to allow dpinger time to properly initialize before
   using results
-  Added a log message when gateway alarms are raised/cleared to show
   the parameters that triggered the alarm
-  Reset All States on WAN IP Change option
   `#1629 <https://redmine.pfsense.org/issues/1629>`__

Rules/NAT/Shaper
----------------

-  Fixed handling of Port Forwards so they do not make up new
   destination information when a configured against a DHCP interface
   that does not currently have an address
-  Fixed ALTQ Traffic Shaper PRIQ priority number validation

IPsec
-----

-  Added an option to set the Rekey Margin for IPsec tunnels in the
   Phase 1 settings
-  Added RADIUS accounting support for mobile IPsec when accounting is
   enabled on the Authentication Server entry
-  Added checks to prevent simultaneous/repeated calling of
   vpn\_ipsec\_configure() by /etc/rc.newipsecdns

Misc
----

-  Fixed an issue with installing packages from a backup when restoring
   using the External Configuration Locater on the first boot
   post-install `#7914 <https://redmine.pfsense.org/issues/7914>`__
-  Fixed handling of forced Dynamic DNS hostnames for DHCPv6 static
   mappings `#7324 <https://redmine.pfsense.org/issues/7324>`__
-  Fixed several issues with cron job updating and removal
-  Added the device serial/id to the console and SSH menu banner
   `#7968 <https://redmine.pfsense.org/issues/7968>`__
-  Changed /etc/hosts such that the FQDN is listed first, except for
   localhost, so that dnsmasq will properly reverse resolve hostnames
   `#7771 <https://redmine.pfsense.org/issues/7771>`__

