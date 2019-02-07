Gateway Monitoring Errors
=========================

In some cases, the dpinger gateway monitoring daemon will output numeric
error codes in the Gateways log indicating a problem reaching the
monitored target IP address. The errors on this page are the most
common.

sendto error: 55
----------------

.. code::

  55 ENOBUFS
  No buffer space available.
  An operation on a socket or pipe was not performed because the system lacked sufficient buffer space or because a queue was full.

Several possible conditions can cause this. For a list of possible
causes and solutions, see :doc:`No buffer space available </routing/no-buffer-space-available>`.

sendto error: 64
----------------

.. code::

  64 EHOSTDOWN
  Host is down.
  A socket operation failed because the destination host was down.

In this case, the firewall is unable to reach the a target host directly
connected at layer 2 (No ARP response), or it received a similar error
response from an upstream source. Generally this only happens due to
remote problems, indicating that the target is actually down or the
L1/L2 link to the target is down.

sendto error: 65
----------------

.. code::

  65 EHOSTUNREACH
  No route to host.
  A socket operation was attempted to an unreachable host.

Either there is no possible route to the target locally, or status
information was received from an upstream router that indicated the same
condition elsewhere along the path to the target.

This can happen due to a lack of default route, missing interface link
route, or similar conditions.
