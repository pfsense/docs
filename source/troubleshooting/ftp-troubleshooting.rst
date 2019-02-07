Troubleshooting FTP Connections
===============================

In pfSense 2.0.x and 2.1.x, the FTP proxy is in-kernel. The only options
to control its behavior are an on/off switch and a list of ports to be
used by the proxy.

In pfSense 2.2.x and newer, there is no built-in FTP proxy. See
:doc:`/nat/ftp-without-a-proxy`.

Disabling the FTP Proxy
-----------------------

If the FTP proxy must be disabled, this may be done by visiting **System
> Advanced**, on the **System Tunables** tab, then set
*debug.pfftpproxy=1*. Set it to *0* again to enable the proxy.

FTP Ports
---------

FTP traffic is identified by the use of port 21. Other ports can be used
if they added to a comma-separated list in the system tunable
*debug.pfftpports* (e.g. *21,2121,4559*)

Rules to allow FTP
------------------

If problems are encountered with FTP, check the rules to/from FTP
devices, ensure that both the control port and PASV range are allowed.

Troubleshooting/Alternatives
----------------------------

#. Disable the FTP Proxy and attempt the connection again
#. Use SCP/SFTP which only needs 1 port to traverse the firewall since
   it is wrapped in SSH (yes a safe AND simple way of traversing a
   firewall!)
#. Don't use FTP (highly recommended option)
