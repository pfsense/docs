2.3.2 New Features and Changes
==============================

SSH Daemon
----------

NOTE: The ssh host keys were made more secure, and if a client remembers
an older, weaker key, the ssh client may refuse to connect. Remove the
older key and then make the ssh client learn the new key.

-  Changed sshd to use stronger Key Exchange algorithms and disabled
   some older, weaker algorithms. Clients may need to be updated to
   handle the new Key Exchange methods.

   -  Currently allowed Key Exchange Algorithms:
      curve25519-sha256@libssh.org,diffie-hellman-group-exchange-sha256

-  Removed the ECDSA host key from the sshd configuration
-  Added ED25519 host key to the sshd configuration
-  Changed the list of available ciphers.

   -  Current allowed ciphers:
      chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr

-  Changed the list of available Message Authentication Code methods,

   -  Current MAC list:
      hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-ripemd160-etm@openssh.com,umac-128-etm@openssh.com,hmac-sha2-512,hmac-sha2-256,hmac-ripemd160,umac-128@openssh.com

Backup/Restore
--------------

-  Don't allow applying changes on interface mismatch post-config
   restore until the reassignment is saved.
   `#6613 <https://redmine.pfsense.org/issues/6613>`__

Dashboard
---------

-  Dashboard now has per-user configuration options, documented in :doc:`User Manager </usermanager/managing-local-users>`.
   `#6388 <https://redmine.pfsense.org/issues/6388>`__

DHCP Server
-----------

-  Disabled dhcp-cache-threshold to avoid bug in ISC dhcpd 4.3.x
   omitting client-hostname from leases file, which makes dynamic
   hostname registration fail in some edge cases.
   `#6589 <https://redmine.pfsense.org/issues/6589>`__
-  Note that DDNS key must be HMAC-MD5.
   `#6622 <https://redmine.pfsense.org/issues/6622>`__

DHCP Relay
----------

-  Imported fix for dhcrelay relaying requests on the interface where
   the target DHCP server resides.
   `#6355 <https://redmine.pfsense.org/issues/6355>`__

Dynamic DNS
-----------

-  Allow \* for hostname with Namecheap.
   `#6260 <https://redmine.pfsense.org/issues/6260>`__

Interfaces
----------

-  Fix "can't assign requested address" during boot with track6
   interfaces. `#6317 <https://redmine.pfsense.org/issues/6317>`__
-  Remove deprecated link options from GRE and gif.
   `#6586 <https://redmine.pfsense.org/issues/6586>`__,
   `#6587 <https://redmine.pfsense.org/issues/6587>`__
-  Obey "Reject leases from" when DHCP "Advanced options" is checked.
   `#6595 <https://redmine.pfsense.org/issues/6595>`__
-  Protect enclosed delimiters in DHCP client advanced configuration, so
   commas can be used there.
   `#6548 <https://redmine.pfsense.org/issues/6548>`__
-  Fix default route on PPPoE interfaces missing in some edge cases.
   `#6495 <https://redmine.pfsense.org/issues/6495>`__

IPsec
-----

-  strongSwan upgraded to 5.5.0.
-  Include aggressive in ipsec.conf where IKE mode auto is selected.
   `#6513 <https://redmine.pfsense.org/issues/6513>`__

Gateway Monitoring
------------------

-  Fixed "socket name too large" making gateway monitoring fail on long
   interface names and IPv6 addresses.
   `#6505 <https://redmine.pfsense.org/issues/6505>`__

Limiters
--------

-  Set pipe_slot_limit automatically to maximum configured qlimit
   value. `#6553 <https://redmine.pfsense.org/issues/6553>`__

Monitoring
----------

-  Fixed no data periods being reported as 0, skewing averages.
   `#6334 <https://redmine.pfsense.org/issues/6334>`__
-  Fix tooltip showing as "none" for some values.
   `#6044 <https://redmine.pfsense.org/issues/6044>`__
-  Fix saving of some default configuration options.
   `#6402 <https://redmine.pfsense.org/issues/6402>`__
-  Fix X axis ticks not responding to resolution for custom time
   periods. `#6464 <https://redmine.pfsense.org/issues/6464>`__

OpenVPN
-------

-  Re-sync client specific configurations after save of OpenVPN server
   instances to ensure their settings reflect the current server
   configuration. `#6139 <https://redmine.pfsense.org/issues/6139>`__

Operating System
----------------

-  Fixed pf fragment states not being purged, triggering "PF frag
   entries limit reached".
   `#6499 <https://redmine.pfsense.org/issues/6499>`__
-  Set core file location so they can't end up in /var/run and exhaust
   its available space.
   `#6510 <https://redmine.pfsense.org/issues/6510>`__
-  Fixed "runtime went backwards" log spam in Hyper-V.
   `#6446 <https://redmine.pfsense.org/issues/6446>`__
-  Fixed traceroute6 hang with non-responding hop in path.
   `#3069 <https://redmine.pfsense.org/issues/3069>`__
-  Added symlink /var/run/dmesg.boot for vm-bhyve.
   `#6573 <https://redmine.pfsense.org/issues/6573>`__
