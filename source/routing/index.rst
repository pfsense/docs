*********************
Routing and Multi-WAN
*********************

A core feature of any firewall or router is making decisions about where to send
packets. In pfSense® software, gateways are hosts which forward traffic to other
networks. Packets can be routed to a gateway based on their destination in a
traditional way (static routes), based on firewall rule matching criteria
(policy routing), or even to multiple gateways for load balancing or failover
(multi-wan).

.. toctree::
   :maxdepth: 1

   gateway-settings
   static-routes
   configuring-ipv6-router-advertisements
   using-multiple-wan-connections
   multi-wan-compatibility
   multi-wan
   multi-wan-for-ipv6
   multi-wan-openvpn
   directing-traffic-with-policy-routing
   bypassing-policy-routing
   load-balancing-uneven-multi-wan-connections
   viewing-routes
   list-of-routing-table-flags
   gateway-monitoring-errors
   no-buffer-space-available
   connectivity-troubleshooting
   troubleshooting-multi-wan
   troubleshooting-traceroute-output
   unable-to-access-some-websites

.. seealso:: There are also :doc:`Packages </packages/index>` which provide dynamic
   routing via protocols such as BGP and OSPF.
