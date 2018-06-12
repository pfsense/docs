.. include:: /substitutions.rsti

Firewall Rule Troubleshooting
=============================

There are times when a firewall rule does not seem to work as expected.
Did it block too many things? Did it allow too many things? Were there
no changes at all? Hopefully this will help.

Check the Logs!
---------------

Review the filter logs, which can be found under **Status > System
Logs**, on the **Firewall** tab. The log will show if a packet is
blocked, and if so, why. Click the action icon (|block| or |pass|) at
the *far left* and the rule which caused the packet to be blocked will
be displayed. If it says "Default Deny", and the packet should have been
allowed, then it did not match any rule in the ruleset.

Interface Selection
-------------------

Be sure that the rules are on the proper interface. Imagine sitting
inside of the pfSense box. Sure, it's a little crowded in there, but
this can help. Imagine packets flying in from the different networks
that the pfSense box ties together. The rules will be placed on the
interface they entered *from*. If a packet is going from the LAN to the
pfSense box, then out to the Internet, the rules still enter on the LAN.
If a packet is coming from the Internet to the pfSense box, the rule
goes on the WAN interface.

Rule Ordering
-------------

Firewall rules are generally processed starting with Floating Rules,
then Interface Group rules, then Interface tab rules. See :doc:`Firewall Rule Processing Order </firewall/firewall-rule-processing-order>` for more details.

If a floating rule with **quick** checked passed the traffic, then a
block rule on an interface would have no chance to match the traffic.

Protocol
--------

The protocol to which the rule will apply must be specified. Most often,
this is TCP, UDP, or ICMP, but other protocols such as ESP, AH, and GRE
are regularly encountered when dealing with VPNs. Some confusion arises
when a person is really unsure of what protocol to use. A rule set with
TCP may not work because the application being filtered may actually use
UDP instead. When in doubt, try using TCP/UDP.

NAT Confusion
-------------

When crafting rules for systems involving NAT, remember to use the
**private IP address** as the Destination. This applies for port
forwards as well as 1:1 NAT

Source and Destination Ports
----------------------------

When crafting rules, bear in mind that typically only a source *or* a
destination port needs to be specified, and rarely both (honestly the
source port rarely matters at all). For example, to allow ssh access to
the pfSense box, only specify a destination port of 22. The source port
of the client will be random.

Dangling States
---------------

If a new rule was made to block some traffic, but packets still get
through, there may be an existing state that is allowing the traffic to
pass.

To eliminate this as the cause, clear the states (**Diagnostics >
States**, **Reset States** tab) after altering the rules. If there is an
existing state, it will always take precedence over any rules. All of
the states may be cleared, or look/filter through the list and find
states that apply to the host that will be originating the traffic.

Unfilterable Traffic
--------------------

Some things cannot be filtered. Not because pfSense isn't capable, but
because they actually do not touch pfSense at all. A prime example of
this is trying to keep one system on the LAN from accessing another
system on the same LAN. This isn't possible if both clients are on the
same subnet and switch; In that case, the routing of packets is handled
at the switch level, and pfSense has no knowledge of the traffic. If
there is a need to control access in this way, the systems in question
should be on separate interfaces on the pfSense firewall. When on
different "legs" of the network, their traffic will route through the
pfSense system, and full control of the flow can be attained.

Port Forward *pass* action
--------------------------

When creating a port forward, if the *pass* action was selected when
designating an associated firewall rule, that will bypass firewall rules
and pass the traffic directly through without filtering. Change the
setting to create an associated rule and then arrange the block rule
above the resulting pass rule.

UPnP / NAT-PMP passed traffic
-----------------------------

If :doc:`UPnP/NAT-PMP </services/configuring-upnp-and-nat-pmp>` is enabled and a LAN
system opened a port to the world, the traffic may still get in even if
it appears it should otherwise be blocked.

Asymmetric Routing
------------------

If reply traffic such as TCP:A, TCP:SA, or TCP:RA is shown as blocked in
the logs, the problem could be asymmetric routing. See :doc:`Asymmetric Routing and Firewall Rules </firewall/troubleshooting-blocked-log-entries-due-to-asymmetric-routing>`
for more info.

Ruleset Loading
---------------

It is also possible that the rules are not being loaded properly.
Typically this would result in a notification in the GUI, however some
manual tests can be performed to check what is happening.

From the GUI, visit Status > Filter Reload. Press the **Reload Filter**
button and wait to see if the process returns to say "Done." or if it
stops. If it stops, for example in a particular package, then there may
be a problem with that package.

The ruleset can also be verified from the console or **Diagnostics >
Command** in the **Shell Execute** box by running::

  pfctl -f /tmp/rules.debug

If an error is displayed, it may have an obvious fix, or search for that
error to find possible resolutions.
