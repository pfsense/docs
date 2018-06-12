.. include:: /substitutions.rsti

Converting Packages to Bootstrap
================================

For help converting older packages and PHP pages to Bootstrap format,
see
`BOOTSTRAP.md <https://github.com/pfsense/pfsense/blob/master/BOOTSTRAP.md>`__
and `Bootstrap Conversion Notes <https://forum.pfsense.org/index.php?topic=101062.0>`__ for
general Bootstrap help and information.

Packages for pfSense 2.3 are built from files in the pfSense copy of the
`FreeBSD ports <https://github.com/pfsense/FreeBSD-ports/>`__
repository, not from the older pfSense-packages repository.

pfSense packages contain the files needed for the package to operate and
also act as "meta" ports that include the proper dependencies to pull in
binary packages if needed. See :doc:`Package Port Directory Structure </development/package-port-directory-structure>`
for more information on the new package port structure. And
:doc:`Developing Packages </development/developing-packages>` for general information on
developing packages.

For package maintainers the primary differences are:

-  Which repository to send a PR against
-  Locating the package among the other ports can be more difficult. See
   :doc:`Package Port List </development/package-port-list>` for a list to make it
   easier.
-  The package version **must be increased** in order to trigger a new
   package to be built, which will all happen automatically thanks to
   poudriere.

The pfSense package port version does not have to be the same as the
underlying software version when using a package that requires
additional software.

.. note:: Packages that only use .xml files to draw forms need no
   conversion, they're OK as-is! Only packages which use PHP files need
   intervention.

For examples of a conversion, see some work in progress on the OpenVPN
Client Export Package and System Patches packages.

The current process should be close to this:

-  Fork and check out a copy of the pfSense
   `FreeBSD-ports <https://github.com/pfsense/FreeBSD-ports/>`__
   repository
-  Start making changes to the package files in pfsense/freebsd-ports
-  Be sure to update the version in the port's Makefile as well as
   files/usr/local/share/pfSense-pkg-/info.xml and in
   files/usr/local/pkg/.xml (See :doc:`Package Port Directory Structure </development/package-port-directory-structure>`)
-  Submit a pull request to the pfsense/freebsd-ports repository with
   the updated files

Once the PR is merged, the package builder will see the version change
and automatically build a new copy of the package.

Start a new thread on the `2.3 development board <https://forum.pfsense.org/index.php?board=65.0>`__ on the forum
to solicit testing and advice/help as needed.
