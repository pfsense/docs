.. include:: /substitutions.rsti

Configuring Dynamic DNS
=======================

Dynamic DNS (DynDNS), found under **Services > Dynamic DNS**, will
update an external provider with the current public IP address on the
firewall. This keeps a constant DNS hostname, even if the IP address
changes periodically. Whenever an interface changes in some way, DHCP
lease renew, PPPoE logout/login, etc, the IP will be updated.

pfSense supports more than 15 different DynDNS providers. In addition to the
normal public services, pfSense also supports RFC 2136 DNS updates to DNS
servers.

In currently supported versions of pfSense, the DynDNS client supports
using multiple DynDNS and RFC 2136 clients. These can be used to update
multiple services on the same interface, or multiple interfaces.

There are two tabs under Dynamic DNS, one for DynDNS providers, and one
for RFC 2136 servers. Each tab has a list of currently configured
clients, which reflects not only their configuration but also their
status. Additional clients can be managed from these lists.

When editing a DynDNS client, first pick a DynDNS service provider, then
choose Interface with the IP address to update. Enter a hostname,
username, password, and description. Optionally, an MX record and
wildcard support may be enabled depending on the provider.

When editing an RFC 2136 client, first pick the interface with the IP to
update, enter a hostname, Time To Live (TTL) for the DNS record, Key
name (which must match the setting on the server), Key type of Host,
Zone, or User, an HMAC-MD5 key, the DNS server IP address, and a
description. TCP transactions may optionally be used instead of UDP.

Free Supported Services
-----------------------

Most of these services offer paid services as well that come with additional
benefits.

City Network
~~~~~~~~~~~~

Cloudflare
~~~~~~~~~~

DNSexit
~~~~~~~

DNS-O-Matic
~~~~~~~~~~~

`DNS-O-Matic <https://www.dnsomatic.com/>`__ is a service offered by
`OpenDNS <http://www.opendns.com>`__ to update multiple Dynamic DNS
accounts using only one Dynamic DNS configuration on the firewall. It
supports many dynamic DNS services including 2MyDNS, afraid.org,
ChangeIP, CJB, DLinkDDNS, DNS Made Easy, DNS Park, DNSexit, DSL Reports
Monitor, DtDNS, DynDNS, DynIP, dynsip.org, dynu, easyDNS, eeditDNS,
eNom, EveryDNS, NameCheap, No-IP, ODS.org, OpenDNS, regfish, Security
Space, Sitelutions, TZO, WorldWideDNS.net, xname, Yi.org, and ZoneEdit.
If a service is required that is not supported natively by pfSense,
DNS-O-Matic gives the ability to update these hostnames from pfSense.

Euro DNS
~~~~~~~~

freeDNS
~~~~~~~

`afraid.org freeDNS <http://freedns.afraid.org/>`__

FreeMyIP
~~~~~~~~

`FreeMyIP <https://freemyip.com>`__ is a free dynamic DNS service for
privacy-minded users. It doesn't require your email address nor any
other private information, and it doesn't record IP address changes
history. It provides comprehensive `Help
page <https://freemyip.com/help.py>`__ with configurations for many
types of network appliances, and it is under `active
development <https://freemyip.com/whatsnew.py>`__.

GratisDNS
~~~~~~~~~

HE.net
~~~~~~

There are three options for Hurricane Electric. The "HE.net" option
updates the IPv4 IP with their `DNS service <https://dns.he.net>`__.
"HE.net (v6)" does the same, except for IPv6. "HE.net Tunnelbroker"
updates the tunnel endpoint IPv4 IP for their `IPv6 tunnel broker
service tunnelbroker.net <https://tunnelbroker.net>`__.

Loopia
~~~~~~

Namecheap
~~~~~~~~~

.. note:: To update an @ record, use @.yourdomain.com for the hostname.*

No-IP
~~~~~

ODS.org
~~~~~~~

OpenDNS
~~~~~~~

Amazon Route 53
~~~~~~~~~~~~~~~

SelfHost
~~~~~~~~

ZoneEdit
~~~~~~~~

Custom
~~~~~~

Custom allows defining a custom URL to use for updates.

Paid Supported Services
-----------------------

The services listed here require payment of some sort to use the
service. Some are a one time small donation, others require a monthly
charge.

DHS
~~~

`DHS <http://www.dhs.org>`__ offers dynamic DNS services for an initial
$5 USD contribution for one hostname, plus $5 USD for each additional
two hostnames.

DNS Made Easy
~~~~~~~~~~~~~

`DNS Made Easy <http://www.dnsmadeeasy.com/integration/dynamicdns/>`__
is a DNS hosting provider that also allows dynamic DNS services.

.. note:: Seems there might be an issue using complex passwords, testing
   shows that letters and numbers only works without problems

   1. Use a "simple" password (alphanumeric), using the 15-byte maximum (for DNS Made Easy) to make things as secure as possible,
   2. You do not need a "business" account on DNS Made Easy; any account at all works fine,
   3. Enter the DNS ID for both the hostname and the username in the pfSense software.

DynDNS
~~~~~~

`DynDNS <http://www.dyndns.com/>`__ is a dynamic DNS provider offering
service on numerous domains, as well as premium services for those
needing more than basic dynamic DNS functionality. They discontinued
their free offering in May 2014.

DyNS
~~~~

`DyNS <http://www.dyns.cx/>`__ offers dynamic DNS service for a minimum
initial donation of 5 Euros.

easyDNS
~~~~~~~

`easyDNS <http://www.easydns.com>`__ offers dynamic DNS services for
registered domains. Domains registered with easyDNS are required to use
this service, and they charge for the service.

RFC 2136
--------

RFC 2136 is a way to securely update host or zone records in a name
server using a DNS query directly, rather than a web-based update system
that many others use.

RFC 2136 updates are also supported if access to a DNS server enabled
for RFC2136 is available. To configure a DNS server for RFC 2136 server,
see: :doc:`RFC2136 Dynamic DNS </dns/rfc2136-dynamic-dns>`.

RFC 2136 also supports IPv6 updates, which other web-based providers may
not yet support.
