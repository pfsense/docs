.. include:: /substitutions.rsti

Configuring an IPsec Remote Access Mobile VPN using IKEv1 Xauth
===============================================================

Many types of devices may be connected to pfSense using IPsec, most
notably Android (Phones and Tablets) and iOS (iPhone, iPad, iPod Touch,
etc) devices but anything that is capable of IPsec will typically work.
Clients also exist for Windows, OSX, and so on.

This document covers the most common setup for mobile devices, which is
IPsec using Xauth and a mutual Pre-Shared Key.

This setup has been tested and working on various :ref:`Android
<ipsec-ikev1-setup-android>` and :ref:`iOS <ipsec-ikev1-setup-ios>` devices (see
text and links below for more detail). Other clients may work as well.

IPsec Server Setup
------------------

This is the setup for the pfSense side of the connection

Mobile Clients
~~~~~~~~~~~~~~

-  Navigate to **VPN > IPsec**, **Mobile Clients** tab
-  Check **Enable IPsec Mobile Client Support**
-  Check **Provide a virtual IP address to clients**
-  Enter an unused subnet in the box, pick a subnet mask
-  Set any other desired options here
-  Click **Save**
-  Click **Apply Changes**
-  Click **Create Phase1** (if it appears)

Phase 1 settings
~~~~~~~~~~~~~~~~

-  Navigate to **VPN > IPsec**
-  Locate the Mobile Phase 1 in the list
-  Click |fa-pencil| to edit the Mobile Phase 1
-  Enter the following settings:

   -  **Authentication method**: *Mutual PSK + Xauth*
   -  **Negotiation mode**: *aggressive*
   -  **My identifier**: *My IP address*
   -  **Peer identfier**: *User Distinguished Name*,
      *vpnusers@example.com*
   -  **Pre-Shared Key**: *aaabbbccc* (Use something much longer and
      more random!)
   -  **Policy Generation**: *Unique*
   -  **Proposal Checking**: *Strict*
   -  **Encryption Algorithm**: *AES 128*
   -  **Hash Algorithm**: *SHA1*
   -  **DH Key Group**: *2*
   -  **Lifetime**: *86400*
   -  **NAT Traversal**: *Force*
   -  Click **Save**

Phase 2 settings
~~~~~~~~~~~~~~~~

-  Click |fa-plus| inside the Mobile Phase 1 to expand its Phase 2 list.
-  Click |fa-plus| to add a new Phase 2
-  Enter the following settings:

   -  **Mode**: *Tunnel*
   -  **Local Network**: *(the local network, e.g. LAN, or 0.0.0.0/0 to
      send everything over VPN)*
   -  **Protocol**: *ESP*
   -  **Encryption Algorithms**: *AES 128* **only**
   -  **Hash Algorithms**: *SHA1* **only**
   -  **PFS key group**: *off*
   -  **Lifetime**: *28800*

-  Add additional phase 2 entries for additional local networks if
   necessary
-  Click **Save**
-  Click **Apply Changes**

User Settings
~~~~~~~~~~~~~

-  Navigate to **System > User Manager**
-  :doc:`Add a user </usermanager/managing-local-users>`, grant the user the *User - VPN - IPsec
   xauth Dialin* permission, or add them to a group with this
   permission.

   -  Note that for xauth, the password used is the password for the
      user, not the "IPsec Pre-Shared Key" field. That is used for
      non-xauth IPsec.

Firewall Rules
~~~~~~~~~~~~~~

Don't forget to add firewall rules to pass traffic from clients

-  **Firewall > Rules**, **IPsec** tab
-  Add rules that match the traffic that should be allowed, or add a
   rule to pass any protocol/any source/any destination to allow
   everything.

IPsec SA Preference
~~~~~~~~~~~~~~~~~~~

-  **System > Advanced**, **Miscellaneous** tab.
-  Uncheck **Prefer Old IPsec SA**

.. _ipsec-ikev1-setup-android:

Device Setup (Android)
----------------------

.. note:: These settings are not present on all Android devices. See
   :doc:`Android VPN Connectivity </vpn/android-vpn-compatibility>` for more info.

-  Tap Settings, Networks & Wireless, VPN Settings, Advanced IPsec VPNs
-  From there, press the menu button, then add.
-  **Connection Template**: *PSK v1 (AES, xauth, aggressive)*
-  **VPN Name**: *pfSense VPN* (Or some other description)
-  **VPN Server**: *IP of the server*

   -  The phone forces the keyboard to numbers, not sure if a hostname
      is supported.

-  **Pre-Shared Key Type**: *text*
-  **Pre-Shared Key**: *PSK from the Phase 1 above*
-  **Identity Type**: **User FQDN**
-  **Identity**: *vpnusers@example.com*
-  **Username**: *xauth username*
-  **Password**: *xauth password*
-  **Internal Subnet IP**: *Whatever subnet(s) were specified in Phase 2
   above*.
-  Finish

.. _ipsec-ikev1-setup-ios:

Device Setup (iOS)
------------------

-  Tap **Settings** > **General** > **Network** > **VPN**
-  Tap **Add VPN Configuration**
-  Tap **IPsec**
-  **Description**: *pfSense VPN* (Or some other description)
-  **Server**: *IP of the server*
-  **Account**: *xauth username*
-  **Password**: *xauth password* (or leave blank to be prompted every
   time)
-  **Group Name**: *vpnusers@example.com*
-  **Secret**: *PSK from the Phase 1 above*

Troubleshooting
---------------

By default iOS will tunnel all traffic over the VPN, including traffic
going to the Internet. If Internet sites are inaccessible once
connected, a DNS server may need to be pushed to the client for it to
use, such as the LAN IP address of the firewall if the DNS forwarder is
enabled, or a public DNS server such as 8.8.8.8/8.8.4.4.

The reason for the above is that the 3G provider is likely giving mobile
devices DNS servers that are only accessible from their network. Once
connected to the VPN the DNS servers are now being accessed via the VPN
instead of the 3G network, and the queries are likely to be dropped.
Supplying a local/public DNS server will work around that.

