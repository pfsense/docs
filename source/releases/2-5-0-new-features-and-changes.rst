2.5.0 New Features and Changes
==============================

pfSense® software version 2.5.0 brings a major OS version upgrade, OpenSSL
upgrades, PHP and Python upgrades, and numerous bug fixes.

.. warning:: The original plan was to include a RESTCONF API in pfSense version
   2.5.0, which for security reasons would have required hardware AES-NI or
   equivalent support. Plans have since changed, and pfSense 2.5.0 does not
   contain the planned RESTCONF API, thus **pfSense version 2.5.0 WILL NOT
   require AES-NI**.

.. tip:: For those who have not yet updated to 2.4.4-p3 or 2.4.4, consult
   the :doc:`previous release notes <index>` and `blog posts for those releases
   <https://www.netgate.com/blog/category.html#releases>`__ to read all
   important information and warnings before proceeding.

Operating System / Architecture changes
---------------------------------------

* Base OS upgraded to FreeBSD **12.0-RELEASE-p10**
* OpenSSL upgraded to **1.1.1a-freebsd**
* PHP upgraded to **7.3** `#9365 <https://redmine.pfsense.org/issues/9365>`__
* Python upgraded to **3.6** `#9360 <https://redmine.pfsense.org/issues/9360>`__

Security / Errata
-----------------

* Deprecated the built-in relayd Load Balancer `#9386 <https://redmine.pfsense.org/issues/9386>`__

  * ``relayd`` does not function with OpenSSL 1.1.x
  * The ``relayd`` port is currently marked BROKEN for FreeBSD 12 and later, and has been this way since October -- There is no apparent sign of work to make it compatible with OpenSSL 1.1.x
  * The HAProxy package may be used in its place; It is a much more robust and more feature-complete load balancer and reverse proxy
  * For more information on implementing HAProxy, see :doc:`../packages/haproxy-package` and the `Hangout <https://www.netgate.com/resources/videos/server-load-balancing-on-pfsense-24.html>`_

.. warning:: See the `FreeBSD 12.0 Release Notes <https://www.freebsd.org/releases/12.0R/relnotes.html#drivers-network>`_
   for information on deprecated hardware drivers that may impact firewalls
   upgrading to pfSense version 2.5.0. Some of these were renamed or folded into
   other drivers, others have been removed, and more are slated for removal in
   FreeBSD 13 in the future.

* Added encoding to the hostname in services_acb.php `#9584 <https://redmine.pfsense.org/issues/9584>`__
* Added encoding to error output in services_captiveportal_mac.php `#9609 <https://redmine.pfsense.org/issues/9609>`__
* Improved Picture Widget input validation `#9610 <https://redmine.pfsense.org/issues/9610>`__ `#9731 <https://redmine.pfsense.org/issues/9731>`__
* Added a ``fsck`` run with ``-z`` for ``UFS`` filesystems on upgrade to address FreeBSD-SA-19:10.ufs `#9612 <https://redmine.pfsense.org/issues/9612>`__
* Fixed format of XMLRPC auth error to match GUI auth error `#9782 <https://redmine.pfsense.org/issues/9782>`__

