.. include:: /substitutions.rsti

Troubleshooting Disk Check Errors (fsck)
========================================

In some cases, pfSense may detect a filesystem issue and print an error on the
console at boot time::

  Disk is dirty, running fsck -y

The most common way this happens is with an unclean shutdown, such as a power
loss. In most cases this is harmless and the self-check will complete and
correct the error.

Manually Run fsck
-----------------

In rare cases, the firewall may need to be booted in single user mode where
``fsck`` can be run manually until no problems are found or fixed::

  # /sbin/fsck -y /

.. note:: Repeat that command until ``fsck`` neither finds nor fixes problems
   when run. Do not stop when it claims to have cleaned the filesystem after
   fixing an issue.

Forcing an Automatic Check
--------------------------

If the system is booting successfully but a filesystem issue is suspected,
connect to the console or SSH and use the reboot menu option (``5``), followed
by ``F`` to reboot and force a filesystem check.
