.. include:: /substitutions.rsti

pfSense Upgrade Guide
=====================

The supported methods to upgrade from one pfSense release to another
depend on the platform being used. Any version of pfSense can be
reliably upgraded to any *newer* version while retaining the existing
configuration. This includes RC, Beta, and other releases. So long as
the firmware is moving from an older version to a newer version, it will
work unless noted otherwise.

Pre-Upgrade Tasks
-----------------

Make a backup!
^^^^^^^^^^^^^^

First, as always before any major change to the firewall, make sure there is a
good, up-to-date backup. Visit **Diagnostics > Backup/Restore** and download a
backup of the firewall configuration (``config.xml``). Those with a
|premium_content_link| may also use the :doc:`AutoConfigBackup
</backup/autoconfigbackup>` package to make a manual backup noting the reason as
"before upgrade". Keeping a local and remote copy of the backup *config.xml* is
strongly advised.

Prepare a fall back plan
^^^^^^^^^^^^^^^^^^^^^^^^

Before any upgrade is performed, plan for how to recover prior in case
something goes wrong. There is a chance that a regression from one
version to another, either in the pfSense or FreeBSD code, can leave the
firewall unusable. With some advance planning, the firewall can quickly
be returned to the previous release.

Downgrading to a previous release
"""""""""""""""""""""""""""""""""

Downgrading a full installation to previous releases directly in-place
is not supported. Very rarely is it desirable or necessary to go back to
a prior release. Should that be necessary, the previous version must be
reinstalled and a configuration backup from that version must be
restored. Configurations from newer versions **cannot** be restored to
older versions.

For NanoBSD, this can be done by switching back to the previous update
slice from the GUI, console, or boot menu. The pre-upgrade configuration will
need to be restored restored after the switch.

Reinstalling the previous release
"""""""""""""""""""""""""""""""""

The worst case scenario on upgrading is a FreeBSD regression that
prevents the firewall from booting successfully, or no longer
communicating with the network. In this case, reinstall. For a full
install, this means reinstalling from a CD or Memstick for the previous
release. Download the appropriate image and have it ready before
starting the upgrade procedure.

This is the least likely scenario, with maybe one in every ten or twenty
thousand installs affected with upgrades containing significant FreeBSD
release changes (such as pfSense 1.2.3 to 2.0, going from FreeBSD 7.2 to
8.1).

VM Snapshots
""""""""""""

An easy fall-back plan for virtualized firewalls is to take a snapshot
of the VM before performing an upgrade. This way, if anything should go
wrong, it can easily roll back to a known-good state.

Packages
^^^^^^^^

It is always safest to remove packages before upgrading to a new major
release. Packages will be reinstalled afterward, but are frequently a
source of problems. To ensure a smooth upgrade, note the installed
packages, remove them, perform the upgrade, and then reinstall whichever
packages are necessary.

Performing the Update
---------------------

The specifics of performing the actual firmware update (Automatic or
manual) are covered in :doc:`Firmware Updates </install/upgrading-pfsense-software-installations>`.

Changing architecture (32-bit to 64-bit or vice versa) during upgrade
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Upgrading a 32-bit system to 64-bit, or vice versa, is not supported.
The most reliable method to change architecture is to reinstall and
restore the configuration. The configuration file is the same on both
versions.

Upgrading from 32-bit to 64-bit mostly works fine with a couple caveats
- the 32-bit RRD data is invalid on the 64-bit version and will have to
be deleted by running ``rm -rf /var/db/rrd*``. All RRD history will be
lost, this cannot be converted. Also after the upgrade, the *reboot*
binary will be 64-bit which cannot run on a 32-bit platform, so the
system will fail to reboot on its own. The firewall must be power cycled
to complete the upgrade. Many users have done this upgrade without
seeing any caveats other than this, but it **is not recommended**.

If the firewall is running 2.1 or later, the RRD files may be converted
by use of the configuration backup mechanism. When a backup is made from
**Diagnostics > Backup/Restore** with **Do not backup RRD data**
*unchecked* the RRD files are exported into an architecture-independent
format which can then be imported back into pfSense by restoring the
configuration. The restore could be done after a reinstall or in-place
upgrade changing the architecture, but the data must be backed up before
the switch is made.

