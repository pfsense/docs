.. include:: /substitutions.rsti

What are the limitations of PPTP in pfSense
===========================================

There are two limitations of PPTP *in pfSense*, due to limitations in
the NAT capabilities of *pf*.

1. If the PPTP server is enabled, no clients behind the firewall can
connect to a PPTP server on the Internet if they have NAT applied to the
same public IP used by the PPTP server on pfSense. If another public IP
is available, it can be used to NAT the PPTP traffic destined for a
specific remote server out that way. See `this
how-to <Connect_to_a_remote_PPTP_server_with_the_pfSense_PPTP_server_enabled>`__.

2. Only one client can connect to a given PPTP server on the Internet
simultaneously. 10 clients can connect to 10 different servers, but only
a single simultaneous connection can exist to a single remote server.

In addition to these limitations on pfSense, PPTP in general has many
limitations, especially from a security standpoint. As stated in the
warning above, it should not be used no matter how strongly a client
pushes to have it enabled.

