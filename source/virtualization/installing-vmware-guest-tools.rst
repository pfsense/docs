.. include:: /substitutions.rsti

Installing VMware Guest Tools
=============================

The :doc:`Open VM Tools package </packages/open-vm-tools-package>` package allows use
of the open source VMware tools, and is the preferred means of running
VMware tools.

**The following instructions are outdated and not recommended with
pfSense 2.2.x and newer versions.** Use the :doc:`Open VM Tools package </packages/open-vm-tools-package>` instead.

The official VMware tools can work, but unfortunately the process is
takes a lot of manual work and is difficult to fully automate.

This work is all done from a shell prompt (console or SSH) unless noted
otherwise.

An alternate set of instructions may be found at `VMware Front Experience <http://www.v-front.de/2013/06/how-to-install-or-update-vmware-tools.html>`__
by `Andreas Peetz <https://plus.google.com/103000586955215377743>`__.

Installation Instructions
-------------------------

First, make sure the VM has a CD-ROM device. Add one if it is not
already present. After installing tools, it should be removed as it can
cause other issues (especially with SNMP).

Before VMware Tools may be installed, install perl and an older FreeBSD
compatibility layer::

  setenv PACKAGESITE ftp://ftp-archive.freebsd.org/pub/FreeBSD-Archive/ports/`uname -m`/packages-8.3-release/Latest/
  pkg_add -r perl compat6x-`uname -m`

.. note:: If the above command does not work, use compat6x-amd64 or
   compat6x-i386 depending on the installed architecture. See
   :doc:`Installing FreeBSD Packages </packages/installing-freebsd-packages>`

Now initiate the tools install from VMware. Right click on the VM in
ESX, **Guest > Install/Upgrade VMware tools**, or choose **VM > Install
VMware Tools** if using VMware workstation.

.. code::

  mount -t cd9660 /dev/acd0 /mnt/
  cd /tmp
  tar xvzf /mnt/vmware-freebsd-tools.tar.gz
  cd vmware-tools-distrib/
  ./vmware-install.pl -d

Ignore any settings or changes mentioned by the script.

.. code::

  rm -f /etc/vmware-tools/not_configured

A little startup script is required to add the compat6x library path at
boot time, or else the VMware tools won't fully start up properly::

  echo '#\!/bin/sh' > /usr/local/etc/rc.d/000-ldconfig.sh
  echo '/sbin/ldconfig -m /usr/local/lib/compat' >> /usr/local/etc/rc.d/000-ldconfig.sh
  chmod a+x /usr/local/etc/rc.d/000-ldconfig.sh

Now reboot the VM and then it should come back up and show the tools as
running. If a vmxnet3 NIC is desired, shut the VM down and add them, and
they will be available for assignment when the VM boots back up.

Upgrade Notes
-------------

After a major upgrade, it's possible that the kernel modules may not
work properly with the new version.

It is safest to deactivate the tools before performing an upgrade. To do
this, edit /boot/loader.conf and /boot/loader.conf.local to remove
references to the kernel modules, and remove the VMware initialization
script from /usr/local/etc/rc.d/. Once the upgrade has been performed,
re-run the steps above to install the tools again to be sure the correct
kernel modules are used.

Alternately, snapshot the VM before the upgrade, and then upgrade as
usual. If the upgrade fails to boot, roll back and then perform these
steps.
