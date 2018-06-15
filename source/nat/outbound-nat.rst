.. include:: /substitutions.rsti

Outbound NAT
============

Outbound NAT determines how traffic leaving a pfSense system will be
translated.

Outbound NAT **does not** control which interface traffic will leave,
only how traffic is handled as it exits. To control which interface
traffic will exit, use :doc:`policy routing </routing/directing-traffic-with-policy-routing>` or
:doc:`Static Routes </routing/static-routes>`.

Outbound NAT is configured under **Firewall > NAT** on the **Outbound**
tab.

Automatic Outbound NAT
----------------------

The default "Automatic" scenario is to have all traffic that enters from
a LAN (or LAN type) interface to have NAT applied so it is translated to
the WAN IP address before it leaves.

For static IP configurations, an interface is considered a WAN by the
presence of a gateway on the interface's settings, e.g. **Interfaces >
OPT1**. Having a gateway defined under **System > Routing** is not
enough, it must also be selected on the interface configuration or it
will not be considered a WAN for NAT or other purposes.

Manual/Advanced Outbound NAT Settings
-------------------------------------

In order to use Manual/Advanced Outbound NAT rules, navigate to
**Firewall > NAT** on the **Outbound** tab and select *Manual Outbound
NAT rule generation (AON - Advanced Outbound NAT)*, and save. The list
should then be populated with the equivalent of the automatic rules,
which can then be edited, deleted, or added as needed.

There are a several more possibilities with outbound NAT rules beyond
the standard address fields:

Protocol Choice
^^^^^^^^^^^^^^^

A protocol may be specified for outbound NAT traffic. This would allow
for outbound PPTP to use a separate IP, for instance.

Address Pools
^^^^^^^^^^^^^

Address pools allow use of a subnet or list of external IP addresses
when performing outbound NAT as opposed to the traditional situation
which translates traffic to a single external address. Multiple external
addresses can help in situations where the resources of a single
external IP may not be enough for a large number of internal users.

Choosing Addresses for a Pool
"""""""""""""""""""""""""""""

Address pools for outbound NAT translations may be used in several ways:

-  A Proxy ARP VIP subnet (ex: 10.10.10.128/29) shows up in the
   drop-down for translation target
-  An alias of IP addresses can be chosen from the drop-down list (note:
   See limitations below)
-  By choosing *Other Subnet* from the drop-down list, any arbitrary
   subnet can be used.

Address Pool Options
""""""""""""""""""""

When an address pool is used, there are several options available that
control how NAT translations happen on the pool. These options are:

-  *Round Robin*

    Loops through the translation addresses one at a time in sequence.

-  *Random*

    Selects an address from the pool at random.

-  *Source Hash*

    Uses a hash of the source address to determine the translation
    address, ensuring that the redirection address is always the same
    for a given source.

-  *Bitmask*

    Applies the subnet mask and keeps the last portion identical;
    10.0.1.50 -> x.x.x.50.

-  *Sticky Address* variants of Random and Round Robin types

    The Sticky Address option can be used with the Random and Round
    Robin pool types to ensure that a particular source address is
    always mapped to the same translation address, so long as a state
    exists for a given internal IP. If all of an internal system's
    states expire, it may get a different translation IP for the next
    external connection.

Limitations
^^^^^^^^^^^

Only Round Robin types work with Host Aliases. Any type can be used with
a Proxy ARP or "Other Subnet" pool.

Disable NAT
-----------

To completely disable NAT to have a routing-only firewall, do the
following.

pfSense 2.2 And Later
^^^^^^^^^^^^^^^^^^^^^

#. Navigate to **Firewall > NAT** on the **Outbound** tab
#. Select *Disable Outbound NAT rule generation (No Outbound NAT rules)*
#. Click Save
#. Apply changes

Prior Versions
^^^^^^^^^^^^^^

#. Navigate to **Firewall > NAT** on the **Outbound** tab
#. Select *Manual Outbound NAT rule generation (Advanced Outbound NAT
   (AON))*
#. Click Save
#. Delete all rules from the list on the page
#. Click Apply changes

NAT may be performed on some interfaces and not others by configuring
Outbound NAT rules accordingly.

Details may be found in the |book_link|.

Disable NAT and Firewall
------------------------

To completely disable NAT **and all firewall functions from all
interfaces**, do the following. Note that the previous section ("Disable
NAT") is skipped when taking this approach.

#. Navigate to **System > Advanced**, **Firewall / NAT** tab
#. Check **Disable Firewall / Disable all packet filtering**
#. Click Save

See also:

-  :doc:`Automatic NAT Rules Generation </nat/automatic-nat-rules-generation>`
-  :doc:`Static Port </nat/static-port>`
-  :doc:`Advanced Outbound NAT </nat/advanced-outbound-nat>`
