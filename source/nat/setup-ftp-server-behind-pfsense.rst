Setup ftp server behind pfSense
===============================

These instructions will allow you to set up an FTP server behind a
pfSense® firewall.

Simple Port Forward to FTP Server
---------------------------------

#. Delete any FTP rules
#. Setup the FTP server to have a narrow range for passive ports. Keep
   enough based on usage and FTP server requirements but as low as
   possible for security reasons. This may take some experimenting and
   tweaking. Exactly how to do this will vary based on the FTP server
   software.
#. Set the passive IP response to respond with the PUBLIC IP address
   forwarded in **pfSense**. Again how to do this will vary based on FTP
   server and some do not have the capability.
#. Create port forward rules to forward **BOTH** port 21 and the passive
   range specified on the FTP server to the local LAN IP of the FTP
   server.

See this article for better detail: :doc:`/nat/ftp-without-a-proxy`.
