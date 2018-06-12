.. include:: /substitutions.rsti

Configuring Traffic Shaping
===========================

Traffic Shaping and queuing in pfSense can be accomplished in several
ways. The easiest to implement is ALTQ-based shaping with the Traffic
Shaping Wizard.

Traffic Shaping configuration is based at **Firewall > Traffic
Shaping**.

What is traffic Shaping?
------------------------

    Traffic shaping (also known as “packet shaping”) is the control of
    computer network traffic in order to optimize or guarantee
    performance, lower latency, and/or increase usable bandwidth by
    delaying packets that meet certain criteria. More specifically,
    traffic shaping is any action on a set of packets (often called a
    stream or a flow) which imposes additional delay on those packets
    such that they conform to some predetermined constraint (a contract
    or traffic profile).

`From Traffic Shaping Wikipedia
article <http://en.wikipedia.org/wiki/Traffic_shaping>`__.

Limitations
-----------

ALTQ shaping is not capable of setting an upper limit on traffic. Use
:doc:`/trafficshaper/limiters` for controller upper limits.

Wizards
-------

Use of The **Traffic Shaping Wizard** is recommended to create a default
set of rules from which to start. The rules created by the wizard cope
well with VOIP traffic, but may need tweaking to accomodate other
traffic not covered by the wizard.

There are several wizards available, the exact choices depend on the
version in use.

As an example, look at shaping P2P traffic. Assuming the wizard was
used, *qP2P* will exist under WAN(s) and LAN(s). When a P2P app is
launched, traffic will show in these queues if it it was matched by the
rules creaed by the wizard. These queues are designed to carry the bulk
P2P traffic, which normally slows a connection down. Other generic
traffic, like web pages (HTTP), email, IM, VOIP etc will go into other
queues.

On current versions of pfSense, queue sizes and bandwidths are sized
appropriately for most configurations by the wizard, unlike older
versions. In some cases they may need to be manually adjusted, but for
the majority of cases it is unnecessary.

Multiple Lan/Wan
~~~~~~~~~~~~~~~~

This wizard can accommodate an arbitrary number of WANs and LANs (1 or
more of each). It is the best choice to use.

Dedicated Links
~~~~~~~~~~~~~~~

This wizard is meant for multiple WANs and LANs where specific LAN/WAN
pairings do not mix traffic with others. So a single firewall manages
several 'virtual' links through itself. For example, say providing
services to 4 different customers in one building, and they each have
their own separate internet connections. All 4 internet connections
could be run through one pfsense box to each of the customers LAN
networks and provide separate traffic shaping configurations to each.

Other Wizards
~~~~~~~~~~~~~

Other wizards may be used, if their descriptions suit the environment in
which they are intended to be used. Due to a large amount of unnecessary
redundancy between the various wizards, use of the **Multiple Lan/Wan**
wizard is recommended instead as it is the only similar option available
on pfSense 2.2 and later.

Queuing Schedulers
------------------

Priority Queueing (PRIQ)
~~~~~~~~~~~~~~~~~~~~~~~~

Priority queuing is the simplest form of traffic shaping, and often the
most effective. It performs prioritzation of traffic only, without
regard for bandwidth. A flat hierarchy of priority levels is created,
all packets at the highest priority level are always processed first.

**Pros**

-  Easy to configure and understand.

**Cons**

-  Lower priority queues can be completely starved for bandwidth easily.

Class Based Queueing (CBQ)
~~~~~~~~~~~~~~~~~~~~~~~~~~

CBQ is the next step up from priority queuing. A tree hierarchy of
classes is created; each with an assigned priority and bandwidth limit.
Priority works much in the same way that it does in the PRIQ however,
instead of processing **all** packets from the class, it will only
process enough packets until the **bandwidth limit** is reached.

Hierarchical Fair Service Curve (HFSC)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Hierarchical Fair Service Curve (HFSC) is the most complex of the ALTQ
shaper types. In older versions of pfSense, it was the only option
available. It has a heirarchy of queues and is capable of real-time
traffic guarantees.

It can be very effective for VoIP on links that degrade quickly, such as
3G/4G, but it can be complex to configure and tweak for proper
operation.

ACK Queue Size
--------------

The size of the ACK Queue often needs to be adjusted with asymmetrical
links since by default the size is based on both up and down speed being
equal. See the later section on this article about **ACK Queue Sizing**

Floating Rules
--------------

