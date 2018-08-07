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

Also, there is a known issue with BGP MD5 sessions and TCP-MD5 when Hardware Checksum Offloading (rxcsum) is disabled. See `Bug #8407`_ and `Bug #7969`_. With the inclusion of FreeBSD 11.2-RELEASE in pfSense 2.4.4 this issue is corrected. See `FreeBSD Bugzilla – Bug 223835`_.

Hardware checksums and other NIC offloading features like TSO may also need to
be disabled on the hypervisor system in addition to the pfSense VM.

.. _FreeBSD Bug 165059: https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=165059
.. _FreeBSD Bugzilla – Bug 223835: https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=223835
.. _Bug #8407: https://redmine.pfsense.org/issues/8407
.. _Bug #7969: https://redmine.pfsense.org/issues/7969