Avoiding Unintended Architecture Change
"""""""""""""""""""""""""""""""""""""""

In 2.2.x and earlier versions, the firmware update URL could be
hard-coded to a user-specified value. If this is done on a 32 bit
system, and that configuration later restored to a 64 bit system, the
next upgrade of the restored system will switch it to 32 bit. When using
auto-update, first browse to System>Firmware, Updater Settings tab. If
the "Use an unofficial server for firmware upgrades" box is checked,
un-check it, and click Save. Then your system will remain on its current
architecture.

Live CD
^^^^^^^

For older live CD installations, a full install is now required.
Consider installing to flash media, such as a thumb drive/memstick, if
using an SSD or HDD is not feasible. Activating the RAM disk options for
/var and /tmp under **System > Advanced** on the **Miscellaneous** tab
will reduce the amount of writes.

Embedded
^^^^^^^^

Only the new NanoBSD-based embedded images support upgrades. For those
using an embedded release from before pfSense 1.2.3, the storage medium
must be re-flashed with the appropriate sized NanoBSD release for the CF card,
then restore the configuration. Given the age of such systems, it is
likely that the CF or other media would need replaced instead.

On pfSense 1.2.3 or newer, an upgrade image may be `downloaded from the
pfSense web site <http://www.pfsense.org/download/>`__. Be sure to
download an appropriate sized NanoBSD upgrade file for the CF card.
If the size in uncertain, check */etc/nanosize.txt* or look on the
dashboard for the current NanoBSD size.

Be aware that some changes that come with NanoBSD may require fixes or
updates to the BIOS or CF image.

ALIX systems must have at *least* BIOS revision 0.99h.

WRAP systems will not work with stock pfSense 1.2.3 or newer embedded
image.

Version-Specific Notes
----------------------

pfSense 1.2.x to 2.0 Upgrade Notes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When upgrading 1.2.3 to 2.0, uninstalling *all* packages is **required**
before the upgrade is performed. Some old packages can cause problems
with the configuration upgrade process, or possibly prevent the system
from booting at all in some rare cases. After the upgrade is complete,
the packages can be reinstalled. The configuration is automatically
retained.

Note for users of the OpenVPN Status Package
""""""""""""""""""""""""""""""""""""""""""""

If a manual *management* directive was entered into the **Advanced
Configuration** of an OpenVPN client or server, it must be removed. The
OpenVPN status code is built into pfSense 2.x and later, and it is
handled internally. The management directive must be removed or the
status of the VPN instance will not be properly reported.

Note for Captive Portal RADIUS WISPr Bandwidth Users
""""""""""""""""""""""""""""""""""""""""""""""""""""

The WISPr RADIUS attributes were incorrectly applied to all versions
prior to pfSense 2.0-RELEASE. They were applied as *Kbps* where WISPr is
supposed to be *bps*, hence those using WISPr attributes will have one
one-thousandth of the previous bandwidth unless the RADIUS server is
corrected. The RADIUS server will need to have these values updated to
bps for proper functionality once the firewall has been upgraded to
pfSense 2.0-RELEASE or later.

International/Special Characters in 1.2.x Configurations
""""""""""""""""""""""""""""""""""""""""""""""""""""""""

International characters, such as åäö and so on, were not supported on
pfSense 1.2.x, but were allowed in some places due to overly lenient
input validation and less strict XML parsing. These characters causes
invalid XML when they are stored directly, and as such if pfSense 1.2.x
did not crash and toss out the configuration with such characters, it
will not upgrade to any current version of pfSense.

pfSense 2.0 and later will reset and toss out the config.xml on every
reboot if it contains these characters bare, leaving the firewall at an
"assign interfaces" prompt since it does not have a valid configuration.

The *config.xml* file can be run through an XML parser such as *xmllint*
and the parser will show where problems exist, if any. Fix the errors,
and then the corrected configuration can be used for an upgrade. The
good news is that these characters are handled properly in most areas of
the current pfSense GUI, and they are CDATA escaped so they are safe
from such errors.

pfSense 2.1 Upgrade Notes
^^^^^^^^^^^^^^^^^^^^^^^^^

See the HA section at the end of this article for a High
Availability-specific pfsync note about 2.1 upgrades.

Additionally, if upgrading from pfSense 2.0.x to pfSense 2.1:

