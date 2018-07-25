.. include:: /substitutions.rsti

Backing Up and Restoring a pfSense Configuration File
=====================================================

pfSense keeps its configuration in one convenient XML document. A backup
of this document can be saved by going to **Diagnostics >
Backup & Restore**, and clicking **Download Configuration as XML**.

Before downloading, review the options available such as only backing up
certain areas, or excluding the RRD data from the backup file.

Restoring a configuration is just as easy, click **Choose File**, locate the
backup configuration file, then click **Restore Configuration**.

Configuration files can always be restored to any newer or equal pfSense
release version. For instance, a 1.x or 2.0.x version configuration
backup can be restored no problem to a 2.1.x version. Going backwards is
not supported, for instance a 2.1.x configuration cannot be restored to
a 2.0.x or earlier version.

Configuration files can be restored to a completely different piece of
hardware without issue. If the new target hardware has different NICs
than the system where the backup was taken, a prompt will appear to
re-assign the NICs after restoring the configuration.

See the other articles in the Backup/Restore category for more hints and
tips.

Package Functions
-----------------

This page also contains two useful package functions:

**Reinstall Packages**: This button initiates a re-installation of *all*
currently installed packages.

**Clear Package Lock**: This button is only shown when the
post-upgrade/post-restore "Packages are Reinstalling" screen is active.
If a package reinstall fails the lock may be left in place and this
button will clear it manually.

