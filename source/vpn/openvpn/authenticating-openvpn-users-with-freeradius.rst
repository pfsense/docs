.. include:: /substitutions.rsti

Authenticating OpenVPN Users with FreeRADIUS
============================================

Using OpenVPN with the :doc:`FreeRADIUS 2.x package </usermanager/freeradius-2-x-package>`.

Purpose
-------

This document will show how to setup OpenVPN while allowing for authentication
via RADIUS. Usernames and Passwords can be managed centrally on the firewall,
and additional RADIUS-specific options may be used. This is a plus because login
times, access limits, and other options are possible.

Requirements
------------

-  A working OpenVPN server. See :doc:`OpenVPN Remote Access Server </vpn/openvpn/openvpn-remote-access-server>` for a How-To.
-  FreeRADIUS Installed: See :doc:`FreeRADIUS 2.x package </usermanager/freeradius-2-x-package>`

After installing FreeRADIUS, :doc:`perform the initial configuration </usermanager/freeradius-2-x-package>`
to allow access from the firewall as a NAS client.

Add an interface to FreeRADIS2
------------------------------

-  Navigate to **Services > FreeRADIUS**
-  Select the **Interfaces** tab
-  Click + to add a new entry
-  Enter ``*`` for the **Interface IP Address**, or ``127.0.0.1`` to bind
   only to Localhost
-  Enter ``1812`` for the **Port**
-  Select *Authentication* for the **Interface Type**
-  Click **Save**

Add a NAS client to FreeRADIUS
------------------------------

-  Navigate to **Services > FreeRADIUS**
-  Select the **NAS / Clients** tab
-  Click + to add a new entry
-  Enter ``127.0.0.1`` in the **Client IP Address** field
-  Enter ``pfSense``, ``OpenVPN``, or similar in the **Client Shortname** field
-  Enter a random/long password in the **Client Shared Secret** field
-  Enter a **Description** that will help identify this connection.
-  Click **Save**

Add Users
---------

-  Navigate to **Services > FreeRADIUS**
-  Select the **Users** tab.

    This is where *every* user to authenticate with FreeRadius/OpenVPN
    is managed

-  Click + to add a new entry
-  Enter a **Username** and **Password**
-  Enter any additional desired options, such as **Number of simultaneous
   connections**
-  [optional] Set the **Session Timeout** When this timer expires, the
   user will be kicked off and will have to login again
-  Repeat as needed for additional users
-  Click **Save**

Configure a pfSense Authentication Server
-----------------------------------------

-  Navigate to **System > User Manager**
-  Select the **Servers** tab
-  Click + to add a new entry
-  Enter a **Descriptive name** such as ``FreeRADIUS``
-  Select *RADIUS* for the **Type**
-  Enter ``127.0.0.1`` for the **Hostname or IP address**
-  Enter the password created above for **Shared Secret**
-  Select *Authentication* for **Services offered**
-  Enter ``1812`` for **Authentication port value**
-  Click **Save**

Test RADIUS Authentication
--------------------------

-  Navigate to **Diagnostics > Authentication**
-  Select the authentication server entered above
-  Fill in a **Username** and **Password** configured in FreeRADIUS
-  Click **Test**

If the test succeeded, continue. Otherwise, see the Troubleshooting section
below.

Configure OpenVPN to use RADIUS
-------------------------------

-  Navigate to **VPN > OpenVPN**
-  Select the **Servers** tab
-  Edit the existing Remote Access server
-  Ensure that the **Mode** is either **Remote Access (User Auth)** or **Remote
   Access (SSL/TLS + User Auth)**
-  Select *FreeRADIUS* or the **Descriptive Name** chosen above for the
   FreeRADIUS authentication server in the **Backend for authentication** field.
-  Click **Save**

Troubleshooting
---------------

Sometimes things don't work as expected. The following options can be helpful in
troubleshooting FreeRADIUS and OpenVPN. Commands must be run at a shell prompt
either via the console or via SSH unless otherwise specified.

-  Make OpenVPN more Verbose and force it to log to a non-standard location so
   it can be read it easier.

   -  Navigate to **VPN > OpenVPN** and select the server
   -  Change **Verbosity level** to *7*

    This will log everything from OpenVPN to the **OpenVPN** tab under **Status
    > System Logs**. It can be watched with the following command (while trying
    to connect/etc)::

      clog -f /var/log/openvpn.log

-  FreeRADIUS may also be watched for attempted connections/authorizations
   (Failed or successful)::

     clog -f /var/log/system.log

-  With this information in hand, Google and the |forum_link| can be a very good
   resource.

*Adapted from / Previously reprinted with permission from*
http://www.fusionnetwork.us/index.php/component/content/article/15-general-tutorials/23-pfsense-openvpn-freeradius
