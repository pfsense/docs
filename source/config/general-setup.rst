.. include:: /substitutions.rsti

General pfSense Settings
========================

Some basic/common settings are available under **System > General
Setup**.

-  **Hostname**: The name by which this pfSense router is known. Should
   only include the portion before the first “.”.
-  **Domain**: The domain name in which this pfSense is used. Together
   with the hostname, this will form the Fully Qualified Domain Name
   (FQDN) of the firewall.
-  **DNS Servers**: If known, these DNS servers will be used for pfSense
   itself as well as the DHCP clients if the DNS forwarder is off, and
   for PPTP VPN clients. These may be left blank if using a dynamic WAN
   connection that provides DNS servers, such as PPTP or DHCP. They may
   also be left blank if the DNS Resolved is used in non-forwarding
   mode.

   -  The gateway selection for DNS servers is primarily used for
      :doc:`/routing/multi-wan`. See that page for more detail.

-  **Allow DNS server list to be overridden by DHCP/PPP on WAN**: If a
   dynamic WAN is present, unchecking this box will make the system use
   only the servers specified manually and not those provided by the
   ISP. This is especially useful when using OpenDNS servers for access
   control or Google public DNS to work around flaky ISP DNS servers.
-  **Do not use the DNS Forwarder as a DNS server for the firewall**: By
   default the firewall itself will also use the DNS Forwarder. This is
   faster, more robust, and less likely to fail. If the DNS Forwarder is
   disabled, this should be checked to prevent the firewall from
   attempting to use the DNS Forwarder for its own DNS.
-  **Time Zone**: Select a time zone for use by the GUI and for logging.
   After changing the time zone, a reboot may be necessary for all
   processes and the kernel to respect the chosen zone.
-  **NTP Time Server**: List of servers (space separated) to use for NTP
   (time synchronization). The use of NTP pool servers is recommended,
   such as 0.pfsense.pool.ntp.org 1.pfsense.pool.ntp.org and so on.
-  **Language**: The language to use for the GUI. Default is English,
   Portuguese, Turkish, and Japanese are also available depending on the
   version in use.
-  **Theme**: Changes the look and feel of the pfSense GUI, but not the
   functionality; Cosmetic only.

