Captive Portal
==============

The **Captive Portal** function in pfSense® software allows securing a
network by requiring a username and password (or only a click through),
entered on a portal page.

If authentication is used, this can be performed using the pfSense
built-in user management, or an external authentication server such as a
RADIUS server.

The best source of captive portal information can be found in the |book_link|.

Captive Portal is configured from **Services > Captive Portal**.

There are several tabs available for the captive portal setup, each
described below:

Zones
-----

Captive Portal **Zones** allow for the creation of separate, independent
portals that operate on one or more separate interfaces. For example,
there could be a zone for Wireless and a zone for Wired. Each zone has a
completely isolated set of pages, configuration, users, etc.

One zone may by used by multiple interfaces, but only one zone may be
used per interface.

Captive Portal Tab
------------------

General management of captive portal setup and authentication. Each
option is described in detail on the page

Pass-Through MAC Tab
--------------------

Allows managing a list of MAC
addresses which are allowed to bypass the portal.

When specified by MAC address in this way, the client's IP address may
change and they will still be allowed through. However, the client will
still be disconnected after the captive portal timeout period has
elapsed.

Allowed IP addresses
--------------------

Allows managing a list of IP
addresses which can either:

-  Always connect **from** behind the portal (clients)
-  Always allow clients **to** an IP address (external servers)

These IP addresses will bypass the portal authentication in the
direction specified.

Vouchers
--------

One-time use portal access codes, described in more detail in:
:doc:`Captive Portal Vouchers </captiveportal/captive-portal-vouchers>`.

File Manager
------------

Allows management of the files
which can be used to make up the contents of the captive portal
authentication/click-through page.

