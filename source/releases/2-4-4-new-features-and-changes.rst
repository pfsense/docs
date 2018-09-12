2.4.4 New Features and Changes
==============================

.. danger:: This release is not yet published. This list is tentative and may
   change at any time.

Significant Changes
-------------------

:OS Upgrade: Base Operating System upgraded to FreeBSD 11.2-RELEASE-p3. As a
  part of moving to FreeBSD 11.2, new hardware support is included for
  C3000-based hardware.
:PHP 7.2: PHP upgraded to 7.2, which required numerous changes to syntax
  throughout the source code and packages.
:Routed IPsec (VTI): Routed IPsec is now possible using using FreeBSD
  ``if_ipsec(4)`` Virtual Tunnel Interfaces (VTI).
  `#8544 <https://redmine.pfsense.org/issues/8544>`__
  (See also: :doc:`/vpn/ipsec/ipsec-routed`)
:IPsec Speed Improvements: The new **Asynchronous Cryptography** option under
  the IPsec **Advanced Settings** tab can dramatically improve IPsec performance
  on multi-core hardware `#8772 <https://redmine.pfsense.org/issues/8772>`__
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
:Captive Portal HTML Design and Usability: The default Captive Portal page has
  been redesigned. Controls have also been added which allow for the logo and
  background images and Terms of Service text to be customized without editing
  and uploading custom HTML code.
  `#8793 <https://redmine.pfsense.org/issues/8793>`__
:Integrated Switch Improvements: Netgate devices with integrated switches such
  as the SG-3100 and XG-7100 can now configure per-port speed and duplex
  settings, discrete port configuration interfaces can now be tied to switch
  ports for up/down status, and LAGG support is also now available (Failover
  mode only)

Security
--------

* FreeBSD SA for CVE-2018-6922: Resource exhaustion in TCP reassembly `FreeBSD-SA-18:08.tcp <https://www.freebsd.org/security/advisories/FreeBSD-SA-18:08.tcp.asc>`__
* FreeBSD SA for CVE-2018-3620, CVE-2018-3646: L1 Terminal Fault (L1TF) Kernel Information Disclosure `FreeBSD-SA-18:09.l1tf <https://www.freebsd.org/security/advisories/FreeBSD-SA-18:09.l1tf.asc>`__
* FreeBSD SA for CVE-2018-6923: Resource exhaustion in IP fragment reassembly `FreeBSD-SA-18:10.ip <https://www.freebsd.org/security/advisories/FreeBSD-SA-18:10.ip.asc>`__
* FreeBSD SA for CVE-2018-14526: Unauthenticated EAPOL-Key Decryption Vulnerability `FreeBSD-SA-18:11.hostapd <https://www.freebsd.org/security/advisories/FreeBSD-SA-18:11.hostapd.asc>`__
* FreeBSD SA for CVE-2018-6924: Improper ELF header parsing `FreeBSD-SA-18:12.elf <https://www.freebsd.org/security/advisories/FreeBSD-SA-18:12.elf.asc>`__
* FreeBSD errata notice for LazyFPU remediation causing potential data corruption `FreeBSD-EN-18:08.lazyfpu <https://www.freebsd.org/security/advisories/FreeBSD-EN-18:08.lazyfpu.asc>`__
* Fixed a potential XSS vulnerability via GUI rule separators `pfSense-SA-18_06.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-18_06.webgui.asc>`__ `#8654 <https://redmine.pfsense.org/issues/8654>`__
* Fixed a potential XSS via custom GUI/dashboard settings `pfSense-SA-18_07.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-18_07.webgui.asc>`__ `#8726 <https://redmine.pfsense.org/issues/8726>`__
* Fixed a potential authenticated ACE vulnerability `pfSense-SA-18_08.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-18_08.webgui.asc>`__ `#8843 <https://redmine.pfsense.org/issues/8843>`__
* Upgraded strongSwan to 5.6.3 to address a buffer underflow leading to denial of service (CVE-2018-5388) `#8746 <https://redmine.pfsense.org/issues/8746>`__
* Updated default cryptographic settings for OpenVPN, IPsec, and Certificates `#8594 <https://redmine.pfsense.org/issues/8594>`__
* Changed the included DH groups to those defined in RFC 7919 `#8582 <https://redmine.pfsense.org/issues/8582>`__
* Added stronger IPsec Pre-Shared Key usage warnings, and a button to generate a secure PSK `#8667 <https://redmine.pfsense.org/issues/8667>`__
* Disabled OpenVPN compression by default on new instances for security reasons due to `VORACLE`_ -- Users should strongly consider disabling compression on OpenVPN instances if they pass unencrypted data such as HTTP to arbitrary Internet sites `#8788 <https://redmine.pfsense.org/issues/8788>`__
* Patched OpenSSH for `CVE-2018-15473 <https://isc.sans.edu/forums/diary/OpenSSH+user+enumeration+CVE201815473/24004/>`__, username enumeration/disclosure through malformed packets.
* Changed from ``sshlockout_pf`` to ``sshguard`` for monitoring failed logins and locking out offenders, this allows the lockout to work on IPv4 and IPv6 and also terminates states when adding offenders to the block list `#7694 <https://redmine.pfsense.org/issues/7694>`__ `#7695 <https://redmine.pfsense.org/issues/7695>`__

