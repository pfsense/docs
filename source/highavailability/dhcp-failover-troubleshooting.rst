.. include:: /substitutions.rsti

Troubleshooting DHCP Failover
=============================

#. The system time on both cluster nodes must be within 90 seconds of
   drift of each other otherwise the time difference will be too large
   and the DHCP daemon processes will not communicate.
#. Look at the pool status section at **Status > DHCP leases**. All
   defined pools (often 1 per interface) are listed here. If any of the
   pools are in a state other than "normal", then debug the problem.
#. If interfaces have been used and then removed they could be out of
   sync between the two nodes, which can lead to inconsistencies in the
   failover numbering and can make certain configurations fail. This
   should be fixed on current releases, but in some cases may still
   require hand-edit corrections to ``config.xml`` to make sure primary
   and secondary nodes match.
#. Stop and restart the DHCP daemon from **Status > Services** on both
   nodes and check the status after a few moments
#. Both nodes must be running the same version of pfSense. Update both
   nodes to the newest available release if they do not match. Older
   versions may have problems with various aspects of DHCP failover that
   have already been corrected.
#. If all else fails, stop the DHCP daemon on both nodes, remove the
   DHCP lease database from ``/var/dhcpd/var/db/dhcpd.leases*``, then
   start the daemons again.

