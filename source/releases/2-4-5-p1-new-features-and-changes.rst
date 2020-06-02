2.4.5-p1 New Features and Changes
=================================

pfSense® software version 2.4.5-p1 addresses performance, security, and other
miscellaneous issues found in :doc:`2.4.5 <2-4-5-new-features-and-changes>`.

.. warning:: **Proceed with caution when upgrading pfSense software while
   COVID-19 travel restrictions are in effect.**

   During this time of travel limitations, remote upgrades of pfSense software
   should be carefully considered, and avoided where possible. Travel
   restrictions may complicate any repair of any issue, including
   hardware-related issues that render the system unreachable. Should these
   issues require onsite physical access to remedy, repair of the issue may not
   be possible while travel restrictions related to COVID-19 are in effect.

.. tip:: For those who have not yet updated to 2.4.4-p3 or 2.4.4, consult
   the :doc:`previous release notes <index>` and `blog posts for those releases
   <https://www.netgate.com/blog/category.html#releases>`__ to read all
   important information and warnings before proceeding.

Security / Errata
-----------------

* Addressed an issue with large ``pf`` tables causing system instability and high CPU usage during filter reload events `#10414 <https://redmine.pfsense.org/issues/10414>`__
* Fixed an issue with ``sshguard`` which could prevent it from protecting against brute force logins `#10488 <https://redmine.pfsense.org/issues/10488>`__
* Updated ``unbound`` to address CVE-2020-12662 and CVE-2020-12663 `#10576 <https://redmine.pfsense.org/issues/10576>`__
* Updated ``json-c`` to address CVE-2020-12762 `#10609 <https://redmine.pfsense.org/issues/10609>`__

* Addressed FreeBSD Security Advisories & Errata Notices including

  * `FreeBSD-SA-20:10.ipfw <https://security.freebsd.org/advisories/FreeBSD-SA-20:10.ipfw.asc>`__
  * `FreeBSD-SA-20:12.libalias <https://security.freebsd.org/advisories/FreeBSD-SA-20:12.libalias.asc>`__
  * `FreeBSD-SA-20:13.libalias <https://security.freebsd.org/advisories/FreeBSD-SA-20:13.libalias.asc>`__
  * `FreeBSD-SA-20:15.cryptodev <https://security.freebsd.org/advisories/FreeBSD-SA-20:15.cryptodev.asc>`__

Aliases / Tables
----------------

* Fixed handling of URL/URL table aliases with IDN hostnames `#10321 <https://redmine.pfsense.org/issues/10321>`__

Authentication
--------------

* Fixed handling of misconfigured groups which prevented the ``admin`` user from making configuration changes `#10492 <https://redmine.pfsense.org/issues/10492>`__
* Fixed a potential temporary privilege downgrade when deleting an account `#9259 <https://redmine.pfsense.org/issues/9259>`__

Backup / Restore
----------------

* Fixed handling of redundant/extraneous RRD tags when making configuration backups `#10508 <https://redmine.pfsense.org/issues/10508>`__

CARP
----

* Fixed handling of IPv6 CARP VIPs with non-significant zeros during XMLRPC sync `#6579 <https://redmine.pfsense.org/issues/6579>`__

Certificates
------------

* Fixed a bug which prevented the user from removing a CA private key when editing `#10509 <https://redmine.pfsense.org/issues/10509>`__

Configuration Upgrade
---------------------

* Fixed a PHP error during upgrade from <2.4.3 with empty tags in the IPsec configuration `#10458 <https://redmine.pfsense.org/issues/10458>`__

Console Menu
------------

* Changed the naming convention of gateways created at the console to be the same as those created in the GUI `#10264 <https://redmine.pfsense.org/issues/10264>`__

DHCP (IPv6)
-----------

* Added default value placeholders to some DHCPv6 RA configuration options `#10448 <https://redmine.pfsense.org/issues/10448>`__
* Fixed DHCPv6 service Dynamic DNS errors `#10346 <https://redmine.pfsense.org/issues/10346>`__
* Fixed ``rc.newwanipv6`` being called for Request messages which ``dhcp6c`` should have discarded `#9634 <https://redmine.pfsense.org/issues/9634>`__
* Added dashed DUID support to DHCPv6 static mappings `#2568 <https://redmine.pfsense.org/issues/2568>`__

