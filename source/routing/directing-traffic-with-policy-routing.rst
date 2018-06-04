.. include:: /substitutions.rsti

Directing Traffic with Policy Routing
=====================================

Policy routing in pfSense refers to the capability of routing traffic by
matching it to specific firewall rules. Each firewall rule allows
selection of a gateway. If none is selected, traffic goes out the
default gatway or follows the routing table. If additional WAN
interfaces (`OPT WAN <OPT_WAN>`__) or gateway groups are defined, these
may be selected in the Gateway field when adding or editing rules to
direct matching traffic as desired. This is primary used for multi-WAN,
though it has other uses as well.
