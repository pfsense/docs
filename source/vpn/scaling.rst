VPN Scaling
===========

The advice on this page is intended to help firewall administrators handle
increased VPN volume, both in terms of throughput and number of connected users.

.. warning:: The advice on this page is relayed from experience and from
   community members. The advice on this page may not apply to all environments
   or use cases, and has not been definitively proven to help, but is offered in
   case others find it useful.

.. seealso:: This document won't cover all factors of choosing between VPN types
   or how to setup VPNs, that information can be found :doc:`elsewhere in this
   documentation <index>`, in the |book_link|, and in |hangout_link|.

.. contents::
   :depth: 2
   :local:

General Advice
--------------

No pfSense Limits
~~~~~~~~~~~~~~~~~

pfSense does not place any artificial limits on VPN connections. Any limitations
encountered are due to settings, the hardware/environment, or the underlying
technology.

IPsec is Faster
~~~~~~~~~~~~~~~

IPsec is faster than OpenVPN, so if both client and server support IPsec, use
IPsec.

Use External Authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~

For user-based authentication, the most efficient method of user management for
large numbers of accounts is an external authentication source, such as a RADIUS
server, LDAP server, Active Directory (Via LDAP or RADIUS/NPS), etc.

Check Logs
~~~~~~~~~~

If additional users are unable to connect, look in the logs on both the client
and server side for specific error messages before seeking support.

Use Hardware Acceleration
~~~~~~~~~~~~~~~~~~~~~~~~~

Using a cryptographic accelerator such as a CPU with AES-NI will help greatly
with throughput and crypto-related tasks. Enable the AES-NI and BSD
``cryptodev`` modules under **System > Advanced** on the **Miscellaneous** tab.

Use AES-GCM
~~~~~~~~~~~

Using efficient encryption like AEAD ciphers, which combine encryption and
authentication, will increase security and performance. Both IPsec and OpenVPN
can use AES-GCM, which is an AEAD cipher. Client support may vary by platform.

Use Accelerated Ciphers
~~~~~~~~~~~~~~~~~~~~~~~

As above, using AES-NI and AES-GCM is the best possible combination at this
time. That said, certain hardware may accelerate other ciphers so that alternate
choices are faster or more efficient. For hardware sold by Netgate, see the
|appliance_link| page for performance data and recommendations.

Disable Performance-Limiting Mitigation Settings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

While we do not have any data on if or by how much they may impact VPNs, CPU
vulnerability mitigation methods such as Kernel PTI and MDS mode can potentially
degrade total performance. The potential for exploitation is minimal since
arbitrary code cannot be run on the firewall except by users which already have
the equivalent of administrator-level access. To ensure this risk stays low,
only allow trusted administrators to access the firewall GUI and shell (SSH or
console). The settings to enable/disable these features are under **System >
Advanced** on the **Miscellaneous** tab.

Check Tunnel Network/Virtual Address Pool Sizes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Both IPsec and OpenVPN can assign addresses to clients out of a pool for remote
access/mobile VPNs. The sizing of this pool limits how many clients can connect.
For example, the maximum number of users in a /24 pool is 253, but other
settings may reduce that value. See the sections below for more specific advice.

Use "Secure Enough" Settings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

While we do not recommend deliberately using weak configurations, in some cases
trade-offs are made for security between two secure ciphers or settings where
one may offer *even better* security, but the lower of the two is still secure.
In these cases, using the "Secure Enough" option can provide efficiency vs
increased security. So long as the decision is informed, there may be some
performance gained without compromising security in an unacceptable way. For
example, with AES-GCM a key length of 128 bits is still considered secure. A 256
bit key is more secure, but the 256 bit key could put more of a burden on the
hardware.

Consider Split Tunneling
~~~~~~~~~~~~~~~~~~~~~~~~

Configurations which send all client data over the VPN, including Internet-bound
traffic, will consume more resources than those which only send traffic for
specific subnets. There are plenty of valid reasons to use either kind of
configuration, however, when resources are stretched thin, easing the traffic
burden on the VPN may justify switching to split tunneling rather than tunneling
everything. Depending on the type of VPN and client, this may require
adjustments on the server, the client, or both. See the sections below for
specific recommendations.

Use Multiple Firewalls
~~~~~~~~~~~~~~~~~~~~~~

