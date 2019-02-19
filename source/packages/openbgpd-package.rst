OpenBGPD package
================

The OpenBGPD package allows the BGP routing protocol to be used with
pfSense.

Resources
---------

- http://www.openbsd.org/cgi-bin/man.cgi?query=bgpd.conf
- http://www.openbsd.org/papers/linuxtag06-network.pdf

Using in combination with CARP
------------------------------

The OpenBGPD package may be used in combination with CARP. It's
generally best to have two BGP sessions with each provider, one from
each firewall, and set the *nexthop* in the BGP network statement to a
CARP IP on the interconnect subnet with that upstream provider.

The latest version of the OpenBGP package includes a CARP status check
IP address in the settings. Place a CARP VIP there and Save the
settings. No additional patches or fixes are necessary.

.. seealso:: You can find a list of known issues with the OpenBGPD package
   on the `pfSense bug tracker`_.

.. _pfSense bug tracker: https://redmine.pfsense.org/projects/pfsense-packages/issues?utf8=%E2%9C%93&set_filter=1&sort=id%3Adesc&f%5B%5D=status_id&op%5Bstatus_id%5D=o&f%5B%5D=category_id&op%5Bcategory_id%5D=%3D&v%5Bcategory_id%5D%5B%5D=68&f%5B%5D=&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=assigned_to&c%5B%5D=updated_on&group_by=&t%5B%5D=