Floating rules allow shaping rules to affect all interfaces at once.
Rules there may also be set to *Match* which selects them for traffic
shaping queues but does NOT affect whether or not the traffic is passed
or blocked. These rules are evaluated before the interface rules, and
are non terminating. The last floating rule that matches a stream will
be the one that applies. See :doc:`/firewall/floating-rules` for more details on how Floating
Rules operate.

Tips
~~~~

When modifying floating rules, remember to clear the firewall states
before testing changes. If the states are not cleared, traffic will not
be queued properly.

Troubleshooting Traffic Shaping
-------------------------------

View Queues with pfTop
~~~~~~~~~~~~~~~~~~~~~~

To view live stats on traffic shaping (altq) from the command line use
the following command::

  pftop -s1 -v queue

Limiters
--------

For information on Limiters, see: :doc:`/trafficshaper/limiters`.

Layer 7
-------

Layer 7 inspection, also knows as Deep Packet Inspection or DPI, may be
used to match traffic and apply a queue.

ACK Queue Sizing
----------------

When data is downloaded, a computer needs to send (upload) ACK packets.
These are basically saying “yep, I got that part of the download OK”. If
the computer being downloaded from detects that an ACK has not been
received, it assumes that the data was not received and sends it again.
The rate at which ACKs are sent back is also used to help determine the
maximum speed at which data may be downloaded, so it is important that
ACKs get sent as soon as possible and don't get dropped in order to keep
downloads flowing fast. Also, repeatedly dropped ACKs can result in
dropped connections, web page time-outs etc.

The qACK queue is where the ACK packets are placed. This queue must have
enough bandwidth to maintain downloads. By default, the wizard uses 18%
of the link speed for ACKs, but that may not be ideal. To work out how
much bandwidth is needed, there are two options. By experimentation,
keeping an eye on the queue while downloading as fast as the connection
will allow, or by using math to calculate the value. As a rough starting
point, an NTL 10Mb/512Kb cable connection needs about 260-270Kb/sec of
ACK packets to download at full speed.

Taking the above example, we can see that ACKs can consume 60% of the
available upload bandwidth. Thus, qACK on WAN should have at least 60%
bandwidth available (65% was used for the above example). If the qACK
queue on WAN is set like this, there should not be any drops in that
queue. However, there will be a lot in qP2P, but that's OK. P2P upload
packets are bulk traffic, not really important so it doesn't matter if
they drop a bit. qP2P will now be using what is left of the available
upload bandwidth, after qACK on WAN has used up to 65%. The bandwidth
allowance for qDefault on WAN may need increased as well, since this is
where HTTP requests and other general uploads go if they are not
otherwise matched and placed into other queues. It should also be higher
priority than qP2P. Bandwidth percentages need not add up to 100%, but
unless the connection is very slow, qDefault need not be large since it
is mainly small requests or the odd few kb of other traffic.

Other Documentation
-------------------

Links to other useful documentation.

-  `PF packet flow
   diagram. <http://homepage.mac.com/quension/pf/flow.png>`__ - Notice
   how Altq is the last item to get processed.
-  `Shaper 2.0 bounty
   thread. <http://forum.pfsense.org/index.php/topic,2718.0.html>`__
-  `ACK queue sizing
   thread. <http://forum.pfsense.org/index.php/topic,2484.0.html>`__
-  `QoS/Traffic Shaping information and
   tips. <http://forum.pfsense.org/index.php/topic,11986.0.html>`__
-  `Tips and Tricks
   thread. <http://forum.pfsense.org/index.php/topic,1384.0.html>`__
-  `P2P queue sizing
   discussion. <http://forum.pfsense.org/index.php/topic,9129.0.html>`__
-  `P2P queue sizing
   post. <http://forum.pfsense.org/index.php/topic,9427.0.html>`__
-  `Monitoring PF
   article. <http://prefetch.net/articles/monitoringpf.html>`__
-  `PF: Packet Queueing and Prioritization (OpenBSD not
   FreeBSD) <https://web.archive.org/web/20160404153707/http://www.openbsd.org/faq/pf/queueing.html>`__
-  `HFSC howto on Calomel.org. <https://calomel.org/pf_hfsc.html>`__
-  `Paper on HFSC
   design. <http://www.cs.cmu.edu/~hzhang/HFSC/main.html>`__
-  `Linux HFSC description, good conceptual
   examples. <http://linux-ip.net/articles/hfsc.en/>`__

