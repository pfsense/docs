.. include:: /substitutions.rsti

Automatically Restore a pfSense Configuration During Installation
=================================================================

If a configuration needs to be restored to a new setup, but it is
cumbersome to go through all the trouble of setting up a system and
restoring via the WebGUI, there are much easier ways.

These methods are a lot easier than reconfiguring the LAN and restoring
via the network. The firewall will start up using the restored
configuration immediately without needing intermediate steps.

Recover config.xml
------------------

The installer in 2.4 has a “Recover config.xml” option which will read a
configuration off an existing installation being overwritten. This makes
it useful for upgrades, filesystem changes, or any other situation where
a reinstallation is required on the same hardware.

-  Before starting, take a backup of the configuration if possible, just
   in case this procedure doesn't work as expected.
-  Boot a 2.4 install memstick or CD
-  Choose “Recover config.xml” when the option appears
-  Pick the existing installation drive (e.g. ada0), the selection list
   shows the disk name, size, and filesystem type which should be enough
   to identify the disk
-  Proceed through the installation as usual

The firewall will boot off the target disk with the restored
configuration.

Configuration from USB during Install
-------------------------------------

pfSense has, as part of the installation routine, a “Pre-Flight Install”
or PFI. PFI will check for an existing configuration on a USB drive, and
use it instead. When installing to the target disk, it will copy this
configuration.

-  First, make sure to have a config.xml backup from the old system
-  On a DOS/FAT formatted USB drive, make a directory called “conf”
-  Copy a backup configuration file to the conf directory
-  Rename the backup to config.xml

    Example: If the USB drive is E:, the path to the config file would
    be E:\\conf\\config.xml

-  Take the USB drive and Plug it into the router
-  Boot the install media (Memstick, disc, etc)
-  Install to the hard drive
-  Reboot the router
-  Remove the USB drive only **AFTER** the system has begun to reboot.

    *N.B.: If the USB drive is removed too early, it may still be
    mounted and the system **will** panic.*

-  Remove the install media as well at this point

The firewall will boot off the target disk with the restored
configuration.

External Configuration Locator (ECL)
------------------------------------

This procedure is nearly identical to the PFI method in the previous
section, but you can insert the USB disk containing the configuration
(in */config.xml* or */config/config.xml*) at boot time *after* the
installation and the firewall will read it in from there.

If it is the first boot post-installation, then it will also restore
packages in the configuration.

