.. include:: /substitutions.rsti

Tuning Network Memory Buffers (mbufs)
=====================================

From the FreeBSD `MBUF(9) man page`_:

    An mbuf is a basic unit of memory management in the kernel IPC
    subsystem. Network packets and socket buffers are stored in mbufs. A
    network packet may span multiple mbufs arranged into a mbuf chain
    (linked list), which allows adding or trimming network headers with
    little overhead.

    An mbuf consists of a variable-sized header and a small internal
    buffer for data.

For more details, read `Network Buffer Allocation in the FreeBSD Operating
System [May 2004]`_.

If there are concerns about mbuf usage on a firewall, see
:doc:`/hardware/tuning-and-troubleshooting-network-cards`.

.. _MBUF(9) man page: https://www.freebsd.org/cgi/man.cgi?query=mbuf&sektion=9&manpath=FreeBSD+6.0-stable
.. _Network Buffer Allocation in the FreeBSD Operating System [May 2004]: https://www.bsdcan.org/2004/papers/NetworkBufferAllocation.pdf
