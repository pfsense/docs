.. include:: /substitutions.rsti

Assign Interfaces
=================

The **Interface Assignments** screen at **Interfaces > (assign)** lists
the current system interfaces such as WAN and LAN, and a drop-down box
next to each with a list of all available network interfaces on the
system (real and virtual).

Reassign an Interface
---------------------

Interfaces may be reassigned as follows:

-  Locate the row that contains the interface to reassign
-  Choose the new underlying interface from the **Network Port**
   drop-down list
-  Click **Save**
-  Click **Apply Changes**

Assign a new Interface
----------------------

New interface assignment varies slightly depending on the firmware
version in use.

2.1.x
~~~~~

-  Click |fa-plus| at the bottom of the screen
-  Locate the newly interface row at the bottom of the list. It is named
   *OPTx* where *x* is one number higher than any existing OPT interface
   (or *OPT1* if there are no others)
-  Choose the appropriate **Network Port** from the drop-down menu in
   that row
-  Click **Save**
-  Click **Apply Changes**

2.2 and Later
~~~~~~~~~~~~~

On 2.2 and later the assignment process changed slightly to make it less
likely to interfere with other ports and connectivity.

There is an **Available network ports** control at the bottom of the
interface list that is used to add interfaces like so:

-  Choose the appropriate **Network Port** next to **Available network
   ports**
-  Click |fa-plus| at the end of that row
-  Note the Interface name assigned. It is named *OPTx* where *x* is one
   number higher than any existing OPT interface (or *OPT1* if there are
   no others)
-  Click **Save**
-  Click **Apply Changes**

Delete an Interface
-------------------

To delete an interface, click |fa-trash| at the end of its row.

The WAN interface is the only interface that cannot be deleted.

Other Tabs
----------

The other tabs on this screen lead to places were other interface types
may be created for assignment, such as:

-  :doc:`Interface Groups </interfaces/interface-groups>`
-  :doc:`VLAN Interfaces </interfaces/vlan-trunking>` (VLANs tab)
-  :doc:`QinQ Interfaces </interfaces/qinq-interfaces>` (QinQs tab)
-  :doc:`PPP Interfaces </interfaces/ppp-interfaces>` (PPP Tab)
-  :doc:`GRE Interfaces </interfaces/gre-interfaces>` (GRE Tab)
-  :doc:`GIF Interfaces </interfaces/gif-interfaces>` (GIF Tab)
-  :doc:`Interface Bridges </interfaces/interface-bridges>` (Bridges Tab)
-  :doc:`LAGG Interfaces </interfaces/lagg-interfaces>` (LAGG Tab)

Reassignment During Configuration Restore
-----------------------------------------

When :doc:`restoring an existing configuration file </backup/configuration-backup-and-restore>`, this screen will be
presented if the interfaces in the *config.xml* do not match the
interfaces found on the current firewall.

When only physical interfaces have been used, reassignment is simple.
Pick the appropriate interfaces from the **Network Port** drop-down
lists, then click **Save** and **Apply Changes**.

When VLANs or other virtual interfaces are present, they must be
corrected first before saving and proceeding from this screen. In this
case it is often much easier to carefully hand edit the previous
config.xml and find/change the interface names by hand.
