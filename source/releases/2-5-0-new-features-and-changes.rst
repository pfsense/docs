2.5.0 New Features and Changes
==============================

pfSense software version 2.5.0 brings a major OS version upgrade, OpenSSL
upgrades, PHP and Python upgrades, and numerous bug fixes.

.. warning:: The original plan was to include a RESTCONF API in pfSense version
   2.5.0, which for security reasons would have required hardware AES-NI or
   equivalent support. Plans have since changed, and pfSense 2.5.0 does not
   contain the planned RESTCONF API, thus **pfSense version 2.5.0 WILL NOT
   require AES-NI**.

.. tip:: For those who have not yet updated to 2.4.4-p1 or 2.4.4, consult
   the previous release notes and blog posts for those releases to read all
   important information and warnings before proceeding.

Operating System / Architecture changes
---------------------------------------

* Base OS upgraded to FreeBSD **12.0-RELEASE-p3**
* OpenSSL upgraded to **1.1.1a-freebsd**
* PHP upgraded to **7.3** `#9365 <https://redmine.pfsense.org/issues/9365>`__
* Python upgraded to **3.6** `#9360 <https://redmine.pfsense.org/issues/9360>`__

Security / Errata
-----------------

* Changed ``sshguard`` to block both ssh and the GUI using a single table, and removed the unnecessary manual scheduled table expiration `#9223 <https://redmine.pfsense.org/issues/9223>`__
* Added DNS over TLS host verification `#8602 <https://redmine.pfsense.org/issues/8602>`__

  * Configure hostnames for DNS over TLS servers under **System > General**

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

Known Issues
------------

* During development of pfSense version 2.5.0, there is a significant chance
  that packages will be unstable until closer to the release. Most of this is
  due to OpenSSL changes. This will stabilize as development progresses.

Backup / Restore
----------------

* Fixed issues with output buffering causing configuration backup download failures `#9390 <https://redmine.pfsense.org/issues/9390>`__
* Fixed automatic package reinstallation after restoring config.xml from the installer `#9214 <https://redmine.pfsense.org/issues/9214>`__

Certificates
------------

* Added missing countries from CA list on certificate pages `#9308 <https://redmine.pfsense.org/issues/9308>`__
* Fixed an error when adding a new user and choosing to generate a certificate `#9317 <https://redmine.pfsense.org/issues/9317>`__

DNS
---

* Fixed input validation on diag_dns.php to allow a trailing dot on hostnames `#9276 <https://redmine.pfsense.org/issues/9276>`__
* Removed non-functional tools links from diag_dns.php `#9275 <https://redmine.pfsense.org/issues/9275>`__

Firewall Rules / NAT / Aliases
------------------------------

* Fixed reserved pf keyword matching when creating and editing aliases `#9231 <https://redmine.pfsense.org/issues/9231>`__
* Fixed duplicate entries showing on diag_tables.php from lockout tables `#9359 <https://redmine.pfsense.org/issues/9359>`__
* Fixed a PHP error deleting an imported NAT rule with no firewall rules present `#9193 <https://redmine.pfsense.org/issues/9193>`__

Gateways / Routing
------------------

* Fixed issues with the default IPv4 gateway set to a group failing after restart `#9004 <https://redmine.pfsense.org/issues/9004>`__

Interfaces
----------

* Fixed issues with PPPoE over a VLAN failing to reconnect `#9148 <https://redmine.pfsense.org/issues/9148>`__

IPsec
-----

* Fixed IPsec Phase 1 entries on upgrade to have their ``protocol`` field populated properly `#9207 <https://redmine.pfsense.org/issues/9207>`__

Traffic Shaping
---------------

* Fixed a PHP error when loading a limiter that does not exist `#9313 <https://redmine.pfsense.org/issues/9313>`__
* Fixed Queues menu items ending with ":" in certain languages `#8970 <https://redmine.pfsense.org/issues/8970>`__

XMLRPC
------

* Clarified conditions for synchronizing certificates in HA Sync options `#9283 <https://redmine.pfsense.org/issues/9283>`__

Miscellaneous
-------------

* Updated the SMART page with new capabilities `#9367 <https://redmine.pfsense.org/issues/9367>`__
* Numerous optimizations and improvements for status.php diagnostics output `#9290 <https://redmine.pfsense.org/issues/9290>`__
* Fixed support for ZFS encrypted+mirrored swap `#9281 <https://redmine.pfsense.org/issues/9281>`__
* Fixed a PHP error on system_advanced_network.php when disabling "IPv6 over IPv4 Tunneling" `#9264 <https://redmine.pfsense.org/issues/9264>`__
* Improved handling of large captures on diag_packet_capture.php and disabled viewing of captures larger than 50MiB. `#9239 <https://redmine.pfsense.org/issues/9239>`__