DHCP Relay
----------

* Fixed DHCP Relay handling of scenarios where a target server may be on the same interface as some clients `#10416 <https://redmine.pfsense.org/issues/10416>`__
* Excluded unsupported interface types from DHCP Relay `#10341 <https://redmine.pfsense.org/issues/10341>`__

DHCP Server
-----------

* Fixed DHCPv6 static entries not being updated on external Dynamic DNS servers `#10412 <https://redmine.pfsense.org/issues/10412>`__
* Fixed DHCPv6 ``domain-search`` list not being sent to clients `#10200 <https://redmine.pfsense.org/issues/10200>`__
* Fixed DHCP Server not accepting IPv6 addresses for Dynamic DNS servers `#6600 <https://redmine.pfsense.org/issues/6600>`__

Diagnostics
-----------

* Several improvements and items added to status.php diagnostic output `#10455 <https://redmine.pfsense.org/issues/10455>`__
  `#10424 <https://redmine.pfsense.org/issues/10424>`__
  `#10423 <https://redmine.pfsense.org/issues/10423>`__
  `#10350 <https://redmine.pfsense.org/issues/10350>`__
  `#10349 <https://redmine.pfsense.org/issues/10349>`__
  `#10568 <https://redmine.pfsense.org/issues/10568>`__
* Fixed Require State Filter setting on ``diag_states.php`` breaking filter rule link to associated states `#10359 <https://redmine.pfsense.org/issues/10359>`__

DNS Resolver
------------

* Fixed IPsec and OpenVPN IPv6 tunnel network/pool prefixes not being added to automatic DNS Resolver ACLs `#10460 <https://redmine.pfsense.org/issues/10460>`__
* Fixed EDNS buffer size values to prepare for 2020 DNS flag day `#10293 <https://redmine.pfsense.org/issues/10293>`__
* Fixed DNS Resolver handling of entries from DHCP server which contain a trailing dot in domain names `#8054 <https://redmine.pfsense.org/issues/8054>`__

Dynamic DNS
-----------

* Fixed DigitalOcean Dynamic DNS client handling of IPv6 addresses `#10390 <https://redmine.pfsense.org/issues/10390>`__
* Fixed DNSExit update URL `#9632 <https://redmine.pfsense.org/issues/9632>`__

Hardware / Drivers
------------------

* Added support for ``iwm`` devices `#7725 <https://redmine.pfsense.org/issues/7725>`__

  .. note:: This device only supports Station mode. It does not support acting
     as an access point.
* Added ``ng_etf`` module to ``armv6`` and ``aarch64`` kernels `#10463 <https://redmine.pfsense.org/issues/10463>`__
* Added QLogic 10G driver (``qlxgb``/``qla80xx``) `#9891 <https://redmine.pfsense.org/issues/9891>`__
* Added ``virtio_console`` to the kernel `#9985 <https://redmine.pfsense.org/issues/9985>`__

IPsec
-----

* Fixed selection of IPsec VTI Phase 2 local network address/mask values `#10418 <https://redmine.pfsense.org/issues/10418>`__
* Fixed saving IPsec connection breaking FRR BGP on VTI interfaces `#10351 <https://redmine.pfsense.org/issues/10351>`__
* Updated DH group warnings to say that group 5 is also weak `#10221 <https://redmine.pfsense.org/issues/10221>`__
* Fixed disabling IPsec Phase 1 with a VTI Phase 2 `#10190 <https://redmine.pfsense.org/issues/10190>`__
* Fixed disabled IPsec Phase 2 entries being unintentionally included in ``vpn_networks`` table `#7622 <https://redmine.pfsense.org/issues/7622>`__

L2TP
----

