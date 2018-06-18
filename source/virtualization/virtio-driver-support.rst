.. include:: /substitutions.rsti

VirtIO Driver Support
=====================

The FreeBSD kernel used by pfSense includes VirtIO drivers built into the
kernel. No special action is necessary to enable the drivers.

Disable Hardware Checksum Offloading
------------------------------------

With the current state of VirtIO network drivers in FreeBSD, it is necessary to
check **Disable hardware checksum offload** under **System > Advanced**
on the **Networking** tab *and to manually reboot pfSense after saving the
setting, even though there is no prompt instructing to do so* to be able to
reach systems (at least other VM guests, possibly others) protected by pfSense
**directly from the VM host**.

The issue is most likely caused by `FreeBSD Bug 165059`_.

Hardware checksums and other NIC offloading features like TSO may also need to
be disabled on the hypervisor system in addition to the pfSense VM.

.. _FreeBSD Bug 165059: https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=165059