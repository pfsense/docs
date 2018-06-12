.. include:: /substitutions.rsti

The available package list in pfSense 2.3 has been trimmed down
significantly, mostly removing packages that have been deprecated
upstream, no longer have an active maintainer, or were never stable to
begin with. Some just haven't been converted for Bootstrap and may
return if converted. The following lists packages no longer available in
2.3 that were in the package list in 2.2.6.

Systems with one of these packages installed can be upgraded, but the
package will no longer be there post-upgrade. We recommend uninstalling
these packages before upgrading to 2.3.

Removed Package List
~~~~~~~~~~~~~~~~~~~~

-  Apache with mod\_security-dev / Proxy Server with mod\_security -
   neither ever worked well, no active maintainer.

-  arpwatch - no package maintainer, not converted

-  Asterisk - no package maintainer, not converted

-  bacula-client - no package maintainer, not converted

-  bandwidthd - Is now available on 2.3.4

-  check\_mk agent - no package maintainer, not converted

-  DansGuardian - the upstream DansGuardian package is no longer
   maintained.

-  diag\_new\_states - no package maintainer, not converted

-  dns-server - no package maintainer, not converted

-  File Manager - no package maintainer, not converted

-  Filer - no package maintainer, not converted

-  HAVP antivirus and its dashboard widgets - the upstream HAVP project
   is no longer maintained. Antivirus support is now built into the
   Squid package.

-  imspector - the upstream imspector project is no longer maintained,
   and doesn't function with current instant messaging protocols.

-  ipguard-dev - no package maintainer, not converted

-  mailscanner - no package maintainer, not converted

-  netio - no package maintainer, not converted

-  ntop - ntop has been deprecated by its creator in favor of ntopng.

-  olsrd - no package maintainer, not converted

-  PHPService - no package maintainer, not converted

-  Postfix Forwarder - not converted

-  Sarg - deprecated in favor of lightsquid

-  spamd - no package maintainer, not converted

-  squid3 - the squid packages have been consolidated into a single
   squid package, using version 3.5. The "squid3" package has been
   removed, and the "squid" package is now version 3.

-  squidGuard-devel - squidGuard-devel no longer exists, use squidGuard
   instead.

-  SSHDCond - no package maintainer, not converted

-  stunnel - no package maintainer, not converted

-  urlsnarf - no package maintainer, not converted

-  Varnish3 - no package maintainer, not converted

-  vHosts - no package maintainer, not converted

-  vnstat2 - Replaced by Status\_Traffic\_Totals which uses vnstat for a
   backend

-  widentd - no package maintainer, not converted

-  Zabbix-2 agent - not converted. Zabbix LTS available as alternative.

-  Zabbix-2 proxy - not converted. Zabbix LTS available as alternative.