In some instances, the burden may be too great for any single pfSense firewall
to handle. In cases like this, multiple firewalls can be used to handle the
required number of clients or throughput, at a cost of greatly increased
complexity. There is no way to automatically balance between nodes in this
manner, but such a configuration could be manually managed. This would also
likely require the capability to have multiple external addresses on the WAN so
each firewall can work in parallel, and also increases the complexity of routing
on the internal side.

Use TNSR
~~~~~~~~

TNSR is capable of vastly increased total IPsec throughput compared to pfSense.
If pfSense is unable to reach the throughput needs for a given use case, see the
|tnsr_link| for more information.

Scaling IPsec
-------------

IPsec is well-suited to high throughput by default, especially given the advice
above, but there are additional IPsec-specific tweaks which may help.

.. note:: See the |tnsr_link| for information about using TNSR for even larger
   total site-to-site throughput needs.

Optimal Encryption Settings
~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Use AES-NI capable hardware.
* In Phase 1 (IKE) settings, use:

  * *AES128-GCM* with *128 bit* key length for the Algorithm
  * *AES-XCBC* for the hash, which in this case is effectively a Pseudo-Random
    Function (PRF).

* In Phase 2 (Child SA) settings, use:

  * *AES128-GCM* with *128 bit* key length for the Algorithm
  * **Do not select any Hash Algorithms**. A hash algorithm is unnecessary for
    AES-GCM as it already includes authentication.

Enable Multiple Phase 1 and Phase 2 Proposals
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Multiple Phase 1 and Phase 2 encryption proposals may be configured in the GUI.
Enabling multiple combinations of settings will allow peers to choose the most
optimal settings which both sides support.

Enable Asynchronous Cryptography
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

IPsec cryptography jobs can be dispatched multi-threaded to run in parallel and
increase performance. However, not all platforms and configurations fully
support this function. To enable this capability, check **Asynchronous
Cryptography** under **VPN > IPsec** on the **Advanced** tab.

.. warning:: Be on the lookout for IPsec traffic drops/failures to pass with
   this setting enabled. See https://redmine.pfsense.org/issues/8964 for more
   information.

Split Tunneling
~~~~~~~~~~~~~~~

As mentioned above, split tunneling would only send traffic for specific subnets
across the VPN rather than sending all traffic. On IPsec, this can be done in
some cases by listing the specific networks in Phase 2 entries for the Mobile
IPsec P1 rather than ``0.0.0.0/0``. On the mobile clients tab, set **Provide a
list of accessible networks to clients**. Even with that set, certain cases such
as Windows 10 may require additional changes to direct clients to send only
specific traffic over the tunnel.

Scaling OpenVPN
---------------

Use IPsec Instead
~~~~~~~~~~~~~~~~~

As mentioned previously, where possible, use IPsec instead. IPsec is much more
efficiently integrated into the operating system, and is capable of much greater
throughput than OpenVPN.

Use UDP
~~~~~~~

UDP has less overhead for tunneled data, and if a client has to retransmit, it
won't compound the problem by retransmitting both inside and outside the tunnel.
Unless there are extenuating circumstances which require TCP, use UDP.

Use TLS for Authentication Only
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

OpenVPN can use TLS for both authentication and for encryption of the control
channel. Performing control channel encryption adds more overhead, which can add
up with many clients. If control channel encryption is not required, consider
using TLS for only authentication instead. No matter which option is chosen,
traffic carried by OpenVPN is encrypted.

Encryption Algorithm
~~~~~~~~~~~~~~~~~~~~

Use a CPU with AES-NI when possible, and use AES-GCM for the Encryption
Algorithm when possible. Note that for AEAD ciphers such as AES-GCM, OpenVPN
ignores the setting for **Auth Digest Algorithm**.

.. note:: AES-GCM can only be used in SSL/TLS mode, not Shared Key mode.

Use Negotiable Crypto Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

NCP can be used to set preferences so that more efficient ciphers can be
preferred by clients where possible, but others can be used when necessary. Set
high-priority selections such as *AES-128-GCM* first, followed by others like
*AES-128-CBC*.

Split Tunneling
~~~~~~~~~~~~~~~

As mentioned in the general section above, split tunneling only sends traffic
for specific subnets across the VPN rather than sending all traffic. With
OpenVPN, this can be done by **Unchecking** the **Redirect IPv4/IPv6 Gateway**
option(s) and configuring **IPv4/IPv6 Local Network(s)** entries instead.
Clients may still override this behavior remotely, however, so check the client
configurations as well.

