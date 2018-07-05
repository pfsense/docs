.. include:: /substitutions.rsti

**************
Traffic Shaper
**************

pfSense supports multiple methods of `traffic shaping`_ / Quality of Service (QoS).
The two supported methods for configuring traffic shaping are ALTQ and Limiters,
both of which are described in this section.

In either case, connections are classified based on matching firewall rules.

.. toctree::
   :maxdepth: 1

   traffic-shaping-guide
   limiters
   traffic-shaping-upnp-connections
   diffserv
   troubleshooting-traffic-shaping-graphs

.. _traffic shaping: https://en.wikipedia.org/wiki/Traffic_shaping