Errata
------

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

* Removed options for the deprecated FEC LAGG Protocol `#8734 <https://redmine.pfsense.org/issues/8734>`__

Certificates
------------

* Changed the Certificate Manager and OpenVPN wizard to only require the **Common Name** for the CA/Cert subject `#8381 <https://redmine.pfsense.org/issues/8381>`__
* Updated default cryptographic settings Certificates `#8594 <https://redmine.pfsense.org/issues/8594>`__
* Added support for OCSP Must-Staple certificates in the GUI (and ACME package) `#8418 <https://redmine.pfsense.org/issues/8418>`__
* Changed CRL support from using an abandoned PHP OpenSSL module patch to a pure PHP implementation compatible with PHP 7.2 `#8762 <https://redmine.pfsense.org/issues/8762>`__
* Fixed issues with several areas not properly parsing CA fields properly when they were not in the expected order `#8801 <https://redmine.pfsense.org/issues/8801>`__
* Changed the default CA and Certificate create action from "Import..." to "Create an internal..." `#8851 <https://redmine.pfsense.org/issues/8851>`__

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
* Fixed handling of username and password fields for custom Dynamic DNS entries `#8782 <https://redmine.pfsense.org/issues/8782>`__

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

* Added routed IPsec using FreeBSD ``if_ipsec(4)`` VTI `#8544 <https://redmine.pfsense.org/issues/8544>`__
* Added a GUI option to the IPsec **Advanced Settings** tab for Asynchronous Cryptography which can dramatically improve IPsec crypto operation performance on multi-core hardware `#8772 <https://redmine.pfsense.org/issues/8772>`__
* Added IPsec identifiers to **Status > IPsec** `#8598 <https://redmine.pfsense.org/issues/8598>`__
* Fixed a JavaScript variable issue in IPsec IKE Phase 1 causing the Key Length field to be blank in some browsers such as IE `#8543 <https://redmine.pfsense.org/issues/8543>`__
* Added IPsec mobile client options to configure different (virtual) IP addresses per user `#8292 <https://redmine.pfsense.org/issues/8292>`__
* Added IPsec mobile client options to configure different DNS servers per user `#8644 <https://redmine.pfsense.org/issues/8644>`__
* Updated default cryptographic settings for IPsec `#8594 <https://redmine.pfsense.org/issues/8594>`__
* Changed the default behavior of an IPsec Phase 1 to rekey as needed `#8540 <https://redmine.pfsense.org/issues/8540>`__
* Fixed handling of per-user IPsec rules from an authentication server `#8765 <https://redmine.pfsense.org/issues/8765>`__
* Added warnings and hints to IPsec encryption and hash choices about potentially insecure selections `#8766 <https://redmine.pfsense.org/issues/8766>`__
* Fixed an issue with handling IP Alias VIPs with CARP parent after an interface up/down event `#8768 <https://redmine.pfsense.org/issues/8768>`__

OpenVPN
-------

* Disabled compression by default for new OpenVPN client and server instances for security reasons `#8788 <https://redmine.pfsense.org/issues/8788>`__
* Changed OpenVPN Authentication to use an asynchronous authentication plugin which avoids stalling server traffic during the authentication process, especially noticeable on down/broken authentication servers `#7905 <https://redmine.pfsense.org/issues/7905>`__
* Fixed display of **Bridge Route Gateway** options on OpenVPN tap bridge servers `#8658 <https://redmine.pfsense.org/issues/8658>`__
* Fixed handling of LDAP fields in the OpenVPN wizard and brought the options in line with current LDAP server options `#8605 <https://redmine.pfsense.org/issues/8605>`__
* Updated default cryptographic settings for OpenVPN `#8594 <https://redmine.pfsense.org/issues/8594>`__
* Added missing OpenVPN compression options (``stub-v2`` and plain ``compress``) `#8788 <https://redmine.pfsense.org/issues/8788>`__

DHCP Server
-----------

