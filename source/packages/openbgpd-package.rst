.. include:: /substitutions.rsti

OpenBGPD package
================

The OpenBGPD package allows the BGP routing protocol to be used with
pfSense.

Resources
---------

http://www.openbsd.org/cgi-bin/man.cgi?query=bgpd.conf

http://www.openbsd.org/papers/linuxtag06-network.pdf

Using in combination with CARP
------------------------------

The OpenBGPD package may be used in combination with CARP. It's
generally best to have two BGP sessions with each provider, one from
each firewall, and set the *nexthop* in the BGP network statement to a
CARP IP on the interconnect subnet with that upstream provider.

On pfSense 2.1.x and before
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Another option is to use “*local-address *” and “*depend-on carpX*”.
This way the bgpd daemon on the secondary node only starts connecting
when CARP has failed over (when the CARP VIP enters a MASTER state).
This is likely to be disruptive to connectivity during failover where
the option described above will not be.

On pfSense 2.2 through 2.2.2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The latest version of the OpenBGP package includes a CARP status check
IP address in the settings. Place a CARP VIP there and Save the
settings.

If the daemon is not automatically stopped, use the :doc:`System Patches </development/system-patches>`
package to add the following patch, which has a fix for the CARP plugin script events:

-  http://files.atx.pfsense.org/jimp/patches/carp-status-fix.diff

On pfSense 2.2.3+
~~~~~~~~~~~~~~~~~

The latest version of the OpenBGP package includes a CARP status check
IP address in the settings. Place a CARP VIP there and Save the
settings. No additional patches or fixes are necessary.
