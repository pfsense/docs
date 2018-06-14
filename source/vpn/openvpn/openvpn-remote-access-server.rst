.. include:: /substitutions.rsti

Configuring an OpenVPN Remote Access Server
===========================================

Using OpenVPN for a remote access VPN is easy and secure. Clients are
available for many different operating systems, including Windows, Mac,
Linux, Android, iOS, and even ChromeOS. This document will walk through
the basics of a remote access OpenVPN configuration.

This How-To is designed to quickly show how to setup an OpenVPN remote
access VPN on pfSense, and is not meant to be complete. It should only
be used to give a general idea of the functionality and what is
possible. OpenVPN is much more advanced than the setup being
demonstrated.

.. warning:: This guide is brief, and omits important considerations.
   Consult the OpenVPN chapter in the pfSense book rather than relying on
   this entirely.

If a Site-To-Site OpenVPN connection is desired instead, see one of the
following pages:

-  :doc:`/vpn/openvpn/configuring-a-site-to-site-pki-ssl-openvpn-instance`
-  :doc:`/vpn/openvpn/configuring-a-site-to-site-static-key-openvpn-instance`

OpenVPN Wizard
--------------

An OpenVPN remote access VPN can easily be configured using the wizard,
as follows:

Navigate to **VPN > OpenVPN** and Click the **Wizards** Tab to start the
wizard.

Authentication
~~~~~~~~~~~~~~

Choose the desired Authentication Settings. Most commonly this is set to
*Local User Access*.

-  With *Local User Access*, users defined under **System > User
   Manager**
-  RADIUS and LDAP are possible, with appropriately defined settings,
   as covered here: :doc:`/vpn/openvpn/authenticating-openvpn-users-with-radius-via-active-directory`.

Click **Next**

Certificate Authority
~~~~~~~~~~~~~~~~~~~~~

Fill in the fields to **Create a new Certificate Authority**

-  **Descriptive Name** - Used as the Common Name (CN) for the CA. Do
   not spaces, punctuation or special characters (ex: *ExampleCoVPNCA*)
-  **Key Length** - Default is OK, the higher the better but will use
   more CPU.
-  **Lifetime** - Default is OK, but can be lowered if it must be
   changed out more often.
-  **Country Code**, **State/Province**, **City**, **Organization** -
   Enter values for this location/company.
-  **E-mail** - Used as a reference on the certificate, does not receive
   any mail from the system.

Click **Add New CA**

.. image:: /_static/vpn/openvpn/openvpn_ra-ca.png

Server Certificate
~~~~~~~~~~~~~~~~~~

Fill in the fields to create a new **Server Certificate**. Similar
Fields as CA entry, most of the fields carry over and do not need
changed.

Click **Create new Certificate**

.. image:: /_static/vpn/openvpn/openvpn_ra-cert.png

OpenVPN Server Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now for the biggest part: Enter the configuration for the VPN server.

There are many options here, most explained on the page, but the key
items to enter are:

-  **TLS Authentication** -- Leave this checked, along with the box
   underneath to generate a new key. Using a TLS key is technically
   optional, but *highly* recommended. Some OpenSSL attacks such as
   Heartbleed have been mitigated by the use of a TLS key.
-  **Tunnel Network** -- Should be a new, unique network that does not
   exist anywhere in the current network or routing table.
-  **Local Network** -- The network here on the server that the clients
   will need to reach, for example 192.168.1.0/24

Note: On pfSense 2.3 the Topology choice is also present in the Wizard
and it defaults to *Subnet*. Read the associated text on the page in the
unlikely case this option is not desirable for a given deployment.

Other values can be set as desired and are a matter of preference.
Settings such as compression, DNS, NetBIOS, and so on.

Click **Next**

Firewall Rules
~~~~~~~~~~~~~~

The next screen offers the choice to add firewall rules automatically.
For convenience, check both unless the rules will be managed manually.

Click **Next**

End of the Wizard
~~~~~~~~~~~~~~~~~

Click **Finish** to exit the wizard and the new settings will be saved
and applied automatically.

Verifying the Setup
-------------------

Look at firewall rules (**WAN** and **OpenVPN** tabs)

-  **WAN** tab rule should pass from any to the *OpenVPN* port on the
   *WAN address*

