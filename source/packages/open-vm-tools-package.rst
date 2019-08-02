Open VM Tools package
=====================

This package installs VMware Tools for pfSense® software, using the
`Open VM Tools`_ available from VMware. It is built using the 
`open-vm-tools-nox11 FreeBSD port`_.

Usage
-----

Just install the package. There is no GUI for control, the services are
automatically started at boot time.

Verifying functionality
-----------------------

There are two portions of this package, the **vmware-guestd** process and
the kernel modules.

Verifying vmtoolsd
^^^^^^^^^^^^^^^^^^

Navigate to **Diagnostics > Command**, and in **Execute shell command**,
enter the following::

  ps uxawww | grep vmtoolsd

Output similar to the following will be shown::

  $ ps uxawww | grep vmtoolsd
  1026  ??  Ss     0:20.84 /usr/local/bin/vmtoolsd -c /usr/local/share/vmware-tools/tools.conf -p /usr/local/lib/open-vm-tools/plugins/vmsvc
  19157  ??  SN     0:00.00 sh -c ps ax|grep vmware
  19159  ??  RN     0:00.00 grep vmware (sh)

As long as **vmtoolsd** is shown in the output, it is working.

.. seealso:: You can find a list of known issues with the Open VM Tools package
   on the `pfSense bug tracker`_.

.. _Open VM Tools: https://github.com/vmware/open-vm-tools
.. _open-vm-tools-nox11 FreeBSD port: http://www.freshports.org/emulators/open-vm-tools-nox11/
.. _pfSense bug tracker: https://redmine.pfsense.org/projects/pfsense-packages/issues?utf8=%E2%9C%93&set_filter=1&sort=id%3Adesc&f%5B%5D=status_id&op%5Bstatus_id%5D=o&f%5B%5D=category_id&op%5Bcategory_id%5D=%3D&v%5Bcategory_id%5D%5B%5D=56&f%5B%5D=&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=assigned_to&c%5B%5D=updated_on&group_by=&t%5B%5D=