* Changed L2TP ``mpd.secret`` handling so that the server is not restarted after adding/modifying L2TP users `#4866 <https://redmine.pfsense.org/issues/4866>`__
* Fixed handling of L2TP usernames containing a realm separator (``@``) `#9828 <https://redmine.pfsense.org/issues/9828>`__
* Fixed Shared Secret handling in L2TP `#10531 <https://redmine.pfsense.org/issues/10531>`__
  `#10527 <https://redmine.pfsense.org/issues/10527>`__

Limiters
--------

* Fixed input validation of limiters with ECN `#10211 <https://redmine.pfsense.org/issues/10211>`__
* Fixed bogus extra warning dialog on when deleting limiters `#9334 <https://redmine.pfsense.org/issues/9334>`__

Notifications
-------------

* Fixed SMTP notification SSL validation to respect the user-selected behavior `#10317 <https://redmine.pfsense.org/issues/10317>`__

NTPD
----

* Added ``localhost`` to NTP Interface selection options `#10348 <https://redmine.pfsense.org/issues/10348>`__

OpenVPN
-------

* Fixed OpenVPN ``remote`` statement protocol handling `#10368 <https://redmine.pfsense.org/issues/10368>`__
* Added option to configure OpenVPN username as common name behavior `#8289 <https://redmine.pfsense.org/issues/8289>`__

Operating System
----------------

* Fixed handling of RAM disk sizes not accounting for existing disk usage when calculating available kernel memory, which could prevent saving `#10420 <https://redmine.pfsense.org/issues/10420>`__
* Updated ``pkg`` to 1.13.x `#10564 <https://redmine.pfsense.org/issues/10564>`__
* Fixed problems preventing the Netgate Coreboot Package from updating Coreboot properly `#10573 <https://redmine.pfsense.org/issues/10573>`__

Packages
--------

* Fixed handling of FreeRADIUS passwords containing non-XML-safe characters `#4497 <https://redmine.pfsense.org/issues/4497>`__
* Fixed handling of Squid LDAP search filters containing an accent `#7654 <https://redmine.pfsense.org/issues/7654>`__
* Fixed issues preventing FRR from working on certain platforms such as SG-1100 (arm64/aarch64) `#10444 <https://redmine.pfsense.org/issues/10444>`__
* Fixed issues preventing Suricata from working on certain platforms such as SG-1100 (arm64/aarch64) `#10228 <https://redmine.pfsense.org/issues/10228>`__

Rules / NAT
-----------

* Fixed Duplicate Outbound NAT entries from L2TP server addresses `#10247 <https://redmine.pfsense.org/issues/10247>`__
* Fixed Outbound NAT rules for mobile IPsec users with per-user addresses defined `#9320 <https://redmine.pfsense.org/issues/9320>`__
* Fixed IPv6 IP Alias VIPs not being added to Interface Network macros `#8256 <https://redmine.pfsense.org/issues/8256>`__
* Fixed Destination port range "Any" in Port Forward rules `#7704 <https://redmine.pfsense.org/issues/7704>`__
* Fixed display of interfaces on the Floating rules list `#4629 <https://redmine.pfsense.org/issues/4629>`__
* Fixed rule description validation to reject ``\`` `#10542 <https://redmine.pfsense.org/issues/10542>`__
* Fixed setting NAT reflection timeout values `#10591 <https://redmine.pfsense.org/issues/10591>`__

Translations
------------

* Fixed language selection for Chinese (Taiwan) / HK Translations `#10525 <https://redmine.pfsense.org/issues/10525>`__

Services
--------

* Fixed ``is_process_running()`` handling of empty process, which could lead to an error when using the CLI to query the status of a service which does not exist `#10540 <https://redmine.pfsense.org/issues/10540>`__

Web Interface
-------------

* Fixed dark theme auto-complete popup field having dark text on dark background `#10499 <https://redmine.pfsense.org/issues/10499>`__
* Fixed using special characters in Schedule descriptions `#10305 <https://redmine.pfsense.org/issues/10305>`__
* Fixed WebGUI main page loading very slowly when there is no Internet connectivity `#8987 <https://redmine.pfsense.org/issues/8987>`__
