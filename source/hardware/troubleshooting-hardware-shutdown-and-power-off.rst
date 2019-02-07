Troubleshooting Hardware Shutdown and Power Off
===============================================

If a firewall device does not automatically power itself off, this is typically
a case of FreeBSD and ACPI not working well together on a particular hardware
combination.

As a test, enter this at the CLI then attempt a power-down::

  sysctl hw.acpi.disable_on_reboot=1

For a more permanent solution, add an entry under **System > Advanced** on the
**Tunables** tab to set::

  hw.acpi.disable_on_reboot=1

