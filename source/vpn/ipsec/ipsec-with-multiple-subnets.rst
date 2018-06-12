.. include:: /substitutions.rsti

Using IPsec with Multiple Subnets
=================================

On current versions of pfSense, additional subnets are handled by adding
an additional Phase 2 entry to cover the path to pass through the
tunnel.

For example, for 172.16.0.0/24 and 172.16.1.0/24 at Site A, and
10.0.0.0/24 at Site B, define two Phase 2 entries on both sides:

On the Site A Firewall::

  172.16.0.0/24 to 10.0.0.0/24
  172.16.1.0/24 to 10.0.0.0/24

On the Site B Firewall::

  10.0.0.0/24 to 172.16.0.0/24
  10.0.0.0/24 to 172.16.1.0/24

This works for any additional networks on either side (VPN subnets,
networks on the other end of VPNs connected to the remote router, etc).

If the equipment to which the tunnel connects does not support multiple
Phase 2's, it may be necessary to employ supernetting/CIDR summarization
(See below) to fit the networks into a single Phase 2.

Supernetting Example
--------------------

At Site A, there is one subnet, 10.0.0.0/24. This should reach
192.168.0.0/24, 192.168.1.0/24, and 192.168.2.0/24 at Site B.

Due to the "closeness" of the subnets, they could be grouped into a
larger network in the tunnel definition: 192.168.0.0/22 (This would also
include 192.168.3.0/24)
