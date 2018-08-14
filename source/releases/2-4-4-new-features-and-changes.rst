2.4.4 New Features and Changes
==============================

.. danger:: This release is not yet published. This list is tentative and may
   change at any time.

Significant Changes
-------------------

:OS Upgrade: Base Operating System upgraded to FreeBSD 11.2-RELEASE-p1. As a
  part of moving to FreeBSD 11.2, new hardware support is included for
  C3000-based hardware.
:PHP 7.2: PHP upgraded to 7.2, which required numerous changes to syntax
  throughout the source code and packages.
:Routed IPsec (VTI): Routed IPsec is now possible using using FreeBSD
  ``if_ipsec(4)`` Virtual Tunnel Interfaces (VTI).
  `#8544 <https://redmine.pfsense.org/issues/8544>`__
  (See also: :doc:`/vpn/ipsec/ipsec-routed`)
:Default Gateway Group: The default gateway may now be configured using a
  Gateway Group setup for failover (each gateway on a different tier), which
  replaces Default Gateway Switching.
  `#8187 <https://redmine.pfsense.org/issues/8187>`__
:Limiter AQM/Queue Schedulers: Limiters now include support for several Active
  Queue Management (AQM) methods and Queue Scheduler configurations such as
  FQ_CODEL.
  `#6620 <https://redmine.pfsense.org/issues/6620>`__
  (See also: `pfSense PR #3941 <https://github.com/pfsense/pfsense/pull/3941>`__)
:Certificate Subject Requirements: The Certificate Manager and OpenVPN wizard
  now only require the **Common Name** to be set, and all other fields are
  optional.
  `#8381 <https://redmine.pfsense.org/issues/8381>`__
:AutoConfigBackup is free!: AutoConfigBackup now integrated and `free for all to
  use <https://www.netgate.com/blog/pfsense-gold-free-starting-with-2-4-4.html>`__.
  (See also: :doc:`/backup/autoconfigbackup`)
:Hybrid Installer Image: The installer memstick is now a **Hybrid** format which
  can be used as both an **ISO Image** and a **Memstick**. To use the file as an
  ISO image, decompress it and rename it with an ``.iso`` extension.
:DNS over TLS: The DNS Resolver now includes support for DNS over TLS as both a
  client and a server, including for domain overrides.
  `#8388 <https://redmine.pfsense.org/issues/8388>`__
  `#8030 <https://redmine.pfsense.org/issues/8030>`__
  `#8431 <https://redmine.pfsense.org/issues/8431>`__
:Captive Portal Authentication: Captive Portal authentication is now integrated
  with the User Manager system. Captive Portal instances may now use RADIUS,
  LDAP, or Local Authentication like other integrated services. The firewall
  will migrate existing Captive Portal RADIUS settings to the User Manager
  automatically on upgrade.

Security
--------

* FreeBSD SA for CVE-2018-6922: Resource exhaustion in TCP reassembly `FreeBSD-SA-18:08.tcp <https://www.freebsd.org/security/advisories/FreeBSD-SA-18:08.tcp.asc>`__
* Fixed a potential XSS vulnerability via GUI rule separators `pfSense-SA-18_06.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-18_06.webgui.asc>`__ `#8654 <https://redmine.pfsense.org/issues/8654>`__
* Fixed a potential XSS via custom GUI/dashboard settings `pfSense-SA-18_07.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-18_07.webgui.asc>`__ `#8726 <https://redmine.pfsense.org/issues/8726>`__
* Upgraded strongSwan to 5.6.3 to address a buffer underflow leading to denial of service (CVE-2018-5388) `#8746 <https://redmine.pfsense.org/issues/8746>`__
* Updated default cryptographic settings for OpenVPN, IPsec, and Certificates `#8594 <https://redmine.pfsense.org/issues/8594>`__
* Changed the included DH groups to those defined in RFC 7919 `#8582 <https://redmine.pfsense.org/issues/8582>`__
* Added stronger IPsec Pre-Shared Key usage warnings, and a button to generate a secure PSK `#8667 <https://redmine.pfsense.org/issues/8667>`__

Errata
------

* Removed options for the deprecated FEC LAGG Protocol `#8734 <https://redmine.pfsense.org/issues/8734>`__

.. warning:: Third party packages from **alternate repositories** are causing
   problems for users with the upgrade process and also with post-upgrade
   behavior. These packages have never been supported, and had to be manually
   added by users outside of the GUI.

   Due to the major changes required for FreeBSD 11.2 and PHP 7.2, third party
   packages from alternate repositories cannot be present during the upgrade.
   There is no way to predict if a third party package supports the new version
   or will cause the upgrade itself to fail.

   The upgrade process will automatically remove ``pfSense-pkg-*`` packages
   installed from alternate repositories. After the upgrade completes, the user
   can reinstall these packages. Packages from **alternate repositories** will
   not appear in the **Installed Packages** list in the GUI, and must be
   entirely managed in the command line.

   **This change does not affect packages installed from the official pfSense
   package repository.**

