.. include:: /substitutions.rsti

Firewall Rule Basics
====================

Firewall rules control what traffic is allowed to enter an interface on
the firewall. Once traffic is passed on the interface it enters an entry
in the state table is created. A state table entry allows through
subsequent packets that are part of that connection.

Firewall rules on Interface and Group tabs process traffic in the
Inbound direction and are processed from the top down, stopping at the
first match. Where no user-configured firewall rules match, traffic is
denied. Rules on the LAN interface allowing the LAN subnet to any
destination come by default. Only what is explicitly allowed via
firewall rules will be passed.

Firewall rules are managed at
**Firewall > Rules**. Multiple rules may be selected for some actions by
clicking on their row or checking the box at the start of their row.
Rules may be deleted or reordered in bulk in this way.

On the Firewall Rules page, there is a tab for each interface, plus a
tab for each active VPN type (IPsec, OpenVPN, PPTP), and a tab for
:doc:`Floating Rules </firewall/floating-rules>` which contains more
advanced rules that apply to multiple interfaces and directions.

Rule options are explained in detail on the rule editor screen. Be mindful of the default settings on the rule
editor, especially the protocol. New rules default to *TCP* only.

When entering addresses into firewall rules, the following choices are
given for the source and destination addresses. Some of these options
only appear in specific fields or circumstances, or if certain features
are enabled.

-  **any** - *0.0.0.0* to *255.255.255.255*, or all IPv6 addresses
-  **Single host or alias** - Select this and enter one IP address
   (*1.2.3.4*, *aa:bb:cc:dd::1*) or type the name of an Alias that has
   already been configured (**Firewall > Aliases**)
-  **Network** - Select this and enter a network and mask
   (*10.99.0.0/16*, *aa:bb:cc:dd::0/64*)
-  **LAN net** - The subnet configured on the LAN interface under
   **Interfaces > LAN**. On pfSense 2.2+, this also includes IP alias
   networks on that interface.
-  **LAN address** - The IP address configured on the LAN interface
   under **Interfaces > LAN**
-  **zzz Net** / **zzz address** - Works the same as LAN above but for
   other interfaces (WAN, OPT1, OPT2, etc.)
-  **WAN net** - Please note this is not the internet, this is just the
   network wan is connected to, just like lan, or opt net aliases above.
   If your ISP puts you on a x.x.x/21 network, or a /29 or a /24 that is
   the network this refers too.. Not the whole internet.
-  **PPTP clients** - Automatically locate and use the addresses of PPTP
   clients
-  **L2TP clients** - Automatically locate and use the addresses of L2TP
   clients
-  **This Firewall (self)** - Any IP address assigned to any interface
   on this firewall (pfSense 2.2+)

These macros are handy because they allow generic rules to be created
that refer to LAN or a specific interface. If that interface IP address
or subnet changes in the future, the rules will be rebuilt correctly and
they will not need manually adjusted.

.. seealso:: For fixing issues with firewall rules, see :doc:`Firewall Rule Troubleshooting </firewall/firewall-rule-troubleshooting>`.

