.. include:: /substitutions.rsti

Configuring Inbound Load Balancing
==================================

Inbound load balancing is useful for supporting multiple servers, but
appearing externally as a single system. This makes it possible to
distribute the load of a website across several physical servers, in a
semi-intelligent way that recognizes if a server goes down, etc.

Failover
--------

*Failover* behavior is not directly supported but can be accomplished by
using separate pools for servers to be used in this fashion on the
**Virtual Server** settings.

For example, with a two-server setup (live and hot-standby), put the
primary server in one pool and put the secondary server in a second
pool. Then choose the primary server's pool for **Virtual Server Pool**
and select the second pool for **Fall Back Pool**. It is not possible to
do 3 or more levels of automatic failover.

Set up Load Balancing Pool
--------------------------

The first thing to do is create a pool (**Services > Load Balancer**,
**Pools** tab, click |fa-plus|).

Enter a **Name** and **Description**, and select *Load Balance* for the
**Mode**. Set the port as appropriate (e.g. for HTTP, use 80).

Pick a **Monitor** type, such as ICMP and enter the **Server IP
Address** of a server that can serve content for the site, then click
**Add to pool**. Note that all servers must be listening on the same
port. The port that external clients (from the WAN) connect to can be
different from this port. Repeat the process for additional servers, if
any exist.

Note that if there is more than one server, they must be synchronized
(or using shared storage) and serving the same content. If a web
application server that uses server-side sessions is used, the sessions
must be shared across all servers. For example, use a session state
server, or store all session data in a shared database.

Any servers added to the list will have traffic load balanced between
them, and they will be monitored. If a server goes down, traffic will no
longer be sent to it. The up/down status is tracked using the chosen
**Monitor** type.

Set up Virtual Server
---------------------

The next step is to send traffic to the pool by adding a new *Virtual
Server* (**Services > Load balancer**, **Virtual Servers** tab, click
|fa-plus|). Enter a **Name** and **Description**, and enter the WAN IP address
clients will use for the **IP address**. If this IP address is a
different address than the WAN IP address, it may need a
:doc:`/firewall/virtual-ip-address-feature-comparison` configured.

The **Port** is the TCP port that clients will connect to on the WAN
interface. This can be different from the port used by the servers in
the pool for listening.

Select the **Virtual Server Pool** created previously, and optionally
select a **Fall Back Pool**. The **Fall Back Pool** may serve the same
content as the rest of the servers in the pool (eg, in a two-server
live/hot-standby setup), or it may be a server that always returns a
static "Sorry, this site is offline" message. If a **Fall Back Pool** is
not selected, or if the server is unavailable, connections to the
virtual server will fall through and will not be redirected.

Advanced Settings
-----------------

The **Settings** tab under **Services > Load Balancer** contains global
options to tweak how relayd monitors and provides services.

-  **Timeout**: The global Timeout in milliseconds for health checks.
   The default value when blank is 1000ms (1 second). For heavily loaded
   or sensitive servers and certain types of health checks, this may not
   be long enough.
-  **Interval**: Number of seconds between health checks. The default
   value when blank is 10 seconds. As with **Timeout**, this may need
   increased in certain cases.
-  **Prefork**: The number of processes spawned by relayd to handle
   requests. This **only** applies to **DNS** mode, as that is the only
   mode on pfSense where relayd acts as a proxy instead of a relay.

Firewall Rules
--------------

Firewall rules on the WAN tab where the Virtual Server is located are
also necessary. Since *relayd* is NAT-based these rules must pass
traffic to the *local* **Pool** addresses and ports.

Additional Notes
----------------

Sticky connections
~~~~~~~~~~~~~~~~~~

**Sticky connections** (**System > Advanced**, **Miscellaneous** tab)
can somewhat alleviate the problems of shared sessions, but they are not
as reliable as using shared session storage. For the scenario where a
client requests a web page and then all the content (images, scripts) on
that page, if sticky connections are enabled the client will grab the
page and all the images and scripts from the same server. However,
depending on how long it is until they request the next page, they may
or may not go to the same server a second time. That timeout value may
be adjusted using the field underneath the **Use Sticky Connections**
checkbox on **System > Advanced**, **Miscellaneous** tab.

Failover and Recovery
~~~~~~~~~~~~~~~~~~~~~

The relayd daemon on pfSense monitors all the servers in the pool (every
10 seconds by default). If it detects a server as being offline, it
immediately stops sending traffic to that server. It continues trying to
connect, and when it detects it back online, it resumes sending traffic.
If it sends a client request to a server that is down (e.g. before
pfSense detects that it is down), that client request will time out.

If all servers go down, pfSense will send traffic to servers in the the
**Fall Back Pool**. Once a pool server is back up, it will again start
to send traffic to the preferred pool server(s), but note that some
traffic may still go to the **Fall Back Pool** for a short period of
time, especially if **Sticky connections** is turned on. Because of
this, if the **Fall Back Pool** is serving the same content as the pool
server(s), it is important that it shares content/sessions with the pool
server(s) just as multiple pool servers would do.

Lack of NAT Reflection
~~~~~~~~~~~~~~~~~~~~~~

The relayd service implements server load balancing entirely in pf using
NAT. It does not, however, automatically add NAT reflection rules even
when NAT reflection is enabled. That parameter applies only to Port
Forwards and 1:1 NAT. This means that by default it is **not** possible
be able to connect to virtual servers from the same network on which the
real servers reside.

Manual Outbound NAT rules may be added to work around this limitation
section. The outbound NAT rules must hide the true source of the traffic
so "reflected" client connections appear to originate from the firewall
itself.

For more details on why internal connections do not work and what rules
need to be added manually, see `Redirection and
Reflection <http://www.openbsd.org/faq/pf/rdr.html#reflect>`__ section
of the pf manual.

Troubleshooting
---------------

See :doc:`/loadbalancing/inbound-load-balancing-troubleshooting`

Limitations
-----------

The relayd load balancing daemon is good for simple deployment and for
those which behave well within its limits and capabilities. For more
advanced deployments a more full-featured proxy is required, such as
:doc:`/packages/haproxy-package`.
