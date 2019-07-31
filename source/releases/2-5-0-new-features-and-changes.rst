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

* Base OS upgraded to FreeBSD **12.0-RELEASE-p3**
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

* Changed LDAP authentication to use ``LDAP_OPT_X_TLS_*`` options instead of LDAP environment variables, which corrects a variety of LDAP-related login issues reported by users `#9417 <https://redmine.pfsense.org/issues/9417>`__

Known Issues
------------

* During development of pfSense version 2.5.0, there is a significant chance
  that packages will be unstable until closer to the release. Most of this is
  due to OpenSSL changes. This will stabilize as development progresses.


Interfaces
----------

* Fixed issues with PPPoE over a VLAN failing to reconnect `#9148 <https://redmine.pfsense.org/issues/9148>`__

Miscellaneous
-------------

* Updated the SMART page with new capabilities `#9367 <https://redmine.pfsense.org/issues/9367>`__
