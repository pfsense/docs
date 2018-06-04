.. include:: /substitutions.rsti

PPP Interfaces
==============

PPP type interfaces may also be used in pfSense. These are not to be
confused with PPPoE or PPTP interfaces, as these are traditional PPP on
serial devices.

This will commonly be used to drive 3G modems for wireless WAN access,
but could also be used for controlling dialup modems.

The parent interface of a PPP interface is a serial device. Check the
:doc:`System Logs </monitoring/system-logs>` or the output of the “dmesg” command to
see which serial device should be used.

There are some pre-defined connection profiles available for cellular
modems from certain providers, click the links to fill in the
information automatically.

Depending on the equipment and provider, some settings may not be
necessary and others may be required. Check with the provider, Google,
or the pfSense forums for more information if there is not a profile
available for a specific network.

