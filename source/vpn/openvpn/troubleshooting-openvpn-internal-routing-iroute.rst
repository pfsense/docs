Troubleshooting OpenVPN Internal Routing (iroute)
=================================================

When configuring a site-to-site PKI (SSL) OpenVPN setup, an internal route must
be configured for the client subnet on the **Client Specific Overrides** tab set
for the client certificate's **common name**, using either the **IPv4/IPv6
Remote Network/s** boxes or manually using an ``iroute`` statement in the
advanced settings. Each network listed in the **IPv4 Remote Network/s** and
**IPv4 Remote Network/s** boxes will have an ``iroute`` created automatically.

Next, ensure that the **common name** matches and that the internal route is
being learned/added as it should be. Log verbosity in OpenVPN may need increased
to see if this is working. On **Status > OpenVPN** the internal routing for the
OpenVPN server may also be viewed while the client is connected.

For each network that needs an ``iroute`` statement, the **server** definition
must also have the same network(s) listed as **IPv4/IPv6 Remote Networks** or as
``route`` statements in the advanced options box.

For example:

* Server1 custom options::

    push "route a.a.a.0 255.255.255.0";
    route b.b.b.0 255.255.255.0;

* Client Specific Overrides for **Common Name** ``client1``:

  * **IPv4 Remote Network/s** set to ``b.b.b.0/24`` -OR-
  * Advanced options::

      iroute b.b.b.0 255.255.255.0;

client1 custom options::

  (blank -- no route statements needed)

On the server side, every ``iroute`` needs a corresponding ``route``. The
``route`` entries are for the OS to know that the subnet(s) should be routed to
OpenVPN from at the OS level. The ``iroute`` statements are internal to OpenVPN,
so it knows which network goes to which client based on its certificate.

See Also:

-  http://www.secure-computing.net/wiki/index.php/OpenVPN/Routing