* Fixed validation of custom DHCP options `#8534 <https://redmine.pfsense.org/issues/8534>`__
* Fixed a situation where DHCPv6 was configured for LAN when the LAN interface was not assigned `#8048 <https://redmine.pfsense.org/issues/8048>`__
* Fixed an issue with XMLRPC synchronization of DHCP static mappings `#8721 <https://redmine.pfsense.org/issues/8721>`__

Interfaces / VIPs
-----------------

* Removed IPv4 and IPv6 settings from the Interface configuration for assigned OpenVPN/GIF/GRE/Routed IPsec instances, since the IP addresses are managed by the parent config not interfaces.php `#8687 <https://redmine.pfsense.org/issues/8687>`__
* Fixed an HTTP_REFERER issue when changing the LAN IP address in the Setup Wizard `#8524 <https://redmine.pfsense.org/issues/8524>`__
* Fixed an HTTP_REFERER issue when changing an interface IP address while accessing the GUI from the same interface `#8822 <https://redmine.pfsense.org/issues/8822>`__
* Fixed handling of the FreeBSD 11.2-BETA dhclient MTU value `#8507 <https://redmine.pfsense.org/issues/8507>`__
* Added PPPoE multi-link over single link to allow users with a supported provider to have a larger MTU `#8737 <https://redmine.pfsense.org/issues/8737>`__
* Fixed a PPPoE MTU issue with ORANGE FR `#8595 <https://redmine.pfsense.org/issues/8595>`__
* Fixed QinQ interface assignment `#8446 <https://redmine.pfsense.org/issues/8446>`__
* Fixed radvd/IPv6 when using a LAN bridge `#8429 <https://redmine.pfsense.org/issues/8429>`__
* Fixed deleting IP Alias VIPs outside an interface subnet where a gateway exists in the same subnet `#4438 <https://redmine.pfsense.org/issues/4438>`__
* Fixed handling of IP Alias and CARP VIP subnet mask/prefix autodetection `#8741 <https://redmine.pfsense.org/issues/8741>`__
* Fixed a panic in IPv6 fragment logging `#8499 <https://redmine.pfsense.org/issues/8499>`__
* Fixed handling of DHCP option 77 in the DHCP client `#7425 <https://redmine.pfsense.org/issues/7425>`__
* Fixed deleting Interface Group members which are disabled `#8800 <https://redmine.pfsense.org/issues/8800>`__
* Fixed MAC address spoofing for bridge interfaces `#8138 <https://redmine.pfsense.org/issues/8138>`__
* Fixed an issue with string termination when creating interfaces through the pfSense PHP module `#8683 <https://redmine.pfsense.org/issues/8683>`__
* Fixed an issue where changing a LAGG could cause a VLAN using that LAGG as a parent interface to lose its association with the LAGG `#8527 <https://redmine.pfsense.org/issues/8527>`__

Integrated Switches
-------------------

* Added GUI controls to configure LAGG on integrated switch ports (Load Balance mode only)
* Added GUI controls to configure Speed/Duplex for switch ports on integrated switches
* Added the ability to tie the status of an assigned VLAN interface to a switch port for integrated switches
* Added Switch Status to status.php for platforms with a switch `#8525 <https://redmine.pfsense.org/issues/8525>`__
* Fixed an issue switching between Port VLAN and 802.1q VLAN mode on integrated switches `#8422 <https://redmine.pfsense.org/issues/8422>`__
* Fixed an SNMP error on hardware with integrated switches `#8600 <https://redmine.pfsense.org/issues/8600>`__
* Added **Preserve Switch Configuration** option when restoring ``config.xml`` to keep the current active switch settings instead of those from the imported configuration to help with hardware transitions

Hardware/Platform
-----------------

* Added support for the new SG-5100
* Fixed an issue with ARM hardware not completely halting when shut down (SG-3100 and SG-1000)
* Fixed HDMI hotplug issues on `Minnowboard Turbot hardware`_ (MBT-2220 and MBT-4220)
* Fixed SG-1000 autonegotiation for 10baseT speed and duplex `#7532 <https://redmine.pfsense.org/issues/7532>`__

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
* Fixed logging and display of GUI user authentication source IP address when the user logs in through a proxy `#8813 <https://redmine.pfsense.org/issues/8813>`__
* Fixed logging and display of GUI user authentication sources to show what source authorized the login (e.g. LDAP, RADIUS, Local, Fallback) `#8816 <https://redmine.pfsense.org/issues/8816>`__

Captive Portal
--------------

