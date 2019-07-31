Troubleshooting Multi-WAN
=========================

Basic testing of a load balancing setup
---------------------------------------

It's all set up and it looks like its working, but is it really
happening?

**Check that both connections are available**. From the pfSense® webGUI,
first check that all WAN connections are marked as available under
**Status > Gateways** both on the **Gateways** and **Gateway Groups**
tabs.

If a problem is found here check the gateway monitoring settings and
gateway group settings. Make sure that the monitor IP addresses actually
respond to pings.

If all gateways show online, it's OK.

.. image:: /_static/routing/pfstsstatus.png

If a gateway is down/pending for no apparent reason
---------------------------------------------------

A different monitor IP **MUST** be used for each WAN link or it will
not function properly.

Also, as a crucial sanity check, use the diagnostics ping test to the
monitor IP with the respective interface selected. The monitoring
system is simply doing a ping as well, so this will confirm its
issues.

Try restarting the **dpinger** service from **Status > Services**.

If the gateway does not respond to ping but is known to be functional,
use a different monitor IP address.

Using an IP address on the Internet, or at least a few hops away from
the gateway, is strongly advised. It is too easy for the ISP to have
routing issues such that traffic cannot move past their core so the link
is functionally down even though the gateway is reachable. So for each
WAN link be sure to pick a public IP which responds to pings and exists
outside of the ISP network.

Squid doesn't seem to be using both connections
-----------------------------------------------

Squid (and most other packages) don't understand load balancing, and
will just use the WAN connection.

Even on 2.x, where many improvements have been made, there are still
issues with getting Squid to properly take advantage of Multi-WAN. Check
the forum for the latest developments.

Ground up testing
-----------------

This set of progressive tests assumes that the pfSense box is running OK
and it can be accessed from another system on the local network (LAN)
with a web browser.

pfSense can see the modem / routers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With the pfSense web interface, use **Diagnostics > Ping** and check
that pfSense can ping each (all) of the routers / modems. Note that the
correct interface must be selected for the IP address of each modem /
router or it will fail.

If this does not work then there is a basic network or setup problem to
resolve. Check the modem / router setup, and the cabling between them
and the pfSense system.

Can a system on the LAN see the modem / routers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now try to ping each of the modem / routers from another system that is
connected to the pfSense LAN network.

If this is the same system that the web interface is being accessed
from, then the connection between the system and pfSense is OK.

Is pfSense set as the default gateway on the test system? If not then
correct the configuration (or change the pfSense DHCP setup if using
pfSense for DHCP - the **Gateway** field on **Services > DHCP server**
should be blank or set to a VIP on the firewall).

Is the last rule in the **Firewall > Rules** list the Balance rule?

Are all the ISP connections being used?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use a search engine (Google) to search for "what is my ip"

Click on several of the resulting sites. The results should show that
the IP address is each of the WAN IP addresses. If there is only one
person using the pfSense firewall, every time a page is reloaded one of
the "what is my IP" pages should give a different IP address. The
browser cache may need cleared, or the browser closed and reopened
between tests on the same site.
