Troubleshooting Traffic Shaping Graphs
======================================

The RRD for traffic shaping graphs must be reset when a change is made
to the traffic shaper settings. The RRD files are in a very specific
format and refer to the number and name of the queues as they exist in
the shaper configuration. Should this data change, the RRD file data
becomes invalid and must be reset.

Therefore any time a traffic shaper setting is changed, the *queue* and
*queuedrops* graphs are reset in order to ensure that the RRD schema
matches up with the current shaper configuration.

