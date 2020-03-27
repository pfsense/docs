Using Existing Wireless Routers with pfSense
============================================

An existing wireless router may be used with a pfSense® appliance in the
following way:

#. Give the wireless router a **LAN IP Address** in the same **subnet**
   as the pfSense interface it will be plugged into (Likely **LAN**, maybe
   **OPTx**)

   .. note:: This must be **different** than the pfSense IP address in that
      subnet. For example, if the pfSense **LAN IP address** is **192.168.1.1**,
      give the wireless router a **LAN IP address** of ``192.168.1.2``.

#. Turn off **DHCP** on the wireless router, as the pfSense router will serve
   that role.
#. Connect an ethernet cable from the **SWITCH** or **LAN** side of the wireless
   router to the proper pfSense interface (**LAN** or **OPTx**), or into the
   same switch as that interface.

Wireless clients should be able to associate with the wireless AP, and then
obtain their IP address/gateway/etc from the pfSense router.

.. tip:: Do not use the internet or WAN port on the wireless router. If running
   firmware on the wireless router that can bridge the WAN port to the others,
   it may be used in that configuration.
