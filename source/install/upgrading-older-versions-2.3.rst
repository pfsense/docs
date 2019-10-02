Upgrading from versions older than pfSense 2.3
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. seealso:: For information about upgrading to current versions, see
   :doc:`upgrade-guide`.

.. warning:: Uninstalling *all* packages is **required** when upgrading from
   old releases. Packages **must be removed** before the upgrade is performed.
   After the upgrade is complete, packages can be reinstalled. Package
   configuration is automatically retained.

See :doc:`/releases/2-3-new-features-and-changes` for a larger list of changes.

* Due to the GUI overhaul, older themes have been removed. All previously chosen
  themes are reset on upgrade to the default "pfSense" 2.3 theme.
* **Status > RRD Graphs** moved to **Status > Monitoring** and has been
  revamped. The same data, and more, is still accessible but with a modern
  interface.
* **System > Firmware** is now **System > Update**
* **System > Packages** is now **System > Package Manager**

Limiters
++++++++

* On pfSense® software versions 2.2 and 2.3, limiters cannot be used on firewall
  rules residing on interfaces where NAT applies. This limits their use to
  LAN-type interfaces only, and not WANs, in most circumstances. This has been
  fixed on pfSense 2.4.
  `Bug #4326 <https://redmine.pfsense.org/issues/4326>`__

* On pfSense software versions 2.2 and 2.3, limiters cannot be used where pfsync
  is enabled. This has been fixed on pfSense 2.4.3. 
  `Bug #4310 <https://redmine.pfsense.org/issues/4310>`__

NanoBSD
+++++++

.. warning:: NanoBSD has been deprecated as of pfSense 2.4.0-RELEASE. This
   section remains only for users on i386 hardware with NanoBSD who must upgrade
   to pfSense 2.3.5-p2.

   In most cases, a full installation may be used in place of NanoBSD.
   Activating the option to keep ``/var`` and ``/tmp`` in RAM can typically
   yield the same net benefits for older/slower CF and SD media. Firewalls with
   modern SSDs should have no concerns with writes.

1GB NanoBSD images have been removed as they were too small to properly function
and upgrade. If a 1GB NanoBSD image is in use, it cannot be upgraded. It must be
re-imaged on a larger card using the 4GB or 2GB image or converted to a full
installation.

Package System
++++++++++++++

* Due to the package system overhaul, any custom package repository settings are
  removed so the firewall will pull package information directly from pfSense
  servers.
* We highly recommend uninstalling all packages before upgrading.

Removed features that are disabled on upgrade
+++++++++++++++++++++++++++++++++++++++++++++

* Groups with spaces are no longer permitted. They are not allowed at the OS
  level and were not functioning properly. On upgrade, such groups are renamed
  with an underscore ('_') in place of a space.
* The "Enable" checkbox for IPsec has been removed. If IPsec was disabled, all
  Phase 1 entries are disabled automatically on upgrade.
* The **Unity** plugin for IPsec has been disabled by default, where it was
  previously enabled by default. This is preferable for the vast majority of
  users, however those using mobile IPsec with IKEv1 may need to enable it under
  **VPN > IPsec**, **Advanced** tab.
* The ``apinger`` daemon for gateway monitoring has been replaced by
  ``dpinger``. Due to the differences in settings between the two, many advanced
  gateway parameters are reset on upgrade.
* The PPTP *Server* has been removed, if the PPTP server was in use, seek
  alternate solutions such as IPsec or OpenVPN. **Do not continue to use PPTP**.

  * The PPTP server settings, firewall rules, and so on have all been removed
  * If the "Redirect" PPTP server type was in use, add manual NAT rules for
    TCP/1723 and GRE to point to the actual server.

* Layer 7 classification support has been removed and any configuration using L7
  is automatically removed on upgrade.
* WEP support has been removed from Wireless interfaces, and if a wireless
  interface was using WEP, the interface is deactivated on upgrade.
* Single DES support has been removed from IPsec, if a Phase 1 or Phase 2 entry
  was using DES, it is deactivated on upgrade.

  * Note: 3DES support is still present. Only the older and insecure, **single**
    DES option was removed.

* The Live CD platform has been removed. The ISO is a bootable installer, as
  always, but it cannot run a live system.

  * For the very few people who were still using Live CD: If the hardware can
    boot from USB, install to a USB thumb drive and run from it instead. Use the
    options to keep ``/var`` and ``/tmp`` in RAM, and do not install packages,
    then net result should be similar but ultimately more functional.

* Some obsolete password hashes, such as nt-hash, are removed from users on
  upgrade. There was no remaining code on pfSense that utilized these hashes, so
  there should be no loss of functionality.
* Support for ``fifolog`` was removed, and will revert to clog format on
  upgrade.
* The ``net.inet.ip.fastforwarding`` tunable is no longer present, and is unset
  on upgrade.
* Some PHP modules, such as MySQL, were included by default on previous versions
  but are no longer a part of the base system on 2.3. They are available as
  packages that may be installed manually from the shell (e.g. ``pkg install
  php56-mysql``)

New features that may require action
++++++++++++++++++++++++++++++++++++

* The default system password hash has been changed to bcrypt. Current passwords
  will continue to work. Existing users need to reset their password to convert
  to the new, more secure, hash. `#4120
  <https://redmine.pfsense.org/issues/4120>`__
* A new option was added to Captive Portal for FreeRADIUS-friendly stop/start
  RADIUS accounting updates that solves problems with user session time limits.
  If stop/start RADIUS accounting is being used with FreeRADIUS, the new option
  should be activated manually.

Upgrading from a 2.3 Snapshot
+++++++++++++++++++++++++++++

* If a firewall was upgraded to 2.3 before Jan 21, 2016, some files from 2.2.x
  or earlier packages may still be left behind that can prevent new packages
  from installing properly. Run the following command the clean up outdated
  symlinks that are not relevant for 2.3::

    find / -type l -lname '/usr/pbi/*' -delete

Multi-WAN Weighted Load Balancing
+++++++++++++++++++++++++++++++++

There is a quirk in pf handling of weighted load balancing where Load balancing
fails when one gateway has a weight of 1 and another gateway has a weight >1.
Coming from 2.2.x, if this scenario applies, simply double the assigned weights.
For example: WAN1 = ``1``, WAN2 = ``5`` on 2.2.x should be WAN1 = ``2``, WAN2 =
``10`` on 2.3.

Captive Portal
++++++++++++++

Due to the change in the web server from ``lighttpd`` to ``nginx``, in some
cases the portal HTML must be updated to include the zone parameter. On 2.3.1
and later the web server process attempts to handle this automatically, but it
is best to include the HTML in the portal page directly, inside the form tag:

.. code-block:: html

  <input name="zone" type="hidden" value="$PORTAL_ZONE$">
