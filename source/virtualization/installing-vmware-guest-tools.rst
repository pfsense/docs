.. include:: /substitutions.rsti

Installing VMware Guest Tools
=============================

The drivers for VMXNET2/3 interfaces are built into the pfSense kernel, and
the guest tools are not necessary to use these interfaces.

The :doc:`Open VM Tools package </packages/open-vm-tools-package>` package
allows use of the open source VMware tools, and is the preferred means of
running VMware tools. This will enable other features provided by the tools,
such as proper guest VM control and allowing the hypervisor to see the hostname,
IP addresses, and other guest information.
