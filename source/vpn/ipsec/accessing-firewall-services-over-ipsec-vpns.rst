Accessing Firewall Services over IPsec VPNs
===========================================

With an out of the box configuration, it is not possible to query SNMP
on the LAN interface of a remote pfSense over an IPsec VPN connection.

Fred Wright explained in a post to the m0n0wall mailing list on
September 12, 2004 why this is, and it's the same reason in pfSense.

.. pull-quote::

   Due to the way IPsec tunnels are kludged into the FreeBSD kernel,
   any traffic \*initiated\* by m0n0wall to go through an IPsec tunnel
   gets the wrong source IP (and typically doesn't go through the
   tunnel at all as a result). Theoretically this \*shouldn't\* be an
   issue for the \*server\* side of SNMP, but perhaps the server has a
   bug (well, deficiency, at least) where it doesn't send the response
   out through a socket bound to the request packet. You can fake it
   out by adding a bogus static route to the remote end of the tunnel
   via the m0n0wall's LAN IP (assuming that's within the near-end
   tunnel range). A good test is to see whether you can ping something
   at the remote end of the tunnel (e.g. the SNMP remote) \*from\* the
   m0n0wall. There's an annoying but mostly harmless side-effect to
   this - every LAN packet to the tunnel elicits a no-change ICMP
   Redirect.

Most notably this is a problem for UDP services. UDP services reply
using the "closest" address to the client as seen from the perspective
of the system routing table. Without a route present, that ends up being
the IP address of the default gateway on WAN.

To add this route to pfSense, perform the following configuration:

- Navigate to **System > Routing** on the **Gateways** tab
- Click **+** to add a gateway
- Select *LAN* for the **Interface**
- Enter the LAN IP address in the **Gateway** field
- Check **Disable Gateway Monitoring**
- Click **Save**
- Click **Apply Changes**
- Navigate to the **Static Routes** tab
- Click **+**
- Enter the remote VPN network in the **Destination Network** box
- Select the LAN IP **Gateway** that was created before
- Add a **Description** if desired
- Click **Save**
- Click **Apply Changes**

To perform a quick test with **ping** from the console or ssh, adjust
the ping source to enable traffic to traverse the tunnel like so::

  ping -S <pfsense LAN ip> <remote IP address>

If the pfSense LAN address is 192.168.1.1, and that IP is a part of the
subnet defined for the IPsec tunnel, to ping 10.0.0.1 on the other side,
do this::

  ping -S 192.168.1.1 10.0.0.1

Another alternative, depending on the version, would be to change the
interface binding of the target service so that it only listens on the
LAN IP address (or the IP address of the internal network on the local
end of the VPN) on the firewall. The interface binding for SNMP, NTP,
the DNS Forwarder, and several other services can be set in this way.
