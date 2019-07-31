Using FQDNs in Aliases
======================

Fully Qualified Domain Names (FQDNs) may be used in network aliases,
with some caveats.

-  In pfSense® software version 2.0 and later, the hostnames are
   checked and updated every 5 minutes.

   -  On pfSense software version 2.1 and later, this interval may be
      manually set under **System > Advanced** on the **Firewall/NAT** tab.

-  DNS names that use very low TTLs and change frequently, such as round
   robin entries, are not reasonable to use in this fashion. This means
   that large sites like google.com, which return a different set of IP
   addresses with each query, would not be a viable in an alias.

