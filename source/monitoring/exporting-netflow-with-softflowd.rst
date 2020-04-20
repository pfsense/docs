Exporting NetFlow with softflowd
================================

softflowd is a NetFlow collector that can be deployed on pfSense® software.

Installing softflowd
--------------------

There is a package available under **System > Packages** on the
**Available Packages** tab. Find it in the list, click |fa-plus| at the end of
its row, and confirm the installation.

Configuring and Launching softflowd
-----------------------------------

Softflowd works similar to pfflowd.

Once the package has been installed, visit **Services > softflowd** to
configure the service.

-  **Interface**: Ctrl-click to select all of the interfaces from which
   NetFlow data should be gathered
-  **Host**: The target NetFlow server which will receive flow data
-  **Port**: The port on the **Host** which is listening for NetFlow
   data
-  **Max Flows**: The number of flows to track before older flows expire
-  **NetFlow Version**: The desired version of the NetFlow protocol. See
   `NetFlow Versions on
   Wikipedia <https://en.wikipedia.org/wiki/NetFlow#NetFlow_Versions>`__
   for more information.

Controlling softflowd from the Command Line
-------------------------------------------

To view statistics about the running softflowd process, run the
following command, replacing *em0* with the actual network interface to
query::

  : softflowctl -c /var/run/softflowd.em0.ctl statistics

To expire all flows and force an update to be sent to the netflow
server, run the following command, replacing *em0* with the actual
network interface to control::

  : softflowctl -c /var/run/softflowd.em0.ctl expire-all

Known issues
------------

.. seealso:: You can find a list of known issues with this package on the
   `pfSense bug tracker`_.

Package Support
---------------

This package is currently supported by |support_link| to those with an active
support subscription.

.. _pfSense bug tracker: https://redmine.pfsense.org/projects/pfsense-packages/issues?utf8=%E2%9C%93&set_filter=1&sort=id%3Adesc&f%5B%5D=status_id&op%5Bstatus_id%5D=o&f%5B%5D=category_id&op%5Bcategory_id%5D=%3D&v%5Bcategory_id%5D%5B%5D=98&f%5B%5D=&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=assigned_to&c%5B%5D=updated_on&group_by=&t%5B%5D=