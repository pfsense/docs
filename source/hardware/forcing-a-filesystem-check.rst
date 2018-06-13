.. include:: /substitutions.rsti

Forcing a Filesystem Check
==========================

The firewall will automatically run a filesystem check at boot time when
it was not shut down cleanly. In such a case the disk is still "dirty"
so the OS can tell that it needs a check. However there are times when
the filesystem is marked clean but there may still be some minor
filesystem corruption. This can manifest as files being inaccessible,
incorrect free disk space reporting, or even a panic/crash in filesystem
code. At these times running *fsck* on the filesystem is necessary but
to do so properly requires that it be done during the boot cycle before
the drives have been mounted read/write.

Fortunately there is a way to trigger a check manually when necessary by
creating the file */root/force_fsck* and then rebooting the firewall.

There are many ways to create the file, a few simple examples are:

From the GUI:

- Navigate to **Diagnostics > Command**
- Enter *touch /root/force_fsck* in the **Execute Shell Command** area
- Click **Execute**

From the shell (Full install)::

  touch /root/force_fsck

From the shell (NanoBSD)::

  /etc/rc.conf_mount_rw
  touch /root/force_fsck
  /etc/rc.conf_mount_ro

After creating the file, :doc:`reboot </hardware/reboot-system>`. The firewall will
run a filesystem check and then continue to boot the rest of the way.
The */root/force_fsck* file will be removed automatically.
