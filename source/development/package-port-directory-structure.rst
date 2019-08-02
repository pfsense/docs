Package Port Directory Structure
================================

The directory structure of a pfSense® package is similar to that of a
traditional FreeBSD port.

For more information on working with FreeBSD Ports, see and
`bsd.port.mk <https://github.com/pfsense/FreeBSD-ports/blob/devel/Mk/bsd.port.mk>`__.

This page uses the simple Cron package as an example, many other
packages are similar. See :doc:`Package Port List </development/package-port-list>` for
links to existing packages to copy/clone from.

First is the category, which roughly lines up with the category for the
package with the caveat that if a pfSense package is based on a FreeBSD
port, it should be in the same location (e.g. squid is under www/squid)
-- In the case of Cron this is *sysutils*::

  FreeBSD-ports/sysutils/

Next is the main package directory inside of the category, it is always
prefixed with *pfSense-pkg-*::

  FreeBSD-ports/sysutils/pfSense-pkg-Cron/

From here down the "FreeBSD-ports" prefix will be omitted for brevity.

The main Makefile, which includes version information, information about
binaries, dependencies, install procedures, where to copy files, and so
on -- copy an existing one for a similar package and adjust as needed
(but do so carefully)::

  sysutils/pfSense-pkg-Cron/Makefile

pfSense standard pkg install/deinstall scripts (same for all packages,
copy contents from another existing pkg)::

  sysutils/pfSense-pkg-Cron/files/pkg-deinstall.in
  sysutils/pfSense-pkg-Cron/files/pkg-install.in

A brief text description of the package::

  sysutils/pfSense-pkg-Cron/pkg-descr

A list of files installed by the package, for specifics on the format,
see the links above::

  sysutils/pfSense-pkg-Cron/pkg-plist

The directory under which custom files are placed which will be copied
to the firewall::

  sysutils/pfSense-pkg-Cron/files/

An optional file containing privilege information::

  sysutils/pfSense-pkg-Cron/files/etc/inc/priv/cron.priv.inc

The package's include files and XML files::

  sysutils/pfSense-pkg-Cron/files/usr/local/pkg/cron.inc
  sysutils/pfSense-pkg-Cron/files/usr/local/pkg/cron.xml

The packages XML metadata (which formerly would have been found in, for
example, pkg_config.10.xml::

  sysutils/pfSense-pkg-Cron/files/usr/local/share/pfSense-pkg-Cron/info.xml

Files that go into the main directory of the web server::

  sysutils/pfSense-pkg-Cron/files/usr/local/www/

Note that the Cron package uses a directory under /usr/local/www for its
files -- this is optional.

.. code::

  sysutils/pfSense-pkg-Cron/files/usr/local/www/packages/cron/cron.php
  sysutils/pfSense-pkg-Cron/files/usr/local/www/packages/cron/cron_edit.php
  sysutils/pfSense-pkg-Cron/files/usr/local/www/packages/cron/index.php

The structure under the *files/* directory should follow , so any
scripts to be run (for example) would be under *files/usr/local/bin/*
