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

The latest version of the OpenBGP package includes a CARP status check
IP address in the settings. Place a CARP VIP there and Save the
settings. No additional patches or fixes are necessary.
