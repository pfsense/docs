.. include:: /substitutions.rsti

Interface Settings
==================

The interface settings screen will differ based on the type of interface
being dealt with. In pfSense the real distinction between "WAN", "LAN"
and "OPT" interfaces is blurred as they are all capable of handling any
role. For historical and ease-of-use purposes, the first two interfaces
are WAN and LAN. Additional interfaces start at OPT1 and are numbered
from there (OPT2, OPT3, ... OPTn)

Interfaces can have their descriptive names changed, MAC address
spoofed, and MTU adjusted. Any interface can be set for Static IP, DHCP,
PPPoE, PPP, PPTP, or L2TP. The latter two are for ISP connections
involving PPTP and L2TP directly. They are not intended to connect to
remote VPNs.

Static IP
---------

For Static IP interfaces, the IP address and CIDR mask are manually
entered.

If this will be a WAN-type interface, either select a gateway from the
list or click **add a new one** to create a new gateway.

When creating a gateway, optionally check the box to select it as a
**Default Gateway**, enter a **Name**, **Gateway IP** address, and a
**Description**.

DHCP
----

For DHCP interfaces, a **DHCP hostname** may be entered, and also
optionally add an **Alias IP address** and subnet mask.

PPPoE/PPTP
----------

PPPoE and PPTP interfaces take a username and password, and optionally a
service name, dial-on-demand setting, idle timeout, and optional
periodic reset (PPPoE only).

Private Networks
----------------

All interfaces have the ability to use the **Block Private Addresses**
and **Block Bogon Networks** options. These will block RFC 1918, RFC
4193, and unassigned networks, respectively.

Take care when activating this option. Never activate it on an interface
with an address in RFC 1918 or RFC 4193 that should allow inbound
traffic to the GUI or beyond, such as the interface from which the GUI
is managed, or through which local clients would reach the Internet.

Wireless
--------

Wireless network interfaces also have several other options available,
such as the SSID and encryption type (WPA, WPA2, etc).

Most wireless interfaces can operate in Access Point mode and allow
clients to connect, but a few are limited to being used in
Infrastructure mode, such as connecting to a wireless WAN or other local
access point. See the articles in the :doc:`/wireless/index` section for more information.

MAC Spoofing
------------

The MAC address field changes the MAC address used by the network card.
This is usually only needed when replacing an existing device and the
ARP table of connected devices cannot be controlled or easily changed.

In some cases, spoofing the MAC may require running the NIC in
promiscuous mode. This is uncommon and is isolated to cases with certain
network card chipsets, and certain cases when spoofing the MAC on VLAN
interfaces.

In these cases, one option is to install the :doc:`shellcmd package </development/executing-commands-at-boot-time>`
or add a command manually to run a command such as::

  /sbin/ifconfig em0 promisc
