Viewing DHCP Leases
===================

A list of active and inactive DHCP leases can be viewed in pfSense by
navigating to **Status > DHCP Leases**.

When viewing that page, all active leases are shown, along with the IP
address, MAC address, hostname, lease start and end times, lease type,
and whether or not the system is online. (As with the :doc:`ARP Table </monitoring/arp-table>`, this is not always a reliable indicator)

To view expired leases, click the **Show All Configured Leases** button.
To switch the view back, click **Show Active and Static Leases**.

A DHCP static IP mapping may be added by clicking |fa-plus|, send a WoL magic
packet by clicking |fa-power-off| or the MAC address, or delete an offline
dynamic lease by clicking |fa-trash|.

.. seealso:: :doc:`Why does the DHCP Leases page show active systems offline </dhcp/troubleshooting-offline-dhcp-leases>`