The **State Killing on Gateway Failure** feature (**System > Advanced**,
**Miscellaneous tab**) now kills ALL states when a gateway has been
detected as down, not only states on the failing WAN. This is done
because otherwise the LAN-side states were not killed appropriately, and
thus some connections would be in limbo, especially SIP. Due to the
change in its behavior, **State Killing on Gateway Failure** is disabled
by default in new configurations and is disabled during upgrade to
pfSense 2.1.x from 2.0.x or before regardless of the user's previously
chosen setting. If the feature is desired even with its new behavior, it
must be manually re-enabled post-upgrade.

The **Allow IPv6** checkbox is **NOT** changed on upgrade unlike it was
in early pfSense 2.1 BETA firmware. This was changed so that the user's
chosen existing behavior is preserved. To allow IPv6 traffic after an
upgrade, the setting must be changed manually. This setting is located
on **System > Advanced** on the **Networking** tab. It defaults to
allowed for new configurations.

Changes to policy route negation between pfSense 2.0.x and 2.1 may
result in local/private traffic hitting policy routing rules that would
not have happened on pfSense 2.0.x. This most commonly presents as an
inability to reach local networks after upgrading. The automatic policy
route negation rules on pfSense 2.0.x were too lenient, and that
behavior was corrected. To ensure proper routing to other local
interfaces, VPNs, or static route networks rules must be added to the
local interfaces to pass traffic to these destinations without a gateway
set. And that rule must be above any others that would match and have a
gateway set.

We advise uninstalling packages prior to upgrade to avoid issues with
the conversion from tbz packages to PBI packages. If the packages are
not removed before the upgrade, some binaries may be left in place.

pfSense 2.2 Upgrade Notes
^^^^^^^^^^^^^^^^^^^^^^^^^

Limiters
""""""""

-  On pfSense 2.2 and 2.3, limiters cannot be used on firewall rules
   residing on interfaces where NAT applies. This limits their use to
   LAN-type interfaces only, and not WANs, in most circumstances. This
   has been fixed on pfSense 2.4. `Bug
   #4326 <https://redmine.pfsense.org/issues/4326>`__

-  Limiters cannot be used where pfsync is enabled. `Bug
   #4310 <https://redmine.pfsense.org/issues/4310>`__

IPsec Changes
"""""""""""""

The IPsec daemon was changed from racoon to strongSwan. Existing
configurations should work the same as always, but if any unusual
configurations are present, take care in testing after the upgrade.
Changes in behavior because of this change may trigger bugs in remote
endpoints that weren't previously an issue. Configurations that were
always technically incorrect may exhibit problems now where they didn't
previously. We've listed the circumstances we're aware of here, and will
expand upon this list if anything new is found.

Problem in racoon with aggressive mode and NAT-D
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Those using racoon (pfSense 2.1.x and earlier, among a variety of other
similar products) on remote endpoints with aggressive mode may encounter
a bug in racoon related to NAT-D and aggressive mode. Any site to site
IPsec VPNs using aggressive mode with racoon as a remote endpoint should
change to main mode to prevent this from being an issue. Main mode is
preferable regardless.

glxsb Crypto Accelerator Warning
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For those using the glxsb crypto accelerator in the ALIX and other
systems with Geode CPUs, only AES 128 bit is supported by those cards.
Any key length > 128 bit has never worked, and shouldn't be configured.
There appear to be some circumstances where AES on "auto" with racoon
preferred 128 bit where strongswan prefers the strongest-available and
is choosing 256 bit, which glxsb breaks. Input validation in 2.2.1
prevents such invalid configurations when adding configurations or
making changes, however existing configurations are not changed. If
using glxsb and AES, ensure both your phase 1 and phase 2 configurations
all use AES 128 only and never auto.

Mobile client users, verify Local Network
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For mobile IPsec clients, clients could pass traffic in some
circumstances without having specified the necessary matching local
network in the mobile phase 2 configuration. The "Local Network"
specified in mobile IPsec phase 2 must include all networks your mobile
clients need to reach. If your mobile IPsec clients need to access the
Internet via IPsec, your mobile phase 2 must specify 0.0.0.0/0 as the
local network.

Stricter Phase 1 Identifier Validation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In 2.1x and earlier versions, racoon could accept mismatched phase 1
identifiers where using "IP Address" as the identifier. This is most
commonly a problem where one of the endpoints is behind NAT and you're
using "My IP Address" and "Peer IP Address" for your identifiers. On the
side with the private IP WAN, "My IP Address" will be its private WAN
IP. On the opposite end, "Peer IP Address" will be the public IP of the
opposite side. Hence, these two values don't match, and should have
resulted in a connection failure. racoon would fall back to checking the
source IP of the initiating host as an identifier, where it found the
match. Change the phase 1 identifiers so they really do match to resolve
this.

