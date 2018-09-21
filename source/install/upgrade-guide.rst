.. include:: /substitutions.rsti

pfSense Upgrade Guide
=====================

The supported methods to upgrade from one pfSense release to another depend on
the platform being used. Any version of pfSense can be reliably upgraded to any
*newer* version while retaining the existing configuration. This includes RC,
Beta, and other releases. So long as the upgrade is moving from an older version
to a newer version, it will work unless noted otherwise.

.. contents:: Upgrade Guide
   :depth: 2
   :local:

Pre-Upgrade Tasks
-----------------

Make a backup!
^^^^^^^^^^^^^^

First, as always before any major change to the firewall, make sure there is a
good, up-to-date backup. Visit **Diagnostics > Backup/Restore** and download a
backup of the firewall configuration (``config.xml``). :doc:`AutoConfigBackup
</backup/autoconfigbackup>` can also be used to make a manual backup before
upgrading. We strongly advise keeping a local and remote copy of the backup
``config.xml``.

.. seealso:: See :doc:`../backup/index` for more information about performing
   backups of the configuration.

Prepare a fall back plan
^^^^^^^^^^^^^^^^^^^^^^^^

Before any upgrade is performed, plan for how to recover beforehand. There is a
chance that a regression from one version to another, either in the pfSense or
FreeBSD code, can leave the firewall unusable. With advance planning, the
firewall can quickly be returned to the previous release.

Downgrading to a previous release
+++++++++++++++++++++++++++++++++

Downgrading a full installation to previous releases directly in-place
is not supported. Very rarely is it desirable or necessary to go back to
a prior release. Should that be necessary, the previous version must be
reinstalled and a configuration backup from that version must be
restored. Configurations from newer versions **cannot** be restored to
older versions.

For NanoBSD, this can be done by switching back to the previous update
slice from the GUI, console, or boot menu. The pre-upgrade configuration will
need to be restored restored after the switch.

Reinstalling the previous release
+++++++++++++++++++++++++++++++++

The worst case scenario on upgrading is a FreeBSD regression that prevents the
firewall from booting successfully, or no longer communicating with the network.
In this case, reinstall from a CD or Memstick for the previous release. Download
the appropriate image and have it ready **before** starting the upgrade
procedure.

This is the least likely scenario, with maybe one in every ten or twenty
thousand installs affected with upgrades containing significant FreeBSD release
changes (such as pfSense 2.3 to 2.4, going from FreeBSD 10.x to 11.x).

VM Snapshots
++++++++++++

An easy fall-back plan for virtualized firewalls is to take a snapshot of the VM
before performing an upgrade. This way, it can easily roll back to a known-good
state if the VM encounters a problem.

.. note:: Before rolling back a VM due to problems, ensure the hardware
   compatibility of the VM is current. For example, on ESX 6.7, ensure the
   hardware compatibility is set to **ESXi 6.7 and later (VM version 14)** and
   update the VM Guest operating system to match the upgraded OS, such as
   *Other/FreeBSD 11 (64-bit)*

Packages
^^^^^^^^

The safest practice is to remove **all** packages before upgrading pfSense to a
new release. The upgrade process will reinstall packages afterward, but packages
are frequently a source of problems. To ensure a smooth upgrade, note the
installed packages, remove them, perform the upgrade, and then reinstall
necessary packages.

Performing the Update
---------------------

The specifics of performing the actual firmware update are covered in
:doc:`/install/upgrading-pfsense-software-installations`.

32-bit / i386 Deprecated
^^^^^^^^^^^^^^^^^^^^^^^^

**32-bit x86** support has been deprecated and is **not supported** on pfSense
2.4 and later. Hardware capable of running 64-bit images must be reinstalled
with a 64-bit version.

.. note:: 32-bit x86 hardware can continue to run pfSense software version
   2.3.x, but support for that branch will be EOL as of October 2018.

Changing architecture (32-bit to 64-bit) during upgrade
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Upgrading a 32-bit system to 64-bit in-place is not supported. The only feasible
method is to reinstall and restore the configuration. The configuration file is
the same on both versions.

When making a backup, the option to retain RRD contents is architecture
independent; A backup taken on a 32-bit pfSense 2.3.x installation can be
restored to a firewall running pfSense 2.4.x on 64-bit/amd64 or even an ARM
device.

Live CD / Embedded / NanoBSD
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Live CD, Embedded, and NanoBSD have been deprecated. A full install is now
required. Consider installing to flash media, such as a thumb drive/memstick, if
using an SSD or HDD is not feasible. Activating the RAM disk options for /var
and /tmp under **System > Advanced** on the **Miscellaneous** tab will reduce
the amount of disk writes performed by the firewall.

Version-Specific Notes
----------------------

