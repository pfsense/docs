***************************
Network Address Translation
***************************

`Network Address Translation`_ (NAT) refers to the process of modifying network
address information contained in datagram packet headers while they are in
transit, generally across a pfSense® device or similar system, in order to map
an address on one subnet to an address on another.

In practice the most common use of NAT is to allow a private LAN to communicate
with the public Internet (outbound NAT) and to allow access to servers on the
private LAN from the Internet (port forwards).

The NAT settings in pfSense software are accessed via the **Firewall > NAT** menu
in the webGUI.

Configuration of NAT in pfSense software is categorized into four areas: Port Forwards,
1:1 (One to One) NAT, Outbound NAT, and NPt (Network Prefix Translation) for
IPv6

.. toctree::
   :maxdepth: 1

   forwarding-ports-with-pfsense
   1-1-nat
   port-forward-and-1-1-nat-interaction
   outbound-nat
   static-port
   automatic-nat-rules-generation
   advanced-outbound-nat
   configuring-nat-for-a-voip-pbx
   configuring-nat-for-voip-phones
   using-ipv6-network-prefix-translation-npt
   accessing-port-forwards-from-local-networks
   using-1-1-nat-on-a-wan-ip-address
   setup-ftp-server-behind-pfsense
   ftp-without-a-proxy

Troubleshooting
---------------

.. toctree::
   :maxdepth: 1
   
   port-forward-troubleshooting
   troubleshooting-1-1-nat
   troubleshooting-nat-reflection

.. _Network Address Translation: https://en.wikipedia.org/wiki/Network_address_translation
