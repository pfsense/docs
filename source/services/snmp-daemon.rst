Configuring the SNMP Daemon
===========================

The Simple Network Management Protocol (SNMP) Daemon, located at
**Services > SNMP**, allows querying certain status information from
pfSense with an SNMP client, such as those in `Network Monitoring
Systems <https://en.wikipedia.org/wiki/Network_monitoring>`__.

At a minimum, to enable the service, set a **Polling Port** (Default is
udp/161) and a **Read Community String**. It is strongly recommended
that the **Read Community String** be changed, as the default "public"
value is a well-known default across vendors and may lead to unintended
information leaks.

SNMP trap generation may also be enabled. Fill in the **Trap server**,
**Trap server Port**, and **SNMP Trap String**.

Modules for the SNMP daemon may also be loaded or unloaded. Modules
provide specific collections of information or capabilities for the SNMP
daemon, but they also consume more system resources to do so. Reducing
the number of modules also limits the amount of information that could
be exposed via SNMP should the service be queried by an untrusted
source.

To get the latest set of MIBs for translating "enterprises" (Fokus) ,
they are installed at /usr/share/snmp/mibs on the firewall itself.

See Also

-  :doc:`/vpn/ipsec/accessing-firewall-services-over-ipsec-vpns`
-  `Cacti <http://www.cacti.net/>`_
