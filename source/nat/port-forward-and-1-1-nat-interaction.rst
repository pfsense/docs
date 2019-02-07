Port Forward and 1:1 NAT Interaction
====================================

The NAT port forward entries for specific ports take
precedence over 1:1 NAT Mappings.

This way, a 1:1 NAT may be used for a Virtual IP, and then one or more
ports may be forwarded to a different internal IP address if desired.
