.. include:: /substitutions.rsti

Using Static Port with Outbound NAT
===================================

By default, pfSense rewrites the source port on all outgoing packets.
Many operating systems do a poor job of source port randomization, if
they do it at all. This makes IP spoofing easier, and makes it possible
to fingerprint hosts behind the firewall from their outbound traffic.
Rewriting the source port eliminates these potential (but unlikely)
security vulnerabilities. Source port randomization also allows NAT to
overload connections properly when multiple local clients need to reach
the same remote server IP address and port simultaneously.

However, rewriting the source port breaks some applications which
require the source port to remain unmodified. Notably, there are a
handful of protocols, including IPsec and some games, which suffer from
this limitation.

Automatic Outbound NAT rules on pfSense will retain the source port for
UDP 500 (ISAKMP for IPsec VPN traffic) by default because this traffic
will almost always be broken by rewriting the source port.

Setting Static Port using Hybrid Outbound NAT
---------------------------------------------

To disable source port rewriting, the **Static Port** option must be
used on outbound NAT rules. When crafting these rules, be as specific as
possible with the source, destination, and destination port to avoid
problems with other traffic

-  Navigate to **Firewall > NAT** on the **Outbound** tab
-  Select *Hybrid Outbound NAT*
-  Click **Save**
-  Click **Add** with the up arrow to add a rule to the top of the list
-  Set **Interface** to *WAN*
-  Set the **Protocol** to match the desired traffic (e.g. UDP)
-  Set the **Source** to match the local source of traffic, such as *LAN
   Net* or a specific device such as a game console IP address, or an
   alias containing multiple such devices
-  Leave the **Source Port** box empty, which indicates *any*
-  Set the **Destination** to match the traffic, if known, otherwise
   leave set to 'any'
-  Set the **Destination Port** to a specific port or port alias, if it
   is known, otherwise leave the box blank for *any*
-  Set the **Translation Address** to *Interface Address* or an
   appropriate VIP if needed
-  Check **Static Port** to indicate that traffic matching this rule
   will retain the original source port
-  Click **Save**
-  Click **Apply Changes**
-  Navigate to **Diagnostics > States**
-  Enter the IP address of the device in the **Filter** box if a
   specific source was used in the rule
-  Click **Filter**
-  Click **Kill**

Now connections matching that rule will have their source port retained.

Manual Outbound NAT
-------------------

This procedure can also be performed with **Manual Outbound NAT** rules
but using **Hybrid Outbound NAT** is easier because it allows the
automatic rules to be used rather than having to manually maintain all
outbound NAT rules.

When using manual mode, ensure that the copied or new rule is moved to
the top of the rule list. Rules are processed from the top down and the
first match is used. If the rule is below any other rule that can match
the same traffic, then the new rule would never be used.

Older/Upgraded Releases
-----------------------

pfSense 1.2.3 and older releases did not rewrite the source port on SIP
(UDP 5060) traffic, by default pfSense 2.0 and later do. If problems
with handsets are encountered on an older release, or on a configuration
originally generated on an older release, upgrade to a current version
of pfSense or manually adjust the outbound NAT rules.

