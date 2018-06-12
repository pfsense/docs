.. include:: /substitutions.rsti

Troubleshooting High CPU Load
=============================

First, open a shell from ssh or the serial/VGA console (option *8*).

Run the following commands:

To view the top processes, including interrupt processing CPU usage and
system CPU::

  # top -aSH

To view the interrupt counters and other system usage::

  # systat -vmstat 1

To view the mbuf usage::

  # netstat -m

(Alternately, check the dashboard mbuf counter, and the graph under
**Status > RRD Graphs** on the **System** tab)

To view I/O operations::

  # systat -iostat 1

OR::

  # top -aSH

- Then press *m* to switch to I/O mode to view disk activity

Typically one of these commands will include some obvious consumer of
large amounts of system resources. For example, if the system CPU usage
is high, it may be pf. If a VPN process is using lots of CPU, the
hardware may not be able to process more VPN traffic. If it is a NIC,
see :doc:`Tuning and Troubleshooting Network Cards </hardware/tuning-and-troubleshooting-network-cards>`, etc.

If the solution is not obvious based on the output, post the collected
information on the forum or mailing list or contact support for further
assistance.
