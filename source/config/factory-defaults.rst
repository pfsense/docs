Resetting to Factory Defaults
=============================

The firewall configuration can be reset back to the one that shipped
with the currently installed pfSense distribution by visiting
**Diagnostics > Factory Defaults**. A reminder of some of the defaults
is printed on the **Factory Defaults** page.

By clicking **Yes**, the configuration will be defaulted, and the system
rebooted.

A factory reset may also be performed from the console menu either via
VGA or serial, or by SSH as the admin or root user. Choose the menu
option for factory reset and then confirm the action.

On some embedded units, as well as `appliances from Netgate`_, the reset button
may be depressed with a paperclip or other small object during the boot
sequence. Hold the button in until the lights turn off. The unit will reset the
configuration to factory defaults and reboot again with that default
configuration.

.. note:: This does not remove any changes made to the file system, it only
   changes the configuration. Installed package binaries would be left in
   place.

.. _appliances from Netgate: https://www.netgate.com/products/appliances/
