Dig command on pfSense 2.2 and later
====================================

The `dig command`_ was part of the BIND utilities included in FreeBSD
base on 9.x and below. pfSense had included **dig** in the past as a part
of the FreeBSD base but it is not included currently. On FreeBSD 10.x,
BIND was removed from base and replaced by Unbound. pfSense 2.2 followed
suit and began using Unbound as well.

For situations where **dig** was used in the past, the **drill** command
should be used instead on FreeBSD 10.x.

The `drill command`_ has very similar output to dig, but has different syntax.
Run ``drill -h`` for more information.

Examples
--------

DNS Trace:

.. code::

  dig +trace www.google.com

.. code::

  drill -V5 -T www.google.com

.. _dig command: https://www.freebsd.org/cgi/man.cgi?query=dig
.. _drill command: https://www.freebsd.org/cgi/man.cgi?query=drill