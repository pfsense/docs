.. include:: /substitutions.rsti

Show States
===========

A list of active connection states may be viewed at **Diagnostics >
States**.

This will list all currently active connection states, with their
protocol, IP information, and state info.

The IP address information is printed showing the IP addresses involved
in a connection and the direction the connection was initiated. If only
two IP addresses are shown, it is a state to or from the pfSense box
itself. If three are shown, then NAT has been applied.

Each connection through the firewall will have two states: One entering
the firewall and one exiting the firewall. Only one of those states will
typically involve NAT.

The view can be filtered by typing some text into the **Filter
expression** box and pressing the **Filter** button. If an IP address or
CIDR-masked subnet is entered in to the **Filter expression** box, then
after filtering a **Kill** button will appear. Clicking the **Kill**
button will remove all states to and from the entered address.

Individual states can be removed by clicking |fa-trash| at the end of the row.
All states can be reset by using the :doc:`Reset States </firewall/reset-states>`
tab.

.. seealso:: :doc:`/firewall/increasing-the-state-table-size`
