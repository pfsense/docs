.. include:: /substitutions.rsti

Upgrading 64-bit NanoBSD 2.3 to 2.4
===================================

NanoBSD has been completely removed from pfSense 2.4, so an existing
64-bit installation of pfSense 2.3 using NanoBSD must be changed to a
full installation. The best way to accomplish this task is by
reinstalling pfSense on the firewall device, but in some cases that may
be impossible or impractical.

The procedure on this article converts an existing 64-bit NanoBSD
installation to a full installation in-place without reinstalling,
removing the NanoBSD-specific second slice and growing the filesystem to
fill the entire disk.

Caveats
-------

Note that this procedure has a few caveats:

-  There is no 32-bit support on pfSense 2.4; This procedure will not
   work on 32-bit hardware.
-  This procedure cannot convert an installation from 32-bit to 64-bit.
   If the firewall is running 32-bit NanoBSD on 64-bit capable hardware,
   it must be reinstalled using a 64-bit full installation image.
-  There is no write protection of the firewall disk/media. If the
   target disk is sensitive to writes, the use of RAM disks for /tmp and
   /var can be manually enabled after the conversion.

   -  Depending on the age and quality of the original disk/media,
      replacing the media may be warranted.

-  The firewall will still not have any swap space, so RAM remains a
   limiting factor for firewall capabilities.
-  For actions taken at a shell prompt or the console, the root or admin
   account must be used.

Manual Conversion
-----------------

Before you attempt this process, do the following to help ensure the
best chance of success

-  Remove any installed packages
-  Update to the latest version available - probably 2.3.5
-  :doc:`Check the filesystem </hardware/forcing-a-filesystem-check>`

Check Firewall Boot Partition
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-  Navigate to Diagnostics > NanoBSD
-  Look at **Bootup Slice**

   -  Note the disk name, which is the part before 's1' or 's2'. This
      may be *ada0*, *da0*, or something else entirely. Wherever “XXX”
      appears later in this article, use this disk name instead.
   -  If **Bootup Slice** ends in *s1* then skip to the next section
   -  If **Bootup Slice** ends in *s2* then the firewall is booting from
      the secondary slice and must be changed to boot from the first
      slice using the following steps

-  Click **Duplicate XXXs2 -> XXXs1**
-  Click **Switch Slice** to change the boot slice to XXXs1
-  Reboot using **Diagnostics > Reboot** or the console

Sometimes the page will refresh whilst performing the slice duplication
and not indicate whether it has completed. The command that is run is
similar to this, which can be run from the command prompt::

  # /bin/dd if=/dev/da0s2 of=/dev/da0s1 bs=64k

Change Package Names
^^^^^^^^^^^^^^^^^^^^

Tell *pkg* to use the regular base package and not NanoBSD

- Connect to console or via ssh
- Use option 8 to start a shell
- Run the following commands::

    # pkg set -y -o security/pfSense-base-nanobsd:security/pfSense-base pfSense-base-nanobsd
    # pkg set -y -n pfSense-base-nanobsd:pfSense-base pfSense-base-nanobsd

Change the Platform
^^^^^^^^^^^^^^^^^^^

Change the platform type from a shell prompt::

  # echo pfSense > /etc/platform

Filesystem Changes
^^^^^^^^^^^^^^^^^^

The second slice and configuration slice must be removed, and the first
slice will grow to use the entire disk.

All of the steps in this section must be performed using a shell prompt.

Change */etc/fstab* to mount partitions read-write::

  # sed -i .bkp -e 's/ro,sync/rw/' /etc/fstab

Delete the secondary partition::

  # gpart delete -i 2 XXX

Prepare filesystem to grow on the next boot::

  # touch /root/force_growfs

Move the configuration slice (*/cf*) content to the root slice::

  # mkdir -p /mnt/cf
  # sed -i '' -e 's,[[:blank:]]/cf, /mnt/cf,' /etc/fstab
  # umount -f /cf
  # mount /mnt/cf
  # cp -Rp /mnt/cf/* /cf
  # sync; sync
  # umount -f /mnt/cf

Remove */cf* slice::

  # gpart delete -i 3 XXX

Cleanup */etc/fstab*::

  # sed -i '' -e '/\/mnt\/cf/d' /etc/fstab

Ensure that the first slice is active and bootable::

  # gpart set -a active -i 1 /dev/XXX
  # boot0cfg -s 1 /dev/XXX

Run the Update
^^^^^^^^^^^^^^

Do not update using the GUI.

From the console, update using option 13 from the menu or from a shell
prompt::

  # pfSense-upgrade

Be patient on first boot. The disk resize can take quite a long time.
After the disk resize, the upgrade process will continue and this also
takes quite a long time.

Use RAM Disks
^^^^^^^^^^^^^

Configure the firewall to use RAM disks for write-sensitive media.

-  Navigate to **System > Advanced**, **Miscellaneous** tab
-  Check **Use RAM disks**
-  Set the sizes of /tmp and /var appropriately for the amount of RAM on
   the firewall. The default sizes are the same as used on NanoBSD, but
   this is frequently too low for practical use with packages on a full
   installation.
-  Configure periodic backups of RRD and DHCP leases if desired

Script-Assisted Conversion
--------------------------

Many of the steps above can be automated using a script, however, a few
steps must still be made manually as in the above procedure.

- Perform the steps in the **Check Firewall Boot Partition** subsection
- Perform the steps in the **Change Package Repository** subsection
- Fetch and run the script from a shell prompt::

    # fetch -o /root/ https://raw.githubusercontent.com/pfsense/pfsense/RELENG_2_4_0/tools/scripts/pfSense-nanobsd_to_fullinstall.sh
    # /bin/sh pfSense-nanobsd_to_fullinstall.sh
    # pfSense-upgrade -y

