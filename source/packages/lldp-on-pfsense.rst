.. include:: /substitutions.rsti

Using LLDP on pfSense
=====================

.. note:: There is now a **ladvd** package available that is preferable to this.
   However, ladvd may have issues on 32-bit platforms: `Bug
   #4736 <https://redmine.pfsense.org/issues/4736>`__

OpenLLDP
--------

`OpenLLDP <http://openlldp.sourceforge.net/>`__ allows
`LLDP <http://en.wikipedia.org/wiki/Link_Layer_Discovery_Protocol>`__ to
be enabled on pfSense. This package isn't in the GUI package list, but
is easily installed manually.

32-bit Install
^^^^^^^^^^^^^^

.. code::

  fetch http://files.pfsense.org/packages/8/All/openlldp-0.4.a_1.tbz
  pkg_add openlldp-0.4.a_1.tbz
  rehash
  lldpd

64-bit Install
^^^^^^^^^^^^^^

.. code::

  fetch http://files.pfsense.org/packages/amd64/8/All/openlldp-0.4.a_1.tbz
  pkg_add openlldp-0.4.a_1.tbz
  rehash

Now manually run the command ``lldpd``. Include no command line arguments for it
to listen and advertise on all interfaces, or use ``-i`` arguments to limit the
interfaces used.

Starting at boot time
^^^^^^^^^^^^^^^^^^^^^

A **<shellcmd>** tag in **config.xml** is recommended to start **lldpd** at boot
time. This may be added using the **shellcmd** package::

  <shellcmd>/usr/local/sbin/lldpd</shellcmd>

See :doc:`Executing commands at boot time </development/executing-commands-at-boot-time>` for details.

Seeing neighbors
^^^^^^^^^^^^^^^^

Use the ``lldpneighbors`` command to view connected LLDP devices::

  fw1# lldpneighbors
  OpenLLDP Neighbor Info:
  Interface 'bge0' has 1 LLDP Neighbors:
  Neighbor 1:
    Chassis ID:         MAC Address - 00 1e 4f 0a e1 e6
    Port ID:        Interface Name - g17
    Time To Live:       120 seconds
    Port Description:   Ethernet Interface g17
    System Name:        dell-5424-sw1
    System Description:     PowerConnect 5424
    System Capabiltiies:
                Bridge/Switch (enabled)
    Management Address:     IPv4 - 10.2.3.5 (ifIndex - -1081736960) (OID: Standard LLDP MIB)
    End Of LLDPDU:
  Interface 'em3' has 0 LLDP Neighbors:
  Interface 'em2' has 0 LLDP Neighbors:
  Interface 'em1' has 1 LLDP Neighbors:
  Neighbor 1:
    Chassis ID:         MAC Address - 00 0d b9 18 60 15
    Port ID:        Interface Name - vr1
    Time To Live:       120 seconds
    Port Description:   vr1
    System Name:        perftest-alix.localdomain.
    System Description:     i386/FreeBSD 8.1-RELEASE-p13
    System Capabiltiies:
                Station (enabled)
    Management Address:     IPv4 - 10.1.1.2 (System Port Number - 2) (OID: Standard LLDP MIB)
    End Of LLDPDU:
  Interface 'em0' has 1 LLDP Neighbors:
  Neighbor 1:
    Chassis ID:         MAC Address - 00 15 17 68 96 e8
    Port ID:        Interface Name - em0
    Time To Live:       120 seconds
    Port Description:   em0
    System Name:        perftest2.
    System Description:     amd64/FreeBSD 9.1-RELEASE-p5
    System Capabiltiies:
                Station (enabled)
    Management Address:     IPv4 - 10.0.0.2 (System Port Number - 1) (OID: Standard LLDP MIB)
    End Of LLDPDU:
