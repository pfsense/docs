Upgrading from versions older than pfSense 2.2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. seealso:: For information about upgrading to current versions, see
   :doc:`upgrade-guide`.

.. warning:: Uninstalling **all** packages is **required** when upgrading from
   old releases. Packages **must be removed** before the upgrade is performed.
   After the upgrade is complete, packages can be reinstalled. Package
   configuration is automatically retained.

Limiters
++++++++

* On pfSense 2.2 and 2.3, limiters cannot be used on firewall rules residing on
  interfaces where NAT applies. This limits their use to LAN-type interfaces
  only, and not WANs, in most circumstances. This has been fixed on pfSense 2.4.
  `Bug #4326 <https://redmine.pfsense.org/issues/4326>`__

* On pfSense 2.2 and 2.3, limiters cannot be used where pfsync is enabled. This
  has been fixed on pfSense 2.4.3. `Bug #4310 <https://redmine.pfsense.org/issues/4310>`__

IPsec Changes
+++++++++++++

The IPsec daemon was changed from **racoon** to **strongSwan**. Existing
configurations work the same as always, but if any unusual configurations are
present, take care in testing after the upgrade. Changes in behavior because of
this change may trigger bugs in remote endpoints that weren't previously an
issue. Configurations that were always technically incorrect may exhibit
problems now where they didn't previously. We have listed the circumstances we
are aware of here, and will expand upon this list if anything new is found.

Problem in racoon with aggressive mode and NAT-D
################################################

Those using racoon (pfSense 2.1.x and earlier, among a variety of other similar
products) on remote endpoints with aggressive mode may encounter a bug in racoon
related to NAT-D and aggressive mode. Any site to site IPsec VPNs using
aggressive mode with racoon as a remote endpoint should change to main mode to
prevent this from being an issue. Main mode is always preferable for its
stronger security.

glxsb Crypto Accelerator Warning
################################

For those using the ``glxsb`` crypto accelerator in the ALIX and other devices
with Geode CPUs, only AES 128 bit is supported by those cards. Any key length >
128 bit has never worked, and must not be configured. There appear to be
circumstances where AES on "auto" with racoon preferred 128 bit where strongswan
prefers the strongest-available and is choosing 256 bit, which glxsb breaks.
Input validation in 2.2.1 prevents such invalid configurations when adding
configurations or making changes, however existing configurations are not
changed. If using glxsb and AES, ensure both phase 1 and phase 2 configurations
all use AES 128 only and never auto.

Mobile client users, verify Local Network
#########################################

For mobile IPsec clients, clients could pass traffic in certain circumstances
without having specified the necessary matching local network in the mobile
phase 2 configuration. The "Local Network" specified in mobile IPsec phase 2
must include all networks mobile clients need to reach. If mobile IPsec clients
need to access the Internet via IPsec, the mobile phase 2 must specify
``0.0.0.0/0`` as the local network.

Stricter Phase 1 Identifier Validation
######################################

In 2.1.x and earlier versions, racoon could accept mismatched phase 1
identifiers where using *IP Address* as the identifier. This is most commonly a
problem where one of the endpoints is behind NAT and phase 1 is using *My IP
Address* and *Peer IP Address* for identifiers. On the side with the private IP
WAN, *My IP Address* will be its private WAN IP address. On the opposite end,
*Peer IP Address* will be the public IP address of the opposite side. Hence,
these two values do not match, and should have resulted in a connection failure.
racoon would fall back to checking the source IP address of the initiating host
as an identifier, where it found the match. To resolve this issue, change the
phase 1 identifiers so they actually match.

Phase 2 behavior change with incorrect network addresses
########################################################

In 2.1.x and earlier versions a phase 2 configuration with an incorrect network
address would still be presented by racoon with the corrected network address.
e.g. if ``192.168.1.1/24`` is set in a phase 2, which should be
``192.168.1.0/24``, racoon used it as ``192.168.1.0/24``. In 2.2.x and newer
versions, strongswan sends it exactly as configured. This may result in a phase
2 mismatch where configured with an incorrect network address.

Disk Driver Changes
+++++++++++++++++++

The disk drivers in FreeBSD changed between the underlying OS versions and now
the CAM-based ATA drivers and AHCI are used by default. As such, ATA disks are
labeled as ``/dev/adaX`` rather than ``/dev/adX``. The ``ada`` driver for ATA
disks and GEOM keeps legacy aliases in place so that old disk references will
still work post-upgrade. This does not always extend to virtualized disk
drivers, however (see the Xen note below.). The upgrade process on pfSense 2.3
and 2.4 also attempts to automatically correct for this change.

A manual workaround is also possible. Running ``/usr/local/sbin/ufslabels.sh``
**before** the upgrade will convert ``/etc/fstab`` to UFS labels rather than
disk device names bypassing any device name issues that could arise due to the
switch.

There is a chance that the new driver stack will have issues with certain
controller/disk combinations that were not present in prior releases. There may
be BIOS changes or other workarounds to help. See :doc:`Boot Troubleshooting
</hardware/boot-troubleshooting>`.

The methods used to disable DMA and write caching have both changed on FreeBSD
10.x. For most, disabling these manually is no longer necessary.

If disabling DMA is necessary, the following may be used in
``/boot/loader.conf.local``::

  hint.ata.X.mode=PIO4

Change ``X`` to be the ATA controller ID, typically ``0`` or ``1``.

If write caching must be disabled, the following may be used in
``/boot/loader.conf.local``::

  kern.cam.ada.write_cache=0

Xen Users
+++++++++

The FreeBSD base used by pfSense 2.2 and later includes PVHVM drivers for Xen in
the kernel. This can cause Xen to automatically change the disk and network
device names during an upgrade to pfSense 2.2 or later, which the Hypervisor
should not do but does anyway.

The disk change can be worked around by running ``/usr/local/sbin/ufslabels.sh``
**before** the upgrade to convert ``/etc/fstab`` to UFS labels rather than disk
device names.

The NIC device change issue has no workaround. Manual reassignment is required.

vmxnet3 (VMware/ESX) users
++++++++++++++++++++++++++

Users who manually installed :doc:`VMware Tools
</virtualization/installing-vmware-guest-tools>` to use ``vmxnet3`` network
adapters may encounter an issue with interface name changes when upgrading to
pfSense 2.2 or later, similar to those with Xen mentioned above. In pfSense
2.1.x the ``vmxnet3`` interfaces were named starting with ``vmx3f`` and on
pfSense 2.2.x they are ``vmx`` using the built-in support. Manually reassigning
the interfaces or correcting them in ``config.xml`` followed by a restore is
required.

Old/Broken GEOM Mirrors
+++++++++++++++++++++++

If a manual gmirror configuration was performed post-install and not using the
pfSense installer gmirror option before install, there is a chance that the
mirror will not function on pfSense 2.2 or later because the manual post-install
method did not create a proper mirror setup. If an upgraded mirror does not boot
or function on pfSense 2.2 or later, use the following entry to work around the
integrity check that would otherwise fail.

Add the following line to ``/boot/loader.conf.local``::

  kern.geom.part.check_integrity=0

If the disks are configured in this way, we **strongly** recommend backing up
the configuration and reinstalling, using one of the mirrored disk options in
the pfSense installer.

CARP Changes
++++++++++++

Due to the new CARP subsystem, the old method of having a virtual interface for
CARP VIPs is no longer available. CARP VIPs work more like IP Alias style VIPs,
existing directly on the main interface. For most, the changes made to
accommodate this new system will be transparent, but there are some potential
issues, such as:

* With no separate interface available, monitoring a CARP VIP status via SNMP is
  no longer possible.

FTP Proxy
+++++++++

The FTP proxy is not included in pfSense 2.2-RELEASE or later, due to changes in
the kernel and state table handling that made it it more difficult to
implement. Use of FTP is strongly discouraged as credentials are transmitted
insecurely in plain text. `#4210 <https://redmine.pfsense.org/issues/4210>`__

See :doc:`FTP without a Proxy </nat/ftp-without-a-proxy>` for additional
information and workarounds.

Another option is the recently added FTP Client Proxy package which
leverages in FreeBSD to allow clients on local interfaces to reach
remote FTP servers with active FTP.

LAGG LACP Behavior Change
+++++++++++++++++++++++++

LAGG using LACP in FreeBSD 10.0 and newer defaults to "strict mode", which means
the lagg does not come up unless the attached switch is speaking LACP. This will
cause a LAGG to not function after upgrade if the switch is not using active
mode LACP.

To retain the lagg behavior in pfSense 2.1.5 and earlier versions, add a new
system tunable under **System > Advanced**, **System Tunables** tab for the
following::

  net.link.lagg.0.lacp.lacp_strict_mode

With value set to ``0``.

This can be added before upgrading to 2.2 to ensure the same behavior on first
boot after the upgrade. It will result in a harmless cosmetic error in the logs
on 2.1.5 since the value does not exist in that version.

If a firewall has more than one LAGG interface configured, enter a tunable for
each instance since that is a per-interface option. For ``lagg1``, add the
following::

  net.link.lagg.1.lacp.lacp_strict_mode

Also with the value set to ``0``.

Intel 10Gbit/s ixgbe/ix users with Unsupported SFP modules
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

The sysctl to allow unsupported SFP modules changed in FreeBSD between
the versions used for pfSense 2.1.x and 2.2.

The old tunable was::

  hw.ixgbe.unsupported_sfp=1

This must be changed to::

  hw.ix.unsupported_sfp=1

Edit the setting in ``/boot/loader.conf.local`` before applying the update and
the behavior will be retained.

Layer 7
+++++++

Layer 7 is deprecated and has been removed. For layer 7 application
identification and filtering we recommend using the :doc:`Snort IDS/IPS
</ids-ips/setup-snort-package>` package with OpenAppID detectors and rules.

Microsoft Load Balancing / Open Mesh Traffic
++++++++++++++++++++++++++++++++++++++++++++

Windows Network Load Balancing and Open Mesh access points can use multicast MAC
address destinations which rely on broken behavior that was incorrectly allowed
by default in earlier versions of FreeBSD and pfSense. The fact it worked before
was technically a bug, acting in violation of RFC 1812.

.. pull-quote::

   A router MUST not believe any ARP reply that claims that the Link Layer
   address of another host or router is a broadcast or multicast address.

The default behavior on pfSense 2.2 is correct, but it may be changed.

If this behavior be required, manually add a tunable as follows:

* Navigate to **System > Advanced**, **System Tunables** tab
* Click |fa-plus|
* Enter the following values:

  * **Tunable**: ``net.link.ether.inet.allow_multicast``
  * **Description**: Optional. It would be wise to enter the URL to this note or
    a similar note.
  * **Value**: ``1``

* Click **Save**
