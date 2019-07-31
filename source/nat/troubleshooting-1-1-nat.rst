Troubleshooting 1:1 NAT
=======================

If 1:1 NAT (or even Outbound NAT) is properly configured, but the system
still appears to access sites like https://www.netgate.com/ip and
http://www.ipchicken.com from main WAN IP Address on the pfSense®
firewall, then squid or another web proxy is likely being used.

Even though 1:1 NAT is in place, the web requests are still proxied
through squid, and thus originate from the pfSense firewall itself.

The easy way around this is to allow that system to bypass the proxy
like so:

-  Click **Services > Proxy Server**
-  Type the local IP Address of the system in the **Do NOT proxy these
   IPs** text box
-  Click **Save**

To proxy the web traffic and verify the 1:1 mapping is working properly,
find some other service to verify with, such as:

-  Login to a remote system and watch the firewall logs or tcpdump
-  Initiate some traffic from the system and verify the traffic is
   originating from the proper IP Address.

Or access an HTTPS site that does not flow through the proxy.

