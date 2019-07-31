Filter Reload Status
====================

The current status of a filter reload may be viewed in the pfSense® 
webGUI at **Status > Filter
Reload**. A link to this page is available any time a filter change is
made. The progress of the reload is displayed automatically, and it is
updated automatically.

Normally, updates happen fast enough that ``Done.`` is the only message
shown, indicating that there are no pending changes. With larger
configurations, some delays are possible.

Press **Reload Filter** to initiate another filter reload. The progress
will be updated as the process progresses.

When configuration synchronization is enabled, a **Force Config Sync**
button is also present on this page. That button will trigger a forced
synchronization of the firewall configuration by XMLRPC to the node
specified by the :doc:`current configuration
</highavailability/configuring-high-availability>`.
