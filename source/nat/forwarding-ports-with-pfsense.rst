.. include:: /substitutions.rsti

Forwarding Ports with pfSense
=============================

Forwarding ports on pfSense is a fairly simple process. When adding a
port forward, a firewall rule must also be added to allow traffic in to
the *internal IP address* designated by the port forward. There is an
option to automatically add this rule when creating a port forward
definition, and it is enabled by default.

Port forwarding in current versions has been extended to allow for much
more flexible and powerful configurations, but users not accustomed to
firewalls allowing advanced NAT capabilities may find it confusing
initially.

Fields
^^^^^^

This section describes each of the fields on the port forward edit
screen.

-  **Disabled**: Allows the port forward entry to be disabled without
   removing it from the configuration.

-  **No RDR**: Negates redirection for traffic matching what is
   specified here. For advanced configurations, usually should be
   unchecked.

-  **Interface**: The interface where the traffic is originated, usually
   WAN

-  **Protocol**: The protocol of the traffic to be forwarded.

-  **Source**: Allows matching a specific original source of the
   traffic, and is hidden behind an Advanced button as in most cases it
   should be "any", allowing all Internet hosts through. The source port
   range when using TCP and/or UDP, and will almost always be "any".
   **The source port is not the same as the destination port**, and is
   normally a random port between 1024-65535.

-  **Destination**: Specifies the **original destination** IP address of
   the traffic, as seen before being translated, and will usually be
   *WAN address*.

-  **Destination Port Range**: Specifies the original destination port
   of the traffic, it is the **outside** port or ports to forward.

-  **Redirect target IP**: The **internal** IP address where this
   traffic will be forwarded.

-  **Redirect Target Port**: The **internal** port where this traffic
   will be forwarded, and is usually the same as the external port as
   defined in **Destination port range**. If multiple ports in a range
   are used for the Destination port range, this is the starting port of
   the range as it must be the same size range.

-  **Description**: A description for reference.

-  **No XMLRPC Sync**: Prevents the entry from syncing to other CARP
   members

-  **NAT reflection**: Allows NAT reflection to be enabled or disabled
   on a per-port forward basis.

-  **Filter rule association**: Choose one of *Add an associated filter
   rule* gets updated when the port forward is updated, or *Add an
   unassociated filter rule*, or *pass* which passes all traffic that
   matches the entry without having a firewall rule at all.

To explain how this screen's functionality translates into English: Take
traffic entering the chosen **interface**, using the specified
**protocol**, initiated from the specified **source**, destined to the
specified **destination**, and redirect it to the specified **target
IP** and **port**.

See also: :doc:`Port Forward Troubleshooting </nat/port-forward-troubleshooting>`
