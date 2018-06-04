.. include:: /substitutions.rsti

Disabling ACPI
==============

This article shows how ACPI can effectively be disabled. This method is
“semi-permanent” in that it will probably need to be disabled again when
the firewall is upgraded.

There is typically no need to disable ACPI on current versions of
pfSense with reasonably recent hardware. There may still be some edge
cases that require it to be disabled, however.

There have been 2 main reports floating around the forums, mailing list,
and IRC as to why someone might want to disable ACPI.

calcru Errors
-------------

Calcru messages are typically harmless, though they can get quite
annoying because they can fill up logs **very** fast.

The messages look like this::

  calcru: negative runtime of -350418 usec for bufdaemon

To alleviate the problem, add the following line to /boot/device.hints
at the very bottom::

  hint.acpi.0.disabled="1"

Reboot after making the change.

Long Boot
---------

This issue came by way of the mailing list. The admin reported that on
an IBM X335 with Intel Xeon 2.8ghz and 2.5 GB of RAM), it would take the
system upwards of 6 minutes to get fully booted with an older version of
pfSense. The majority of the time was spent at the following message::

  smp: AP CPU #1 Launched!

Booting the same system with ACPI disabled (via the boot menu), it came
up in under a minute. Use the same procedure as above to disable ACPI.

Caveats
-------

The hardware may not power itself off when halting with ACPI disabled.
