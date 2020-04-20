Using the OpenVPN Client Export Package
=======================================

Once installed, the OpenVPN Client Export :doc:`add-on package </packages/index>`,
located at **VPN > OpenVPN** on the **Client Export** tab, automatically
creates a Windows installer to download, or it can generate configuration
files for OSX (Viscosity), Android and iOS clients, SNOM and Yealink
handsets, and others.

Choose from any existing remote access server definitions, and then pick
from a list of client certificates which are present under the
:doc:`Certificate Management </certificates/certificate-management>` system. For
authentication-only servers, all clients use a common configuration/installer.

Click the link next to a certificate's row to download a windows client,
mac client configuration, or other types of configurations.

Remote Access Server
--------------------

Choose the OpenVPN server for which clients/configurations will be
generated. The options presented will vary depending on the type of
configuration in use:

:Remote Access (SSL/TLS + User Auth), Local Users: Client list consists of users
   from the :doc:`User Manager </usermanager/managing-local-users>` which have
   certificates associated with their user entry from the CA matching
   this server.
:Remote Access (SSL/TLS + User Auth), RADIUS/LDAP: Client list consists of
   certificates from the :doc:`Certificate Management </certificates/certificate-management>`
   certificate list with a CA matching this server.
:Remote Access (SSL/TLS): Client list consists of certificates
   from the :doc:`Certificate Management </certificates/certificate-management>`
   certificate list with a CA matching this server. This mode also
   enables export for SNOM and Yealink handsets as they do not support
   user authentication
:Remote Access (User Auth): Only one client is shown, a common
   client for all users that authenticate via the chosen method.

Host Name Resolution
--------------------

Controls the format of the server address in the client configuration's
``remote`` statement.

:Interface IP Address: Uses the actual configured interface IP address/VIP
   literally (most common choice)
:Automagic Multi-WAN IPs (port forward targets): Locates any port forwards with
   a target of the VPN's binding address and port. Add remote statements for all
   of them. Useful for :doc:`Multi-WAN </routing/multi-wan-openvpn>` or for
   multiple ports on the same WAN.
:Automagic Multi-WAN DDNS Hostnames (port forward targets): As
   above, but uses the first found DynDNS hostname as the remote address
   rather than the destination IP directly.
:Installation hostname: Uses the hostname and domain configured
   under **System > General**.
:DynDNS: All of the Dynamic DNS hostnames from **Services > Dynamic DNS** are
   listed as individual choices.
:Other: Presents a text box in which an arbitrary address or
   hostname may be placed.

Verify Server CN
----------------

Controls how, and if, the client will verify the server certificate common name.
Some clients do not support this parameter, or only support certain syntax with
its use. It is always advised to run the newest client software possible to
avoid issues, but this can help get older clients connected securely.

.. warning:: It is not recommended to disable this option. Without it, any
   server certificate name will be accepted by the client.

:Automatic - Use verify-x509-name (OpenVPN 2.3+) where possible:
   Uses the current recommended method of verification. Works on any
   OpenVPN client 2.3 and newer.
:Use tls-remote (Deprecated, use only on old clients <= OpenVPN 2.2.x): Only use
   this if an older client that is not under direct control must be supported.
   The option has been deprecated by OpenVPN and will be removed in the next
   major version.
:Use tls-remote and quote the server CN: As above, but adds quotes around the
   common name. Useful if the certificate common name contains spaces. Varies by
   platform.
:Do not verify the server CN: Omits any verification of the server certificate
   common name. Not recommended.

Use Random Local Port
---------------------

Instructs the client to use a random local source port, ``lport``, for traffic
from the client. Without this set, two clients may not run concurrently as they
would both attempt to use the same local source port.

This option is not supported on older clients. It is automatically disabled for
Yealink and Snom configuration exports.

Certificate Export Options
--------------------------

Fine-tuning for how the certificates may be used and access on the
client.

:Use Microsoft Certificate Storage instead of local files: For
   Windows clients, this attempts to import the certificates into Windows
   rather than having the files be read directly from the disk by the
   OpenVPN client. This is more secure, but also more error-prone.
:Use a password to protect the pkcs12 file contents or key in Viscosity bundle:
   When checked, this allows a password to be entered which will protect the
   contents of the certificate.

Use Proxy
---------

If the clients will be behind a proxy, check this option and fill in the
options for use by the client to connect through the specified proxy

The options vary by proxy type and authentication mechanism. At minimum,
a **Type**, **IP address** and **Port** must be entered when the **Use
Proxy** box is checked.

Management Interface OpenVPNManager
-----------------------------------

Changes the generated *.ovpn* configuration to allow for usage of the
management interface and include the **OpenVPNManager** program in the
**Windows Installer** options.

With this set, OpenVPN can be used also by non-administrator users. This
is useful for Windows Vista/7/8 systems where elevated permissions are
needed to add routes to the system.

