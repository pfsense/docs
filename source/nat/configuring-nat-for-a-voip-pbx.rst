.. include:: /substitutions.rsti

Configuring NAT for a VoIP PBX
==============================

For VoIP there are typically a few components to get right for proper
inbound and outbound audio from a local PBX.

#. Port forward entries with firewall rules (Or 1:1 NAT with Firewall
   Rules)
#. Manual Outbound NAT with a rule at the top set to perform static port
   NAT on traffic from the PBX (Or 1:1 NAT)
#. On the PBX, ensure it is set properly for NAT with the correct
   external IP and local subnets defined.

Aliases to make it easy
-----------------------

It is easiest to start by making a few entries under **Firewall >
Aliases** to make the rules easier to accomplish:

-  Host alias for the PBX itself, named *PBX*, containing the local IP
   address of the PBX.
-  Network or Host alias called *SIP_Trunks* for the upstream SIP trunk
   addresses, if known. If the *SIP_Trunk* address/network is not known
   or changes, do not make an alias and leave these values set to *any*.
-  Port alias called *PBX_Ports* containing all of the port numbers
   needed for SIP, RTP, and other control ports. (usually *5060* and
   *10000:20000*, but varies from provider to provider and PBX
   implementation)

Port Forwards
-------------

For the port forward (**Firewall > NAT**, **Port Forwards** tab), it can
be set as follows:

-  **Interface**: *WAN*
-  **Protocol**: *UDP* (or *TCP/UDP* if needed)
-  **Source**: Type *Single Host or Alias*: *SIP_Trunks* -- or a *Any*
   for the type if the SIP trunk IP addresses are not known.
-  **Source Port**: *any/any*
-  **Destination**: *WAN address* or external VIP for the PBX
-  **Destination Port**: *PBX_Ports*
-  **Redirect target IP**: *PBX*
-  **Redirect target port**: *PBX_Ports*

Manual Outbound NAT
-------------------

For *Manual Outbound NAT*, navigate to **Firewall > NAT**, **Outbound**
tab, switch from *Automatic Outbound NAT* to *Manual Outbound NAT* and
press **Save**. Then at the top of the list, create a rule that looks
like so:

-  **Interface**: *WAN*
-  **Protocol**: *UDP*
-  **Source**: *Network*, *PBX*
-  **Source Port**: *[blank]*
-  **Destination**: *Network*, *SIP_Trunks* -- Or *Any* for the type if
   the SIP trunk IP addresses are not known
-  **Destination Port**: *PBX_Ports* (or leave blank)
-  **Translation**: *Interface address* if using the WAN IP address, or
   the external VIP for the PBX
-  **Port**: *[blank]*
-  **Static Port**: *\*CHECKED\**

Reset States
------------

After making the changes to NAT rules, the states for the PBX must be
reset.

-  Navigate to **Diagnostics > States**
-  Enter the IP address of the PBX and click **Filter**
-  Click **Kill**

Once the PBX re-registers it test inbound and outbound calls and confirm
inbound and outbound audio works as expected.
