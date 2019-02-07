2.4 New Features and Changes
============================

Operating System / Architecture changes
---------------------------------------

-  Upgrade of base OS to FreeBSD **11.1-RELEASE-p1**
-  Added support for Netgate ARM-based systems such as the SG-1000
-  **32-bit support has been deprecated and removed** -- There are no
   images available for 32-bit (x86/i386) Intel architecture systems
-  **NanoBSD has been deprecated and removed** -- There are no images
   available for NanoBSD, use a full install instead

   -  For 64-bit systems running NanoBSD, see :doc:`Upgrading 64-bit NanoBSD 2.3 to 2.4 </install/upgrading-64-bit-nanobsd-2-3-to-2-4>` for
      information on how to upgrade in-place from NanoBSD to a full
      installation

-  Started using the FreeBSD installer instead of the old style
   installer (installation procedures have all changed)

   -  The installer now supports UEFI
      `#4044 <https://redmine.pfsense.org/issues/4044>`__
   -  If the new installer image will not boot on a specific piece of
      hardware, see :doc:`/hardware/boot-troubleshooting`
   -  The installer now supports ZFS
   -  Added support to the new installer to copy an existing config.xml
      off an MS DOS formatted USB drive (formerly known as "PFI")
      `#7689 <https://redmine.pfsense.org/issues/7689>`__
   -  Added support to the new installer to optionally recover
      config.xml off an existing installation drive (works with UFS and
      ZFS) `#7708 <https://redmine.pfsense.org/issues/7708>`__

-  Fixed issues with major version base upgrades via pkg
-  Changed cryptodev to load as a kernel module
   `#5976 <https://redmine.pfsense.org/issues/5976>`__

Security / Errata
-----------------

-  Converted various parts of the GUI to use POST instead of GET when
   performing actions that change the firewall state (e.g. delete or
   enable/disable an item) to avoid potential issues with cross-site
   request forgery and unintentional repeating of actions
   `#4083 <https://redmine.pfsense.org/issues/4083>`__
-  FreeBSD 11.1 includes MAP_GUARD protection to protect against
   attacks such as Stack Clash
-  `pfSense-SA-17_07.packages <https://www.pfsense.org/security/advisories/pfSense-SA-17_07.packages.asc>`__
-  A number of base system packages have been updated to address
   security issues, including `dnsmasq,
   perl <https://www.netgate.com/blog/no-plan-survives-contact-with-the-internet.html>`__,
   cURL, and others.

Firmware Branch Behavior / Upgrading From Snapshots
---------------------------------------------------

-  To control how a firewall obtains updates, visit **System > Update**,
   **Update Settings** tab:
-  For users currently running 2.3.x-RELEASE:

   -  *Stable*, which is the default behavior, will upgrade the firewall
      to 2.4-RELEASE when it is complete, but will not upgrade to 2.4-RC
   -  *Development Snapshots* will upgrade the firewall to 2.3.5
      development snapshots
   -  *Next major version* will upgrade the firewall to 2.4-RC

-  For users tracking pfSense 2.4 snapshots:

   -  *Stable*, which is the default behavior, will upgrade the firewall
      to 2.4-RC and eventually 2.4-RELEASE
   -  *Development Snapshots* will cause the firewall to continue
      tracking snapshots, bypassing 2.4-RELEASE and continuing on to
      2.4.1 development images

Known Issues
------------

-  Some systems may not be able to boot 2.4 installation images, for
   example, due to UEFI compatibility changes. These are primarily BIOS
   issues and not issues with the installer images. Upgrading from 2.3.x
   should still work on affected hardware.
-  Users with ESXi or VMware Workstation may experience a `boot-time
   crash during hardware
   detection <https://redmine.pfsense.org/issues/7925>`__, due to `a
   race condition in the FreeBSD VT console
   code <https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=217282>`__.
   This crash is infrequent and does not affect most users or most boot
   attempts, but since it is a race condition it can manifest randomly.
   To avoid the crash, configure the VM to use the ``syscons`` console
   rather than ``vt`` by editing ``/boot/loader.conf.local`` and adding this
   line::

     kern.vty=sc

Cleanup
-------

-  Misc code cleanup, removal of patches that were no longer necessary
   or were inefficient
-  Replaced multiple local copies of PHP PEAR libraries with updated
   copies using their official sources
   `#3734 <https://redmine.pfsense.org/issues/3734>`__

   -  Notably, local static copies were replaced by their FreeBSD ports
      counterparts: pear, pear-XML_RPC2, pear-Net_IPv6,
      pear-Crypt_CHAP, pear-Mail, pear-Net_Growl
   -  Code that relied on the old files was updated to use the current
      or replaced versions

