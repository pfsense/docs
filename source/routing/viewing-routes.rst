Viewing Routes
==============

From the pfSense® webGUI, the routing table on the firewall can be
viewed at **Diagnostics > Routes**. IPv4 and IPv6 routes are
displayed.

Each line shows the destination network, gateway by which it can be
reached, routing flags, number of references and times the route has
been used, the MTU, and the interface through which the routed traffic
will go.

The list of routes supports pagination and filtering to aid with viewing
large routing tables such as those found with a full BGP feed.

-  **Name Resolution**: When checked, DNS will be consulted to show
   hostnames rather than IP addresses for route table entries. This will
   cause a delay and performance penalty.
-  **Number of rows**: By default, 100 rows are displayed. If this is
   too many or too few, choose a new value.
-  **Filter expression**: Search the route table for entries matching a
   specified string.
-  **Update**: Click this button to save settings and redisplay the
   routing table.

.. seealso:: :doc:`/routing/list-of-routing-table-flags`
