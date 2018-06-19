.. include:: /substitutions.rsti

*************
Cache / Proxy
*************

Proxies are intermediaries that sit between clients and servers. A client
connects to a proxy, and then the proxy decides if the client can receive
content from a server. If so, the proxy makes its own connection to the server
and then passes back data to the client.

There are two major types of proxies:

:Forward Proxy: Typically sits between local clients and remote Internet
  servers. It can be used to control which web sites that clients are allowed
  to load, or log servers and URLs clients are visiting. These mostly work with
  HTTP, but in special cases can also work with HTTPS.
:Reverse Proxy: Typically sits between remote clients and local servers. These
  allow for load balancing, failover, or other intelligent connection routing
  for public services such as web servers.

Squid
'''''

Squid is primarily a forward proxy used for client access control. It can,
however, be used in a reverse proxy role if needed. The reverse proxy
capabilities are inferior to HAProxy, however.

.. toctree::
   :maxdepth: 1

   setup-squid-as-a-transparent-proxy
   squid-package-tuning
   squid-troubleshooting
   squidguard-package
   troubleshooting-squid-package-disk-usage
   using-squid-with-freeradius
   wpad-autoconfigure-for-squid

HAProxy
'''''''

HAProxy is a powerful reverse proxy that can handle many different types of
tasks and scales well for large deployments.

.. toctree::
   :maxdepth: 1

   /packages/haproxy-package
   /packages/troubleshooting-the-haproxy-package
