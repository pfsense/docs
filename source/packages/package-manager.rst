.. include:: /substitutions.rsti

Using the Package Manager
=========================

The **Package Manager** is used to install and maintain packages on a
pfSense firewall.

Packages are listed with a **Name**, **Category**, **Status/Version**,
and a **Description** of what the package is or does.

Manage Installed Packages
-------------------------

The **Installed Packages** tab lists packages which are currently
present on the firewall. To remove a package, click |fa-trash| at the end of
its row. To reinstall a package, click |pkg|.

Installing New Packages
-----------------------

The **Available Packages** tab displays only those packages which are
available to install on a given platform and pfSense version. For
example, a full install has all packages available, while a
NanoBSD/embedded install only has packages which have been tested and
known to work on that platform. Categories are displayed as additional
sub-tabs to make browsing specific types of packages simpler.

To install a package, find it in the list and click |fa-plus| at the end of
its row.

During installation, the **Package installer** tab will appear and the
installation progress is displayed graphically along with a log of
activity.
