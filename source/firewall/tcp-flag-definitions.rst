.. include:: /substitutions.rsti

TCP Flag Definitions
====================

References to TCP flags may be found in various places on pfSense,
primarily in the firewall logs. These are control bits that indicate
different connection states or information about how a packet should be
handled.

They may be abbreviated even more to the first letter of the flag.

A list from
`Wikipedia <http://en.wikipedia.org/wiki/Transmission_Control_Protocol>`__:

-  CWR – Congestion Window Reduced (CWR) flag is set by the sending host
   to indicate that it received a TCP segment with the ECE flag set
   (added to header by RFC 3168).
-  ECE (ECN-Echo) – indicate that the TCP peer is ECN capable during
   3-way handshake (added to header by RFC 3168).
-  URG – indicates that the URGent pointer field is significant
-  ACK – indicates that the ACKnowledgment field is significant
   (Sometimes abbreviated by tcpdump as “.”)
-  PSH – Push function
-  RST – Reset the connection (Seen on rejected connections)
-  SYN – Synchronize sequence numbers (Seen on new connections)
-  FIN – No more data from sender (Seen after a connection is closed)

