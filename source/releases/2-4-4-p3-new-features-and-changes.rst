2.4.4-p3 New Features and Changes
=================================

pfSense software version 2.4.4-p3 addresses security and other issues found in
:doc:`2.4.4-p2 <2-4-4-p2-new-features-and-changes>`.

.. tip:: For those who have not yet updated to 2.4.4-p2 or 2.4.4, consult
   the :doc:`previous release notes <index>` and `blog posts for those releases
   <https://www.netgate.com/blog/category.html#releases>`__ to read all
   important information and warnings before proceeding.

Security / Errata
-----------------

* Changed ``sshguard`` to block both ssh and the GUI using a single table, and removed the unnecessary manual scheduled table expiration `#9223 <https://redmine.pfsense.org/issues/9223>`__
* Added DNS over TLS host verification `#8602 <https://redmine.pfsense.org/issues/8602>`__

  * Configure hostnames for DNS over TLS servers under **System > General**
* Fixed potential XSS vectors

  * `#9294 <https://redmine.pfsense.org/issues/9294>`__
  * `#9499 <https://redmine.pfsense.org/issues/9499>`__
  * `#9507 <https://redmine.pfsense.org/issues/9507>`__
  * `#9508 <https://redmine.pfsense.org/issues/9508>`__

* Fixed privilege issues

  * `#9511 <https://redmine.pfsense.org/issues/9511>`__
  * `#9512 <https://redmine.pfsense.org/issues/9512>`__
  * `#9513 <https://redmine.pfsense.org/issues/9513>`__
  * Added privileges for Auto Config Backup pages `#9519 <https://redmine.pfsense.org/issues/9519>`__
  * Updated privileges: Added misc missing pages, removed obsolete pages

* Changed LDAP authentication to use ``LDAP_OPT_X_TLS_*`` options instead of LDAP environment variables, which corrects a variety of LDAP-related login issues reported by users `#9417 <https://redmine.pfsense.org/issues/9417>`__
* sqlite updates `#9205 <https://redmine.pfsense.org/issues/9205>`__

Backup / Restore
----------------

* Fixed issues with output buffering causing configuration backup download failures `#9390 <https://redmine.pfsense.org/issues/9390>`__
* Fixed automatic package reinstallation after restoring config.xml from the installer `#9214 <https://redmine.pfsense.org/issues/9214>`__
* Force ``<enableserial>`` when restoring a backup on a device with serial only console

Certificates
------------

* Added missing countries from CA list on certificate pages `#9308 <https://redmine.pfsense.org/issues/9308>`__
* Fixed an error when adding a new user and choosing to generate a certificate `#9317 <https://redmine.pfsense.org/issues/9317>`__

DNS
---

* Fixed input validation on diag_dns.php to allow a trailing dot on hostnames `#9276 <https://redmine.pfsense.org/issues/9276>`__
* Removed non-functional tools links from diag_dns.php `#9275 <https://redmine.pfsense.org/issues/9275>`__
* Fixed rewriting of the DNS Resolver file ``remotecontrol.conf`` if it is present but empty `#9470 <https://redmine.pfsense.org/issues/9470>`__

Firewall Rules / NAT / Aliases
------------------------------

* Fixed intermittent pf errors when NAT reflection is enabled `#9446 <https://redmine.pfsense.org/issues/9446>`__
* Fixed reserved pf keyword matching when creating and editing aliases `#9231 <https://redmine.pfsense.org/issues/9231>`__
* Fixed duplicate entries showing on diag_tables.php from lockout tables `#9359 <https://redmine.pfsense.org/issues/9359>`__
* Fixed a PHP error deleting an imported NAT rule with no firewall rules present `#9193 <https://redmine.pfsense.org/issues/9193>`__
* Do now show scheduler icon when scheduler tag is empty

Gateways / Routing
------------------

* Fixed issues with the default IPv4 gateway set to a group failing after restart `#9004 <https://redmine.pfsense.org/issues/9004>`__

Interfaces
----------

* Fix PHP error from interface groups when editing QinQ entries

IPsec
-----

* Fixed IPsec Phase 1 entries on upgrade to have their ``protocol`` field populated properly `#9207 <https://redmine.pfsense.org/issues/9207>`__

Operating System
----------------

* Fixed support for ZFS encrypted+mirrored swap `#9281 <https://redmine.pfsense.org/issues/9281>`__
* Fixed problems saving crash dumps when ``/var`` is a RAM disk `#9409 <https://redmine.pfsense.org/issues/9409>`__

Traffic Shaping
---------------

* Fixed a PHP error when loading a limiter that does not exist `#9313 <https://redmine.pfsense.org/issues/9313>`__
* Fixed limiter selection validation
* Fixed Queues menu items ending with ":" in certain languages `#8970 <https://redmine.pfsense.org/issues/8970>`__

WebGUI
------

* Numerous optimizations and improvements for status.php diagnostics output `#9290 <https://redmine.pfsense.org/issues/9290>`__
* Fixed a PHP error on system_advanced_network.php when disabling "IPv6 over IPv4 Tunneling" `#9264 <https://redmine.pfsense.org/issues/9264>`__
* Improved handling of large captures on diag_packet_capture.php and disabled viewing of captures larger than 50MiB. `#9239 <https://redmine.pfsense.org/issues/9239>`__
* Added hostname to login page title if the user has enabled **Show hostname on login banner** `#9096 <https://redmine.pfsense.org/issues/9096>`__
* Centralized the list of country codes used by multiple areas `#9308 <https://redmine.pfsense.org/issues/9308>`__
* Update translation files

XMLRPC
------

* Clarified conditions for synchronizing certificates in HA Sync options `#9283 <https://redmine.pfsense.org/issues/9283>`__
