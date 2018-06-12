.. include:: /substitutions.rsti

Fixing a Broken pkg Database
============================

In some rare edge cases it is possible for the pkg database in
/var/db/pkg/ to become corrupted. In the unlikely event this happens to
a firewall, it can usually be corrected by running a few commands to
re-create the database.

Note that the following commands only account for the base system of a
typical CE full installation.

-  Ensure that the package database directory exists:

`` /bin/mkdir -p /var/db/pkg/ /root/var/db/pkg/``

-  Force an update of the package repository data:

`` /usr/sbin/pkg update -f``

-  Force a reinstall of the pfSense base package and kernel:

`` /usr/sbin/pkg install -yf pkg pfSense pfSense-kernel-pfSense``

-  Refresh the php.ini and extensions.ini to ensure they are loading the
   correct modules

`` /etc/rc.php_ini_setup``

If any additional packages were installed, reinstall them manually using
the GUI if possible, or using “pkg install -f” as above.

