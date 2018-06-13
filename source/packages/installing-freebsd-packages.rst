.. include:: /substitutions.rsti

Installing FreeBSD Packages
===========================

.. warning:: These packages are not supported by the pfSense development team.
   They may break the firewall, be careful!

In addition to the packages available in the pfSense package system,
thousands of additional FreeBSD packages are available. If strong
security is desired for a pfSense firewall then do not install
additional FreeBSD packages, or ensure to properly maintain these
packages by always keeping them up to date. This is especially true of
packages that act as servers, listening for network requests. Packages
only accessible from the local system, such as command line utilities,
are usually of less risk though they can also open security holes.

Startup Script Notes
--------------------

The usual rc.d scripts added to **/usr/local/etc/rc.d/** will not function
on a pfSense system. There is no *rc.conf* and one cannot be created as
it will be deleted. A custom startup script must be created in
**/usr/local/etc/rc.d/** and its name must end with **.sh** and it must be
marked executable (``chmod +x``), and it will run at boot time.
Alternatively if it's something that can be started with a single
command then it can easily be added as a `\<shellcmd\> in config.xml <Executing_commands_at_boot_time>`_.

pfSense 2.3
-----------

pfSense 2.3 is based on pkg for the base system and pfSense packages, so
the pkg repository from pfSense is used and the standard FreeBSD package
repository is not available. Installing packages from FreeBSD is
technically possible, but not recommended due to potential dependency
problems. Passing the full URL to a package using ``pkg add <url>`` will work,
but care is needed to avoid future problems.

List of native FreeBSD packages can be found here:
http://pkg.freebsd.org/freebsd:10:x86:64/latest/All/

Example
~~~~~~~

If you would like to install **sendmail** for example you would run::

  pkg add http://pkg.freebsd.org/freebsd:10:x86:64/latest/All/sendmail+tls+sasl2-8.15.2_3.txz

To find out that it relies on a dependency::

  pkg: Missing dependency 'cyrus-sasl-saslauthd'

So to successfully install the package first install whatever it depends
on depending on the package desired there can be a long list of
dependencies::

  pkg add http://pkg.freebsd.org/freebsd:10:x86:64/latest/All/cyrus-sasl-saslauthd-2.1.26_3.txz
  pkg add http://pkg.freebsd.org/freebsd:10:x86:64/latest/All/sendmail+tls+sasl2-8.15.2_3.txz
  rehash

Then after trying to send a mail with::

  /usr/local/bin/sendEmail -f from@gmail.com -t to@gmail.com -u "Mail Subject" -m "Mail body write your content here." -s smtp.gmail.com:587 -xu <USERNAME> -xp <PASSWORD> -o tls=yes -a attachment.txt ;

  sendEmail[80603]: ERROR => No TLS support!  SendEmail can't load required libraries. (try installing Net::SSLeay and IO::Socket::SSL)

The error tells it needs 2 additional libraries which in turn need
additional dependencies. So there is another set of packages which then
needs to be installed::

  pkg add http://pkg.freebsd.org/freebsd:10:x86:64/latest/All/p5-Net-SSLeay-1.80.txz
  pkg add http://pkg.freebsd.org/freebsd:10:x86:64/latest/All/p5-IO-Socket-IP-0.38.txz
  pkg add http://pkg.freebsd.org/freebsd:10:x86:64/latest/All/p5-Mozilla-CA-20160104.txz
  pkg add http://pkg.freebsd.org/freebsd:10:x86:64/latest/All/p5-Socket-2.024.txz
  pkg add http://pkg.freebsd.org/freebsd:10:x86:64/latest/All/p5-IO-Socket-SSL-2.044.txz

pfSense 2.2
-----------

pfSense 2.2 is based on FreeBSD 10.1 and it uses the *pkg* command to
manually manage FreeBSD packages.

Bootstrapping *pkg*
~~~~~~~~~~~~~~~~~~~

Before packages can be installed, the *pkg* tool must be installed as
follows::

  # pkg
  The package management tool is not yet installed on your system.
  Do you want to fetch and install it now? [y/N]: y
  Bootstrapping pkg from pkg+http://pkg.FreeBSD.org/freebsd:10:x86:64/latest, please wait...
  Verifying signature with trusted certificate pkg.freebsd.org.2013102301... done
  Installing pkg-1.4.4...
  Extracting pkg-1.4.4: 100%
  [...]

Once complete, the *pkg* tool is ready for use.

Installation Example
~~~~~~~~~~~~~~~~~~~~

In this example, *iftop* will be installed for use at the console. There
is a pfSense package for *iftop*, but since it is a simple and useful
package with no additional dependencies it makes for a great example.

The installation is performed in a shell prompt, which may be accessed
via the console or over SSH. Press option *8* from the menu to reach a
shell prompt.

First, update the local copy of the package metadata::

  # pkg update
  Updating FreeBSD repository catalogue...
  Fetching meta.txz: 100%   944 B   0.9k/s    00:01
  Fetching packagesite.txz: 100%    5 MB 755.5k/s    00:07
  Processing entries: 100%
  FreeBSD repository update completed. 23812 packages processed

Now to install the package. If the list printed by *pkg* looks correct,
enter *Y* to confirm the installation::

  # pkg install iftop
  Updating FreeBSD repository catalogue...
  FreeBSD repository is up-to-date.
  All repositories are up-to-date.
  Updating database digests format: 100%
  The following 1 packages will be affected (of 0 checked):

  New packages to be INSTALLED:
  	iftop: 0.17

  The process will require 54 KB more space.
  25 KB to be downloaded.

  Proceed with this action? [y/N]: y
  Fetching iftop-0.17.txz: 100%   25 KB  25.3k/s    00:01
  Checking integrity... done (0 conflicting)
  [1/1] Installing iftop-0.17...
  [1/1] Extracting iftop-0.17: 100%

The package is now installed. For it to be available in the shell, a
*rehash* is necessary::

  # rehash

Now the program may be executed::

  # iftop -nNpPi (interface)

pfSense 2.1.x
-------------

These examples use the *amd64* architecture. If the firewall is using
i386 instead, replace *amd64* with *i386* in the URLs.

Caveats
~~~~~~~

The *pkg_add* command used by pfSense 2.1.x will not properly download
packages because the locations have changed on FreeBSD's servers since
FreeBSD 8.3 is no longer supported upstream. By using the current
location of archived packages from FreeBSD's servers,
ftp://ftp-archive.freebsd.org/pub/FreeBSD-Archive/ports/\ *arch*/packages-8.3-release/Latest/,
packages can be added.

