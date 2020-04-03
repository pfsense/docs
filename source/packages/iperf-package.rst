iperf package
=============

`iperf`_ is a tool used for network throughput testing.

Usage
-----

iperf running on pfSense® software is NOT a suitable way of testing
firewall throughput, as there is a significant difference between
performance of traffic *initiated or terminated on the firewall*
and traffic *traversing the firewall*. There are many suitable uses
for iperf running on pfSense software, but testing the throughput
capabilities of the firewall is not one of them.

Uses for iperf on pfSense software
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Measuring throughput from the internal network to the inside of the
  firewall

  * Useful in scenarios where portions of the internal network are behind
    links slower than the firewall's network interface. Examples include
    testing the throughput of a wireless network or private WAN network
    connected to a router inside the network.

* Testing end to end throughput between two firewalls on the Internet

* Anything else where performance measurement excluding throughput
  capabilities of the firewall are desirable.

Additional Resources
--------------------

* `iperf Man Page`_
* `iperf - The Easy Tutorial`_
* `Measure Network Performance with iperf`_

Known issues
------------

.. seealso:: You can find a list of known issues with the iperf package
   on the `pfSense bug tracker`_.

Package Support
---------------

This package is currently supported by |support_link| to those with an active
support subscription.

.. _iperf: http://software.es.net/iperf/
.. _iperf Man Page: http://software.es.net/iperf/invoking.html#iperf3-manual-page
.. _iperf - The Easy Tutorial: http://openmaniak.com/iperf.php
.. _Measure Network Performance with iperf: http://www.enterprisenetworkingplanet.com/netos/article.php/3657236
.. _pfSense bug tracker: https://redmine.pfsense.org/projects/pfsense-packages/issues?utf8=%E2%9C%93&set_filter=1&sort=id%3Adesc&f%5B%5D=status_id&op%5Bstatus_id%5D=o&f%5B%5D=category_id&op%5Bcategory_id%5D=%3D&v%5Bcategory_id%5D%5B%5D=187&f%5B%5D=&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=assigned_to&c%5B%5D=updated_on&group_by=&t%5B%5D=
