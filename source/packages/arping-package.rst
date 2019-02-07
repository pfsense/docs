Arping Package
==============

`arping`_ is a utility to test the reachability and responsiveness of hosts
to ARP. It is effectively like ICMP ping, except using ARP instead. This
is beneficial in circumstances where the host has a firewall enabled
(every host even firewalled will respond to ARP), or there is no layer 3
connectivity on the IP subnet of the host and hence cannot ping, but do
have layer 2 connectivity.

The **arping** package can be very useful when trying to pick an unused
IP address for a subnet to which there is not yet a route or link, but
is connected at Layer 2.

.. seealso:: Visit the `arping website`_ for more information.

.. _arping: https://en.wikipedia.org/wiki/Arping
.. _arping website: http://www.habets.pp.se/synscan/programs.php?prog=arping
