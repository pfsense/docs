*****************
System Monitoring
*****************

pfSense provides a wealth of information about the state of the firewall, its
services, traffic flowing through the firewall, and log data.

Logs
''''

Logs on pfSense contain recent events and messages from daemons. These messages
can be stored locally on a limited basis, or forwarded to a central logging
server for long-term storage, better reporting, alerting, and so on.

.. toctree::
   :maxdepth: 1

   system-logs
   firewall-logs
   filter-log-format-for-pfsense-2-2
   gateway-logs
   ntp-logs
   package-logs
   ppp-logs
   resolver-logs
   routing-logs
   log-settings
   adjusting-the-size-of-log-files
   copying-logs-to-a-remote-host-with-syslog
   working-with-binary-circular-logs-clog
   troubleshooting-login-on-console-as-root-log-messages
   troubleshooting-promiscuous-mode-enabled-log-messages

Status Information
''''''''''''''''''

These articles cover various ways to check the status of services or features of
the firewall, or the firewall itself. They also cover simple network diagnostic
tests.

.. toctree::
   :maxdepth: 1

   show-states
   show-source-tracking
   states-summary
   packet-filter-information
   gateway-status
   using-an-alternate-monitor-ip-address-for-gateway-monitoring
   carp-status
   interface-status
   viewing-active-network-sockets
   services-status
   smart-status
   system-activity
   arp-table
   arp-moved-log-messages
   ndp-table
   hardware-monitoring-support
   performing-a-packet-capture
   ping-host
   test-port
   traceroute

Traffic Monitoring
''''''''''''''''''

These articles cover monitoring traffic on interfaces as well as using
additional packages for more detailed monitoring of user throughput/usage.

.. toctree::
   :maxdepth: 1

   monitoring-graphs
   monitoring-bandwidth-usage
   traffic-graph
   exporting-netflow-with-softflowd