* Addressed FreeBSD Security Advisories & Errata Notices

  * `FreeBSD-SA-19:24.mqueuefs  <https://security.freebsd.org/advisories/FreeBSD-SA-19:24.mqueuefs.asc>`__
  * `FreeBSD-SA-19:23.midi      <https://security.freebsd.org/advisories/FreeBSD-SA-19:23.midi.asc>`__
  * `FreeBSD-SA-19:22.mbuf      <https://security.freebsd.org/advisories/FreeBSD-SA-19:22.mbuf.asc>`__
  * `FreeBSD-SA-19:21.bhyve     <https://security.freebsd.org/advisories/FreeBSD-SA-19:21.bhyve.asc>`__
  * `FreeBSD-SA-19:20.bsnmp     <https://security.freebsd.org/advisories/FreeBSD-SA-19:20.bsnmp.asc>`__
  * `FreeBSD-SA-19:19.mldv2     <https://security.freebsd.org/advisories/FreeBSD-SA-19:19.mldv2.asc>`__
  * `FreeBSD-SA-19:18.bzip2     <https://security.freebsd.org/advisories/FreeBSD-SA-19:18.bzip2.asc>`__
  * `FreeBSD-SA-19:17.fd        <https://security.freebsd.org/advisories/FreeBSD-SA-19:17.fd.asc>`__
  * `FreeBSD-SA-19:16.bhyve     <https://security.freebsd.org/advisories/FreeBSD-SA-19:16.bhyve.asc>`__
  * `FreeBSD-SA-19:15.mqueuefs  <https://security.freebsd.org/advisories/FreeBSD-SA-19:15.mqueuefs.asc>`__
  * `FreeBSD-SA-19:14.freebsd32 <https://security.freebsd.org/advisories/FreeBSD-SA-19:14.freebsd32.asc>`__
  * `FreeBSD-SA-19:13.pts       <https://security.freebsd.org/advisories/FreeBSD-SA-19:13.pts.asc>`__
  * `FreeBSD-SA-19:12.telnet    <https://security.freebsd.org/advisories/FreeBSD-SA-19:12.telnet.asc>`__
  * `FreeBSD-SA-19:11.cd_ioctl  <https://security.freebsd.org/advisories/FreeBSD-SA-19:11.cd_ioctl.asc>`__
  * `FreeBSD-SA-19:10.ufs       <https://security.freebsd.org/advisories/FreeBSD-SA-19:10.ufs.asc>`__
  * `FreeBSD-SA-19:09.iconv     <https://security.freebsd.org/advisories/FreeBSD-SA-19:09.iconv.asc>`__
  * `FreeBSD-SA-19:08.rack      <https://security.freebsd.org/advisories/FreeBSD-SA-19:08.rack.asc>`__
  * `FreeBSD-EN-19:17.ipfw      <https://security.freebsd.org/advisories/FreeBSD-EN-19:17.ipfw.asc>`__
  * `FreeBSD-EN-19:16.bhyve     <https://security.freebsd.org/advisories/FreeBSD-EN-19:16.bhyve.asc>`__
  * `FreeBSD-EN-19:15.libunwind <https://security.freebsd.org/advisories/FreeBSD-EN-19:15.libunwind.asc>`__
  * `FreeBSD-EN-19:14.epoch     <https://security.freebsd.org/advisories/FreeBSD-EN-19:14.epoch.asc>`__
  * `FreeBSD-EN-19:13.mds       <https://security.freebsd.org/advisories/FreeBSD-EN-19:13.mds.asc>`__
  * `FreeBSD-EN-19:12.tzdata    <https://security.freebsd.org/advisories/FreeBSD-EN-19:12.tzdata.asc>`__
  * `FreeBSD-EN-19:11.net       <https://security.freebsd.org/advisories/FreeBSD-EN-19:11.net.asc>`__


Known Issues
------------

* During development of pfSense version 2.5.0, there is a significant chance
  that packages will be unstable until closer to the release. Most of this is
  due to OpenSSL changes. This will stabilize as development progresses.

Aliases/Tables
--------------

* Fixed URL-based Alias only storing last-most entry in the configuration `#9074 <https://redmine.pfsense.org/issues/9074>`__

Authentication
--------------

* Set RADIUS NAS Identifier to include ``webConfigurator`` and the firewall hostname when logging in the GUI `#9209 <https://redmine.pfsense.org/issues/9209>`__
* Added exception handling to authentication attempts `#9150 <https://redmine.pfsense.org/issues/9150>`__

Backup/Restore
--------------

* Fixed AutoConfigBackup allowing manual backups when disabled `#9785 <https://redmine.pfsense.org/issues/9785>`__
* Added a special string (``NoReMoTeBaCkUp``) that when used in ``write_config()`` descriptions will prevent a remote backup `#9693 <https://redmine.pfsense.org/issues/9693>`__
* Removed legacy AutoConfigBackup options (there were no more active accounts using the retired legacy service) `#9687 <https://redmine.pfsense.org/issues/9687>`__
* Changed ``crypt_data()`` to use stronger key derivation `#9421 <https://redmine.pfsense.org/issues/9421>`__
* Updated ``crypt_data()`` syntax for OpenSSL 1.1.x `#9420 <https://redmine.pfsense.org/issues/9420>`__
* Added CDATA protection to the ``encryption_password`` XML tag, which allows international characters to be used in that field `#7186 <https://redmine.pfsense.org/issues/7186>`__

