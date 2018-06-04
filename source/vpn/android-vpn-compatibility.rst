.. include:: /substitutions.rsti

Android VPN Compatibility
=========================

VPN connections may easily be established between an Android device and
pfSense in multiple ways.

This is a *summary* of the following information only. Please keep
reading for more details!

Table: pfSense 2.2+

+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+
| Android Version            | Protocol   |            |           |             |                              |              |                      |                 |                 |
+============================+============+============+===========+=============+==============================+==============+======================+=================+=================+
| ↓                          | L2TP       | IPSec      | OpenVPN   |             |                              |              |                      |                 |                 |
+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+
| ↓                          | CHAP/PAP   | PSK        | RSA       | Xauth PSK   | Xauth RSA                    | Hybrid RSA   | IKEv2 EAP-MSCHAPv2   | IKEv2 EAP-TLS   | 3rd-party App   |
+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+
| 2.1 (Eclair)               | Probably   | ?          | ?         | ?           | ?                            | ?            | ?                    | ?               | Maybe           |
+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+
| 2.2.1 (Froyo)              | Probably   | ?          | ?         | ?           | ?                            | ?            | ?                    | ?               | Maybe           |
+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+
| 2.3 (Gingerbread)          | Probably   | ?          | ?         | ?           | Yes (see text for details)   | ?            | ?                    | ?               | Maybe           |
+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+
| 3.0 (Honeycomb)            | Probably   | ?          | ?         | ?           | Probably                     | ?            | ?                    | ?               | Maybe           |
+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+
| 4.0 (Ice Cream Sandwich)   | Probably   | Probably   | ?         | ?           | Probably                     | ?            | Yes                  | Yes             | Yes             |
+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+
| 4.1 (Jelly Bean)           | Yes        | Yes        | ?         | ?           | Yes                          | ?            | Yes                  | Yes             | Yes             |
+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+
| 4.2 (Jelly Bean)           | Probably   | Probably   | ?         | ?           | Probably                     | ?            | Yes                  | Yes             | Yes             |
+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+
| 4.2.2 (Jelly Bean)         | Probably   | Probably   | ?         | ?           | Yes                          | ?            | Yes                  | Yes             | Yes             |
+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+
| 4.3 (Jelly Bean)           | Probably   | Probably   | ?         | ?           | Yes                          | ?            | Yes                  | Yes             | Yes             |
+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+
| 4.4 (KitKat)               | Probably   | Probably   | ?         | Probably    | Yes                          | ?            | Yes                  | Yes             | Yes             |
+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+
| 5.0 (Lollipop)             | ?          | ?          | ?         | ?           | Yes                          | ?            | Yes                  | Yes             | Yes             |
+----------------------------+------------+------------+-----------+-------------+------------------------------+--------------+----------------------+-----------------+-----------------+



Notes
-----

IKEv2 support on Android 4+ works with the `strongSwan app <https://play.google.com/store/apps/details?id=org.strongswan.android&hl=en>`__

.. warning:: PPTP is no longer considered a secure VPN technology because it
   relies upon MS-CHAPv2 which has been compromised. If you continue to use PPTP
   be aware that intercepted traffic can be decrypted by a third party, so it
   should be considered unencrypted. We advise migrating to another VPN type
   such as OpenVPN or IPsec.

   More information on this can be found at:

   * https://isc.sans.edu/diary/End+of+Days+for+MS-CHAPv2/13807
   * https://www.cloudcracker.com/blog/2012/07/29/cracking-ms-chap-v2/

- L2TP - Works - Both PAP and CHAP work fine. IP config similar to PPTP

  .. note:: L2TP on its own is just a tunneling protocol, it does not
     encrypt traffic!

- L2TP with Shared Secret - Does not work
- L2TP+IPsec mode - Works in certain cases where the client can set a
  custom identifier. See :doc:`L2TP/IPsec on Android </vpn/ipsec/l2tp-ipsec-on-android>`. YMMV.

Android 2.1 (Eclair)
--------------------

See this note on Android and PPTP from a user on `the forum <http://forum.pfsense.org/index.php/topic,34485.0.html>`__:

    Android 2.1 does not have MPPE and therefor will not connect to
    -any- PPTP server that requires encryption.

Android 2.3 (Gingerbread) IPsec
-------------------------------

For some devices, Gingerbread brought with it the “Advanced IPsec VPN”
choices that will let it work with 2.0 and most likely other scenarios
as well. Specifically these options are found on at least the Motorola
Droid X, and likely others.

The VPN choices on these versions are:

-  Cert v1 (AES)
-  Cert v1 (AES, aggressive)
-  Cert v1 (AES, xauth)
-  Cert v2 (AES)
-  L2TP Cert v1 (AES)
-  L2TP PSK v1 (AES)
-  PSK v1 (AES)
-  PSK v1 (AES, xauth)
-  PSK v1 (AES, xauth, aggressive) *[Tested, working]*
-  PSK v2 (AES)

The choices that use main mode (anything that isn't labeled
“aggressive”) likely won't work as the IP of the phone is used as the
identifier, no matter what is entered in the phone's GUI, so it would
require anonymous PSKs which are only available on pfSense 2.2 and
later. Some Android IPsec GUIs may have an option to manually set an
identifier. If that is present, it can work.

