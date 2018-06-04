.. include:: /substitutions.rsti

ARP Table
=========

ARP (Address Resolution Protocol) is used for locating IPv4 systems on a
local network by MAC address.

The ARP table in pfSense displays a list of systems on the network that
have attempted to talk to or through the pfSense firewall within the
past few minutes. If a system is up but has not talked to (or through)
the pfSense firewall it will not show up in the ARP table.

To view the list of systems currently seen by pfSense, click
**Diagnostics > ARP Table**. This list shows the **IP Address**, **MAC
Address**, **Hostname** and the **Interface** where each system was last
seen.

For IPv6 hosts, see :doc:`NDP Table </monitoring/ndp-table>`.

