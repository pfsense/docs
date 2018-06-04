.. include:: /substitutions.rsti

Interface Bridges
=================

A **Bridge** joins two or more interfaces to the same layer 2
(broadcast/collision domain), as if they were joined to the same switch.

Bridges between interfaces are listed and
managed at **Interfaces > (assign)** on the **Bridges** tab.

When editing a bridge, Ctrl-Click to select the **Member interfaces**
from the list of available interfaces and type a Description.

Advanced options may be used to enable features like **Spanning Tree**
or other less common features of bridges.

Once a bridge has been created, it can be assigned under **Interfaces >
(assign)** as any other interface.

A bridged interface can filter traffic without being involved in the IP
layer of the connection. Bridge traffic is filtered on the member interfaces by
default.

By default, traffic is filtered on the member interfaces and not on the
bridge interface itself. This behavior may be changed by toggling the
values of **net.link.bridge.pfil\_member** and
**net.link.bridge.pfil\_bridge** under **System > Advanced** on the
**System Tunables** tab. With them set at *0* and *1*, respectively,
then filtering would be performed on the bridge only.

.. note:: Only **one** interface on a bridge should have an IP address! Do
   not add multiple IP addresses in the same subnet on different bridge
   member interfaces. Other interfaces on the bridge should remain with an
   IP type of *None*.

It is normally best to avoid such configurations as they can be
problematic, but they can also be useful for several types of
configurations, such as:

-  Bridging a wireless interface to a LAN
-  Transparent firewall (WAN/LAN bridge)
-  Filtering between portions of a single subnet