Certificates
------------

* Changed the Certificate Manager and OpenVPN wizard to only require the **Common Name** for the CA/Cert subject `#8381 <https://redmine.pfsense.org/issues/8381>`__
* Updated default cryptographic settings Certificates `#8594 <https://redmine.pfsense.org/issues/8594>`__
* Added support for OCSP Must-Staple certificates in the GUI (and ACME package) `#8418 <https://redmine.pfsense.org/issues/8418>`__
* Changed CRL support from using an abandoned PHP OpenSSL module patch to a pure PHP implementation compatible with PHP 7.2 `#8762 <https://redmine.pfsense.org/issues/8762>`__

DNS
---

* Added DNS over TLS for upstream forwarders to the DNS Resolver `#8388 <https://redmine.pfsense.org/issues/8388>`__
* Added DNS over TLS server support to the DNS Resolver `#8030 <https://redmine.pfsense.org/issues/8030>`__
* Added DNS over TLS options for DNS Resolver Domain Override `#8431 <https://redmine.pfsense.org/issues/8431>`__
* Fixed editing DNS Resolver ACLs in non-English languages `#8539 <https://redmine.pfsense.org/issues/8539>`__
* Added a DNS Resolver status page `#8430 <https://redmine.pfsense.org/issues/8430>`__
* Clarified that "Register DHCP leases in the DNS Resolver" only works for IPv4 addresses `#8592 <https://redmine.pfsense.org/issues/8592>`__
* Added IPv6 representation of IPv4 addresses in DNS Resolver DNS Rebinding checks `#8750 <https://redmine.pfsense.org/issues/8750>`__
* Fixed disabling the DHCP Server on interfaces when the DNS Resolver **DHCP Registration** option is enabled (Only one enabled interface is required) `#8120 <https://redmine.pfsense.org/issues/8120>`__
* Added advanced option for ``qname-minimization`` to the DNS Resolver `#8028 <https://redmine.pfsense.org/issues/8028>`__
* Fixed an issue with IDs when editing or deleting DNS Forwarder host override entries `#8767 <https://redmine.pfsense.org/issues/8767>`__

Dynamic DNS
-----------

* Added Dynamic DNS client for DigitalOcean DNS `#8478 <https://redmine.pfsense.org/issues/8478>`__
* Fixed Dynamic DNS clients usage of custom check IP services `#8664 <https://redmine.pfsense.org/issues/8664>`__
* Added Dynamic DNS client for Azure `#7769 <https://redmine.pfsense.org/issues/7769>`__
* Updated DNSimple Dynamic DNS client to use DNSimple API v2 `#8071 <https://redmine.pfsense.org/issues/8071>`__

Routing/Gateways
----------------

* Added the ability to set a Gateway Group as the default gateway. #3781 `#8187 <https://redmine.pfsense.org/issues/8187>`__
* Extended the maximum Gateway monitoring **Probe Interval** `#8593 <https://redmine.pfsense.org/issues/8593>`__
* Fixed handling of Gateway Group **Trigger Level** `#8586 <https://redmine.pfsense.org/issues/8586>`__
* Fixed inconsistency in display and usage of units for Gateway latency `#8477 <https://redmine.pfsense.org/issues/8477>`__
* Upgraded FRR to 5.0.1 for compatibility with FreeBSD 11.2 `#8449 <https://redmine.pfsense.org/issues/8449>`__
* Fixed FRR BGP MD5 support `#8407 <https://redmine.pfsense.org/issues/8407>`__
* Fixed handling of Router Advertisement preferences `#6237 <https://redmine.pfsense.org/issues/6237>`__

IPsec
-----

* Added routed IPsec using FreeBSD if_ipsec(4) VTI `#8544 <https://redmine.pfsense.org/issues/8544>`__
* Added IPsec identifiers to **Status > IPsec** `#8598 <https://redmine.pfsense.org/issues/8598>`__
* Fixed a JavaScript variable issue in IPsec IKE Phase 1 causing the Key Length field to be blank in some browsers such as IE `#8543 <https://redmine.pfsense.org/issues/8543>`__
* Added IPsec mobile client options to allow different (virtual) IP addresses per user `#8292 <https://redmine.pfsense.org/issues/8292>`__
* Updated default cryptographic settings for IPsec `#8594 <https://redmine.pfsense.org/issues/8594>`__
* Changed the default behavior of an IPsec Phase 1 to rekey as needed `#8540 <https://redmine.pfsense.org/issues/8540>`__
* Fixed handling of per-user IPsec rules from an authentication server `#8765 <https://redmine.pfsense.org/issues/8765>`__
* Added warnings and hints to IPsec encryption and hash choices about potentially insecure selections `#8766 <https://redmine.pfsense.org/issues/8766>`__
* Fixed an issue with handling IP Alias VIPs with CARP parent after an interface up/down event `#8768 <https://redmine.pfsense.org/issues/8768>`__
* Added a GUI option to the IPsec **Advanced Settings** tab for Asynchronous Cryptography `#8772 <https://redmine.pfsense.org/issues/8772>`__

