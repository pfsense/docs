Understanding Firewall Tables
=============================

Tables are used to hold a group of IPv4 and/or IPv6 addresses. Tables
are ideal for storing large groups of addresses as the time required to
lookup an address is only slightly more than a table containing a small
amount of addresses.

The current contents of tables may be viewed from the pfSense® webGUI at
**Diagnostics > Tables**.

The following tables have been automatically pre-defined:

* :doc:`bogons </firewall/show-bogons>`
* :doc:`sshlockout </firewall/sshlockout>`
* :doc:`snort2c </ids-ips/setup-snort-package>`
* :doc:`virusprot </firewall/virusprot>`

The contents of :doc:`Aliases </firewall/aliases>` will typically show up as tables
in this list, depending on their length and contents.

