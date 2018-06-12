.. include:: /substitutions.rsti

DNS Rebinding Protections
=========================

pfSense includes some built in methods of protection against `DNS
rebinding attacks <http://en.wikipedia.org/wiki/DNS_rebinding>`__. These
measures are described below.

DNS forwarder
-------------

The DNS forwarder (dnsmasq) uses the option --stop-dns-rebind by
default, which rejects and logs addresses from upstream nameservers
which are in the private IP ranges. In the most common usage, this is
filtering DNS responses received from the Internet to prevent DNS
rebinding attacks. Internet DNS responses should never come back with a
private IP, hence it's safest to block this.

There are some cases when public DNS servers have private IP address
replies by default, though it is not recommended. In those cases, DNS
rebinding can be disabled or an override may be placed in the DNS
Forwarder Advanced Settings box as follows::

  rebind-domain-ok=/mydomain.com/

Note this is automatically overridden for domains in the DNS forwarder's
domain override list, as the most common usage of that functionality is
to resolve internal DNS hostnames.

DNS Resolver (Unbound)
----------------------

Unbound has similar protections to dnsmasq, using its "Private Address
support" option. With that option enabled RFC1918 addresses are stripped
away from DNS answers. Additionally, the DNSSEC validator may mark the
answers bogus.

In the package on 2.1 and earlier this option is located in the main
"Unbound DNS Settings" tab. On 2.2 where Unbound is integrated into the
base system, it is active by default and controlled by the DNS Rebinding
option under System > Advanced.

Individual domains can be excluded from DNS rebinding protection using
the Custom Options on the Unbound general settings. Enter one domain per
line in the following format, preceded by the "server:" line.

.. code::

  server:``
  private-domain: "example.com"

Web interface protection
------------------------

For those not using the DNS forwarder, and as an additional layer of
checks, the web interface will block attempts to access it via an
unknown hostname. It will display "Potential DNS Rebind Attack Detected"
and drop any request. By default, only the hostname and domain
configured under System>General Setup are accepted. For instance if
firewall.example.com is configured as the system's hostname, and it is
loaded in a browser using fw1.example.com, that attempt will be
rejected. Additional hostnames can be added under System>Advanced,
"Alternate Hostnames".

Logging in using the IP address of the system rather than the hostname
does work if this message is encountered when attempting to load by
hostname. Once access has been obtained, configure the hostname(s)
accordingly and then it is possible to log in using the desired
hostname.

If this message is encountered when a client attempted to access a
forwarded service (Port forward, 1:1 NAT, relayd, etc) it indicates that
the request did not match any NAT rules. From the inside of the network,
this would require NAT reflection or split DNS to accomplish. See `Why
can't I access forwarded ports on my WAN IP from my LAN/OPTx
networks <Why_can't_I_access_forwarded_ports_on_my_WAN_IP_from_my_LAN/OPTx_networks>`__
for more details.
