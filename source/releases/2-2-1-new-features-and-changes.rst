.. include:: /substitutions.rsti

2.2.1 New Features and Changes
==============================

Security/Errata Notices
-----------------------

-  `pfSense-SA-15\_02.igmp <https://www.pfsense.org/security/advisories/pfSense-SA-15_02.igmp.asc>`__:
   Integer overflow in IGMP protocol
   (`FreeBSD-SA-15:04.igmp <https://www.freebsd.org/security/advisories/FreeBSD-SA-15%3A04.igmp.asc>`__)
-  `pfSense-SA-15\_03.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-15_03.webgui.asc>`__:
   Multiple XSS Vulnerabilities in the pfSense WebGUI
-  `pfSense-SA-15\_04.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-15_04.webgui.asc>`__:
   Arbitrary file deletion vulnerability in the pfSense WebGUI

-  `FreeBSD-EN-15:01.vt <https://www.freebsd.org/security/advisories/FreeBSD-EN-15%3A01.vt.asc>`__:
   vt(4) crash with improper ioctl parameters
-  `FreeBSD-EN-15:02.openssl.asc <https://www.freebsd.org/security/advisories/FreeBSD-EN-15%3A02.openssl.asc>`__:
   Update to include reliability fixes from OpenSSL

Potentially Relevant
~~~~~~~~~~~~~~~~~~~~

The following updates are included from upstream in FreeBSD, but are not
directly relevant. Neither pfSense nor its packages include SCTP
services, but such services may have been manually added by the user.

-  `FreeBSD-SA-15:02.kmem <https://www.freebsd.org/security/advisories/FreeBSD-SA-15%3A02.kmem.asc>`__:
   SCTP SCTP\_SS\_VALUE kernel memory corruption and disclosure
-  `FreeBSD-SA-15:03.sctp <https://www.freebsd.org/security/advisories/FreeBSD-SA-15%3A03.sctp.asc>`__:
   SCTP stream reset vulnerability

Not Relevant
~~~~~~~~~~~~

-  OpenSSL "FREAK" vulnerability:

   -  Does not affect the web server configuration on the firewall as it
      does not have export ciphers enabled.
   -  pfSense 2.2 already included OpenSSL 1.0.1k which addressed the
      client-side vulnerability.
   -  If packages include a web server or similar component, such as a
      proxy, an improper user configuration may be affected. Consult the
      package documentation or forum for details.

Known Issues
------------

-  Some cases remain where filterdns does not properly handle hostnames
   in multiple aliases properly. Most of the cases have been fixed, so
   the situation is better than 2.2-RELEASE, but it is not 100%
   resolved. See issue
   `#4296 <https://redmine.pfsense.org/issues/4296>`__ for details.
   Placing hostname aliases into a separate alias so they are not mixed
   with static entries effectively works around the issue.

General
-------

-  Updated the default SSL cipher list to be stronger, obsoletes the
   need for a "BEAST protection" option
   `#4230 <https://redmine.pfsense.org/issues/4230>`__
-  Fixed gen\_subnet\_max returning an incorrect result on 32 bit (i386)
   versions, which in turn fixed Wake on LAN and other areas on 32 bit
   (i386) versions. `#4318 <https://redmine.pfsense.org/issues/4318>`__
-  Fixed crash on boot with some hardware, caused by gpioapu on systems
   where smbios.system.product is null. Mostly seemed to be the recycled
   Watchguard users affected by this issue.
   `#4363 <https://redmine.pfsense.org/issues/4363>`__
-  Updated ufslabels.sh to handle a wider variety of disk layouts.
-  Added a choice of SMTP authentication protocols for notifications,
   Office365 mail support.
   `#4176 <https://redmine.pfsense.org/issues/4176>`__
-  Removed latin-1 encoding of RSS feed to fix display issues of RSS
   items.
-  Fixed an issue where the GUI setting for PAP or CHAP in L2TP Server
   was not being respected.
-  Fixed changing source tracking value separate from changing the
   Sticky option.
-  Added input validation to force a minimum *100000* byte log file size
   to prevent undersizing the logs.
-  Added more cleanup to the **Restart PHP-FPM** console menu action.
-  Removed PTR records for aliases in host overrides.
-  Fixed *diag\_arp.php* to allow underscore in resolved host names.
-  Fixed an issue in DHCP settings where the "add routers" value was not
   being preserved across a loop for each interface.
-  Added capability to handle reverse lookup domain overrides.
-  Fixed issues with NTP RRD graph state changes.
-  Added input validation to require RADIUS protocol and server IP
   address/host in Captive Portal when RADIUS authentication is
   selected. `#4384 <https://redmine.pfsense.org/issues/4384>`__
-  Fixed swap size calculation in the installer to avoid creating
   improperly sized partitions in systems with lots of RAM but not much
   disk space.
-  Fixed test for comconsole when matching for enabling serial console.
   `#4464 <https://redmine.pfsense.org/issues/4464>`__
