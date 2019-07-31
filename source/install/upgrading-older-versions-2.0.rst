Upgrading from versions older than pfSense® 2.0
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. seealso:: For information about upgrading to current versions, see
   :doc:`upgrade-guide`.

.. warning:: Uninstalling **all** packages is **required** when upgrading from
   old releases. Packages **must be removed** before the upgrade is performed.
   After the upgrade is complete, packages can be reinstalled. Package
   configuration is automatically retained.

Note for users of the OpenVPN Status Package
++++++++++++++++++++++++++++++++++++++++++++

If a manual ``management`` directive was entered into the **Advanced
Configuration** of an OpenVPN client or server, it must be removed. The OpenVPN
status code is built into pfSense® software version 2.x and later, and it is
handled internally. The management directive must be removed or the status of
the VPN instance will not be properly reported.

Note for Captive Portal RADIUS WISPr Bandwidth Users
++++++++++++++++++++++++++++++++++++++++++++++++++++

The WISPr RADIUS attributes were incorrectly applied to all versions prior to
pfSense 2.0-RELEASE. They were applied as *Kbps* where WISPr is supposed to be
*bps*, hence those using WISPr attributes will have one one-thousandth of the
previous bandwidth unless the RADIUS server is corrected. The RADIUS server will
need to have these values updated to bps for proper functionality once the
firewall has been upgraded to pfSense 2.0-RELEASE or later.

International/Special Characters in 1.2.x Configurations
++++++++++++++++++++++++++++++++++++++++++++++++++++++++

International characters, such as åäö and so on, were not supported on pfSense
1.2.x, but were allowed in some places due to overly lenient input validation
and less strict XML parsing. These characters causes invalid XML when they are
stored directly, and as such if pfSense 1.2.x did not crash and toss out the
configuration with such characters, it will not upgrade to any current version
of pfSense software.

pfSense software version 2.0 and later will reset and toss out the config.xml
on every reboot if it contains these characters bare, leaving the firewall at
an "assign interfaces" prompt since it does not have a valid configuration.

The *config.xml* file can be run through an XML parser such as ``xmllint`` and
the parser will show where problems exist, if any. Fix the errors, and then the
corrected configuration can be used for an upgrade. The good news is that these
characters are handled properly in most areas of the current pfSense GUI, and
they are CDATA escaped so they are safe from such errors.

Upgrading High Availability Deployments
+++++++++++++++++++++++++++++++++++++++

When upgrading from pfSense 1.2.3 to 2.0 or later, Check the CARP VIPs to make
sure they are actually on the proper interface. That is, that the interface
chosen for the VIP properly matches the subnet in which the CARP VIP resides,
and that the subnet mask is proper. pfSense 2.0 validates this more strictly
than previous releases, and as a consequence if a CARP VIP was misconfigured on
pfSense 1.2.3, it may not upgrade cleanly.
