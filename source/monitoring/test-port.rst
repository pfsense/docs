Test Port
=========

The **Test Port** function, found under the **Diagnostics** menu,
conducts a simple TCP connection test to determine if a **Host** is up
and accepting connections on a given **Port**. This test does not
function for UDP since there is no way to reliably determine if a UDP
port accepts connections in this manner. This test does not function as
a NAT test, only as a direct connection to an IP address and port with a
listening daemon.

No data is transmitted to the remote host during this test, it will only
attempt to open a connection and optionally display the data sent back
from the server.

In the default mode, a simple TCP handshake is attempted (SYN, SYN+ACK,
ACK), and if it completes, then a successful result is reported.

If **Show Remote Text** is checked, the test will open up the port and
read data for approximately 10 seconds, after which time the output will
be shown to the user. Not all daemons will output text to the user on
connect, so in some cases this may be blank even if the service is
working properly. For example, an SMTP server will respond with a
welcome message, as will FTP, but an HTTP daemon will not send any text.

The options on the page allow control over the IP and port to be tested,
and how the test will be initiated from the firewall.

When using a hostname as the target, the IP Protocol selection will
force the use of IPv4 or IPv6, but care must be taken to avoid a
conflict such as providing a hostname that only contains an IPv4 record
but forcing IPv6.

Troubleshooting
---------------

.. code::

  nc: bind failed: Address already in use

This error will occur if the **Source Port** field is set to a port that
is already bound to a local daemon on the firewall. Leave **Source
Port** blank or pick another unused port. To see :doc:`ports that are currently in use </monitoring/viewing-active-network-sockets>`, visit **Diagnostics > Sockets**
