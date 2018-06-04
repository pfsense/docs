.. include:: /substitutions.rsti

Using Cisco VPN Pass Through Behind pfSense
===========================================

If trouble is encountered when attempting a connection from an internal
Cisco VPN client to an external host, (e.g. a workstation with the Cisco
client is trying to get out through pfSense to connect to a “foreign”
site), then try the following.

Workaround
----------

-  In the Cisco VPN client software, Modify the connection and turn off
   transparent tunneling completely in the **Transport** tab.
-  In the pfSense, under **Firewall > NAT** on the **Outbound** tab,
   enable **Manual Outbound NAT**. Remove any NAT rules that perform
   static port NAT on udp/500.
