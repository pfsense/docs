.. include:: /substitutions.rsti

Advanced IPsec Settings
=======================

The **Advanced Settings** tab under **VPN > IPsec** contains options to
control, in general, how the IPsec daemon behaves and how traffic is
handled with IPsec.

**Prefer older IPsec SAs**: By default, if several IPsec security
associations (SA) match, the newest one is preferred if it's at least 30
seconds old. Select this option to always prefer old SAs over new ones.
This is rarely required and may cause problems with the tunnel
renegotiating properly. See :doc:`IPsec Troubleshooting </vpn/ipsec/ipsec-troubleshooting>`.

**IPsec Debug**: These options provide control over how verbose the
strongSwan daemons log activity and actions. Changing these values
**will not** restart strongSwan, but send it a command to alter the
logging while it is running. Traffic will not be disrupted.

**Force IPsec Reload on Failover**: In some circumstances using a
gateway group as the interface for an IPsec tunnel does not function
properly and IPsec must be forcefully reloaded when a failover occurs.
Because this will disrupt all IPsec tunnels, this behavior is disabled
by default. Check this box to force IPsec to fully reload on gateway
failover.

**Accept unencrypted ID and HASH payloads in IKEv1 Main Mode**: Some
implementations send the third Main Mode message unencrypted, probably
to find the PSKs for the specified ID for authentication.This is very
similar to Aggressive Mode, and has the same security implications: A
passive attacker can sniff the negotiated Identity, and start brute
forcing the PSK using the HASH payload. It is recommended to keep this
option to no, unless the implications are fully understood and
compatibility to such devices is required (for example, some SonicWall
boxes).

**Enable MSS clamping on VPN traffic**: Enable MSS clamping on TCP flows
over VPN. This helps overcome problems with PMTUD on IPsec VPN links. If
left blank, the default value is 1400 bytes. This is useful is large
packets have problems traversing the VPN, or if slow/choppy connections
are observed across the VPN. Ideally it should be set on both sides, but
traffic will have MSS clamping applied in both directions.

