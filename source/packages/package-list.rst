Package List
============

.. toctree::
   :hidden:

   arping-package
   avahi-package
   freeradius-package
   haproxy-package
   iperf-package
   lldp-on-pfsense
   nmap-package
   nut-package
   open-vm-tools-package
   openbgpd-package
   pfblocker
   routing-information-protocol-rip
   siproxd-package
   stunnel-package
   vnstat

The following packages are available from the pfSense® package repository:

.. warning:: Packages availability might change, check **System > Package
   Manager > Available Packages** for an always up-to-date list of packages.

ACME
----

:doc:`Automated Certificate Management Environment (ACME) </certificates/acme-package>`
is for automated use of Let's Encrypt certificates.

arping
------

:doc:`arping <arping-package>` broadcasts a who-has ARP packet on the network
and prints answers.

apcupsd
-------

**apcupsd** can be used for controlling all APC UPS models. It can monitor and
log the current power and battery status, perform automatic shutdown, and can
run in network mode in order to power down other hosts on a LAN.

Avahi
-----

:doc:`Avahi <avahi-package>` is a system which facilitates service discovery on
a local network via the mDNS/DNS-SD protocol suite. This enables you to plug
your laptop or computer into a network and instantly be able to view other
people who you can chat with, find printers to print to or find files being
shared. In addition it supports some nifty things that have never been seen
elsewhere like correct mDNS reflection across LAN segments. Compatible
technology is found in Apple MacOS X (branded Bonjour and sometimes Zeroconf).

Backup
------

**Backup** is used to backup and Rrestore files and directories.

BIND
----

**BIND** provides a webGUI for BIND DNS server.

blinkled
--------

**blinkled** allows you to use LEDs for monitoring network activity on supported
platforms (ALIX, WRAP, Soekris, etc.).

cellular
--------

**cellular** provides a webGUI for cellular cards, currently it supports certain
Huawei models.

Cron
----

**Cron** is used to manage commands on a schedule.

Darkstat
--------

**Darkstat** is a network statistics gatherer. It's a packet sniffer that runs
as a background process on a cable/DSL router, gathers all sorts of statistics
about network usage, and serves them over HTTP.

FreeRADIUS
----------

:doc:`FreeRADIUS <freeradius-package>` is a free implementation of the RADIUS
protocol, which supports MySQL, PostgreSQL, LDAP, Kerberos.

frr
---

**frr** is a FRR routing daemon for BGP, OSPF, and OSPF6.

FTP Client Proxy
----------------

**FTP Client Proxy** is a basic FTP client proxy using **ftp-proxy** from
FreeBSD.

gwled
-----

**gwled** allows LEDs to be used for monitoring gateway status on supported
platforms (ALIX, WRAP, Soekris, etc.).

HAproxy
-------

:doc:`HAproxy <haproxy-package>` is a reliable, high performance TCP/HTTP(S)
load balancer. This package implements the TCP, HTTP and HTTPS balancing
features from haproxy and supports ACLs for smart backend switching.

HAproxy-devel
-------------

**HAproxy-devel** is the development package for HAproxy.

iftop
-----

**iftop** is a realtime interface monitor (console/shell only).

iperf
-----

:doc:`iperf <iperf-package>` is a tool for testing network throughput, loss, and
jitter.

LCDproc
-------

**LCDproc** is a LCD display driver.

Lightsquid
----------

**Lightsquid** is a high performance web proxy reporting tool. Includes proxy
realtime statistics (SQStat). Requires the **Squid** package.

LADVD
-----

:doc:`LADVD <lldp-on-pfsense>` can send and decode link layer advertisements.
Support for LLDP (Link Layer Discovery Protocol), CDP (Cisco Discovery
Protocol), EDP (Extreme Discovery Protocol) and NDP (Nortel Discovery
Protocol).

Mailreport
----------

**Mailreport** allows the setup of periodic e-mail reports containing command
output, and log file contents.

MTR
---

**MTR** is an enhanced traceroute replacement. mtr combines the functionality of
the traceroute and ping programs in a single network diagnostic tool.

Netgate Coreboot Upgrade
------------------------

**Netgate Coreboot Upgrade** provide a mechanism to update Coreboot on Netgate
hardware.

nmap
----

:doc:`nmap <nmap-package>` is a utility for network exploration or security
auditing. It supports ping scanning (determine which hosts are up), many port
scanning techniques (determine what services the hosts are offering), version
detection (determine what application/service is running on a port), and TCP/IP
fingerprinting (remote host OS or device identification). It also offers
flexible target and port specification, decoy/stealth scanning, SunRPC scanning,
and more.

Notes
-----

**Notes** allows for the tracking of things to note for the system.

NRPE
----

**NRPE** provides a webGUI for Nagios NRPE. It is used to execute Nagios plugins
on remote hosts and report the results to the main Nagios server. From the
Nagios homepage: Allows you to execute "local" plugins (like check_disk,
check_procs, etc.) on remote hosts. The check_nrpe plugin is called from Nagios
and actually makes the plugin requests to the remote host. Requires that nrpe be
running on the remote host (either as a standalone daemon or as a service under
inetd).

ntopNG
------

**ntopNG** (replaces **ntop**) is a network probe that shows network usage in a
way similar to what top does for processes. In interactive mode, it displays the
network status on the user's terminal. In Web mode it acts as a Web server,
creating an HTML dump of the network status. It sports a NetFlow/sFlow
emitter/collector, an HTTP-based client interface for creating ntop-centric
monitoring applications, and RRD for persistently storing traffic statistics.

NUT
---

:doc:`Network UPS Tools (NUT) <nut-package>` provides support for monitoring of
Uninterruptible Power Supplies. It supports UPS units attached locally via USB
or serial, and remote units via the SNMP protocol, the APCUPSD protocol or the
NUT protocol.

