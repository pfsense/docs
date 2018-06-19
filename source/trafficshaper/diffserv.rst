.. include:: /substitutions.rsti

Traffic Shaping with Differentiated Services (DiffServ) Identifiers
===================================================================

pfSense supports **Differentiated services** (**DiffServ**) for traffic
filtering or queue assignments. DiffServ takes the place of the outdated **Type
of service** (**TOS**). DiffServ uses the upper six bits of the TOS field in the
IP header (the six bits being called the *DiffServ Code Point field*), while the
lower two bits are reserved for Explicit Congestion Notification (ECN).

Unless appropriately configured, pfSense ignores the content of the DiffServ
Code Point (DSCP) field. To prioritize traffic, the :doc:`traffic-shaping-guide`
needs to be set up accordingly.

.. warning:: pfSense *does not* support the setting or changing of DiffServ
   values, only matching.

Supported DiffServ Code Point Values
------------------------------------

Note that the interpretations of the DSCP values, as provided by the various
RFCs, are only given as a reference. How the DSCP values are interpreted in any
specific setup is entirely up to the user or end nodes.

The **Assured Forwarding** (AF) Behavior Group is recommended in `RFC 2597`_.

.. table:: Assured Forwarding (AF) Behavior Group values

   +------------+------------------+------------------+------------------+------------------+
   | Precedence | Class 1 (lowest) | Class 2          | Class 3          | Class 4 (highest)|
   +============+==================+==================+==================+==================+
   | Low Drop   | AF11 (10/0x0a)   | AF21 (18/0x12)   | AF31 (26/0x1a)   | AF41 (34/0x22)   |
   +------------+------------------+------------------+------------------+------------------+
   | Med Drop   | AF12 (12/0x0c)   | AF22 (20/0x14)   | AF32 (28/0x1c)   | AF42 (36/0x24)   |
   +------------+------------------+------------------+------------------+------------------+
   | High Drop  | AF13 (14/0x0e)   | AF23 (22/0x16)   | AF33 (30/0x1e)   | AF43 (38/0x26)   |
   +------------+------------------+------------------+------------------+------------------+

For low-drop/low-latency traffic, use EF and VA DSCP values.

.. table:: Expedited Forwarding (EF) and Voice Admit (VA) values

   +-----------------------------+--------------+---------------+
   | PHB                         | DSCP Value   | RFC           |
   +=============================+==============+===============+
   | Expedited Forwarding (EF)   | 46/0x2e      | `RFC 3246`_   |
   +-----------------------------+--------------+---------------+
   | Voice Admit (VA)            | 44/0x2c      | `RFC 5865`_   |
   +-----------------------------+--------------+---------------+

The Class Selector (CS) PHB group has been retained from TOS.

.. table:: Class Selector (CS) values

   +------------------+--------------+
   | Class Selector   | DSCP Value   |
   +==================+==============+
   | CS1              | 8/0x08       |
   +------------------+--------------+
   | CS2              | 16/0x10      |
   +------------------+--------------+
   | CS3              | 24/0x18      |
   +------------------+--------------+
   | CS4              | 32/0x20      |
   +------------------+--------------+
   | CS5              | 40/0x28      |
   +------------------+--------------+
   | CS6              | 48/0x30      |
   +------------------+--------------+
   | CS7              | 56/0x38      |
   +------------------+--------------+

To provide limited backward comparability to TOS, pfSense also recognizes the
following DSCP/TOS values.

.. table:: TOS Compatibility values

   +---------------+--------------+-------------+
   | TOS           | DSCP Value   | TOS value   |
   +===============+==============+=============+
   | reliability   | 1/0x01       | 4/0x04      |
   +---------------+--------------+-------------+
   | throughput    | 2/0x02       | 8/0x08      |
   +---------------+--------------+-------------+
   | lowdelay      | 4/0x04       | 16/0x10     |
   +---------------+--------------+-------------+

pfSense only matches exact values. All six bit in the DSCP field must match.

Caveats
-------

By default, pfSense matches only the first packet of a connection, which is the
packet that creates an entry in the state table. If a connection starts with a
different DSCP value, has no DSCP value in the starting packet, or otherwise
changes DSCP values during the connection, the traffic will not be classified as
expected.

.. tip:: This can be worked around by using "no state" rules, but crafting these
   rules in a secure manner is difficult, so it is not a workaround that we
   recommend.

Adding additional DSCP values for experimental use
--------------------------------------------------

Assuming basic knowledge about PHP, it is possible to add additional DiffServ
Code Point values by editing ``/usr/local/www/guiconfig.inc``. In this file, the
variable ``$firewall_rules_dscp_types`` is initialized with an array containing
the recognized DSCP values. New values can be specified as hex values,
optionally followed by a blank and a comment like, for example::

  "0x03",

Valid values are in the range ``0x01`` through ``0x3f``.

.. caution:: These changes will be lost upon a firmware update.

RFCs
----

* `RFC 2474`_ — Definition of the Differentiated Services Field (DS Field) in
  the IPv4 and IPv6 Headers
* `RFC 2475`_ — An Architecture for Differentiated Services
* `RFC 2597`_ — Assured Forwarding PHB Group
* `RFC 2983`_ — Differentiated Services and Tunnels
* `RFC 3086`_ — Definition of Differentiated Services Per Domain Behaviors and
  Rules for their Specification
* `RFC 3140`_ — Per Hop Behavior Identification Codes (replaces `RFC 2836`_)
* `RFC 3246`_ — An Expedited Forwarding PHB (Per-Hop Behavior) (obsoletes
* `RFC 2598`_)
* `RFC 3247`_ — Supplemental Information for the New Definition of the EF PHB
  (Expedited Forwarding Per-Hop Behavior)
* `RFC 3260`_ — New Terminology and Clarifications for Diffserv (updates
* `RFC 2474`_, `RFC 2475`_ and `RFC 2597`_)
* `RFC 4594`_ — Configuration Guidelines for DiffServ Service Classes
* `RFC 5865`_ — A Differentiated Services Code Point (DSCP) for
  Capacity-Admitted Traffic (updates `RFC 4542`_ and `RFC 4594`_)
* `RFC 3289`_ — Management Information Base for the Differentiated Services
  Architecture
* `RFC 3290`_ — An Informal Management Model for Diffserv Routers
* `RFC 3317`_ — Differentiated Services Quality of Service Policy Information
  Base

.. _RFC 2474: https://tools.ietf.org/html/rfc2474
.. _RFC 2475: https://tools.ietf.org/html/rfc2475
.. _RFC 2597: https://tools.ietf.org/html/rfc2597
.. _RFC 2598: https://tools.ietf.org/html/rfc2598
.. _RFC 2836: https://tools.ietf.org/html/rfc2836
.. _RFC 2983: https://tools.ietf.org/html/rfc2983
.. _RFC 3086: https://tools.ietf.org/html/rfc3086
.. _RFC 3140: https://tools.ietf.org/html/rfc3140
.. _RFC 3246: https://tools.ietf.org/html/rfc3246
.. _RFC 3247: https://tools.ietf.org/html/rfc3247
.. _RFC 3260: https://tools.ietf.org/html/rfc3260
.. _RFC 3289: https://tools.ietf.org/html/rfc3289
.. _RFC 3290: https://tools.ietf.org/html/rfc3290
.. _RFC 3317: https://tools.ietf.org/html/rfc3317
.. _RFC 4542: https://tools.ietf.org/html/rfc4542
.. _RFC 4594: https://tools.ietf.org/html/rfc4594
.. _RFC 5865: https://tools.ietf.org/html/rfc5865
