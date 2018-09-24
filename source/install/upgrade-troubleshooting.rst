.. include:: /substitutions.rsti

.. _upgrade-troubleshooting:

Upgrade Troubleshooting
=======================

This document describes methods of troubleshooting problems firewalls may
encounter when attempting to run an upgrade.

.. _upgrade-troubleshooting-log:

Upgrade Log
-----------

``pfSense-upgrade`` keeps a log of the last update attempt, which may contain
additional useful information.  This log is located at
``/conf/upgrade_log.latest.txt``. Please include the contents of this log with
any post or support request when requesting assistance with upgrade problems.

.. _upgrade-troubleshooting-pkgreinstall:

Upgrade not Offered / Library Errors
------------------------------------

If the update system does not offer an upgrade to the most recent version, the
upgrade will not proceed, or the upgrade process encounters errors with shared
libraries, take the following steps:

* Navigate to **System > Updates**
* Set **Branch** to *Latest stable version*
* Refresh the repository configuration and upgrade script by running the
  following commands from the console or shell::

    pkg-static clean -ay; pkg-static install -fy pkg pfSense-repo pfSense-upgrade

.. _upgrade-troubleshooting-repo:

Rewrite Repository Information
------------------------------

In some cases the repository information may need to be rewritten:

* Navigate to **System > Updates**
* Set the **Branch** to *Latest Development Snapshots*
* Wait for the page to refresh
* Set the **Branch** to *Latest stable version*

If the update still does not appear, run the commands above from the console or
shell.

.. _upgrade-troubleshooting-cli:

CLI Troubleshooting
-------------------

If the GUI update is not functioning as expected, there are a handful of shell
commands that can help gather information or resolve problems.

.. _upgrade-troubleshooting-metadata:

Force pkg Metadata Update
^^^^^^^^^^^^^^^^^^^^^^^^^

Often times DNS or connectivity problems will prevent the firewall from finding
updates. A quick way to verify this is to force a `pkg` metadata update::

  pkg-static update -f

This command forces an update and will print errors if problems are found,
a few potential errors include:

:No address record: The firewall cannot resolve the update server hostname. This
  could be a problem with DNS from the firewall itself, or connectivity from the
  firewall to the Internet in general, such as a missing or incorrect default
  route.
:No route to host: The firewall cannot reach the update server because it cannot
  find a route there. Most likely, the firewall is missing its default route or
  the WAN with the default route is down.
:Authentication error: There is a proxy between the firewall and the update
  servers and it requires authentication. Move the firewall so it is not behind
  a proxy, or configure the proxy under **System > Advanced**, **Miscellaneous**
  tab.
:No trusted public keys found: The firewall is attempting to update from the
  wrong repository. Ensure the correct branch is selected as mentioned in
  :ref:`upgrade-troubleshooting-repo`. May require a reinstall to resolve.
  For CE installations, try the following command:

::

  fetch -qo /usr/local/share/pfSense/keys/pkg/trusted/ \
   https://raw.githubusercontent.com/pfsense/pfsense/RELENG_2_4_4/src/usr/local/share/pfSense/keys/pkg/trusted/pkg.pfsense.org.20160406

.. _upgrade-troubleshooting-manualcheck:

Manual Update Check
^^^^^^^^^^^^^^^^^^^

To run a manual update check from the CLI::

  pfSense-upgrade -d -c

When run successfully, this command will print a line stating that a new version
is available, and the version number of the available update. Errors displayed
during that process are likely to be the same as those covered in
:ref:`upgrade-troubleshooting-metadata`.

.. _pkg-no-a-record:

pkg.pfsense.org Has no A/AAAA Record
------------------------------------

``pkg`` does not use A/AAAA records. It uses service (SRV) records. The update
server meta names such as ``pkg.pfsense.org`` are not meant to be accessed
directly using a browser.

To find the actual update servers, lookup the SRV record for the host::

  $ host -t srv _https._tcp.pkg.pfsense.org
  _https._tcp.pkg.pfsense.org has SRV record 10 10 443 files01.netgate.com.
  _https._tcp.pkg.pfsense.org has SRV record 10 10 443 files00.netgate.com.

  $ host files01.netgate.com.
  files01.netgate.com has address 162.208.119.40
  files01.netgate.com has IPv6 address 2610:1c1:0:6::40

  $ host files00.netgate.com.
  files00.netgate.com has address 162.208.119.41
  files00.netgate.com has IPv6 address 2610:1c1:0:6::41

Accessing the hosts using their real hostnames will work with a browser::

  $curl --output /dev/null --silent --head --fail \
   "https://files00.netgate.com/pfSense_v2_3_4_amd64-core/meta.txz"
  $ echo $?
  0

.. _upgrade-troubleshooting-nuclear:

Nuclear Upgrade Option
^^^^^^^^^^^^^^^^^^^^^^

If all else fails, forcing a reinstallation of all packages may resolve problems
that otherwise may require a full reinstall. This is not ideal, as a clean
install is more likely to have a positive result, but that is not always an
option in every situation (e.g. remote install with no console access).

To forcefully reinstall all packages, take the following steps:

* Make a backup
* Clean the repository and forcefully reinstall pkg, repo data, and the upgrade
  script::

    pkg-static clean -ay; pkg-static install -fy pkg pfSense-repo pfSense-upgrade
* Force a reinstall of everything::

    pkg-static upgrade -f
* Review the list of changes and enter ``y`` to proceed
* Manually reboot the firewall
