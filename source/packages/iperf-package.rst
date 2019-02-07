iperf package
=============

Description
-----------

iperf is a tool used for network throughput testing.

`iperf project <http://software.es.net/iperf/>`__

Usage
-----

iperf running on pfSense is NOT a suitable way of testing firewall
throughput, as there is a significant difference between performance of
traffic initiated or *terminated on the firewall* and traffic
*traversing the firewall*. There are many suitable uses for iperf
running on pfSense, but testing the throughput capabilities of the
firewall is not one of them.

Uses for iperf on pfSense
~~~~~~~~~~~~~~~~~~~~~~~~~

-  Measuring throughput from the internal network to the inside of the
   firewall

Useful in scenarios where portions of the internal network are behind
links slower than the firewall's network interface. Examples include
testing the throughput of a wireless network or private WAN network
connected to a router inside the network.

-  Testing end to end throughput between two firewalls on the Internet

-  Anything else where performance measurement excluding throughput
   capabilities of the firewall are desirable.

iperf Documentation
~~~~~~~~~~~~~~~~~~~

`iperf Man
Page <http://software.es.net/iperf/invoking.html#iperf3-manual-page>`__

`iperf - The Easy Tutorial <http://openmaniak.com/iperf.php>`__

`Measure Network Performance with
iperf <http://www.enterprisenetworkingplanet.com/netos/article.php/3657236>`__

