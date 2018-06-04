.. include:: /substitutions.rsti

Bypassing Policy Routing
========================

The Multi-WAN capability of pfSense uses the *route-to* functionality in
pf to direct traffic out via specific gateways. Rules that match traffic
to send connections out a specific WAN can cause local or VPN traffic
destinations to exit the firewall WAN rather than following local
routing, which is likely not the intended effect.

To ensure proper delivery of local or VPN routed traffic, or other
external traffic that must obey the system routing table, rules must be
crafted to pass the traffic *without a gateway set*.

An example:

In **Firewall > Rules**, on the **LAN Tab**, create this as the
*topmost* rule, or at least above all other rules that have a gateway
configured:

-  **Proto**: \*
-  **Source**: \*
-  **Port**: \*
-  **Destination**: *192.168.1.0/24* (LAN Subnet, or DMZ subnet, or VPN
   subnet, etc.)
-  **Port**: \*
-  **Gateway**: \* (Default)

The destination could also be an Alias containing all local/VPN
networks. Commonly, an RFC1918 alias is created and used in such rules
to match all possible privately numbered traffic. Such an RFC1918 alias
should contain *192.168.0.0/16*, *172.16.0.0/12*, and *10.0.0.0/8*.
