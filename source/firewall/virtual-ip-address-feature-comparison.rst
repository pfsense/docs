Virtual IP Address Feature Comparison
=====================================

Virtual IPs add knowledge of additional IP addresses to the firewall
that are different from the firewall's actual "real" interface
addresses. Most often, these are used for NAT, but they can also be used
for other functions such as clustering, binding services such as DNS,
load balancing in packages, and so on.

Below is a table representing the major features of each type of VIP.
More detailed explanations are located in the section after the table.

VIP Features Table
------------------

+-------------+-----------+-------+-----------+----------+--------------+-------------+---------------+----------+----------------+
| VIP Type    | Version   | NAT   | Binding   | ARP/L2   | Clustering   | In Subnet   | Subnet Mask   | ICMP     | Single/Range   |
+=============+===========+=======+===========+==========+==============+=============+===============+==========+================+
| CARP        | 1.x+      | Yes   | Yes       | Yes      | Yes          | 2.2+ (3)    | Yes           | Yes      | Single         |
+-------------+-----------+-------+-----------+----------+--------------+-------------+---------------+----------+----------------+
| Proxy ARP   | 1.x+      | Yes   | No        | Yes      | No           | No          | n/a           | No (1)   | Either         |
+-------------+-----------+-------+-----------+----------+--------------+-------------+---------------+----------+----------------+
| Other       | 1.x+      | Yes   | No        | No       | Yes (2)      | No          | n/a           | No (1)   | Either         |
+-------------+-----------+-------+-----------+----------+--------------+-------------+---------------+----------+----------------+
| IP Alias    | 2.0+      | Yes   | Yes       | Yes      | See Notes    | No          | See Notes     | Yes      | Single         |
+-------------+-----------+-------+-----------+----------+--------------+-------------+---------------+----------+----------------+

Notes:

#. ICMP Column represents responses from the firewall itself without
   NAT. With 1:1 NAT, any VIP will pass ICMP through to the target
   device. On 2.1+ ICMP can also be used as a protocol in port forward
   entries.
#. "Other" type VIPs are for routed subnets, and CARP is irrelevant,
   so they work (See below)
#. CARP type VIPs must be in the same subnet as other interface VIPs
   on pfSense® software version <=2.1.x, on >= 2.2 they may be in other
   subnets, but see below for caveats.

Virtual IP Feature Details
--------------------------

It's difficult to express the actual capabilities in a table format, so
here is a more thorough overview of the various types and what they
can/cannot do.

CARP
~~~~

-  **Can** be used for NAT.
-  **Can** be used by the firewall itself to bind/run services.
-  Generates ARP (Layer 2) traffic for the VIP.
-  Can be used for clustering (master firewall and standby failover
   firewall.)
-  Must be in the **same subnet** as an IP address on the interface
   (real interface IP or IP alias.) on pfSense software version 
   2.1.x and previous versions.

   -  CARP VIPs may be in other subnets on pfSense software version 
      2.2-RELEASE and later, but we still recommend using the old
      method where possible for better connectivity and less
      potential issues.

-  **Will** respond to ICMP ping if allowed by firewall rules.
-  Must be added individually.
-  Subnet mask **must** match the interface IP.
-  Generates its own MAC address for the VIP. This MAC is different than
   its physical parent interface.

Proxy ARP
~~~~~~~~~

-  **Can** be used for NAT.
-  **Cannot** be used by the firewall itself to bind/run services.
-  Generates ARP (Layer 2) traffic for the VIP.
-  Can be in a **different subnet** than the real interface IP.
-  **Will not** respond to ICMP ping.
-  Can be added individually or as a subnet to make a group of VIPs.

Other
~~~~~

-  **Can** be used for NAT.
-  **Cannot** be used by the firewall itself to bind/run services.
-  Can be used if routed to the firewall without needing ARP/Layer 2
   messages. (e.g. Upstream provider routes a subnet to the WAN IP)
-  Can be in a **different subnet** than the real interface IP.
-  **Will not** respond to ICMP PING.
-  Can be added individually or as a subnet to make a group of VIPs. (As
   of 2.1)
-  Can be used with CARP, e.g. subnet routed to external CARP VIP.

IP Alias
~~~~~~~~

-  Available in version 2.0 and later.
-  **Can** be used for NAT.
-  **Can** be used by the firewall itself to bind/run services.
-  Adds extra IP addresses to an interface.
-  Generates ARP (Layer 2) traffic for the VIP.
-  Can be in a **different subnet** than the **real** interface IP when
   used directly on an interface.
-  **Will** respond to ICMP ping if allowed by firewall rules.
-  Must be added individually
-  Subnet mask should match the interface IP, or be /32. Matching the
   interface subnet is advised. For IPs in different subnets at least
   one IP alias VIP **must** have the correct mask for the new subnet.
-  Can be stacked on top of a CARP VIP to bypass VHID limits and lower
   the amount of CARP heartbeat traffic.

   -  Stacked IP Alias VIPs will synchronize via XMLRPC.
   -  Stacked IP Alias VIPs must be inside the same subnet as the CARP
      VIP upon which they are placed.

-  Can be used with CARP to add additional subnets to CARP, e.g. Add one
   unique IP Alias from the new subnet to each node, then add CARP VIPs.
   Must be added to each node individually as these will not synchronize
   via XMLRPC or else an IP conflict would occur.
-  Can be bound to localhost on version 2.1 or later for binding
   services in routed subnets. IP Alias VIPs bound to localhost will
   synchronize via XMLRPC

Implications
------------

Some upstream equipment requires each distinct IP address to have a
unique MAC address. In such cases, the use of CARP VIP types may allow
the additional addresses to function where they otherwise would not work
with IP alias or Proxy ARP VIPs. This has been common to see in the past
with AT&T Uverse equipment.

The MAC address of a VIP will change if the VIP entry is changed between
a type that has a unique MAC address, such as CARP, to one that shares a
MAC address with a parent interface, such as IP alias or Proxy ARP. Due
to the MAC address change, other equipment on the segment may need to
have its ARP cache cleared, it may need to be rebooted (cable modems
especially), or there may be some other time period that must expire for
the ARP cache to update. This may be as few as a couple minutes or up to
four hours.

If a particular configuration does not work with IP alias or Proxy ARP
type VIPs, try with a CARP VIP instead, or vice versa. Address or wait
out the potential ARP concerns before declaring one particular type a
failure, and always be on the lookout for IP conflicts.