Phase 2 behavior change with incorrect network addresses
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In 2.1x and earlier versions, a phase 2 configuration with a wrong
network address would still be presented by racoon with the corrected
network address. e.g. if you defined 192.168.1.1/24 in a phase 2 (which
should really be 192.168.1.0/24), racoon used it as 192.168.1.0/24. In
2.2x and newer versions, strongswan sends it exactly as configured,
which may result in a phase 2 mismatch where configured with a wrong
network address.

Disk Driver Changes
"""""""""""""""""""

The disk drivers in FreeBSD changed between the underlying OS versions
and now the CAM-based ATA drivers and AHCI are used by default. As such,
ATA disks are labeled as */dev/adaX* rather than */dev/adX*. The ada
driver for ATA disks and GEOM keeps legacy aliases in place so that old
disk references will still work post-upgrade. This does not always
extend to virtualized disk drivers, however (see the Xen note below.)

For a full install, running */usr/local/sbin/ufslabels.sh* **before**
the upgrade will convert */etc/fstab* to UFS labels rather than disk
device names bypassing any device name issues that could arise due to
the switch.

There is also a chance that the new driver stack will have issues with
certain controller/disk combinations that were not present in prior
releases. There may be BIOS changes or other workarounds to help. See
:doc:`Boot Troubleshooting </hardware/boot-troubleshooting>`.

The methods used to disable DMA and write caching have both changed on
FreeBSD 10.x. For most, disabling these manually is no longer necessary.

If disabling DMA is necessary, the following may be used in
*/boot/loader.conf.local*:::

  hint.ata.X.mode=PIO4

Change X to be the ATA controller ID, typically *0* or *1*.

If write caching must be disabled, the following may be used in
*/boot/loader.conf.local*::

  kern.cam.ada.write_cache=0

Xen Users
"""""""""

The FreeBSD 10.1 base used by pfSense 2.2 includes PVHVM drivers for Xen
in the kernel. This can cause Xen to automatically change the disk and
network device names during an upgrade to pfSense 2.2, which the
Hypervisor should not do but does anyway.

The disk change can be worked around by running
*/usr/local/sbin/ufslabels.sh* **before** the upgrade to convert
*/etc/fstab* to UFS labels rather than disk device names.

The NIC device change issue has no workaround. Manual reassignment is
required at this time.

vmxnet3 (VMware/ESX) users
""""""""""""""""""""""""""

Users who manually installed :doc:`VMware Tools </virtualization/installing-vmware-guest-tools>` to use
vmxnet3 may encounter an issue with interface name changes when
upgrading to pfSense 2.2, similar to those with Xen mentioned above. In
pfSense 2.1.x the vmxnet3 interfaces were named starting with "vmx3f"
and on pfSense 2.2.x they are simply "vmx" using the built-in support.
Manually reassigning the interfaces or correcting them in config.xml
followed by a restore is required.

Old/Broken GEOM Mirrors
"""""""""""""""""""""""

If a manual gmirror configuration was performed post-install and not
using the pfSense installer gmirror option before install, there is a
chance that the mirror will not function on pfSense 2.2 because the
manual post-install method did not create a completely proper mirror
setup. If an upgraded mirror does not boot or function on 2.2, use the
following */boot/loader.conf.local* entry to work around the integrity
check that would otherwise fail.

.. code::

  kern.geom.part.check_integrity=0

If one of these configurations is in use, we **strongly** recommend
backing up the configuration and reinstalling using the built-in gmirror
option in the pfSense installer.

CARP Changes
""""""""""""

Due to the new CARP subsystem, the old method of having a virtual
"interface" for CARP VIPs is no longer available. CARP VIPs work more
like IP Aliases, existing directly on the main interface. For most, the
changes we have made to accommodate this new system will be transparent,
but there are some potential issues, such as:

-  With no separate interface available, monitoring a CARP VIP status
   via SNMP is no longer possible.

Solarflare NIC Users
""""""""""""""""""""

Users that have Solarflare 10Gbit/s NICs, , used in combination with may
not want to upgrade to pfSense 2.2-RELEASE as there are driver issues
with that combination that will lead to a kernel panic when more than
one interface is added to a . This is a problem with the FreeBSD driver
and must be fixed upstream.
`#3996 <https://redmine.pfsense.org/issues/3996>`__

