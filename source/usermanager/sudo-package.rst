Sudo Package
============

The `sudo <http://www.sudo.ws/>`__ package configures basic rules for allowing
unprivileged shell users (read: anyone but root/admin) to run commands as root
or another user/group.

Once the package is installed, use the pfSense® webGUI to navigate to **System >
sudo**, and define commands and who may run them.

More information on the full command options may be found in the `sudoers manual
<http://www.sudo.ws/sudoers.man.html>`__.

By default the command is ``ALL`` meaning the user can run any commands. Leaving
the commands field blank assumes ``ALL``. A comma-separated list of commands can
be supplied to limit the user to individual binaries. Full paths to binaries
must be used.

For example, to let ``bob`` run ``ping`` commands only as ``root`` without a
password, set:

-  **User/Group**: *User*: ``bob``
-  **Run As**: *User*: ``root``
-  **No Password**: checked
-  **Commands**: ``/sbin/ping``

To let anyone in the admins group run all commands as any user, but prompted for
a password, set:

-  **User/Group**: *Group*: ``admins``
-  **Run As**: *User*: *ALL Users*
-  **No Password**: Unchecked
-  **Commands**: ``ALL``

Multiple commands may be specified in a comma-separated list. If parameters are
specified after a command, they will be required. To disallow running a command
with parameters, add ``""`` after the command.

Examples:

* Run *ping* with any parameters::

    /sbin/ping

* Run ping only to ``192.168.1.2``::

    /sbin/ping 192.168.1.2

* Run command ``blah`` without any parameters::

    /usr/local/bin/blah ""

* Run *ping* and *traceroute* and their IPv6 variants with any parameters::

    /sbin/ping, /sbin/ping6, /usr/sbin/traceroute, /usr/sbin/traceroute6

Known issues
------------

.. seealso:: You can find a list of known issues with this package on the
   `pfSense bug tracker`_.

Package Support
---------------

This package is currently supported by |support_link| to those with an active
support subscription.

.. _pfSense bug tracker: https://redmine.pfsense.org/projects/pfsense-packages/issues?utf8=%E2%9C%93&set_filter=1&sort=id%3Adesc&f%5B%5D=status_id&op%5Bstatus_id%5D=o&f%5B%5D=category_id&op%5Bcategory_id%5D=%3D&v%5Bcategory_id%5D%5B%5D=81&f%5B%5D=&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=assigned_to&c%5B%5D=updated_on&group_by=&t%5B%5D=
