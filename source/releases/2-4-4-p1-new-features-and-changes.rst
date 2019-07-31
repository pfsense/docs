2.4.4-p1 New Features and Changes
=================================

pfSense® software version 2.4.4-p1 corrects issues found with 2.4.4-RELEASE.

Security / Errata
-----------------

* FreeBSD Errata Notice `FreeBSD-EN-18:09.ip <https://www.freebsd.org/security/advisories/FreeBSD-EN-18:09.ip.asc>`__:
  IP fragment remediation causes IPv6 fragment reassembly failure `#8934 <https://redmine.pfsense.org/issues/8934>`__
* FreeBSD Errata Notice `FreeBSD-EN-18:10.syscall <https://www.freebsd.org/security/advisories/FreeBSD-EN-18:10.syscall.asc>`__
  NULL pointer dereference in freebsd4_getfsstat system call (CVE-2018-17154)
* FreeBSD Errata Notice `FreeBSD-EN-18:11.listen <https://www.freebsd.org/security/advisories/FreeBSD-EN-18:11.listen.asc>`__
  Denial of service in listen syscall over IPv6 socket (CVE-2018-6925)
* FreeBSD Errata Notice `FreeBSD-EN-18:12.mem <https://www.freebsd.org/security/advisories/FreeBSD-EN-18:12.mem.asc>`__
  Small kernel memory disclosures in two system calls (CVE-2018-17155)
* Fixed a potential authenticated command injection issue with PowerD settings `pfSense-SA-18_09.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-18_09.webgui.asc>`__ `#9061 <https://redmine.pfsense.org/issues/9061>`__
* Fixed handling of privileges on the **All** group that were previously ignored `#9051 <https://redmine.pfsense.org/issues/9051>`__

  .. warning:: Check the privileges on the **All** group before upgrading to avoid unintended privileges for accounts being respected that were not honored before

Certificates
------------

* Fixed CRL lifetime errors due to 2038 rollover on 32-bit ARM platforms `#9098 <https://redmine.pfsense.org/issues/9098>`__
* Fixed date display of CA/Certificate validity ending dates after 2038 rollover on 32-bit ARM platforms `#9100 <https://redmine.pfsense.org/issues/9100>`__
* Fixed PHP errors when creating certificate entries `#9099 <https://redmine.pfsense.org/issues/9099>`__

DNS
---

* Updated Unbound to 1.8.1 to address issues with memory leaks, especially in DNS over TLS support `#9059 <https://redmine.pfsense.org/issues/9059>`__
* Fixed issues with the DNS search domain for the firewall being omitted from ``resolv.conf`` in certain cases `#9056 <https://redmine.pfsense.org/issues/9056>`__
* Fixed PHP errors in the DNS Forwarder `#8967 <https://redmine.pfsense.org/issues/8967>`__

Dynamic DNS
-----------

* Fixed an issue with FreeDNS Dynamic DNS sending an IP address with an update `#8924 <https://redmine.pfsense.org/issues/8924>`__
* Fixed issues with Custom (v6) Dynamic DNS logging a hostname error `#8977 <https://redmine.pfsense.org/issues/8977>`__

DHCP Server
-----------

* Fixed issues with DHCPv6 network boot settings `#8949 <https://redmine.pfsense.org/issues/8949>`__

Routing/Gateways
----------------

* Reduced the logging output of gateway change events `#8914 <https://redmine.pfsense.org/issues/8914>`__
* Fixed an issue with ``dpinger`` PID files causing it to get stuck in Pending status `#8921 <https://redmine.pfsense.org/issues/8921>`__
* Fixed display of a configured gateway monitor IP address when gateway monitoring is disabled `#8953 <https://redmine.pfsense.org/issues/8953>`__
* Fixed issues with double quotes in gateway descriptions causing a blank gateway drop-down on firewall rules `#8962 <https://redmine.pfsense.org/issues/8962>`__
* Fixed an issue where the default gateway was lost in certain cases with HA after a CARP VIP status transition `#8465 <https://redmine.pfsense.org/issues/8465>`__

