.. include:: /substitutions.rsti

Network Interface Drivers with ALTQ Traffic Shaping Support
===========================================================

The intention of this page is to provide information regarding FreeBSD's
ALTQ drivers, what they do, and how they work.

Information
-----------

The ALTQ framework is used for queuing/traffic shaping. In pfSense, this
is utilized by the Shaper Wizard and the Queues/Interfaces tabs under
**Firewall > Traffic Shaper**.

See the `altq(4) <http://www.freebsd.org/cgi/man.cgi?query=altq&sektion=4>`_ or
the `altq(9) <http://www.freebsd.org/cgi/man.cgi?query=altq&sektion=9>`_.

On that page, select the :doc:`version of FreeBSD that corresponds to the version of pfSense being run </releases/versions-of-pfsense-and-freebsd>`.

In addition to the drivers listed as supporting ALTQ in FreeBSD, pfSense
also includes support for ALTQ on vlan(4) and IPsec enc(4) interfaces.

If the NIC being used does not support ALTQ, :doc:`Limiters </trafficshaper/limiters>` may
be used instead.
