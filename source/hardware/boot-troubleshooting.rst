.. include:: /substitutions.rsti

Troubleshooting Boot Issues
===========================

The errors in this article would happen during bootup, typically the
first boot either from the install media or immediately after
installation. If the system was up and running but then developed a boot
issue with no changes in the software/OS, it isn't likely to be related.

Booting with an alternate console
---------------------------------

To boot a different console, first get to a loader prompt. Either choose
the menu option from the boot menu, or when **Hit [Enter] to boot
immediately, or any other key for command prompt.** is seen during the
boot process, press space or another key.

Once at the loader prompt, type the following to boot with the serial
console active:::

  set console=comconsole
  boot -v

Similarly, if a VGA-enabled NanoBSD image is used that prefers the
serial console, the video console can be used instead as follows::

  set console=vidconsole
  boot

Booting from USB
----------------

- If the boot stops with a mountroot error while booting off the
  installation disc, usually with USB CD/DVD drives, escape to the
  loader prompt and run the following::

    set kern.cam.boot_delay="10000"
    boot

- On 2.0 this is on the boot menu - option #3 to boot from USB devices.

  At which point the boot will continue normally and a normal installation
  will be possible.

  If running permanently from a medium that requires this delay, edit
  /boot/loader.conf.local and insert the following line::

    kern.cam.boot_delay="10000"

-  If booting fails from a USB 3.0 port and the above does not help, try
   a USB 2.0 port with the same delay settings.

GPT Boot Issues
---------------

Some systems may fail to boot a 2.4 memstick because they do not fully
support booting from GPT or they are particular about the layout or
other attributes.

In these cases, the memstick can be modified using another firewall
running pfSense 2.3 or later, or with a FreeBSD 10.x or later system.

Insert the memstick into the pfSense or FreeBSD device and check the
system log or dmesg output to find the device name, such as **da1**.

First, try to set the partition on the memstick active::

  gpart recover da1
  gpart set -a active da1

Remove the memstick and attempt to boot the memstick on the target
hardware. If it works, be sure to only use compatible options in the
installer. In this case, if the BIOS requires an active GPT partition
then either of the following installer choices will work:

-  **Auto (UFS)** requires the Partition Scheme **BSD (BSD Labels)**
-  **Auto (ZFS)** requires the Partition Scheme **GPT + Active (BIOS)**

Other platforms may need more changes to the memstick, including::

  gpart bootcode -b /boot/pmbr -p /boot/gptboot -i 2 da1
  gpart set -a bootme -i 2 da1

In this case the hardware may not be capable of booting ZFS, but use the
same option above for UFS with BSD Labels which should work.

In either case, depending on the BIOS and hardware capabilities, similar
modifications may be made to the installation target disk to use other
partition schemes not listed above, but that has not been tested
internally.

BIOS/Disk Errors
----------------

- If after installation, a "cannot load kernel" error is observed, or
  the firewall hangs at the spinner (/):

  - Make sure BIOS is up to date
  - Reinstall but do not check the packet mode option during boot
    block installation process
  - Set the HDD mode in BIOS to LBA (don't use "auto", the detected
    geometry is different if it is set to auto and it fails)
  - Set the HDD mode in BIOS to CHS if the above fails
  - Set AHCI mode in the BIOS

- Try using multiple partitions, one small one (~4GB) for / and another
  for /usr using the rest of the disk.

- If the installer fails to start correctly (system reboots), try the
  following (attempt each substep, then rerun the installer each time):

  - Make sure BIOS is up to date
  - Change the hard drive ribbon/SATA cable
  - Force a slower speed in the bios for the channel
  - Boot from another disk and run: (note that ad0 is the first ata
    hard drive)::

      # dd if=/dev/zero of=/dev/ad0 bs=8k count=16
      # fdisk -I ad0

-  If all those fail...

   -  Partition from a FreeBSD Live CD or Linux
   -  Different hard drive

CD Errors
---------

-  If the installer disc starts to boot but hundreds of errors are
   printed, try:

   -  Make sure BIOS is up to date
   -  Use a USB memstick instead
   -  Burn the CD at a slower speed
   -  Change the CD-ROM Reader ribbon cable
   -  Different CD-ROM Reader

