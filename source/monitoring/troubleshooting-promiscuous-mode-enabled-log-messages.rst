.. include:: /substitutions.rsti

Troubleshooting "promiscuous mode enabled" Log Messages
=======================================================

The following log messages are recorded when a utility has placed the
network card into “promiscuous mode”::

  Feb 10 01:41:58    kernel: vr0: promiscuous mode disabled
  Feb 10 01:41:57    kernel: vr0: promiscuous mode enabled
  Feb 10 01:41:54    kernel: vr0: promiscuous mode disabled
  Feb 10 01:41:54    kernel: vr0: promiscuous mode enabled
  Feb 10 01:41:50    kernel: vr0: promiscuous mode disabled

Promiscuous mode is a mode where the network card will receive every
packet on the interface, regardless of the target MAC address, in order
to monitor traffic. This is normal if for utilities such as *tcpdump*.
