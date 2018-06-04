.. include:: /substitutions.rsti

Snort Blocked Hosts
===================

The **Blocked** tab shows what hosts are currently being blocked by
Snort (when the **block offenders** option is selected on the
**Interface Settings** tab). Blocked hosts can be automatically cleared
by Snort at one of several pre-defined intervals. The blocking options
for an interface are configured on the Snort **Interface Settings** tab
for the interface. To manually remove a blocked host, click the
|fa-trash| icon in the right-hand column.

The |log_d| and |log| icons perform a reverse DNS
lookup on the blocked host IP address when clicked. The
|log_d| icon opens a small pop-up dialog with the reverse DNS
information. The |log| icon will redirect to the :doc:`Diagnostics > DNS Lookup </dns/dns-lookup>` page.

.. image:: /_static/ids-ips/SnortBlockedHosts.png
