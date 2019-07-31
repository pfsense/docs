Granting Users Access to SSH
============================

This article explains how to enable SSH access on a pfSense® firewall.
SSH is typically used for debugging and troubleshooting, but has many
other useful purposes. The SSH daemon is not required, so it is disabled
by default.

Enable SSH via webGUI
---------------------

- Navigate to **System > Advanced** in the webGUI. This will show the **Admin
  Access** tab.
- Check **Enable Secure Shell**

  .. image:: /_static/usermanager/Enable_SSH.jpg

- To allow only SSH key authentication, check **Disable password login
  for Secure Shell (RSA/DSA key only)**
- Enter a port number in **SSH Port** if the SSH daemon should listen
  on a non-default port. Leave the field blank for the daemon to use
  port *22*.
- Click **Save**

Enable SSH via Console
----------------------

Connect to the console (VGA or Serial) and use option 14 to enable or
disable SSH.

To change the port number or key authentication options, use the GUI as
directed above.

SSH Daemon Security
-------------------

With a default ruleset, SSH may only be accessed via the LAN. If SSH
access must be allowed via the WAN, restricting access to Key-based
authentication is **strongly** recommended to avoid issues with brute
force attacks. Moving the daemon to an alternate port is also
recommended, but on its own moving the port is not a sufficient
protection mechanism.

The pfSense firewall will automatically block users that attempt to
authenticate unsuccessfully more than 15 times during a 24-hour period.

If password authentication is used, ensure that all user accounts with
shell access have strong passwords that cannot be easily guessed.

User Access
-----------

By default only *admin* and *root* have SSH access. Additional users
with limited access may be granted the *User - System - Shell account
access* privilege to login via SSH.

Note that additional users do not have full root privileges in the
shell, so the menu is not displayed. Many commands and other files are
inaccessible as well. For a normal user to get much use from the shell,
the :doc:`Sudo Package </usermanager/sudo-package>` can be used to delegate additional
privileges to run commands as *root* or other users.

SSH Keys
--------

SSH keys for authentication may be added to individual user accounts
under **System > User Manager**. The admin user and root user share
keys.

Do not attempt to manage keys from the shell directly.

SCP File Transfers
------------------

To connect to the pfSense firewall with SCP for file transfers, use the
*root* account with the same credentials as *admin*, or a user account
with sufficient privileges.

Users with shell access may transfer files, as well as users with the
*User - System - Copy files* privilege. Note that users other than root
can only transfer or write files for which their account has permission
to read or modify.

Any SCP/SFTP-compatible program may be used to transfer files. Popular
choices include **scp**, **FileZilla**, and **WinSCP**.

