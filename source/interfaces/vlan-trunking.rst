.. include:: /substitutions.rsti

VLAN Trunking
=============

This article will give a brief overview on VLANs and VLAN trunking to be
used in pfSense.

There is a **lot** more detail on VLANs, security issues with VLANs,
pfSense VLAN configuration, VLAN switch configuration, and more in `The
pfSense Book <https://www.netgate.com/our-services/gold-membership.html>`_.

Definitions
-----------

VLANs are virtual LAN segments of a managed switch, and when pfSense is
plugged into a trunk port it can utilize VLANs to have multiple virtual
interfaces, one for each available VLAN. In this manner, pfSense can
talk to a large number of networks without the need for more physical
interfaces.

In pfSense, VLAN tags must be created under **Interfaces > (assign)**,
on the **VLANs** tab. After creating the VLAN interface, it can be
assigned and used like any other interface.

-  Common definitions of a VLAN –
-  Common definitions of VLAN trunking -
-  For an explanation on how VLAN trunking works go to
   `Howstuffworks <http://computer.howstuffworks.com/lan-switch17.htm>`__

Creating VLANs
--------------

The following example is for one type of switch only and may be out of
date. Consult your switch manual for directions on the creation of VLANs
and how tagging is configured.

-  Connect to the managed switch using a console cable and terminal
   client.

.. image:: /_static/interfaces/vlan_terminal.gif

-  Create the relevant amount of vlans required and commit the changes
   made to the managed switch.
-  An example of creating a VLAN

::

    Switch>enable
    Switch#vlan database
    Switch(vlan)#vlan 10

-  View the vlans created

.. image:: /_static/interfaces/vlan_show.gif

Creating a vlan trunk
---------------------

- Use the switch management interface to create the trunk.
- An example of creating a VLAN trunk using the management interface.

  .. code::

    Switch#configure terminal
    Switch(config)#interface fastEthernet 0/1
    Switch(config-if)#switchport mode trunk
    Switch(config-if)#switchport trunk encapsulation dot1q
    Switch#show interface fastEthernet 0/1 switchport

- View the VLAN trunk created.

.. image:: /_static/interfaces/vlan_trunk.gif
