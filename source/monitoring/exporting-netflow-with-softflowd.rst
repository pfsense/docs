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

