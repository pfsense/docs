.. include:: /substitutions.rsti

********
Packages
********

Packages extend the functionality of pfSense software. They provide additional
services and utilities not found in the base installation. These are all
completely optional and are not necessary for most deployments.

Management of packages is performed in the :doc:`package manager
</packages/package-manager>` found under **System > Packages**.

Using Packages
''''''''''''''

.. toctree::
   :maxdepth: 1

   package-manager
   package-list
   fixing-a-broken-pkg-database
   installing-freebsd-packages
   2-3-removed-packages

Documented Packages
'''''''''''''''''''

.. toctree::
   :maxdepth: 1

   /certificates/acme-package
   arping-package
   AutoConfigBackup </backup/autoconfigbackup>
   avahi-package
   haproxy-package
   troubleshooting-the-haproxy-package
   iperf-package
   lldp-on-pfsense
   nmap-package
   nut-package
   open-vm-tools-package
   openbgpd-package
   OpenVPN Client Export </vpn/openvpn/using-the-openvpn-client-export-package>
   pfblocker
   routing-information-protocol-rip
   siproxd-package
   Snort package </ids-ips/setup-snort-package>
   softflowd </monitoring/exporting-netflow-with-softflowd>
   SquidGuard package </cache-proxy/squidguard-package>
   stunnel-package
   /usermanager/sudo-package
   /development/system-patches
   vnstat
