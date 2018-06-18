.. include:: /substitutions.rsti

*********
IDS / IPS
*********

pfSense can act in an Intrusion Detection System (IDS) / Intrusion Prevention
System (IPS) role with add-on packages like Snort and Suricata.

.. note:: The Snort and Suricata packages share many design similarities, so
   in most cases the instructions for Snort carry over to Suricata with only
   minor adjustments.

Snort
'''''

.. toctree::
   :maxdepth: 1

   setup-snort-package
   snort-alerts
   snort-barnyard2
   snort-blocked-hosts
   snort-define-servers
   snort-interface-settings
   snort-interfaces-global
   snort-interfaces
   snort-ip-list-mgmt
   snort-ip-reputation-preprocessor
   snort-ip-reputation
   snort-passlist
   snort-preprocessors
   snort-rules
   snort-rulesets
   snort-suppress-list
   snort-updates
   snort-xmlrpc-synchronization
   troubelshooting-snort-rule-updates
