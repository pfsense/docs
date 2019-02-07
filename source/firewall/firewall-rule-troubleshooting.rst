Firewall Rule Troubleshooting
=============================

There are times when a firewall rule does not seem to work as expected. Did it
block too many things? Did it allow too many things? Were there no changes at
all? Use this document to figure out what went wrong.

Check the Logs!
---------------

Review the filter logs, found under **Status > System Logs**, on the
**Firewall** tab. The log will show if a packet is blocked, and if so, why.
Click the action icon (|fa-times| or |fa-play|) at the *far left* and the GUI
will show the rule which caused the packet to be blocked. If it says "Default
Deny", and the packet should have been allowed, then it did not match any rule
in the ruleset.

Interface Selection
-------------------

Be sure that the rules are on the proper interface. Imagine sitting inside of
the firewall. Sure, it's a little crowded in there, but this can help. Imagine
packets flying in from the different networks that the firewall ties together.
The rules will be placed on the interface they *entered from*. If a packet is
going from the LAN to the firewall, then out to the Internet, the rules checked
by the firewall are on the **LAN** interface tab. If a packet is coming from the
Internet to the firewall, the corresponding rule goes on the **WAN** interface
tab.

Rule Ordering
-------------

Firewall rules are generally processed as follows:

* Floating Rules
* Interface Group rules
* Interface tab rules

.. seealso:: See :doc:`/firewall/firewall-rule-processing-order` for more
   details.

If a floating rule with **quick** checked passed the traffic, then a block rule
on an interface would have no chance to match the traffic.

Protocol
--------

The protocol to which the rule will apply must be specified. Most often,
this is TCP, UDP, or ICMP, but other protocols such as ESP, AH, and GRE
are regularly encountered when dealing with VPNs.

Confusion arises when a firewall administrator is unsure of what protocol to
use. A rule set with TCP may not work because the application being filtered may
actually use UDP instead. When in doubt, try using TCP/UDP.

NAT Confusion
-------------

When crafting rules for firewalls involving inbound NAT connections, remember to
use the **private IP address** as the Destination. This applies for port
forwards as well as 1:1 NAT

Source and Destination Ports
----------------------------

When crafting rules, bear in mind that typically only a source *or* a
destination port needs to be specified, and rarely both. In the majority of
cases, the source port does not matter at all. For example, to allow ssh access
to the firewall, only specify a **destination** port of ``22``. The source port
of the client will be random.

Dangling States
---------------

If a new rule was made to block traffic, but packets still get through, there
may be an existing state that is allowing the traffic to pass.

To eliminate this as the cause, clear the states after altering the rules
(**Diagnostics > States**, **Reset States** tab). If an existing state is
present, it will always take precedence over any rules. All of the states may be
cleared, or look/filter through the list and find states that apply to the host
that will be originating the traffic.

Unfilterable Traffic
--------------------

Certain traffic cannot be filtered. Not because pfSense isn't capable, but
because they actually do not touch the firewall at all. A prime example of this
is trying to keep one device on the LAN from accessing another device on the
same LAN. This is not possible if both clients are on the same subnet and
switch; In that case, the routing of packets is handled at the switch level
(layer 2), and the firewall has no knowledge of the traffic. If there is a need
to control access in this way, the devices in question must be on separate
firewall interfaces. When on different "legs" of the network, their traffic will
route through the firewall, the firewall will have full control of the flow.

Port Forward *pass* action
--------------------------

When creating a port forward, the *pass* action will bypass firewall rules and
pass the traffic directly through without filtering. Change the setting to
create an associated rule and then arrange the block rule above the resulting
pass rule.

UPnP / NAT-PMP passed traffic
-----------------------------

If :doc:`UPnP/NAT-PMP </services/configuring-upnp-and-nat-pmp>` is enabled and a
LAN device opens a port to the world, the traffic may still get in even if it
appears it should otherwise be blocked.

Asymmetric Routing
------------------

If reply traffic such as ``TCP:A``, ``TCP:SA``, or ``TCP:RA`` is shown as
blocked in the logs, the problem could be asymmetric routing. See
:doc:`/firewall/troubleshooting-blocked-log-entries-due-to-asymmetric-routing`
for more info.

Ruleset Loading
---------------

It is also possible that the rules are not being loaded properly. Typically this
would result in a notification in the GUI, however manual tests can be
performed to check.

From the GUI, visit **Status > Filter Reload**. Click |fa-refresh| **Reload
Filter** wait for the process to stop, then scroll to the bottom of the page to
see if the last line says ``Done.`` or if it stops. If it stops, for example in
a particular package, then there may be a problem with that package.

The ruleset can also be verified from the console or **Diagnostics > Command**
in the **Shell Execute** box by running::

  pfctl -f /tmp/rules.debug

If an error is displayed, it may have an obvious fix, or search for that error
to find possible resolutions.
