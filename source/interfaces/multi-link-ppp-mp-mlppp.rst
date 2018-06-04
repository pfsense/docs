.. include:: /substitutions.rsti

Multi-Link PPP (MP/MLPPP)
=========================

Multilink PPP (MP or MLPPP) is included in pfSense and is known to work
with a number of providers.

A simple MLPPP connection requires only two tasks:

-  Create a PPPoE group with member interfaces
-  Assign PPPoEx to WAN

Create a PPPoE group with member interfaces
-------------------------------------------

#. Navigate to **Interfaces > (assign)** on the **PPPs** tab
#. Click + to create a new PPP connection
#. Choose *PPPoE* for **Link Type**
#. Select multiple interfaces using the ctrl key for **Link
   interface(s)**
#. Make other changes on this page as required by the ISP (username,
   password, etc.)
#. Click Save

Assign PPPoEx to WAN
--------------------

#. Navigate to **Interfaces > (assign)**
#. Choose the new PPPOE interface a the desired interface (usually WAN),
   or click + to add a new interface and select it there.
#. Click Save
#. Click Apply Changes

Using VLANs with MLPPP
----------------------

When creating a PPPoE group, VLANs may be used rather than physical
interfaces to connect multiple modems to pfSense. This makes sense
particularly in larger setups where it is neither practical nor
necessary to install and allocate a physical NIC into pfSense for every
modem.

This approach requires creating the necessary VLAN interfaces in pfSense
and selecting those as member interfaces when creating the PPPOE
connection in **PPPs**.

Caveats
-------

-  Disabling Scrub (**System > Advanced**, **Firewall/NAT** tab) is
   known to create problems on some systems.
   (http://forum.pfsense.org/index.php/topic,42586.0.html)

-  Changes made on the **PPPs** page do not take effect until **Apply
   Changes** is clicked on the interface configuration page, e.g.
   **Interfaces > WAN**. Therefore, when making changes to **PPPs**, go
   first to **Interfaces > WAN** and click **Save**. Make changes on
   **PPPs** and click **Save** there, then go back to **Interfaces >
   WAN** and click **Apply Changes**.

Related Documents
-----------------

See also:

-  :doc:`VLAN Trunking </interfaces/vlan-trunking>`
-  :doc:`Accessing modem from inside firewall </interfaces/accessing-modem-from-inside-firewall>`
