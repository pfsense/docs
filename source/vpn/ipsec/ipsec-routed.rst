Routed IPsec (VTI)
==================

Route-based IPsec is an alternative method of managing IPsec traffic. It uses
``if_ipsec(4)`` from FreeBSD 11.1+ for Virtual Tunnel Interfaces (VTI) and
traffic is directed using the operating system routing table. It does not rely
on strict kernel security association matching like policy-based (Tunneled)
IPsec.

A routed IPsec tunnel creates an ``ipsecXXXX`` interface at the operating system
level and this interface has its own IP address. The ``ipsecXXXX`` interface
must be assigned so it can be used for purposes such as static or dynamic
routing, daemon binding, traffic monitoring, and so on.

Once assigned, the IPsec interface also gains an automatic gateway which
provides policy routing and gateway group capabilities.

.. note:: Routed IPsec is not replacing traditional tunneled IPsec, both may be
   used. The choice is up to the user when creating an IPsec Phase 2 entry.

.. note:: Routed IPsec is available on firewalls running pfSense® software
   version 2.4.4-RELEASE or later.

Prerequisites
-------------

First, pick a transit network. This is similar to choosing a tunnel network for
an OpenVPN instance. Typically this is a /30 network in an unused subnet. This
example uses ``10.6.106.0/30``.

IPsec Configuration
-------------------

* Create an IPsec Phase 1 entry as usual.
* Create a Phase 2 entry under this Phase 1, set with...

  * Set **Mode** to *Routed (VTI)*
  * Enter ``10.6.106.1`` for the **Local Network Address**
  * Enter ``10.6.106.2`` for the **Remote Network Address**
  * Add a useful **Description**
  * Set the **Proposal** settings as needed

* Click **Save**, then click **Apply Changes**

IPsec Interface Assignment
--------------------------

* Navigate to **Interfaces > Assignments**
* Pick the new ``ipsecX`` interface from the **Available Network Ports** list
* Click **+ Add**
* Note the new interface name, e.g. *OPT1*
* Navigate to **Interfaces > [New Interface Name]**
* Check **Enable**
* Give the interface a more suitable name using the **Description** field (e.g.
  VTI_FOO)
* Leave the **IPv4 Configuration Type** and **IPv6 Configuration Type** set to
  *None*
* Click **Save**, then click **Apply Changes**

A gateway is created automatically and can be used for static routing, policy
routing, and so on.

At this point the interface is available for use like any other interface. It
can be used for packet captures, traffic graphs, binding daemons, routing
protocols, and other tasks never before possible with IPsec on pfSense software!

Routing
-------

Until routing is configured, no traffic will attempt to cross the IPsec tunnel
except for gateway monitoring probes, if they are enabled.

Static Routes
^^^^^^^^^^^^^

To setup static routes, navigate to **System > Routing**, **Static Routes** tab.
Add a new route there using the assigned IPsec interface gateway.

Policy Routes
^^^^^^^^^^^^^

To policy route traffic across a routed IPsec tunnel, use the assigned IPsec
interface gateway in firewall rules as usual for policy routing.

.. seealso:: :doc:`/routing/directing-traffic-with-policy-routing`

Dynamic Routes
^^^^^^^^^^^^^^

The assigned IPsec interface can be used in dynamic routing daemons such as FRR,
Quagga, and OpenBGPD. BGP and OSPF can both operate across routed IPsec
interfaces.

.. _vpn-ipsec-vti-firewall:

Routed IPsec Firewall Rules
---------------------------

Routed IPsec traffic appears to the OS on both the specific IPsec interface and
the enc0 interface, which is governed by the rules on the **IPsec** tab. Though
a tab appears for the assigned interface, **traffic must be passed on the IPsec
tab**.

Caveats
-------

Routed IPsec works best when both sides support routed IPsec. It can still work
when only one side supports routed IPsec, but most of its benefits are lost.

Rather than managing IPsec Phase 2 entries, routes must be managed instead.
Since this can be automated with dynamic routing protocols this is not a large
concern.

Firewall rule processing can be confusing, as mentioned in
:ref:`vpn-ipsec-vti-firewall`. This is still undergoing testing, but likely
means that reply-to will not function. There are also known issues with NAT,
notably that NAT to the interface address works but 1:1 NAT or NAT to an
alternate address does not work.

.. _IPsec category of the forum: https://forum.netgate.com/category/17/ipsec
