.. include:: /substitutions.rsti

Troubleshooting Port Forwards
=============================

If problems are encountered while attempting a port forward, try the
following.

#. If the :doc:`/nat/forwarding-ports-with-pfsense` guide was not
   followed exactly, delete anything that has been tried and start from
   scratch with those instructions.

#. Port forwards do not work internally unless :doc:`NAT reflection
   </nat/accessing-port-forwards-from-local-networks>`
   has been enabled. Always test port forwards from outside the network,
   such as from a system in another location, or from a 3G/4G device.

#. Edit the firewall rule that passes traffic for the NAT entry and
   enable logging. Save and Apply Changes. Then try to access it again from
   the outside. Check the firewall logs (**Status > System Logs**,
   **Firewall** tab) to see if the traffic shows as being permitted or
   denied.

#. Check the states table under **Diagnostics > States**, filter on the
   source, destination, or port number to see if any entries are present.
   If entries are present that appear to match the NAT performed by the
   port forward, then the firewall is accepting and translating the traffic
   properly, so look at internal issues (e.g. client firewalls, etc, see
   below.)

#. Use a Packet Capture or **tcpdump** to see what is happening on the
   wire. This is the best means of finding the problem, but requires the
   most networking expertise. Navigate to **Diagnostics > Packet Capture**
   to capture traffic, or use **tcpdump** from the shell. Start with the
   WAN interface, and use a filter for the appropriate protocol and port.
   Attempt to access from outside the network and see if it shows up. If
   not, the ISP may be blocking the traffic, or if Virtual IPs are involved
   they may have an incorrect configuration. If the traffic is seen on the
   WAN interface, switch to the inside interface and perform a similar
   capture. If the traffic is not leaving the inside interface, there is a
   NAT or firewall rule configuration problem. If it is leaving the
   interface, and no traffic is coming back from the destination machine,
   the target system's default gateway may be missing or incorrect, it may
   not be listening on that port, or it may have a local firewall (Windows
   Firewall, iptables) blocking the traffic. For certain types of traffic
   return traffic may be seen indicating the host is not listening on that
   port. For TCP, this would be a TCP RST. For UDP, it may be an ICMP
   Unreachable message.

Common Problems
---------------

#. NAT and firewall rules not correctly added (see
   :doc:`/nat/forwarding-ports-with-pfsense`)

   .. tip:: Do **NOT** set a source port

#. Firewall enabled on client machine

#. Client machine is not using pfSense as its default gateway

#. Client machine not actually listening on the port being forwarded

#. ISP or something upstream of pfSense is blocking the port being
   forwarded

#. Trying to test from inside the local network, need to test from an
   outside machine

#. Incorrect or missing Virtual IP configuration for additional public
   IP addresses

#. The pfSense router is not the border router. If there is something
   else between pfSense and the ISP, the port forwards and associated rules
   must be replicated there.

#. Forwarding ports to a server behind a Captive Portal. An IP bypass
   must be added both to and from the server's IP in order for a port
   forward to work behind a Captive Portal.

#. If this is on a WAN that is not the default gateway, make sure there
   is a gateway chosen on this WAN interface, or the firewall rules for the
   port forward would not reply back via the correct gateway.

#. If this is on a WAN that is not the default gateway, ensure the
   traffic for the port forward is NOT passed in via Floating Rules or an
   Interface Group. Only rules present on the WAN's interface tab under
   Firewall Rules will have the reply-to keyword to ensure the traffic
   responds properly via the expected gateway.

#. If this is on a WAN that is not the default gateway, make sure the
   firewall rule(s) allowing the traffic in do not have the box checked to
   disable reply-to.

#. If this is on a WAN that is not the default gateway, make sure the
   master reply-to disable switch is not checked under **System >
   Advanced**, on the **Firewall/NAT** tab.

#. WAN rules should NOT have a gateway set, so make sure that the rules
   for the port forward do NOT have a gateway configured on the actual
   rule.

#. If the traffic appears to be forwarding in to an unexpected device,
   it may be happening due to UPnP. Check **Status > UPnP** to see if an
   internal service has configured a port forward unexpectedly. If so,
   disable UPnP on either that device or on the firewall.
