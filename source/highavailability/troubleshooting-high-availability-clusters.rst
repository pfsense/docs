Troubleshooting High Availability Clusters
==========================================

There are typically five main problems that arise from using CARP that
cause failures: Using duplicate VHIDs, use of the wrong subnet mask on a
CARP VIP, attempting to use a CARP VIP outside the interface subnet, 
a switch (virtual or real) improperly handling the required traffic for
CARP, or a misconfigured base and skew value for virtual IP addresses.

Conflicting VHIDs
-----------------

The `VHID determines the virtual MAC address used by that CARP
IP <https://docs.google.com/spreadsheet/ccc?key=0AojFUXcbH0ROdHB0Q1ZxalJiVFdFRjdfSkpsMkNwT2c&usp=sharing>`__.
The input validation in pfSense® software will not permit using
conflicting VHIDs on a single pair of systems, however if there are
multiple systems on the same broadcast domain running CARP, it's possible
to create a conflict. VRRP also uses the same virtual MAC address scheme,
so a VRRP IP using the same VRID as a CARP IP VHID will also generate the
same MAC address conflict.

When using CARP on the WAN interface, this also means VRRP or CARP used
by the ISP can also conflict. Be sure to use VHIDs that are not in use
by the ISP on that broadcast domain.

Incorrect Subnet Mask
---------------------

The second sometimes needs to have the point beat home, which is to use
**REAL** subnet mask for the IP address. Don't use /32.

No Interface IP in that subnet
------------------------------

The third is that the CARP IP must already have another IP defined on a
interface (vlan, lan, wan, opt) before it can be utilized. An IP Alias
may be utilized to allow a CARP IP in an additional subnet on a single
interface.

On 2.2 and later, this issue no longer exists. CARP addresses may be
added without an existing address in the same interface.

Hypervisor users (Especially VMware ESX/ESXi)
---------------------------------------------

The below settings are specifically for VMware ESX/ESXi but similar
settings may be present on Hyper-V, VirtualBox, and other similar
hypervisors.

#. Enable promiscuous mode on the vSwitch
#. Enable **MAC Address changes**
#. Enable **Forged transmits**
#. If multiple physical ports exist on the same vswitch, the
   Net.ReversePathFwdCheckPromisc option must be enabled to work around
   a vswitch bug where multicast traffic will loop back to the host,
   causing CARP to not function with "link states coalesced" messages.
   (See below)

ESX VDS Promisc Workaround
^^^^^^^^^^^^^^^^^^^^^^^^^^

If a Virtual Distributed Switch is in use, a port group can be made for
the firewall interfaces with promiscuous mode enabled, and a separate
non-promiscuous port group may be used for other hosts. This has been
reported to work by users on the forum as a way to strike a balance
between the requirements for letting CARP function and for securing
client ports.

ESX VDS Upgrade Issue
^^^^^^^^^^^^^^^^^^^^^

If a VDS (Virtual Distributed Switches) is used in ESX 4.0 or 4.1 and an
**upgrade** from 4.0 to 4.1 or 5.0 is performed, the VDS will not
properly pass CARP traffic. If a new VDS is **created** on 4.1 or 5.0,
it will work, but the upgraded VDS will not.

It is reported that disabling promiscuous mode on the VDS and then
re-enabling it will resolve the issue.

ESX VDS Port Mirroring Issue
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If port mirroring is enabled on a VDS, it will break promiscuous mode.
To fix it, disable promiscuous mode, then re-enable promiscuous mode.

Client Port Issues
^^^^^^^^^^^^^^^^^^

If a physical CARP cluster is connected to a switch with an ESX box
using multiple ports on the ESX box (lagg group or similar), and only
certain devices/IPs are reachable by the target VM, then the port group
settings in ESX may need adjusted to set the load balancing for the
group to hash based on IP, not the originating interface.

Side effects of having that set incorrectly include:

-  Traffic only reaching the target VM in promisc mode on its NIC
-  Inability to reach the CARP IP from the target VM when the "real" IP
   of the primary firewall is reachable
-  Port forwards or other inbound connections to the target VM work from
   some IPs and not others.

Changing Net.ReversePathFwdCheckPromisc
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Login VMware vSphere Client

For each VMware host

* Click on host to configure and select **Configuration** Tab
* Click **Software Advanced Settings** in left pane
* Click on **Net** and scroll down to **Net.ReversePathFwdCheckPromisc** and
  set to `1`
* Click **OK**

Promiscuous Mode interfaces need to be set now or twiddled off and then
back on. This is done per host by clicking Networking in the Hardware
section

* For each vSwitch and/or Virtual Machine Port Group.

  * NOTE: If Promiscuous is already enabled it must be disabled, saved
    and then re-enabled, saved.
  * Click on **Properties** of vSwtich
  * By Default Promiscuous Mode is **Reject**.
  * To Change click **Edit > Security** Tab
  * Select **Accept** from drop down
  * Click **OK**.

