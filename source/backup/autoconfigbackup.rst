.. include:: /substitutions.rsti

Using the AutoConfigBackup Service
==================================

Automatic Configuration Backup (ACB) has been available as a pfSense package for
some years. In pfSense version 2.4.4 it will be available as a core part of
pfSense, no package required.

.. note:: For the purposes of this documentation, the old
   pfSense package (used prior to 2.4.4) will be referred to as the
   :ref:`legacy-acb-package`. Read that section if you are using the legacy
   package.

When a change is made to the configuration on a firewall, it is automatically
encrypted with the passphrase entered in the AutoConfigBackup settings and
uploaded over HTTPS to our servers. This gives instant, secure offsite backups
of a firewall with no user intervention.

Only the most recent 100 encrypted configurations for each device are retained
on our servers.

Configuration
-------------

To adjust the settings manually, or to use ACB when no prior package was
installed, select the **Settings > Auto Config Backup** menu item, then the
**Settings** tab.

#. Specify an :ref:`encryption-password`.
#. Click the **Enable** checkbox.
#. Save the settings.

Your firewall will now automatically backup the configuration whenever a
configuration change is made, or when triggered from the **Backup Now** tab.

.. _encryption-password:

Encryption Password
-------------------

Before you configuration is transmitted to the Netgate data center, it is
encrypted using the SHA256 algorithm and a password that you create. This
password never leaves the firewall and is never shared.

When you wish to restore a backup from the list of available backups, the backup
is downloaded and then decrypted with your encryption password.

If you lose your password, you will not be able to view or restore backups, and
since your password is private, neither Netgate nor anyone else will ever be
able to help you access your backups.

.. tip:: Keep a careful record of your encryption password!

Device ID
---------

To uniquely identify your firewall, some unique identifier is required when you
save or restore a backup configuration. ACB uses an SHA256 hash of your
firewall’s SSH public key for this purpose.

If your SSH key should change because you needed to re-install pfSense on a
clean system, you can restore the backup from your previous system as long as
you have a record of its **Device ID**, and you know the **encryption
password** that was used when the backups were made. Paste the Device ID
into the text box provided on the **Restore** tab and click the **Submit**
button.

Clicking **Restore** will restore the native ID for your firewall.

.. tip:: If you have lost the Device ID of your firewall, all may not be lost.
   The settings page allows the entry of a "hint" which is stored in the data
   store with your encrypted backups. If the hint you entered is distinct, the
   Netgate support team *may* be able to use it to recover your ID. Don’t count
   on this though!

Accessing Legacy Backups
------------------------

If you were a pfSense Gold Subscriber and had configured the legacy ACB package
on your firewall, the settings used by the package are preserved and you may
still access your legacy backups by clicking the **Legacy** button on the ACB
page.

.. note:: You may only restore or view backups from the legacy system, you can
  not make new backups. Also, since the legacy system used a username, password
  and hostname to identify the firewall, that information is still used when
  legacy mode is selected. You will be asked to accept this use of your personal
  information.

.. image:: /_static/backup/acb-service.jpg

.. _legacy-acb-package:

Legacy AutoConfigBackup Package
-------------------------------

Users with an active |premium_content_link| have access to our Automatic
Configuration Backup Service, AutoConfigBackup and can backup a maximum of 10
systems.

This package will work with currently supported pfSense versions, released prior
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
FQDN, otherwise the system cannot differentiate between multiple
installations.

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
