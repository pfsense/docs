Floating Rules
==============

Floating Rules are advanced Firewall Rules which can apply in any
direction and to any or multiple interfaces. Floating Rules are defined
under **Firewall > Rules** on the **Floating** tab.

Many firewalls do not need any Floating Rules, or may only have them for
the traffic shaper. For those choosing to use them, they can make some
complex filtering scenarios easier, at the cost of being a little harder
to follow logically in the GUI.

More advanced/low-level options are available on Floating Rules than can
be found on normal per-interface rules.

Floating Rules can:

-  Filter traffic from the firewall itself
-  Filter traffic in the outbound direction (all other tabs are Inbound
   processing only)
-  Apply rules to multiple interfaces
-  Apply filtering in a "last match wins" way rather than "first match
   wins" (**quick**)
-  Apply traffic shaping to match traffic but not affect it's pass/block
   action
-  Much more.

Floating Rules are parsed before rules on other interfaces. Thus, if a
packet matches a floating rule and the Quick option is active on that
rule, pfSense will not attempt to filter that packet against any rule on
any other group or interface tab.

Rules using the *Queue* action do not work with **quick** checked.

