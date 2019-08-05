Style Guide
===========

.. contents:: :depth: 2

To make this documentation easier for users, we prefer to have the style of
articles be consistent and clear. The following guidelines are strongly
suggested. Text found to not be following these Language Style/Grammar
guidelines may be edited and corrected at any time.

See :doc:`quality-guidelines` for information about how entries in the
documentation should be written and what they should contain.

Trademarks
----------

The first use of **pfSense®** must have the ® symbol on each and every page.

Capitalization
--------------

Capitalize terms correctly! Especially **pfSense**! No other capitalization of
"pfSense" may be used except in a URL which is acceptable as lowercase (e.g.
https://www.pfsense.org ). If a sentence begins with "pfSense" the first
letter must remain lowercase.

If any other usage of "pfSense" or a misspelling of same is found ("PFsense",
"PFSense", "pfSence", etc), fix it immediately.

Other special notes for capitalization:

* WebGUI, webConfigurator, IPsec, OpenVPN, Internet, Ethernet, VPN, DNS, PPPoE,
  IPv4, IPv6, NPt, strongSwan, squidGuard, pfsync, pftop, JavaScript.

What to Avoid
-------------

:Avoid addressing the user directly** ("you", "your", etc.):
  Rewrite sentences to avoid this usage when found. Exceptions may be made for
  quoted/cited text or other unavoidable circumstances.
:Avoid references to the writer ("I", "we"):
  Except when making specific recommendations, which is OK to avoid using
  passive voice. "We recommend" is better than "It is recommended".
:Avoid the use of words such as "should", "could", "might":
  Words that do not commit to a specific action/result are undesirable. For
  example "This should happen" or "That might appear". Some instances are
  expected/required when making recommendations, but reword where feasible.
:Avoid the use of Weasel words:
  See `Weasel Words <https://en.wikipedia.org/wiki/Weasel_word>`__ for reference.
:Avoid redundant phrases:
  This especially includes acronym references that duplicate words: "WAN
  Network", "LAN Network", "DUID Identifier", "6RD Rapid Deployment". Remove the
  redundant word(s) and/or use alternate phrasing ("WAN Subnet" or "Network on
  the WAN interface" rather than "WAN Network")
:Avoid unnecessary abbreviations and shortening of words:
  This creates ambiguity, for example:

  * Avoid using "IP" or "IPs" to refer to IP addresses. Use the full form "IP
    address" instead to remove ambiguity.
  * Avoid using "config" when "config.xml" or "configuration" is more clear.
  * Avoid using "ovpn" to mean "OpenVPN" except in cases when the OS-level
    interfaces are being referenced (``ovpncX`` is OK, "Use OVPN instead" is
    not.)

:Avoid using "here" for links: Do not make links for "here", "click here", or
  similar phrasing. They provide no context for the link, cause redundancy in
  phrasing, and cause problems for users that require accessibility functions
  such as screen readers. See recommendations from `W3C Tips`_ and
  `uxmovement`_.
:Avoid awkward possessive references:
  For example: "firewall's", "pfSense's".
:Avoid gender-specific pronouns:
  Example: "his", "hers"
:Avoid leaving out necessary hyphens:
  Example: "howto" should be "how-to"
:Avoid "Britishisms" or other non-en_US style spellings:
  Use "Flavor", not "Flavour". Use "Specialize", not "Specialise"
:Avoid confusing bandwidth specifications:

  * Avoid confusing bits and bytes. Use Big **B** for bytes, little **b** for
    bits.
  * Avoid ambiguity when specifying bandwidth measurements. Bandwidth should
    always have *time* component, such as *per second*. "5 Mbit/s" is much
    clearer than "5 Mbps", "5 Mb", or "5MB".

Crafting Instructions
---------------------

When forming lists of instructions, start each item with an action word when
possible: Click x, Select x, Enter x, Navigate to x.

When instructing a user to reach a specific page or place in the GUI, we prefer
to reference this action as "Navigate to".

Example Text
------------

When offering examples, keep the following in mind:

* Domain names should use ``example.com`` or another reserved name from
  `RFC 2606`_.
* IP address examples should be taken from subnets reserved for documentation in
  `RFC 6890`_: 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24 or the traditional
  `RFC 1918`_ networks 192.168.0.0/16, 172.16.0.0/12, or 10.0.0.0/8 if the
  documentation subnets are not sufficient.

  * In some cases where additional unique examples are needed, use the
    benchmarking subnet 198.18.0.0/15.

Referring to items involving pfSense software
---------------------------------------------

Refer to a firewall running pfSense as a "firewall" or "node". Avoid other
similar terms ("router", "system", "box", etc.) for clarity and consistency.

High Availability / CARP References
-----------------------------------

* Refer to the cluster as a "High Availability Cluster" or "HA Cluster" and
  **not** as a "CARP Cluster".
* Use the term "node" as in "cluster node" for referencing an individual unit.
* Use the term "primary" for the primary node, never "master" as this can be
  confused with the CARP VIP status.
* Use the term "secondary" for the secondary node, never "backup" or "slave" as
  this can be confused with the CARP VIP status.
* Use the terms "Sync interface" or "Interconnect interface" when referring to
  the dedicated interface between HA Cluster nodes. **Never refer to that
  interface as a "CARP interface"**.

.. _common substitutions file: https://github.com/pfsense/docs/blob/master/source/substitutions.rsti
.. _RFC 1918: https://tools.ietf.org/html/rfc1918
.. _RFC 2606: https://tools.ietf.org/html/rfc2606
.. _RFC 6890: https://tools.ietf.org/html/rfc6890
.. _source of this documentation: https://github.com/pfsense/docs/tree/master/source
.. _uxmovement: http://uxmovement.com/content/why-your-links-should-never-say-click-here/
.. _W3C Tips: https://www.w3.org/QA/Tips/noClickHere