Upgrading from versions older than pfSense 2.4.4
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Third party packages from **alternate repositories** are causing problems for
  users with the upgrade process and also with post-upgrade behavior. These
  packages have never been supported, and had to be manually added by users
  outside of the GUI.

  Due to the major changes required for FreeBSD 11.2 and PHP 7.2, third party
  packages from alternate repositories cannot be present during the upgrade.
  There is no way to predict if a third party package supports the new version
  or will cause the upgrade itself to fail.

  The upgrade process will automatically remove ``pfSense-pkg-*`` packages
  installed from alternate repositories. After the upgrade completes, the user
  can reinstall these packages. Packages from **alternate repositories** will
  not appear in the **Installed Packages** list in the GUI, and must be entirely
  managed in the command line.

  **This change does not affect packages installed from the official pfSense
  package repository.**
* :doc:`../backup/autoconfigbackup` is integrated into pfSense version 2.4.4 and
  free for all to use. It is no longer an add-on package. It is now located
  under **Services > Auto Config Backup**.
* PHP was migrated from PHP 5.6 to PHP 7.2. A number of PHP errors were fixed
  along the way but certain combinations of configuration parameters may result
  in further errors. Note any problems on the |forum_link| or the |subreddit|,
  and if possible, try to include relevant portions of ``config.xml`` with
  personal data removed.
* Gateway handling changes in 2.4.4 may result in different default gateway
  behavior than previous releases. Nearly all cases should behave properly, but
  be aware that it may be necessary to re-select the default gateway after
  upgrade.
* The FEC LAGG Protocol is deprecated and its options have been removed `#8734
  <https://redmine.pfsense.org/issues/8734>`__
* The login protection daemon was changed from ``sshlockout_pf`` to ``sshguard``
  and the behavior may be more sensitive in some cases to SSH and GUI login
  failures. For example, be aware of possible issues where probes from
  monitoring systems may end up triggering a block.
* Major changes to RADIUS for the base system and specifically Captive Portal
  could lead to behavior changes in certain cases. Read the release notes and
  associated bug reports for more details. Note any problems on the |forum_link|
  or the |subreddit|.

Upgrading from versions older than pfSense 2.4.0
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* To use ZFS, a reinstall of the operating system is required. It is not
  possible to upgrade in-place from UFS to ZFS at this time.
* **Wireless** interfaces **must** be created on the **Wireless** tab under
  **Interfaces > Assignments** before they are available for assignment
* Some hardware devices may not boot 2.4.0 installation images, for example, due
  to UEFI compatibility changes. These are primarily BIOS issues and not issues
  with the installer images. Upgrading in place from 2.3.x typically allows
  affected hardware to run version 2.4.
* To upgrade Firewalls in place which are running pfSense software version 2.2.x
  or earlier, first upgrade the firewall to pfSense 2.3.4 and then perform an
  update to pfSense 2.4.x afterward. Alternately, reinstall 2.4.x directly and
  restore the configuration.

.. warning:: When upgrading to 2.4.x from 2.2.x or earlier, remove all packages
   before attempting the update. Even when upgrading from 2.3.x this is the best
   practice to ensure a smooth upgrade process. Package settings are retained.

Older Version Upgrade Notes
---------------------------

The following information is for upgrading from outdated and unsupported
versions of pfSense software. They may still be of use to users attempting to
upgrade from an older release to a current, supported, release.

When upgrading from a very old release, read every document below that covers
versions between the older one being upgraded and the new version.

.. toctree::
   :maxdepth: 1

   upgrading-older-versions-2.3
   upgrading-older-versions-2.2
   upgrading-older-versions-2.1
   upgrading-older-versions-2.0

Additional Notes
----------------

Upgrading High Availability Deployments
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Generally the recommended path for upgrading a High Availability cluster is to
first upgrade the secondary node. After it comes back up, put the primary into
**Persistent CARP Maintenance Mode** under **Status > CARP**, and run on the
secondary for a period of time. If the secondary node is running comfortably as
desired, upgrade the primary node. Confirm the primary node upgrade succeeded,
and then exit maintenance mode.

.. note:: The underlying pfsync protocol that synchronizes states between
   firewalls has changed formats between different FreeBSD versions and
   hence some upgrade scenarios will require dropping all states when
   switching the new version to master status.

.. seealso:: Refer to :doc:`/highavailability/redundant-firewalls-upgrade-guide`
   for specifics on upgrading with HA/CARP.

Cosmetic Problems Post-Upgrade
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If cosmetic problems occur after performing an upgrade, this is nearly always
due to stale browser cache entries for CSS, JavaScript, or other files where the
browser does not pull the updated version. Force a refresh of the page in the
browser (e.g. Shift+Reload or Ctrl+F5) or clear the browser cache to resolve the
issues.