Captive Portal
--------------

* Fixed Captive Portal vouchers shortcut links `#9722 <https://redmine.pfsense.org/issues/9722>`__
* Changed Captive Portal vouchers to use ``phpseclib`` so it can generate keys natively in PHP, and to work around OpenSSL deprecating key sizes needed for vouchers `#9443 <https://redmine.pfsense.org/issues/9443>`__
* Added ``trim()`` to the submitted username, so that spaces before/after in input do not cause authentication errors `#9274 <https://redmine.pfsense.org/issues/9274>`__
* Optimized Captive Portal authentication attempts when using multiple authentication servers `#9255 <https://redmine.pfsense.org/issues/9255>`__
* Fixed Captive Portal session timeout values for RADIUS users who do not have a timeout returned from the server `#9208 <https://redmine.pfsense.org/issues/9208>`__
* Changed Captive Portal so that users no longer get disconnected when changes are made to Captive Portal settings `#8616 <https://redmine.pfsense.org/issues/8616>`__
* Added an option so that Captive Portals may choose to remove or retain logins across reboot `#5644 <https://redmine.pfsense.org/issues/5644>`__

Certificates
------------

* Added sorting and search/filtering to Certificate Authority & Certificate manager `#9412 <https://redmine.pfsense.org/issues/9412>`__
* Fixed OCSP stapling detection for OpenSSL 1.1.x `#9408 <https://redmine.pfsense.org/issues/9408>`__
* Corrected wording of CA/Cert CN input validation `#9234 <https://redmine.pfsense.org/issues/9234>`__

Dashboard
---------

* Added PPP uptime to the Dashboard Interfaces Widget `#9426 <https://redmine.pfsense.org/issues/9426>`__
* Added option to disable PTI display in System Information widget `#9323 <https://redmine.pfsense.org/issues/9323>`__

DHCP
----

* Fixed incorrect expansion of Dynamic DNS advanced options on the DHCPv6 Server page `#9448 <https://redmine.pfsense.org/issues/9448>`__
* Changed DHCP relay backend code to determine and specify separate upstream and downstream interface lists `#9466 <https://redmine.pfsense.org/issues/9466>`__
* Prevented OpenVPN interfaces from being used by DHCP relay, since that type of interface is not compatible `#8443 <https://redmine.pfsense.org/issues/8443>`__
* Fixed handling of spaces in DHCP lease hostnames by ``dhcpleases`` `#9758 <https://redmine.pfsense.org/issues/9758>`__
* Added an option to disable ping check in dhcpd `#9285 <https://redmine.pfsense.org/issues/9285>`__
* Fixed **Show all configured leases** so it is persistent after deleting a DHCP lease `#9133 <https://redmine.pfsense.org/issues/9133>`__
* Fixed DHCP leases hostname parsing problems which prevented some hostnames from being displayed in the GUI `#3500 <https://redmine.pfsense.org/issues/3500>`__

Diagnostics
-----------

* Fixed a PHP warning in diag_dump_states.php `#9780 <https://redmine.pfsense.org/issues/9780>`__
* Fixed reverse lookup of IPv6 addresses on diag_dns.php `#9543 <https://redmine.pfsense.org/issues/9543>`__
* Fixed diag_system_activity.php to use batch mode for top so it displays process list w/o terminal, and increased amount of output displayed `#9522 <https://redmine.pfsense.org/issues/9522>`__

DNS
---

