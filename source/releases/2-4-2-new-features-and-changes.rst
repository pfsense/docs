.. include:: /substitutions.rsti

2.4.2 New Features and Changes
==============================

Security / Errata
-----------------

-  Updated to OpenSSL 1.0.2m to address `CVE-2017-3736 and
   CVE-2017-3735 <https://www.openssl.org/news/secadv/20171102.txt>`__
-  `FreeBSD-SA-17:10.kldstat <https://www.freebsd.org/security/advisories/FreeBSD-SA-17:10.kldstat.asc>`__
-  `FreeBSD-SA-17:08.ptrace <https://www.freebsd.org/security/advisories/FreeBSD-SA-17:08.ptrace.asc>`__
-  Fixed a potential XSS vector in status_monitoring.php
   `#8037 <https://redmine.pfsense.org/issues/8037>`__
   `pfSense-SA-17_07.packages.asc <https://www.pfsense.org/security/advisories/pfSense-SA-17_07.packages.asc>`__
-  Fixed a potential XSS vector in diag_dns.php
   `#7999 <https://redmine.pfsense.org/issues/7999>`__
   `pfSense-SA-17_08.webgui.asc <https://www.pfsense.org/security/advisories/pfSense-SA-17_08.webgui.asc>`__
-  Fixed a potential XSS vector on index.php via widget sequence
   parameters `#8000 <https://redmine.pfsense.org/issues/8000>`__
   `pfSense-SA-17_09.webgui.asc <https://www.pfsense.org/security/advisories/pfSense-SA-17_09.webgui.asc>`__
-  Fixed a potential XSS in the widgetkey parameter of multi-instance
   dashboard widgets `#7998 <https://redmine.pfsense.org/issues/7998>`__
   `pfSense-SA-17_09.webgui.asc <https://www.pfsense.org/security/advisories/pfSense-SA-17_09.webgui.asc>`__
-  Fixed a potential clickjacking issue in the CSRF error page

Interfaces
----------

-  Fixed PPP interfaces with a VLAN parent when using the new VLAN names
   `#7981 <https://redmine.pfsense.org/issues/7981>`__
-  Fixed issues with QinQ interfaces failing to show as active
   `#7942 <https://redmine.pfsense.org/issues/7942>`__
-  Fixed a panic/crash when disabling a LAGG interface
   `#7940 <https://redmine.pfsense.org/issues/7940>`__
-  Fixed issues with LAGG interfaces losing their MAC address
   `#7928 <https://redmine.pfsense.org/issues/7928>`__
-  Fixed a crash in radvd on SG-3100 (ARM)
   `#8022 <https://redmine.pfsense.org/issues/8022>`__
-  Fixed an issue with UDP packet drops on SG-1000
   `#7426 <https://redmine.pfsense.org/issues/7426>`__
-  Added an interface to manage the built-in switch on the SG-3100
-  Trimmed more characters off the interface description to avoid
   console menu output line wrapping on a VGA console
-  Fixed handling of the VIP uniqueid parameter when changing VIP types
-  Fixed PPP link parameter field display when a VLAN parent interface
   was selected `#8098 <https://redmine.pfsense.org/issues/8098>`__

Operating System
----------------

-  Fixed issues resulting from having a manually configured filesystem
   layout with a separate /usr slice
   `#8065 <https://redmine.pfsense.org/issues/8065>`__
-  Fixed issues updating ZFS systems created ZFS using an MBR partition
   scheme (empty /boot due to bootpool not being imported)
   `#8063 <https://redmine.pfsense.org/issues/8063>`__
-  Fixed issues with BGP sessions utilizing MD5 TCP signatures in
   routing daemon packages
   `#7969 <https://redmine.pfsense.org/issues/7969>`__
-  Updated dpinger to 3.0
-  Enhanced the update repository selection choices and methods
-  Updated the system tunables that tell the OS not harvest data from
   interrupts, point-to-point interfaces and Ethernet devices to reflect
   the new name/format for FreeBSD 11
-  Changed ruleset processing so that it retries if another process is
   in the middle of an update, rather than presenting an error to the
   user
-  Fixed some UEFI boot issues on various platforms

Certificates
------------

-  Fixed invalid entries in /etc/ssl/openssl.cnf (only affected
   non-standard usage of openssl in the cli/shell)
   `#8059 <https://redmine.pfsense.org/issues/8059>`__
-  Fixed LDAP authentication when the server uses a globally trusted
   root CA (new CA selection for "Global Root CA List")
   `#8044 <https://redmine.pfsense.org/issues/8044>`__
-  Fixed issues creating a certificate with a wildcard CN/SAN
   `#7994 <https://redmine.pfsense.org/issues/7994>`__
-  Added validation to the Certificate Manager to prevent importing a
   non-certificate authority certificate into the CA tab
   `#7885 <https://redmine.pfsense.org/issues/7885>`__

IPsec
-----

-  Fixed a problem using IPsec CA certificates when the subject contains
   multiple RDNs of the same type
   `#7929 <https://redmine.pfsense.org/issues/7929>`__
-  Fixed an issue with enabling IPsec mobile client support in
   translated languages
   `#8043 <https://redmine.pfsense.org/issues/8043>`__
-  Fixed issues with IPsec status display/output, including multiple
   entries (one disconnected, one connected)
   `#8003 <https://redmine.pfsense.org/issues/8003>`__
-  Fixed display of multiple connected mobile IPsec clients
   `#7856 <https://redmine.pfsense.org/issues/7856>`__
