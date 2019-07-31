Upgrading pfSense Software Installations
========================================

A firewall running pfSense® software can be updated by visiting 
**System > Update**. Updating to the most recent version of pfSense
software is important so that security fixes, bug fixes, and other
enhancements are obtained when they are available.

Only the most recent stable release of pfSense is officially supported, so
updating is also important to ensure that any problems encountered may be
resolved as needed.

.. note:: Before performing an upgrade, read through the :doc:`upgrade-guide`.

If any problems occur during the upgrade process, consult
:doc:`upgrade-troubleshooting` for assistance.

.. contents:: Upgrading pfSense Software
   :depth: 2
   :local:

Current Versions of pfSense
---------------------------

In 2.3 and newer versions, the update system is based on ``pkg(8)``.

.. warning:: Firewalls must be connected to the Internet to update.

Updating in the WebGUI
~~~~~~~~~~~~~~~~~~~~~~

Navigate to **System > Update** in the WebGUI to check for an available update
and to perform the update**. The update check on the dashboard also leads to
this page.

This page, as well as the **Update Settings** tab, also can change the branch
used for obtaining updates.

Update Branches
^^^^^^^^^^^^^^^

The **Branch** option on **System > Update** on the **System Update** and
**Update Settings** tab controls the source of updates for the firewall.
Generally there are at least two branches, but there may be more depending on
the status of the current release.

:Latest Stable Version: The most recent release of the stable branch. This is
  the update branch which should be used in nearly all cases.
:Latest Development Snapshots: The most recent snapshot of the development
  branch. This has the most current code and binaries, but may be unstable since
  it is still in active development. Generally this is used in labs for testing
  bug fixes and new features.
:Legacy Stable Version: The most recent legacy release, which is the previous
  release branch. This is generally one version behind, for example 2.3.x is
  legacy while 2.4.x is active. Depending on the timing of releases, this legacy
  branch may or may not be supported.

There may be additional branches, for example, branches for release candidates
or for legacy, development. These may come and go as development changes and
releases happen.

Updating from the Console
~~~~~~~~~~~~~~~~~~~~~~~~~

From the console or via SSH, option 13 at the menu can be used to trigger an
update.

Additionally, from the command line, the ``pfSense-upgrade`` command will
upgrade the firewall.

Version 2.2.x and earlier
-------------------------

These instructions remain for reference when updating an older version of
pfSense to a supported release. In many cases, it is much easier to take a
backup, reinstall with a current version, and then restore the configuration.

.. warning:: When upgrading from 2.2.x to a current version, the firewall must
   first stop at the latest pfSense 2.3.x release before it can proceed to
   pfSense 2.4.x or later. This is due to the nature of the updates changing
   from single archives to ``pkg(8)``.

Automatic Update
~~~~~~~~~~~~~~~~

The **Auto Update** tab polls the pfSense servers for a new version. If one is
found, click **Invoke Auto Upgrade** to automatically downloaded and apply the
update.

Manual Updates
~~~~~~~~~~~~~~

With versions prior to 2.3, an update can be applied manually in the
WebGUI by first downloading an update image to a PC from the `Official Update
Site <https://www.pfsense.org/download/>`__

Once the firmware file has been downloaded, click **Enable Firmware
Upload**, browse to the update file, then click **Upgrade firmware**.

The rest of the upgrade process happens automatically. The firewall will
reboot when finished.
