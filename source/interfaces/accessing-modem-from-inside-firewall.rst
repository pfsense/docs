.. include:: /substitutions.rsti

Accessing modem from inside firewall
====================================

Some DSL or cable modems have web interfaces on private IP addresses.
Since these sit outside the firewall and don't have a public IP,
accessing them isn't as straight forward as it might seem. The firewall
is typically assigned a public IP, and sends all outbound traffic
upstream to the ISP. The ISP won't route the private subnet back to the
modem, leaving it unreachable. This page describes the work around
needed to access the management interface on the modem from the inside
of the network.

Note: The modem's management IP **must** be on a different IP subnet
than the internal network. If it is not, attempts to connect to it will
never go to the firewall to be routed out to the modem, as hosts on the
internal network would try to connect to it on the local network and
fail.

Configure a new Interface
-------------------------

A PPPoE WAN is actually assigned to a virtual PPPoE adapter, not the
physical port.

Under **Interfaces > (assign)**, create a new *OPT* interface, and
assign it to the physical network card that is on WAN. For example, if
the WAN on the assignment page is "*PPPOE0(re2)*", choose *re2*, and
**Save** the changes.

Go to **Interfaces > (new OPT interface)**, and **Enable** the
interface. Give it an IP address in the same subnet as the modem, such
as 192.168.1.5/24. Do not set a gateway. Rename the interface to
*ModemAccess* or a similar useful name.

Configure NAT
-------------

Now NAT needs to be configured to translate traffic destined to the
modem to the new interface. This is necessary so the modem sees the
traffic sourced from an IP on its local subnet. Without this NAT, it
would be necessary to configure a route on the modem so it knows how to
reach the internal subnet. With some modems this isn't possible, and in
most cases it's easier to NAT the traffic so routing isn't a concern. To
add the NAT, browse to **Firewall > NAT**, and click the **Outbound**
tab. Switch to **Manual Outbound NAT** and click **Save**. A rule for
LAN to WAN is automatically added.

Click |fa-plus| to add a new Outbound NAT rule. For **Interface**, specify
*ModemAccess*. For **Source**, specify *Network*, with the LAN subnet
entered. The **Destination** is the IP subnet of the modem. In the
**Translation** box, select *Interface Address*.

Then click **Save** and **Apply changes**.

It should now be possible to access the modem from LAN.
