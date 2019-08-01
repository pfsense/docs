Troubleshooting ARP Move Log Messages
=====================================

pfSense® log entries may appear in the system log showing something similar
to the following::

  pfsense kernel: arp: 192.168.1.50 moved from c4:0c:5c:69:6c:05 to 62:1e:3e:43:04:0c on em1

This indicates that the firewall saw the specified IP address move between the
first MAC address and the second. This can happen for several reasons.

:IP address conflict: Two hosts are configured with the same IP address
:ARP poisoning: Someone on the network is ARP poisoning hosts
:NIC teaming: Some NIC teaming or bonding configurations will routinely log
   messages such as this because of the way they function. In these cases, this
   message is normal.
:IP address moved to a different host or NIC: If an actively used IP address is
   reassigned to a different device or different NIC, this message will be
   logged. This will only occur when an active IP is moved, for instance an
   expired DHCP lease that later is assigned to a different host will not
   trigger this as the IP must have an active ARP table entry on the firewall
   for this to occur.
:Apple Bonjour sleep proxy: `Apple's Bonjour sleep proxy
   <https://en.wikipedia.org/wiki/Bonjour_Sleep_Proxy>`__ will cause these logs
   to appear because of its network behavior. If both of the listed MAC
   addresses are Apple vendor MACs, this is likely why and can be disregarded as
   normal behavior.

This logging can be disabled by setting the tunable
``net.link.ether.inet.log_arp_movements`` to value ``0`` under **System >
Advanced**, **System Tunables** tab.
