.. include:: /substitutions.rsti

Open VM Tools package
=====================

This package installs VMware Tools for pfSense, using the `Open VM
Tools <https://github.com/vmware/open-vm-tools/>`__ available from
VMware. It is built using the `open-vm-tools-nox11 FreeBSD
port <http://www.freshports.org/emulators/open-vm-tools-nox11/>`__.

Usage
-----

Just install the package. There is no GUI for control, the services are
automatically started at boot time.

Verifying functionality
-----------------------

There are two portions of this package, the *vmware-guestd* process and
the kernel modules.

Verifying *vmtoolsd*
^^^^^^^^^^^^^^^^^^^^

Navigate to **Diagnostics > Command**, and in **Execute shell command**,
enter the following::

  ps uxawww | grep vmtoolsd

Output similar to the following will be shown::

  $ ps uxawww | grep vmtoolsd
   1026  ??  Ss     0:20.84 /usr/local/bin/vmtoolsd -c /usr/local/share/vmware-tools/tools.conf -p /usr/local/lib/open-vm-tools/plugins/vmsvc
  19157  ??  SN     0:00.00 sh -c ps ax|grep vmware
  19159  ??  RN     0:00.00 grep vmware (sh)

As long as *vmtoolsd* is shown in the output, it is working.