OpenVPN
-------

* Changed OpenVPN Authentication to use an asynchronous authentication plugin which avoids stalling server traffic during the authentication process, especially noticeable on down/broken authentication servers `#7905 <https://redmine.pfsense.org/issues/7905>`__
* Fixed display of **Bridge Route Gateway** options on OpenVPN tap bridge servers `#8658 <https://redmine.pfsense.org/issues/8658>`__
* Fixed handling of LDAP fields in the OpenVPN wizard and brought the options in line with current LDAP server options `#8605 <https://redmine.pfsense.org/issues/8605>`__
* Updated default cryptographic settings for OpenVPN `#8594 <https://redmine.pfsense.org/issues/8594>`__

DHCP Server
-----------

* Fixed validation of custom DHCP options `#8534 <https://redmine.pfsense.org/issues/8534>`__
* Fixed a situation where DHCPv6 was configured for LAN when the LAN interface was not assigned `#8048 <https://redmine.pfsense.org/issues/8048>`__

Interfaces / VIPs
-----------------

* Removed IPv4 and IPv6 settings from the Interface configuration for assigned OpenVPN/GIF/GRE/Routed IPsec instances, since the IP addresses are managed by the parent config not interfaces.php `#8687 <https://redmine.pfsense.org/issues/8687>`__
* Added Switch Status to status.php for platforms with a switch `#8525 <https://redmine.pfsense.org/issues/8525>`__
* Fixed an issue switching between Port VLAN and 802.1q VLAN mode on integrated switches `#8422 <https://redmine.pfsense.org/issues/8422>`__
* Fixed an HTTP_REFERER issue when changing the LAN IP address in the Setup Wizard `#8524 <https://redmine.pfsense.org/issues/8524>`__
* Fixed handling of the FreeBSD 11.2-BETA dhclient MTU value `#8507 <https://redmine.pfsense.org/issues/8507>`__
* Added PPPoE multi-link over single link to allow users with a supported provider to have a larger MTU `#8737 <https://redmine.pfsense.org/issues/8737>`__
* Fixed a PPPoE MTU issue with ORANGE FR `#8595 <https://redmine.pfsense.org/issues/8595>`__
* Fixed QinQ interface assignment `#8446 <https://redmine.pfsense.org/issues/8446>`__
* Fixed radvd/IPv6 when using a LAN bridge `#8429 <https://redmine.pfsense.org/issues/8429>`__
* Fixed deleting IP Alias VIPs outside an interface subnet where a gateway exists in the same subnet `#4438 <https://redmine.pfsense.org/issues/4438>`__
* Fixed handling of IP Alias and CARP VIP subnet mask/prefix autodetection `#8741 <https://redmine.pfsense.org/issues/8741>`__

User Management / Authentication
--------------------------------

* Added a visible warning to the user when default password has not been changed `#8596 <https://redmine.pfsense.org/issues/8596>`__
* Fixed configuration descriptions user management operations and added logging `#8548 <https://redmine.pfsense.org/issues/8548>`__
* Fixed escaping of LDAP search parameters `#8626 <https://redmine.pfsense.org/issues/8626>`__
* Fixed an OS issue with adding a group to a user when creating the user `#8553 <https://redmine.pfsense.org/issues/8553>`__
* Fixed handling of LDAP bind credentials `#8583 <https://redmine.pfsense.org/issues/8583>`__
* Removed some legacy code from ``auth.inc`` `#8742 <https://redmine.pfsense.org/issues/8742>`__
* Fixed Group selections after an input error in the User Manager `#8622 <https://redmine.pfsense.org/issues/8622>`__
* Fixed inconsistent usage of ``sshdkeyonly`` in ``system_advanced_admin.php`` `#8403 <https://redmine.pfsense.org/issues/8403>`__
* Added SSH configuration option to require **both** Key **and** Username+Password authentication at the same time `#8402 <https://redmine.pfsense.org/issues/8402>`__
* Replaced ``radius.inc`` by pear-Auth_RADIUS `#7024 <https://redmine.pfsense.org/issues/7024>`__
* Fixed synchronization of User Manager group scope and operating system groups `#7013 <https://redmine.pfsense.org/issues/7013>`__

