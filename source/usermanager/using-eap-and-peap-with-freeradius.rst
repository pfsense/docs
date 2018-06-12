.. include:: /substitutions.rsti

Using EAP and PEAP with FreeRADIUS
==================================

Using EAP/PEAP with the :doc:`FreeRADIUS 2.x package </usermanager/freeradius-2-x-package>`.

General EAP configuration
-------------------------

The default EAP settings will work in most situations (EAP-MD5, EAP-TLS,
EAP-TTLS, EAP-PEAP) so there is no need to change them without any need.
If EAP-TTLS or EAP-PEAP is used with VLAN assignment then set **Use
Tunneled Reply** to *yes*:

To make the use of certificates more secure, check the **Common Name**
of the client certificate against the username entered in **FreeRADIUS >
USers**. For this set **Check Client Certificate CN** to *yes*:

Another option to increase security with certificates is to check the
issuer of the client certificate against the CA certificate. This can be
enabled with **Check Cert Issuer** but then it is necessary to enter
country, state, province and organization - case sensitive - to match
the CA.

FreeRADIUS by default allows many EAP types for authentication. In some
environments only some strong EAP types (TLS, TTLS, PEAP, MSCHAPv2) may
be allowed or weak types (MD5, GTC, LEAP) may be disallowed. Disable the
weak EAP types in FreeRADIUS using **Disable weak EAP types** so that
FreeRADIUS rejects users which try to authenticate using such a weak
method. If these types are disabled it does **not** affect the inner
tunnel session in EAP-TTLS and EAP-PEAP. Further it is no problem to use
a weak or cleatext method in the inner tunnel because if the outer
tunnel uses one of the above call strong encryption types.

FreeRADIUS is multitalented. It can handle almost all authentication
types hosts send. So if weak encryption types such as MD5 and others are
not disabled then the following will happen::

  a client wants to authenticate using MD5 => freeradius will do that
  a client wants to authenticate using LEAP => freeradius will do that
  a client wants to authenticate with TLS or TTLS or PEAP or MSCHAPv2 or ... => freeradius will do that

So **disable weak encryption** is checked then this disables MD5, GTC
and LEAP. This will happen::

  a client wants to authenticate using MD5 -> freeradius will not do that because that was disabled
  a client wants to authenticate using LEAP -> freeradius will not do that because that was disabled
  a client wants to authenticate with TLS or TTLS or PEAP or MSCHAPv2 or... -> freeradius will do that.

PEAP and MSCHAPv2
-----------------

-  FreeRADIUS package configuration:

   -  Configure an interface in **FreeRADIUS > Interfaces**
   -  Create a **CA-Certificate** and a **Server-Certificate**. Choose
      pfSense Cert-Manager or FreeRADIUS Cert-Manager but **never** use
      the default certificates which come with FreeRADIUS after package
      installation!
   -  Select the certificates in **FreeRADIUS > EAP**. If FreeRADIUS as
      Cert-Manager is selected then nothing needs changed. If pfSense
      Cert-Manager was chosen, then it must be enabled there and the
      certs must be chosen from the pulldown menu. Click **Save**.
   -  Add the WLAN-AccessPoint in **FreeRADIUS > NAS/Clients**
   -  Add a username/password in **FreeRADIUS > Users**

-  WLAN Access-Point Configuration:

   -  Change the wireless encryption to **WPA-Enterprise** or better
      **WPA2-Enterprise** with **TKIP** or better **AES/CCMP**
   -  Do **not** use a passphrase but select **RADIUS** or **802.1X**.
      Enter the IP-Address of the pfSense FreeRADIUS-Server and the
      shared secret according to that what was entered in **FreeRADIUS >
      NAS/Clients**

-  WLAN Device (Supplicatnt) Configuration:

   -  Some devices can autoconfigure the Authentication- and
      Encryption-Method. If not choose **PEAP as encryption** and
      **MS-CHAPv2 as
      Authentication**.\ `1 <http://www-sga.iai.uni-bonn.de/Wob/images/51263715.jpg>`__
   -  Connect to WLAN AccessPoint and the client will be prompted for
      username and password
   -  Some devices auto-accept the CA-Certificate as valid. Often this
      CA-Certificate will first need to be accepted. This is the
      certificate created on pfSense.

If Authentication isn't working then on some devices (Windows XP) "Check
server certificate" may be disabled.

The most part of the "command line action" which is done in these
tutorials can be done from FreeRADIUS GUI.

-  A very good how-to with screenshots in german language can be found
   `here <http://www.administrator.de/index.php?content=142241>`__.
-  There is another good how-to in english language on
   `freeradius <http://www.freeradius.org>`__ website. The direct link
   can be found
   `here <http://wiki.freeradius.org/WPA_HOWTO#HOWTO+Do+It%3A+An+Outline>`__.

EAP-TLS
-------

-  pfSense configuration:

   -  Create a **CA**, a **Server-Certificate** and a
      **Client-Certificate**. Using **System > Cert Manager** is
      recommended.

-  FreeRADIUS configuration:

   -  Create an **interface**, add a **NAS/Client** and create a
      **user**. For this example, use *myuser* as username and *mypass*
      as password.
   -  The EAP default options are working - read
      :doc:`/usermanager/freeradius-2-x-package`.
   -  Using **pfSense Cert-Manager** and selecting the CA and the server
      certificate is recommended.
   -  Leave the password field empty
   -  Download the CA.crt - **not the key** - from **System > Cert
      Manager**, **CAs** tab and Client *.p12* from **System > Cert
      Manager**, **Certificates** tab

-  Windows XP configuration:

   -  Import **CA.crt** and **Client.p12**
   -  Set the authentication type to **smart card or other certificate**
      `2 <http://www.wpi.edu/academics/CCC/Netops/Wireless/Setup/xp-imgs/WPA-0006.jpg>`__
   -  Check **Use a certificate on this computer**

      -  Check **Use simple certificate selection**

   -  Check validate server certificate
   -  Select **Trusted root certificate authorities** which is the CA
      imported
      before.\ `3 <http://i.technet.microsoft.com/dynimg/IC120658.gif>`__
   -  Check **use a different username for connection** if the Windows
      logon name is **not** the same as set in **FreeRADIUS > Users** or
      if **Check cert CN** was set and the Windows logon name does not
      match the client CN.

-  Client Requires password on .p12

   -  If your client will not load the .p12 without a password on it,
      and space does not work you can add a password with openssl
   -  Just download user cert and key vs the p12 and with the ca cert
      use the following command
   -  openssl pkcs12 -export -certfile ca.crt -in user.crt -inkey
      user.key -out user.p12