Boot Blocks/Loader Issues
-------------------------

- If a read error occurs during boot, please see this `Boot
  Error <http://www.p14nd4.com/blog/2006/02/17/bsd-bootloader-read-error/>`__.
- If FreeBSD will boot but not pfSense, try booting from a FreeBSD Live
  CD and running the following (`More
  Info <https://www.freebsd.org/doc/en_US.ISO8859-1/books/handbook/boot-introduction.html>`__)::

    # fdisk -B -b /boot/boot0 /dev/ad0
    # bsdlabel -B /dev/ad0s1

- (note that ad0 is the first ata hard drive)

Vendor-Specific Issues
----------------------

- Certain Dell Blade servers may hang at boot if the system's virtual
  USB media is enabled. Disable the virtual media in the BIOS and then
  it should boot normally.

- Certain systems running Hyper-V on AMD processors may need to do the
  following:

  - Escape to the loader prompt during bootup and run::

      set hw.clflush_disable=1``
      boot``

    At that point, boot the rest of the way and install pfSense. After
    installation, add the following line to /boot/loader.conf.local::

      hw.clflush_disable=1``

Alternate Boot Managers
-----------------------

`GAG <http://gag.sourceforge.net/>`__ or `Smart
BootManager <http://sourceforge.net/projects/btmgr>`__ may be used.

If all else fails, we offer `official support plans`_ and `official hardware`_
that has been pre-loaded with pfSense and proven to work. You can also
check out https://wiki.freebsd.org/BugBusting/Commonly_reported_issues.



Disabling ACPI
--------------

Some hardware and/or BIOS implementations have incompatibilities with
FreeBSD and ACPI. In these cases, ACPI may need to be disabled in order
to boot or install successfully.

The boot menu displayed when the system starts has a choice to disable
ACPI. Choose that option when booting to disable it temporarily and then
follow the loader.conf.local suggestion below.

Disable in Loader
~~~~~~~~~~~~~~~~~

On some installations, such as NanoBSD, the boot menu is not displayed
and the change must be made at the loader prompt.

At the Hit [Enter] to boot immediately, or any other key for command
prompt.

At this point hit any key and a prompt will be displayed. Then type::

  set hint.acpi.0.disabled=1
  boot

Make it Persistent
~~~~~~~~~~~~~~~~~~

After the installation, add the following line to
/boot/loader.conf.local by running the following command from a shell
prompt or exec.php::

  echo "hint.acpi.0.disabled=\"1\"" >> /boot/loader.conf.local

Or use the Diagnostics>Edit File function to open
/boot/loader.conf.local and add the following line::

  hint.acpi.0.disabled="1"

Then save. It will be applied at the next boot.

Disable DMA for IDE drives
--------------------------

The hardware in use may not be capable of using DMA transfers. In such
cases, DMA errors will be observed when installing pfSense. Disabling
DMA support in BIOS might work. Another option is to disable DMA support
at boot time. This will slow a DMA capable system down. It should only
be used when DMA errors are encountered when accessing the hardware.

To disable DMA:

After powering on the system, the following message appears: Hit [Enter]
to boot immediately, or any other key for command prompt.

At this point hit any key and a prompt will be presented.

pfSense 2.1 and earlier
~~~~~~~~~~~~~~~~~~~~~~~

To disable DMA for hard drives and compact flash::

  set hw.ata.ata_dma=0

To disable DMA for optical drives::

  set hw.ata.atapi_dma=0

After the installation, add the following line to
*/boot/loader.conf.local*:

To disable DMA for hard drive(s)::

  hw.ata.ata_dma=0

To disable DMA for optical drives::

  hw.ata.atapi_dma=0

It is possible that DMA may need to be disabled for both hard drive(s)
and optical drives.

pfSense 2.2 and later
~~~~~~~~~~~~~~~~~~~~~

The method by which DMA is disabled has been changed on pfSense 2.2 and
later due to changes in the underlying disk driver structure on FreeBSD.

To disable DMA from a loader prompt, use::

  set hint.ata.0.mode=PIO4

