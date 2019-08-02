HAProxy package
===============

`HAProxy`_ is a free, very fast and reliable solution offering high
availability, load balancing, and proxying for TCP, HTTP and HTTPS-based
applications. It is particularly suited for web sites struggling under
very high loads while needing persistence or Layer7 processing. Supporting
tens of thousands of connections is clearly realistic with todays hardware.
Its mode of operation makes its integration into existing architectures very
easy and riskless, while still offering the possibility not to expose
fragile web servers to the Net.

For info about HAProxy 1.6 and 1.7 see:
https://github.com/PiBa-NL/pfsense-haproxy-package-doc/wiki

Package Variants
----------------

On recent pfSense® versions 2 haproxy packages are available:

* **HAProxy** package tracks the stable FreeBSD port currently using
  HAProxy 1.6.x.
* **HAProxy-devel** package uses haproxy-devel from FreeBSD ports and
  loosely tracks HAProxy 1.7dev new features in the pfSense package are
  also first included in the HAProxy-devel then later copied over the
  HAProxy package.

Recent Changes
--------------

See github log for recent changes:

-  https://github.com/pfsense/FreeBSD-ports/commits/devel/net/pfSense-pkg-haproxy
-  https://github.com/pfsense/FreeBSD-ports/commits/devel/net/pfSense-pkg-haproxy-devel

Older Releases:

-  version as of July 7, 2013: 1.4.24 pkg v 1.2
-  1.00 - A lot of changes and fixes:

   -  **Versioning changed** - The package will show the version as
      "1.4.18 pkg v 1.0" where the first version is the version of the
      HAProxy binary, and the second is the package version.
   -  HAProxy has been updated to 1.4.18, with separate compiled
      versions for 32 bit (i386) and 64 bit (amd64).
   -  **New Status Options** - In addition to *active* and *inactive*,
      the options *backup* and *disabled* are available as a status for
      servers. These options translate directly to the equivalent
      options in HAProxy.
   -  **Monitor URI is now Optional** - Having monitor URI as a required
      option prevented non-HTTP TCP frontends from operating properly.
   -  **XMLRPC Sync** - Fixed two problem that prevented configuration
      sync from working correctly.
   -  **New Stats Options** - Node name, node description, and
      auto-refresh are now available for the stats page.
   -  **New Load Balancing Options** - The *static-rr* and *leastconn*
      load balancing options offered by HAProxy are not available
      options when creating frontends.
   -  **Ports Text Box** - The ports box takes a comma separated list of
      ports but was limited to 10 characters. This has been raised to
      500.
   -  **Global Advanced Options** - Fixed a problem with the *Advanced
      Options* box on the globals tab that caused it to garble the text
      in both the HAProxy config and on display in the UI.
   -  **Default Tab** - The default tab has been changed to the global
      tab rather than the frontends tab. Makes it easier to see the
      generated config after saving.

-  0.29 - option to output the automatically generated haproxy.cfg on
   the global settings tab.
-  0.28 - nbproc is now a setting on the global settings tab (number of
   processes in haproxy manual speak). local0 is now appended to the ip
   address of the remote syslog server.
-  0.27 - open files limit increased, check inter now an option. http
   close and forward for now working correctly when unchecked
-  0.26 - haproxy application version bumped to HA-Proxy version 1.3.22
   2009/10/14
-  0.25 - advanced box now allows carriage returns to separate multiple
   options/directives
-  0.24 - Retries is no longer a required field
-  0.23 - Advanced box added which allows passing thru to the haproxy
   configuration file options or directives that are not supported by
   the GUI.
-  0.22 - httpclose is now an option
-  0.21 - forwardfor is now an option
-  0.19 - Remote logging feature added
-  0.18 - Ability to select multiple frontends added
-  0.16 - https mode added which will automatically adjust backend
   configuration
-  0.15 - Configuration synchronization added for CARP clusters
-  0.01 - Converted to a pfSense package

Known issues
------------

-  When editing a frontend, choose an **External Address** and the
   description refers to "the interface chosen above" but it isn't
   possible to choose an interface. The only options for the address are
   *Interface Address*, *Any*, and any defined VIPs. I assume that the
   interface it chooses normally is the WAN, but this should be
   clarified.
-  Selecting Cancel when editing a frontend or server seems to use
   browser back; that means if returning to the previous page from a
   POST, it will ask to resubmit the data, which is not desirable.
