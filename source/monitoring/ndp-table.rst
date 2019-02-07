NDP Table
=========

The **NDP Table**, found under the **Diagnostics** menu, shows the IPv6
Neighbor Discovery Protocol list. This list contains all of the current
IPv6 peers, and is roughly analogous to the :doc:`ARP Table </monitoring/arp-table>`
for IPv4.

The NDP table shows the peer's IPv6 address, its MAC address, the
Hostname (if known), and the interface upon which that peer IP address
was last observed.

As with ARP, these are only the hosts that are actively talking to or
through the firewall, and is not a perfect indicator of a host's actual
online status. If a host is in the table, it is likely online, but if it
is not in the list, it does not necessarily mean that it is offline, it
may simply not have attempted external communication recently.