* Added ``127.0.0.0/8`` to the DNS Resolver ``private-address`` list for DNS rebinding protection `#9708 <https://redmine.pfsense.org/issues/9708>`__
* Fixed CIDR selection issues with /32 entries in DNS Resolver Access List entries `#9586 <https://redmine.pfsense.org/issues/9586>`__
* Added DNS Resolver (Unbound) Python Integration `#9251 <https://redmine.pfsense.org/issues/9251>`__
* Added TCP_RFC7413 in kernel, required for the BIND package `#7293 <https://redmine.pfsense.org/issues/7293>`__

Dynamic DNS
-----------

* Fixed Dynamic DNS class constructor name `#9779 <https://redmine.pfsense.org/issues/9779>`__
* Fixed errors in DNSimple Dynamic DNS `#9580 <https://redmine.pfsense.org/issues/9580>`__
* Fixed Dynamic DNS Dashboard Widget address parsing for entries with split hostname/domain (e.g. Namecheap) `#9564 <https://redmine.pfsense.org/issues/9564>`__
* Added support for Gandi LiveDNS Dynamic DNS `#9452 <https://redmine.pfsense.org/issues/9452>`__
* Fixed handling of wildcard (``*``) hostname entries in Cloudflare Dynamic DNS `#9361 <https://redmine.pfsense.org/issues/9361>`__
* Added support for AAAA records to Digital Ocean Dynamic DNS `#9280 <https://redmine.pfsense.org/issues/9280>`__
* Cleaned up whitespace issues in Azure Dynamic DNS backend code `#9271 <https://redmine.pfsense.org/issues/9271>`__
* Added support for Linode Dynamic DNS `#9268 <https://redmine.pfsense.org/issues/9268>`__
* Fixed issues with IPv6 on Azure Dynamic DNS `#9248 <https://redmine.pfsense.org/issues/9248>`__
* Fixed handling of wildcards in Route53 Dynamic DNS `#9053 <https://redmine.pfsense.org/issues/9053>`__
* Fixed handling of wildcards in Loopia Dynamic DNS `#8014 <https://redmine.pfsense.org/issues/8014>`__

Interfaces
----------

* Fixed issues with PPPoE over a VLAN failing to reconnect `#9148 <https://redmine.pfsense.org/issues/9148>`__
* Added more prefix delegation size entries to selection list on interfaces.php `#9590 <https://redmine.pfsense.org/issues/9590>`__
* Added initialization to the VLAN array in console setup `#9582 <https://redmine.pfsense.org/issues/9582>`__
* Changed the way interface VLAN support is detected so it does not rely on the VLANMTU flag `#9548 <https://redmine.pfsense.org/issues/9548>`__
* Fixed issues with Netgate & hardware model detection which caused problems with default interface mappings `#8051 <https://redmine.pfsense.org/issues/8051>`__
* Fixed issues with display of previously-entered IP address values on interfaces_ppps_edit.php `#9741 <https://redmine.pfsense.org/issues/9741>`__
* Fixed issues with PPPoE over a VLAN failing to reconnect `#9148 <https://redmine.pfsense.org/issues/9148>`__

IPsec
-----

* Fixed IPsec VTI interface creation logic `#9781 <https://redmine.pfsense.org/issues/9781>`__
* Added GUI option for IPsec P2/Child SA close action `#9767 <https://redmine.pfsense.org/issues/9767>`__
* Added IPsec DH and PFS groups 25, 26, and 27 `#9757 <https://redmine.pfsense.org/issues/9757>`__
* Added 25519 curve-based IPsec DH and PFS groups 31 and 32 `#9531 <https://redmine.pfsense.org/issues/9531>`__
* Enabled NAT-T controls for IKEv2 `#9695 <https://redmine.pfsense.org/issues/9695>`__
* Improved handling of IPsec restarts breaking VTI routing `#9668 <https://redmine.pfsense.org/issues/9668>`__
* Fixed input validation that incorrectly prevented deleting IPsec P2 entries in some cases with VTI `#9258 <https://redmine.pfsense.org/issues/9258>`__
* Fixed IPsec ``keyid`` identifier handling `#9243 <https://redmine.pfsense.org/issues/9243>`__
* Fixed IPsec VTI MTU boot-time configuration `#9111 <https://redmine.pfsense.org/issues/9111>`__
* Enabled the strongSwan PKCS#11 plugin `#6775 <https://redmine.pfsense.org/issues/6775>`__
* Fixed IPsec configuration generation so that encryption options for every P2 on a given P1 are not duplicated on each P2 `#6263 <https://redmine.pfsense.org/issues/6263>`__

