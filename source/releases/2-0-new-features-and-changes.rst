.. include:: /substitutions.rsti

2.0 New Features and Changes
============================

This is a partial list of the new features and major changes in the
pfSense 2.0 release.

Operating System
~~~~~~~~~~~~~~~~

-  Based on FreeBSD 8.1 release.
-  i386 and amd64 variants for all install types (full install,
   nanobsd/embedded, etc.)
-  USB memstick installer images available

Interfaces
~~~~~~~~~~

-  GRE tunnels
-  GIF tunnels
-  3G support
-  Dial up modem support
-  Multi-Link PPP (MLPPP) for bonding PPP connections (ISP/upstream must
   also support MLPPP)
-  :doc:`LAGG Interfaces </interfaces/lagg-interfaces>`
-  Interface groups
-  IP Alias type Virtual IPs
-  IP Alias VIPs can be stacked on CARP VIPs to go beyond the 255 VHID
   limit in deployments that need very large numbers of CARP VIPs.
-  QinQ VLANs
-  Can use Block Private Networks / Block Bogon Networks on any
   interface
-  All interfaces are optional except WAN
-  All interfaces can be renamed, even LAN/WAN
-  Bridging enhancements - can now control all options of if\_bridge,
   and assign bridge interfaces

Gateways/Multi-WAN
~~~~~~~~~~~~~~~~~~

-  Gateways, including dynamic gateways, are specified under System >
   Routing
-  Gateways can have custom monitor IPs
-  Gateways can have a custom weight, allowing load balancing to have
   ratios between WANs of different speeds
-  Gateways can have custom latency, loss, and downtime trigger levels.
-  Gateway monitoring via icmp is now configurable.
-  Multiple gateways may exist per interface
-  Multi-WAN is now handled via gateway groups
-  Gateway groups can include multiple tiers with any number of gateways
   on each, for complex failover and load balancing scenarios.

General Web GUI
~~~~~~~~~~~~~~~

-  Set to HTTPS by default, HTTP redirects to HTTPS port
-  Dashboard and widgets added
-  System > Advanced screen split into multiple tabs, more options
   available.
-  SMTP email alerts and growl alerts
-  New default theme - pfsense\_ng
-  Some community-contributed themes added
-  Contextual help available on every page in the web interface, linking
   to a webpage containing help and documentation specific to that page.
-  Help menu for quick access to online resources (forum, docs, paid
   support, etc.)

Aliases
~~~~~~~

-  Aliases may be nested (aliases in aliases)
-  Alias autocomplete is no longer case sensitive
-  IP Ranges in Aliases
-  More Alias entries supported
-  Bulk Alias importing
-  URL Aliases
-  URL Table Aliases - uses a pf persist table for large (40,000+) entry
   lists

Firewall
~~~~~~~~

-  Traffic shaper rewritten - now handles any combination of multi-WAN
   and multi-LAN interfaces. New wizards added.
-  Layer7 protocol filtering
-  :doc:`EasyRule - add firewall rules from log view (and from console!) </firewall/adding-rules-with-easyrule>`
-  Floating rules allow adding non-interface specific rules
-  Dynamically sized state table based on amount of RAM in the system
-  More Advanced firewall rule options
-  FTP helper now in kernel
-  TFTP proxy
-  Schedule rules are handled in pf, so they can use all the rule
   options.
-  State summary view, report shows states grouped by originating IP,
   destination IP, etc.

NAT
~~~

-  All of the NAT screens were updated with additional functionality
-  Port forwards can now handle create/update associated firewall rules
   automatically, instead of just creating unrelated entries.
-  Port forwards can optionally use “rdr pass” so no firewall rule is
   needed.
-  Port forwards can be disabled
-  Port forwards can be negated (“no rdr”)
-  Port forwards can have source and destination filters
-  NAT reflection improvements, including NAT reflection for 1:1 NAT
-  Per-entry NAT reflection overrides
-  1:1 NAT rules can specify a source and destination address
-  1:1 NAT page redesigned
-  Outbound NAT can now translate to an address pool (Subnet of IPs or
   an alias of IPs) of multiple external addresses
-  Outbound NAT rules can be specified by protocol
-  Outbound NAT rules can use aliases
-  Improved generation of outbound NAT rules when switching from
   automatic to manual.