-  Set net.isr.dispatch=direct on 32 bit systems with IPsec enabled to
   prevent crash when accessing services on the host itself via VPN.
   `#4754 <https://redmine.pfsense.org/issues/4754>`__

Router Advertisements
---------------------

-  Added configuration fields for minimum and maximum router
   advertisement intervals and router lifetime.
   `#6533 <https://redmine.pfsense.org/issues/6533>`__

Routing
-------

-  Fixed static routes with IPv6 link local target router to include
   interface scope. `#6506 <https://redmine.pfsense.org/issues/6506>`__

Rules / NAT
-----------

-  Fixed "PPPoE Clients" placeholder in rules and NAT, and ruleset error
   when using floating rules specifying PPPoE server.
   `#6597 <https://redmine.pfsense.org/issues/6597>`__
-  Fixed failure to load ruleset with URL Table aliases where empty file
   specified. `#6181 <https://redmine.pfsense.org/issues/6181>`__
-  Fixed TFTP proxy with xinetd.
   `#6315 <https://redmine.pfsense.org/issues/6315>`__

Upgrade
-------

-  Fixed nanobsd upgrade failures where DNS Forwarder/Resolver not bound
   to localhost. `#6557 <https://redmine.pfsense.org/issues/6557>`__

Virtual IPs
-----------

-  Fixed performance problems with large numbers of virtual IPs.
   `#6515 <https://redmine.pfsense.org/issues/6515>`__
-  Fixed PHP memory exhaustion on CARP status page with large state
   tables. `#6364 <https://redmine.pfsense.org/issues/6364>`__

Web Interface
-------------

-  Added sorting to DHCP static mappings table.
   `#6504 <https://redmine.pfsense.org/issues/6504>`__
-  Fixed file upload of NTP leap seconds.
   `#6590 <https://redmine.pfsense.org/issues/6590>`__
-  Added IPv6 support to diag_dns.php.
   `#6561 <https://redmine.pfsense.org/issues/6561>`__
-  Added IPv6 support to filter logs reverse lookup.
   `#6585 <https://redmine.pfsense.org/issues/6585>`__
-  Package system - retain field data on input error.
   `#6577 <https://redmine.pfsense.org/issues/6577>`__
-  Fixed multiple IPv6 input validation issues allowing invalid IPv6
   IPs. `#6551 <https://redmine.pfsense.org/issues/6551>`__,
   `#6552 <https://redmine.pfsense.org/issues/6552>`__
-  Fixed some DHCPv6 leases missing from GUI leases display.
   `#6543 <https://redmine.pfsense.org/issues/6543>`__
-  Fixed state killing for 'in' direction and states with translated
   destination. `#6530 <https://redmine.pfsense.org/issues/6530>`__,
   `#6531 <https://redmine.pfsense.org/issues/6531>`__
-  Restore input validation of captive portal zone names to prevent
   invalid XML. `#6514 <https://redmine.pfsense.org/issues/6514>`__
-  Replaced calendar date picker in the user manager with one that works
   in browsers other than Chrome and Opera.
   `#6516 <https://redmine.pfsense.org/issues/6516>`__
-  Restored proxy port field to OpenVPN client.
   `#6372 <https://redmine.pfsense.org/issues/6372>`__
-  Clarify description of ports aliases.
   `#6523 <https://redmine.pfsense.org/issues/6523>`__
-  Fixed translation output where gettext passed an empty string.
   `#6394 <https://redmine.pfsense.org/issues/6394>`__
-  Fixed speed selection for 9600 in NTP GPS configuration.
   `#6416 <https://redmine.pfsense.org/issues/6416>`__
-  Only allow IPv6 IPs on NPT screen.
   `#6498 <https://redmine.pfsense.org/issues/6498>`__
-  Add alias import support for networks and ports.
   `#6582 <https://redmine.pfsense.org/issues/6582>`__
-  Fixed sortable table header wrap oddities.
   `#6074 <https://redmine.pfsense.org/issues/6074>`__
-  Clean up Network Booting section of DHCP Server screen.
   `#6050 <https://redmine.pfsense.org/issues/6050>`__
-  Fix "UNKNOWN" links in package manager.
   `#6617 <https://redmine.pfsense.org/issues/6617>`__
-  Fix missing bandwidth field for traffic shaper CBQ queues.
   `#6437 <https://redmine.pfsense.org/issues/6437>`__

UPnP
----

-  UPnP presentation URL and model number now configurable.
   `#6002 <https://redmine.pfsense.org/issues/6002>`__

User Manager
------------

-  Prohibit admins from deleting their own accounts in the user manager.
   `#6450 <https://redmine.pfsense.org/issues/6450>`__

Other
-----

-  Added PHP shell sessions to enable and disable persistent CARP
   maintenance mode. "playback enablecarpmaint" and "playback
   disablecarpmaint".
   `#6560 <https://redmine.pfsense.org/issues/6560>`__
-  Exposed serial console configuration for nanobsd VGA.
   `#6291 <https://redmine.pfsense.org/issues/6291>`__
