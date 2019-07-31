Using Easyrule to Add Firewall Rules
====================================

The EasyRule function found in the webGUI and on the command line can be
used to add firewall rules quickly.

In the pfSense® webGUI, this function is available in the Firewall Log view
(**Status > System Logs**, **Firewall** tab). There is an icon next to
the *source*, which will add the source to a **blocking** rule in an
alias. There is an icon next to the *destination* to add a **pass** rule
from the source of that log entry to the destination IP address and
port.

There is a command line program that handles the same functionality. It
is called "easyrule" and can be run from the shell like so:

::

     : easyrule
     usage:
     Blocking only requires an IP to block
         easyrule block <interface> <source IP>
     
     Passing requires more detail, as it must be as specific as possible. The destination port is
     optional if you're using a protocol without a port (e.g. ICMP, OSPF, etc).
         easyrule pass <interface> <protocol> <source IP> <destination ip> [destination port]
     
     Block example:
         easyrule block wan 1.2.3.4
     
     Pass example (protocol with port):
         easyrule pass wan tcp 1.2.3.4 192.168.0.4 80
     
     Pass example (protocol without port):
         easyrule pass wan icmp 1.2.3.4 192.168.0.4

The source code of those scripts can be adapted for adding firewall
rules in other ways, but that is left as an exercise for the reader.

