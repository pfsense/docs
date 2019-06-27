Redirecting all DNS Requests to pfSense
=======================================

To restrict client DNS to only the specific servers configured on a
firewall, a port forward may be used to capture all DNS requests sent to
other servers.

Before adding this rule, ensure the DNS Forwarder or DNS Resolver is
configured to bind and answer queries on *Localhost*, or *All*
interfaces.

In the following example, the LAN interface is used, but it could be
used for any local interface. Change the Interface and Destination as
needed.

-  Navigate to **Firewall > NAT**, **Port Forward** tab
-  Click |fa-level-up| **Add** to create a new rule
-  Fill in the following fields on the port forward rule:

   -  **Interface**: *LAN*
   -  **Protocol**: *TCP/UDP*
   -  **Destination**: *Invert Match* **checked**, *LAN Address*
   -  **Destination Port Range**: *53* (DNS)
   -  **Redirect Target IP**: *127.0.0.1*
   -  **Redirect Target Port**: *53* (DNS)
   -  **Description**: *Redirect DNS*
   -  **NAT Reflection**: *Disable*

When complete, the port forward should appear as follows:

.. image:: /_static/dns/redirect_dns_port_forward.png

If DNS requests to other DNS servers are blocked, such as in the
:doc:`Blocking DNS queries to external resolvers </dns/blocking-dns-queries-to-external-resolvers>` example,
ensure the rule to pass DNS to 127.0.0.1 is above any rule that blocks
DNS.

Now any DNS request made to **any** external IP address will result in
the query being answered by the firewall itself. Access to other DNS
servers on port 53 is impossible.

This could be adapted to allow access to only a specific set of DNS
servers by changing the Destination network from "LAN Address" to an
alias containing the allowed DNS servers. The **Invert match** box
should remain checked.
