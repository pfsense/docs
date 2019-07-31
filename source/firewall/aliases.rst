Using Aliases to Simplify Firewall Rules
========================================

What are Aliases?
-----------------

From the pfSense® webGUI: Aliases act as placeholders for real hosts,
networks or ports. They can be used to minimize the number of changes
that have to be made if a host, network or port changes. The name of an
alias can be entered instead of the IP address, network or port in all
fields that have a red background. The alias will be resolved according
to the list [on the Aliases page of the WebGUI]. If an alias cannot be
resolved (e.g. because it has been deleted), the corresponding element
(e.g. filter/NAT/shaper rule) will be considered invalid and skipped.

Why would I want to use Aliases?
--------------------------------

The best example is for blocking a list of hosts considered "bad". If a
rule were added for each host to block individually, the rules list
would grow quite large. By adding all of these hosts to an alias, only
one firewall rule is necessary.

Examples
--------

Say there are three web servers in a DMZ, and HTTP, HTTPS, and FTP
traffic should be allowed to these servers. It can be accomplished with
a single firewall rule and two aliases.

-  Create an alias called *WebServers* and add to it the IPs of the
   three web servers.
-  Create an alias called *WebServerPorts* add add to it ports *21*,
   *80*, and *443*.
-  Create a firewall rule and for the destination, choose *Single Host
   or Alias*, then click in the field and type *WebServers*. It will
   autocomplete, and then click to select it. For the destination port,
   click in the box and type *WebServerPorts*.
-  Click **Save**

Now there is a single firewall rule that would have otherwise taken 9
separate rules to accomplish!

Aliases and Hostnames
---------------------

For Host and Network type aliases, a fully qualified domain name (FQDN)
may be entered instead of an IP address. The FQDN will be resolved by
DNS every 5 minutes (300 seconds) and updated internally. This can be
useful for tracking dynamic DNS entries to identify sites or users that
are unable to use a static IP.

The interval at which the resolution takes place may be adjusted under
**System > Advanced** on the **Firewall / NAT** tab. Enter a new value
in the **Aliases Hostnames Resolve Interval** field. Bear in mind that a
lower interval will put a higher burden on the DNS server(s). With many
hosts to resolve, the default is best. With only a few hosts, a lower
value may be used such as *30* seconds.

URL Table Aliases
-----------------

A URL table alias is a URL that points to a plain text file containing
IP and/or CIDR masked network addresses. The URL will be periodically
downloaded and refreshed. The contents of the file would look like so::

  192.0.2.0/24
  172.22.59.49
  192.168.0.128/26

URL Alias
---------

Similar to a URL table in that the file format is the same. However, the
content is only requested once and is immediately turned into a
traditional alias.

Bulk Import
-----------

On the main alias screen, click |fa-upload| **Import** and the **Bulk Import**
screen will be presented. A large text area on this page is used for IP address
or CIDR entries. They may be entered/pasted here, one per line, to create a
large alias quickly.