If pfSense 2.2 is used despite this warning, please do so in a
non-production test lab environment first to confirm if the problem is
present on a specific combination of hardware.

FTP Proxy
"""""""""

The FTP proxy is not included in pfSense 2.2-RELEASE, due to changes in
and state table handling that made it it more difficult to implement. It
may return in a future release. Use of FTP is strongly discouraged as
credentials are transmitted insecurely in plain text.
`#4210 <https://redmine.pfsense.org/issues/4210>`__

See :doc:`FTP without a Proxy </nat/ftp-without-a-proxy>` for additional
information and workarounds.

Another option is the recently added FTP Client Proxy package which
leverages in FreeBSD to allow clients on local interfaces to reach
remote FTP servers with active FTP.

Wireless NIC Users
""""""""""""""""""

Due to `a bug in
FreeBSD <https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=184626>`__,
traffic counters for outbound traffic (Obytes) are always *zero* on some
wireless interfaces, including .
`#4028 <https://redmine.pfsense.org/issues/4028>`__

LAGG LACP Behavior Change
"""""""""""""""""""""""""

LAGG using LACP in FreeBSD 10.0 and newer defaults to "strict mode"
being enabled, which means the lagg does not come up unless your switch
is speaking LACP. This will cause your LAGG to not function after
upgrade if your switch isn't using active mode LACP.

You can retain the lagg behavior in pfSense 2.1.5 and earlier versions
by adding a new system tunable under System>Advanced, System Tunables
tab for the following::

  net.link.lagg.0.lacp.lacp_strict_mode

With value set to 0. You can configure this in 2.1.5 before upgrading to
2.2, to ensure the same behavior on first boot after the upgrade. It
will result in a harmless cosmetic error in the logs on 2.1.5 since the
value does not exist in that version.

If you have more than one LAGG interface configured, you will need to
enter a tunable for each since that is a per-interface option. So for
lagg1, you would add the following.

.. code::

  net.link.lagg.1.lacp.lacp_strict_mode

Also with the value set to 0.

Intel 10Gbit/s ixgbe/ix users with Unsupported SFP modules
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

The sysctl to allow unsupported SFP modules changed in FreeBSD between
the versions used for pfSense 2.1.x and 2.2.

The old tunable was::

  hw.ixgbe.unsupported_sfp=1

This must be changed to::

  hw.ix.unsupported_sfp=1

Edit the setting in */boot/loader.conf.local* before applying the
firmware update and it will be retained.

Layer 7
"""""""

For layer 7 application identification and filtering we recommend using
:doc:`Snort IDS/IPS </ids-ips/setup-snort-package>` package with OpenAppID detectors and
rules.

Microsoft Load Balancing / Open Mesh Traffic
""""""""""""""""""""""""""""""""""""""""""""

Windows Network Load Balancing and Open Mesh access points can use
multicast MAC address destinations which relies on broken behavior that
was incorrectly allowed by default in earlier versions of FreeBSD and
pfSense. The fact it worked before was technically a bug, acting in
violation of RFC 1812.

.. pull-quote::

   A router MUST not believe any ARP reply that claims that the Link
   Layer address of another host or router is a broadcast or multicast
   address.

The default behavior on pfSense 2.2 is correct, but it may be changed.

Should this behavior be required, it may be allowed by manually adding a
tunable as follows:

-  Navigate to **System > Advanced**, **System Tunables** tab
-  Click |fa-plus|
-  Enter the following values:

   -  **Tunable**: *net.link.ether.inet.allow_multicast*
   -  **Description**: Optional. It would be wise to enter the URL to
      this note or a similar note.
   -  **Value**: *1*

-  Click Save

pfSense 2.3 Upgrade Guide
^^^^^^^^^^^^^^^^^^^^^^^^^

See :doc:`the 2.3 release notes </releases/2-3-new-features-and-changes>` for a
larger list of changes

-  Due to the GUI overhaul, older themes have been removed. All
   previously chosen themes are reset on upgrade to the default
   "pfSense" 2.3 theme.
-  **Status > RRD Graphs** moved to **Status > Monitoring** and has been
   revamped. The same data, and more, is still accessible but with a
   more modern interface.
-  **System > Firmware** is now **System > Update**
-  **System > Packages** is now **System > Package Manager**

Limiters
""""""""

-  On pfSense 2.2 and 2.3, limiters cannot be used on firewall rules
   residing on interfaces where NAT applies. This limits their use to
   LAN-type interfaces only, and not WANs, in most circumstances. This
   has been fixed on pfSense 2.4. `Bug
   #4326 <https://redmine.pfsense.org/issues/4326>`__

-  Limiters cannot be used where pfsync is enabled. `Bug
   #4310 <https://redmine.pfsense.org/issues/4310>`__

NanoBSD
"""""""

1GB NanoBSD images have been removed as they were too small to properly
function and upgrade. If a 1GB NanoBSD image is in use, it cannot be
upgraded. It must be re-imaged on a larger card using the 4GB or 2GB
image.

NanoBSD users may notice a larger than usual slow-down with pages that
deal with updates and packages due to the new *pkg* system used for both
areas. This can affect the Dashboard if the packages widget is active.
The automatic update check is disabled automatically for NanoBSD due to
this issue. To check for updates, visit **System > Update**. This is no
longer the case in 2.3.1.

In general, problems with NanoBSD disk speed can be mitigated by
configuring the system to keep the card Read/Write on a permanent basis
using the option on **Diagnostics > NanoBSD**. The risk in doing so is
minimal, the rw/ro switch was largely an extra safety belt and not
strictly required. Since it only created problems and ultimately didn't
help anything, in 2.3.1 NanoBSD is always kept read-write.

Planning for the Future
^^^^^^^^^^^^^^^^^^^^^^^

NanoBSD will be phased out in a future major version, likely pfSense
2.4. We recommend investigating alternate installation methods now
rather than waiting and being surprised later. In most cases, a full
installation may be used in its place. Activating the option to keep
*/var* and */tmp* in RAM can typically yield the same net benefits for
older/slower CF and SD media. Firewalls with modern SSDs should have no
concerns with writes.

Package System
""""""""""""""

-  Due to the package system overhaul, any custom package repository
   settings are removed so the firewall will pull package information
   directly from pfSense servers.
-  In the majority of cases the upgrade will work fine with packages in
   place, but we highly recommend uninstalling all packages before
   upgrading for safety.
-  Packages require significant conversion for use on 2.3, currently
   only the most popular and supported packages are present on 2.3, so
   be aware that some packages are not available. See :doc:`Package Port List </development/package-port-list>` for a list of packages currently
   available on 2.3.

Removed features that are disabled on upgrade
"""""""""""""""""""""""""""""""""""""""""""""