IPsec
~~~~~

-  Multiple IPsec p2's per p1 (multiple subnets)
-  IPsec xauth support
-  IPsec transport mode added
-  IPsec NAT-T
-  Option to push settings such as IP, DNS, etc, to mobile IPsec clients
   (mod\_cfg)
-  Mobile IPsec works with iOS and Android (Certain versions, see :doc:`IPsec Road Warrior/Mobile Client How-To </vpn/ipsec/configuring-an-ipsec-remote-access-mobile-vpn-using-ikev1-xauth>`)
-  More Phase 1/2 options can be configured, including the cipher
   type/strength
-  ipsec-tools version 0.8

User Manager
~~~~~~~~~~~~

-  New user manager, centralizing the various user configuration screens
   previously available.
-  Per-page user access permissions for administrative users
-  Three built-in authentication types - local users, LDAP and RADIUS.
-  Authentication diagnostics page

Certificate Manager
~~~~~~~~~~~~~~~~~~~

-  Certificate manager added, for handling of IPsec, web interface,
   user, and OpenVPN certificates.
-  Handles creation/import of Certificate Authorities, Certificates,
   Certificate Revocation lists.
-  Eliminates the need for using command line tools such as EasyRSA for
   managing certificates.

OpenVPN
~~~~~~~

-  OpenVPN wizard guides through making a CA/Cert and OpenVPN server,
   sets up firewall rules, and so on. Greatly simplifies the process of
   creating a remote access OpenVPN server.
-  OpenVPN filtering - an OpenVPN rules tab is available, so OpenVPN
   interfaces don't have to be assigned to perform filtering.
-  OpenVPN client export package - provides a bundled Windows installer
   with certificates, Viscosity export, and export of a zip file
   containing the user's certificate and configuration files.
-  OpenVPN status page with connected client list -- can also kill
   client connections
-  User authentication and certificate management
-  RADIUS and LDAP authentication support

Captive Portal
~~~~~~~~~~~~~~

-  Voucher support added
-  Multi-interface capable
-  Pass-through MAC bandwidth restrictions
-  Custom logout page contents can be uploaded
-  Allowed IP addresses bandwidth restrictions
-  Allowed IP addresses supports IP subnets
-  “Both” direction added to Allowed IP addresses
-  Pass-through MAC Auto Entry - upon successful authentication, a
   pass-through MAC entry can be automatically added.
-  Ability to configure calling station RADIUS attributes

Wireless
~~~~~~~~

-  Virtual AP (VAP) support added
-  `more wireless cards supported with the FreeBSD 8.1 base <https://docs.google.com/spreadsheet/ccc?key=0AojFUXcbH0ROdHgwYkFHbkRUdV9hVWljVWl5SXkxbFE&hl=en_US>`__

Server Load Balancing
~~~~~~~~~~~~~~~~~~~~~

-  relayd and its more advanced capabilities replace slbd.

Other
~~~~~

-  L2TP VPN added
-  DNS lookup page added
-  PFTop and Top in GUI - realtime updates
-  Config History now includes a diff feature
-  Config History has download buttons for prior versions
-  Config History has mouseover descriptions
-  CLI filter log parser (/usr/local/bin/filterparser)
-  Switched to PHP 5.2.x
-  IGMP proxy added
-  Multiple Dynamic DNS account support, including full multi-WAN
   support and multi-accounts on each interface.

   -  DynDNS Account Types supported are:

      -  DNS-O-Matic
      -  DynDNS (dynamic)
      -  DynDNS (static)
      -  DynDNS (custom)
      -  DHS
      -  DyNS
      -  easyDNS
      -  No-IP
      -  ODS.org
      -  ZoneEdit
      -  Loopia
      -  freeDNS
      -  DNSexit
      -  OpenDNS
      -  Namecheap.com

-  More interface types (VPNs, etc) available for packet capture
-  DNS Forwarder is used by the firewall itself for DNS resolution
   (configurable) so the firewall benefits from faster resolution via
   multiple concurrent queries, sees all DNS overrides/DHCP
   registrations, etc.
-  DHCP Server can now handle arbitrary numbered options, rather than
   only options present in the GUI.
-  Automatic update now also works for NanoBSD as well as full installs
-  More configuration sections can be synchronized via XMLRPC between
   CARP nodes.
