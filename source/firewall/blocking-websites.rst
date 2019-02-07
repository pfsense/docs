Blocking Access to Websites
===========================

There are several options for blocking websites with pfSense, some of
which are described on this article.

Using DNS
---------

If the built in :doc:`DNS Forwarder </dns/dns-forwarder>` or
:doc:`DNS Resolver </dns/unbound-dns-resolver>` are in use, an override can be
configured which will resolve the website to block to an invalid IP
address (such as 127.0.0.1).

Using Firewall Rules
--------------------

If a website rarely changes IP addresses, access to it can be blocked
using firewall rules. This is not a feasible solution for sites that
return low TTLs and spread the load across many servers and/or
datacenters, such as Google and similar very large sites. Most small to
mid sized websites can be effectively blocked using this method as they
rarely change IP addresses.

A hostname may be entered in a network alias, and then that alias may be
applied to a block rule. Note the hostname will only be resolved every 5
minutes, but that may be changed under **System > Advanced** on the
**Firewall/NAT** tab (**Aliases Hostnames Resolve Interval**).

Another option is finding all of a site's IP blocks, creating an alias
with those networks, and blocking traffic to those destinations. This is
especially useful with sites such as Facebook that spread large amounts
of IP space, but are constrained within a few net blocks.

Blocking Facebook
~~~~~~~~~~~~~~~~~

To find the most current list of Facebook subnets, query a server to
find subnets for their AS and make an alias from there::

  whois -h whois.radb.net -- '-i origin AS32934' | awk '/^route:/ {print $2;}' | sort | uniq

Once the list of netblocks is in hand, create an alias containing that
data and then use it in Firewall rules to control direct access to
Facebook.

Note that this doesn't account for using proxies or other anonymizing
services that would allow users to access Facebook indirectly. (See
below)

Using Squidguard
----------------

The :doc:`SquidGuard package </cache-proxy/squidguard-package>` can be configured to
block sites.

Prevent Bypassing of Blocking
-----------------------------

With any of the above methods, there are still many ways to get around
the defined blocks. The easiest and likely most prevalent is using any
number of proxy websites. Finding and blocking all of these individually
and keeping the list up to date is impossible. The best way to ensure
these sites are not accessible is using content filtering capable of
blocking by category.

