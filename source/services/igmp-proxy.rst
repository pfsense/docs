.. include:: /substitutions.rsti

Configuring the IGMP Proxy Daemon
=================================

The IGMP Proxy (**Services > IGMP Proxy**) will, as the name implies,
proxy IGMP traffic between network segments. Currently defined
interfaces are listed on the main page, and the entries can be managed from
there.

In order for the IGMP proxy to work properly an upstream interface and
one or more downstream interfaces must be defined. Only one upstream
interface may be defined.

When adding an IGMP Proxy interface, choose the **Interface** (eg WAN),
enter a **Description**, select the **Type** (either *Upstream* or
*Downstream*), and optionally enter a **Threshold** for the TTL to help
avoid looping.

**Network(s)** must also be defined to specify what is allowed to
communicate via the IGMP proxy. Add a new subnet by clicking |fa-plus|, then
type in an **IP address** and select a **CIDR** mask. To delete an
existing subnet, click |fa-trash|.

A firewall rule is also required on the downstream side (typically LAN)
that matches/passes this traffic which has the **Advanced Options**
checked to **Allow packets with IP Options**.
