2.2.5 New Features and Changes
==============================

Security/Errata Notices
-----------------------

-  Updated to FreeBSD 10.1-RELEASE-p24

   -  `FreeBSD-SA-15:25.ntp <https://www.freebsd.org/security/advisories/FreeBSD-SA-15:25.ntp.asc>`__
      Multiple vulnerabilities in NTP [REVISED]
   -  `FreeBSD-SA-15:14.bsdpatch <https://www.freebsd.org/security/advisories/FreeBSD-SA-15:14.bsdpatch.asc>`__:
      Due to insufficient sanitization of the input patch stream, it is
      possible for a patch file to cause patch(1) to run commands in
      addition to the desired SCCS or RCS commands.
   -  `FreeBSD-SA-15:16.openssh <https://www.freebsd.org/security/advisories/FreeBSD-SA-15:16.openssh.asc>`__:
      OpenSSH client does not correctly verify DNS SSHFP records when a
      server offers a certificate.
      `CVE-2014-2653 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-2653>`__
      OpenSSH servers which are configured to allow password
      authentication using PAM (default) would allow many password
      attempts.
   -  `FreeBSD-SA-15:18.bsdpatch <https://www.freebsd.org/security/advisories/FreeBSD-SA-15:18.bsdpatch.asc>`__:
      Due to insufficient sanitization of the input patch stream, it is
      possible for a patch file to cause patch(1) to pass certain ed(1)
      scripts to the ed(1) editor, which would run commands.
   -  `FreeBSD-SA-15:20.expat <https://www.freebsd.org/security/advisories/FreeBSD-SA-15:20.expat.asc>`__:
      Multiple integer overflows have been discovered in the
      XML_GetBuffer() function in the expat library.
   -  `FreeBSD-SA-15:21.amd64 <https://www.freebsd.org/security/advisories/FreeBSD-SA-15:21.amd64.asc>`__:
      If the kernel-mode IRET instruction generates an #SS or #NP
      exception, but the exception handler does not properly ensure that
      the right GS register base for kernel is reloaded, the userland GS
      segment may be used in the context of the kernel exception
      handler.
   -  `FreeBSD-SA-15:22.openssh <https://www.freebsd.org/security/advisories/FreeBSD-SA-15:22.openssh.asc>`__:
      A programming error in the privileged monitor process of the
      sshd(8) service may allow the username of an already-authenticated
      user to be overwritten by the unprivileged child process. A
      use-after-free error in the privileged monitor process of the
      sshd(8) service may be deterministically triggered by the actions
      of a compromised unprivileged child process. A use-after-free
      error in the session multiplexing code in the sshd(8) service may
      result in unintended termination of the connection.

-  `pfSense-SA-15_08.webgui <https://www.pfsense.org/security/advisories/pfSense-SA-15_08.webgui.asc>`__:
   Multiple Stored XSS Vulnerabilities in the pfSense® WebGUI

   -  The complete list of affected pages and fields is listed in the
      linked SA.

-  Updated strongSwan to 5.3.3
-  Updated PHP to 5.5.30
-  Updated miniupnpd to 1.9.20150721 to address a potential
   `vulnerability in
   miniupnpd <https://www.kb.cert.org/vuls/id/361684>`__.

User Management/Authentication
------------------------------

-  Added support for GUI auth from RADIUS to obtain group names from the
   RADIUS reply attribute "Class" as a string (local groups must exist,
   similar to LDAP). `#935 <https://redmine.pfsense.org/issues/935>`__
-  Added an LDAP server timeout field to address GUI access issues when
   the LDAP server is down/unreachable.
   `#3383 <https://redmine.pfsense.org/issues/3383>`__
-  Added support for LDAP RFC 2307 style group membership.
   `#4923 <https://redmine.pfsense.org/issues/4923>`__
