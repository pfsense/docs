Restoring a pfSense Configuration to a Different Version
========================================================

Configurations are specific to a given pfSense version. The version of
FreeBSD used is not relevant. The platform being used (full installation
or NanoBSD) is also not relevant, the configuration is the same on all
platforms and architectures using the same pfSense version.

Generally speaking, a complete/whole older configuration version can
always be restored to a newer release of pfSense. The configuration will
be upgraded as needed provided that the **entire** configuration has
been restored.

A newer configuration **cannot** be restored to an older release that
had a different configuration version. Certain releases of pfSense had
the same configuration version, and restoring between those is possible,
but still not recommended. See :doc:`/releases/versions-of-pfsense-and-freebsd` to see which configuration
versions were used on specific pfSense releases.

A configuration **section** or partial configuration cannot be restored
between different configuration versions. It may work by pure luck, but
often there are configuration format differences that require changes to
be made to the older configuration. These changes are automatic if a
complete configuration is restored. If a partial restore is required,
perform a full upgrade in a test VM or lab and then copy the needed
section out of the resulting *config.xml* post-upgrade.

