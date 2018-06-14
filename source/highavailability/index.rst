.. include:: /substitutions.rsti

*****************
High Availability
*****************

pfSense is capable of having multiple nodes act as a cluster for **High
Availability**. This article is a brief overview. The **Hardware
Redundancy** chapter in the `pfSense
book <https://www.pfsense.org/our-services/gold-membership.html>`__
should be consulted before configuring a high availability cluster
utilizing CARP.

Settings for High Availability are found under **System > High Avail.
Sync**, and sometimes on other areas that have special handling
(Vouchers, packages, etc.).

Often such collections of hosts are referred to as "CARP Clusters" but
CARP is only one aspect. High Availability is achieved using a
combination of multiple related techniques, including CARP, State
Synchronization (pfsync), and Configuration Synchronization (XMLRPC
Sync).

CARP
----

Common Address Redundancy Protocol (**CARP**) is used by multiple nodes
to "share" a :doc:`Virtual IP address </firewall/virtual-ip-address-feature-comparison>`
between multiple nodes in such a way that if the preferred node fails,
another will take over seamlessly.
`CARP <http://en.wikipedia.org/wiki/Common_Address_Redundancy_Protocol>`__
was originated by OpenBSD as an Open Source Alternative to the
patent-encumbered VRRP.

CARP utilizes multicast, so care must be taken that the switches
properly handle and do not block, filter, or limit multicast.

State Synchronization
---------------------

State Synchronization is handled by **pfsync** which transmits state
table information (contents, insertions, deletions, etc) to other nodes
on a private/shared interface so that connection states are valid across
all nodes. This way if a node fails and another takes over, user
connections continue to flow and clients do not need to reconnect.

Configuration Synchronization
-----------------------------

Configuration Synchronization is handled by **XMLRPC Sync** which is a
mechanism of pfSense that allows transmitting certain configuration
information and commands between nodes. Typically the primary node will
synchronize its configuration areas to a secondary node.

Common Requirements
-------------------

For a cluster to function, a few things are required, such as:

-  Minimum of three IP addresses per subnet (one for primary, one for
   secondary, one or more for CARP VIPs) -- This can be avoided on
   pfSense 2.2, but is still recommended.
-  A dedicated interface for state and configuration synchronization.
   For security reasons it is best to keep this isolated, though it
   could be run on a local network interface it is not advised.
-  Layer 2 equipment that properly handles multicast
-  Upstream/ISP/other involved routers that properly respect the
   addresses used by CARP.

Bringing it All Together
------------------------

pfSense makes it easy to set these areas up to create a High
Availability cluster. The full details are available in the book linked
above. A brief run-through of a basic CARP configuration may be found
at: :doc:`Configuring pfSense Hardware Redundancy (CARP)
</highavailability/configuring-high-availability>`

For other aspects of High Availability and CARP, see the links below to
the related categories.

.. toctree::
   :maxdepth: 1

   configuring-high-availability
   redundant-firewalls-upgrade-guide
   troubleshooting-high-availability-clusters
   troubleshooting-vpn-connectivity-to-a-high-availability-secondary-node
   troubleshooting-xmlrpc-configuration-synchronization
   carp-cluster-with-bridge-troubleshooting
   dhcp-failover-troubleshooting
