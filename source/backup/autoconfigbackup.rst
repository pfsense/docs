.. include:: /substitutions.rsti

Using the AutoConfigBackup Service
==================================

Automatic Configuration Backup (ACB) has been available as a pfSense package for
many years. In pfSense version 2.4.4 it is available as a core component of
pfSense, no package required.

.. note:: For the purposes of this documentation, the old AutoConfigBackup
  package used prior to pfSense 2.4.4-RELEASE will be referred to as the
  :ref:`legacy-acb-package`. Read that section for information about the legacy
  package.

When a change is made to the configuration on a firewall, AutoConfigBackup
automatically encrypts the contents with the passphrase entered in the
AutoConfigBackup settings and then uploads the backup over HTTPS to Netgate
servers. This gives instant, secure offsite backups of a firewall with no user
intervention.

Only the most recent 100 encrypted configurations for each device are retained
on Netgate servers.

Configuration
-------------

To adjust the settings manually, or to use ACB when no prior package was
installed, select the **Services > Auto Config Backup** menu item, then the
**Settings** tab.

* Check **Enable ACB**
* Specify an :ref:`encryption-password` and repeat it in the **Confirm** box
* Enter a **Hint** which will be stored in plain text alongside the encrypted
  backup file. Avoid using sensitive information in this field.
* Click **Save**

The firewall will now automatically create a backup of the configuration
whenever a configuration change is made, or when triggered from the **Backup
Now** tab.

.. _encryption-password:

Encryption Password
-------------------

Before the configuration is transmitted to Netgate servers, the firewall
encrypts the backup using the AES-256-CBC algorithm and a password that created
by the firewall administrator. This password never leaves the firewall and is
never shared.

When restoring a backup from the list of available remote backups, the contents
are downloaded and then decrypted with the configured encryption password.

.. warning:: **Keep a careful record of the encryption password!**

   If the password is lost, the backup contents **cannot be recovered**. The
   password is private and only known to the local firewall. Neither Netgate nor
   anyone else will be able to assist in reading the encrypted backups without
   the password.

.. _device-key:

Device Key
----------

To identify a specific firewall, an unique identifier is required to save or
restore a backup configuration. ACB uses an SHA256 hash of the SSH public key on
the firewall for this purpose.

.. warning:: **Keep a careful record of this Device Key**!

   If the **Device Key** of a firewall is lost, there is a chance it can be
   recovered. The **Settings** page allows the entry of a **Hint** which is
   stored in the data store alongside the encrypted backup entries. If the hint
   is distinct, the Netgate support team *may* be able to use it to recover the
   device key. Do not count on this though!


Restoring Backups from Another Firewall or a Previous Installation
------------------------------------------------------------------

If the SSH key changes due to a re-installation of pfSense, the ACB package can
restore a backup from the previous installation as long as the :ref:`device-key`
and the :ref:`encryption-password` of the previous installation are both known.

* Navigate to the the **Settings** tab
* Set the **Encryption Password** to match the previous installation
* Navigate to the **Restore** tab
* Paste the old device key into the **Device Key** field
* Click the **Submit** button

This temporarily allows ACB to display a list of backups for an alternate
**Device Key**.

Click |fa-refresh| **Reset** to restore the native ID for this firewall.

Accessing Legacy Backups
------------------------

pfSense Gold Subscribers who used the legacy ACB package can still access the
backups from the legacy ACB server. The settings used by the old package are preserved.

Click **Use Legacy "Gold" Repository** on the **Restore** tab to access the
legacy server.

.. note:: Backups on the legacy servers may only be restored or viewed. The ACB
   service cannot create new backups on the legacy server. Also, since the
   legacy server required a username, password, and hostname to identify the
   firewall, ACB must transmit that information in legacy mode. ACB will prompt
   to accept this use of personal information.

.. image:: /_static/backup/acb-service.jpg

.. _legacy-acb-package:

Legacy AutoConfigBackup Package
-------------------------------