-  Worked around a chicken-and-egg problem in user syncing which was
   preventing users from using ssh the first time the account was saved.
   `#5152 <https://redmine.pfsense.org/issues/5152>`__
-  Prevent deletion of system users and groups by authenticated,
   authorized users using manually crafted POSTs.
   `#5294 <https://redmine.pfsense.org/issues/5294>`__

OpenVPN
-------

-  Fixed an incorrect netmask being sent to OpenVPN clients with static
   IP addresses set in RADIUS.
   `#5129 <https://redmine.pfsense.org/issues/5129>`__
-  Changed the calculation of the OpenVPN point-to-point server IP
   address obtained from RADIUS to be consistent with CSC/Overrides
   (Server should be one IP address below the Client)

IPsec
-----

-  strongSwan upgraded to 5.3.3. `strongSwan's change
   log <https://wiki.strongswan.org/projects/strongswan/wiki/Changelog53>`__
-  Fixed missing DH group 22-24.
   `#4918 <https://redmine.pfsense.org/issues/4918>`__
-  Fixed handling of IPv4 IPsec Phase 1 endpoints that resolve to an
   IPv6 address. `#4147 <https://redmine.pfsense.org/issues/4147>`__
   (Fixed by strongSwan update to 5.3.3)
-  Brought back "auto" IKE version and fixed problems with its previous
   implementation.
-  Pre-shared keys configured as "any" under VPN>IPsec, Pre-Shared Keys
   tab are added as %any to ipsec.secrets now, as described in the note
   on the page. `#5246 <https://redmine.pfsense.org/issues/5246>`__
-  Resolved memory leak by switching printf hooks to vstr.
   `#5149 <https://redmine.pfsense.org/issues/5149>`__
-  Change to vstr to fix memory leak broke SMP status plugin. Switched
   to vici for status output.
-  ID selectors omitted from ipsec.secrets for mobile PSK+XAuth
   configurations. Fixes pre-shared key mismatches with Apple iOS Cisco
   IPsec and other mobile clients.
   `#5245 <https://redmine.pfsense.org/issues/5245>`__
-  Fixed logging default settings and ability to set logging to silent.
   `#5340 <https://redmine.pfsense.org/issues/5340>`__
-  Logging settings applied correctly on clean start and stop/start of
   service. `#5242 <https://redmine.pfsense.org/issues/5242>`__
-  Remove deleted CAs, certificates and CRLs from strongswan
   configuration. `#5238 <https://redmine.pfsense.org/issues/5238>`__
-  Prevent over-matching of auto-added firewall rules for mobile IPsec
   configurations. `#5211 <https://redmine.pfsense.org/issues/5211>`__
-  Added IPv6 virtual address pool support for mobile.
   `#5284 <https://redmine.pfsense.org/issues/5284>`__
-  Allow both IPv4 and IPv6 in phase 2 entries on a single phase 1 when
   using IKEv2. `#5305 <https://redmine.pfsense.org/issues/5305>`__
-  Omit NAT rules for disabled phase 1 and 2 configurations.
   `#5320 <https://redmine.pfsense.org/issues/5320>`__
-  Only display certificate authority field for methods where it's
   relevant. `#5323 <https://redmine.pfsense.org/issues/5323>`__
-  Only write out CA certificates for those specified in a Phase 1
   configuration. `#5243 <https://redmine.pfsense.org/issues/5243>`__
-  Fixed Hybrid RSA + xauth.
   `#5207 <https://redmine.pfsense.org/issues/5207>`__
-  Fixed configuration of split tunnel attribute.
   `#5327 <https://redmine.pfsense.org/issues/5327>`__
-  Specify rightca in ipsec.conf where relevant.
   `#5241 <https://redmine.pfsense.org/issues/5241>`__
-  Specify leftsendcert=always in ipsec.conf for mobile profiles using
   IKEv2 to better accommodate iOS and OS X manual configurations.
   `#5353 <https://redmine.pfsense.org/issues/5353>`__
