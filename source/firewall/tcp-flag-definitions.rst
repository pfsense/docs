TCP Flag Definitions
====================

References to `TCP`_ flags may be found in various places in pfSense®
software, primarily in the firewall logs. These are control bits that
indicate different connection states or information about how a packet
should be handled.

.. note:: The flags may also be abbreviated even more to their first letter.

* **CWR** – Congestion Window Reduced (CWR) flag is set by the sending host
  to indicate that it received a TCP segment with the ECE flag set
  (added to header by RFC 3168).
* **ECE (ECN-Echo)** – indicate that the TCP peer is ECN capable during
  3-way handshake (added to header by RFC 3168).
* **URG** – indicates that the URGent pointer field is significant
* **ACK** – indicates that the ACKnowledgment field is significant
  (Sometimes abbreviated by tcpdump as ".")
* **PSH** – Push function
* **RST** – Reset the connection (Seen on rejected connections)
* **SYN** – Synchronize sequence numbers (Seen on new connections)
* **FIN** – No more data from sender (Seen after a connection is closed)

.. _TCP: https://en.wikipedia.org/wiki/Transmission_Control_Protocol