* However, this setting is usually applied per Virtual Machine Port
  Group (More Secure) where the VSwitch is left at default to Reject.

  * **Edit > Security > Policy Exceptions**
  * Uncheck Promiscuous Mode
  * Click **OK**
  * **Edit > Security > Policy Exceptions**
  * Check Promiscuous Mode and select **Accept**.

`More information available from
VMware <http://www.vmware.com/support/vsphere4/doc/vsp_esx40_u2_rel_notes.html>`__

VMware Workstation
^^^^^^^^^^^^^^^^^^

If using VMware workstation on Linux for testing/modeling and CARP does
not function, it is likely because VMware workstation is running
non-root and cannot set the vmnet adapter in Promiscuous mode.

The permissions on ``/dev/vmnet*`` should be changed such that the user
running VMware workstation is allowed to modify the ``/dev/vmnet*``
devices. See `the VMware KB for
details <http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=287>`__.

To make the change permanent, edit **/etc/init.d/vmware**, and in function
**vmwareStartVmnet()**, add commands to **chgrp** and **chown** the vmnet
devices to a group which contains user running VMware Workstation.

KVM+QEMU Issues
---------------

Be sure to use e1000 NICs (em(4)), not the ed(4) NICs or CARP VIPs will
never leave init state.

VirtualBox Issues
-----------------

From `this thread <https://forum.netgate.com/post/43928>`__:

* Setting **Promiscuous mode: Allow All** on the relevant interfaces of
  the VM allows CARP to function on any interface type (Bridged,
  Host-Only, Internal)

Switch/Layer 2 Issues
---------------------

#. Ensure that the interfaces on both boxes (The WANs, LANs, etc, etc)
   are connected to the proper switch/vlan/layer 2.
#. If the units are plugged into separate switches, ensure that the
   switches are properly trunking and passing broadcast/multicast
   traffic.
#. If the switch on the back of a modem/CPE is being used, try a real
   switch instead. These built-in switches often do not properly handle
   CARP traffic. Often plugging the firewalls into a proper switch and
   then uplinking to the CPE will eliminate problems.
#. Disable IGMP snooping or other multicast limiting and inspecting
   features. If they are already off, try enabling the feature and
   disabling it again. We have received reports of at least one Dell
   switch firmware mishandling multicast even with igmp snooping
   disabled until it is toggled, such as::

     ip igmp snooping
     no ip igmp snooping
#. For STP/RSTP enabled switch ports, enable PortFast/Edge Port (or vendor equivalent) on switch to ensure there is no startup delay passing traffic on the port.

CARP Configuration Errors
-------------------------

Virtual IP misconfiguration
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Review each ``type: CARP`` virtual IP address at **Firewall > Virtual IPs** 
on primary and backup node.
  
* **base** values must match (default value 1).

* **skew** values must be different.

  * Typically primary node is 0 and backup node is 100.

* Typical symptoms of a matching skew include:
  
  * A primary node that fails to automatically resume master status from a secondary node.
  * Random CARP state changes.

Verify **Persistent CARP Maintenance Mode** is not active on any of the nodes 
at **Status > CARP (failover)**.  In maintenance mode, the skew for all CARP
virtual IP(s) on the node is overridden to 254, and the node with the higher
skew will be demoted.

If all nodes are put into maintenance mode, skews will match at 254, causing 
unpredictable CARP state changes between the nodes.
    
Gathering more information
--------------------------

Review **Status > System Logs** on both primary and secondary nodes to look
for events surrounding state changes, including demotions 
(i.e. ``carp: demoted by X to X``), port up/down, etc.

Go to **Diagnostics > Command Prompt** and execute **ifconfig** on both nodes.
Review interfaces where CARP is configured and confirm the ``carp:`` lines are 
showing the expected MASTER, vhid, advbase and advskew values.  For example::

  carp: MASTER vhid 1 advbase 1 advskew 0

Compare the ``carp:`` values between primary and secondary.  If advskew is 254, 
persistent CARP maintenance mode is likely enabled, see 
**Status > CARP (failover)** to disable.

Execute ``sysctl -a | grep carp`` from **Diagnostics > Command Prompt** to
verify configured system tunables and carp status.  If
``net.inet.carp.demotion`` value is non-zero, then the node has demoted
itself.  The cause needs to be investigated (possibly layer 2 network 
issues - a bad cable, bad switch port configuration, etc).

.. seealso:: For assistance in solving problems, post on the `HA/CARP/VIPs
   category of Netgate Forum`_.

.. _HA/CARP/VIPs category of Netgate Forum: https://forum.netgate.com/category/32/ha-carp-vips
