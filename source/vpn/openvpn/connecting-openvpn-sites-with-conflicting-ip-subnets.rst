.. include:: /substitutions.rsti

Connecting OpenVPN Sites with Conflicting IP Subnets
====================================================

This article describes how to map multiple subnets that have the same IP
address range using OpenVPN so that they can be accessed from a central
site. For example 192.168.0/24 is a very common addressing scheme and
you may wish to be able to access all the systems on those networks.

This is the desired outcome, Site 0 is “us”::

  Site 0 - 10.1.1/24
  Site 1 - 192.168.0/24 -> 10.10.1/24
  Site 2 - 192.168.0/24 -> 10.10.2/24
  Site 3 - 192.168.0/24 -> 10.10.3/24

So we can now access 192.168.0.33 on say site 2 as 10.10.2.33.

To get this to work we have to use 1:1 NAT and you should note that this
means that some things simply will not work, see notes below.

This is not the only way to do this. I have chosen to make the remote
sites (Sites 1-3) run the “server” and run the “client” at Site 0. You
can do it the other way around.

Preliminary
-----------

You need to pick **two** ranges for this scheme. The first one will be
the mapping subnets and the second one will be for OpenVPN client to
server connections. I have already chosen 10.10/16 for the mappings and
I am going to choose 10.254.100/24 for connections. The first choice
gives you 253 mappings before you need to use say 10.11/16 and the
second choice gives you 64 /30 subnets to link it all up.

Examples before NAT:

Site 0 to Site 1::

             <--------             (OpenVPN)            ---------->
  
  10.1.1/24 --- 10.254.100.2/30 --- INTERNET --- 10.254.100.1/30 --- 192.168.0/24

Site 0 to Site 2::

             <--------             (OpenVPN)            ---------->
  
  10.1.1/24 --- 10.254.100.6/30 --- INTERNET --- 10.254.100.5/30 --- 192.168.0/24

.. note:: Notice how the addresses on the right are still non unique - they are
   still always 192.168.0/24.

We use NAT to make each remote site unique::

  10.1.1/24 --- (OpenVPN) --- INTERNET --- OpenVPN_Interface - NAT - 10.10.1/24 <=> 192.168.0/24
  10.1.1/24 --- (OpenVPN) --- INTERNET --- OpenVPN_Interface - NAT - 10.10.2/24 <=> 192.168.0/24
  10.1.1/24 --- (OpenVPN) --- INTERNET --- OpenVPN_Interface - NAT - 10.10.3/24 <=> 192.168.0/24

Site 0 throws packets to a non existent destination (the mapping subnet)
down the tunnel that corresponds to the desired Site 1,2 or 3 and the
NAT at the other end translates to and from that mapping and sends the
result back to Site 0.

Recipe
------

In the following examples, only necessary changes from default are
given. You will still have to pick suitable transports (UDP by default)
and ports (1194 by default) I generally use UDP and a non standard port
eg 1200. Ensure you put in a suitable firewall rule on the servers' WAN
interfaces to allow the inbound connection VPN. I recommend that this be
restricted to the WAN IP of Site 0. At both ends you will need to add a
suitable firewall rule on the OpenVPN interface for traffic to pass.

At Site 1-3
~~~~~~~~~~~

OpenVPN server
^^^^^^^^^^^^^^

At each remote site, create a new OpenVPN server::

  Server Mode:          Peer to Peer
  Description:          Link to Site 0
  TLS authentication:   Tick "Automatically generate a shared TLS authentication key."
  IPv4 Tunnel Network:  <link subnet> eg 10.254.100.0/30
  IPv4 Remote networks: <IP range(s) at Site 0> eg 10.1.1.0/24

If Site 0 has multiple IP ranges then specify them all in IPv4 Remote
networks, comma separated. After saving, copy the key (“2048 bit OpenVPN
static key”) that was generated to the other end (see below)

1:1 NAT
^^^^^^^

You will need one of these for *each* network range at Site 0::

  Interface:          OpenVPN
  External subnet IP: <mapping subnet, first IP> eg 10.10.1.0
  Internal IP:        LAN net
  Destination:        Network, <IP range on Site 0> eg 10.1.1.0/24

Not the default gateway
^^^^^^^^^^^^^^^^^^^^^^^

If this system is not the default gateway for the site then you can use
an outbound NAT rule on LAN to ensure that replies from the clients
return via the OpenVPN tunnel. Without this, the systems at Sites 1-3
will reply via their default gateway because they will be unaware of the
Site 0 network. Another option is to put a suitable route on the site
gateway via the LAN address of the OpenVPN system but this will
introduce an asymmetric route and which will potentially break things
even more than the double NAT.

At Site 0
~~~~~~~~~

OpenVPN client
^^^^^^^^^^^^^^

Create a separate OpenVPN client for each remote subnet (Where examples
are given they are for Site 1 )::

  Server mode:            Peer to Peer (Shared key)
  Server host or address: <ip.add.re.ss of the other end>
  Description:            <NAME mapping_subnet link_subnet> eg Site 1 10.254.100.0/30 10.10.1.0/24
  Shared Key:             <Copy from the server for the site link>
  IPv4 Tunnel Network:    <link subnet> eg 10.254.100.0/30
  IPv4 Remote networks:   <mapping network> eg 10.10.1.0/24

Notes
-----

- SIP and RTP for example will be tricky
- DNS will also not work very well under this scheme unless you create
  some form of translating DNS server, perhaps PowerDNS and its LUA
  module might be able to do this.
- Anything relying on DNS eg web links that don't use the passed host
  name but use the built in name
- Don't forget to put suitable firewall access rules on the various
  OpenVPN interfaces
