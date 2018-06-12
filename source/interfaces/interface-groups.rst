.. include:: /substitutions.rsti

Interface Groups
================

Interface Groups can contain rules that apply to multiple interface at
once. Rules applied to groups only affect current group members, so when
an interface is removed from a group, rules for that group no longer
apply.

Interface groups can be managed
from the list view at **Interfaces > (assign)**, on the **Interface
Groups** tab.

-  **Group Name** is the name of the group as it will appear in the GUI,
   such as on firewall rule tabs.
-  **Description** is a longer description for reference
-  **Member(s)** is the list of interfaces that belong to the group. To
   add new members, click |fa-plus| then pick the interface for this group
   from the list and repeat that process for additional group members.
   Click |fa-trash| to remove a member from the group.

Processing Order
----------------

Rules for Interface Groups are processed *after* Floating rules, but
*before* interface tab rules. See :doc:`Firewall Rule Processing Order </firewall/firewall-rule-processing-order>`

Limitations
-----------

Using Interface Groups for WANs will not put "reply-to" on the resulting
pass rules because it can't do so for rules in groups. Due to this,
traffic that enters via an alternate WAN (non-default route) and is
allowed by pass rules on an interface group will exit back via the
default route. This only applies to rules that pass traffic, blocking is
fine either way.

To keep the proper return routing, place pass rules for inbound services
behind the firewall on their respective WAN tabs, and not on the group
tab.
