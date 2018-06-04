.. include:: /substitutions.rsti

L2TP/IPsec on Android
=====================

The L2TP/IPsec client on Android has the ability to set a custom
identifier, which allows L2TP/IPsec to function with pfSense's server
using Pre-Shared Keys. Clients on other operating systems do not allow
for this, which makes them incompatible with current versions of
pfSense.

IPsec Setup
-----------

The setup is similar to a standard :doc:`IPsec Road Warrior/Mobile Client How-To </vpn/ipsec/configuring-an-ipsec-remote-access-mobile-vpn-using-ikev1-xauth>` setup except that
xauth is not used, but rather “**Mutual PSK**”, and Phase 2 uses
**Transport** mode rather than Tunnel.

Pre-Shared Keys
~~~~~~~~~~~~~~~

After the tunnel has been configured, click to the “Pre-Shared Keys” tab
in the IPsec settings, and add IPsec keys. A single group key may be
used if desired, or make many keys for different users.

That's it for IPsec!

L2TP Setup
----------

To setup L2TP navigate to VPN > L2TP

-  Select **Enable L2TP Server**
-  **Interface** is **WAN** (or the same chosen for IPsec)
-  **Server Address** is an **unused IP address** in a new subnet. It
   **MUST NOT** overlap any IP in use on the firewall, e.g x.x.x.2
-  **Remote Address Range** is the starting IP of the clients, e.g.
   x.x.x.128
-  **Subnet netmask** is the netmask for the client connection, the
   server IP should be included in this subnet, e.g. /24
-  **Secret** should be **left blank**, it does not appear to work, at
   least with the Android version tested.
-  **Encryption Type**: CHAP is recommended
-  **L2TP DNS Servers**: The firewall's actual LAN IP, or another
   internal DNS server
-  RADIUS settings - if needed, use them, otherwise leave them alone
-  Save
-  Flip to the Users tab and add L2TP user accounts and passwords there
-  Now go to **Firewall > Rules** on the **L2TP VPN** tab, and add a
   firewall rule to pass traffic, e.g from any to any or much more
   restrictive if preferred.

Android Client Setup
--------------------

On the phone/tablet/device:

-  Go to the system settings and VPN settings (varies by device and
   specific Android version
-  Tap **Add VPN Profile**
-  Enter a name
-  For **Type**, tap *L2TP/IPsec PSK*
-  **Server Address**: The WAN IP of pfSense (or the IP of the interface
   chosen for IPsec and L2TP)
-  **L2TP Secret**: **Left blank**
-  **IPsec Identifier**: Enter the identifier for the PSK entered above,
   either a per-user or common identifier
-  **IPsec Pre-Shared Key**: The PSK that goes with the identifier for
   this user/group
-  The advanced options may be used to control which networks will
   attempt to use the VPN, or specify custom DNS server and domains for
   this client.
-  Tap **Save**
-  From the VPN list, tap the newly created VPN entry
-  Enter the **username** and **password** from the **L2TP Users** tab
   entered above
-  Check **Save account information** to save the VPN credentials (not
   recommended!),
-  Tap **Connect**

The connection should then connect and function. If it does not work,
check the IPsec logs and the **Status > System Logs**, **VPN**, **L2TP
Raw log** to see more specific errors.

Other Thoughts
--------------

In theory, Mutual RSA should also work, but so far it has not succeeded
in testing. In RSA mode, Phase 1 requires main mode, but otherwise
should be OK.
