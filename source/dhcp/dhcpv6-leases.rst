Viewing DHCPv6 Leases
=====================

A list of active and inactive **DHCPv6 Leases** (DHCP leases for IPv6
hosts) and delegated prefixes can be viewed in pfSense® software by 
navigating to **Status > DHCPv6 Leases**.

All active leases are shown, along with the IPv6 address, IAID, DUID,
MAC address, hostname, lease start and end times, lease type, and
whether or not the system is online. (As with the 
:doc:`NDP Table </monitoring/ndp-table>`,
this is not always a reliable indicator)

IPv6 hosts are identified by a combination of the Interface Association
Identifier (IAID) and the DHCP Unique Identifier (DUID). The DUID is
meant to be unique *per device* and the IAID is unique *per interface on
the device*. Due to variances in DHCPv6 clients between operating
systems and manufacturers some clients do not send an IAID, and some
DUID values are sized differently than others.

To view expired leases, click **Show All Configured Leases**. To switch
the view back, click **Show Active and Static Leases**.

A DHCPv6 static IP mapping may be added by clicking |fa-plus|. An offline
dynamic lease may be deleted by clicking |fa-trash|.

Delegated Prefixes
------------------

When **Prefix Delegation** is enabled, the bottom of the page lists
delegated prefixes and their routing. Similar to the lease status, the
DUID of the target system is shown along with the start and end time of
the delegation. The **IPv6 Prefix** column shows the delegated prefixes,
their prefix length, and the address to which they are routed. The
target address and DUID will match one of the leases in the list at the
top of the screen.
