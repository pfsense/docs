.. include:: /substitutions.rsti

Configuring IPsec Keep Alive
============================

Any IP address within the **Remote Network** of this phase 2 definition
may be used. It does not have to reply or even exist, simply triggering
traffic destined to that network periodically will keep the IPsec
connection up and running.

For this feature to work, the firewall must have an IP address assigned
inside the **Local Network**. Otherwise it cannot generate the necessary
traffic to bring up the tunnel.

