.. include:: /substitutions.rsti

Troubleshooting NAT Reflection
==============================

If an improperly specified NAT Port Forward exists it can cause problems
when `NAT Reflection is
enabled <Why_can't_I_access_forwarded_ports_on_my_WAN_IP_from_my_LAN/OPTx_networks>`__.

The most common way this issue arises is when there is a local web
server, and port 80 on the WAN is forwarded there. When NAT Reflection
is enabled, any connection made to an external web site comes up as the
internal web site instead.

To fix this, edit the NAT Port Forward for the offending port, and
change **External Address** to ***Interface Address*** instead of *any*.

If an external address of “any” is absolutely required, then NAT
Reflection will not be possible on this firewall and `Split
DNS <Why_can't_I_access_forwarded_ports_on_my_WAN_IP_from_my_LAN/OPTx_networks>`__
must be used instead.

