Firewall Rule Processing Order
==============================

Rules in pfSense are processed in a specific order. Understanding this order is
especially important when crafting more complicated sets of rules and when
troubleshooting. This document is intended to give a *general* idea of how rules
are processed. It can be much more complicated, especially when :doc:`floating
rules are involved </firewall/floating-rules>` and *out* direction rules are
used.

.. seealso:: See the |book_link| for more in-depth information.

Short Version
-------------

Rules are always processed from the top of a list down, first match wins. The
only exception to that is floating rules without ``quick`` set, which is
discussed in the next section.

The tl;dr version of **user-defined** rule processing is:

* Rules defined on the :doc:`floating tab </firewall/floating-rules>` are
  processed first
* Rules defined on interface group tabs (Including IPsec and OpenVPN) are
  processed
* Rules defined on interface tabs (WAN, LAN, OPTx, etc) are processed last

Longer Version
--------------

More accurately, the following order (still simplified) is found in the ruleset
(Check ``/tmp/rules.debug``):

* Outbound NAT rules
* Inbound NAT rules such as Port Forwards (including ``rdr pass`` and UPnP)
* NAT rules for the Load Balancing daemon (``relayd``)
* Rules dynamically received from RADIUS for IPsec and OpenVPN clients
* Internal automatic rules (pass and block for various items like lockout,
  snort, DHCP, etc.)
* User-defined rules:

  * Rules defined on the :doc:`floating tab </firewall/floating-rules>`
  * Rules defined on interface group tabs (Including IPsec and OpenVPN)
  * Rules defined on interface tabs (WAN, LAN, OPTx, etc)

* Automatic VPN rules

Floating Rules notes
--------------------

Floating rules without ``quick`` set process as "last match wins" instead of
"first match wins". Therefore, if a floating rule is set without ``quick`` and a
packet matches that rule, then it also matches a later rule, the later rule will
be used. This is the opposite of the other tab rules (groups, interfaces) and
rules with ``quick`` set which stop processing as soon as a match is made. See
:doc:`/firewall/floating-rules` for more details on how floating rules operate.