Replace *arch* in the URL with the appropriate architecture, *amd64* or
*i386*.

Installation Example
~~~~~~~~~~~~~~~~~~~~

In this example, *iftop* will be installed for use at the console. There
is a pfSense package for *iftop*, but since it is a simple and useful
package with no additional dependencies it makes for a great example.

The installation is performed in a shell prompt, which may be accessed
via the console or over SSH. Press option *8* from the menu to reach a
shell prompt.

To install the package from a remote repository, run the following
command::

  # pkg_add -r iftop

It will likely fail. If so, fix up and enter the URL to the package in
full::

  ftp://ftp-archive.freebsd.org/pub/FreeBSD-Archive/ports/amd64/packages-8.3-release/Latest/iftop.tbz

Which results in the following full command::

  # pkg_add -r ftp://ftp-archive.freebsd.org/pub/FreeBSD-Archive/ports/amd64/packages-8.3-release/Latest/iftop.tbz

The package is now installed. For it to be available in the shell, a
*rehash* is necessary::

  # rehash

Now the program may be executed::

  # iftop -nNpPi (interface)

The alternate site may also be set in a variable to be used by
*pkg_add* if several packages will be installed::

  setenv PACKAGESITE ftp://ftp-archive.freebsd.org/pub/FreeBSD-Archive/ports/`uname -m`/packages-8.3-release/Latest/

Alternate Package Sites
~~~~~~~~~~~~~~~~~~~~~~~

The FTP archive site above contains official FreeBSD packages for
FreeBSD 8.3, upon which pfSense 2.1.x is based. These files are
potentially several years old now, and some may have security issues.
There is an unofficial site that contains more up-to-date FreeBSD binary
packages for FreeBSD 8.3 that can be used if a more current version is
needed and the site is deemed trustworthy (by the user, not us). The
packages can be found here:

amd64:
http://ftpmirror.your.org/pub/FreeBSD-Unofficial-Packages/83amd64-mini-nox11/Latest/

i386:
http://ftpmirror.your.org/pub/FreeBSD-Unofficial-Packages/83i386-mini-nox11/Latest/

As always, the best option is to build packages personally if possible.
