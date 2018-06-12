.. include:: /substitutions.rsti

Troubleshooting NAT Devices Reaching Bridged Interface Devices
==============================================================

Yes. This is a common question because it is not possible in m0n0wall
due to issues in IPFilter's ipnat when working with bridging. This is
not an issue with pf, and hence not pfSense.

For hosts behind the NAT/routed segment, NAT must occur as traffic exits
toward the bridged systems so that the return traffic will come back to
the firewall.

For hosts on the bridged segment to reach hosts behind the NAT segment
directly, a static route could be used on the bridged hosts or upstream
gateway to send the "private" subnet traffic to the IP address of the
firewall in the bridged network.

