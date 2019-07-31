2.4.4-p2 New Features and Changes
=================================

pfSense® software version 2.4.4-p2 adds support for new Netgate hardware and
corrects issues found with :doc:`2.4.4-p1 <2-4-4-p1-new-features-and-changes>`.

.. warning:: For those who have not yet updated to 2.4.4-p1 or 2.4.4, consult
   the release notes and blog posts for those releases to read all important
   information and warnings before proceeding.

Miscellaneous
-------------

* Hardware support/improvements for Netgate products
* Fixed swap slice labeling in MBR mode and changed the way swap is located at boot time to detect and work around incorrect ``fstab`` swap labels created by the installer `#9182 <https://redmine.pfsense.org/issues/9182>`__
* Fixed handling of IPv6 name servers with nginx when using a certificate that requires OCSP stapling `#9160 <https://redmine.pfsense.org/issues/9160>`__
* Fixed handling of NPt rules using a /128 prefix `#9163 <https://redmine.pfsense.org/issues/9163>`__
* Fixed a PHP error in the Setup Wizard when dealing with static gateways `#9170 <https://redmine.pfsense.org/issues/9170>`__
* Updated Dynamic DNS to accommodate recent changes in the Digital Ocean API `#9171 <https://redmine.pfsense.org/issues/9171>`__
* Fixed OpenVPN RADIUS authentication use of ``calling_station_id`` `#9178 <https://redmine.pfsense.org/issues/9178>`__
* Fixed input validation that rejected certain valid hash algorithms when signing a CSR `#9180 <https://redmine.pfsense.org/issues/9180>`__
* Removed obsolete and unused OLSRD code `#9117 <https://redmine.pfsense.org/issues/9117>`__
