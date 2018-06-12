.. include:: /substitutions.rsti

2.4.1 New Features and Changes
==============================

Security / Errata
-----------------

-  Fixes for the set of WPA2 Key Reinstallation Attack issues commonly
   known as `KRACK <https://www.krackattacks.com/>`__
   `#7951 <https://redmine.pfsense.org/issues/7951>`__
-  Changed upgrade handling to use the pkg-static binary to prevent
   errors when moving to new major FreeBSD version
-  Fixed a VT console race condition panic at boot on VMware platforms
   (especially ESXi 6.5.0U1)
   `#7925 <https://redmine.pfsense.org/issues/7925>`__
-  Fixed a bsnmpd problem that causes it to use all available CPU and
   RAM with the hostres module in cases where disk drives are present
   without media inserted
   `#6882 <https://redmine.pfsense.org/issues/6882>`__
-  Fixed an upgrade problem due to FreeBSD 11 removing legacy ada
   aliases, which caused some older installs to fail when mounting root
   post-upgrade `#7937 <https://redmine.pfsense.org/issues/7937>`__
-  Changed the boot-time fsck process the ensure the disk is mounted
   read-only before running fsck in the preen mode.

Known Issues
------------

-  The VLAN changes mentioned in the **Interfaces** section may prevent
   PPP sessions from working on VLANs in some cases, see
   `#7981 <https://redmine.pfsense.org/issues/7981>`__

Interfaces
----------

-  Changed the VLAN interface names to use the 'dotted' format of
   FreeBSD, which is shorter and helps to keep the interface name
   smaller than the limit (16) This fixes the 4 digit VLAN issues when
   the NIC name is 6 bytes long.
-  Improved the 'Assign Interfaces' console process to automatically
   stop when there are no more interfaces to assign
-  Improved the 'Set interface IP address' console process to accept
   'IP/mask' notation
-  Fixed wireless client interfaces so they do not reconfigure wireless
   on a link up event, or else they can get stuck in a loop
   `#7960 <https://redmine.pfsense.org/issues/7960>`__
-  Fixed setting VLAN Priority in VLAN interface configuration
   `#7748 <https://redmine.pfsense.org/issues/7748>`__

Dashboard
---------

-  Fixed a problem with the Picture Dashboard widget when it does not
   have a picture defined
   `#7896 <https://redmine.pfsense.org/issues/7896>`__
-  Fixed time display for UTC in the NTP Dashboard Widget
   `#7714 <https://redmine.pfsense.org/issues/7714>`__
-  Fixed an IPsec widget error when it would get back null data after a
   session ended `#6318 <https://redmine.pfsense.org/issues/6318>`__
-  Improved error checking to prevent dashboard widget parsing errors

DNS
---

-  Added an option for the DNS Resolver (Unbound) to serve expired
   records from the cache after their TTL expires which can improve
   speed in some cases
   `#7814 <https://redmine.pfsense.org/issues/7814>`__
-  Fixed the DNS Resolver (Unbound) to allow snoop from localhost by
   default, otherwise "dig +trace" or "drill -T" queries from the
   firewall itself fail
   `#7884 <https://redmine.pfsense.org/issues/7884>`__

XMLRPC
------

-  Fixed XMLRPC Sync to prevent a lock that would never be unlocked
-  Fixed XMLRPC sync to ensure a proper empty array is returned instead
   of NULL, so that the last item of a section can be removed without
   error `#7953 <https://redmine.pfsense.org/issues/7953>`__

Misc
----

-  Fixed Captive Portal voucher test and expire pages
   `#7939 <https://redmine.pfsense.org/issues/7939>`__
-  Added UEFI 32 and UEFI 64 filenames defined inside a pool to
   dhcpd.conf `#7949 <https://redmine.pfsense.org/issues/7949>`__
-  Fixed operation of the "Reset All States on WAN IP Change" GUI
   setting `#7921 <https://redmine.pfsense.org/issues/7921>`__
-  Changed OpenVPN to retry client auth when it fails by default
   (auth-retry nointeract)
   `#7506 <https://redmine.pfsense.org/issues/7506>`__
-  Changed the Cryptographic Accelerator module options to allow both
   the AES-NI and Crypto modules to be loaded at the same time
   `#7810 <https://redmine.pfsense.org/issues/7810>`__
-  Added URL fingerprinting to the login page CSS
-  Added the device serial/id to the console and SSH menu banner
   `#7968 <https://redmine.pfsense.org/issues/7968>`__
-  Fixed "Unknown Step Values" in certain RRD graph cases
   `#6860 <https://redmine.pfsense.org/issues/6860>`__

