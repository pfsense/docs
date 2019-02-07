Using Existing Wireless Routers with pfSense
============================================

An existing wireless router, such as a Linksys WRT54G, may be used with
pfSense in the following way.

-  Give the Wireless Router a **LAN IP Address** in the **same subnet**
   as the pfSense interface it will be plugged into (Likely LAN, maybe
   OPTx)

   -  This must be **different** than the pfSense IP address in that
      subnet. For example, if the pfSense LAN IP address is 192.168.1.1,
      give the Wireless Router a LAN IP address of 192.168.1.2.

-  **Turn OFF DHCP** on the **Wireless Router**
-  Connect a cable from the **SWITCH or LAN** side of the **Wireless
   Router** to the proper pfSense interface (LAN or OPTx), or into the
   same switch as that interface.
-  **Do not use the INTERNET or WAN port** on the Wireless Router.

   -  If running dd-wrt, tomato, or another third-party firmware that
      can bridge the WAN port to the others, it may be used in that
      configuration.

Wireless clients should be able to associate with the AP, and then
obtain their IP address/gateway/etc from the pfSense router.

