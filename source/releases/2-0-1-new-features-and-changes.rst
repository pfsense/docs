2.0.1 New Features and Changes
==============================

This is a maintenance release with some bug and security fixes since 2.0
release. It is possible to upgrade from any previous release to 2.0.1.

For those who use the built in certificate manager, pay close attention
to the notes below on a potential security issue with those
certificates.

Change Log
----------

The following changes were made after 2.0-RELEASE and were included in
2.0.1-RELEASE.

-  Improved accuracy of automated state killing in various cases
   (`#1421 <https://redmine.pfsense.org/issues/1421>`__)
-  Various fixes and improvements to relayd

   -  Added to Status > Services and widget
   -  Added ability to kill relayd when restarting
      (`#1913 <https://redmine.pfsense.org/issues/1913>`__)
   -  Added DNS load balancing
   -  Moved relayd logs to their own tab
   -  Fixed default SMTP monitor syntax and other send/expect syntax

-  Fixed path to FreeBSD packages repo for 8.1
-  Various fixes to syslog:

   -  Fixed syslogd killing/restarting to improve handling on some
      systems that were seeing GUI hangs resetting logs
   -  Added more options for remote syslog server areas
   -  Fixed handling of 'everything' checkbox
   -  Moved wireless to its own log file and tab

-  Removed/silenced some irrelevant log entries
-  Fixed various typos
-  Fixes for RRD upgrade/migration and backup
   (`#1758 <https://redmine.pfsense.org/issues/1758>`__)
-  Prevent users from applying NAT to CARP which would break CARP in
   various ways (`#1954 <https://redmine.pfsense.org/issues/1954>`__)
-  Fixed policy route negation for VPN networks
   (`#1950 <https://redmine.pfsense.org/issues/1950>`__)
-  Fixed "Bypass firewall rules for traffic on the same interface"
   (`#1950 <https://redmine.pfsense.org/issues/1950>`__)
-  Fixed VoIP rules produced by the traffic shaper wizard
   (`#1948 <https://redmine.pfsense.org/issues/1948>`__)
-  Fixed uname display in System Info widget
   (`#1960 <https://redmine.pfsense.org/issues/1960>`__)
-  Fixed LDAP custom port handling
-  Fixed Status > Gateways to show RTT and loss like the widget
-  Improved certificate handling in OpenVPN to restrict certificate
   chaining to a specified depth – CVE-2011-4197
-  Improved certificate generation to specify/enforce type of
   certificate (CA, Server, Client) – CVE-2011-4197
-  Clarified text of serial field when importing a CA
   (`#2031 <https://redmine.pfsense.org/issues/2031>`__)
-  Fixed MTU setting on upgrade from 1.2.3, now upgrades properly as MSS
   adjustment (`#1886 <https://redmine.pfsense.org/issues/1886>`__)
-  Fixed Captive Portal MAC passthrough rules
   (`#1976 <https://redmine.pfsense.org/issues/1976>`__)
-  Added tab under Diagnostics > States to view/clear the source
   tracking table if sticky is enabled
-  Fixed CARP status widget to properly show "disabled" status.
-  Fixed end time of custom timespan RRD graphs
   (`#1990 <https://redmine.pfsense.org/issues/1990>`__)
-  Fixed situation where certain NICs would constantly cycle link with
   MAC spoofing and DHCP
   (`#1572 <https://redmine.pfsense.org/issues/1572>`__)
-  Fixed OpenVPN ordering of client/server IPs in Client-Specific
   Override entries (`#2004 <https://redmine.pfsense.org/issues/2004>`__)
-  Fixed handling of OpenVPN client bandwidth limit option
-  Fixed handling of LDAP certificates
   (`#2018 <https://redmine.pfsense.org/issues/2018>`__,
   `#1052 <https://redmine.pfsense.org/issues/1052>`__,
   `#1927 <https://redmine.pfsense.org/issues/1927>`__)
-  Enforce validity of RRD graph style
-  Fixed crash/panic handling so it will do textdumps and reboot for
   all, and not drop to a db> prompt.
-  Fixed handling of hostnames in DHCP that start with a number
   (`#2020 <https://redmine.pfsense.org/issues/2020>`__)
-  Fixed saving of multiple dynamic gateways
   (`#1993 <https://redmine.pfsense.org/issues/1993>`__)
-  Fixed handling of routing with unmonitored gateways
-  Fixed Firewall > Shaper, By Queues view
-  Fixed handling of spd.conf with no phase 2's defined
-  Fixed synchronization of various sections that were leaving the last
   item on the slave (IPsec phase 1, Aliases, VIPs, etc)
-  Fixed use of quick on internal DHCP rules so DHCP traffic is allowed
   properly (`#2041 <https://redmine.pfsense.org/issues/2041>`__)
-  Updated ISC DHCP server to 4.2.3
   (`#1888 <https://redmine.pfsense.org/issues/1888>`__) – this fixes a
   denial of service vulnerability in dhcpd.
-  Added patch to mpd to allow multiple PPPoE connections with the same
   remote gateway
-  Lowered size of CF images again fix newer and ever-shrinking CF
   cards.
-  Clarified text for media selection
   (`#1910 <https://redmine.pfsense.org/issues/1910>`__)

Notes for certificate generation vulnerability
----------------------------------------------

Certificates generated with the built-in certificate manager in all 2.0
versions prior to 2.0.1 are excessively permissive for non-CA
certificates. These certificates can be used as a certificate authority,
meaning a user can use their own certificate to create chained
certificates. We have defaulted OpenVPN on 2.0.1 and newer versions to
not accept chained certificates, which mitigates this. However, if
untrusted users have certificates generated from 2.0 release, we suggest
re-generating all certificates and issuing new ones. Certificates
generated by easy-rsa and imported into 2.0 are not affected. If using
certificates generated on pfSense® for other purposes, revoke those and
issue new certificates generated on 2.0.1. A CRL must be utilized in
that case. To be on the safe side, start from scratch with a new CA and
certificates after deleting all existing ones. Thanks to Florent
Daigniere for bringing this issue to our attention and helping confirm
our resolution.

Upgrade considerations
----------------------

It is very important to read the :doc:`Upgrade Guide </install/upgrade-guide>`
before performing an upgrade for those still on 1.2.x versions.

