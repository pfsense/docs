.. include:: /substitutions.rsti

Online Gaming with pfSense
==========================

This page provides information on using pfSense with online games.

First, many games will require the use of :doc:`Static Port </nat/static-port>`
or :doc:`UPnP/NAT-PMP </services/configuring-upnp-and-nat-pmp>`.

The `forum <https://forum.pfsense.org>`__ often has a wide array of
threads for specific games and consoles. Search there for games if they
are not listed here.

Specific Game/Console Information
---------------------------------

Recommendations for specific games can be found below. If any special handling
is required but not listed here, please |doc_updates|. Include a link to
manufacturer's documentation when possible.

NB: What works to make a single console/device work from behind a
firewall may not work for multiple consoles/devices behind the same
firewall.

Nintendo Wii/Wii U/3DS
^^^^^^^^^^^^^^^^^^^^^^

No special configuration is typically required, though some cases may
need
`UPnP <http://en-americas-support.nintendo.com/app/answers/detail/a_id/13216/~/nat-related-troubleshooting-on-wii-u>`__
to work. See :doc:`What are UPnP and NAT-PMP </services/configuring-upnp-and-nat-pmp>`.

Steam
^^^^^

Varies by game, but typically
:doc:`UPnP/NAT-PMP </services/configuring-upnp-and-nat-pmp>` or manual port forwards are
enough to make it work. Some may require :doc:`Static Port </nat/static-port>`.

Gunz Online
^^^^^^^^^^^

To use multiple machines behind pfSense to play, configure each Gunz
Online machine with a different port. Visit **NAT > Outbound** and setup
a custom port entry for each machine using the appropriate custom port.

