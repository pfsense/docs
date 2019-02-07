Troubleshooting Windows OpenVPN Client Connectivity
===================================================

The `OpenVPN community
client <http://openvpn.net/index.php/open-source/downloads.html>`__,
which is used by the :doc:`OpenVPN Client Export Package </vpn/openvpn/using-the-openvpn-client-export-package>`, requires Administrative
privileges when run on Windows in order to properly add routes to the
operating system.

On Windows Vista, Windows 7, Windows 8, Windows 10, and their server
counterparts, it is required to run the OpenVPN client as Administrator
in order for the client to obtain the necessary privileges to route
traffic. If the client is not run as Administrator, it will appear to
connect but not pass traffic, and the client log will contain errors
that refer to its inability to add routes.

This can be done automatically by changing the shortcut properties for
the OpenVPN client. On the **Compatibility** tab of the shortcut
**Properties**, check the box to **Run as Administrator**, and **Save**.
The user will get a UAC prompt when running the client, and then it will
proceed.

Alternately, the client can be run `as a service <http://openvpn.net/index.php/open-source/documentation/howto.html#install>`__
to avoid this requirement, but that has its own drawbacks.

The
`OpenVPNManager <https://github.com/jochenwierum/openvpn-manager/wiki>`__
GUI, available as an option in the export package, is one way to manage
running the client that does not require Administrator rights.

On some versions of Windows it is also possible to add users to the
**Network Configuration Operators** group to allow adding routes without
full administrator-level access.
