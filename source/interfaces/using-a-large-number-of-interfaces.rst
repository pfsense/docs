Using a Large Number of Interfaces
==================================

There is no limit we are aware of. There are multiple installations with
more than 50 interfaces (VLANs). If there are many interface tabs, a
drop-down list is presented. There may be some quirks in the GUI with
certain themes, and some areas may take longer to display and process,
but it does function. We have received reports of systems with thousands
of interfaces that are still usable.

OS Issues
---------

Most hardware should not have trouble and will accommodate as many
interfaces as can fit into the case. Historical issues with multiple
cards largely do not exist any longer, but may vary from driver to
driver. With a large number of physical interfaces, the number of mbufs
will need to be increased, sometimes very high. See
:doc:`Tuning and Troubleshooting Network Cards </hardware/tuning-and-troubleshooting-network-cards>`.
