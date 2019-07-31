Should I use a pfSense appliance as my access point
===================================================

Historically, the access point functionality in FreeBSD has suffered
from serious compatibility or performance problems with some wireless
clients. Over time this has improved significantly. pfSense® access
points are used in various locations with no trouble. It is used with
various clients such as MacBook Pro, Apple AirTunes, Mac mini, iPod
Touch, Adroid devices, Palm, various Windows laptops, Xbox 360, and
FreeBSD clients and it works very reliably.

There is the possibility of finding incompatible devices with any access
point. FreeBSD is no exception and it can be more common with FreeBSD
than other access points. Using a pfSense device an access point can
work quite well with the right card and configuration.

In general, we still recommend
:doc:`/wireless/use-an-existing-wireless-router-with-pfsense`,
especially if 802.11n or 802.11ac are required. Placing that burden
on an external device and allowing pfSense software to focus on the
firewall/routing/NAT/etc can be simpler in the long run. An access point
may still be connected to a dedicated interface or VLAN for isolation
purposes.

Incompatible wireless clients
-----------------------------

There are no known incompatible devices at this time.
