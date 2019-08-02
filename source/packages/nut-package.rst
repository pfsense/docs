Nut package
===========

.. sidebar:: NUT status screen

   .. image:: /_static/packages/nut-status-example.png

The NUT package provides a way to monitor an `Uninterruptable Power Supply`_
(UPS) using `Network UPS Tools`_ (NUT).

After installation, the package may be configured at **Services > UPS**.

Troubleshooting
---------------

The package does not have a lot of input validation in the webGUI. If NUT
will not start after configuration, check the System log from the pfSense®
webGUI from **Status > System Logs**) for log entries starting with 
``nut:``. The culprit is likely explained there, such as selecting a cable
for a driver type that does not need (nor permit) the cable selection.

If the system log doesn't offer adequate information, such as simply logging::

  nut: Service failed to start: check configuration

Log in via SSH and choose option ``8``, then run the following command::

  /usr/local/etc/rc.d/nut.sh start

Configuration errors will be displayed in the output if any are found.

.. seealso:: You can find a list of known issues with the NUT package
   on the `pfSense bug tracker`_.

.. _Network UPS Tools: http://www.networkupstools.org
.. _pfSense bug tracker: https://redmine.pfsense.org/projects/pfsense-packages/issues?utf8=%E2%9C%93&set_filter=1&sort=id%3Adesc&f%5B%5D=status_id&op%5Bstatus_id%5D=o&f%5B%5D=category_id&op%5Bcategory_id%5D=%3D&v%5Bcategory_id%5D%5B%5D=33&f%5B%5D=&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=assigned_to&c%5B%5D=updated_on&group_by=&t%5B%5D=
.. _Uninterruptable Power Supply: https://en.wikipedia.org/wiki/Uninterruptible_power_supply
