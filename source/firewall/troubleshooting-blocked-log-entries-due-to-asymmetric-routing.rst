Troubleshooting Blocked Log Entries due to Asymmetric Routing
=============================================================

Asymmetric routing happens when traffic between two nodes takes a
different path in each direction (e.g. A->B->C, C->D->A), it can be a
problem for TCP which has strict state tracking but often does not
affect "stateless" protocols such as ICMP or UDP.

Common Scenario
---------------

What happens in most cases is this:

*  Client sends a TCP SYN packet, which arrives at pfSense and gets a
   state table entry
*  pfSense sends back an ICMP redirect letting the client know to reach
   the target server via the alternate gateway
*  Server sends back a TCP SYN+ACK packet by some other path that
   pfSense doesn't see
*  Client sends its ACK and further responses back by its other gateway
   that are not seen by pfSense
*  After 30 seconds, pfSense removes its state table entry as the
   connection was never completed as observed by pfSense
*  Some time later, the client's ICMP redirect learned route expires and
   the client sends another packet back to pfSense
*  Since this packet is not starting a new connection, the packet is
   dropped, and the client gets disconnected since it now has no way to
   reach the destination.

Automatic Fix
-------------

The **Bypass firewall rules for traffic on the same interface** option
located under **System > Advanced** on the **Firewall/NAT tab**
activates rules for traffic to/from the static route networks which are
much more permissive when it comes to creating states for TCP traffic
and allowing it to pass. The rules allow any TCP packets, regardless of
their flags, to create a state and also have the "*sloppy state*" type
set which performs a less strict state match.

Manual Fix
----------

The same rules may be created manually by adding one on the affected
**interface tab** (e.g. LAN), and a second rule on the **Floating tab**
using the same interface (LAN again) to match the traffic in the *out*
direction. The rule must be set for a protocol of *TCP*, under **TCP
flags** check *Any Flags*, and use a **State Type** of *Sloppy State*.
The options for **TCP flags** and **State Type** can be found in the
**Advanced Features** of the rules, under the normal options.

.. image:: /_static/firewall/asym_rule_advanced.png

Alternate Causes
----------------

On occasion these issues can be caused by other factors that lead to
asymmetric routing, such as issues with *route-to* or *reply-to*, both
having to do with gateways on interface settings.

Defining gateways under **System > Routing** does not cause this, but
rather these problems can come up when the gateway is improperly
configured on the interface pages, **Interfaces > WAN**, **Interfaces >
LAN**, and so on.

Gateway set when it should not be set
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If a gateway is set on an internal interface, such as LAN, it can cause
problematic behavior. Setting a gateway on an internal interface will
tag that interface's outbound rules with *route-to*, and inbound rules
with *reply-to* which will cause packets to be forwarded to the defined
gateway rather than following their natural path. For WANs this is
typically a good thing! For LANs it is not. Among other ill effects, it
can lead to a loop of sorts where packets bounce between the firewall
and the defined gateway, eventually being blocked or dropped when their
TTL expires.

Gateway not set when it should be set
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A gateway should usually be set on a WAN or other external-type
interface settings (MPLS, IP VPN, etc.) In these cases the *reply-to*
and *route-to* behavior is desired and likely required. If it is missing
the packets may be blocked or dropped as they attempt to leave the wrong
interface. A packet could enter via the alternate WAN, but the reply
would leave by the default gateway. Similar to the effect seen when
improperly using an :doc:`Interface Group </interfaces/interface-groups>` for WAN
interfaces.
