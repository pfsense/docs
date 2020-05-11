Installing FreeBSD Packages
===========================

.. warning:: These packages are not supported by the pfSense®
   development team. They may break the firewall, be careful!

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
command then it can easily be added as a :doc:`\<shellcmd\> in config.xml
</development/executing-commands-at-boot-time>`.

pfSense software version 2.4
----------------------------

pfSense software version 2.4 is based on pkg for the base system and pfSense
packages, so the pfSense pkg repository is used and the standard FreeBSD
package repository is not available. Installing packages from FreeBSD is
technically possible, but not recommended due to potential dependency
problems. Passing the full URL to a package using ``pkg add <url>`` will work,
but care is needed to avoid future problems.

List of native FreeBSD packages can be found here:
http://pkg.freebsd.org/freebsd:11:x86:64/latest/All/

Example
~~~~~~~

If you would like to install **sendmail** for example you would run::

  pkg add http://pkg.freebsd.org/freebsd:11:x86:64/latest/All/sendmail+tls+sasl2-8.15.2_22.txz

To find out that it relies on a dependency::

  pkg: Missing dependency 'cyrus-sasl-saslauthd'

So to successfully install the package first install whatever it depends
on depending on the package desired there can be a long list of
dependencies::

  pkg add http://pkg.freebsd.org/freebsd:11:x86:64/latest/All/cyrus-sasl-saslauthd-2.1.27_1.txz
  pkg add http://pkg.freebsd.org/freebsd:11:x86:64/latest/All/sendmail+tls+sasl2-8.15.2_22.txz
  rehash

Then after trying to send a mail with::

  /usr/local/bin/sendEmail -f from@gmail.com -t to@gmail.com -u "Mail Subject" -m "Mail body write your content here." -s smtp.gmail.com:587 -xu <USERNAME> -xp <PASSWORD> -o tls=yes -a attachment.txt ;

  sendEmail[80603]: ERROR => No TLS support! SendEmail can't load required libraries. (try installing Net::SSLeay and IO::Socket::SSL)

The error tells it needs 2 additional libraries which in turn need
additional dependencies. So there is another set of packages which then
needs to be installed::

  pkg add http://pkg.freebsd.org/freebsd:11:x86:64/latest/All/p5-Net-SSLeay-1.88.txz
  pkg add http://pkg.freebsd.org/freebsd:11:x86:64/latest/All/p5-IO-Socket-IP-0.39.txz
  pkg add http://pkg.freebsd.org/freebsd:11:x86:64/latest/All/p5-Mozilla-CA-20180117.txz
  pkg add http://pkg.freebsd.org/freebsd:11:x86:64/latest/All/p5-Socket-2.029.txz
  pkg add http://pkg.freebsd.org/freebsd:11:x86:64/latest/All/p5-IO-Socket-SSL-2.068.txz
