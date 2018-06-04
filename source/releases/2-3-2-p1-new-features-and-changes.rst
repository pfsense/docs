.. include:: /substitutions.rsti

2.3.2-p1 New Features and Changes
=================================

2.3.2 Update 1
--------------

-  `FreeBSD-SA-16:26.openssl <https://www.freebsd.org/security/advisories/FreeBSD-SA-16:26.openssl.asc>`__
   - Multiple vulnerabilities in OpenSSL. The only significant impact on
   pfSense is OCSP for HAproxy and FreeRADIUS.
-  Several HyperV-related Errata in FreeBSD 10.3, FreeBSD-EN-16:10
   through 16:16. See
   https://www.freebsd.org/relnotes/10-STABLE/errata/errata.html for
   details.
-  Several built-in packages and libraries have been updated, including:

   -  PHP to 5.6.26
   -  libidn to 1.33
   -  curl to 7.50.3
   -  libxml2 to 2.9.4

-  The hardware serial number is now displayed in the system information
   widget, or a host UUID if a serial number is not found. This is for
   display purposes and facilitates users seeking support in identifying
   their hardware.
-  Added encoding to the 'zone' parameter on Captive Portal pages.
-  Added output encoding to diag\_dns.php for results returned from DNS.
   `#6737 <https://redmine.pfsense.org/issues/6737>`__
-  Worked around a Chrome bug with regular expression parsing of escaped
   characters within character sets. Fixes “Please match the requested
   format” on recent Chrome versions.
   `#6762 <https://redmine.pfsense.org/issues/6762>`__
-  Fixed DHCPv6 server time format option
   `#6640 <https://redmine.pfsense.org/issues/6640>`__
-  Fixed /usr/bin/install missing from new installations.
   `#6643 <https://redmine.pfsense.org/issues/6643>`__
-  Increased filtering tail limit for logging so searching will locate
   sufficient entries.
   `#6652 <https://redmine.pfsense.org/issues/6652>`__
-  Cleaned up Installed Packages widget and HTML.
   `#6601 <https://redmine.pfsense.org/issues/6601>`__
-  Fixed widget settings corruption when creating new settings.
   `#6669 <https://redmine.pfsense.org/issues/6669>`__
-  Fixed various typos and wording errors.
-  Removed defunct links to the devwiki site. Everything is on
   https://doc.pfsense.org now.
-  Added a field to CA/Cert pages for OU, which is required by some
   external CAs and users.
   `#6672 <https://redmine.pfsense.org/issues/6672>`__
-  Fixed a redundant HTTP “User-Agent” string in DynDNS updates.
-  Fixed the font for sortable tables.
-  Added a check to verify if an interface is active in a gateway group
   before updating dynamic DNS.
-  Fixed wording of the “Reject leases from” option for a DHCP interface
   (it can only take addresses, not subnets.)
   `#6646 <https://redmine.pfsense.org/issues/6646>`__
-  Fixed error reporting for SMTP settings test.
-  Fixed saving of country, provider, and plan values for PPP interfaces
-  Fixed checking of invalid “Go To Line” numbers on diag\_edit.php.
   `#6704 <https://redmine.pfsense.org/issues/6704>`__
-  Fixed off-by-one error with “Rows to Display” on diag\_routes.php.
   `#6705 <https://redmine.pfsense.org/issues/6705>`__
-  Fixed description of the filter box on diag\_routes.php to reflect
   that all fields are searchable.
   `#6706 <https://redmine.pfsense.org/issues/6706>`__
-  Fixed description of the box for the file to edit on diag\_edit.php.
   `#6703 <https://redmine.pfsense.org/issues/6703>`__
-  Fixed description of the main panel on diag\_resetstate.php.
   `#6709 <https://redmine.pfsense.org/issues/6709>`__
-  Fixed warning dialog when a box is unchecked on diag\_resetstate.php.
   `#6710 <https://redmine.pfsense.org/issues/6710>`__
-  Fixed log shortcut for DHCP6 areas.
   `#6700 <https://redmine.pfsense.org/issues/6700>`__
-  Fixed the network delete button showing when only one row was present
   on services\_unbound\_acls.php
   `#6716 <https://redmine.pfsense.org/issues/6716>`__
-  Fixed disappearing help text on repeatable rows when the last row is
   deleted. `#6716 <https://redmine.pfsense.org/issues/6716>`__
-  Fixed dynamic DNS domain for static map DHCP entries
-  Added control to set dashboard widget refresh period
-  Added “-C /dev/null” to the dnsmasq command line parameters to avoid
   it picking up an incorrect default configuration which would override
   our options. `#6730 <https://redmine.pfsense.org/issues/6730>`__
-  Added “-l” to traceroute6 to show both IP Addresses and Hostnames
   when resolving hops on diag\_traceroute.php.
   `#6715 <https://redmine.pfsense.org/issues/6715>`__
-  Added note about max ttl/hop limit in source comment on
   diag\_traceroute.php.
-  Clarified language on diag\_tables.php.
   `#6713 <https://redmine.pfsense.org/issues/6713>`__
-  Cleaned up the text on diag\_sockets.php.
   `#6708 <https://redmine.pfsense.org/issues/6708>`__
-  Fixed display of VLAN interface names during console assignment.
   `#6724 <https://redmine.pfsense.org/issues/6724>`__
-  Fixed domain-name-servers option showing twice in pools when set
   manually.
-  Fixed handling of DHCP options in pools other than the main range.
   `#6720 <https://redmine.pfsense.org/issues/6720>`__
-  Fixed missing hostnames in some cases with dhcpdv6.
   `#6589 <https://redmine.pfsense.org/issues/6589>`__
-  Improved pidfile handling for dhcpleases.
-  Added checks to prevent accessing an undefined offset in IPv6.inc.
-  Fixed the display of the alias popup and edit options on source and
   destination for both the address and port on outbound NAT.
-  Fixed handling of backup config count.
   `#6771 <https://redmine.pfsense.org/issues/6771>`__
-  Removed some dangling PPTP references that are no longer relevant.
-  Fixed up/caught up remote syslog areas. Added “routing”, “ntpd”,
   “ppp”, “resolver”, fixed “vpn” to include all VPN areas (IPsec,
   OpenVPN, L2TP, PPPoE Server).
   `#6780 <https://redmine.pfsense.org/issues/6780>`__
-  Fixed missing checkboxes in some cases when adding rows on
   services\_ntpd.php.
   `#6788 <https://redmine.pfsense.org/issues/6788>`__
-  Revised service running/stopped icons.
-  Added a check to CRL management to remove certificates from the
   drop-down list that are already contained in the CRL being edited.
-  Fixed rule separators moving when multiple firewall rules are deleted
   at the same time. `#6801 <https://redmine.pfsense.org/issues/6801>`__

