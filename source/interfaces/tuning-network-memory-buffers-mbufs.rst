.. include:: /substitutions.rsti

Tuning Network Memory Buffers (mbufs)
=====================================

From the FreeBSD man page:

    An mbuf is a basic unit of memory management in the kernel IPC
    subsystem. Network packets and socket buffers are stored in mbufs. A
    network packet may span multiple mbufs arranged into a mbuf chain
    (linked list), which allows adding or trimming network headers with
    little overhead.

    An mbuf consists of a variable-sized header and a small internal
    buffer for data.

| For more detail, there is a paper published on the subject:
| `Network Buffer Allocation in the FreeBSD Operating System (May 2004)
  Bosko Milekic
  <bmilekic@FreeBSD.org> <http://bmilekic.unixdaemons.com/netbuf_bmilekic.pdf>`__

If there are concerns about mbuf usage on a firewall, see
:doc:`Tuning and Troubleshooting Network Cards </hardware/tuning-and-troubleshooting-network-cards>`.