IPsec
-----

* Updated strongSwan to 5.7.1 `#8898 <https://redmine.pfsense.org/issues/8898>`__
* Added ``0.0.0.0/0`` to both sides of an IPsec VTI P2 to allow connections with third-party routed IPsec implementations that require its presence `#8859 <https://redmine.pfsense.org/issues/8859>`__
* Fixed boot-time handling of IPsec VTI static routes `#9116 <https://redmine.pfsense.org/issues/9116>`__
* Fixed IKEv2 EAP Identity/Client ID matching so that it is strictly performed, to avoid users getting incorrect per-user settings `#9055 <https://redmine.pfsense.org/issues/9055>`__
* Fixed handling of RADIUS server names containing a ``.`` in the IPsec configuration with strongSwan 5.7.1 `#9106 <https://redmine.pfsense.org/issues/9106>`__
* Updated AWS IPsec wizard to use EC2 instance profiles and security groups, and switched the wizard from OpenBGPD to FRR

Interfaces/VIPs
---------------

* Fixed issues with DHCP client MTU causing interface configure loops when advanced options are present `#8507 <https://redmine.pfsense.org/issues/8507>`__
* Fixed issues with the Hyper-V ``hn(4)`` driver and ALTQ `#8954 <https://redmine.pfsense.org/issues/8954>`__
* Fixed issues with Hyper-V ``hn(4)`` interfaces dropping UDP6 traffic when transmit checksums were enabled `#9019 <https://redmine.pfsense.org/issues/9019>`__
* Fixed an issue with IGMP proxy failing to start on PPPoE interfaces `#8935 <https://redmine.pfsense.org/issues/8935>`__
* Fixed an issue with IPv6 Transmit checksums not being disabled when hardware checksums were set to be disabled `#8980 <https://redmine.pfsense.org/issues/8980>`__
* Updated mpd to 5.8_8 to address issues with Orange MTU `#8995 <https://redmine.pfsense.org/issues/8995>`__
* Fixed PPPoE service name checks to allow ``:`` and other alphanumeric characters `#9002 <https://redmine.pfsense.org/issues/9002>`__
* Fixed PHP errors when creating QinQ entries `#9109 <https://redmine.pfsense.org/issues/9109>`__
* Fixed the MAC address shown when editing a LAGG entry to always show the hardware MAC for each NIC and not the currently active address, which is no longer accurate for LAGG members `#8937 <https://redmine.pfsense.org/issues/8937>`__
* Fixed a PHP error when setting an interface address to act as a DHCP server from the console, when no other DHCP servers are already configured `#9144 <https://redmine.pfsense.org/issues/9144>`__
* Fixed a situation where editing a VLAN interface caused all other VLAN interfaces with the same parent to be reconfigured, which led to several other issues `#9115 <https://redmine.pfsense.org/issues/9115>`__

  .. warning:: Editing a VLAN parent interface can still cause problems. If this
     becomes an issue on a firewall, consider moving from using the untagged
     parent to having that traffic be tagged so that the parent interface is not
     assigned or in use. `#9154 <https://redmine.pfsense.org/issues/9154>`__

     Known issues include:

     * PPPoE instances on VLANs will not reconnect after the interface is reconfigured `#9148 <https://redmine.pfsense.org/issues/9148>`__
     * VLAN interfaces that use IPv6 tracking may lose their addresses `#9136 <https://redmine.pfsense.org/issues/9136>`__

Hardware/Platform
-----------------

* Fixed handling of EFI console when a device boots from UEFI, where ``vidconsole`` is not valid `#8978 <https://redmine.pfsense.org/issues/8978>`__
* Fixed PHP errors in switch configuration on platforms including integrated switches
* Added support for SG-5100 hardware watchdog

  .. note:: Enable the Watchdog daemon under **System > Advanced** on the **Miscellaneous** tab, and then reboot and enable it in the BIOS with a timeout longer than the timeout configured in the GUI.