-  Updated pfSense PHP shell help to current configuration structure.
   `#4492 <https://redmine.pfsense.org/issues/4492>`__
-  Fixed switching from a PPP type WAN to "None" or "DHCP".
-  Disables SNMP hostres module on APU boards until we figure out why
   it's crashing on this specific board.
   `#4403 <https://redmine.pfsense.org/issues/4403>`__
-  Removed -U from mtree call used to restore files permissions as it
   was breaking symlinks on upgrade.
   `#4328 <https://redmine.pfsense.org/issues/4328>`__
-  Added input validation for Wireless configurations to prevent
   problematic combinations of settings.
   `#4178 <https://redmine.pfsense.org/issues/4178>`__
-  Improved handling of FQDN entries in aliases with filterdns, but not
   100% resolved. `#4296 <https://redmine.pfsense.org/issues/4296>`__
-  Fixed various typo, style, and formatting issues.

Rules / NAT
-----------

-  Fixed ordering of DHCPv6 client and bogon rules so the bogon rules
   can't block DHCPv6 requests.
   `#3395 <https://redmine.pfsense.org/issues/3395>`__
-  Fixed a bug where applying NAT changes in Hyper-V could break the
   running NAT configuration.
   `#4445 <https://redmine.pfsense.org/issues/4445>`__
-  Fixed a bug where marking a packet with only a number resulted in a
   broken rule. `#4274 <https://redmine.pfsense.org/issues/4274>`__
-  Fixed DSCP choices that were non-functional and resulted in a broken
   ruleset. `#4302 <https://redmine.pfsense.org/issues/4302>`__
-  Fixed PHP memory exhaustion on NAT pages with VIP ranges on a 32 bit
   (i386) versions. `#4317 <https://redmine.pfsense.org/issues/4317>`__
   (Related to `#4318 <https://redmine.pfsense.org/issues/4318>`__)
-  Fixed input validation on Outbound NAT to accept a port range.
   `#4300 <https://redmine.pfsense.org/issues/4300>`__
-  Removed Carrier-Grade NAT subnet from "Block private networks" as it
   was in 2.0.x and earlier releases since it specifically notes RFC
   1918 and CGN is more closely related to bogon networks.
   `#4379 <https://redmine.pfsense.org/issues/4379>`__
-  Removed code that set adaptive.start and end to 0, now they are left
   at their defaults (60% and 120% of the state limit, respectively) if
   not user-overridden.
-  Added configuration options for state timeout values under
   System>Advanced, Firewall/NAT.
   `#4509 <https://redmine.pfsense.org/issues/4509>`__

IPsec
-----

-  Added MOBIKE control, now disabled by default.
   `#3979 <https://redmine.pfsense.org/issues/3979>`__
-  Fixed page rendering so MOBIKE is only shown with IKEv2 selected,
   NAT-T only shown with IKEv1 selected.
-  Removed *Prefer older IPsec SAs* option from the GUI, and existing
   configurations with it enabled will not have that setting applied.
   This is almost never desirable, and with the change to strongSwan it
   frequently was the source of problems. The very few who might desire
   such an option can configure the *net.key.preferred\_oldsa* sysctl
   accordingly under **System > Advanced**, **System Tunables**.
-  Fixed Phase 2 duplication issue.
   `#4349 <https://redmine.pfsense.org/issues/4349>`__
-  Added input validation to prevent use of AES key lengths larger than
   128-bit when the *glxsb* cryptographic accelerator is enabled.
   `#4361 <https://redmine.pfsense.org/issues/4361>`__
-  Added an option for an IPsec tunnel to act as a responder only.
   `#4360 <https://redmine.pfsense.org/issues/4360>`__
-  Added a filter reload when IPsec is disabled.
   `#4245 <https://redmine.pfsense.org/issues/4245>`__
-  Fixed RSA cert handling in IPsec to use double quotes on asn1dn
   specification so it is properly interpreted by strongSwan.
   `#4275 <https://redmine.pfsense.org/issues/4275>`__
-  Added an option to allow controlling unique ID handling in IPsec
   advanced settings.
   `#4359 <https://redmine.pfsense.org/issues/4359>`__
-  Fixed *restartipsec* command line script.
-  Fixed handling of IPsec with Gateway Groups
   `#4482 <https://redmine.pfsense.org/issues/4482>`__
-  Added a workaround to disable the strongSwan Unity plugin.
   `#4178 <https://redmine.pfsense.org/issues/4178>`__
-  Added error logging when an IPsec Phase 1 cannot be located.

OpenVPN
-------

-  Added encoding for username and password to avoid issues with special
   characters. `#4340 <https://redmine.pfsense.org/issues/4340>`__
-  Fixed issues with OpenVPN TLS and authentication scripts.
   `#4329 <https://redmine.pfsense.org/issues/4329>`__
-  Fixed issues with handling of the Authentication Mode if the user
   changes the value after changing other incompatible settings.

DNS Resolver
------------