To make the change permanent, add the following line to
*/boot/loader.conf.local*::

  hint.ata.0.mode=PIO4

If there are multiple ATA controllers, the controller ID may need to be
set higher (e.g *1* or *2*) or it may need set for multiple controllers.
In that case, use additional lines with the same setting that vary only
by controller ID.

Possible modes for that setting include:

    BIOSDMA, PIO0 (alias BIOSPIO), PIO1, PIO2, PIO3, PIO4, WDMA2, UDMA2
    (alias UDMA33), UDMA4, (alias UDMA66), UDMA5 (alias UDMA100) and
    UDMA6 (alias UDMA133).

Disable Write Caching
---------------------

In some cases a disk or controller may need write caching disabled to
ensure that data is written to disk immediately and not held in a cache.

To disable write caching at boot time (if the system will not boot or
install otherwise), use a loader prompt:

After powering on the system, the following message appears: Hit [Enter]
to boot immediately, or any other key for command prompt.

At this point hit any key and a prompt will be presented.

pfSense 2.1 and earlier
~~~~~~~~~~~~~~~~~~~~~~~

To disable write caching for all ATA drives::

  set hw.ata.wc=0

After the installation, add the following line to
*/boot/loader.conf.local*:

To disable write caching for all ATA drives::

  hw.ata.ata_dma=0

pfSense 2.2 and later
~~~~~~~~~~~~~~~~~~~~~

The method by which write caching is disabled has been changed on
pfSense 2.2 and later due to changes in the underlying disk driver
structure on FreeBSD.

To disable write caching from a loader prompt, use::

  set kern.cam.ada.write_cache=0

To make the change permanent, add the following line to
*/boot/loader.conf.local*::

  kern.cam.ada.write_cache=0

"Fake" RAID cards with a GRAID error
------------------------------------

Certain "fake" RAID cards, driver/software-based RAID adapters that are
not true hardware RAID, may fail to mount properly with the following
error::

  Root mount waiting for: GRAID
  mountroot>

Another symptom can be that "Intel RAID" messages are shown during the
boot sequence, and typing ? at the mountroot prompt it only shows the
drive itself and no partitions::

  Mounting from ufs:/dev/ada0s1a failed with error 19
  mountroot> ?
  [...]
  ada0

- Escape to a loader prompt during bootup and run::

    set kern.geom.raid.enable="0"
    boot

- After a successful install/boot, add that settings permanently to
  */boot/loader.conf.local*::

    kern.geom.raid.enable="0"

NanoBSD/Embedded Installs
-------------------------

-  If using NanoBSD on ALIX hardware, ensure the latest BIOS (at least
   0.99h) is installed on the ALIX and set CHS mode in the BIOS.
-  If using an ALIX with VGA (e.g. ALIX 3c3 or 3d3, 1c1, 1d1) set the
   power management mode to APM in the BIOS.

NanoBSD on Newer Hardware
-------------------------

If NanoBSD is used on newer or higher-end systems, it may be necessary
to enable DMA and write caching to avoid disk errors. This can be done
by editing /boot/loader.conf.local and adding::

  hw.ata.atapi_dma="1"
  hw.ata.ata_dma="1"
  hw.ata.wc="1"

These are off by default on NanoBSD because they can cause issues on
older/lower-end hardware or special platforms like ALIX.

After the F1/F2 prompt and the kernel loads, press space to get a loader
prompt. At the Loader prompt, enter::

  set hw.ata.atapi_dma="1"
  set hw.ata.ata_dma="1"
  set hw.ata.wc="1"
  boot

And that will boot successfuly, after which /boot/loader.conf.local may
be edited to make the settings permanent.

Conflicting Hardware
--------------------

- If the system hangs right after detecting the hard drives, and the
  floppy drive light is on, turn off floppy support in the BIOS.

- If the system stops with an error such as::

    run_interrupt_driven_hooks: still waiting after 60 seconds for xpt_action

  Disable any Firewire/1394 controllers and USB Card Readers in the BIOS.

.. _official support plans: https://www.netgate.com/support
.. _official hardware: https://store.netgate.com
