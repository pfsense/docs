.. include:: /substitutions.rsti

2.1.4 New Features and Changes
==============================

2.1.4 follows very shortly after
:doc:`2.1.3 </releases/2-1-3-new-features-and-changes>` and is primarily a security
release. Refer to the :doc:`2.1.1 release notes </releases/2-1-1-new-features-and-changes>`,
:doc:`2.1.2 release notes </releases/2-1-2-new-features-and-changes>`, and
:doc:`2.1.3 release notes </releases/2-1-3-new-features-and-changes>` for other recent changes.

Security Fixes
--------------

-  `pfSense-SA-14_07.openssl <https://pfsense.org/security/advisories/pfSense-SA-14_07.openssl.asc>`__

   -  `FreeBSD-SA-14:14.openssl <http://www.freebsd.org/security/advisories/FreeBSD-SA-14:14.openssl.asc>`__

-  `pfSense-SA-14_08.webgui <https://pfsense.org/security/advisories/pfSense-SA-14_08.webgui.asc>`__
-  `pfSense-SA-14_09.webgui <https://pfsense.org/security/advisories/pfSense-SA-14_09.webgui.asc>`__
-  `pfSense-SA-14_10.webgui <https://pfsense.org/security/advisories/pfSense-SA-14_10.webgui.asc>`__
-  `pfSense-SA-14_11.webgui <https://pfsense.org/security/advisories/pfSense-SA-14_11.webgui.asc>`__
-  `pfSense-SA-14_12.webgui <https://pfsense.org/security/advisories/pfSense-SA-14_12.webgui.asc>`__
-  `pfSense-SA-14_13.packages <https://pfsense.org/security/advisories/pfSense-SA-14_13.packages.asc>`__

Packages also had their own independent fixes and need updating. During
the firmware update process the packages will be reinstalled properly.
Otherwise, uninstall and then reinstall packages to ensure that the
latest version of the binaries is in use.

Other Fixes
-----------

-  Patch for Captive Portal pipeno leaking issue which leads to the
   'Maximum login reached' on Captive Portal.
   `#3062 <http://redmine.pfsense.org/issues/3062>`__
-  Remove text not relevant to Allowed IPs on the Captive Portal.
   `#3594 <http://redmine.pfsense.org/issues/3594>`__
-  Remove units from burst as it is always specified in bytes. (Per
   ipfw(8)).
-  Add column for internal port on UPnP status page.
-  Make listening on interface rather than IP optional for UPnP.
-  Fix highlighting of selected rules.
   `#3646 <http://redmine.pfsense.org/issues/3646>`__
-  Add guiconfig to widgets not including it.
   `#3498 <http://redmine.pfsense.org/issues/3498>`__
-  /etc/version_kernel and /etc/version_base no longer exist, use
   php_uname to get the version for XMLRPC check instead.
-  Fix variable typo. `#3669 <http://redmine.pfsense.org/issues/3669>`__
-  Delete all IP Aliases when an interface is disabled.
   `#3650 <http://redmine.pfsense.org/issues/3650>`__
-  Properly handle RRD archive rename during upgrade and squelch errors
   if it fails.
-  Convert protocol ssl:// to https:// when creating HTTP headers for
   XMLRPC.
-  Show disabled interfaces when they were already part of an interface
   group. This avoids showing a random interface instead and letting the
   user add it by mistake.
   `#3680 <http://redmine.pfsense.org/issues/3680>`__
-  The client-config-dir directive for OpenVPN is also useful when using
   OpenVPN's internal DHCP while bridging, so add it in that case also.
-  Use curl instead of fetch to download update files.
   `#3691 <http://redmine.pfsense.org/issues/3691>`__
-  Escape variable before passing to shell from stop_service().
-  Add some protection to parameters that come through _GET in service
   management.
-  Escape argument on call to is_process_running, also remove some
   unecessary mwexec() calls.
-  Do not allow interface group name to be bigger than 15 chars.
   `#3208 <http://redmine.pfsense.org/issues/3208>`__
-  Be more precise to match members of a bridge interface, it should fix
   `#3637 <http://redmine.pfsense.org/issues/3637>`__
-  Do not expire already disabled users, it fixes
   `#3644 <http://redmine.pfsense.org/issues/3644>`__
-  Validate starttime and stoptime format on
   firewall_schedule_edit.php
-  Be more careful with host parameter on diag_dns.php and make sure
   it's escaped when call shell functions
-  Escape parameters passed to shell_exec() in diag_smart.php and
   elsewhere
-  Make sure variables are escaped/sanitized on
   status_rrd_graph_img.php
-  Replace exec calls to run rm by unlink_if_exists() on
   status_rrd_graph_img.php
-  Replace all \`hostname\` calls by php_uname('n') on
   status_rrd_graph_img.php
-  Replace all \`date\` calls by strftime() on
   status_rrd_graph_img.php
-  Add $_gb to collect possibly garbage from exec return on
   status_rrd_graph_img.php
-  Avoid directory traversal in pkg_edit.php when reading package xml
   files, also check if file exists before try to read it
-  Remove id=0 from miniupnpd menu and shortcut
-  Remove . and / from pkg name to avoid directory traversal in
   pkg_mgr_install.php
-  Fix core dump on viewing invalid package log
-  Avoid directory traversal on system_firmware_restorefullbackup.php
-  Re-generate session ID on a successful login to avoid session
   fixation
-  Protect rssfeed parameters with htmlspecialchars() in rss.widget.php
-  Protect servicestatusfilter parameter with htmlspecialchars() in
   services_status.widget.php
-  Always set httponly attribute on cookies
-  Set 'Disable webConfigurator login autocomplete' as on by default for
   new installs
-  Simplify logic, add some protection to user input parameters on
   log.widget.php
-  Make sure single quotes are encoded and avoid javascript injection on
   exec.php
-  Add missing NAT protocols on firewall_nat_edit.php
-  Remove extra data after space in DSCP and fix pf rule syntax.
   `#3688 <http://redmine.pfsense.org/issues/3688>`__
-  Only include a scheduled rule if it is strictly before the end time.
   `#3558 <http://redmine.pfsense.org/issues/3558>`__
