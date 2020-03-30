Using the AutoConfigBackup Service
==================================

Automatic Configuration Backup (ACB) has been available as a pfSense® package
for many years. In pfSense version 2.4.4 it is available as a core component of
pfSense software, no package required.

When a change is made to the configuration on a firewall, AutoConfigBackup
automatically encrypts the contents with the passphrase entered in the
AutoConfigBackup settings and then uploads the backup over HTTPS to Netgate
servers. This gives instant, secure offsite backups of a firewall with no user
intervention.

Only the most recent 100 encrypted configurations for each device are retained
on Netgate servers.

.. image:: /_static/backup/acb-service.jpg
   :align: center

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
encrypts the backup using the AES-256-CBC algorithm and a password that is created
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

The device key is located on the **Services > Auto Configuration Backup** menu item,
under the **Restore** and **Backup now** tabs.

.. warning:: **Keep a careful record of this Device Key**!

   If the **Device Key** of a firewall is lost, there is a chance it can be
   recovered. The **Settings** page allows the entry of a **Hint** which is
   stored in the data store alongside the encrypted backup entries. If the hint
   is distinct, the Netgate support team *may* be able to use it to recover the
   device key. Do not count on this though!

Restoring a Configuration
-------------------------

To restore a configuration, click |fa-refresh| to the right of the configuration
as shown on the **Services > Auto Configuration Backup** screen on the
**Restore** tab. It will download the configuration specified from our
servers, decrypt it with the configured encryption password, and restore it.

By default, the firewall will not reboot. Depending on the
configuration items restored, a reboot may not be necessary. For
example, firewall and NAT rules are automatically reloaded after
restoring a configuration.

After restoring, a prompt is presented offering to reboot. If the restored
configuration changes anything other than the NAT and firewall rules, choose
**Yes**.

Restoring Backups from Another Firewall or a Previous Installation
------------------------------------------------------------------

If the SSH key changes due to a re-installation of pfSense software, the ACB
package can restore a backup from the previous installation as long as the
:ref:`device-key` and the :ref:`encryption-password` of the previous
installation are both known.

* Navigate to the the **Settings** tab
* Set the **Encryption Password** to match the previous installation
* Navigate to the **Restore** tab
* Paste the old device key into the **Device Key** field
* Click the **Submit** button

This temporarily allows ACB to display a list of backups for an alternate
**Device Key**.

Click |fa-refresh| **Reset** to restore the native ID for this firewall.

Manually Backing Up
-------------------

At times, it may be desirable to force a backup of a firewall
configuration. This can be done on the **Restore** tab of the
AutoConfigBackup page by clicking **Backup now** at the bottom. This
will pop up a box where to manually enter a description of the backup.

We recommend doing this before making a series of significant changes,
as it will provide a backup specifically showing the reason, which then
makes it easy to revert to that configuration prior to initiating the
changes if needed. Since each configuration change triggers a backup,
when a series of changes is made it can be difficult to know where it
started if a revert is necessary.

A manual backup is also good prior to upgrading to a new pfSense release, and
name the backup so it's clear that is the reason the backup was made.

Testing Backup Functionality
----------------------------

Make a change to force a configuration backup, such as editing and
saving a firewall or NAT rule, then click **Apply Changes**. Visit
**Services > Auto Configuration Backup**, **Restore** tab. This tab lists
available backups along with the page that made the change (where
available).

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

Can I still access legacy ACB entries?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Access to the legacy backup server has been removed, please upgrade to use the
new ACB server.