Users with an active |premium_content_link| have access to the Automatic
Configuration Backup Service, AutoConfigBackup and can backup a maximum of 10
firewalls.

This package will work with currently supported pfSense versions released prior
to 2.4.4.

.. note:: When upgrading to version 2.4.4, if the legacy AutoConfigBackup
   package is detected, its settings will be migrated to the new integrated
   service and the old package settings will be deleted.

Installing the AutoConfigBackup Package
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To install the package, visit **System > Packages** and click |fa-plus| next
to to the AutoConfigBackup package, then confirm the installation. The
firewall will download and install the package.

After installation, the package may be found at **Diagnostics >
AutoConfigBackup**.

Setting the Hostname
^^^^^^^^^^^^^^^^^^^^

**Make sure each firewall has a unique hostname and domain set on System
> General Setup.** The configurations are stored by FQDN (hostname +
domain), so ensure each firewall using the backup service has a unique
FQDN, otherwise ACB cannot differentiate between multiple installations.

Configuring AutoConfigBackup
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The service is configured under **Diagnostics > AutoConfigBackup**,
**Settings** tab. Fill in the https://portal.pfsense.org username (not
email) and password, and enter an encryption password.

The username is the login name created with the |premium_content_link|, not the
e-mail address. Use a long, complex password and encryption key to ensure the
configuration is secure. **It is very important to store this encryption key
somewhere outside the firewall** - if it is lost, it will be impossible to
restore a configuration the hard drive in the firewall fails. We retain only
**encrypted** configurations, which are useless without the encryption key.

Testing Backup Functionality
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Make a change to force a configuration backup, such as editing and
saving a firewall or NAT rule, then click **Apply Changes**. Visit
**Diagnostics > AutoConfigBackup**, **Restore** tab. This tab lists
available backups along with the page that made the change (where
available).

Manually Backing Up
^^^^^^^^^^^^^^^^^^^

At times, it may be desirable to force a backup of a firewall
configuration. This can be done on the **Restore** tab of the
AutoConfigBackup page by clicking **Backup now** at the bottom. This
will pop up a box where to manually enter a description of the backup.
We recommend doing this before making a series of significant changes,
as it will provide a backup specifically showing the reason, which then
makes it easy to revert to that configuration prior to initiating the
changes if needed. Since each configuration change triggers a backup,
when a series of changes is made it can be difficult to know where it
started if a revert is necessary. A manual backup is also good prior to
upgrading to a new pfSense release, and name the backup so it's clear
that is the reason the backup was made.

Restoring a Configuration
^^^^^^^^^^^^^^^^^^^^^^^^^

To restore a configuration, click |fa-plus| to the right of the configuration
as shown on the **Diagnostics > AutoConfigBackup** screen on the
**Restore** tab. It will download the configuration specified from our
servers, decrypt it with the configured encryption password, and restore
it. By default, the firewall will not reboot. Depending on the
configuration items restored, a reboot may not be necessary. For
example, firewall and NAT rules are automatically reloaded after
restoring a configuration. After restoring, a prompt is presented
offering to reboot. If the restored configuration changes anything other
than NAT and firewall rules, choose **Yes**.

Bare Metal Restoration
^^^^^^^^^^^^^^^^^^^^^^

If the hard drive is lost, the following procedure is necessary to recover the
state of the new firewall installation to the last configuration change:

#. Install pfSense on the new hard drive.
#. Bring up LAN and WAN, and assign the hostname and domain **exactly the same
   as it was previously** configured.
#. Install the AutoConfigBackup package.
#. Configure the AutoConfigBackup package as described above, using the portal
   account and the same encryption password as used previously.
#. Visit the Restore tab and choose the configuration to restore.
#. After the restoration is done, reboot when prompted.

FAQ
---

How do I know my backup was successful?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The list of backups shown on the Restore tab is pulled from our servers
- if the backup is listed there, it was successfully created.

How will I know if a backup fails?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If a backup fails, an alert is logged, and it will be seen scrolling
across the top of the web interface. If e-mail alerts are enabled, a
message will also be sent.