-  When changes are applied, it appears that everything was successful
   whether it is or not. If something caused an invalid HAProxy config
   to be generated, HAProxy will not be stopped nor will it be
   restarted. There is no error message to indicate that this is the
   case and the **Apply Changes** button will disappear.
-  Most time-based options appear to be optional and specify "default"
   amounts but are actually required (and shouldn't be).
-  Some unexpected behavior for those who are used to HAProxy
   configuration alone (see the differences section).

HAProxy has their own list of `known bugs by branch and by version`_.

.. seealso:: You can find a list of known issues with the HAProxy package
   on the `pfSense bug tracker`_.


Things that could be improved
-----------------------------

-  Configuration Sync should have X number of possible nodes, in the
   form of a list where additional nodes are added, rather than 3 static
   boxes.
-  An overhaul of the package to fully utilize HAProxy's capabilities.
   It would be difficult to simply add in tabs for the other sections
   due to internal naming. In the package, the "frontends" set up in the
   Frontends tab are referred to in the configuration as backends.
   Including full support for frontends, backends, and listen sections
   would make it possible to use a lot more advanced features even
   without direct GUI support for them (through the use of the advanced
   pass thru box).
-  HAProxy has options for soft-restarts, which are useful in a
   high-availability environment. Some changes would be needed to the
   way the **Apply Changes** button works, or maybe make it optional. It
   needs more research.
-  Make all time fields accept the same time units that HAProxy does for
   the particular field.

Differences between this package and HAProxy used directly
----------------------------------------------------------

HAProxy defines five main sections in its configuration.

- global
- defaults
- frontend
- backend
- listen

**global** defines options that process-wide and often OS-specific.

**defaults** sets default parameters for all other sections following
its declaration.

**frontend** describes a set of listening sockets accepting client
connections.

**backend** describes a set of servers to which the proxy will connect
to forward incoming connections.

**listen** defines a complete proxy with its frontend and backend parts
combined in one section. It is generally useful for TCP-only traffic.

In the pfSense package, tabs exist to define "frontends" and "servers"
but the resulting configuration is actually made up completely of listen
sections. This is okay for the most part, but it does prevent advanced
usages that need to refer to several backends and the like.

In HAProxy, a single server directive can be made with a blank port and
it will listen on all the ports of the frontend that it is assigned to.
The package's GUI implies that this will be the case by leaving the port
blank.

What actually gets generated instead is a single server directive for
each port that the frontend is listening on. This is an important
difference when the ports that are being listened on are not
interchangeable. Example:

Define a front end for SMTP connections listening on ports 25 and 465.
The server is listening on both of those ports, but 25 does not accept
SSL/TLS and 465 does. When someone connects to the proxy on port 25,
they should get connected to the server on port 25, and when they
connect on 465, they get connected to the server on port 465.

In a standard HAProxy configuration where the frontend is set to listen
on both ports and a single server directive is made with no port, it
will operate the expected way.

In pfSense software, two server directives will be generated; one for
each port. HAProxy will not send connections the expected way. It will
loadbalance between them, regardless of whether the frontend and
server ports match.

Therefore in pfSense software a separate frontend must be created for
this, as they are essentially different services. Listen on port 25 and
2525, and it doesn't matter whether someone connected on one port gets
directed to the other, then they can be combined.

Splitting the servers up by port also means that a separate entry will
exist for each one in the stats page, but the port will not be shown. In
an HAProxy configuration where a single server directive has no ports
and effectively handles multiple (due to inheriting from the frontend)
it will only show up in the stats once.

Package Support
---------------

This package is currently supported by |support_link| to those with an active
support subscription.

.. _HAProxy: http://www.haproxy.org
.. _known bugs by branch and by version: http://www.haproxy.org/bugs/index.html
.. _pfSense bug tracker: https://redmine.pfsense.org/projects/pfsense-packages/issues?utf8=%E2%9C%93&set_filter=1&sort=id%3Adesc&f%5B%5D=status_id&op%5Bstatus_id%5D=o&f%5B%5D=category_id&op%5Bcategory_id%5D=%3D&v%5Bcategory_id%5D%5B%5D=104&f%5B%5D=&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=assigned_to&c%5B%5D=updated_on&group_by=&t%5B%5D=
