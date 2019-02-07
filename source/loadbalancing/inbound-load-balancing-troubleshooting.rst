Troubleshooting Inbound Load Balancing
======================================

A more thorough troubleshooting guide for inbound load balancing can be found in
the |book_link|.

#. Ensure that all servers in the pool have pfSense set as their gateway
   (very important)
#. Make sure pools have been defined in **Services > Load Balancer** on
   the **Pools** tab
#. Create a Virtual server mapping the Server Address (public firewall
   ip) to the pool
#. Add a firewall rule on the WAN or OPT interface permitting traffic to
   the internal pool IP addresses. Aliases are handy for this task

If trouble continues, gather this information and send a request for
help on the forum or the support mailing list.

.. code::

  cat /var/etc/relayd.conf
