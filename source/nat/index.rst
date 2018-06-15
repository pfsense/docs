.. include:: /substitutions.rsti

***************************
Network Address Translation
***************************

Network Address Translation (NAT) refers to the process of modifying
network address information contained in datagram packet headers while
they are in transit, generally across a device or system similar to
pfSense, in order to map an address on one subnet to an address on
another.

In practice the most common use of NAT is to allow a private LAN to
communicate with the public Internet and to allow access to servers on
the private LAN from the Internet.

For the terminally curious, a more detailed discussion of NAT is
available at
`Wikipedia <http://en.wikipedia.org/wiki/Network_address_translation>`_.

NAT in pfSense
--------------

The NAT settings in pfSense are accessed via the **Firewall > NAT** menu
in the WebGUI.

Configuration of NAT in pfSense is categorized into three areas: Port
Forward, 1:1 (One to One), and Outbound.

See the links below for other NAT articles. The best source for NAT information
is the |book_link|.

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
   port-forward-troubleshooting
   troubleshooting-1-1-nat
   troubleshooting-nat-reflection
