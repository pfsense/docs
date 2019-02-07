*********************
Server Load Balancing
*********************

Server Load Balancing, or Inbound Load Balancing, provides redundancy for local
hosted services using the ``relayd`` daemon. This is a simple service that does
not have advanced capabilities and is only suited for small deployments with
very basic requirements.

.. note:: The :doc:`HAProxy package </packages/haproxy-package>` provides
   superior and more robust load balancing capabilities. We recommend using it
   instead of the built-in ``relayd`` load balancer where possible.

.. toctree::
   :maxdepth: 1

   inbound-load-balancing
   inbound-load-balancing-status
   load-balancer-logs
   inbound-load-balancing-troubleshooting
