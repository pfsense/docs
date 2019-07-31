********
Firewall
********

One of the primary purposes of pfSense® software is to act as a firewall,
deciding which traffic to pass or block between networks.

Managing Firewall Rules
'''''''''''''''''''''''

Firewall rules control traffic passing through the firewall. These topics
describe how to create and manage rules, plus settings related to rules.

.. toctree::
   :maxdepth: 1

   firewall-rule-basics
   firewall-rule-processing-order
   floating-rules
   firewall-rule-schedules
   filter-reload-status
   tcp-flag-definitions
   increasing-the-state-table-size
   reset-states

Aliases
'''''''

Aliases are collections of addresses that allow many hosts to be acted upon by
a small number of firewall rules. They can greatly simplify a ruleset and make
it easier to understand and manage.

.. toctree::
   :maxdepth: 1

   aliases
   using-fqdns-in-aliases
   tables
   sshlockout
   virusprot
   show-bogons

Firewall Guides
'''''''''''''''

How to perform various tasks with firewall rules.

.. toctree::
   :maxdepth: 1

   remote-firewall-administration
   restrict-access-to-management-interface
   blocking-instant-message-applications
   blocking-websites
   adding-rules-with-easyrule
   editing-the-pf-ruleset
   online-gaming-with-pfsense
   thread-error-using-many-hostname-in-aliases
   preventing-rfc1918-traffic-from-exiting-a-wan-interface
   firewall-rule-troubleshooting
   viewing-the-full-pf-ruleset
   virtual-ip-address-feature-comparison
   troubleshooting-blocked-log-entries-due-to-asymmetric-routing
   troubleshooting-blocked-log-entries-for-legitimate-connection-packets
