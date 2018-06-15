.. include:: /substitutions.rsti

Configuring the DHCP Server
===========================

The DHCP server in pfSense will hand out addresses to DHCP clients and
automatically configure them for network access. By default, the DHCP
server is enabled on the LAN interface.

The DHCP server page, found under **Services > DHCP Server**, has a tab
for each available interface. The DHCP daemon can only run on interfaces
with a Static IP address, so if a tab for an interface is not present,
check that it is enabled and set with a Static IP.

The DHCP server cannot be active on any interface if the :doc:`DHCP Relay
</dhcp/dhcp-relay>` service is in use.

DHCP Instance Options
---------------------

For each Interface, there are many options to choose from. At a minumum,
the **Enable** box must be checked on the interface tab and an address
range (starting and ending IP addresses) to use for DHCP clients must be
defined.

The other settings may be configured, but are optional. Each option is
explained in more detail on the page and also in the |book_link|.

See the :doc:`DNS Forwarder </dns/dns-forwarder>` article for information on the
default DNS server behavior.

Some other options which may be set for clients include TFTP server,
LDAP URI, and the ability to add in any custom DHCP option number and
value.

Static IP Mappings
------------------

Static IP mappings can be added at the bottom of the DHCP server tab for
a given interface.

To add a Static IP mapping, click |fa-plus|, and then enter a MAC address, IP
address, Hostname, and Description. These mappings can also be created
from the :doc:`DHCP Leases </dhcp/dhcp-leases>` view. There are many other
per-host options which can be sent as well.

Deny Unknown Clients / Static ARP
---------------------------------

Using the "Deny unknown clients" option, DHCP access can be prevented
for any client which is not listed in the list at the bottom of the
page. Similarly, Static ARP may also be enabled to further restrict
access so that only those clients listed can talk to the pfSense router.

To create entries for Client access/Static ARP, click |fa-plus| at the bottom
of the page just like adding a Static IP mapping. Enter a MAC address,
hostname and description. The IP address field may be left blank to have
the client pull its address from a pool. As with the Static IP mappings,
these can also be created from the :doc:`DHCP Leases </dhcp/dhcp-leases>` view.

Multiple Address Pools
----------------------

Multiple pools of addresses can be created within the same larger
subnet. This can be used, for example, so that non-contiguous blocks of
addresses can be used. It can also be used to map certain clients into
specific known address space.

MAC Address Control
-------------------

The allow and deny options for MAC addresses permits fine-grained
control over which clients can and cannot obtain addresses from a
specific pool. Multiple entries may be added by separating them with a
comma.

Partial MAC addresses may be entered and they are treated as a prefix.
This is useful for creating a pool to be used by specific brands of
gear, such as a group of IP phones or game consoles.

Listing a MAC address in the deny list will prevent it from obtaining an
IP address from a given pool, all others are permitted

Listing a MAC address in the allow list will permit a client to use this
pool AND it will prevent any other MAC address not in this allow list
from using the pool. This does NOT prevent the specified MAC address
from using other pools, it must also be denied there.

Numbered Options Notes
----------------------

When using numbered custom options, be careful of the type. Some will be
OK on text/string but others are not.

For example, DHCP options for code 132 (and presumably 133) for vlan ID
should be set for a type of unsigned integer 32.

For more information on DHCP option numbers and types, see
http://www.iana.org/assignments/bootp-dhcp-parameters/bootp-dhcp-parameters.xhtml#options
and https://www.freebsd.org/cgi/man.cgi?query=dhcp-options&sektion=5
