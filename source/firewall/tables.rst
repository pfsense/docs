.. include:: /substitutions.rsti

Understanding Firewall Tables
=============================

Tables are used to hold a group of IPv4 and/or IPv6 addresses. Tables
are ideal for storing large groups of addresses as the time required to
lookup an address is only slightly more than a table containing a small
amount of addresses.

The current contents of tables on pfSense may be viewed at **Diagnostics
> Tables**.

The following tables have been automatically pre-defined:

-  **`bogons <Show_Bogons>`__**
-  **`sshlockout <sshlockout>`__**
-  **`snort2c <Setup_Snort_Package>`__**
-  **`virusprot <virusprot>`__**

The contents of :doc:`Aliases </firewall/aliases>` will typically show up as tables
in this list, depending on their length and contents.