-  Fix IKEv2 mobile client pool status display with small number of
   active leases

Rules/NAT
---------

-  Fixed handling of url_port alias types when processing items that
   should be handled by filterdns.
   `#4888 <https://redmine.pfsense.org/issues/4888>`__
-  Fixed handling of line endings when parsing a URL table ports file.
-  Fixed handling of empty bogon lists on NanoBSD.
-  Fixed handling of 6rd rules so they are only added when there is an
   IPv4 IP defined for the gateway, otherwise the ruleset ends up
   invalid. `#4935 <https://redmine.pfsense.org/issues/4935>`__
-  Added support for port ranges on Outbound NAT.
   `#5156 <https://redmine.pfsense.org/issues/5156>`__
-  Added a check to prevent renaming an alias to an existing name.
   `#5162 <https://redmine.pfsense.org/issues/5162>`__
-  Improved the fix for increasing the "self" table size in pf.
-  Imported fixes from FreeBSD for a situation that could result in a
   panic/crash due to source address limits in pf rules ("pf_hashsrc:
   unknown address family 0").
   `#4874 <https://redmine.pfsense.org/issues/4874>`__

Captive Portal
--------------

-  Implemented an alternate method to find VIP targets that should be
   allowed for Captive Portal.
   `#4903 <https://redmine.pfsense.org/issues/4903>`__
-  Improved handling of the captive portal database files for zones in
   cases when the database files may be corrupt or unreadable.
   `#4904 <https://redmine.pfsense.org/issues/4904>`__
-  Improved handling of vouchers that are too short. In certain cases
   they were not being properly rejected.
   `#4985 <https://redmine.pfsense.org/issues/4985>`__
-  Fixed handling of voucher database files, initializing the database
   properly when necessary.
   `#5113 <https://redmine.pfsense.org/issues/5113>`__
-  Fixed loading of allowed hostnames at boot time.
   `#4746 <https://redmine.pfsense.org/issues/4746>`__,
   `#5345 <https://redmine.pfsense.org/issues/5345>`__

Packages
--------

-  Fixed handling of package install errors and connect timeouts during
   the install process.
   `#4884 <https://redmine.pfsense.org/issues/4884>`__
-  Improved package version comparison.
   `#4924 <https://redmine.pfsense.org/issues/4924>`__
-  Fixed an issue with package editing where the default value was not
   being populated for new fields.
-  Fixed removal of syslog.conf entries during package uninstall
   `#5210 <https://redmine.pfsense.org/issues/5210>`__

DHCP
----

-  Fixed handling of DHCP pools that are out of range, preventing them
   from creating an invalid dhcpd configuration.
   `#4878 <https://redmine.pfsense.org/issues/4878>`__
-  Added support for UEFI network booting with arch 00:09.
   `#5046 <https://redmine.pfsense.org/issues/5046>`__
-  Fixed a situation where dhcpleases could miss updates for hostnames
   in the leases file, delaying functional hostname resolution of new
   and updated DHCP leases.
   `#4931 <https://redmine.pfsense.org/issues/4931>`__
-  Automatically add firewall rules to permit DHCP traffic when DHCP
   Relay is enabled, matching the behavior for DHCP Server.
   `#4558 <https://redmine.pfsense.org/issues/4558>`__

Interfaces
----------

-  Fixed identification of IPv6 interfaces with PPP-type interfaces and
   DHCP6 `#3670 <https://redmine.pfsense.org/issues/3670>`__
-  Removed "Could not find gateway for interface..." log messages as
   they were largely useless.
   `#4102 <https://redmine.pfsense.org/issues/4102>`__
-  Added OpenVPN interfaces to the list of available interfaces when
   reassignment is necessary during config.xml restoration.
-  Fixed interface assignment menus running off VGA screen.
-  Fixed preservation of MLPPP settings when saving interface settings.
   `#4568 <https://redmine.pfsense.org/issues/4568>`__
-  Correct handling of SLAAC, DHCP6 and DHCP-PD with PPP interfaces.
   `#5297 <https://redmine.pfsense.org/issues/5297>`__

Dynamic DNS
-----------

-  Fixed Cloudflare support for Dynamic DNS updates.
-  Fixed GratisDNS support for hosts without subdomains.
-  Disabled DHS provider. It had never worked.
-  Fixed IPv4 dynamic DNS registrations on dual stack hosts to providers
   with AAAA records.
   `#3858 <https://redmine.pfsense.org/issues/3858>`__
-  Update Dynamic DNS using gateway groups upon enable and disable of
   gateways. `#5214 <https://redmine.pfsense.org/issues/5214>`__
-  Fixed Dynamic DNS using gateway groups specifying a CARP IP.
   `#4990 <https://redmine.pfsense.org/issues/4990>`__

Misc
----

-  Fixed the configuration version comparison in XMLRPC sync to prevent
   more invalid synchronization cases.
   `#4902 <https://redmine.pfsense.org/issues/4902>`__
-  Cleaned up old unused platforms referenced in a few areas of the code
   that were no longer relevant.
-  Fixed killing of individual states in cases when the source and
   destination were reversed.
   `#4907 <https://redmine.pfsense.org/issues/4907>`__
-  Fixed killing of individual states for IPv6.
   `#4906 <https://redmine.pfsense.org/issues/4906>`__
-  Changed the "enableallowallwan" script to also allow bogons, which
   makes the use of RFC 5735 / RFC 6890 test networks easier in lab
   environments.
-  Fixed handling of VIPs in source address selection for Diagnostics >
   Test Port. `#4986 <https://redmine.pfsense.org/issues/4986>`__
-  Updated status.php to include more information.
   `#5304 <https://redmine.pfsense.org/issues/5304>`__
-  Fixed handling of the description in Traffic Shaping.
-  Fixed pfSense base version comparison.
   `#4925 <https://redmine.pfsense.org/issues/4925>`__
-  Fixed handling of multiple notices in the same second.
   `#4879 <https://redmine.pfsense.org/issues/4879>`__
-  Removed the routed service as it is being handled by the package.
-  Set MIME type for SVG in lighttpd configuration.
-  Improved handling of the cron service reconfiguration process.
-  Added option to display monitor IP on Gateways widget
   `#4782 <https://redmine.pfsense.org/issues/4782>`__
-  Added "Description" as a display option on Traffic Graphs.
   `#4783 <https://redmine.pfsense.org/issues/4783>`__
-  Fixed handling of L2TP server interface selection.
   `#4830 <https://redmine.pfsense.org/issues/4830>`__
-  Added /usr/bin/dc back into the build.
   `#5111 <https://redmine.pfsense.org/issues/5111>`__
-  Fixed a crash/panic "Sleeping thread owns a non-sleepable lock" in
   ARP code when using Proxy ARP type VIPs.
   `#4685 <https://redmine.pfsense.org/issues/4685>`__
-  Added support for Sierra Wireless 7355.
   `#4863 <https://redmine.pfsense.org/issues/4863>`__
-  Updated time zones.
   `#5254 <https://redmine.pfsense.org/issues/5254>`__
-  Added fsync of Unbound's root.key to ensure the file isn't corrupted
   if power is lost shortly after writing of the file. Code added to
   detect corrupt root.key and delete and recreate it.
   `#5334 <https://redmine.pfsense.org/issues/5334>`__
-  Fix changing outbound NAT modes and uploading/downloading files on
   exec.php with non-English languages.
   `#5342 <https://redmine.pfsense.org/issues/5342>`__,
   `#5343 <https://redmine.pfsense.org/issues/5343>`__
-  Associate intermediate internal CA certificates with the signing CA.
   `#5313 <https://redmine.pfsense.org/issues/5313>`__

