.. include:: /substitutions.rsti

Troubleshooting Hardware Shutdown and Power Off
===============================================

This is typically a case of FreeBSD and ACPI not working well together
on a particular system.

As a test, enter this at the CLI then attempt a power-down:

``sysctl hw.acpi.disable_on_reboot=1``

For a more permanent solution, add an entry under **System > Advanced**
on the **Tunables** tab to set

``hw.acpi.disable_on_reboot=1``

