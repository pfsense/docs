.. include:: /substitutions.rsti

Automatically Restore a pfSense Configuration During Installation
=================================================================

If a configuration needs to be restored to a new setup, but it is cumbersome to
go through all the trouble of setting up a system and restoring via the WebGUI,
there are much easier ways.

These methods are significantly easier than reconfiguring the LAN and restoring
via the network. The firewall will start up using the restored configuration
immediately without needing intermediate steps.

Recover config.xml
------------------

The installer pfSense version 2.4 has a **Recover config.xml** option which
reads a configuration from an existing installation being overwritten. This
makes it useful for upgrades, filesystem changes, or any other situation where a
reinstallation is required on the same hardware.

* Before starting, take a backup of the configuration if possible, in case this
  procedure does not work as expected.
* Boot a 2.4 install memstick or CD
* Choose **Recover config.xml** when the option appears
* Pick the existing installation drive (e.g. ``ada0``), the selection list shows
  the disk name, size, and filesystem type which is typically enough to identify
  the disk
* Proceed through the installation as usual

The firewall will boot off the target disk with the restored configuration.

Configuration from USB during Install
-------------------------------------

pfSense has, as part of the installation routine, a step that checks for an
existing configuration on a USB drive and, if one is found, copies it to the
target drive.

* First, make sure to have a ``config.xml`` backup from the old firewall
* On a DOS/FAT formatted USB drive, make a directory called ``conf``

  .. note:: For this feature to work correctly, the USB drive must contain a
     partition table and it must not be formatted as a raw device.

* Copy a backup configuration file to the ``conf`` directory
* Rename the backup to ``config.xml``

   Example: If the USB drive is ``E:``, the full path would be
   ``E:\conf\config.xml``

* Unmount/eject the USB drive, remove it, then plug it into the firewall
* Boot the install media (Memstick, disc, etc)
* Install to the target disk
* Reboot the firewall
* Remove the USB drive only **AFTER** the firewall has begun to reboot

  .. warning:: If the USB drive is removed too early, it may still be
   mounted and the system **will panic**!

* Remove the install media as well at this point

The firewall will boot off the target disk with the restored configuration.

External Configuration Locator (ECL)
------------------------------------

This procedure is nearly identical to the method in the previous section, but
the USB disk containing the configuration does not need to be present during the
installation.

For this process, the configuration file must be placed on the USB drive in
``/config.xml`` or ``/config/config.xml``.

After the installation completes, insert the USB drive containing the
configuration before the firewall boots and the firewall will read it in from
there.

If it is the first boot post-installation, then this process also triggers
reinstallation of packages listed in the restored configuration.
