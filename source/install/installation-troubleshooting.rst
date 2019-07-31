Troubleshooting Installation Issues
===================================

There are more troubleshooting techniques listed at
:doc:`Boot_Troubleshooting </hardware/boot-troubleshooting>`

Misc
----

-  If the target hardware does not have a CD-ROM drive and cannot boot
   from USB, a different machine may be used to install on the target
   hard drive.
-  If a USB 3.0 port (usually colored blue internally) does not work to
   boot the memstick, try a USB 2.0 port.
-  Use a boot delay (See :doc:`Boot Troubleshooting </hardware/boot-troubleshooting>`)
-  Disable PnP OS in the BIOS

Boot from Memstick or CD Fails
------------------------------

Due to the wide array of hardware combinations in use, it is not
uncommon for a CD to boot incorrectly (or not at all). The most common
problems and solutions are:

-  Dirty CD-ROM Drive: Clean the drive with a cleaning disc or a can of
   compressed air, or try another drive.
-  Bad CD-R Media: Burn another disc and/or burn the disc at a lower
   speed. Perhaps try another brand of media.
-  BIOS Issues: Update to the most recent BIOS, and disable any unneeded
   peripherals such as Firewire, Floppy Drives, and Audio.
-  IDE/SATA Cable Issues: Try a different IDE/SATA cable between the
   CD-ROM drive and the Controller or Motherboard
-  Boot Loader Issues: There have been cases where specific versions of
   FreeBSD's CD boot loader will not work on some systems. In this case,
   perform the hard drive installation on a separate PC and then move it
   to the target system.

Boot from hard drive after CD installation fails
------------------------------------------------

After the CD installation completes and the system restarts, there are
some conditions which may prevent pfSense® software from fully booting.
The most common reasons are typically BIOS or hard drive controller
related. Some of these may be worked around by choosing different
options for the boot loader during the installation process, 
enabling/disabling Packet Mode, or by installing a third party boot
loader such as GRUB. Upgrading the BIOS to the latest version available
may also help in this case.

Altering the SATA options in the BIOS has improved booting in some
situations as well. If a SATA hard drive is being used, experiment with
changing the SATA options in the BIOS for settings such as AHCI, Legacy,
or IDE.

Interface link up not detected
------------------------------

If the system complains that interface link up is not detected, first
make sure that the cable is unplugged and that the interface does not
have a link light prior to choosing the link detection option. Test or
replace the cable in question. After selecting the option, plug the
cable back into the interface and ensure it has a link light prior to
pressing **Enter**.

If a network cable is being connected directly between two systems and
not to a switch, ensure that a `crossover
cable <https://en.wikipedia.org/wiki/Ethernet_crossover_cable>`__ is
being used. Newer adapters support
`Auto-MDIX <https://en.wikipedia.org/wiki/Auto-MDIX>`__ and will handle
this internally, but many older adapters do not. Similarly, if
connecting a pfSense system to a switch that does not support Auto-MDIX,
use a straight-through patch cable.

If the interface is being properly connected but pfSense still does not
detect the link up, the network interfaces being used may not properly
detect link. In this case, manually assigning the interfaces is
necessary.

Manual Interface Assignment
---------------------------

If the auto-detection feature didn't work, there is still hope of
telling the difference between network cards prior to installation. One
way is by MAC address, which should be shown next to the interface names
on the assignment screen::

  em0    00:0c:29:00:df:84   (up) Intel(R) PRO/1000 Legacy Network Connection 1.0.6
  em1    00:0c:29:00:df:8e   (up) Intel(R) PRO/1000 Legacy Network Connection 1.0.6
  em2    00:0c:29:00:df:98 (down) Intel(R) PRO/1000 Legacy Network Connection 1.0.6

The MAC address is sometimes printed on a sticker somewhere physically
on the network card. MAC addresses also are assigned by manufacturer,
and there are several `online databases <http://aruljohn.com/mac.pl>`__
which will do a reverse lookup on a MAC address in order to find the
company which made the card.

Network cards of different makes, models, or sometimes chipsets may be
detected with different drivers. It may be possible to tell an
Intel-based card using the driver apart from a Realtek card using the
driver by looking at the cards themselves and comparing the names
printed upon the circuitry.

Once it is determined which network card will be used for a given role,
type it in at the interface assignment screen when prompted. In the
above example, *em0* will be WAN and *em1* will be LAN. When prompted
first for the WAN address, one would type *em0* and press **Enter**.
Then when prompted for LAN, type *em1*, and press **Enter**. Since there
are no optional interfaces, one more press of **Enter**, then *y* will
complete the assignment.
