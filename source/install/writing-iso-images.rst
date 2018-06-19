.. include:: /substitutions.rsti

Writing ISO Images
==================

A disc will need to be burned from a :doc:`downloaded ISO image </install/installing-pfsense>` if it will be used with a
physical optical drive. Since the downloaded file is a CD image, it will
need to be burned appropriately for image files — not as a data CD
containing the single ISO file. Procedures for doing so will vary by OS
and available software.

Before the image can be burned, it must be decompressed. The *.gz*
extension on the file indicates that it is compressed with *gzip*. This
can be decompressed on Windows using `7-Zip <http://www.7-zip.org/>`__,
or on BSD/Linux/Mac with the *gunzip* or *gzip -d* commands.

Burning in Windows
------------------

Virtually every major disc burning software package for Windows includes
the ability to burn ISO images. Refer to the documentation of the disc
burning program being used. A Google search with the name of the
software and "burn iso" should help to locate instructions.

Burning with Nero
~~~~~~~~~~~~~~~~~

It is easy to burn ISO images with Nero. Start by right clicking on the
ISO file, then click **Open With**, and select **Nero**. The first time
this is done, it may be necessary to select **Chose Default Program**
and then pick **Nero** from the list. This same process should work with
other commercial CD burning software.

Burning with ISO Recorder
~~~~~~~~~~~~~~~~~~~~~~~~~

If using Windows XP, 2003, or Vista, the freely available `ISO
Recorder <http://isorecorder.alexfeinman.com>`__ tool may be used.
Download and install the appropriate version of ISO Recorder for the
operating system being used, then browse to the folder on the drive
containing the pfSense ISO, right click the file, and click **Copy image
to CD**.

Other Free Burning Software
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Other free options for Windows users include
`CDBurnerXP <http://www.cdburnerxp.se/>`__,
`InfraRecorder <http://infrarecorder.org/>`__ and
`ImgBurn <http://www.imgburn.com/>`__, among others.

Before downloading and installing any program, check its feature list to
make sure it is capable of burning an ISO image.

Burning in Linux
----------------

Linux distributions such as Ubuntu typically include some form of GUI
burning application that can handle ISO images. If one is integrated
with the window manager, right click on the ISO file and choose **Write
disc to**. Other popular choices include **K3B** and **Brasero Disc
Burner**.

If a GUI burning program is not installed, it may still be possible to
burn from the command line. First, determine the burning device's SCSI
ID/LUN (Logical Unit Number) with the following command::

  # cdrecord --scanbus
  Cdrecord-Clone 2.01 (i686-pc-linux-gnu) Copyright (C) 1995-2004 Jörg Schilling
  Linux sg driver version: 3.1.25
  Using libscg version 'schily-0.8'.
  scsibus0:
     0,0,0 100) 'LITE-ON ' 'COMBO LTC-48161H' 'KH0F' Removable CD-ROM

.. note:: The SCSI ID/LUN is *0,0,0*.

Burn the image as in the following example, replacing **<max speed>** with the
speed of the burner and *lun* with the SCSI ID/LUN of the recorder::

  # cdrecord --dev=lun --speed=<max speed> pfSense-CE-2.3-RELEASE-amd64.iso

Burning in FreeBSD
------------------

FreeBSD includes the *burncd* program in its base system which can be
used to burn ISO images::

  # burncd -s max -e data pfSense-CE-2.3-RELEASE-amd64.iso fixate

For more information on creating CDs in FreeBSD, please see the entry
for CD burning in the FreeBSD Handbook at
https://www.freebsd.org/doc/en/books/handbook/creating-cds.html.

Verifying the CD
----------------

Now that the CD is prepared, verify it was burned properly by viewing
the files contained on the CD. More than 20 folders should be visible,
including *bin*, *boot*, *cf*, *conf*, and more. If only one large ISO
file is seen, the CD was not burned properly. Repeat the steps listed
earlier for burning a CD, and be sure to burn the ISO file as a CD
*image* and not as a data file.
