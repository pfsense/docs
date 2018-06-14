.. include:: /substitutions.rsti

Managing Local Users
====================

In pfSense, user management has been centralized under **System > User
Manager**. This takes the place of the individual user management and
access server settings that used to be available under various
subsystems.

Users are managed at the list view on the **Users** tab. The admin user cannot
be deleted and its username may not be changed

When adding a user, fill in a **Username** and **Password** (and
confirmation of the password). The other information is optional, but
may be desirable to set.

A user may be added to a :doc:`group </usermanager/group-manager>` by clicking
(or ctrl-clicking for multiple) groups, and then clicking
|fa-angle-double-right| to add group memberships. Groups can be removed by
clicking (or ctrl- clicking for multiple) and then pressing
|fa-angle-double-left|.

If this user will be accessing the firewall with SSH, and key-based
authentication may be used instead of passwords. Paste their public ssh key into
the **Authorized Keys** box.

When editing an existing user, the user's **Effective Privileges** will
be displayed based on group membership and additional permissions may be
added directly.

When creating a user, a certificate may also be generated, such as one
for OpenVPN, by clicking **Click to create a user certificate**,
choosing the CA and other options, and filling in a **Descriptive name**
for the certificate. After a user has been created, user certificates
may be added later by clicking |fa-plus| at the end of the **User
Certificates** list.

Per-user GUI Options and Dashboard Layout
-----------------------------------------

(2.3.2 and later) Each user can have their own settings for various GUI
options and their dashboard layout. To enable this for a user, check the
**Custom Settings** box when adding or editing the user. The user then
automatically gets their own dashboard layout, starting from the
system-wide layout. Choose the other GUI options desired for the user
such as theme, top navigation, host name in menu, dashboard columns,
show/hide associated panels, left column labels and browser tab text.

If you want the user to be able to adjust their GUI options themselves,
then grant them the **WebCfg - System: User Settings** privilege. Note:
users in the admin group will already have this privilege.

A user with **Custom Settings** enabled (and the **User Settings**
privilege) will have menu option **System > User Settings**. The user
can select this to change the desired GUI options for their user name.

When a user with **Custom Settings** enabled adds, moves or removes
dashboard widgets, the custom dashboard layout is saved just for that
user.

User Manager Settings
---------------------

The system User Manager Settings are available on the **Settings** tab.
Here, a **Session Timeout** may be set for GUI access, as well as
changing the backend for WebGUI logins to an LDAP or RADIUS server.

If using an LDAP server and the authentication server times out, the
system will fall back to using built-in authentication from pfSense, but
this will incur a large delay on every page access.

