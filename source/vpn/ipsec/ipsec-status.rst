.. include:: /substitutions.rsti

IPsec Status
============

The status of all IPsec tunnels may be viewed by browsing to **Status >
IPsec**. This page is divided into four tabs.

Overview Tab
------------

This tab lists all enabled IPsec tunnels, the local and remote IP
addresses, local and remote networks, tunnel description, and status.

A green icon indicates that the tunnel is up (has SAD and SPD entries,
signifying a complete phase 1 and 2 connection).

A yellow icon indicates that the tunnel is not fully up and active.

SAD Tab
-------

Shows the contents of the IPsec Security Association Database. There
should be one for each "direction" between *public peer addresses* of an
active IPsec tunnel.

SPD Tab
-------

Shows the contents of the IPsec Security Policy Database. There should
be one for each direction between *private networks* of an active IPsec
tunnel.

Logs Tab
--------

A shortcut to the :doc:`IPsec Logs </vpn/ipsec/ipsec-logs>` normally found at **Status
> System Logs**, **IPsec** tab.

See Also

-  :doc:`IPsec Troubleshooting </vpn/ipsec/ipsec-troubleshooting>`

