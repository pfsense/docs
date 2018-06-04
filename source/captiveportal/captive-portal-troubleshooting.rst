.. include:: /substitutions.rsti

Troubleshooting Captive Portal
==============================

The best source of captive portal troubleshooting information can be
found in the `pfSense book <http://pfsense.org/book>`__.

Captive portal not redirecting
------------------------------

If clients are not being redirected to the portal page when attempting
to browse on an interface with captive portal enabled, it's most always
one of the following causes.

#. DNS resolution not functioning - the clients on the captive portal
   interface must either be using the DNS forwarder on pfSense, on the
   IP of the interface where the client resides (which is the default
   configuration), or if using some other IP for DNS, it must be an
   allowed IP entry. If DNS fails, the browser never issues the HTTP
   request, hence it cannot be intercepted and redirected.
#. Firewall rules on the captive portal interface do not allow the
   initial HTTP request - if the user is trying to browse to google.com,
   but HTTP connections are not allowed to google.com, the HTTP request
   will be blocked and hence cannot be redirected. Under Firewall >
   Rules, on the interface where captive portal is enabled, the traffic
   to be redirected must be allowed to pass. This is most commonly HTTP
   to any destination.
#. The client has an HTTPS home page - The request must be to an HTTP
   site in order for the portal to redirect the client.

500 Server Errors with Captive Portal + RADIUS
----------------------------------------------

As suggested in `this forum
thread <http://forum.pfsense.org/index.php/topic,14417.0.html>`__, the
problem is likely due to the RADIUS server not responding. It may not be
running, or it may be overloaded.

Check main system log and the contents of /var/log/lighttpd.error.log
just after receiving the error for more clues.

Zones
-----

In pfSense 2.1 and later, the firewall can have multiple captive portal
zones.

The method for isolating these zones has changed several times since the
feature was added, but currently Captive Portal employs stock ipfw rules
and tables without the need for special patches or changes for contexts
or instances.

Captive Portal Rule Generation
------------------------------

To see the ipfw rules, which includes rules for Captive Portal in
general as well as zone specific tables, run:

`` ipfw show``

IPFW tables
-----------

Show all tables

`` ipfw table all list``

The \_auth\_up table holds authenticated/allowed clients for a zone.
This table allow traffic from clients to enter the interface. For
example, a zone called “myzone” would contain this table:

`` ipfw table myzone_auth_up list``

The \_auth\_down table holds authenticated/allowed clients for a zone.
This table allow traffic from clients to enter the interface. For
example, a zone called “myzone” would contain this table:

`` ipfw table myzone_auth_down list``

See captiveportal.inc for a look at what the other tables are used for,
these include tables for host/MAC bypass entries and other necessary
controls.

Pipe/flowset Errors
-------------------

If an error such as the following appears:

``need a pipe/flowset/sche number Warning: Cannot modify header information - headers already sent by (output started at /etc/inc/captiveportal.inc:1928) in /etc/inc/captiveportal.inc on line 1686``

The pipe allocation file, /var/db/captiveportaldn.rules, may have become
corrupt or otherwise broken. Remove that file and restart Captive
Portal.

Sysctl Options
--------------

Some Sysctl options can cause problems with the Captive Portal. Sysctl
options can be set via the System -> Advanced -> System Tunables tab.

net.inet.ip.fastforwarding
~~~~~~~~~~~~~~~~~~~~~~~~~~

If fastforwarding is enabled ( set to 1) it can cause problems with the
initial redirection to the captive portal login page. Set it to “0” to
disable this option.