User Management / Authentication
--------------------------------

* Fixed handling of privileges on the **All** group that were previously ignored `#9051 <https://redmine.pfsense.org/issues/9051>`__

  .. warning:: Check the privileges on the **All** group before upgrading to avoid unintended privileges for accounts being respected that were not honored before

* Added GUI options to control ``sshguard`` sensitivity and whitelisting to allow users to fine-tune the behavior of the brute force login protection `#8864 <https://redmine.pfsense.org/issues/8864>`__
* Added an option to enable SSH agent forwarding (disabled by default) `#8590 <https://redmine.pfsense.org/issues/8590>`__
* Fixed inconsistencies with ssh settings in the configuration `#8974 <https://redmine.pfsense.org/issues/8974>`__
* Fixed PHP errors with ssh settings `#8606 <https://redmine.pfsense.org/issues/8606>`__
* Added support for LDAP client certificates on authentication servers (Factory only) `#9007 <https://redmine.pfsense.org/issues/9007>`__
* Fixed an issue with **Local Database** authentication when using non-English languages in certain cases, such as with Captive Portal `#9086 <https://redmine.pfsense.org/issues/9086>`__

Captive Portal
--------------

* Fixed Captive Portal RADIUS NAS Identifier default values to include the zone name `#8998 <https://redmine.pfsense.org/issues/8998>`__
* Restored the ability to set a custom NAS Identifier on Captive Portal RADIUS settings `#8998 <https://redmine.pfsense.org/issues/8998>`__
* Fixed issues with Captive Portal logout popup `#9010 <https://redmine.pfsense.org/issues/9010>`__
* Fixed handling of the login page displayed when RADIUS MAC Authentication fails `#9032 <https://redmine.pfsense.org/issues/9032>`__
* Fixed username sent in RADIUS accounting with MAC-based authentication `#9131 <https://redmine.pfsense.org/issues/9131>`__
* Fixed an issue with the blocked MAC address redirect URL `#9114 <https://redmine.pfsense.org/issues/9114>`__

WebGUI / Dashboard
------------------

* Fixed ``nginx`` restart handling when toggling GUI web server options under **System > Advanced**, **Admin Access** tab
* Fixed empty crash reports after upgrade `#8915 <https://redmine.pfsense.org/issues/8915>`__
* Added CDATA protection to common name fields so they can safely contain international characters `#9006 <https://redmine.pfsense.org/issues/9006>`__

Firewall Rules / Aliases / NAT
------------------------------

* The ``filterdns`` daemon has been rewritten, solving a number of issues with the old implementation, including:

  * Fixes ``filterdns`` triggering every 16 seconds even when DNS records have not changed `#7143 <https://redmine.pfsense.org/issues/7143>`__
  * Fixes invalid FQDN entries in aliases causing an alias table to fail silently `#8001 <https://redmine.pfsense.org/issues/8001>`__
  * Fixes ``filterdns`` failing on a regular basis `#8758 <https://redmine.pfsense.org/issues/8758>`__

* Fixed ``/etc/rc.kill_states`` not correctly parsing ``pfctl`` output `#8554 <https://redmine.pfsense.org/issues/8554>`__
* Fixed formatting of alias names to still wrap but not replace underscores `#8893 <https://redmine.pfsense.org/issues/8893>`__
* Fixed PHP errors from ``filter_rules_sort()`` when a configuration contains no rules `#8993 <https://redmine.pfsense.org/issues/8993>`__
* Fixed PHP errors when creating schedules `#9009 <https://redmine.pfsense.org/issues/9009>`__
* Fixed PHP errors when creating entries on NAT pages `#9080 <https://redmine.pfsense.org/issues/9080>`__
* Fixed PHP errors from ``easyrule`` when no aliases are present `#9119 <https://redmine.pfsense.org/issues/9119>`__
* Fixed "Drag to reorder" description in rule list when rule drag-and-drop is disabled `#9128 <https://redmine.pfsense.org/issues/9128>`__

Traffic Shaping (ALTQ/Limiters)
-------------------------------