.. image:: /_static/vpn/openvpn/openvpn_ra-wanrule.png

-  **OpenVPN** tab rule should allow anything from any/to any

.. image:: /_static/vpn/openvpn/openvpn_ra-ovpnrule.png

Adjustments
-----------

Some settings are not presented in the wizard but might be a better fit
for some situations than the defaults chosen by the wizard.

Server Mode
~~~~~~~~~~~

The OpenVPN **Server Mode** allows selecting a choice between requiring
Certificates, User Authentication, or both. The wizard defaults to
*Remote Access (SSL/TLS + User Auth)*. The possible values for this
choice and their advantages are:

-  *Remote Access (SSL/TLS + User Auth)*

   -  Requires both certificates AND username/password
   -  Each user has a unique client configuration that includes their
      personal certificate and key.
   -  Most secure as there are multiple factors of authentication (TLS
      Key and Certificate that the user has, and the username/password
      they know)

-  *Remote Access (SSL/TLS)*

   -  Certificates only, no auth
   -  Each user has a unique client configuration that includes their
      personal certificate and key.
   -  Useful if clients should not be prompted to enter a username and
      password
   -  Less secure as it relies only on something the user has (TLS key
      and certificate)

-  *Remote Access (User Auth)*

   -  Authentiation only, no certificates
   -  Useful if the clients should not have individual certificates
   -  Commonly used for external authentication (RADIUS, LDAP)
   -  All clients can use the same exported client configuration and/or
      software package
   -  Less secure as it relies on a shared TLS key plus only something
      the user knows (Username/password)

Certificate Revocation
~~~~~~~~~~~~~~~~~~~~~~

Compromised certificates can be revoked by creating a Certificate
Revocation List (CRL) in **System > Cert Manager** on the **Certificate
Revocation** tab, adding the certificate to it, and then selecting that
CRL on the OpenVPN server settings.

Adding a User with a Certificate
--------------------------------

If the mode has been left at the wizard's default or on a mode that
includes local user authentication, a user must be created in the user
manager.

-  Navigate to **System > User Manager**
-  Click |fa-plus| To add a user
-  Fill in **Username**
-  Fill in **Password** / **Confirm password**
-  Check **Click to create a user certificate**.
-  Fill in the **Descriptive Name** as the *username*

.. image:: /_static/vpn/openvpn/openvpn_ra-usercert.png

-  Choose the appropriate **Certificate Authority**
-  Click **Save**

OpenVPN Client Export Package
-----------------------------

The OpenVPN Client Export Package allows exporting configurations
formatted for a wide variety of platforms. It also allows exporting a
pre-packaged Windows installer executable which includes the
configuration bundled inside for a painless client installation.

Installing the OpenVPN Client Export Package
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To Install the OpenVPN Client Export Package

-  Navigate to **System > Packages**, **Available Packages** tab
-  Find **OpenVPN Client Export Package** in the list

.. image:: /_static/vpn/openvpn/openvpn_ra-expinstall.png

-  Click |fa-plus|
-  Click **Confirm**

The package will be installed and is now available under **VPN >
OpenVPN** on the **Client Export** tab.

Exporting a Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~

-  Navigate to **VPN > OpenVPN** on the **Client Export** tab
-  Choose the VPN from the **Remote Access Server** drop-down list
-  Set any desired options in the upper section -- The defaults are
   generally OK
-  Find the user in the list at the bottom of the page and select the
   appropriate configuration type to export.

.. image:: /_static/vpn/openvpn/openvpn_ra-expoptions.png

The Windows Installer choices are the most common. The "Inline"
configuration choices are best when using a current client that isn't
listed. Some older clients may not fully understand these, but older
clients should be upgraded as soon as possible.

There are links to many commonly used clients at the bottom of the
Client Export package page

Wrap Up
-------

The VPN setup on the firewall is complete. Install the client and/or
import the new configuration into an existing client, connect and try it
out.

Filtering OpenVPN Traffic
-------------------------

Firewall rules to strictly govern the traffic on this VPN may be added
under **Firewall > Rules** on the **OpenVPN** tab.

OpenVPN Client Bridging
-----------------------

Bridging clients directly into the LAN is not recommended, but is
possible. See :doc:`OpenVPN Bridging </vpn/openvpn/openvpn-bridging>`
