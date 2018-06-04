.. include:: /substitutions.rsti

2.0.3 New Features and Changes
==============================

pfSense 2.0.3 is a maintenance release with some bug fixes since 2.0.2
release. It is possible to upgrade from any previous release to 2.0.3.

Because this release shortly followed after 2.0.2, review the
:doc:`2.0.2 New Features and Changes </releases/2-0-2-new-features-and-changes>` document as
well.

The changelog for pfSense 2.0.3-RELEASE follows.

Security Advisories
-------------------

-  Updated to OpenSSL 0.9.8y to address
   `FreeBSD-SA-13:03 <http://www.freebsd.org/security/advisories/FreeBSD-SA-13:03.openssl.asc>`__

PPP
---

-  Fix obtaining DNS servers from PPP type WANs (PPP, PPPoE, PPTP, L2TP)

Captive Portal
--------------

-  Fix Captive Portal Redirect URL trimming
-  Voucher sync fixes
-  Captive portal pruning/locking fixes
-  Fix problem with fastcgi crashing

OpenVPN
-------

-  Clear the route for an OpenVPN endpoint IP when restarting the VPN,
   to avoid a situation where a learned route from OSPF or elsewhere
   could prevent an instance from restarting properly
-  Always clear the OpenVPN route when using shared key, no matter how
   the tunnel network “CIDR” is set
-  Use the actual OpenVPN restart routine when starting/stopping from
   services rather than killing/restarting manually
-  Allow editing an imported CRL, and refresh OpenVPN CRLs when saving.
   `#2652 <https://redmine.pfsense.org/issues/2652>`__
-  Fix interface assignment descriptions when using > 10 OpenVPN
   instances

Logging
-------

-  Put syslogd into secure mode so it refuses remote syslog messages
-  If syslog messages are in the log, and the hostname does not match
   the firewall, display the supplied hostname
-  Fix PPP log display to use the correct log handling method
-  Run IPsec logs through htmlspecialchars before display to avoid a
   potential persistent XSS from racoon log output (e.g. username)

Traffic Shaper
--------------

-  Fix editing of traffic shaper default queues.
   `#1995 <https://redmine.pfsense.org/issues/1995>`__
-  Fix wording for VoIP address option in the shaper. Add rule going the
   other direction to catch connections initiated both ways

Dashboard & General GUI
-----------------------

-  Use some tweaks to PHP session management to prevent the GUI from
   blocking additional requests while others are active
-  Remove cmd\_chain.inc and preload.php to fix some issues with
   lighttpd, fastcgi, and resource usage
-  Firmware settings manifest (Site list) now bolds and denotes entries
   that match the current architecture, to help avoid accidental
   cross-architecture upgrades
-  Add header to DHCP static mappings table
-  When performing a factory reset in the GUI, change output style to
   follow halt.php and reboot.php so the shutdown output appears in the
   correct location on the page
-  Better validation of parameters passed during S.M.A.R.T. operations
   for testing HDDs
-  Fixed SNMP interface binding glitch (Setting was active but not
   reflected when viewed in GUI)
-  Add a new class called addgatewaybox to make it easier to respect
   custom themes `#2900 <https://redmine.pfsense.org/issues/2900>`__

Console Menu Changes
--------------------

-  Correct accidental interface assignment changes when changing
   settings on the console menu
-  Console menu option 11 now kills all active PHP processes, kills
   lighttpd, and then restarts the GUI. This is a more effective way to
   restart the GUI since if a PHP process is hung, restarting lighttpd
   alone will not recover from that
-  Fix port display after LAN IP reset

Misc Changes
------------

-  Change how the listening address is passed to miniupnpd, the old
   method was resulting in errors for some users
-  Fix “out” packet count reporting
-  Be a little smarter about the default kernel in rare cases where we
   cannot determine what was in use
-  Pass -S to tcpdump to avoid an increase in memory consumption over
   time in certain cases
-  Minimise rewriting of /etc/gettytab
   (http://forum.pfsense.org/index.php/topic,57325.0.html)
-  Make is\_pid\_running function return more conistent results by using
   isvalidpid
-  Fix ataidle error on systems that have no ATA HDD.
   `#2739 <https://redmine.pfsense.org/issues/2739>`__
-  Update Time Zone database zoneinfo to 2012.j to pick up on recent
   zone/DST/etc changes
-  Fix handling of LDAP certificates, the library no longer properly
   handles files with spaces in the CA certificate filename
-  Bring in the RCFILEPREFIX as constant fixes from HEAD, since
   otherwise rc.stop\_packages was globbing in the wrong dir and
   executing the wrong scripts. Also seems to have fixed the “bad fd”
   error
-  NTP restart fixes
-  Gitsync now pulls in git package from pfSense package repository
   rather than FreeBSD
-  Fixed handling of RRD data in config.xml backups when exporting an
   encrypted config `#2836 <http://redmine.pfsense.org/issues/2836>`__
-  Moved apinger status to /var/run instead of /tmp
-  Fixes for FTP proxy on non-default gateway WANs
-  Fixes for OVA images
-  Use new pfSense repository location (
   http://github.com/pfsense/pfsense/ )
-  Add patch to compensate apinger calculation for down gateways by time
   taken from other tasks like rrd/status file/etc

lighttpd changes
----------------

-  Improve tuning of lighttpd and php processes
-  Use separate paths for GUI and Captive Portal fastcgi sockets
-  Always make sure php has its own process manager to make lighttpd
   happy
-  Make mod\_fastcgi last to have url.rewrite work properly
-  Enable mod\_evasive if needed for Captive Portal
-  Simplify lighttpd config
-  Send all lighttpd logs to syslog

Binary changes
--------------

-  dnsmasq to 2.65
-  rsync to 3.0.9
-  links 2.7
-  rrdtool to 1.2.30
-  PHP to 5.2.17\_13
-  OpenVPN 2.2 stock again (Removed IPv6 patches since those are only
   needed on 2.1 now)
-  Fix missing “beep” binary on amd64
-  Fix potential issue with IPsec routing of client traffic
-  Remove lighttpd spawnfcgi dependency
-  Add splash device to wrap\_vga kernels (It's in GENERIC so full
   installs already have it).
   `#2723 <https://redmine.pfsense.org/issues/2723>`__

filterdns
~~~~~~~~~

-  Correct an issue with unallocated structure
-  Avoid issues with pidfiles being overwritten, lock the file during
   modifications
-  Make filterdns restartable and properly cleanup its tables upon exit
   or during a reconfiguration

dhcpleases
~~~~~~~~~~

-  Correct use after free and also support hostnames with other DNS
   suffix
-  Reinit on any error rather than just forgetting. Also the difftime
   checks are done after having complete view, no need to do them every
   time
-  Typo fixes
-  Log that a HUP signal is being sent to the pid file submitted by
   argument
-  Prevent bad parsing of empty hostnames in lease file. Add an f option
   to run dhcplease in foreground. The only option needed while in
   foreground is h parameter and the only usable one as well
