.. include:: /substitutions.rsti

Routing Information Protocol (RIP)
==================================

The Routing Information Protocol (RIP) daemon is a dynamic routing
protocol which, when coupled with other routers that also have RIP
enabled, will allow automatic route updates between them.

To enable RIP on pfSense, install the package and then navigate to
**Services > RIP**. Check the box to **enable** the service, ctrl-click
to select **Interfaces** to which RIP will bind, select a **RIP
version**, and enter a **RIPv2 password** if using RIP version 2.

See Also

-  `Wikipedia article on
   RIP <https://en.wikipedia.org/wiki/Routing_Information_Protocol>`__

