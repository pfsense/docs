.. include:: /substitutions.rsti

**************
Traffic Shaper
**************

pfSense supports multiple methods of traffic shaping / Quality of Service (QoS).
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

What is traffic Shaping?
''''''''''''''''''''''''

.. epigraph::

   Traffic shaping (also known as "packet shaping") is the control of computer
   network traffic in order to optimize or guarantee performance, lower latency,
   and/or increase usable bandwidth by delaying packets that meet certain
   criteria. More specifically, traffic shaping is any action on a set of
   packets (often called a stream or a flow) which imposes additional delay on
   those packets such that they conform to some predetermined constraint (a
   contract or traffic profile).

   -- From the `Wikipedia article on Traffic Shaping`_

.. _Wikipedia article on Traffic Shaping: https://en.wikipedia.org/wiki/Traffic_shaping
