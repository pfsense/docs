.. include:: /substitutions.rsti

What are the limitations of PPTP in pfSense
===========================================

.. warning:: PPTP in general has many limitations, especially from a security
   standpoint. It should not be used no matter how strongly a client pushes to
   have it enabled.

There are limitations of PPTP *in pfSense*, due to limitations in the NAT
capabilities of ``pf``.

Only one client can connect to a given PPTP server on the Internet
simultaneously. 10 clients can connect to 10 different servers, but only a
single simultaneous connection can exist to a single remote server.
