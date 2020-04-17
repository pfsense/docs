Troubleshooting High CPU Load
=============================

First, open a shell from SSH or the serial/VGA console (option ``8``).

Typically one of these commands will include some obvious consumer of
large amounts of system resources. For example, if the system CPU usage
is high, it may be the packet filter. If a VPN process is using lots of CPU, the
hardware may not be able to process more VPN traffic. If it is a NIC,
see :doc:`/hardware/tuning-and-troubleshooting-network-cards`, etc.

If the solution is not obvious based on the output, post the collected
information on the forum or contact support for further assistance.

View CPU Processes
------------------

To view the top processes, including interrupt processing CPU usage and
system CPU::

  top -aSH

View Interrupt Counters
-----------------------

To view the interrupt counters and other system usage::

  systat -vmstat 1

View mbuf Usage
---------------

To view the mbuf usage::

  netstat -m

.. note:: Alternately, check the dashboard mbuf counter, and the graph under
   **Status > Monitoring** on the **System** tab.

View I/O Operations
-------------------

To view I/O operations::

  systat -iostat 1

Or::

  top -aSH

Then press ``m`` to switch to **I/O mode** to view disk activity.