Logging
-------

* Changed system logging to use plain text logging and log rotation, the old binary clog format has been deprecated `#8350 <https://redmine.pfsense.org/issues/8350>`__
* Updated firewall log daemon to match data structure changes for FreeBSD 12.x `#9411 <https://redmine.pfsense.org/issues/9411>`__
* Updated firewall log parsing to match new format of logs in FreeBSD 12.x `#9415 <https://redmine.pfsense.org/issues/9415>`__
* Updated default log size (512k + rotated copies), default lines to display (500, was 50), and max line limits (200k, up from 2k) `#9734 <https://redmine.pfsense.org/issues/9734>`__
* Added log tabs for nginx, userlog, utx/lastlog, and some other previously hidden logs `#9714 <https://redmine.pfsense.org/issues/9714>`__
* Relocated Package Logs into a tab under System Logs and standardized display/filtering of package logs `#9714 <https://redmine.pfsense.org/issues/9714>`__
* Added GUI options to control log rotation `#9711 <https://redmine.pfsense.org/issues/9711>`__
* Added code for packages to set their own log rotation parameters `#9712 <https://redmine.pfsense.org/issues/9712>`__
* Removed the redundant ``nginx-error.log`` file `#7198 <https://redmine.pfsense.org/issues/7198>`__
* Fixed some instances where logs were mixed into the wrong log files/tabs (Captive Portal/DHCP/squid/php/others) `#1375 <https://redmine.pfsense.org/issues/1375>`__
* Reorganized/restructured several log tabs `#9714 <https://redmine.pfsense.org/issues/9714>`__
* Added a dedicated authentication log `#9754 <https://redmine.pfsense.org/issues/9754>`__

Monitoring
----------

* Fixed custom view titles being forced to lower case `#9681 <https://redmine.pfsense.org/issues/9681>`__

Notifications
-------------

* Fixed SMTP notification password being unintentionally changed when testing SMTP settings `#9684 <https://redmine.pfsense.org/issues/9684>`__
* Deprecated & Removed Growl Notifications `#8821 <https://redmine.pfsense.org/issues/8821>`__

NTPD
----

* Added validation to ensure NTP values are treated as numbers before use `#9558 <https://redmine.pfsense.org/issues/9558>`__
* Added GUI options for NTP sync/poll intervals `#6787 <https://redmine.pfsense.org/issues/6787>`__

OpenVPN
-------

* Fixed JavaScript issue when selecting multiple OpenVPN NCP algorithms `#9756 <https://redmine.pfsense.org/issues/9756>`__
* Fixed OpenVPN wizard so it does not show DH parameter lengths that are not available `#9748 <https://redmine.pfsense.org/issues/9748>`__
* Fixed issues with OpenVPN resynchronizing when running on a gateway group `#9595 <https://redmine.pfsense.org/issues/9595>`__
* Updated OpenVPN local auth to handle changes in fcgicli output `#9460 <https://redmine.pfsense.org/issues/9460>`__
* Added an option to set the OpenVPN TLS Key Direction `#9030 <https://redmine.pfsense.org/issues/9030>`__
* Added GUI options to configure OpenVPN keepalive parameters `#3473 <https://redmine.pfsense.org/issues/3473>`__

Operating System
----------------

* Fixed serial console terminal size issues `#9569 <https://redmine.pfsense.org/issues/9569>`__

Routing
-------

* Enabled the RADIX_MPATH kernel option for multi-path routing `#9544 <https://redmine.pfsense.org/issues/9544>`__
* Fixed ``(Default)`` designation on routes to match the default route in the OS `#9292 <https://redmine.pfsense.org/issues/9292>`__
* Fixed automatic static routes set for DNS gateway bindings not being removed when no longer necessary `#8922 <https://redmine.pfsense.org/issues/8922>`__

Rules / NAT
-----------

