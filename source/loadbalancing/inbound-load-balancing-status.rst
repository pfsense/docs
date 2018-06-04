.. include:: /substitutions.rsti

Inbound Load Balancing Status
=============================

The status page for :doc:`/loadbalancing/inbound-load-balancing`
has two tabs, **Pools** and **Virtual Servers**.

Pool Status
-----------

The **Pools** tab shows the status of individual servers inside of
pools. The servers are grouped by the **Name** of the pool. Also
displayed is the **Mode** of the pool, typically *Load Balancing*, the
**Monitor** type.

The **Servers** column contains the list of servers and their uptime
percentage as tracked by relayd. Servers that are *UP* are colored
green, and servers that are *DOWN* are colored red.

Checkboxes next to each server IP address indicate whether or not a
server is active in a pool. If the box is checked, the sever is active.
Servers may be manually deactivated from a pool by removing the
checkmark from the box next to the IP address. **Save** and then **Apply
Changes** must be clicked to activate the change. This is useful for
performing maintenance or development on one server from a pool without
affecting others.

Virtual Server Status
---------------------

The **Virtual Servers** tab lists all of the defined virtual servers,
their external **Address** and port, the list of active pool
**Servers**, the general **Status** of the virtual server, and the
configured **Description**.

Virtual Servers that are *UP* show the status as green, and servers that
are *DOWN* are red. A Virtual Server would normally only show *DOWN* if
all of its regular and fallback pool members were down.

