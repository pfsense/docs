Writing Disk Images
===================

The pfSense NanoBSD and memstick images are meant to be written directly
to a disk for use. This document covers how to write these image files
to a target disk.

For the memstick images, this will be a USB thumb drive or similar to be
used as an installer disk. For NanoBSD, this will be the actual target
media (typically CF or SD card) and not an installer.


.. warning:: By choosing the wrong destination one of the system hard disks
   could be erased! Check and recheck the disk selection before writing an
   image!

Assumptions:

-  pfSense image file must be downloaded from
   https://www.pfsense.org/download/ and available locally before
   starting.
-  The pfSense image has been :doc:`verified </install/verify-downloaded-files>` by
   checking its sha256 hash and its signature.
-  Knowledge of the target drive letter or device node (e.g. E:,
   */dev/da1*, */dev/sdb*, */dev/disk2*, etc)

Find platform from which the imaging will be performed and expand the
section(s) for detailed instructions.

Cleaning The Target Disk (optional, but recommended)
----------------------------------------------------

Sometimes the target drive already has a partition and cannot be written
properly. To get a fresh start, wipe all of the partitions from the
disk. This can be done a few different ways in Windows or in UNIX.

Windows
^^^^^^^

The Disk Management interface in Windows is one way to delete the
partitions from a disk but often it has the operation disabled. The
simplest and most reliable method is to use **diskpart**.

-  Start a command prompt as Administrator

.. image:: /_static/hardware/ admin_cmd_prompt.png

-  Run **diskpart**
-  Type **list disk** to show the disks connected to the system. One of
   them will be the target USB flash drive
-  Type **select disk *n*** where *n* is the disk number of the target
   USB flash drive from the list in the previous command output
-  Type **clean** to remove the partitions from the disk

The full **diskpart** session can be seen here:

.. image:: /_static/hardware/imgwriter_02_clean_target_disk.png

Linux
^^^^^

The **dd** command is by far the easiest way to erase the disk's
partition table::

  $ sudo dd if=/dev/zero of=/dev/sdz bs=1M count=1

Writing Images in Windows
-------------------------

When using Windows we suggest the following GUI based applications:

Rufus
^^^^^

`Rufus <https://rufus.akeo.ie/>`__ Rufus is a simple but powerful
utility that helps format and create bootable USB flash drives, such as
USB keys/pendrives, memory sticks

-  Download Memstick pfSense image
-  Extract the .img file from the .gz archive first
-  Download Rufus from https://rufus.akeo.ie/
-  Select your USB under Device
-  Under "Create bootable disk using" click on CD-ROM icon
-  Select extracted pfSense .img that you downloaded as described above
-  Click Start and wait for image to be copied to USB.

Image Writer for Windows / Win32 Disk Imager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Image Writer for Windows, also known as Win32 Disk Imager is a Free and
easy-to-use program to write disk images in Windows. It also only lists
removable drives in its GUI which prevents accidentally overwriting a
permanent disk.

This program can be downloaded from
https://sourceforge.net/projects/win32diskimager/

First, decompress the image using the easy/free decompression utility: 7-zip -
http://www.7-zip.org/

-  Install 7-zip if it is not already present on the system
-  Right click the img.gz file
-  Click 7-zip
-  Click **Extract Here**

.. image:: /_static/hardware/imgwriter_01_extract.png

Then, write the image

-  Download and install Win32 Disk Imager from
   https://sourceforge.net/projects/win32diskimager/ if it is not already
   present.
-  Start Win32 Disk Imager, and ensure it is running as Administrator
-  Click the folder icon (1)
-  Navigate to the location of the downloaded image file
-  Select the image file
-  Choose the target drive (2)
-  Click Write (3)

.. image:: /_static/hardware/imgwriter_03_select_image.png

-  Wait for the image to finish writing, and the following dialog will
   appear:

.. image:: /_static/hardware/imgwriter_04_finished.png

Writing Images in UNIX
----------------------

On UNIX and UNIX-like systems, dd is the best choice for writing disks.

Linux/other
^^^^^^^^^^^

The dd command on Linux may be used from a shell logged in as a user
with **sudo** access or the root user directly.

Before proceeding, check the system log or run the dmesg command after
connecting the target disk to find its device name (e.g. /dev/sdd or
something like /dev/mmcblk0 if systemd is in use). The following
commands use sample disk names, replace them with the actual device name
of the target disk.

The image can be decompressed and written in one command. If run as
root, omit **sudo**.

.. code::

  $ gzip -dc pfSense-memstick-2.4.4-RELEASE-p1-amd64.img.gz | sudo dd of=/dev/sdz bs=1M
  [sudo] password for user:
  0+7416 records in
  0+7416 records out
  243048448 bytes (243 MB) copied, 26.3313 s, 9.2 MB/s
  $

If a warning is printed about "trailing garbage" is may be safely
ignored, as it is from the file's digital signature.

FreeBSD
^^^^^^^

FreeBSD works similar to Linux but needs a slightly different set of
parameters to dd.

Before proceeding, check the system log after connecting the target disk
to find its device name (e.g. /dev/da1). The following commands use
sample disk names, replace them with the actual device name of the
target disk.

.. code::

  $ gzip -dc pfSense-memstick-2.4.4-RELEASE-p1-amd64.img.gz | sudo dd of=/dev/da9 obs=64k

If a warning is printed about "trailing garbage" is may be safely
ignored, as it is from the file's digital signature.

Writing Images in Mac OS X
--------------------------

Works similar to FreeBSD and Linux, but the proper disk name must be
located first (e.g. /dev/rdisk3).

-  Use the GUI Disk Utility to locate and unmount the target disk after
   connecting

-or-

- Locate the disk using **diskutil list**
- Unmount the disk using the identifier listed from diskutil::

    diskutil umount disk3s1

- Decompress and write the image::

    $ gzcat pfSense-memstick-2.4.4-RELEASE-p1-amd64.img.gz | sudo dd of=/dev/rdisk3 bs=1m

