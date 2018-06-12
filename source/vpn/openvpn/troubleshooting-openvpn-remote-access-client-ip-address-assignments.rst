.. include:: /substitutions.rsti

Troubleshooting OpenVPN Remote Access Client IP Address Assignments
===================================================================

If the same certificate has been used for multiple clients (which we do not
recommend!), then all clients may be assigned the same IP address when they
connect.

To work around this, duplicate connections must be allowed using one of the
following methods:

- Check **Duplicate Connections** on the OpenVPN server configuration

-or-

- Add the following line to the custom options on the server::

    duplicate-cn