Concurrent Connections
~~~~~~~~~~~~~~~~~~~~~~

pfSense does not impose any connection limits by default, but an administrator
may have chosen to configure a limit on the number of connections via the
**Concurrent Connections** setting on servers. Ensure this is either unset or
set high enough to accommodate the required number of users.

Disable Compression
~~~~~~~~~~~~~~~~~~~

Though using compression is tempting to squeeze extra throughput out of slower
links, it is both inefficient and insecure. Most data sent across VPNs in modern
environments is already encrypted or otherwise uncompressible, which wastes CPU
when attempting to compress. Additionally, vulnerabilities such as `VORACLE
<https://openvpn.net/security-advisory/the-voracle-attack-vulnerability/>`__
can allow attackers to glean information about encrypted data when it has been
compressed. Disabling encryption will mitigate that attack and also reduce CPU
overhead. On the server, set **Compression** to *Disable Compression*.

Duplicate Connections
~~~~~~~~~~~~~~~~~~~~~

Normally, if an OpenVPN client connects using the same username or certificate
CN, the older connection is broken in favor of the new connection. This is more
secure, but does not allow any given user to connect multiple times.
Circumstances may necessitate supporting this, and in some environments it's not
possible to give every device a unique username and/or certificate. Check
**Duplicate Connection** in the OpenVPN server settings to allow multiple
connections from the same user.

Topology
~~~~~~~~

On recent versions of pfSense, OpenVPN defaults to *subnet* topology which uses
addresses more efficiently, but if the VPN was configured initially on older
versions, or if an older guide was followed, it may still be using *net30*
topology. Using a common example tunnel network of ``10.0.8.0/24``, with
*subnet* topology, the VPN can have a maximum of 253 users but with *net30*, it
can only have 63. This is because in *net30* mode, each user receives a /30
subnet which utilizes four IP addresses for each user. In *subnet* mode, the
server uses a single address and the client uses a single address, which is much
more efficient.

Use UDP Fast I/O
~~~~~~~~~~~~~~~~

This option is experimental but for those who have used it, it can result in
much higher throughput. Not all platforms support it, however.

Increase Send/Receive Buffer
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The default buffer size is safe, but not optimal. Increasing the buffer size to
512KiB on both sides can result in greater throughput. Results will vary by
platform, internet link speed, and other factors. May require experimenting with
multiple values to find the most efficient setting for a given environment.

Use Multiple Servers
~~~~~~~~~~~~~~~~~~~~

OpenVPN is not multi-threaded so any single instance of OpenVPN is limited to
using a single CPU. If a router has fast cores and not too many users, that may
be OK, but it does not scale well. A workaround for this is to split users onto
multiple servers. There are various means to reach this goal, including (but not
limited to):

* Multiple servers on different WANs or ports, each with unique tunnel
  networks but otherwise identical settings (Same CA structure, encryption,
  etc).

  * Administrators could choose to manually configure pools of clients to
    connect to specific servers, but that does not scale well.
  * Clients may connect to any server configured in this manner so long as
    their settings line up properly.
  * Multiple servers can be listed in a single client configuration with
    additional ``remote`` statements.
  * Add ``remote-random`` to the client configuration so that clients will
    pick a random server when starting, which avoids overloading whichever
    server is listed first.
  * Servers could be run on multiple WANs to overcome single-circuit
    throughput limits.

* Multiple servers with completely unique settings (Different CA structure,
  different clients, etc)

  * More secure but more difficult to manage.
  * Clients must use different configurations to reach each server, no
    automated/built-in way to pick between them unless a specific client
    supports that function.
  * Good for isolating separate security levels (e.g. remote workers, remote
    administrators, vendors).

Process Efficiency
~~~~~~~~~~~~~~~~~~

As a counterpoint to the above, each server will incur additional memory and
other overhead to manage the process. When dealing with site-to-site VPNs, it is
more efficient from a *memory* standpoint to use a single server with multiple
clients (Peer to Peer SSL/TLS) vs servers for every node (Peer to Peer Shared
Key, or SSL/TLS with a /30 tunnel network). If memory is a limiting factor, use
fewer servers. If CPU overhead is the limiting factor, use separate servers.
