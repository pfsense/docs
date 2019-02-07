Troubleshooting Offline DHCP Leases
===================================

The **Status > DHCP Leases** page only reports systems as "online" if
the MAC address for a given system appears in the pfSense firewall's ARP
table. This can be verified by checking **Diagnostics > ARP Table**.
Systems that have not communicated with or via the firewall in the past
few minutes will appear as offline.

To check a system, try to ping it from **Diagnostics > Ping**. Even if
the system does not respond to ping, that action will cause the system
to appear in the ARP table if it is on the network, and would thus show
online in the DHCP Leases list.

The :doc:`/packages/arping-package` may also be of interest. It is available under
**System > Packages**. The :doc:`/packages/nmap-package` can also be used to perform an
ARP-based subnet scan to locate online hosts even if they don't respond
to ICMP.