-  Groups with spaces are no longer permitted. They are not allowed at
   the OS level and were not functioning properly. On upgrade, such
   groups are renamed with an underscore ('_') in place of a space.
-  The "Enable" checkbox for IPsec has been removed. If IPsec was
   disabled, all Phase 1 entries are disabled automatically on upgrade.
-  The Unity plugin for IPsec has been disabled by default, where it was
   previously enabled by default. This is preferable for the vast
   majority of users, however those using mobile IPsec with IKEv1 may
   need to enable it under VPN>IPsec, Advanced tab.
-  The apinger daemon for gateway monitoring has been replaced by
   dpinger. Due to the differences in settings between the two, many
   advanced gateway parameters are reset on upgrade.
-  The PPTP *Server* has been removed, if the PPTP server was in use,
   seek alternate solutions such as IPsec or OpenVPN. Do not continue to
   use PPTP.

   -  The PPTP server settings, firewall rules, and so on have all been
      removed
   -  If the "Redirect" PPTP server type was in use, add manual NAT
      rules for TCP/1723 and GRE to point to the actual server.

-  Layer 7 classification support has been removed and any configuration
   using L7 is automatically removed on upgrade.
-  WEP support has been removed from Wireless interfaces, and if a
   wireless interface was using WEP, the interface is deactivated on
   upgrade.
-  Single DES support has been removed from IPsec, if a Phase 1 or Phase
   2 entry was using DES, it is deactivated on upgrade.

   -  Note: 3DES support is still present, only the older, insecure,
      single DES option was removed.

-  The LiveCD platform has been removed. The ISO is a bootable
   installer, as always, but it cannot run a live system.

   -  For the very few people who were still using LiveCD, if the
      hardware can boot from USB, install to a USB thumb drive and run
      from it instead. If the options to keep /var and /tmp in RAM are
      active, and no packages are installed, the net result should be
      similar but ultimately more functional.

