.. include:: /substitutions.rsti

Using MySQL with the FreeRADIUS Package
=======================================

Thanks very much zlyzwy for the `explanation on the forums`_.

Advantages and disadvantages of SQL
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There are pros and cons using a MySQL database with FreeRADIUS. In
general - if there are not too many users read (`Jeff Carneal - Apex
Internet`_) than there is
mostly no need for a SQL database. The problem is when FreeRADIUS gets
an Access-Request packet FreeRADIUS must check the users file. This is
from top to bottom. If the file is very big with many entries than the
authentication process can be too long. The structure and handling of
such a number of users can be done much faster on a SQL database. To
check if the server drops requests or performs bad in some situation
take a look at this :doc:`how-to </usermanager/freeradius-2-x-package>`.

Using a MySQL database has the advantage that better counters/modules
may be created because it is possible to do SELECTs on the database and
other options to work with. But then it is necessary to edit the
FreeRADIUS config files - `sqlcounter`_ - could help with this.

The disadvantage is that a server with MySQL server running is required.
The MySQL database and tables must be added or imported. Then after that
it is necessary to fill in the usernames and passwords in the MySQL
database. Of course this can be done with some tools like phpMyAdmin but
knowledge about those is also required.

My suggestion is to use the pfSense/FreeRADIUS GUI. Many features are
supported there with an easy to use GUI. If problems are encountered,
dropping access-requests then first check with status server updates
what the problem is.

In another situation MySQL can be used for doing accounting only. So all
accounting information will be on MySQL and authorization/authentication
on FreeRADIUS GUI or connect FreeRADIUS to LDAP/Active Directory.

.. _explanation on the forums: https://forum.netgate.com/topic/39727/new-package-freeradius-2-x/145
.. _Jeff Carneal - Apex Internet: http://freeradius.org/testimonials.html
.. _sqlcounter: http://wiki.freeradius.org/Rlm_sqlcounter