-  Removed all references to GLXSB (it was 32-bit only)
   `#6755 <https://redmine.pfsense.org/issues/6755>`__
-  Removed all code in the builder and pfSense for handling the NanoBSD
   platform
-  Removed all calls to conf_mount_rw / conf_mount_ro, since they
   were only required for NanoBSD
-  Improved help text in various parts of the GUI

Wireless
--------

-  FreeBSD 11 contains an updated 802.11 stack with `numerous
   improvements <https://svnweb.freebsd.org/base?view=revision&revision=287197>`__
-  Wireless interfaces **must** be created on the **Wireless** tab under
   **Interfaces > Assignments** before they can be assigned!
   `#6770 <https://redmine.pfsense.org/issues/6770>`__

Firewall / Rules / NAT / Aliases
--------------------------------

-  Fixed issues with synproxy rules on a WAN/LAN style bridge
   `#6769 <https://redmine.pfsense.org/issues/6769>`__
-  Fixed issues with limiters on rules that utilize NAT
   `#4326 <https://redmine.pfsense.org/issues/4326>`__
-  Fixed issues with limiters used in conjunction with a transparent
   proxy or other local redirect rule
   `#7050 <https://redmine.pfsense.org/issues/7050>`__
-  Fixed expansion of "Other" type VIP subnet entries in NAT destination
   drop-down selections
   `#6094 <https://redmine.pfsense.org/issues/6094>`__
-  Fixed NAT rules so that when a port forward is disabled, its
   associated firewall rule is also disabled
   `#6472 <https://redmine.pfsense.org/issues/6472>`__
-  Fixed handling of "URL Table (IPs)" and "URL (IPs)" when the file is
   hosted a server using HTTPS with a self-signed certificate
   `#4766 <https://redmine.pfsense.org/issues/4766>`__
-  Show firewall rule descriptions in a column when viewing the log on
   new installs, upgrades retain their existing setting
   `#7323 <https://redmine.pfsense.org/issues/7323>`__
-  Fixed firewall states showing a negative value for total bytes
   processed `#7075 <https://redmine.pfsense.org/issues/7075>`__
-  Fixed handling of Port Forwards so they do not make up new
   destination information when a configured against a DHCP interface
   that does not currently have an address
-  Fixed VLAN Priority pf syntax
   `#7744 <https://redmine.pfsense.org/issues/7744>`__
-  Fixed a problem where pf scrub did not properly re-fragment unusual
   but valid IPv6 fragments, resulting in overlapping fragments
   `#7485 <https://redmine.pfsense.org/issues/7485>`__
-  Fixed confirmation prompt handling when deleting a firewall state
   from diag_dump_states.php
   `#7827 <https://redmine.pfsense.org/issues/7827>`__
-  Changed display of 1:1 NAT rules to match other firewall pages
   `#7728 <https://redmine.pfsense.org/issues/7728>`__

Traffic Shaping
---------------

-  Added extra warnings to traffic shaping pages when the firewall has
   no interfaces capable of using ALTQ shaping
   `#7032 <https://redmine.pfsense.org/issues/7032>`__
-  Fixed handling removal of shaping rules when deleting an interface
   `#7231 <https://redmine.pfsense.org/issues/7231>`__
-  Added upgrade code to work around broken shaper rules from older
   wizard code `#7434 <https://redmine.pfsense.org/issues/7434>`__
-  Fixed the Traffic Shaper so it shows interface names for disabled
   interfaces, rather than an 'empty' placeholder.
-  Fixed handling of the priority field for different ALTQ shaper types

OpenVPN
-------

