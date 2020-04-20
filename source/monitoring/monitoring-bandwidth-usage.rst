Monitoring Bandwidth Usage
==========================

With pfSense® software, there are several methods for monitoring
bandwidth usage, with different levels of granularity.

pftop
-----

If a connection is currently active, connect to the pfSense router's
console (physical access or ssh) and watch the traffic flow with pftop
(Option ``9``).

The output can be changed to show several views (press ``0``-``8`` or ``v`` to
cycle) and may be sorted in various ways. Press ``?`` for a list of
available command keys while running pftop.

iftop
-----

Install iftop from the :doc:`/packages/package-list`, then tun it from the shell
(console or SSH) as follows::

  iftop -nNpPi em0

Change ``em0`` to be the interface that should be monitored.

In the above example, ``-nNpP`` tells iftop to not resolve hostnames (``n``)
or port numbers (``N``), and to run in promiscuous mode (``p``) and also display
ports in the output (``P``).

Press ``t`` to cycle through various views.

trafshow
--------

Another option for viewing real time throughput is trafshow. To install
it, follow the example at :doc:`Installing FreeBSD Packages </packages/installing-freebsd-packages>`
using *trafshow* as the package name.

Once installed, run it at an SSH command prompt, run::

  trafshow

Then select the interface.

Built-in Graphs
---------------

If overall per-interface usage is all that is required, there are
built-in RRD graphs in pfSense software, which can be found under
**Status > Monitoring**.

BandwidthD
----------

If more detail is required, such as by client IP on the LAN interface,
there is a package for
`bandwidthd <http://bandwidthd.sourceforge.net/>`__ that can be
installed under **System > Packages**. Once installed, it appears under
**Diagnostics > BandwidthD**.

Darkstat
--------

Darkstat is also available in **System > Packages**. Once installed, it
appears under **Diagnostics > darkstat**. It also offers bandwidth
graphs for an interface, as well as traffic to/from specific IP
addresses.

NTOPNG
------

If even more detail is required, the
`ntopng <http://www.ntop.org/overview.html>`__ package, which can
also be found under **System > Packages**, can help. It can break down
detail by IP, protocol, and so on. Once installed, it appears under
**Diagnostics > ntopng**. It will even track where connections were made
by local PCs, and how much bandwidth was used on individual connections.

The older ntop package has been replaced by ntopng.

Due to the disk resource requirements of ntop and ntopng, it is not recommended
for systems that have low CPU or RAM.

Monitoring on Multiple Interfaces
---------------------------------

Currently, **darkstat** and **bandwidthd** do not listen on multiple interfaces.
**ntopng** will listen on multiple interfaces.

Netflow
-------

Netflow is another option for bandwidth usage analysis. Netflow is a
standard means of traffic accounting supported by many routers and
firewalls. Netflow collector running on a host inside the network is
required to collect the data. pfSense software can export Netflow
data to the collector using the
:doc:`softflowd </monitoring/exporting-netflow-with-softflowd>`
package or the pfflowd package.

Traffic Totals
--------------

vnstat is another bandwidth monitoring tool available to install as a
package. See :doc:`Traffic Totals </packages/vnstat>` for more information
