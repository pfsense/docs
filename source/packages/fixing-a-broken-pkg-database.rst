Fixing a Broken pkg Database
============================

In rare edge cases it is possible for the pkg database in **/var/db/pkg/** to
become corrupted. In the unlikely event this happens to a firewall, it can
usually be corrected by running a few commands to re-create the database.

.. note:: The following commands only account for the base system of a typical
   CE full installation.

#. Ensure that the package database directory exists::

     /bin/mkdir -p /var/db/pkg/ /root/var/db/pkg/

#. Force an update of the package repository data::

     /usr/sbin/pkg-static update -f

#. Force a reinstall of the pfSense® base package and kernel::

     /usr/sbin/pkg-static install -yf pkg pfSense pfSense-kernel-pfSense

#. Refresh the **php.ini** and other files to ensure they are loading the
   correct modules::

     /etc/rc.php_ini_setup

#. If any additional packages were installed, reinstall them manually using the GUI
   if possible, or by using ``pkg-static install`` as above::
   
     /usr/sbin/pkg-static install -yf <additional-package> <another-additional-package>