-  Some obsolete password hashes, such as nt-hash, are removed from
   users on upgrade. There was no remaining code on pfSense that
   utilized these hashes, so there should be no loss of functionality.
-  Support for fifolog was removed, and will revert to clog format on
   upgrade.
-  The *net.inet.ip.fastforwarding* tunable is no longer present, and is
   unset on upgrade.
-  Some PHP modules, such as MySQL, were included by default on previous
   versions but are no longer a part of the base system on 2.3. They are
   available as packages that may be installed manually from the shell
   (e.g. *pkg install php56-mysql*)

New features that may require action
""""""""""""""""""""""""""""""""""""

-  The default system password hash has been changed to bcrypt. Current
   passwords will continue to work. Existing users need to reset their
   password to convert to the new, more secure, hash.
   `#4120 <https://redmine.pfsense.org/issues/4120>`__
-  A new option was added to Captive Portal for FreeRADIUS-friendly
   stop/start RADIUS accounting updates that solves problems with user
   session time limits. If stop/start RADIUS accounting is being used
   with FreeRADIUS, the new option should be activated manually.

Upgrading from a 2.3 Snapshot
"""""""""""""""""""""""""""""

- If a firewall was upgraded to 2.3 before Jan 21, some files from
  2.2.x or earlier packages may still be left behind that can prevent
  new packages from installing properly. Run the following command the
  clean up outdated symlinks that are not relevant for 2.3::

     find / -type l -lname '/usr/pbi/*' -delete

Multi-WAN Weighted Load Balancing
"""""""""""""""""""""""""""""""""

There is a quirk in pf handling of weighted load balancing where Load
balancing fails when one gateway has a weight of 1 and another gateway
has a weight >1. Coming from 2.2.x, if this scenario applies, simply
double the assigned weights. For example: WAN1 = 1, WAN2 = 5 on 2.2.x
should be WAN1 = 2, WAN2= 10 on 2.3.

Captive Portal
""""""""""""""

Due to the change in the web server from lighttpd to nginx, in some
cases the portal HTML must be updated to include the zone parameter. On
current 2.3.1 images, the web server process attempts to handle this
automatically, but it is best to include the HTML in the portal page
directly, inside the form tag:

Additional Notes
----------------

Upgrading High Availability Deployments
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When upgrading from pfSense 1.2.3 to 2.0 or later, Check the CARP VIPs
to make sure they are actually on the proper interface. That is, that
the interface chosen for the VIP properly matches the subnet in which
the CARP VIP resides, and that the subnet mask is proper. pfSense 2.0
validates this more strictly than previous releases, and as a
consequence if a CARP VIP was misconfigured on pfSense 1.2.3, it may not
upgrade cleanly.

If upgrading from any previous version of pfSense (1.2.x, 2.0.x, etc) to
pfSense 2.1 in a CARP environment, ensure that the pfsync interface has
a rule to pass the correct traffic for state synchronization to work
properly. pfSense 2.1 removed the automatic pfsync rule, since the
documentation always recommended adding it manually and to add it behind
the scenes with no way to block it could be counter-productive and
potentially insecure. If the documentation was not followed, and a
pfsync or allow all rule was not created on the sync interface, state
synchronization may break after this upgrade. Add an appropriate rule to
the sync interface and it will work again. At a minimum, pass traffic of
the *pfsync* protocol from a source of the synchronization subnet to all
cluster nodes.

Generally the recommended path for upgrading a High Availability cluster
is to first upgrade the secondary node. After it comes back up, disable
CARP on the primary node under **Status > CARP**, and run on the
secondary for a period of time. If the secondary node is running
comfortably as desired, upgrade the primary node and it will switch back
to MASTER status after rebooting for the upgrade.

.. note:: The underlying pfsync protocol that synchronizes states between
   firewalls has changed formats between different FreeBSD versions and
   hence some upgrade scenarios will require dropping all states when
   switching the new version to master status. This is true when upgrading
   to 1.2.3 from any prior release.

NOTE for 2.0 upgrades: Refer to :doc:`Redundant Firewalls Upgrade Guide </highavailability/redundant-firewalls-upgrade-guide>`
for specifics for upgrading to 2.0 with HA/CARP.

Cosmetic Problems Post-Upgrade
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If cosmetic problems occur after performing an upgrade, it's most always
because of stale browser cache of CSS, Javascript, or other files where
the browser does not pull the updated version. Clear the browser cache
to resolve.
