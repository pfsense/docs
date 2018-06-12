.. include:: /substitutions.rsti

Removing the F1 Boot Prompt
===========================

To (slightly) decrease boot time for a full install, the multi-boot
capabilities of the boot manager can be removed if they are not needed.

.. note:: Do not attempt this on NanoBSD as it relies on the boot manager
   for required functionality.

To remove the boot manager, the boot code on the main disk in the system
must be reinitialized. This is typically *ad0* or *ada0* when using an
IDE/SATA disk, or *da0* for SCSI or USB, but it may vary. Check the
contents of */etc/fstab* or the output of **df** to find the disk
holding the root (*/*) slice. For this, we will assume *ada0*.

First, set a special debug mode that allows writing to the early parts
of the disk. This enables the so-called “foot shooting mode” so be
careful!

.. code::

  # sysctl kern.geom.debugflags=16

Now, run::

  # fdisk -B ada0

The output will look something like this::

  ******* Working on device /dev/ada0 *******
  parameters extracted from in-core disklabel are:
  cylinders=1116 heads=255 sectors/track=63 (16065 blks/cyl)
  
  Figures below won't work with BIOS for partitions not in cyl 1
  parameters to be used for BIOS calculations are:
  cylinders=1116 heads=255 sectors/track=63 (16065 blks/cyl)
  
  Media sector size is 512
  Warning: BIOS sector numbering starts with sector 1
  Information from DOS bootblock is:
  The data for partition 1 is:
  sysid 165 (0xa5),(FreeBSD/NetBSD/386BSD)
      start 63, size 17928477 (8754 Meg), flag 80 (active)
          beg: cyl 0/ head 1/ sector 1;
          end: cyl 91/ head 254/ sector 63
  The data for partition 2 is:
  <UNUSED>
  The data for partition 3 is:
  <UNUSED>
  The data for partition 4 is:
  <UNUSED>
  Do you want to change the boot code? [n] y
  
  We haven't changed the partition table yet.  This is your last chance.
  parameters extracted from in-core disklabel are:
  cylinders=1116 heads=255 sectors/track=63 (16065 blks/cyl)
  
  Figures below won't work with BIOS for partitions not in cyl 1
  parameters to be used for BIOS calculations are:
  cylinders=1116 heads=255 sectors/track=63 (16065 blks/cyl)
  
  Information from DOS bootblock is:
  1: sysid 165 (0xa5),(FreeBSD/NetBSD/386BSD)
      start 63, size 17928477 (8754 Meg), flag 80 (active)
          beg: cyl 0/ head 1/ sector 1;
          end: cyl 91/ head 254/ sector 63
  2: <UNUSED>
  3: <UNUSED>
  4: <UNUSED>
  Should we write new partition table? [n] y
  fdisk: Class not found

Answer ``y`` to both prompts. The **Class not found** error at the end can
be ignored. The F1 Prompt is now gone.

Now either reboot, or run::

 # sysctl kern.geom.debugflags=0

Which will disable the “foot shooting mode” and also stop printing geom
debug messages to the console.

If this error is received::

  fdisk: failed to write sector zero

Then something didn't take with the debugflags sysctl line. Try it
again, ensuring everything was typed exactly as shown above.

