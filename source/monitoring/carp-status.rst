CARP Status
===========

The CARP status page located through the pfSense® webGUI at 
**Status > CARP (failover)** shows the current status of all configured CARP 
:doc:`Virtual IP addresses </firewall/virtual-ip-address-feature-comparison>`.
It also provides some controls to enable and disable CARP for
troubleshooting and maintenance.

For each VIP, the **Interface**, **Virtual IP**, and **Status** are
shown.

The **Interface** column shows the interface name or identifier for the
VIP at the operating system level. This has changed over the years, and
currently shows as "_vip" (ex: *lan_vip1*) on pfSense software version
2.1.x, and on pfSense software version 2.2, it shows as "@" (ex: *LAN@1*).

The **Virtual IP** column shows the IP address associated with the
entry.

The **Status** column shows **MASTER**, **BACKUP**, or **INIT**, which
are:

-  **MASTER**: Indicates this node is accepting all traffic for this VIP
-  **BACKUP**: Indicates this node is monitoring CARP advertisements and
   not accepting traffic for the VIP.
-  **INIT**: Generally indicates a problem with the VIP. Either the VIP
   is not configured at the OS level, or the interface upon which it is
   configured is down or has a problem.

A toggle button at the top of the list will show either **Disable CARP**
or **Enable CARP** depending on the current status. Disabling CARP will
remove the VIPs from the system, and the next available node will take
over as **MASTER** for the CARP VIPs. This setting is not remembered
across reboots.

On the primary node, each VIP should show **MASTER**. On the secondary
node, each VIP should show **BACKUP**. If both nodes show **MASTER**,
there is usually a problem at layer 2 (the switch) preventing the two
nodes from seeing each others' advertisements. See :doc:`CARP Configuration Troubleshooting </highavailability/troubleshooting-high-availability-clusters>`.

Maintenance Mode
----------------

On pfSense 2.2, in addition to the button to temporarily disable CARP as
is found on earlier versions, there is also a toggle button to **Enter
Persistent CARP Maintenance Mode** or **Leave Persistent CARP
Maintenance Mode**. This mode persists across reboots, so it is useful
for performing maintenance or upgrades on the primary node such that it
does not cause it to take back over prematurely before it is ready.

Widget
------

This is also a **CARP Status** widget available for the
:doc:`Dashboard </config/dashboard>` that shows the same information in a condensed
format without the control buttons.
