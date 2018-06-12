.. include:: /substitutions.rsti

Gateway Settings
================

A gateway is a system through which pfSense can reach the Internet or
another network, so if multiple WANs are in use, or multiple paths to
the Internet via different gateways, the associated gateways must be
defined. Gateways must also be defined for networks reachable via
:doc:`Static Routes </routing/static-routes>`.

Gateways are located at **System > Routing**, on the **Gateways** tab,
and they are managed from the list on that page.

Gateway Settings
----------------

When editing a gateway, the following settings may be defined:

-  **Interface**: The interface containing the subnet that includes the
   gateway.
-  **Address Family**: IPv4 or IPv6, to match the family of the IP
   address used for the gateway.
-  **Name**: No spaces or special characters allowed
-  **Gateway IP address**: The actual address of the gateway
-  **Default Gateway**: A checkbox to control whether this gateway is
   the default gateway for this **Address Family**. Only one gateway may
   be the default for either IPv4 or IPv6.
-  **Disable Gateway Monitoring**: A checkbox to prevent this gateway
   from being monitored by the **apinger** daemon. Useful for local
   gateways or WANs that do not need to be monitored.
-  **Alternative Monitor IP**: An address to ping via this gateway
   instead of the gateway itself. If the gateway is local, such as one
   directly on a CPE or modem, then pinging a remote address such as a
   DNS server is a better measure of how useful or alive the WAN may be.
-  **Description**: A longer description for reference.
-  **Advanced Options**: More detailed options to control the gateway.
   See Below.

Advanced Options
----------------

-  **Weight**: Weight for this gateway when used in a Gateway Group. See
   :doc:`How Can I Load Balance Uneven WAN Connections </routing/load-balancing-uneven-multi-wan-connections>`.
-  **Latency Thresholds**: An alarm and down threshold for latency,
   specified in milliseconds (ms). The default values are 200 (alarm)
   and 500 (down)
-  **Packet Loss Thresholds**: An alarm and down threshold for packet
   loss, specified in percentage (%). The default values are 10% (alarm)
   and 20% (down)
-  **Probe Interval**: How often an ICMP echo probe will be sent to the
   monitor IP address, in seconds. Default is 1 second.
-  **Down**: The number of seconds of failed probes before the alarm
   will fire. Default is 10, but higher values such as 30 or 60 may
   yield better results on unstable WANs.

Gateway Groups
--------------

Gateway groups are a set of gateways, but are treated as one entity in
gateway fields of the WebGUI.

Gateway groups are managed from the **Groups** tab on **System > Routing**.

When creating a gateway group, enter a group name, select a tier for
each gateway (or "never" if the gateway is not part of this group), a
trigger for when to exclude a group member, and an optional description.
Lower tiers are preferred over higher tiers (see the next section).

Groups will appear in the gateway drop-downs available on, for example,
firewall rule editing.

Tier Priority Explained
-----------------------

We assign tiers for each WAN connection.

Example:

-  WAN: Tier1
-  OPT1: Tier2
-  OPT3: Tier3

In the example above the OPT1 would be used if WAN fails, OPT3 will be
used if OPT1 also fails. So Tier1 has the highest priority.

Connection-Based Round-Robin Load Balancing
-------------------------------------------

It is also possible to perform connection-based round-robin load
balancing with the tier priorities.

Example:

-  WAN: Tier1
-  OPT1: Tier1
-  OPT3: Tier1

In the example above the connections with the same tier will perform
connection-based round-robin load balancing.

See Also
--------

:doc:`Multi-WAN Guide </routing/multi-wan>`
