.. include:: /substitutions.rsti

Troubleshooting OpenVPN Remote Access Client IP Address Assignments
===================================================================

If the same certificate has been used for all of the clients (which is
not recommended!) then all of them may be assigned the same IP address
when they connect.

To work around this, duplicate connections must be allowed using one of
the following methods:

-  Check **Duplicate Connections** on the OpenVPN server configuration.

-or-

-  Add the following line to the custom options on the server:

``duplicate-cn``

