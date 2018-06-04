.. include:: /substitutions.rsti

Using NAT and FTP without a Proxy
=================================

pfSense 2.2-RELEASE does not include an FTP Proxy. What does this mean
for clients and servers? Not as much as one might think.

Use of FTP is strongly discouraged. It is a very old protocol that
transmits credentials and other data openly without encryption which is
very insecure.

Client Behind pfSense
---------------------

FTPS, or encrypted FTP, is not affected. The proxy could not have
affected its traffic before.

A client on a LAN or other internal interface behind a pfSense firewall
will likely not notice any difference. Most clients, aside from the
Microsoft command line FTP program, default to passive (PASV) FTP, where
clients make outbound connections to servers.

Passive mode on the client will require access to random/high ports
outbound, which could run afoul of a strict outbound ruleset.
Environments with a security policy that requires strict outbound
firewall rules likely would not be using FTP anyhow, as it transmits
credentials without encryption.

Active mode FTP through NAT will not function as that relies on a proxy
or similar mechanism. Use Passive mode instead. Another option is the
recently added FTP Client Proxy package which leverages in FreeBSD to
allow clients on local interfaces to reach remote FTP servers with
active FTP.

Active mode FTP for a client that does not involve NAT (Client has a
public IP address) should work so long as WAN rules pass the appropriate
traffic back to the client. The client may have a configurable active
port range to make that simpler.

Server Behind pfSense
---------------------

FTPS, or encrypted FTP, is not affected. The proxy could not have
affected its traffic before.

A server behind pfSense would work fine with active mode, there would be
no difference here. In active mode the server would make outbound
connections back to the client, so as long as the firewall rules on the
interface containing the server allow outbound connections, it will
work.

A server behind pfSense running in Passive mode will function but
requires a few items to be configured: 1. Port forwards or 1:1 NAT to
forward not only port 21, but also the passive port range in to the
server 2. The passive port range must be configured on the server,
corresponding to the range of ports forwarded in the previous step 3.
The server may also need to be configured to account for NAT. Some
clients will ignore private addresses in passive responses so this may
not be necessary.

Sample Configuration for vsftpd
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In vsftpd.conf::

  # Do not allow the client to use PORT
  port_enable=NO
  # Use the hostname in the PASV response (DNS must be setup and match!)
  pasv_addr_resolve=YES
  # Enable Passive Mode
  pasv_enable=YES
  # Set the passive port range (1000 ports)
  pasv_min_port=20000
  pasv_max_port=20999
