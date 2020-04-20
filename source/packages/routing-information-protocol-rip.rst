Routing Information Protocol (RIP)
==================================

The `Routing Information Protocol`_ (RIP) daemon is a dynamic routing
protocol which, when coupled with other routers that also have RIP
enabled, will allow automatic route updates between them.

To enable RIP on a pfSense® router, install the package and then
navigate to **Services > RIP**. Check the box to **enable** the service,
ctrl-click to select **Interfaces** to which RIP will bind, select a
**RIP version**, and enter a **RIPv2 password** if using RIP version 2.

Package Support
---------------

This package is currently supported by |support_link| to those with an active
support subscription.

.. _Routing Information Protocol: https://en.wikipedia.org/wiki/Routing_Information_Protocol