* Fixed state kill ordering in rc.newwanip `#4674 <https://redmine.pfsense.org/issues/4674>`__

S.M.A.R.T.
----------

* Updated the SMART page with new capabilities `#9367 <https://redmine.pfsense.org/issues/9367>`__

SNMP
----

* Fixed SNMP sysDescr contents to include hostname and patch version `#9218 <https://redmine.pfsense.org/issues/9218>`__

Translations
------------

* Added Italian translation `#9716 <https://redmine.pfsense.org/issues/9716>`__
* Fixed an issue with international characters in configuration descriptions, which led to failures in certain cases, such as failing to set Manual Outbound NAT when the Language was set to pt_BR `#6195 <https://redmine.pfsense.org/issues/6195>`__

Upgrade
-------

* Revised update check to provide a more consistent version string in JSON format `#9778 <https://redmine.pfsense.org/issues/9778>`__
* Fixed issues with checking for updates from the GUI behind a proxy with authentication `#9478 <https://redmine.pfsense.org/issues/9478>`__

User Manager / Privileges
-------------------------

* Added input validation to prevent changing the authentication server name `#9692 <https://redmine.pfsense.org/issues/9692>`__
* Added privilege to manage integrated switches `#9620 <https://redmine.pfsense.org/issues/9620>`__
* Fixed privilege matching to handle JS anchor links `#9550 <https://redmine.pfsense.org/issues/9550>`__
* Removed wildcards incorrectly used in ``isAllowedPage()`` `#9541 <https://redmine.pfsense.org/issues/9541>`__
* Added menu entry for User Password Manager if the user does not have permission to reach the User Manager `#9428 <https://redmine.pfsense.org/issues/9428>`__
* Improved Deny Config Write privilege handling in the User & Group Manager `#9259 <https://redmine.pfsense.org/issues/9259>`__
* Fixed input validation of group name sizes to allow longer remote groups `#3792 <https://redmine.pfsense.org/issues/3792>`__

Web Interface
-------------

* Corrected input validation for firewall rule VLAN priority/set `#9763 <https://redmine.pfsense.org/issues/9763>`__
* Restricted Thoth tests to arm64 in status.php NG 2569
* Added kernel memory usage to status.php output `#9705 <https://redmine.pfsense.org/issues/9705>`__
* Redacted several additional fields in status.php output `#9784 <https://redmine.pfsense.org/issues/9784>`__
  `#9729 <https://redmine.pfsense.org/issues/9729>`__
  `#9728 <https://redmine.pfsense.org/issues/9728>`__
  `#9727 <https://redmine.pfsense.org/issues/9727>`__
  `#9694 <https://redmine.pfsense.org/issues/9694>`__
* Increased the number of colors available for the login screen `#9706 <https://redmine.pfsense.org/issues/9706>`__
* Added TLS 1.3 to GUI and Captive Portal web server configuration, and removed older versions (TLS 1.0 removed from Captive Portal, TLS 1.1 removed from GUI) `#9607 <https://redmine.pfsense.org/issues/9607>`__
* Fixed a potential source of PHP errors when saving per-log settings `#9540 <https://redmine.pfsense.org/issues/9540>`__
* Added GUI components for MDS mitigation `#9532 <https://redmine.pfsense.org/issues/9532>`__
* Fixed empty lines in various forms throughout the GUI `#9449 <https://redmine.pfsense.org/issues/9449>`__
* Fixed integrated switch LAGG member editing on switch_ports.php `#9447 <https://redmine.pfsense.org/issues/9447>`__
* Improved validation of FQDNs `#9023 <https://redmine.pfsense.org/issues/9023>`__
* Fixed wizard.php selection option size attribute handling `#8907 <https://redmine.pfsense.org/issues/8907>`__
* Fixed platform detection for certain C2558/C2758 systems `#6846 <https://redmine.pfsense.org/issues/6846>`__

Wireless
--------

* Added support for the ``athp(4)`` wireless interface driver `#9538 <https://redmine.pfsense.org/issues/9538>`__ `#9600 <https://redmine.pfsense.org/issues/9600>`__
