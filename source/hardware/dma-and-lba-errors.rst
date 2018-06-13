.. include:: /substitutions.rsti

Troubleshooting DMA and LBA Errors
==================================

Non-Fatal Errors
----------------

CF NID Not Found Error
~~~~~~~~~~~~~~~~~~~~~~

Some newer Compact Flash cards are giving users trouble, in particular
the Sandisk 4GB 30MB/s cards seem to be problematic.

The cards may function properly, but will often generate an error in the
logs such as::

  ad0: FAILURE - READ status=51<READY,DSC,ERROR> error=10<NID_NOT_FOUND> LBA=7813119
  ad0: FAILURE - READ status=51<READY,DSC,ERROR> error=10<NID_NOT_FOUND> LBA=7813119

This normal and safe to ignore. It has nothing to do with image size, a
1 GB image can be used on a 4 GB card and they still do that. From what
I've been able to gather on that, the cards report they have a larger
usable size than they do, and when the FreeBSD ATA code initializes it
tries to read the end of the disk even if its partition is nowhere near
that, which the CF is reporting doesn't actually exist, which is what
that log message says.

.. pull-quote::

   according to ATA-7 specification, Section 6.59.6 is: "IDNF shall be
   set to one if a user-accessible address could not be found. IDNF
   shall be set to one if an address outside of the range of
   user-accessible addresses is requested if command aborted is not
   returned." FreeBSD labels this bit as NID_NOT_FOUND

Summarized from `this forum
post <http://forum.pfsense.org/index.php/topic,41312.msg226353.html#msg226353>`__.

SETFEATURES Error
~~~~~~~~~~~~~~~~~

Newer snapshots and releases of pfSense (after 2.0.1) also attempt to
setup APM for an ATA hard drive at boot. Sometimes the detection yields
a non-fatal error when trying to find if the value is supported, or when
the drive claims it's supported but can't set it. That error is::

  ad0: FAILURE - SETFEATURES 0x85 status=41<READY,ERROR> error=4<ABORTED>

It should only be seen once at bootup on such systems, and can safely be
ignored.

Fatal Errors
------------

The following errors would indicate more serious problems such as a
faulty HDD/CF, faulty cable/controller, a faulty CF/SATA/IDE converter,
a device out of space, or possibly that :doc:`DMA needs disabled on that combination of hardware </hardware/boot-troubleshooting>`.

.. code::

  ad0: FAILURE - READ_DMA status=51<READY,DSC,ERROR> error=40<UNCORRECTABLE> LBA=3919

.. code::

  ad0: WARNING - READ_DMA UDMA ICRC error (retrying request) LBA=207
  ad0: WARNING - READ_DMA UDMA ICRC error (retrying request) LBA=207
  ad0: FAILURE - READ_DMA status=51<READY,DSC,ERROR> error=84<ICRC,ABORTED> LBA=207
  g_vfs_done():ad0s1a[READ(offset=65536, length=8192)]error = 5

.. code::

  ad0: FAILURE - WRITE_DMA status=51<READY,DSC,ERROR> error=4<ABORTED> dma=0x06 LBA=1129359

Other Errors
------------

The following errors have been observed on certain hardware platforms
running pfSense 2.2. While they do not appear to be fatal, the cause
appears to be a disk driver issue in FreeBSD (9.2 and later) and it may
degrade performance. If these errors are encountered, attempt to
reproduce the problem with a stock FreeBSD 10.1 or later installation
and report the problem directly to FreeBSD.

.. code::

  (ada0:ata0:0:1:0): READ_DMA. ACB: c8 00 3f 95 07 40 00 00 00 00 08 00
  (ada0:ata0:0:1:0): CAM status: ATA Status Error
  (ada0:ata0:0:1:0): ATA status: ff (BSY DRDY DF SERV DRQ CORR IDX ERR), error: 00 ()
  (ada0:ata0:0:1:0): RES: ff 00 46 95 07 00 00 00 00 00 00
  (ada0:ata0:0:1:0): Retrying command

.. code::

  (ada0:ata0:0:1:0): WRITE_DMA. ACB: ca 00 ef e8 1a 40 00 00 00 00 08 00
  (ada0:ata0:0:1:0): CAM status: ATA Status Error
  (ada0:ata0:0:1:0): ATA status: ff (BSY DRDY DF SERV DRQ CORR IDX ERR), error: 00 ()
  (ada0:ata0:0:1:0): RES: ff 00 ef e8 1a 00 00 00 00 08 00
  (ada0:ata0:0:1:0): Retrying command

This appears to further be limited to onboard CF-to-SATA sockets. Using
another disk type (mSATA, SATA, etc) may also be a viable workaround.
