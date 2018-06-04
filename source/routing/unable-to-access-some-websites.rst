.. include:: /substitutions.rsti

Troubleshooting Website Access
==============================

If some sites will load, but other sites will not, there are a few
possible causes.

#. Check all of the items listed on :doc:`Connectivity Troubleshooting </routing/connectivity-troubleshooting>` before proceeding
#. Ensure the WAN gateway is reachable and set to the proper address
#. Ensure the subnet mask on the WAN interface of the firewall is
   correct
#. Ensure the subnet mask on the client stations and on every interface
   (and VPN) on pfSense is correct
#. Ensure the WAN MTU is properly set (See
   `here <http://www.dslreports.com/faq/695>`__ to determine the MTU),
   use MSS to lower the MTU if necessary
#. Use *traceroute* to determine where the traffic stops. It may be an
   upstream connectivity issue and not the pfSense firewall or ISP.
#. :doc:`Disable hardware checksums </hardware/troubleshooting-lost-traffic-or-disappearing-packets>` and
   see if the problem disappears
#. Disable any proxy package such as squid that is in use (if any)
#. Check **Clear invalid DF bits instead of dropping the packets** on
   **System > Advanced**, **Firewall/NAT** tab.
#. Check **Disable Firewall Scrub** on **System > Advanced**,
   **Firewall/NAT** tab.
