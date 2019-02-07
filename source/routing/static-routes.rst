Static Routes
=============

**Static Routes** on pfSense are managed at **System >
Routing**, on the **Routes** tab. A route may be added to any defined
:doc:`gateway </routing/gateway-settings>`. Ensure the gateway is present before
attempting to add a route.

Routes do not need to be added for networks which are directly connected
to any interface of the firewall, and doing so may cause problems. Only
define static routes for networks which must be reached via some other
gateway, but cannot be reached via the default gateway.

Never add static routes for networks reachable via OpenVPN. Such routes
are managed by OpenVPN itself using **Remote Network** definitions, not
static routes.

When adding a static route, enter a **Destination network** and CIDR
subnet mask, choose a **Gateway** by which this network can be reached,
and enter a **Description**.

Only actual gateways, not gateway groups, may be chosen for a static
route.

.. seealso::
   * :doc:`/vpn/ipsec/accessing-firewall-services-over-ipsec-vpns`
   * :doc:`Asymmetric Routing and Firewall Rules </firewall/troubleshooting-blocked-log-entries-due-to-asymmetric-routing>`
   * :doc:`Bypassing Policy Routing </routing/bypassing-policy-routing>`