This is not currently compatible with the 64-bit OpenVPN installer. It
will work with the 32-bit installer on a 64-bit system.

Additional configuration options
--------------------------------

Additional options may be added in this text area and they will be
placed into the OpenVPN client export configuration. Separate options by
a line break or semicolon.

This can be used for directives that are not currently added to the
configuration automatically, such as *reneg-sec*, or for custom remote
statements.

Types of Clients and Configurations
-----------------------------------

The **Client Install Packages** section contains a list of all available
clients for the selected VPN. See the **Remote Access Server** section
above to determine which clients should be expected to appear here.

If the list is empty, there are likely no users and/or certificates that
exist which use the same Certificate Authority as this VPN server.

Standard Configurations
~~~~~~~~~~~~~~~~~~~~~~~

:Archive: Exports a ``.zip`` file containing the ``.ovpn``
   configuration file for OpenVPN, the ``.p12`` file contains the **CA** and
   **User Certificate+Key**, and **TLS key**, if enabled.
:File Only: Exports only the ``.ovpn`` configuration file for
   OpenVPN without any related certificates or keys. Useful if
   delivering an updated configuration file when the other data has not
   changed.

Inline Configurations
~~~~~~~~~~~~~~~~~~~~~

:Android: Exports an inline configuration suitable for use by the
   `OpenVPN For
   Android <https://play.google.com/store/apps/details?id=de.blinkt.openvpn>`__
   app.
:OpenVPN Connect (iOS/Android): Exports an inline configuration
   suitable for use by OpenVPN connect on `Android (Google
   Play) <https://play.google.com/store/apps/details?id=net.openvpn.openvpn>`__
   or `iOS (App
   Store) <https://itunes.apple.com/us/app/openvpn-connect/id590379981>`__
:Others: Exports an inline configuration file suitable for use by
   any other current OpenVPN client, such as the Windows client,
   Viscosity, or Tunnelblick.

Windows Installers
~~~~~~~~~~~~~~~~~~

The Windows installer packages together the client software and the
configuration files in one *.exe* to ease deployment. When executed on
the client computer, the installer will first install OpenVPN and the
TAP driver if they are not present, and then it copies the exported
configuration file into place automatically.

.. note:: If OpenVPN is already installed on the client computer, then the
  configuration is copied into place but no other changes are made to OpenVPN.
  In order to upgrade OpenVPN, uninstall it and reinstall it, or download and
  run the OpenVPN installer directly.

There are currently four different installers:

-  **x86-xp**: 32-bit installer for use on Windows XP and later.
-  **x64-xp**: 64-bit installer for use on Windows XP and later.
-  **x86-win6**: 32-bit installer for use on Winnows Vista/7/8/10.
   Includes a newer TAP driver.
-  **x64-win6**: 64-bit installer for use on Windows Vista/7/8/10.
   Includes a newer TAP driver.

When in doubt, the 32-bit XP and later installer will work on pretty
much anything. TAP drivers for both 32 and 64-bit systems are included
and will be installed as needed.

Mac OSX
~~~~~~~

The **Viscosity Bundle** option exports a configuration file in a format
easily imported by `Viscosity <http://www.sparklabs.com/viscosity/>`__.

The current versions of Viscosity and
`Tunnelblick <http://code.google.com/p/tunnelblick/>`__ also import
Inline configurations properly.

SNOM and Yealink Handsets
~~~~~~~~~~~~~~~~~~~~~~~~~

Exported configuration files for certain SNOM and Yealink (**T28, T38G
(1),T38G (2)**) handsets are shown if the VPN server is a *Remote Access
(SSL/TLS)* mode server. Ensure the CA and Certificates for this VPN use
only SHA1, as the handsets do not support higher modes. This is subject
to change on newer handset firmware. Check with the manufacturer.

Also ensure the phones have an accurate clock and that it is set before
the VPN connection is attempted.

If the handset model claims OpenVPN support but does not match the
listed models, try each of the configuration types until one is found
that works.

Recommended Clients
-------------------

For a list of recommended clients for different operating systems, and
instructions on how to install them, see `OpenVPN Client Installation`_.

Known issues
------------

.. seealso:: You can find a list of known issues with this package on the
   `pfSense bug tracker`_.

Package Support
---------------

This package is currently supported by |support_link| to those with an active
support subscription.

.. _OpenVPN Client Installation: /pfsense/en/latest/book/openvpn/openvpn-client-installation-android.html
.. _pfSense bug tracker: https://redmine.pfsense.org/projects/pfsense-packages/issues?utf8=%E2%9C%93&set_filter=1&sort=id%3Adesc&f%5B%5D=status_id&op%5Bstatus_id%5D=o&f%5B%5D=category_id&op%5Bcategory_id%5D=%3D&v%5Bcategory_id%5D%5B%5D=99&f%5B%5D=&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=assigned_to&c%5B%5D=updated_on&group_by=&t%5B%5D=