* Fixed issues with Limiter queue display on upgraded configurations `#8956 <https://redmine.pfsense.org/issues/8956>`__
* Fixed the default limiter scheduler to match previous version (WF2Q+) `#8973 <https://redmine.pfsense.org/issues/8973>`__
* Added scheduler information to the limiter information page `#8973 <https://redmine.pfsense.org/issues/8973>`__

Packages
--------

* Fixed issues with package installation causing problems when crossing major PHP versions `#8938 <https://redmine.pfsense.org/issues/8938>`__
* Fixed PHP errors when installing packages `#9067 <https://redmine.pfsense.org/issues/9067>`__

Backup/Restore
--------------

* Added schedule (cron) support to AutoConfigBackup `#8947 <https://redmine.pfsense.org/issues/8947>`__
* Fixed issues with AutoConfigBackup restoring a configuration from a different host `#8901 <https://redmine.pfsense.org/issues/8901>`__
* Fixed the AutoConfigBackup menu from the deprecated package still showing when the package is no longer present `#8959 <https://redmine.pfsense.org/issues/8959>`__
* Fixed an issue with **Reinstall Packages** hanging when run from **Diagnostics > Backup & Restore** `#8933 <https://redmine.pfsense.org/issues/8933>`__
* Fixed issues with multiple ``<rrddata>`` tags in ``config.xml`` `#8994 <https://redmine.pfsense.org/issues/8994>`__
* Fixed a race condition in package operations after a configuration restore that could lead to no packages being reinstalled `#9045 <https://redmine.pfsense.org/issues/9045>`__
* Fixed issues with the External Config Locator not finding a ``config.xml`` in ``/config`` `#9066 <https://redmine.pfsense.org/issues/9066>`__
* Fixed an issue where packages may not be reinstalled during a configuration restore performed immediately after a fresh install `#9071 <https://redmine.pfsense.org/issues/9071>`__
* Fixed a ``stream_select()`` error when restoring packages `#9102 <https://redmine.pfsense.org/issues/9102>`__

Wake on LAN
-----------

* Fixed issues with ordering of entries in Wake on LAN `#8926 <https://redmine.pfsense.org/issues/8926>`__
* Added top control buttons to Wake on LAN for **Add** and **Wake all Devices** when there are more than 25 entries `#8943 <https://redmine.pfsense.org/issues/8943>`__

NTP
---

* Fixed issues with NTP status when using ``noquery`` in the default permissions along with a specific ACL for localhost `#7609 <https://redmine.pfsense.org/issues/7609>`__

Logging / Notifications
-----------------------

* Fixed an issue with log file sizes ``>= 2^32/2`` `#9081 <https://redmine.pfsense.org/issues/9081>`__
* Fixed PHP errors when saving log settings `#9095 <https://redmine.pfsense.org/issues/9095>`__
* Added a checkbox to disable TLS certificate verification for SMTP notifications `#9001 <https://redmine.pfsense.org/issues/9001>`__

Install/Upgrade
---------------

* Added a FAT partition to the installer memstick to make it easier to restore a ``config.xml`` file during the install process. Also includes a copy of the license and a README. `#9104 <https://redmine.pfsense.org/issues/9104>`__
* Fixed PHP errors in upgrade code for IPsec `#9083 <https://redmine.pfsense.org/issues/9083>`__

Miscellaneous
-------------

* Fixed HTTPS proxy authentication support for connections on the firewall itself `#9029 <https://redmine.pfsense.org/issues/9029>`__
* Clarified wording of **Kernel PTI** options on **System > Advanced**, **Miscellaneous** tab `#9026 <https://redmine.pfsense.org/issues/9026>`__
* Added a Save button to **Status > Traffic Graphs** to store default settings to use when loading the page `#8976 <https://redmine.pfsense.org/issues/8976>`__
* Added support for ``nvme`` controllers to the S.M.A.R.T. diagnostics page `#9042 <https://redmine.pfsense.org/issues/9042>`__
