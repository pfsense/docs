.. include:: /substitutions.rsti

PPTP Troubleshooting
====================

.. warning:: PPTP is no longer considered a secure VPN technology because it
   relies upon MS-CHAPv2 which has been compromised. If you continue to use PPTP
   be aware that intercepted traffic can be decrypted by a third party, so it
   should be considered unencrypted. We advise migrating to another VPN type
   such as OpenVPN or IPsec.

   More information on this can be found at:

   * https://isc.sans.edu/diary/End+of+Days+for+MS-CHAPv2/13807
   * https://www.cloudcracker.com/blog/2012/07/29/cracking-ms-chap-v2/

As the above warning states, PPTP should not be used any longer due to
its completely broken encryption and lack of security, in addition to
its long history of trouble as a VPN.

Other Alternatives
------------------

#. Use :doc:`OpenVPN </vpn/openvpn/openvpn-remote-access-server>`
#. Use :doc:`IPsec </vpn/ipsec/configuring-an-ipsec-remote-access-mobile-vpn-using-ikev1-xauth>`
#. Use :doc:`another VPN type </vpn/vpn-capability-overview>`
#. Consider a different VPN type on another platform

Troubleshooting GRE and PPTP
----------------------------

Multiple Outbound Connections to the Same External PPTP Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

pf does not have any capabilities of tracking more than one GRE
connection per public IP per external host. That is, if the entire
internal network gets NAT applied using the same public WAN IP, only one
internal machine can connect to a given external GRE source. For PPTP,
this means only one PC can connect to a given outside PPTP server at a
time.

Work-arounds:

-  Use 1:1 or outbound NAT with multiple public IP's

Other tips
^^^^^^^^^^

-  In **System > Advanced**, on the **Firewall/NAT** tab, check
   **Disable Firewall Scrub**.

Protocol information
^^^^^^^^^^^^^^^^^^^^

PPTP - http://www.faqs.org/rfcs/rfc2637.html

GRE - http://www.faqs.org/rfcs/rfc1701.html

