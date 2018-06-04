.. include:: /substitutions.rsti

Static Mappings Inside DHCP Pools
=================================

While ISC dhcpd will allow a static mapping to be defined inside the
DHCP range/pool, it can result in unexpected behavior.

ISC dhcpd only checks via ping to ensure that an IP is not actively in
use when making assignments. Making a static mapping does not “reserve”
that IP out of the pool. The static mapping in this case merely
represents a preference for an IP and others are not prevented from
taking the IP if it is not in use.

An example: If the DHCP pool is from 192.168.0.10 to 192.168.0.250, and
a static mapping is defined for 192.168.0.25. If the PC that normally
has 192.168.0.25 is ever offline another device could be assigned
192.168.0.25. When the other machine powers back up it will not be able
to get 192.168.0.25 because it is currently in use.

As such, it is best to only make assignments outside the range/pool, and
the pfSense WebGUI enforces this practice.

If assignments absolutely must be made inside the pool, and the risks
involved are worth taking and want to do so anyway, the input validation
check may be removed from the PHP file that drives the DHCP editor page.
The details of this unsupported change are left out as an exercise for
the reader.

