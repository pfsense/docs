Blocking DNS Queries to External Resolvers
==========================================

This procedure will allow the firewall to block DNS requests to servers
that are off this network. This can force DNS requests from local
clients to use the DNS Forwarder or Resolver on pfSense for resolution.
When combined with OpenDNS, this allows DNS-based content filtering to
be enforced on the local network.

#. Setup OpenDNS servers (or whatever DNS servers are preferred) in
   **System > General**. For OpenDNS, that would be ``208.67.222.222`` and
   ``208.67.220.220``
#. Add a firewall rule on **Firewall > Rules**, **LAN** tab permitting
   *TCP/UDP* source: *any* to the firewalls LAN IP Address, port ``53``
   (destination IP and port)
#. Move this newly created rule from step #2 to the very top of the LAN rules
#. Add a new rule blocking protocol *TCP/UDP* source: *any* destination: *any*.
#. Move the rule created in step #4 to the second position behind the permit
   rule that was moved in step #3.
#. That's it. Enjoy the fact that the hosts behind pfSense can only talk to the
   built in DNS resolver running on LAN which uses OpenDNS.

When complete, there will be two rule entries that look like the following
picture:

.. image:: /_static/dns/blockdns.png

Certain local PCs could be allowed to use other DNS servers by placing a
pass rule for them above the block rule.
