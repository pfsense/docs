.. include:: /substitutions.rsti

************************
Installing and Upgrading
************************

pfSense must be installed on hardware (real or virtual) before it will function.
Once installed, keeping the firewall up-to-date is critical for ensuring the
highest level of security and stability.

Installing
''''''''''

Topics related to installing pfSense on compatible hardware and some virtual
environments.

.. toctree::
   :maxdepth: 1

   installing-pfsense
   verify-downloaded-files
   /hardware/writing-disk-images
   writing-iso-images
   /hardware/connecting-to-the-serial-console
   installing-on-embedded-platforms
   installing-pfsense-over-an-existing-freebsd-installation
   installation-troubleshooting

.. seealso:: For information on installing pfSense in a hypervisor or other
   virtual environments, see :doc:`/virtualization/index`.

Upgrading
'''''''''

Topics related to upgrading an existing installation to a current release.

.. toctree::
   :maxdepth: 1

   upgrade-guide
   upgrading-pfsense-software-installations
   upgrade-troubleshooting
   /highavailability/redundant-firewalls-upgrade-guide
   upgrading-64-bit-nanobsd-2-3-to-2-4
