Virusprot Firewall Table
========================

The **virusprot** table provides support for limiting the number of TCP
connections by measuring the establishment rate of new network
connections. This is useful for protection against sudden outbursts of
network traffic, generally caused by malware on infected PCs.

The measurement rate can be configured in the :doc:`Firewall Rules Section </firewall/firewall-rule-basics>`.

.. note:: Entries that exist in this table that are equal to or older than 3600
   seconds will be expired every hour.
