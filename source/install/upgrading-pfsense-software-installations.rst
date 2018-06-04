.. include:: /substitutions.rsti

Upgrading pfSense Software Installations
========================================

A firewall running pfSense can be updated by visiting **System >
Firmware** in 2.2.6 and earlier versions, or **System > Update** in 2.3
and newer. Updating to the most recent firmware is important so that
security fixes, bug fixes, and other enhancements are obtained when they
are available.

Only the most recent stable release of pfSense is officially supported,
so updating is also important to ensure that any problems encountered
may be resolved as needed.

Version 2.2.6 and earlier
-------------------------

Manual Updates
~~~~~~~~~~~~~~

With versions prior to 2.3, an update can be applied manually in the
WebGUI by first downloading an update image to a PC from:

-  `Official Update Sites <https://www.pfsense.org/download/>`__

or

-  `pfSense Snapshot Servers <https://snapshots.pfsense.org/>`__
   (Recommended only for developers and those testing in a
   lab/non-production environment)

Once the firmware file has been downloaded, click **Enable Firmware
Upload**, browse to the update file, then click **Upgrade firmware**.

If **Perform full backup prior to upgrade** is checked, a full backup of the
filesystem is made and placed in /root before the new firmware is applied. These
backups may be restored later.

The rest of the upgrade process happens automatically. The firewall will
reboot when finished.

Automatic Update
~~~~~~~~~~~~~~~~

The **Auto Update** tab polls the pfSense servers for a new version. If
one is found, click **Invoke Auto Upgrade** to automatically downloaded
and apply the update.

If **Perform full backup prior to upgrade** is checked, a full backup of the
filesystem is made and placed in /root before the new firmware is applied. These
backups may be restored later.

Updater Settings
~~~~~~~~~~~~~~~~

The **Updater Settings** tab lets sets the URL from which automatic
updates are pulled. This is not typically changed from the default
setting, but may be altered in special cases such as when running
development snapshot images.

Console Update
~~~~~~~~~~~~~~

Updates can also be applied from the console. From there it is possible
to update from a URL directly (will be downloaded and applied) using a
custom URL or the auto-update URL. If an image is uploaded manually to
the firewall, it can also be applied by supplying the full path to the
uploaded file.

Restore Full Backup
~~~~~~~~~~~~~~~~~~~

This feature has been removed from versions 2.3 and newer, because it's
not necessarily a reliable means to restore a system.

A full backup of the filesystem may be restored using the **Restore Full
Backup** tab.

The existing firewall configuration (*config.xml*) may be retained by
checking **Do not restore config.xml**

Full backups are created manually or by using the **Perform full backup
prior to upgrade** option on the **Manual Update** or **Auto Update**
tabs.

Version 2.3 and newer
---------------------

In 2.3 and newer versions, the update system is pkg-based, changing the
available update methods. Upgrades are performed either under **System >
Update** in the webGUI, or option 13 at the console. Manual updates are
no longer available, and systems must be Internet-connected to update.

