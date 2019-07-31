Using Multiple IPv4 WAN Connections
===================================

The setup described in this guide enables pfSense® software to load
balance or fail over traffic from a LAN to multiple Internet
connections (WANs). With load balancing, traffic from the LAN is
shared out on a connection-based round robin basis across the
available WANs. With failover, traffic will go out the highest
priority WAN until it goes down, then the next is used. pfSense
monitors each WAN connection, using either the gateway IP or an
alternate monitor IP address, and if the monitor fails it will
remove that WAN from use.

In most setups, there are only three parts that need to be done

-  Add gateway group(s) (**System > Routing**, **Groups** tab)
-  Use the gateway group(s) on LAN firewall rule(s)
-  Make sure at least one DNS server is set for each WAN gateway under
   **System > General**.

Interfaces
----------

Before starting, make sure all of the WAN-type interfaces are enabled.
For static IP WANs, make sure they all have a gateway set.

Make sure the gateway/monitor IP responds to ping to confirm that each
WAN is actually online and working before proceeding. This is visible
under **Status > Gateways** if gateways have been defined. If they're
green, the connection to the gateway is OK.

Gateways
--------

Ensure a gateway entry exists for each WAN interface (Check **System >
Routing**, on the **Gateways** tab)

Static IP WANs will have a normal gateway entry, DHCP/PPPoE/etc will
have a dynamic gateway entry.

Optional Tweaks
~~~~~~~~~~~~~~~

For every gateway there are some settings that can change their behavior
slightly with respect to multi-wan usage. Most people can leave these
set at the defaults, but others may need to alter them slightly based on
the quality of their WAN.

Monitor IP
^^^^^^^^^^

By default, pfSense softwarewill ping the gateway to determine the
quality of the WAN. In some cases, that is not an accurate measure.
For instance, if the WAN gateway is actually a device that is local
and not on the other side of the ISP circuit, then the actual WAN link
could be down and pinging the gateway would never show it. Also, if the
ISP gateway is up but the ISP experiences upstream failures, those
cannot be detected by pinging only the gateway.

A custom IP address can be entered to monitor here that will be used to
determine the WAN quality. A public website, Google public DNS, or any
IP on the Internet that responds to pings can be used. The downside is
that should that IP ever go offline, or suffer a failure of its own, the
WAN could be marked down when it's really up.

Weight
^^^^^^

By default all WANs on the same tier are considered equal when doing
load balancing. If the WANs are different speeds, the weight parameter
allows the system to give some bias toward a faster link. If one is a
50Mbit line and another is a 10Mbit line, sharing them equally is not
desirable as it would often leave the 50Mbit line underloaded and the
10Mbit line overloaded. The 50MBit line can be given a weight of 5 so
that there is a 5:1 ratio of usage to prefer the faster WAN.

Loss/Latency Thresholds
^^^^^^^^^^^^^^^^^^^^^^^

Every WAN is different in how it operates "normally". Some WANs have low
latency and no loss and are great, others perform normally even when
there is some loss registered on the line or higher latency. These
fields can be used to dial in link-appropriate values for what is
actually an alarm state for the WAN gateways. On some lossy cable lines,
increasing the loss percentage to 20 or more may be fine. On slow DSL or
satellite links, a few hundred ms of latency is fine. Watch the quality
graphs to get an idea of what is good/normal for any given WAN.

Gateway Groups
--------------

Gateway groups (**System > Routing**, **Groups** tab) are exactly what
the name implies. They group together gateways to act in a coordinated
fashion. They can perform load balancing, failover, or a mixture of the
two.

A common practice for a two-WAN setup is to make three gateway groups
for a multi-wan configuration: one that load balances, and two for
failover, one preferring each WAN. This could be expanded for any number
of WANs: Make one group that prefers each of them and fails over to some
ordering of other WANs. This will allow selectively putting traffic on
each WAN as well as load balancing.

Tiers
~~~~~

