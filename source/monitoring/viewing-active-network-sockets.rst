Viewing Active Network Sockets
==============================

The **Diagnostics > Sockets** page presents a list of active TCP/IP
sockets for both IPv4 and IPv6 *used by the firewall itself*.

This list is useful for determining which IP addresses and ports are in
use by various system processes or packages. It is interpreted from the
output of the FreeBSD command "*sockstat*".

By default, only *listening* sockets are shown. Click **Show all socket
connections** to also display sockets in use by the system making
connections to external hosts.

The output of this command only shows sockets used by the firewall OS
for daemons or other programs on the firewall. It does **not** show
connections for traffic passing through the firewall.

