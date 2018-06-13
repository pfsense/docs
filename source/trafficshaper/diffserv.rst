.. include:: /substitutions.rsti

Traffic Shaping with Differentiated Services (DiffServ) Identifiers
===================================================================

pfSense supports **Differentiated services** (**DiffServ**) for traffic
filtering or queue assignments. DiffServ takes the place of the outdated
**Type of service** (**TOS**). DiffServ uses the upper six bits of the
TOS field in the IP header (the six bits being called the *DiffServ Code
Point field*), while the lower two bits are reserved for Explicit
Congestion Notification (ECN).

Unless appropriately configured, pfSense ignores the content of the
DiffServ Code Point (DSCP) field. To prioritize traffic, the
:doc:`traffic-shaping-guide` needs to be set up accordingly.

Current versions of pfSense *do not* support the setting or changing of
DiffServ values, only matching.

Supported DiffServ Code Point Values
------------------------------------

Note that the interpretations of the DSCP values, as provided by the
various RFCs, are only given as a reference. How the DSCP values are
interpreted in any specific setup is entirely up to the user or end
nodes.

The **Assured Forwarding** Behavior Group is recommended in `RFC
2597 <http://tools.ietf.org/html/rfc2597>`__.

+------------------------+-----------------------+-----------------------+-----------------------+-----------------------+
|                        | Class 1 (lowest)      | Class 2               | Class 3               | Class 4 (highest)     |
+========================+=======================+=======================+=======================+=======================+
| Low Drop Precedence    | AF11 (DSCP 10/0x0a)   | AF21 (DSCP 18/0x12)   | AF31 (DSCP 26/0x1a)   | AF41 (DSCP 34/0x22)   |
+------------------------+-----------------------+-----------------------+-----------------------+-----------------------+
| Med Drop Precedence    | AF12 (DSCP 12/0x0c)   | AF22 (DSCP 20/0x14)   | AF32 (DSCP 28/0x1c)   | AF42 (DSCP 36/0x24)   |
+------------------------+-----------------------+-----------------------+-----------------------+-----------------------+
| High Drop Precedence   | AF13 (DSCP 14/0x0e)   | AF23 (DSCP 22/0x16)   | AF33 (DSCP 30/0x1e)   | AF43 (DSCP 38/0x26)   |
+------------------------+-----------------------+-----------------------+-----------------------+-----------------------+

Table: Assured Forwarding (AF) Behavior Group

For low-drop/low-latency traffic, the AF and VA DSCP values are
recommended.

+-----------------------------+--------------+-----------------------------------------------------+
| PHB                         | DSCP Value   | RFC                                                 |
+=============================+==============+=====================================================+
| Expedited Forwarding (EF)   | 46/0x2e      | `RFC 3246 <http://tools.ietf.org/html/rfc3246>`__   |
+-----------------------------+--------------+-----------------------------------------------------+
| Voice Admit (VA)            | 44/0x2c      | `RFC 5865 <http://tools.ietf.org/html/rfc5865>`__   |
+-----------------------------+--------------+-----------------------------------------------------+

The Class Selector (CS) PHB group has been retained from TOS.

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

To provide limited backward comparability to TOS, pfSense also
recognizes the following DSCP/TOS values.

+---------------+--------------+-------------+
| TOS           | DSCP Value   | TOS value   |
+===============+==============+=============+
| reliability   | 1/0x01       | 4/0x04      |
+---------------+--------------+-------------+
| throughput    | 2/0x02       | 8/0x08      |
+---------------+--------------+-------------+
| lowdelay      | 4/0x04       | 16/0x10     |
+---------------+--------------+-------------+

pfSense only matches exact values. All six bit in the DSCP field must
match.

The 2.1 versions do *not* allow to match the Default Forwarding (DF) PHB
(DSCP 0x00).

Caveats
-------

Versions earlier than 2.1.1 deviate from this description.

Adding additional DSCP values for experimental use
--------------------------------------------------

Assuming basic knowledge about PHP, it is possible to add additional
DiffServ Code Point values by editing **/usr/local/www/guiconfig.inc**.
In this file, the variable **$firewall_rules_dscp_types** is
initialized with an array containing the recognized DSCP values. New
values can be specified as hex values, optionally followed by a blank
and a comment like, for example::

  "0x03 (example EXP/LU value)".

Valid values are in the range 0x01 - 0x3f.

Please be aware that such changes will be lost upon a firmware update.

RFCs
----

-  RFC 2474 — Definition of the Differentiated Services Field (DS Field)
   in the IPv4 and IPv6 Headers
-  RFC 2475 — An Architecture for Differentiated Services
-  RFC 2597 — Assured Forwarding PHB Group
-  RFC 2983 — Differentiated Services and Tunnels
-  RFC 3086 — Definition of Differentiated Services Per Domain Behaviors
   and Rules for their Specification
-  RFC 3140 — Per Hop Behavior Identification Codes (replaces RFC 2836)
-  RFC 3246 — An Expedited Forwarding PHB (Per-Hop Behavior) (obsoletes
   RFC 2598)
-  RFC 3247 — Supplemental Information for the New Definition of the EF
   PHB (Expedited Forwarding Per-Hop Behavior)
-  RFC 3260 — New Terminology and Clarifications for Diffserv (updates
   RFC 2474, RFC 2475 and RFC 2597)
-  RFC 4594 — Configuration Guidelines for DiffServ Service Classes
-  RFC 5865 — A Differentiated Services Code Point (DSCP) for
   Capacity-Admitted Traffic (updates RFC 4542 and RFC 4594)

-  RFC 3289 — Management Information Base for the Differentiated
   Services Architecture
-  RFC 3290 — An Informal Management Model for Diffserv Routers
-  RFC 3317 — Differentiated Services Quality of Service Policy
   Information Base
