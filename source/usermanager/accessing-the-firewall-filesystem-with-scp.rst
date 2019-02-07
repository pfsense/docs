Accessing the Firewall Filesystem with SCP
==========================================

Files may be transferred to and from a pfSense firewall with *scp*,
which is part of the functionality that comes with having ssh access
enabled (See :doc:`HOWTO enable SSH access </usermanager/granting-users-access-to-ssh>`).

When connecting with an *scp* client such as from a FreeBSD/Linux
command line, with WinSCP, FileZilla, or even a *fish* URL in Konquerer,
the **root** user must be utilized. The **root** user has the same
password as the **admin** user but it is not locked into the menu for
its shell.

An example: Logged into a FreeBSD machine, I want to get a copy of a
file in /tmp::

  myuser@somebox:~/$ scp root@192.168.1.1:/tmp/lan-traffic.rrd-4h.png .
