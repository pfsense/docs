Snort interface Settings
========================

General Settings
----------------

**Enable:** used to enable or disable Snort on the selected interface.
Snort is enabled on the interface when this box is checked.

**Interface:** used to choose which physical firewall interface this
Snort instance protects.

**Description:** used to provide an optional friendly name for the
interface.

.. image:: /_static/ids-ips/snortinterfacesedit-generalsettings.png

Alert Settings
--------------

**Send Alerts to System Logs:** when checked, all Snort alerts will be
copied to the system log on the firewall.

**Block Offenders:** when checked, Snort will automatically insert a
firewall block of the host generating an alert.

**Kill States:** when checked, Snort will kill all existing state table
entries for the IP address it blocks. This should generally be enabled
(box checked).

**Which IP to Block:** this determines which IP address extracted from
the packet that generated an alert will be blocked. The choices are
SOURCE, DESTINATION or BOTH. BOTH is the recommended default.

.. image:: /_static/ids-ips/snortinterfacesedit-alertsettings.png

Detection Performance Settings
------------------------------

**Search Method:** used to select the pattern matcher algorithm used by
Snort in the signature detection engine.

.. image:: /_static/ids-ips/snortinterfacesedit-detectionperformancesettings.png

Choose the networks Snort should inspect and whitelist
------------------------------------------------------

**Home Net:** selects the network Snort will use as the HOME_NET
variable. Default is the recommended choice and contains the firewall
WAN IP address and WAN gateway, all networks locally-attached to a
firewall interface, the configured DNS servers, VPN addresses and
Virtual IP addresses. Additional HOME_NET networks may be created on
the IP LISTS tab, and then return to this tab to assign them to the
Snort interface by selecting the appropriate list in the drop-down
selector. View the contents of the selected list by clicking the **View
List** button.

**External Net:** selects the network will use as the EXTERNAL_NET
variable. Default is the recommended choice and contains all networks
not included in HOME_NET. Create additional EXTERNAL_NET networks on
the IP LISTS tab, and then return to this tab to assign them to the
Snort interface by selecting the appropriate list in the drop-down
selector.

**Pass List:** selects the networks and IP addresses that Snort will
never block. These represent "trusted hosts". Even if a trusted host
generates a Snort alert, it will not be blocked if the IP address is on
a Pass List. The default Pass List contains the same addresses as
HOME_NET. Create additional pass lists on the IP LISTS tab, and then
return to this tab to assign them to the Snort interface by selecting
the appropriate list in the drop-down selector. Snort must be restarted
on the interface when making changes to the Pass List. View the contents
of the selected list by clicking the **View List** button.

.. image:: /_static/ids-ips/snortinterfacesedit-homenetsettings.png

Choose a suppression or filtering file if desired
-------------------------------------------------

.. image:: /_static/ids-ips/snortinterfacesedit-suppresslistsettings.png
