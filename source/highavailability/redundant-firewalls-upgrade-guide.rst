.. include:: /substitutions.rsti

Upgrading High Availability Clusters
====================================

This page provides guidance on upgrading redundant firewalls (CARP, pfsync,
XMLRPC config sync) across major versions of pfSense. Upgrading from one version
to another generally follows the this procedure, exceptions are noted later in
the page.

* Review changelog/blog/upgrade guide
* Take a backup from both nodes. **Do not skip this step!**
* Upgrade secondary as described in the :doc:`Upgrade Guide </install/upgrade-guide>`
* Test secondary to be sure it is operating OK -- expected packages present,
  services running, no obvious errors in logs, etc
* Switch CARP to maintenance mode on primary from **Status > CARP**
* Ensure traffic is still flowing properly and that the network is functional.
  If it is not, then exit maintenance mode on the primary, fix the secondary
  then try again.
* Upgrade primary as described in the :doc:`Upgrade Guide </install/upgrade-guide>`
* Check primary to ensure it upgraded OK -- expected packages present, services
  running, no obvious errors in logs, etc
* Exit maintenance mode on primary
* Test again

XMLRPC Config Sync Considerations
---------------------------------

Older versions prior to 2.2.5 do not properly check the version of the opposing
node being synced, so they will overwrite pieces of a newer configuration with
the wrongly formatted old config structure. This means upgrading the primary may
be preferable as the later version will not sync its configuration to the older
version to avoid the problems that happen when syncing the wrong configuration
version.

Upgrade either the primary or the secondary first, leaving the other on the
older version until testing is complete.

If the secondary will be upgraded first, first remove the **Synchronize Config
to IP address**, **Remote System Username**, and **Remote System Password** from
the HA settings. On 1.2.x and 2.0.x this is under **Firewall > Virtual IPs**,
**CARP Settings** tab. On 2.1.x and 2.2.x this is under **System > High Avail
Sync**. After the upgrade procedure is complete on **both** nodes, replace these
settings.

pfsync considerations
---------------------

The underlying pfsync protocol often changes between FreeBSD versions, for
example FreeBSD 7.2 (1.2.3) and 8.3 (2.1) and 10.1 (2.2) and 10.3 (2.3), so
these versions cannot sync their states between each other. Failover will still
function, but not stateful failover so all existing connections will be dropped.

pfsync on pfSense 2.2.x and later
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

On pfSense 2.2-RELEASE and later, states contain information about the interface
to which they are bound. If the interfaces do not line up on both nodes then the
states will not properly sync, for example if WAN is ``igb0`` on one unit and
``em0`` on the other.

Adding interfaces to LAGGs can work around this, since then the states would be
bound to the lagg on each node rather than the underlying interface. For
example, ``lagg0`` on primary contains ``igb0``, ``lagg0`` on secondary contains
``em0``, but the states are on ``lagg0`` for both so sync will function.

CARP considerations
-------------------

CARP is generally the same between versions and will fail over and back as
expected.
