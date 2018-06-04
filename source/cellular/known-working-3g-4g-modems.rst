.. include:: /substitutions.rsti

Known Working 3G-4G Modems
==========================

This page lists 3G and 4G modem devices which are known to work with
pfSense 2.0

-  4G Systems XS Stick P14
-  Alcatel Onetouch 4G L850V
-  Anydata ADU-635 WA
-  Verizon/Pantech UM175
-  Verizon/Pantech UML290 and UML295 (see :doc:`here for UML290 config info </cellular/verizon-uml290>`)
-  Verizon USB727
-  HP hs2340 HSPA+ Mini Card AMO Ericsson
-  Huawei B970/B970B
-  Huawei E122
-  Huawei E153
-  Huawei E156G
-  Huawei E160
-  Huawei E161
-  Huawei E160E
-  Huawei E169
-  Huawei E172
-  Huawei E173

   -  It has been reported that some E173 modems are shipping labeled as
      E173 but have a different chip that is not supported. See below.

-  Huawei E173U-1
-  Huawei E176
-  Huawei E180
-  Huawei E220
-  Huawei E226
-  Huawei E272
-  Huawei E352
-  Huawei E353U-2
-  Huawei E367
-  Huawei E372
-  Huawei E392
-  Huawei E398 (E398u-1)
-  Huawei E960
-  Huawei E1550
-  Huawei E1552
-  Huawei E1556
-  Huawei E1692
-  Huawei E1750
-  Huawei E1756
-  Huawei E1762
-  Huawei E1820
-  Huawei E3372s LTE USB-stick

   -  Link interface: /dev/cuaU0.1
   -  Init string: &F&C1&D2E0S0=0

-  Huawei E3372h LTE USB-stick

   -  Requires manual firmware changes, see
      `here <http://www.0xf8.org/2017/01/flashing-a-huawei-e3372h-4g-lte-stick-from-hilink-to-stick-mode/>`__

-  Huawei K3563
-  Huawei E5372
-  Huawei E5776
-  Huawei VIK K3715 HSU by Vodafone
-  Huawei K3765 by Vodafone
-  Huawei ME909u-521 4G/LTE Mini-PCIe
-  Huawei ME909s-120 4G/LTE Mini-PCIe
-  Nokia Phone E72-1 connected via USB cable
-  Sierra Wireless U305
-  Sierra Wireless 320u usb LTE
-  Sierra Wireless U330
-  Sierra Wireless MC7354
-  Sierra Wireless MC7355
-  Sierra Wireless MC7710
-  HP2300 (Sierra Wireless MC8775 3G) Mini-PCIe
-  USB Connect Mercury (Sierra Wireless Compass 885 or C885)
-  Sierra Wireless Compass 889
-  Ovation U727 by Novatel on Sprint CDMA
-  Nokia CS-17
-  Turkey-TTNET Usb Stick 3G Modem. Label says Huawei E173 but its
   actually Huawei E1800.
-  Telstra maxon bp3-usb (Benchmarked: 2500/350)
-  ZTE MF656A
-  Vodafone Mobile Connect K3565
-  Huawei K4505 (Vodafone Mobile Broadband)
-  LTE Yota LiTE LU 156 4G - NOTE: May need nudged in some way out of
   storage mode. (e.g. boot delay, unplug/replug)
-  Novatel EU850D (Mini PCIe)
-  ZTE MF683 (May need CD-ROM disabled using AT+ZCDRUN=8 on another
   system first)
-  ZTE MF622
-  Ericsson H5321G / Lenovo FRU 60Y3297
-  Ericsson F5521GW Gobi3000 / Lenovo
-  Ericsson N5321 / Lenovo

   -  May need “AT+CFUN=1” in the init string. Serial port varies from
      /dev/cuaU[0-3]

-  ZTE MF915 LTE modem (T-Mobile)
-  ZTE MF190 USB (1&1) using */dev/cuaU0.2*
-  ZTE MF669 - May need “camcontrol eject da0” in shellcmd, uses
   */dev/cuaU0.2*
-  ZTE MF830 - Can be switched from Ethernet to Modem by accessing the
   device's web interface, depending on preference.
-  ZTE MF861
-  D-Link DWM-157 (3.75HSPA+)
-  ONDA MT503HSA Type MF636 (requires eject mode switch, see below)
-  Netgear LB1120 (US)
-  Netgear LB1121 (US)
-  Netgear LB2120 (US)
-  Netgear LB1110 (EU)
-  Netgear LB1111 (EU)

-  And many others

If you have a modem that **DOES WORK** but is not on the list - Please
`Let us know <mailto:wikiadmin@pfsense.org>`__ - but only use that
address for reports of **success**.

If you have a modem that **DOES NOT WORK** - post about it on the
`forum <http://forum.pfsense.org>`__ for help, **do not send us e-mail
asking for support or drivers**, as the above address is only for
updating the documentation, not for technical assistance.

Modems reported to work as Ethernet devices
-------------------------------------------

-  Verizon (Pantech) 295 - Works, but fails if detached and reattached,
   must reboot.
-  ZTE MF60 3g
-  ZTE MF823 - Defaults to 192.168.0.1, will need to be sure local
   system does not have an overlapping network.
-  ZTE MF915 LTE modem (T-Mobile)
-  ZTE MF975S
-  Huawei E8372h

Modem variations reported to NOT work
-------------------------------------

These have the same model numbers as the above, but have different chips
and may not be supported.

- Huawei E173s

.. code::

  #Before switching (USB mass storage)
  DefaultVendor= 0x12d1
  DefaultProduct=0x1c0b
  #After switching into modem mode
  TargetVendor=  0x12d1
  TargetProductList="1c05,1c08"

- mPCIe: Sierra Wireless Gobi2000

Mode Switching
--------------

Some devices show up as a media device, such as *cd0*, in this case it
may be possible to switch modes by executing a command::

  camcontrol eject cd0

If that does switch the modem to the proper mode, it may be added as a
:doc:`/development/executing-commands-at-boot-time` using the full path::

  /sbin/camcontrol eject cd0
