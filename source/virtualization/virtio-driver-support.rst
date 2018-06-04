.. include:: /substitutions.rsti

VirtIO Driver Support
=====================

Disable Hardware Checksum Offloading
====================================

With the current state of VirtIO network drivers in FreeBSD, it is
necessary to check the **Disable hardware checksum offload** box under
**System > Advanced** on the **Networking** tab *and to manually reboot
pfSense after saving the setting, even though there is no prompt
instructing to do so* to be able to reach systems (at least other VM
guests, possibly others) protected by pfSense **directly from the VM
host**.

The issue seems to be related to
https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=165059

Hardware checksums and other NIC offloading features like TSO may also
need to be disabled on the hypervisor system in addition to the pfSense
VM: https://forum.pfsense.org/index.php?topic=88467.0

Enabling VirtIO Driver Support on pfSense 2.1.x and before
==========================================================

The following instructions are not necessary on pfSense 2.2 and later,
which have the proper drivers built into the kernel.

Adapted from a `forum port by
JR <http://forum.pfsense.org/index.php/topic,50128.0.html>`__

For those who run pfSense inside a KVM Virtual Machine, here are some
easy steps to enable VirtIO for a pfSense VM.

Works-For-Me with:

-  pfSense 2.1
-  Debian Testing - 20120603

   -  qemu-kvm 1.0
   -  libvirt 0.9.11
   -  openvswitch 1.4.0
   -  virt-manager 0.9.1

I'm using 4 interfaces that are connected to various virtual switches on
the KVM host:

-  NIC1 - ISP1
-  NIC2 - ISP2
-  NIC3 - CARP
-  NIC4 - LAN

Loading Kernel Modules
----------------------

Before a VirtIO device can be used, the VirtIO kernel modules must be
loaded, but before the kernel modules can be loaded, at least one
interface must be enabled during pfSense installation. Create all VM
interfaces as VirtIO devices but leave just one default (Intel), The
default install can finish and the pfSense console menu can be reached.

If unable to make changes to the network and the VM is VirtIO only, then
the loader prompt will be needed to load the modules. During the boot
process, press option 7 for a loader prompt, then type::

  load virtio_blk
  load virtio_pci
  load vtnet
  boot

Then proceed to install the system. After install use the loader menu
once more to load the modules and then once the system is up and
running, follow the directions below to permanently load them via
*/boot/loader.conf.local*.

Edit /boot/loader.conf.local
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create or edit */boot/loader.conf.local* to append the file with the
VirtIO module settings. This may be performed in the GUI using
**Diagnostics > Edit File**, or at the console/ssh shell.

Editing at the shell could use vi::

  # vi /boot/loader.conf.local

Or ee::

  # ee /boot/loader.conf.local

The following lines should be added::

  virtio_load="YES"
  virtio_pci_load="YES"
  if_vtnet_load="YES"

To use VirtIO for only VM network interfaces, the configuration is
complete. Shutdown the VM, change the single default Ethernet device
used for installation to VirtIO and boot into pfSense. From here all
VirtIO network interfaces should be visible and ready for final
configuration ( interface name: vtnet\ *X* ).

Add VirtIO Memory Ballooning
----------------------------

Memory ballooning allows a guest to dynamically change its memory usage
by evicting unused memory during runtime. Most useful for environments
with large memory over-commit requirements.

Edit */boot/loader.conf.local* (see above) and add::

  virtio_balloon_load="YES"

Add VirtIO Block Device
-----------------------

In addition to the network interfaces there also are VirtIO drivers for
block devices (virtual harddisks). Run the default installation with a
virtual harddisk in IDE mode and change the */boot/loader.conf.local*
and */etc/fstab* files afterwards (or run *ufslabels.sh*).

Edit */boot/loader.conf.local* (see above) and add::

  virtio_blk_load="YES"

By default the pfSense installer creates a root and swap volume on the
IDE device */dev/ad0* or */dev/ada0* on pfSense 2.2. Before changing the
virtual harddisk from IDE to VirtIO, edit the fstab file with the new
VirtIO block device name ( /dev/vtbd*X* ).

Edit /etc/fstab (see above) and add::

  /dev/vtbd0s1a     /          ufs          rw     1     1
  /dev/vtbd0s1b     none     swap       sw     0     0

Alternately, from a shell prompt, run::

  # ufslabels.sh

Then follow the prompts. This changes the fstab automatically to use UFS
IDs and does not reference the device name directly.

Shut down the VM and change the virtual harddisk from IDE to VirtIO,
boot and enjoy the pfSense KVM VirtIO Virtual Machine...

.. code::

  # kldstat
  Id Refs Address            Size     Name
   1   12 0xffffffff80100000 1540f20  kernel
   2    5 0xffffffff81641000 4ac0     virtio.ko
   3    1 0xffffffff81646000 5670     virtio_pci.ko
   4    1 0xffffffff8164c000 4d88     virtio_blk.ko
   5    1 0xffffffff81651000 2f80     virtio_balloon.ko
   6    1 0xffffffff81654000 b0e0     if_vtnet.ko
  # df -h
  Filesystem       Size    Used   Avail Capacity  Mounted on
  /dev/vtbd0s1a    4.4G    234M    3.8G     6%    /
  devfs            1.0k    1.0k      0B   100%    /dev
  /dev/md0         3.6M     46k    3.3M     1%    /var/run
  devfs            1.0k    1.0k      0B   100%    /var/dhcpd/dev
  # swapinfo
  Device          1K-blocks     Used    Avail Capacity
  /dev/vtbd0s1b      524288        0   524288     0%