-  Upgraded OpenVPN to 2.4.x.
   `#7054 <https://redmine.pfsense.org/issues/7054>`__

   -  This is a significant upgrade which includes support for a wide
      variety of new features, including AEAD ciphers such as AES-GCM.
   -  AES-GCM can be accelerated by AES-NI, and is supported in SSL/TLS
      modes (not shared key)
      `#7068 <https://redmine.pfsense.org/issues/7068>`__
   -  Added support for TLS Encryption as an optional TLS Key usage
      type. This encrypts the control channel, providing privacy and
      protocol obfuscation
      `#7071 <https://redmine.pfsense.org/issues/7071>`__
   -  Added ECDH options to OpenVPN server and client options ("ECDH
      Only" choice for DH, ECDH Curve selection)
      `#7063 <https://redmine.pfsense.org/issues/7063>`__
   -  Restructured the compression options to include LZ4 support and
      the new "compress" directive which replaces "comp-lzo" which has
      been deprecated. The old options remain for now, but are labeled
      "Legacy" `#7064 <https://redmine.pfsense.org/issues/7064>`__
   -  Changed protocol selection for OpenVPN clients and servers because
      OpenVPN 2.4 treats "udp" and "tcp" as dual stack now
      `#7062 <https://redmine.pfsense.org/issues/7062>`__

      -  Added "multihome" option in relevant protocol cases so OpenVPN
         will reply back using the address used to receive a packet
         `#7062 <https://redmine.pfsense.org/issues/7062>`__

   -  Changed the DNS Server fields in the OpenVPN server options so
      they can define either IPv4 or IPv6 DNS servers to push to clients
      `#7061 <https://redmine.pfsense.org/issues/7061>`__
   -  Added IPv6 support to status_openvpn.php and the OpenVPN widget
      `#2766 <https://redmine.pfsense.org/issues/2766>`__
   -  Removed uses of the deprecated "tun-ipv6" OpenVPN directive,
      OpenVPN now always assumes IPv6 is enabled
      `#7054 <https://redmine.pfsense.org/issues/7054>`__
   -  Replaced uses of the deprecated "client-cert-not-required"
      directive with its functional replacement "verify-client-cert
      none" `#7073 <https://redmine.pfsense.org/issues/7073>`__
   -  Added support for Negotiable Crypto Parameters (NCP) to control
      automatic cipher selection between clients and servers
      `#7072 <https://redmine.pfsense.org/issues/7072>`__
   -  NOTE: OpenVPN 2.4 handles CRL verification differently than
      previous versions, passing through validation to the library
      rather than handling it internally. This can cause some
      certificates to fail validation that may have passed previously.
      In particular, if a certificate is removed from a CRL, it may
      still fail validation until all copies of the CRL have been
      rewritten.

-  Improved the help text on OpenVPN Client-Specific Overrides
   `#7053 <https://redmine.pfsense.org/issues/7053>`__
-  Fixed issues with OpenVPN clients on dynamic or tunneled IPv6
   interfaces (e.g. GIF)
   `#6663 <https://redmine.pfsense.org/issues/6663>`__
-  Added locking to prevent issues with OpenVPN instance startup
   `#6132 <https://redmine.pfsense.org/issues/6132>`__
-  Check OpenVPN server/client option visibility changes per mode
   `#7331 <https://redmine.pfsense.org/issues/7331>`__
   `#7451 <https://redmine.pfsense.org/issues/7451>`__
-  Added an OpenVPN GUI option for "fast-io" to clients and servers
   `#7507 <https://redmine.pfsense.org/issues/7507>`__
-  Added an OpenVPN GUI Option for "sndbuf" and "rcvbuf", using the same
   value for both `#7507 <https://redmine.pfsense.org/issues/7507>`__
-  Removed references to the defunct OpenVPN client manager port
   `#7568 <https://redmine.pfsense.org/issues/7568>`__
-  Removed references to unused "Address Pool" setting in OpenVPN
   `#7567 <https://redmine.pfsense.org/issues/7567>`__
-  Fixed OpenVPN server port validation to disallow "0", while still
   allowing it for a client port, which is the same meaning as
   blank/empty `#7565 <https://redmine.pfsense.org/issues/7565>`__
-  Fixed OpenVPN help text for route_no_exec
   `#7575 <https://redmine.pfsense.org/issues/7575>`__
-  Fixed description of the address assignment behavior for Tunnel
   Network fields in OpenVPN clients and servers
   `#7573 <https://redmine.pfsense.org/issues/7573>`__
-  Remove the GUI option for "resolv-retry infinite" from OpenVPN, it is
   always enabled `#7572 <https://redmine.pfsense.org/issues/7572>`__
-  Fixed the OpenVPN wizard so it better handles a user choosing a
   different type of authentication server than a previous run of the
   wizard `#7569 <https://redmine.pfsense.org/issues/7569>`__
-  Fixed OpenVPN Auth Digest Algorithm selection so it does not use
   duplicate/alias names in the list, and added upgrade code to fix
   existing entries on upgrade so they use the actual digest name and
   not an alias `#7685 <https://redmine.pfsense.org/issues/7685>`__
-  Fixed show/hide behavior of fields on vpn_openvpn_client.php in
   chrome `#7451 <https://redmine.pfsense.org/issues/7451>`__
-  Changed OpenVPN wizard certificate input validation and encoding so
   it matches the standards of the current certificate manager
   `#7854 <https://redmine.pfsense.org/issues/7854>`__
-  Fixed the OpenVPN wizard so it creates an OpenVPN server instance
   using current proper defaults
   `#7864 <https://redmine.pfsense.org/issues/7864>`__

IPsec
-----

-  Upgraded strongSwan to version 5.6.0
-  Changed the default strongSwan logging levels such that IKE SA, IKE
   Child SA, and Configuration Backend all default to "Diag"
   `#7007 <https://redmine.pfsense.org/issues/7007>`__
-  Added an option to set the Rekey Margin for IPsec tunnels in the
   Phase 1 settings
-  Added RADIUS accounting support for mobile IPsec when accounting is
   enabled on the Authentication Server entry
-  Added checks to prevent simultaneous/repeated calling of
   vpn_ipsec_configure() by /etc/rc.newipsecdns
-  Added DH Groups 22, 23, 24 to IPsec Phase 2 selection for
   compatibility, but they should not normally be used for security
   reasons `#6967 <https://redmine.pfsense.org/issues/6967>`__

Certificate Management
----------------------

-  Added a check to ensure that the public key of the Certificate
   matches its private key when importing Certificate Authority and
   Certificate entries to prevent mismatching keys from being imported
   `#6953 <https://redmine.pfsense.org/issues/6953>`__
-  Fixed error handling when creating a Certificate from the User
   Management section, failed actions will no longer fail silently
   `#6953 <https://redmine.pfsense.org/issues/6953>`__
-  Fixed handling of Certificates generated from an imported CA when no
   starting serial number was set
   `#6952 <https://redmine.pfsense.org/issues/6952>`__
-  Fixed handling of Certificate Authority deletion so that it does not
   remove associated certificates
   `#6947 <https://redmine.pfsense.org/issues/6947>`__
-  Added "in-use" testing for Certificate Authority entries and disabled
   the delete action for CAs which are actively in use
   `#6947 <https://redmine.pfsense.org/issues/6947>`__
-  Fixed choosing an existing user certificate when adding a certificate
   to an existing user
   `#7297 <https://redmine.pfsense.org/issues/7297>`__
-  Added the ability for the certificate manager to sign a CSR using an
   internal CA `#7383 <https://redmine.pfsense.org/issues/7383>`__
-  Added the ability to set the certificate type and SAN attributes in a
   Certificate Signing Request
   `#7527 <https://redmine.pfsense.org/issues/7527>`__
-  Restructured how certificate types and SANs are handled in the cert
   manager when making a Cert/CSR/Signing, so each section can properly
   use the controls `#7527 <https://redmine.pfsense.org/issues/7527>`__
   `#7677 <https://redmine.pfsense.org/issues/7677>`__

   -  It is now possible to add SANs and EKUs to certificates when
      signing using the certificate manager
   -  NOTE: Attributes such as SANs and KU/EKU cannot be copied from a
      CSR when signing due to a deficiency in OpenSSL's x509 functions
      (they do not support "copy_extensions" at this time); These
      attributes must be specified manually when signing

-  Fixed "server" certificate detection to key off of the EKU For "TLS
   Web Server Authentication" since nsCertType has been deprecated
-  Added SAN, KU, and EKU information in an info block for each entry in
   the the certificate list
   `#7505 <https://redmine.pfsense.org/issues/7505>`__
-  Added the ability to use a wider range of characters in certificate
   fields as laid out by RFC 4514
   `#7540 <https://redmine.pfsense.org/issues/7540>`__
-  Added a useful error message when there is no private CA with which
   to create a new user certificate from within the user manager
   `#7585 <https://redmine.pfsense.org/issues/7585>`__
-  Fixed the User Manager so it adds the username as the first SAN when
   making a user certificate at the same time a user is created
   `#7666 <https://redmine.pfsense.org/issues/7666>`__
-  Added another possible Certificate Signing Request Armor string when
   validating on import
   `#7383 <https://redmine.pfsense.org/issues/7383>`__

Dynamic DNS
-----------

-  Fixed response parsing for DNSimple Dynamic DNS
   `#6874 <https://redmine.pfsense.org/issues/6874>`__
-  Fixed handling of password in Dynamic DNS entries to allow special
   characters `#6688 <https://redmine.pfsense.org/issues/6688>`__
-  Changed CloudFlare and GratisDNS to use separate hostname and domain
   entry to handle TLDs with multiple components
   `#6778 <https://redmine.pfsense.org/issues/6778>`__
-  Fixed the Save and Force Update button for RFC2136 Dynamic DNS
   `#7291 <https://redmine.pfsense.org/issues/7291>`__
-  Fixed RFC2136 Dynamnic DNS updates at boot time
   `#7295 <https://redmine.pfsense.org/issues/7295>`__
-  Added the 'local' directive to RFC2136 Dynamic DNS so updates are
   sourced correctly `#7446 <https://redmine.pfsense.org/issues/7446>`__
-  Fixed options text and display for IPv4 DNS and Verify SSL on Dynamic
   DNS clients `#7588 <https://redmine.pfsense.org/issues/7588>`__
-  Fixed issues with Dynamic DNS entries utilizing gateway groups for
   their interface `#7719 <https://redmine.pfsense.org/issues/7719>`__
-  Added DreamHost Dynamic DNS support
   `#7321 <https://redmine.pfsense.org/issues/7321>`__

DHCP Server / Relay
-------------------

-  Fixed handling of DHCPv6 lease status when there are no leases
   `#6717 <https://redmine.pfsense.org/issues/6717>`__
-  Fixed issues with DHCP Relay not working
   `#6658 <https://redmine.pfsense.org/issues/6658>`__
-  Added input validation to prevent the DHCP server from being
   configured on interfaces that do not have enough addresses for
   clients (/31, /32)
   `#6930 <https://redmine.pfsense.org/issues/6930>`__
-  Fixed issues with the DHCP Relay options display getting out of sync
   with checkbox settings
   `#7155 <https://redmine.pfsense.org/issues/7155>`__
-  Fixed static DHCP lease edits updating BIND zones
   `#3710 <https://redmine.pfsense.org/issues/3710>`__
-  Fixed checks for DHCP Relay when editing additional DHCP pools
-  Fixed handling of forced Dynamic DNS hostnames for DHCPv6 static
   mappings `#7324 <https://redmine.pfsense.org/issues/7324>`__

ARP / NDP
---------

-  Fixed static ARP handling when creating or editing DHCP static
   mappings `#6821 <https://redmine.pfsense.org/issues/6821>`__
-  Added error checking for static ARP entries to ensure both an IP
   address and MAC address are entered, and to ensure that both exist
   before an entry is applied
   `#6969 <https://redmine.pfsense.org/issues/6969>`__
-  Improved the detail displayed on the ARP table view
   `#6822 <https://redmine.pfsense.org/issues/6822>`__
-  Added an expiration field to the NDP list

Captive Portal
--------------

-  Adapted Captive Portal to work without multi-instance ipfw patches
   `#6606 <https://redmine.pfsense.org/issues/6606>`__
-  Fixed Captive Portal instances to select "No Authentication" for a
   zone by default, since it is the default behavior
   `#7591 <https://redmine.pfsense.org/issues/7591>`__
-  Fixed links to the Captive Portal MAC management page so they include
   the zone name `#7591 <https://redmine.pfsense.org/issues/7591>`__

XMLRPC
------

-  Switched to pear-XML_RPC2 and removed the outdated static client
   files
-  Fixed handling of XMLRPC sync using a username other than "admin"
   `#809 <https://redmine.pfsense.org/issues/809>`__

Routing/Gateways
----------------

-  Removed "route change" patches and updated code that relied on the
   deprecated behavior
   `#6828 <https://redmine.pfsense.org/issues/6828>`__
-  Fixed handling of default routes when a default gateway is removed or
   disabled `#6659 <https://redmine.pfsense.org/issues/6659>`__
-  Fixed discovery of IPv6 gateway for assigned OpenVPN interfaces
   `#6016 <https://redmine.pfsense.org/issues/6016>`__
-  Fixed issues with a missing default gateway/route on certain PPPoE
   links after reconnect or IP address change
   `#6495 <https://redmine.pfsense.org/issues/6495>`__
-  Fixed some 'route: writing to routing socket: Invalid argument'
   warnings during boot time
-  Added a log message for gateway events that shows that an alarm was
   raised/cleared
-  Added a check to not run dpinger when an IPv6 address has the
   tentative flag even after the timeout
-  Added a delay to allow dpinger time to properly initialize before
   using results

Interfaces / Virtual IP Addresses
---------------------------------

-  Removed Device Polling as it was no longer useful
   `#7021 <https://redmine.pfsense.org/issues/7021>`__
-  Improved stability of the igb(4) driver
   `#7149 <https://redmine.pfsense.org/issues/7149>`__
   `#7166 <https://redmine.pfsense.org/issues/7166>`__
-  Fixed handling of rc.newwanipv6 when run from dhcp6c so it only runs
   when required and not for any change
   `#7145 <https://redmine.pfsense.org/issues/7145>`__
-  Fixed handling of SIGTERM and SIGKILL in dhcp6c
   `#7185 <https://redmine.pfsense.org/issues/7185>`__
-  Fixed dhcp6c not starting until an RA is received
   `#5993 <https://redmine.pfsense.org/issues/5993>`__
-  Fixed a PPP service name error with certain providers, such as
   T-Mobile `#6890 <https://redmine.pfsense.org/issues/6890>`__
-  Fixed 3G service status so it does not report misleading information
   `#4287 <https://redmine.pfsense.org/issues/4287>`__
-  Added support for the IPv6 AUTO_LINKLOCAL flag on bridge interfaces
-  Disabled DAD on stf interfaces to fix problems with dpinger
-  Added an option to use static IPv6 over an IPv4 PPP parent (e.g.
   PPPoE) `#7598 <https://redmine.pfsense.org/issues/7598>`__
-  Removed unused WINS code for L2TP
   `#7559 <https://redmine.pfsense.org/issues/7559>`__
-  Improved L2TP Server DNS input validation
   `#7560 <https://redmine.pfsense.org/issues/7560>`__
-  Added a test to disable internal L2TP users when activating RADIUS,
   to follow the behavior stated in the GUI
   `#7561 <https://redmine.pfsense.org/issues/7561>`__
-  Fixed L2TP section log shortcut
   `#7564 <https://redmine.pfsense.org/issues/7564>`__
-  Fixed upgrade handling of wireless interfaces
   `#7809 <https://redmine.pfsense.org/issues/7809>`__

NTP
---

-  Added support for the ntpd "pool" directive to make better use of
   servers in NTP pools
   `#5985 <https://redmine.pfsense.org/issues/5985>`__
-  Fixed time display on the NTP widget to show server time
   `#7245 <https://redmine.pfsense.org/issues/7245>`__
-  Added support for NTP to process PGRMF NMEA sentences
   (Garmin-specific) `#7193 <https://redmine.pfsense.org/issues/7193>`__
-  Added an absolute offset statistic to NTP monitoring graph display
   `#7548 <https://redmine.pfsense.org/issues/7548>`__

User Management / Authentication
--------------------------------

-  Fixed delays during bootup when LDAP is enabled for user
   authentication `#6367 <https://redmine.pfsense.org/issues/6367>`__
-  Added privileges to control which users can view and/or clear notices
   `#7051 <https://redmine.pfsense.org/issues/7051>`__
-  Added an authentication cache mechanism for GUI authentication from a
   remote server (e.g. LDAP, RADIUS) so the authentication is checked
   periodically (default: 30s) instead of on each page load
   `#7097 <https://redmine.pfsense.org/issues/7097>`__
-  Added protocol selection (PAP, MD5-CHAP, MS-CHAPv1 and MS-CHAPv2) to
   RADIUS authentication server options
   `#7111 <https://redmine.pfsense.org/issues/7111>`__
-  Added the username to the page to display when adding user privileges
   `#7586 <https://redmine.pfsense.org/issues/7586>`__
-  Standardized privilege page and sorting between users and groups
   `#7587 <https://redmine.pfsense.org/issues/7587>`__
-  Added a log message if a user tries to save the configuration but has
   the 'deny config write' permission
-  Added "auth_check" type of simple test that a page can use to verify
   a user is logged in and has access, using less cpu, which is better
   for AJAX data polling
-  Fixed certificate chain verification issues with LDAP authentication
   using intermediate CAs
   `#7830 <https://redmine.pfsense.org/issues/7830>`__
-  Fixed PHP errors when STARTTLS fails for LDAP authentication

Packages
--------

-  Fixed issues with snort, squid/clamav, and squidGuard when /var is in
   a RAM disk `#6878 <https://redmine.pfsense.org/issues/6878>`__
-  Fixed handling of custom_php_deinstall_command during
   post-deinstall of a package
   `#7401 <https://redmine.pfsense.org/issues/7401>`__
-  Changed package related calls to get_pkg_info() to use the new pkg
   metadata mechanism

Console / Menu
--------------

-  Added options to the console reboot menu selection to reboot into
   single user mode or run filesystem checks
   `#6639 <https://redmine.pfsense.org/issues/6639>`__

OS Upgrade
----------

-  Fixed issues when upgrading to 2.4 with a stale package .inc that
   caused a PHP error
   `#6920 <https://redmine.pfsense.org/issues/6920>`__
-  Changed the upgrade script to use reroot instead of reboot for
   updates that do not include a new Kernel
   `#6045 <https://redmine.pfsense.org/issues/6045>`__

SNMP
----

-  Added a workaround to prevent the hostres module from being used with
   bsnmpd on VMware Virtual Machines that have a cd0 device, which
   caused 100% CPU usage
   `#6882 <https://redmine.pfsense.org/issues/6882>`__

Services
--------

-  Converted all mpd-based features (e.g. PPPoE and L2TP server) to MPD5
   if they used an older version
   `#4706 <https://redmine.pfsense.org/issues/4706>`__
-  Removed unused and non-functional SMART service handling and e-mail
   configuration `#6393 <https://redmine.pfsense.org/issues/6393>`__
-  Fixed IGMP Proxy failing to recognize an upstream interface
   `#6099 <https://redmine.pfsense.org/issues/6099>`__

WebGUI
------

-  Added support for multiple languages, currently that list includes:

   -  US English (Default), Bosnian, Chinese (Simplified, China),
      Chinese (Taiwan), Dutch, German, Norwegian Bokmal, Polish,
      Portuguese (Brazil), Russian, Spanish, Spanish (Argentina)

-  Changed the design of the login page for the WebGUI to a more modern
   style, with several color choices available
-  Added URL fingerprinting to JavaScript and CSS file references to
   improve client-side behavior when files change between versions
   `#7251 <https://redmine.pfsense.org/issues/7251>`__
-  Updated Logo to the new logo and made it a vectorized SVG image for
   better scaling
-  Updated favicon to the new logo and added multiple sizes for
   different platforms
-  Completed work to mark required fields on GUI pages
   `#7160 <https://redmine.pfsense.org/issues/7160>`__
-  Fixed long hostnames overlapping the "time" title in the monitoring
   graphs `#6138 <https://redmine.pfsense.org/issues/6138>`__
-  Fixed CIDR/Prefix selector handling for IPv4/IPv6
   `#7625 <https://redmine.pfsense.org/issues/7625>`__
-  Removed the Gold menu
-  Fixed handling of info block content inside tables
   `#7504 <https://redmine.pfsense.org/issues/7504>`__
-  Improved handling of PHP errors for user-entered PHP code on
   diag_command.php
-  Fixed alignment of the the IPv6 over IPv4 input fields
   `#7128 <https://redmine.pfsense.org/issues/7128>`__
-  Optimized retrieval of Traffic Graph data to reduce spikes in the
   graphs and load on the firewall
-  Fixed a problem with the traffic graphs not respecting the theme
   colors `#6746 <https://redmine.pfsense.org/issues/6746>`__
-  Revised setup wizard wording and links

Dashboard
---------

-  Rewrote Dashboard AJAX updating in a centralized and optimized way to
   reduce load, improve accuracy, and increase speed
-  Added a new Customer Support dashboard widget, enabled by default and
   on upgrade
-  Changed the way AJAX updates are handled on the Dashboard widgets to
   improve efficiency and fix issues with some widgets refreshing in a
   timely manner
-  Added filters to more dashboard widgets
   `#7122 <https://redmine.pfsense.org/issues/7122>`__
-  Added customization for dashboard widget names
-  Fixed Interface Statistics dashboard widget issues with interfaces in
   a "down" state
-  Fixed formatting issues with the Interface Statistics dashboard
   widget `#7501 <https://redmine.pfsense.org/issues/7501>`__
-  Added the ability to place multiple copies of widgets on the
   dashboard, optional for each widget
-  Added a line to display detected CPU cryptographic hardware, such as
   AES-NI, in the System Information dashboard widget even if the module
   isn't loaded `#7529 <https://redmine.pfsense.org/issues/7529>`__
-  Fixed CPU package/core count displayed on the System Information
   dashboard widget
-  Changed how pkg metadata is handled to reduce the load on the
   Dashboard and reduce unnecessary calls to the pkg server for the
   System Information dashboard widget update check, and for the
   Installed Packages dashboard widget
-  Changed CPU usage calculation in the System Information dashboard
   widget to avoid sleep() in an AJAX call
-  Fixed the IPsec widget tunnel status to handle newer strongSwan
   childid format `#7499 <https://redmine.pfsense.org/issues/7499>`__
-  Fixed error when saving Wake on LAN dashboard widget without any WoL
   entries
-  Fixed a problem where traffic could be counted twice in traffic
   graphs `#7751 <https://redmine.pfsense.org/issues/7751>`__
-  Fixed a problem with the Installed Packages dashboard widget when no
   packages are installed
   `#7811 <https://redmine.pfsense.org/issues/7811>`__
-  Changed date formats of some fields on the Dashboard to be more
   consistent `#7805 <https://redmine.pfsense.org/issues/7805>`__
-  Added an option to the Interface Statistics dashboard widget to
   rotate the table (put interfaces in rows instead of columns) to
   improve the display on firewalls with numerous interfaces
   `#7501 <https://redmine.pfsense.org/issues/7501>`__

pftop
-----

-  Removed the "size" option from pftop as it had no effect, use the
   "bytes" option instead
   `#7579 <https://redmine.pfsense.org/issues/7579>`__
-  Removed the 'peak' and 'rate' views for pftop since they only work in
   interactive mode with cached data, not batch mode which is used by
   the WebGUI `#7580 <https://redmine.pfsense.org/issues/7580>`__
-  Fixed path to an old copy of the pftop WebGUI page in obsolete list
   `#7581 <https://redmine.pfsense.org/issues/7581>`__

DNS
---

-  Changed /etc/hosts such that the FQDN is listed first, except for
   localhost, so that dnsmasq will properly reverse resolve hostnames
   `#7771 <https://redmine.pfsense.org/issues/7771>`__
-  Fixed a problem where the DNS Search Domain List was not being
   populated into radvd.conf
   `#7081 <https://redmine.pfsense.org/issues/7081>`__
-  Enabled Python support for Unbound
   `#7549 <https://redmine.pfsense.org/issues/7549>`__
-  Added a control to disable automatically added host entries in
   Unbound
-  Changed the way unbound is started at boot time on systems with DHCP6
   WANs

Misc
----

-  Added hardware support and detection for new Netgate models
-  Changed the User Agent passed to outbound requests from pfSense to
   include more accurate host information
-  Added the User Agent to the request data when updating the Bogons
   list
-  Fixed growl and SMTP notifications so performing a test saves first,
   so the new settings are used as expected
   `#7577 <https://redmine.pfsense.org/issues/7577>`__
-  Fixed loading issues with PHP extensions
   `#6628 <https://redmine.pfsense.org/issues/6628>`__
-  Removed symbolic links for configuration files that redirected items
   from /etc/ to /var/etc/
   `#5538 <https://redmine.pfsense.org/issues/5538>`__
-  Added the ability to filter Packet Captures by MAC address
   `#6743 <https://redmine.pfsense.org/issues/6743>`__
-  Updated status.php with new info and changed its output organization
   `#7047 <https://redmine.pfsense.org/issues/7047>`__
-  Fixed a problem where a proxy defined for use by the firewall could
   not use HTTPS when using proxy authentication
   `#6949 <https://redmine.pfsense.org/issues/6949>`__
-  Improved RAM disk backups and file management
   `#7098 <https://redmine.pfsense.org/issues/7098>`__
-  Changed the way RAM disk contents are handled when enabled
   `#5897 <https://redmine.pfsense.org/issues/5897>`__
-  Changed various support functions to better facilitate translation to
   additional languages
-  Fixed interface name display on the Router Advertisement
   configuration page
   `#7133 <https://redmine.pfsense.org/issues/7133>`__
-  Fixed various issues with handling of unusually formatted, but valid,
   IPv6 addresses `#7147 <https://redmine.pfsense.org/issues/7147>`__
-  Improved error handling when a client is logged when it attempts to
   poll data via rrd_fetch_json.php
   `#6748 <https://redmine.pfsense.org/issues/6748>`__
-  Fixed various issues when the configuration backup count was set to 0
   (disabled) `#7273 <https://redmine.pfsense.org/issues/7273>`__
-  Fixed handling of "0" for the number of backups to retain in the
   configuration history
   `#7273 <https://redmine.pfsense.org/issues/7273>`__
-  Fixed an issue with long configuration change descriptions leading to
   wrapping issues in certain cases such as AutoConfigBackup
   `#6363 <https://redmine.pfsense.org/issues/6363>`__
-  Fixed an issue with installing packages from a backup when restoring
   using the External Configuration Locater on the first boot
   post-install `#7914 <https://redmine.pfsense.org/issues/7914>`__
