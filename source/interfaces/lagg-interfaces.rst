LAGG Interfaces
===============

Multiple network interfaces may be bonded ("teamed") together using `lagg(4)`_
for fault tolerance and/or increased bandwidth.

It should be noted that some protocols such as LACP will only work across multiple
switches if the switches are `Stackable`_.

.. seealso:: Refer to The pfSense Book for more information on `how to create or
   manage LAGG interfaces`_

.. _lagg(4): https://www.freebsd.org/cgi/man.cgi?query=lagg&apropos=0&sektion=0&manpath=FreeBSD+11.2-RELEASE+and+Ports&arch=default&format=html
.. _Stackable: https://en.wikipedia.org/wiki/Stackable_switch
.. _how to create or manage LAGG interfaces: /pfsense/en/latest/book/interfaces/interfacetypes-lagg.html 
