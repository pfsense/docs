.. include:: /substitutions.rsti

Migrating an Assigned LAN to LAGG
=================================

Only unassigned physical ports can be added to a LAGG, so to move an
assigned LAN interface to a LAGG requires some shuffling around.

In this example, the LAN of an APU (*re2*) will be moved into a LAGG
with the OPT1 port (re0).

Warnings/Precautions
--------------------

It is best to perform this change from an interface that is not
involved, such as a DMZ, OPT port, perhaps WAN or VPN. Though if the
switch is properly configured there should be no loss of connectivity,
at least with LACP. Other modes may vary.

Prerequisites/Assumptions
-------------------------

The switch must be properly configured to accommodate the LAGG. This
typically means configuring an LACP group and setting ports to use that
group. The NICs involved, in this example re0 and re2, should be
connected to properly configured ports on the switch before starting.

Migrate LAN to a LAGG
---------------------

#. Ensure the second NIC for the LAGG is not assigned (e.g. *re0* mapped
   to *OPT1*)

   #. Check **Interfaces > (assign)** and remove its entry if present

#. Create a new LAGG including only the second NIC

   #. Navigate to **Interfaces > (assign)** on the **LAGG** tab
   #. Click |fa-plus| to create a new LAGG
   #. Click to select the NIC to use with this LAGG (*re0*)
   #. Select the proper LAGG protocol, such as *LACP*
   #. Enter a description
   #. Click **Save**

#. Navigate to **Interfaces > (assign)**, change the assignment of LAN
   to the newly created LAGG interface (*LAGG0*)
#. Click **Save**
#. Navigate back to the **LAGG** tab
#. Click |fa-pencil| to edit the LAGG
#. Ctrl-click to add in the port that was formerly assigned to LAN
   (*re2*) so that both NICs are selected
#. Click **Save**

Now both *re0* and *re2* are members of a LAGG and that LAGG is the LAN
interface with all of the existing configuration in place.

VLANS
-----

If any VLANs were in use directly on the interfaces involved, migrate
them as follows:

-  Add new VLAN tags using the LAGG interface as the parent
   (**Interfaces > (assign)**, **VLAN** tab)
-  Fix the assignments to use the LAGG versions of the tags
   (**Interfaces > (assign)**)
-  Remove the old tags from the physical interface(s) (**Interfaces >
   (assign)**, **VLAN** tab)

**Do not edit the existing tags and change the parent interface**, it
will cause problems with the interface assignments. Always create new
tags, switch the assignments, then remove the old tags.