-  Fixed display of child SA entries
   `#7856 <https://redmine.pfsense.org/issues/7856>`__

OpenVPN
-------

-  Added an option for OpenVPN servers to utilize "redirect-gateway
   ipv6" to act as the default gateway for connecting VPN clients with
   IPv6, similar to "redirect-gateway def1" for IPv4.
   `#8082 <https://redmine.pfsense.org/issues/8082>`__
-  Fixed the OpenVPN Client Certificate Revocation List option
   `#8088 <https://redmine.pfsense.org/issues/8088>`__

Traffic Shaping
---------------

-  Fixed an error when configuring a limiter over 2Gb/s (new max is
   4Gb/s) `#7979 <https://redmine.pfsense.org/issues/7979>`__
-  Fixed issues with bridge network interfaces not supporting ALTQ
   `#7936 <https://redmine.pfsense.org/issues/7936>`__
-  Fixed issues with vtnet network interfaces not supporting ALTQ
   `#7594 <https://redmine.pfsense.org/issues/7594>`__
-  Fixed an issue with Status > Queues failing to display statistics for
   VLAN interfaces `#8007 <https://redmine.pfsense.org/issues/8007>`__
-  Fixed an issue with traffic shaping queues not allowing the total of
   all child queues to be 100%
   `#7786 <https://redmine.pfsense.org/issues/7786>`__
-  Fixed an issue with limiters given invalid fractional/non-integer
   values from limiter entries or passed to Captive Portal from RADIUS
   `#8097 <https://redmine.pfsense.org/issues/8097>`__

Rules/NAT
---------

-  Fixed selection of IPv6 gateways when creating a new firewall rule
   `#8053 <https://redmine.pfsense.org/issues/8053>`__
-  Fixed errors on the Port Forward configuration page resulting from
   stale/non-pfSense cookie/query data
   `#8039 <https://redmine.pfsense.org/issues/8039>`__
-  Fixed setting VLAN Priority via firewall rules
   `#7973 <https://redmine.pfsense.org/issues/7973>`__

XMLRPC
------

-  Fixed a problem with XMLRPC synchronization when the synchronization
   user has a password containing spaces
   `#8032 <https://redmine.pfsense.org/issues/8032>`__
-  Fixed XMLRPC Issues with Captive Portal vouchers
   `#8079 <https://redmine.pfsense.org/issues/8079>`__

WebGUI
------

-  Added an option to disable HSTS for the GUI web server
   `#6650 <https://redmine.pfsense.org/issues/6650>`__
-  Changed the GUI web service to block direct download of .inc files
   `#8005 <https://redmine.pfsense.org/issues/8005>`__
-  Fixed sorting of Services on the dashboard widget and Services Status
   page `#8069 <https://redmine.pfsense.org/issues/8069>`__
-  Fixed an input issue where static IPv6 entries allowed invalid input
   for address fields
   `#8024 <https://redmine.pfsense.org/issues/8024>`__
-  Fixed a JavaScript syntax error in traffic graphs when invalid data
   is encountered (e.g. user was logged out or session cleared)
   `#7990 <https://redmine.pfsense.org/issues/7990>`__
-  Fixed sampling errors in Traffic Graphs
   `#7966 <https://redmine.pfsense.org/issues/7966>`__
-  Fixed a JavaScript error on Status > Monitoring
   `#7961 <https://redmine.pfsense.org/issues/7961>`__
-  Fixed a display issue with empty tables on Internet Explorer 11
   `#7978 <https://redmine.pfsense.org/issues/7978>`__
-  Changed configuration processing to use an exception rather than
   die() when it detects a corrupted configuration
-  Added filtering to the pfTop page
-  Added a means for packages to display a modal to the user (e.g.
   reboot required before package can be used)

Dashboard
---------

-  Fixed display of available updates on the Installed Packages
   Dashboard widget `#8035 <https://redmine.pfsense.org/issues/8035>`__
-  Fixed a font issue in the Support Dashboard widget
   `#7980 <https://redmine.pfsense.org/issues/7980>`__
-  Fixed formatting of disk slices/partitions in the System Information
   Dashboard widget
-  Fixed an issue with the Pictures widget when there is no valid
   picture saved `#7896 <https://redmine.pfsense.org/issues/7896>`__

Packages
--------

-  Fixed display of packages which have been removed from the repository
   in the Package Manager
   `#7946 <https://redmine.pfsense.org/issues/7946>`__
-  Fixed an issue displaying locally installed packages when the remote
   package repository is unavailable
   `#7917 <https://redmine.pfsense.org/issues/7917>`__

Misc
----

-  Fixed interface binding in ntpd so it does not erroneously listen on
   all interfaces `#8046 <https://redmine.pfsense.org/issues/8046>`__
-  Fixed a problem where restarting the syslogd service would make
   sshlockout_pf process orphans
   `#7984 <https://redmine.pfsense.org/issues/7984>`__
-  Added support for the ClouDNS dynamic DNS provider
   `#7823 <https://redmine.pfsense.org/issues/7823>`__
-  Fixed an issue in the User and Group Manager pages when operating on
   entries immediately after deleting an entry
   `#7733 <https://redmine.pfsense.org/issues/7733>`__
-  Changed the setup wizard so it skips interface configuration when run
   on an AWS EC2 Instance
   `#6459 <https://redmine.pfsense.org/issues/6459>`__
-  Fixed an IGMP Proxy issue with All-multicast mode on SG-1000
   `#7710 <https://redmine.pfsense.org/issues/7710>`__

