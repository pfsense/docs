Upgrading from versions older than pfSense 2.1
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. seealso:: For information about upgrading to current versions, see
   :doc:`upgrade-guide`.

.. warning:: Uninstalling **all** packages is **required** when upgrading from
   old releases. Packages **must be removed** before the upgrade is performed.
   After the upgrade is complete, packages can be reinstalled. Package
   configuration is automatically retained.

See the HA section at the end of this document for a High Availability-specific
pfsync note about pfSense® software version 2.1 upgrades.

The **State Killing on Gateway Failure** feature (**System > Advanced**,
**Miscellaneous tab**) now kills ALL states when a gateway has been detected as
down, not only states on the failing WAN. This is done because otherwise the
LAN-side states were not killed appropriately, and thus some connections would
be in limbo, especially SIP. Due to the change in its behavior, **State Killing
on Gateway Failure** is disabled by default in new configurations and is
disabled during upgrade to pfSense 2.1.x from 2.0.x or before regardless of the
user's previously chosen setting. If the feature is desired even with its new
behavior, it must be manually re-enabled post-upgrade.

The **Allow IPv6** checkbox is **NOT** changed on upgrade unlike it was in early
pfSense 2.1 BETA snapshots. This was changed so that the user's chosen existing
behavior is preserved. To allow IPv6 traffic after an upgrade, the setting must
be changed manually. This setting is located on **System > Advanced** on the
**Networking** tab. It defaults to allowed for new configurations.

Changes to policy route negation between pfSense 2.0.x and 2.1 may result in
local/private traffic hitting policy routing rules that would not have happened
on pfSense 2.0.x. This most commonly presents as an inability to reach local
networks after upgrading. The automatic policy route negation rules on pfSense
2.0.x were too lenient, and that behavior was corrected. To ensure proper
routing to other local interfaces, VPNs, or static route networks rules must be
added to the local interfaces to pass traffic to these destinations without a
gateway set. And that rule must be above any others that would match and have a
gateway set.

Upgrading High Availability Deployments
+++++++++++++++++++++++++++++++++++++++

If upgrading from any previous version of pfSense (1.2.x, 2.0.x, etc) to pfSense
2.1 or later in an HA environment, ensure that the pfsync interface has a rule
to pass the correct traffic for state synchronization to work properly. pfSense
2.1 removed the automatic pfsync rule, since the documentation always
recommended adding it manually and to add it behind the scenes with no way to
block it could be counter-productive and potentially insecure. If the
documentation was not followed, and a pfsync or allow all rule was not created
on the sync interface, state synchronization may break after this upgrade. Add
an appropriate rule to the sync interface and it will work again.

At a minimum, pass traffic of the *pfsync* protocol from a source of the
synchronization subnet to all cluster nodes.
