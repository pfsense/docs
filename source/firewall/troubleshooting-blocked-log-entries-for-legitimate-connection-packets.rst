.. include:: /substitutions.rsti

Troubleshooting Blocked Log Entries for Legitimate Connection Packets
=====================================================================

Sometimes log entries will be present that, while labeled with the
“Default deny” rule, look like they belong to legitimate traffic. The
most common example is seeing a connection blocked involving a web
server.

.. image:: /_static/firewall/blockedwithtcpflags.png

This is likely due to a TCP FIN packet arriving after the connection's
state has been removed. This happens because on occasion a packet will
be lost, and the retransmits will be blocked because the firewall has
already closed the connection.

It is harmless, and does not indicate an actual blocked connection. All
stateful firewalls do this, though some don't generate log messages for
this blocked traffic even if all blocked traffic is logged.

These blocked packets will occur even if rules exist which look as
though they should match the traffic, such as an “Allow All” rule, as
pass rules for TCP only allow **TCP SYN** packets to create a state.
These rules assume TCP traffic with other flags will either be part of
an existing state in the state table, or packets with spoofed TCP flags.

Asymmetric Routing
------------------

Blocked packets are also common for legitimate-looking traffic where
routed networks and/or Multi-WAN are involved when :doc:`Asymmetric Routing </firewall/troubleshooting-blocked-log-entries-due-to-asymmetric-routing>` or other related
causes are present in the network.

Clustering and Load Balancing
-----------------------------

In a clustered environment, traffic arriving via the primary and leaving
an internal interface can appear to be blocked on the secondary if the
destination is a broadcast or multicast address like those used for
Microsoft Network Load Balancing. The traffic appears to be blocked on
the internal interface of the secondary from a public IP address source.
Capturing the traffic on the secondary and inspecting the destination
address in Wireshark will reveal the nature of the destination MAC
address.

.. seealso:: :doc:`What are TCP Flags </firewall/tcp-flag-definitions>`