Captive Portal
--------------

* Integrated Captive Portal authentication into the User Manager to enable support for LDAP `#5112 <https://redmine.pfsense.org/issues/5112>`__
* Fixed deleting **Allowed Hostnames** and **Allowed IP Addresses** entries in Captive Portal when a zone is disabled `#8530 <https://redmine.pfsense.org/issues/8530>`__
* Added support for setting Captive Portal traffic quotas `#8202 <https://redmine.pfsense.org/issues/8202>`__
* Added display of a custom username when Captive Portal is set to *None* for the authentication type `#8361 <https://redmine.pfsense.org/issues/8361>`__
* Changed handling of Called-Station-Id/Calling-Station ID to send a MAC address instead of IP address when using RADIUS authentication `#4294 <https://redmine.pfsense.org/issues/4294>`__
* Changed to a standardized NAS-Identifier when using RADIUS authentication `#3686 <https://redmine.pfsense.org/issues/3686>`__
* Corrected accounting updates not being sent when expected `#8655 <https://redmine.pfsense.org/issues/8655>`__

WebGUI / Dashboard
------------------

* Enabled HTTP2 for the Web GUI server `#8552 <https://redmine.pfsense.org/issues/8552>`__
* Updated the text and links in the HTML footer `#8733 <https://redmine.pfsense.org/issues/8733>`__
* Fixed display of available swap with multiple swap disks in the **System Information** Dashboard widget `#8587 <https://redmine.pfsense.org/issues/8587>`__
* Updated text in the Setup Wizard `#8753 <https://redmine.pfsense.org/issues/8753>`__
* Moved the simplepie RSS reader code to a FreeBSD port for easier updates `#6998 <https://redmine.pfsense.org/issues/6998>`__
* Fixed handling of the **Inverse** option in the Traffic Graphs Dashboard Widget `#8367 <https://redmine.pfsense.org/issues/8367>`__

Firewall Rules / NAT / Shaping
------------------------------

* Added CoDel, FQ-CoDel, PIE and FQ-PIE AQMs to limiters `#6620 <https://redmine.pfsense.org/issues/6620>`__
* Fixed firewall ruleset errors related to VIPs and outbound rules `#8518 <https://redmine.pfsense.org/issues/8518>`__ `#8408 <https://redmine.pfsense.org/issues/8408>`__
* Added validation for IPv6 NPt input `#8575 <https://redmine.pfsense.org/issues/8575>`__
* Fixed a race condition in NAT reflection filter rules that could lead to a ruleset load failure `#8604 <https://redmine.pfsense.org/issues/8604>`__
* Fixed viewing the list of Port Forwards when a user only has the "WebCfg - Firewall: NAT: Port Forward" privilege `#8563 <https://redmine.pfsense.org/issues/8563>`__
* Fixed an issue with default field selection when editing Firewall Rules `#8597 <https://redmine.pfsense.org/issues/8597>`__
* Added code to prevent nested alias loops `#8101 <https://redmine.pfsense.org/issues/8101>`__
* Added interface groups support for NAT rules `#1933 <https://redmine.pfsense.org/issues/1933>`__
* Fixed a case where invalid IPv6 NAT rules could be generated `#8437 <https://redmine.pfsense.org/issues/8437>`__

Miscellaneous
-------------

* Fixed an issue with **Guided UFS** mode in the installer not booting `#8638 <https://redmine.pfsense.org/issues/8638>`__
* Fixed display of stored Load Balancer custom settings `#8704 <https://redmine.pfsense.org/issues/8704>`__
* Fixed handling of ``loader.conf`` and ``loader.conf.local`` so it will not removed customized options that override defaults `#8571 <https://redmine.pfsense.org/issues/8571>`__
* Fixed the restoration process for a ``config.xml`` from USB during install to remove RRD data so that the data does not indefinitely stay in ``config.xml`` `#7634 <https://redmine.pfsense.org/issues/7634>`__
* Fixed handling of special characters in L2TP user passwords `#7623 <https://redmine.pfsense.org/issues/7623>`__
* Fixed handling of sample bounds with custom timer periods on **Status > Monitoring** `#6477 <https://redmine.pfsense.org/issues/6477>`__
* Changed the crash reporter so that users can download the reports locally rather than submitting to a server `#8764 <https://redmine.pfsense.org/issues/8764>`__
* Fixed situation where the firewall would get stuck attempting to reinstall packages after restoring a configuration when there is no Internet connection `#7604 <https://redmine.pfsense.org/issues/7604>`__