PSK v1 (AES, xauth, aggressive) works against a 2.0 server when properly
configured. This combination is reported to work well - see `IPsec Road
Warrior/Mobile Client
How-To <IPsec_Road_Warrior/Mobile_Client_How-To>`__ for configuration
details.

If another mode works that is not listed, let us know. The certificate
method (Cert v1 (AES, aggressive)) should work in theory but has not yet
been tested.

Android 4.0 (Ice Cream Sandwich) IPsec
--------------------------------------

With ICS, the VPN options have been revamped and the following choices
are available:

-  L2TP/IPsec PSK
-  L2TP/IPsec RSA
-  IPsec Xauth PSK
-  IPsec Xauth RSA
-  IPsec Hybrid RSA

Of those, at least the IPsec Xauth PSK option should work, but testing
is needed to confirm.

Android 4.1 (Jelly Bean) IPsec
------------------------------

Should be identical to 4.0. One report so far of a working configuration
with XAuth:
`1 <http://lists.pfsense.org/pipermail/list/2013-February/003499.html>`__

Android 4.2 (Jelly Bean) IPsec
------------------------------

Should be identical to 4.1.

Android 4.2.2 (Jelly Bean) IPsec
--------------------------------

Should be identical to 4.2. One report so far of a working configuration
with XAuth:
`2 <http://lists.pfsense.org/pipermail/list/2013-September/004575.html>`__

Android 4.3 (Jelly Bean) IPsec
------------------------------

Should be identical to 4.2.x. One report so far of a working
configuration with XAuth:
`3 <http://lists.pfsense.org/pipermail/list/2013-September/004575.html>`__

Android 4.4 (KitKat) IPsec
--------------------------

Should be identical to 4.3.

Android 5.0 (Lollipop)
----------------------

OpenVPN and IKEv2 are working fine

OpenVPN on Android (Non-Root)
-----------------------------

Android 2.1 - 3.2: The `FEAT VPN <https://play.google.com/store/apps/details?id=com.featvpn.app.comm>`__
client, claims to not require root access and to work on older versions
of Android.

Android 4.0 introduces a VPN API, so there are quite a few more
third-party clients available.

-  This `OpenVPN client <https://play.google.com/store/apps/details?id=de.blinkt.openvpn>`__
   apparently has a good track record.
-  The `FEAT VPN <http://www.featvpn.com/>`__ client also works on 4.0+
   but a special version must be downloaded from the `home page <http://www.featvpn.com/>`__.
-  There is an `Official OpenVPN client <https://play.google.com/store/apps/details?id=net.openvpn.openvpn>`__.
-  In fact, there's `quite a few listed now <https://play.google.com/store/search?q=openvpn>`__.

Android 4.4 (KitKat)
~~~~~~~~~~~~~~~~~~~~

Android 4.4 (KitKat) removed the “tun” device (/dev/tun); this change is
reported to break most, if not all, of the OpenVPN clients, but has
since been worked around.

Testing results
~~~~~~~~~~~~~~~

The FEAT VPN client has been tested and shown towork on an Asus
Transformer Prime and a Motorola Droid Razr, both with Android 4.0.x.

`Stefan Baur confirms <http://lists.pfsense.org/pipermail/list/2013-November/005176.html>`__
that the FEAT client works on his Motorola Milestone 2 (aka European/GSM
“Droid 2”), and that none of the clients he tested work under Android
v4.4 (KitKat).

Exporting configuration
~~~~~~~~~~~~~~~~~~~~~~~

With the latest update to the pfSense OpenVPN Client Export package, an
“Inline Configuration” can be exported that has the config, the certs,
keys, etc, in a single file. This file imports into the client linked
above quite easily, as follows:

-  Export the Inline Configuration
-  Transfer the config to the phone (copy the file directly, e-mail it
   to the device and use a mail client that can save attachments, grab
   it from a file share on the network, etc.)
-  Open the OpenVPN App
-  Click “All your precious VPNs”
-  Click Import (File folder icon in top right)
-  Find the ovpn file saved above, click it
-  Click Select
-  Click the Save icon

.. note:: When using K9 mail, and possibly others, when the attachment is
   saved to /mnt/sdcard/ the OpenVPN app will launch and import
   automatically.

Now that it's saved, the username must be set if User Auth is configured
on the VPN server.

-  In the list of VPNs, click the icon to edit the VPN (looks like three
   sliders)
-  Click Edit in the top bar (Pencil icon)
-  Click Basic
-  Fill in the Username
-  Click back a couple times to get back to the VPN list

The VPN should now connect.

After the VPN has been successfully configured and tested, remember to
remove the .ovpn file from the SD card in the Android device. The
settings are stored securely by the app, so keeping the file on insecure
storage is not needed nor recommended.

L2TP/IPsec on Android
---------------------

L2TP/IPsec in PSK mode has been proven to work at least on Android
4.1.x. For instructions, see :doc:`L2TP/IPsec on Android </vpn/ipsec/l2tp-ipsec-on-android>`
