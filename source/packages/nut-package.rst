.. include:: /substitutions.rsti

Nut package
===========

.. sidebar:: NUT status screen

   .. image:: /_static/packages/nut-status-example.png

The NUT package provides a way to monitor an `Uninterruptable Power Supply`_
(UPS) using `Network UPS Tools`_ (NUT).

After installation, the package may be configured at **Services > NUT**.

Troubleshooting
---------------

The package does not have a lot of input validation in the GUI. If NUT
will not start after configuration, check the System log (**Status >
System Logs**) for log entries starting with ``nut:``. The culprit is likely
explained there, such as selecting a cable for a driver type that does
not need (nor permit) the cable selection.

If the system log doesn't offer adequate information, such as simply logging::

  nut: Service failed to start: check configuration

Log in via SSH and choose option ``8``, then run the following command::

  /usr/local/etc/rc.d/nut.sh start

Configuration errors will be displayed in the output if any are found.

.. _Network UPS Tools: http://www.networkupstools.org
.. _Uninterruptable Power Supply: https://en.wikipedia.org/wiki/Uninterruptible_power_supply