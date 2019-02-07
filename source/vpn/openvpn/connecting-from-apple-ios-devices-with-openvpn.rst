Connecting from Apple iOS Devices with OpenVPN
==============================================

iOS is now capable of running OpenVPN natively without needing to
jailbreak the iOS device. The iOS OpenVPN client is called `OpenVPN
Connect <https://itunes.apple.com/us/app/openvpn-connect/id590379981>`__
and is available in the App Store.

The app must have the OpenVPN configuration file and certificates
configured outside of the iOS device and then imported to it. The most
recent version of the :doc:`OpenVPN Client Export Package </vpn/openvpn/using-the-openvpn-client-export-package>` on pfSense may be used to
export an Inline Configuration, and then transfer the resulting *.ovpn*
file to the target device. Then use iTunes to transfer the files into
the app or e-mail it to the device. Another option is to use a cloud
sync tool, dropbox for example.

Getting The Configuration Onto the Device
-----------------------------------------

E-mail the VPN file to the device, open the Mail app and then open the
attachment and click OpenVPN from there.

Using cloud sync application like dropbox, googledrive, box, etc. Same
thing just click open with OpenVPN from that application on the *.ovpn*
file.

Using iTunes to transfer the configuration to the iOS device is rather
simple.

-  Make sure the most recent version of the :doc:`OpenVPN Client Export Package </vpn/openvpn/using-the-openvpn-client-export-package>` is loaded on pfSense
-  Export the Inline Configuration file for the VPN
-  Connect the iOS device to a computer and open iTunes
-  Find and install the OpenVPN Connect app
-  Inside of iTunes, click the device icon in the toolbar
-  Click on the Apps tab to open the list of apps on the device
-  Under File Sharing, click OpenVPN
-  Drag and drop the *.ovpn* file into this area, or click Add and
   locate the file that way

Importing the Configuration
---------------------------

-  Open the OpenVPN Connect app and it should offer to import the
   profile
-  Click the + button, and the profile should import

Using the VPN
-------------

-  Enter a username/password if authentication is enabled on the VPN.
   Toggle save if to store the password
-  Slide the bottom slider to On and it will connect
-  If needed, the status indicator (Disconnect/Connect) will show the
   logs when tapped
-  Slide to Off to disconnect

Other Notes
-----------

This OpenVPN client does not fully support IPv6 in our current
configuration, but may in the future. It has some other limitations,
such as not supporting tap mode or the tls-remote option, but ultimately
it works well for what most people need.

If manually building a configuration file for this client, it requires
either an inline configuration style or separate CA, Cert, Cert Key, and
if used, TLS key files. It does not appear to accept .p12 files
containing the CA and client certificate/keys.

If attempting to import a previously exported inline style config, first
edit the file and remove any lines containing "[inline]" and also
"tls-remote". It should then be possible to import the configuration
file.
