.. include:: /substitutions.rsti

Troubleshooting "No buffer space available" Errors
==================================================

On occasion traffic on a NIC may have trouble getting out with an error
similar to::

  ping: sendto: No buffer space available

Or::

  dpinger WANGW x.x.x.x: sendto error: 55

The most common causes of this are:

- No route to the target network (or no default route)
- Missing link route for a local target
- Stale state in pf sending the connection out an invalid path (reset
  states)
- Network memory buffer exhaustion - See :doc:`Tuning and Troubleshooting Network Cards </hardware/tuning-and-troubleshooting-network-cards>`
- Faulty NIC and/or driver issue

  - Sometimes resetting the NIC can bring it back again::

      # ifconfig em3 down; ifconfig em3 up

- Faulty cable
- Traffic shaping (ALTQ or Limiters) dropping the packet
- Virtual NIC being throttled by the hypervisor or host, such as an AWS
  instance using more throughput than an instance size can support

  - In this case, change the throttling in the host (not guest) or
    upgrade to a larger instance/higher tier on a hosted platform such
    as AWS.

- Virtual NIC being disconnected/disabled in certain hypervisors
- An otherwise overloaded NIC exhausting its send/recv buffers
- Other various switch/buffer/connectivity issues

Trying to bounce the NIC with *ifconfig* is the easiest thing to try
first. After that, save/apply the interface settings on each interface
(or at least WANs and the LAN in question). Check/(re)set the default
route if it has been lost. :doc:`Reset States </firewall/reset-states>`. Replacing
the cable may also help. Removing traffic shaping if it is enabled is
also a good test.

Otherwise investigate the traffic on the NIC and look for other
buffer-related causes. Seek help from `pfSense Commercial Support <https://portal.pfsense.org>`__ for assistance in diagnosing the
issue, or post on the forum/mailing list.