OpenVPN Client Export
---------------------

:doc:`OpenVPN Client Export </vpn/openvpn/using-the-openvpn-client-export-package>`
allows a pre-configured OpenVPN Windows Client or Mac OS X's Viscosity
configuration bundle to be exported directly from pfSense software.

Open-VM-Tools
-------------

:doc:`Open-VM-Tools <open-vm-tools-package>` is a suite of utilities that
enhances the performance of the virtual machine's guest operating system and
improves management of the virtual machine.

OpenBGPD
--------

:doc:`OpenBGPD <openbgpd-package>` is a free implementation of the Border
Gateway Protocol, version 4. It allows ordinary machines to be used as routers
exchanging routes with other systems speaking the BGP protocol.

.. warning:: Conflicts with **Quagga_OSPF**; both packages cannot be installed
   at the same time.

pfBlockerNG
-----------

:doc:`pfBlockerNG <pfblocker>` is the Next Generation of pfBlocker. Manage
IPv4/v6 List Sources into 'Deny, Permit or Match' formats. GeoIP database by
MaxMind Inc. (GeoLite2 Free version). De-Duplication, Suppression, and
Reputation enhancements. Provision to download from diverse List formats.
Advanced Integration for Proofpoint ET IQRisk IP Reputation Threat Sources.
Domain Name (DNSBL) blocking via Unbound DNS Resolver.

Quagga_OSPF
-----------

**Quagga_OSPF** allows the use of OSPF routing protocol using Quagga.

.. warning:: Conflicts with **OpenBGPD**; both packages cannot be installed at
   the same time.

Routed
------

:doc:`Routed <routing-information-protocol-rip>` is a RIP v1 and v2 daemon.

RRD Summary
-----------

**RRD Summary** gives a total amount of traffic passed In/Out during this and
the previous month.

Service Watchdog
----------------

**Service Watchdog** monitors for stopped services and restarts them.

Shellcmd
--------

**Shellcmd** is used to manage commands on system startup.

Siproxd
-------

:doc:`Siproxd <siproxd-package>` is a proxy for handling NAT of multiple SIP
devices to a single public IP.

Snort
-----

:doc:`Snort </ids-ips/setup-snort-package>` is an open source network intrusion
prevention and detection system (IDS/IPS). Combining the benefits of signature,
protocol, and anomaly-based inspection.

Softflowd
---------

:doc:`Softflowd </monitoring/exporting-netflow-with-softflowd>` is flow-based
network traffic analyser capable of Cisco NetFlow data export. Softflowd
semi-statefully tracks traffic flows recorded by listening on a network
interface or by reading a packet capture file. These flows may be reported via
NetFlow to a collecting host or summarised within softflowd itself. Softflowd
supports Netflow versions 1, 5 and 9 and is fully IPv6-capable - it can track
IPv6 flows and send export datagrams via IPv6. It also supports export to
multicast groups, allowing for redundant flow collectors.

Status Traffic Totals
---------------------

:doc:`Status Traffic Totals <vnstat>` gives a total amount of traffic passed
In/Out over the period of hours, days, and months. Uses vnStat for data
collection. It shows up in the menu under **Status > Traffic Total**.

Stunnel
-------

:doc:`Stunnel <stunnel-package>` is a SSL encryption wrapper between remote
client and local or remote servers.

Sudo
----

:doc:`Sudo </usermanager/sudo-package>` allows delegation of privileges to users
in the shell so commands can be run as other users, such as root.

Suricata
--------

**Suricata** is a high performance network IDS, IPS and security monitoring
engine by OISF.

Syslog-ng
---------

**Syslog-ng** is a syslog server. This service is not intended to replace the
default pfSense syslog server but rather acts as an independent syslog server.

System patches
--------------

:doc:`System patches </development/system-patches>` allows custom system patches
to be appled and maintained.

Squid
-----

**Squid** is a high performance web proxy cache (3.5 branch). It combines Squid
as a proxy server with its capabilities of acting as a HTTP/HTTPS reverse proxy.
It includes an Exchange-Web-Access (OWA) Assistant, SSL filtering and antivirus
integration via C-ICAP.

SquidGuard
----------

:doc:`SquidGuard </cache-proxy/squidguard-package>` is a high performance web
proxy URL filter.

TFTPD
-----

**TFTPD** installs and runs a TFTP server, using the versatile **tftp-hpa**
server.

Tinc
----

**Tinc** is a Virtual Private Network (VPN) daemon that uses tunnelling and
encryption to create a secure private network between hosts on the Internet.
Because the tunnel appears to the IP level network code as a normal network
device, there is no need to adapt any existing software. This tunnelling allows
VPN sites to share information with each other over the Internet without
exposing any information to others. A single tinc daemon can accept more than
one connection at a time, thus making it possible to create larger virtual
networks, because some limitations are circumvented. Instead of most other VPN
implementations, tinc encapsulates each network packet in its own UDP packet,
instead of encapsulating all into one TCP or even PPP over TCP stream. This
results in lower latencies, less overhead, and in general better responsiveness
and throughput.

Zabbix-agent
------------

**Zabbix-agent** is a LTS (Long Term Support) release of Zabbix Monitoring
agent. Zabbix LTS releases are supported for Zabbix customers during five (5)
years i.e. 3 years of Full Support (general, critical and security issues) and 2
additional years of Limited Support (critical and security issues only).

Zabbix-proxy
------------

**Zabbix-proxy** is a LTS (Long Term Support) release of Zabbix Agent proxy.
Zabbix LTS releases are supported for Zabbix customers during five (5) years
i.e. 3 years of Full Support (general, critical and security issues) and 2
additional years of Limited Support (critical and security issues only).
