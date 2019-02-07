Troubleshooting NAT Reflection
==============================

If an improperly specified NAT Port Forward exists it can cause problems
when :doc:`NAT Reflection is enabled </nat/accessing-port-forwards-from-local-networks>`.

The most common way this issue arises is when there is a local web
server, and port 80 on the WAN is forwarded there. When NAT Reflection
is enabled, any connection made to an external web site comes up as the
internal web site instead.

To fix this, edit the NAT Port Forward for the offending port, and
change **External Address** to ***Interface Address*** instead of *any*.

If an external address of "any" is absolutely required, then NAT
Reflection will not be possible on this firewall and :doc:`Split DNS
</nat/accessing-port-forwards-from-local-networks>` must be used instead.

