.. include:: /substitutions.rsti

2.1.3 New Features and Changes
==============================

2.1.3 follows very shortly after
:doc:`2.1.2 </releases/2-1-2-new-features-and-changes>` and is primarily a security
release. Refer to the :doc:`2.1.1 release notes </releases/2-1-1-new-features-and-changes>` for changes from 2.1 to 2.1.1
and :doc:`2.1.2 release notes </releases/2-1-2-new-features-and-changes>` for changes
from 2.1.1 to 2.1.2.

Security Fixes
--------------

-  `pfSense-SA-14_05.tcp <https://www.pfsense.org/security/advisories/pfSense-SA-14_05.tcp.asc>`__

   -  `FreeBSD-SA-14:08.tcp <http://www.freebsd.org/security/advisories/FreeBSD-SA-14:08.tcp.asc>`__

-  `pfSense-SA-14_06.openssl <https://www.pfsense.org/security/advisories/pfSense-SA-14_06.openssl.asc>`__

   -  `FreeBSD-SA-14:09.openssl <http://www.freebsd.org/security/advisories/FreeBSD-SA-14:09.openssl.asc>`__

Packages also had their own independent fixes and need updating. During
the firmware update process the packages will be reinstalled properly.
Otherwise, uninstall and then reinstall packages to ensure that the
latest version of the binaries is in use.

Although these security issues warrant updating as soon as possible,
they are of relatively minor impact to the average user. According to
the FreeBSD SA, the TCP flaw is mitigated by scrub in pf which is
enabled by default in pfSense. The OpenSSL flaw is not used by any
daemons in the pfSense base system and only certain packages make use of
the affected feature, so the impact there is also minimal.

Other Fixes
-----------

-  Various fixes to accommodate recent changes/optimizations in the
   tools repository
-  Move clog binary to its proper place in /usr/local/ to respect
   hier(7)
-  Fix remove button on Diagnostics > Tables
   `#3627 <https://redmine.pfsense.org/issues/3627>`__
-  Fix more potential places for interface looping in OpenVPN and with
   normal interfaces
-  Fixes for URL table alias updates (locking, reload)
-  Fix IPsec Phase 1 duplication
-  Fix 'add rule on top of the list' allowing after param to be -1
-  Correct Captive Portal redirection URL to unbreak ones passed through
   Radius attributes and repsect user choices.
-  Make miniupnpd listen on interface instead of IP
-  Don't refuse to delete a bridge in the GUI just because its bridge
   interface doesn't exist, just log that it doesn't exist and don't
   attempt to ifconfig destroy it, delete it from config
-  Fixes for DynDNS to allow configurable check host.
-  Resolver has no option for remote syslog, remove wrong copy/paste
   that was adding it when apinger was enabled
-  Fix typo for GIF tunnels to work over IPv6
-  Fix for dhcrelay target using default GW
-  List Gateway Groups in Interface to send update from for custom
   DynDNS entries