* Integrated Captive Portal authentication into the User Manager to enable support for LDAP `#5112 <https://redmine.pfsense.org/issues/5112>`__
* Updated Captive Portal HTML/CSS to a modern design and added controls to customize images and ToS without uploading custom HTML `#8793 <https://redmine.pfsense.org/issues/8793>`__
* Fixed deleting **Allowed Hostnames** and **Allowed IP Addresses** entries in Captive Portal when a zone is disabled `#8530 <https://redmine.pfsense.org/issues/8530>`__
* Added support for setting Captive Portal traffic quotas `#8202 <https://redmine.pfsense.org/issues/8202>`__
* Added display of a custom username when Captive Portal is set to *None* for the authentication type `#8361 <https://redmine.pfsense.org/issues/8361>`__
* Changed handling of Called-Station-Id/Calling-Station ID to send a MAC address instead of IP address when using RADIUS authentication `#4294 <https://redmine.pfsense.org/issues/4294>`__
* Changed to a standardized NAS-Identifier when using RADIUS authentication `#3686 <https://redmine.pfsense.org/issues/3686>`__
* Corrected accounting updates not being sent when expected `#8655 <https://redmine.pfsense.org/issues/8655>`__
* Fixed an issue with XMLRPC synchronization of Captive Portal settings `#8806 <https://redmine.pfsense.org/issues/8806>`__

WebGUI / Dashboard
------------------

* Enabled HTTP2 for the Web GUI server `#8552 <https://redmine.pfsense.org/issues/8552>`__
* Updated the text and links in the HTML footer `#8733 <https://redmine.pfsense.org/issues/8733>`__
* Fixed display of available swap with multiple swap disks in the **System Information** Dashboard widget `#8587 <https://redmine.pfsense.org/issues/8587>`__
* Updated text in the Setup Wizard `#8753 <https://redmine.pfsense.org/issues/8753>`__
* Moved the simplepie RSS reader code to a FreeBSD port for easier updates `#6998 <https://redmine.pfsense.org/issues/6998>`__
* Fixed handling of the **Inverse** option in the Traffic Graphs Dashboard Widget `#8367 <https://redmine.pfsense.org/issues/8367>`__
* Fixed issues with the GUI following upgrade progress `#8519 <https://redmine.pfsense.org/issues/8519>`__
* Added a line to display the current GUI user viewing the Dashboard in the System Information Widget `#8817 <https://redmine.pfsense.org/issues/8817>`__

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
* Fixed a case where IPv6 Neighbor Discovery and other similar valid messages sent from the unspecified address (``::``) were not allowed by default `#8791 <https://redmine.pfsense.org/issues/8791>`__
* Added **Select All** functionality to firewall and NAT rules `#8812 <https://redmine.pfsense.org/issues/8812>`__
* Fixed IPv6 address form field format tooltip `#8834 <https://redmine.pfsense.org/issues/8834>`__

Packages
--------
* Fixed situation where the firewall would get stuck attempting to reinstall packages after restoring a configuration when there is no Internet connection `#7604 <https://redmine.pfsense.org/issues/7604>`__
* Added a new tag for package services, ``<starts_on_sync/>``, to allow packages to declare that they start themselves during the sync process, which lets packages opt out of a (second) forced start at boot and during interface events `#8850 <https://redmine.pfsense.org/issues/8850>`__

  See also: `#8620 <https://redmine.pfsense.org/issues/8620>`__

Miscellaneous
-------------

* Fixed display of stored Load Balancer custom settings `#8704 <https://redmine.pfsense.org/issues/8704>`__
* Fixed handling of ``loader.conf`` and ``loader.conf.local`` so it will not removed customized options that override defaults `#8571 <https://redmine.pfsense.org/issues/8571>`__
* Fixed the restoration process for a ``config.xml`` from USB during install to remove RRD data so that the data does not indefinitely stay in ``config.xml`` `#7634 <https://redmine.pfsense.org/issues/7634>`__
* Fixed handling of special characters in L2TP user passwords `#7623 <https://redmine.pfsense.org/issues/7623>`__
* Fixed handling of sample bounds with custom timer periods on **Status > Monitoring** `#6477 <https://redmine.pfsense.org/issues/6477>`__
* Changed the crash reporter so that users can download the reports locally rather than submitting to a server `#8764 <https://redmine.pfsense.org/issues/8764>`__
* Added more redacted XML tags to status.php `#8819 <https://redmine.pfsense.org/issues/8819>`__
* Changed status.php to use ``ifconfig -va`` to show more detail, including attached SFP devices with certain network interface drivers `#8860 <https://redmine.pfsense.org/issues/8860>`__

.. _Minnowboard Turbot hardware: https://www.netgate.com/docs/platforms/minnowboard/pfsense-dual-ethernet.html
.. _VORACLE: https://media.defcon.org/DEF%20CON%2026/DEF%20CON%2026%20presentations/Nafeez/
