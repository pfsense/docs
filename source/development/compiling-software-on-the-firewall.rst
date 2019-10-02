Compiling Software on the Firewall
==================================

pfSense® software intentionally does not include
a proper environment for compiling software (make, headers/includes,
sources, etc) on the installed firewall. Those tools are left out for
security and capacity reasons.

A virtual machine or separate system can be setup to compile software,
and then the compiled binaries/packages/software can be moved over to
the firewall.

When doing this, install a version of FreeBSD that matches up with the
version of pfSense software currently in use. A list can be found here:
:doc:`Versions of pfSense and FreeBSD </releases/versions-of-pfsense-and-freebsd>`

Alternately, install pre-compiled FreeBSD packages as described here:
:doc:`Installing FreeBSD Packages </packages/installing-freebsd-packages>`