-  Upgraded to Unbound 1.5.3.
-  Added correct scaling of *rrset-cache-size* in *unbound.conf*.
   `#4367 <https://redmine.pfsense.org/issues/4367>`__
-  Added support for 0x20 DNS random bit.
   `#4205 <https://redmine.pfsense.org/issues/4205>`__
-  Changed DNS Resolver default values to be a bit more strict: Enable
   Hide Identity, Hide Version, Harden DNSSEC data.
-  Force harden glue configuration option, and remove GUI control of
   that option. Problem with Unbound pre-1.5.2 means in 2.2-RELEASE,
   having this option enabled, and DNSSEC disabled, could lead to DNS
   cache poisoning. `#4402 <https://redmine.pfsense.org/issues/4402>`__
-  Added a check to test if Unbound is enabled and using the same port
   before allowing dnsmasq to be enabled.
   `#4332 <https://redmine.pfsense.org/issues/4332>`__
-  Removed hard-coded value for *harden-referral-path*. It defaults to
   *no*, so no behavior change, and that setting is unlikely to ever
   become a default. This allows users to configure an override to
   enable this option if desired.
   `#4399 <https://redmine.pfsense.org/issues/4399>`__

Logging
-------

-  Fixed GUI log parser handling for IGMP log entries.
   `#4343 <https://redmine.pfsense.org/issues/4343>`__
-  Fixed syslogd issues where the daemon stopped and failed to restart
   during boot in some cases.
   `#4393 <https://redmine.pfsense.org/issues/4393>`__

Traffic Shaping
---------------

-  Fixed input validation errors in the Traffic Shaper wizard due to old
   data not being cleared.
   `#4333 <https://redmine.pfsense.org/issues/4333>`__
-  Fixed handling of Upstream SIP Server in the Traffic Shaper wizard.
   `#4314 <https://redmine.pfsense.org/issues/4314>`__,
   `#4427 <https://redmine.pfsense.org/issues/4427>`__
-  Fixed crash when using limiters and pfsync.
   `#4310 <https://redmine.pfsense.org/issues/4310>`__
-  Fixed limiters used with IPv6.
   `#2526 <https://redmine.pfsense.org/issues/2526>`__

IPv6
----

-  Fixed calculation of the 6rd default gateway honoring netmasks other
   than /32.
-  Fixed recording of the IPv6 interface's new IP address and do not
   issue commands that cannot succeed.
   `#3669 <https://redmine.pfsense.org/issues/3669>`__
-  Fixed not being able to save custom and custom-v6 DynDNS entries.
-  Added IPv6 IP addresses to */etc/hosts* in the same manner IPv4 IP
   addresses are added.
   `#4395 <https://redmine.pfsense.org/issues/4395>`__
-  Fix computation of the displayed DHCPv6 range start to be consistent
   with the actual check.
-  Added *dhcp6.name-servers* option with DHCPD-PD regardless of PD
   length.
-  Fixed Net\_IPv6::compress() to properly handle all-zeros address.
-  Enabled *UnicastOnly* in radvd for *ovpn\** interfaces.
   `#4455 <https://redmine.pfsense.org/issues/4455>`__
-  Removed requesting a prefix delegation when there are no tracking
   interfaces setup to use it.
   `#4436 <https://redmine.pfsense.org/issues/4436>`__
-  Added code to destroy stf interface when a 6rd or 6to4 tunnel is
   disabled. `#4471 <https://redmine.pfsense.org/issues/4471>`__

VIP/CARP
--------

-  Added input validation to prevent the VIP "interfaces" from being
   assigned since they are just an identification of the VIP for
   tracking and not actual interfaces.
   `#4389 <https://redmine.pfsense.org/issues/4389>`__
-  Fixed functions to properly return the VIP subnet now that the CARP
   might not match its parent interface subnet.
   `#4390 <https://redmine.pfsense.org/issues/4390>`__
-  Fixed a bug that caused the status icon from previous CARP VIP to be
   shown in cases where the IP address was not present on an interface.
-  Changed the carp demotion factors slightly to avoid CARP transitions
   that are most likely unnecessary. (Do not demote on NIC send errors
   or pfsync errors)
-  Expanded the CARP demotion error
-  Added button to reset demotion status
-  Fixed handling of IP Alias deletion from a secondary node using
   XMLRPC configuration sync
   `#4446 <https://redmine.pfsense.org/issues/4446>`__

Misc Binary/OS Changes
----------------------

-  Upgraded PHP to 5.5.22.
-  Re-enabled Suhosin in PHP.
-  Updated 802.11 code and Atheros wireless driver from FreeBSD
   11-CURRENT
-  Added patch to fix crash with Ralink wireless cards in access point
   mode. `#4117 <https://redmine.pfsense.org/issues/4117>`__
-  Added athstats, cryptostats and cryptodev back.
   `#4239 <https://redmine.pfsense.org/issues/4239>`__
-  Fixed AESNI module checks when used inside a virtual machine.

