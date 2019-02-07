Preventing RFC1918 Traffic from Exiting a WAN Interface
=======================================================

RFC1918 addresses are blocks of network IP addresses reserved for
private use that are commonly used behind firewalls to allow a single
public IP address to be shared with multiple devices using NAT. The
default pfSense installation assigns the 192.168.1.0/24 address space to
the LAN interface, but RFC1918 also defines other CIDR ranges for
private use:

*  10.0.0.0/8
*  172.16.0.0/12
*  192.168.0.0/16

As a general rule, it is good practice to prevent network traffic
intended for RFC1918 subnets from leaving the firewall via the WAN
interface. This avoids unnecessary traffic on the WAN link, and also
provides a small security benefit by keeping information about the LAN
network behind the firewall.

An example where this rule might be helpful is if a machine on the local
LAN (e.g. 192.168.1.5) is configured to access private LAN addresses
that are routed across a VPN tunnel (e.g. 192.168.100.0/24). If the VPN
link were to go down, pfSense would no longer have an active route for
192.168.100.0/24, and a packet intended for 192.168.100.0/24 will be
routed out the WAN interface using the default route. This could
potentially provide information about the private LAN to someone with
access to the ISP's WAN network. A malicious user could even set up an
imposter machine on the WAN network with a 192.168.100.0/24 address and
pretend to be a machine on the inactive VPN link.

While the chance of this being a problem is small, the probability of
unintentional RFC1918 traffic routing through the WAN interface will
increase for installations with more complex LAN topologies, a large
number of users (typos, etc), or routes that may frequently change (VPN,
etc). In these scenarios, it may be beneficial to add a firewall rule
preventing RFC1918 traffic from being routed out of the WAN interface.

Scenarios where RFC1918 addresses should NOT be blocked on the WAN interface
----------------------------------------------------------------------------

In its default configuration, pfSense is not configured to block RFC1918
addresses from being routed from the LAN subnet to the outside WAN,
because there are two common scenarios where blocking this traffic is
not desirable:

*  **ISP assigns a RFC1918 address to end users** - Some ISPs assign
   private network addresses to their customers and perform their own
   NAT for customer traffic to the public internet. Verify this by
   looking at the WAN interface IP address on the pfSense dashboard. If
   the assigned address is from one of the private IP ranges listed
   above, RFC1918 traffic should NOT be blocked.
*  **pfSense is "chained" behind another device like a consumer firewall
   or wifi router (double NAT)** - In this case, pfSense performs NAT
   for devices connected to the pfSense LAN, and the WAN interface
   forwards traffic to the upstream device, where it undergoes a second
   NAT before entering the public internet. This is verified using the
   same steps as above - if the WAN IP address is from the RFC1918
   range, do NOT block this traffic from exiting the WAN

This is an example of an RFC1918 address assigned to the pfSense WAN:

.. image:: /_static/firewall/pfsense_wan_rfc1918.png

.. warning:: If either of these scenarios apply to the pfSense
   installation, do NOT add additional RFC1918 traffic blocking to the WAN
   interface as this may block LAN users from accessing the WAN.

Steps to block RFC1918 traffic from leaving the WAN interface
-------------------------------------------------------------

For installations where the above scenarios do not apply, an additional
firewall rule can be put in place to prevent RFC1918 traffic from
leaking out of the WAN interface. This provides a small increase in
security and privacy by preventing information about the local LAN from
being routed further upstream to the ISP.

To add a block rule for RFC1918 traffic, navigate to **Firewall >
Aliases**:

*  Create an alias for the RFC1918 network ranges. Call it
   *private_networks* and include the following ranges:

   *  10.0.0.0/8
   *  172.16.0.0/12
   *  192.168.0.0/16
   *  (optionally include other non-public CIDR ranges like
      169.254.0.0/16 and 127.0.0.0/8)

*  Add a new floating firewall rule under **Firewall > Rules**,
   **Floating** tab

   *  **Action** - *Reject*
   *  **Quick** - *Checked*
   *  **Interface** - *WAN* (optionally select multiple WAN interfaces
      or interface groups here, do NOT select the local LAN)
   *  **Direction** - *out*
   *  **TCP/IP version** - *IPv4*
   *  **Protocol** - *any*
   *  **Source** - *any*
   *  **Destination** - *Single host or alias: private_networks*
   *  **Log** - *optional*

*  Save the changes and reload the firewall. Verify that local LAN and
   internet connectivity are still working.

Notes
-----

Adding this rule to the pfSense firewall will block access to bridge
devices like cable modems or upstream routers outside of the WAN
interface. For example, many cable modems use an IP address of
192.168.100.1. This may or may not be desirable behavior for users. The
RFC1918 firewall rule needs to be disabled if access from inside the LAN
to a device like this is required.

On the edit interfaces screen (**Interfaces > WAN**, for example) there
is an option to *Block private networks*. This is a rule blocking
inbound traffic, not outbound like the rule described here. As long as
pfSense is not behind a WAN that uses private addressing, both rules are
desirable and should be enabled.
