Directing Traffic with Policy Routing
=====================================

Policy routing in `pfSense® software`_ refers to the capability of routing traffic by
matching it to specific firewall rules. This is primary used for multi-WAN, though
it has other uses as well.

Each firewall rule allows for the selection of a gateway. If none is selected,
traffic goes out the default gateway or follows the routing table. If additional
WAN interfaces or gateway groups are defined, these may be selected in the **Gateway**
field when adding or editing rules to direct matching traffic as desired.

.. seealso:: For more information, refer to the `Policy Routing Configuration`_ section
   of The pfSense Book.

.. _pfSense® software: https://www.netgate.com/solutions/pfsense/
.. _Policy Routing Configuration: https://docs.netgate.com/pfsense/en/latest/book/multiwan/policy-routing-configuration.html
