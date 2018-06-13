.. include:: /substitutions.rsti

Firewall Logs
=============

The Firewall logs at **Status > System Logs** on the **Firewall** tab
show all events logged by the firewall. By default, this includes
connections blocked by the default deny rule.

How to Read the Logs
--------------------

Each entry is displayed with the action (|fa-play| pass or |fa-times| block,
reject is only logged as block), time, interface, source, destination, and
protocol.

The action icon depicts the action taken on the connection. |fa-times| indicates
a block action, |fa-play| indicates a pass action. Hover over the link for a
text description if the meaning of the icon is not clear. Clicking on the action
icon will produce a box that shows which rule caused the action. Using the
**Settings** tab, these rule descriptions may also be shown in a separate column
of the rules, or on a second line.

The |fa-info| icon next to the source and destination addresses will attempt to
reverse resolve the IP address into a hostname via DNS.

The |fa-minus-square-o| icon next to the source address will add a full block
for traffic coming from that IP address via `Easy Rule <Easy_Rule>`__. The
|fa-plus-square-o| icon next to the destination address also invokes `Easy Rule
<Easy_Rule>`__, and will add a pass rule for traffic of this protocol, going
from the source IP address to the destination IP address on the destination
port.

If the logged entry is from a TCP connection, the TCP flags may also be
displayed. For more information, see `What are TCP Flags? <What_are_TCP_Flags?>`__.

.. seealso:: `Logs show "blocked" for traffic from a legitimate connection, why? <Logs_show_"blocked"_for_traffic_from_a_legitimate_connection,_why?>`__

Firewall Log Dynamic View
-------------------------

The dynamic firewall log view works like the normal Firewall Logs view
except it is updated every few seconds using AJAX.

Firewall Log Summary View
-------------------------

The firewall log summary view produces pie charts which summarize the
log data. Each item is listed with a chart and a table containing the
top five entries in the chart, and "other".

Summarized data includes actions, interfaces, protocols, source IPs,
destination IPs, source ports, and destination ports.

The full content of the log is used to summarize the data, not just the
part displayed in the Firewall Logs view.

Disable Default Block Logging
-----------------------------

To disable logging of blocked packets from the default deny rule, go to
to **Status > System Logs**, **Settings** tab, then uncheck **Log
packets blocked by the default rule** and Click **Save**.