In a gateway group, each gateway is assigned to a tier to determine when
it is used. The lower tier numbers are preferred. If any two gateways
are on the same tier, they will load balance. If they are on different
tiers, they will do failover preferring the lower tier. If the tier is
set to "*Never*" then the gateway is not considered part of this group.

Trigger Level
~~~~~~~~~~~~~

-  Member Down

    Triggers when the monitor IP has 100% packet loss.

-  Packet Loss

    Triggers only when there is packet loss to a gateway higher than its
    defined threshold.

-  High Latency

    Triggers only when there is latency (delay) to a gateway higher than
    its defined threshold.

-  Packet Loss or High Latency

    Triggers for either of the above conditions.

Load Balancing
~~~~~~~~~~~~~~

When two gateways are on the same tier, they will load balance. This
means that on a per-connection basis, connections are routed over each
WAN in a round-robin manner. If any gateway on the same tier goes down,
it is removed from use and the other gateways on the tier continue to
operate normally.

Failover
~~~~~~~~

When two gateways are on different tiers, the lower tier gateway(s) are
preferred. If a lower tier gateway goes down, it is removed from use and
the next highest tier gateway is used.

Combinations
~~~~~~~~~~~~

Because of the tier system, is is possible to have any number of
combinations of load balancing and failover, such as One WAN that if it
goes down fails to two load balancing WANs that if both go down fail to
three load balancing WANs, and so on. The only limit is that there are
only 5 tiers so such configurations can only go 5 levels deep.

Firewall Rules
--------------

Defining gateway groups is only part of the story. Traffic must be
assigned to these gateways using the Gateway setting on firewall rules.

On **Firewall > Rules**, visit the tab for the internal interface to be
used with the gateway group, either edit the existing pass rules and add
the gateway setting, choosing the desired gateway, or add a new rule to
match only certain traffic to direct into the gateway group. Remember
that rules are processed from the top down, and once a rule is matched,
processing stops.

Certain traffic can be directed to one WAN with a failover group, match
some other traffic for another WAN, and let the catchall rule go to the
load balancer.

Policy Route Negation
~~~~~~~~~~~~~~~~~~~~~

When a firewall rule directs traffic into the gateway, it bypasses the
routing table on the firewall. Policy route negation is just a rule that
passes traffic to other local or VPN-connected networks that does not
have a gateway set. By not setting a gateway on that rule it will bypass
the gateway group and use the routing table on the firewall. These rules
should be at the top of the list -- or at least above any rules using
gateways.

Outbound NAT
~~~~~~~~~~~~

If using Manual Outbound NAT, rules must be added for the second WAN. If
the guidelines above have been followed, automatic outbound NAT should
need no adjustments.

DNS Considerations
------------------

At least one DNS server should be reachable on each WAN. This can be
accomplished by editing the DNS servers under **System > General** and
picking a gateway for each DNS server. Make sure that the DNS server
chosen for a given WAN will work there (i.e. it's public or from that
ISP). The system's DNS forwarder will query all DNS servers
simultaneously, so it should not be affected by a WAN failure.

If the DNS servers are hardcoded on the clients, this limitation isn't
relevant, however services on the firewall itself will still need DNS
and could become slow or fail waiting for DNS if there is not a
reachable DNS server.

Local Services
--------------

By default, traffic using a proxy such as Squid will bypass policy
routing and use the default route for traffic at all times. It also
bypasses expected outbound NAT and leaves via the WAN IP address
directly.

Policy routing traffic from the firewall itself is not currently
possible, and as such, load balancing is not possible. Failover can be
achieved in many cases by using default gateway switching under **System
> Advanced** on the **Miscellaneous** tab.

Troubleshooting
---------------

-  Check gateway status on the Dashboard widget or **Status > Gateways**
-  If failures are triggered too often, check quality graphs and adjust
   a gateway's packet loss and/or latency thresholds.
-  If local or VPN traffic fails, :doc:`ensure policy route negation rules are present </routing/bypassing-policy-routing>`.
-  If traffic always uses the default gateway instead of WAN, check the
   rules to make sure it's actually hitting a rule with a gateway
   defined.
