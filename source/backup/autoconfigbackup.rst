.. include:: /substitutions.rsti

Using the AutoConfigBackup Service
==================================

Users with a |premium_content_link| have access to our Automatic Configuration
Backup Service, AutoConfigBackup.

Functionality and Benefits
--------------------------

When a change is made to the configuration on a firewall, it is
automatically encrypted with the passphrase entered in the
AutoConfigBackup settings and uploaded over HTTPS to our server. Only
encrypted configurations are retained on our server. This gives instant,
secure offsite backups of a firewall with no user intervention.

pfSense Version Compatibility
-----------------------------

This package will work with currently supported pfSense versions, released prior
to 2.4.4.

Backup Limits
-------------

The most recent 100 configurations for each host are retained.

Users with a |premium_content_link| can backup a maximum of 10 systems.

Installation and Configuration
------------------------------

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
----------------------------

Make a change to force a configuration backup, such as editing and
saving a firewall or NAT rule, then click **Apply Changes**. Visit
**Diagnostics > AutoConfigBackup**, **Restore** tab. This tab lists
available backups along with the page that made the change (where
available).

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
started if a revert is necessary. A manual backup is also good prior to
upgrading to a new pfSense release, and name the backup so it's clear
that is the reason the backup was made.

Restoring a Configuration
-------------------------

To restore a configuration, click |fa-plus| to the right of the configuration
as shown on the **Diagnostics > AutoConfigBackup** screen on the
**Restore** tab. It will download the configuration specified from our
server, decrypt it with the configured encryption password, and restore
it. By default, the firewall will not reboot. Depending on the
configuration items restored, a reboot may not be necessary. For
example, firewall and NAT rules are automatically reloaded after
restoring a configuration. After restoring, a prompt is presented
offering to reboot. If the restored configuration changes anything other
than NAT and firewall rules, choose **Yes**.

Bare Metal Restoration
----------------------

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
