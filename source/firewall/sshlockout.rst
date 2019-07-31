Sshlockout Firewall Table
=========================

The **sshlockout** table provides a list of IP addresses that have been
blacklisted due to repeated SSH login failures, such as those using
dictionary or other brute force attacks.

If an attacker attempts to SSH into the pfSense® firewall and fails 15
attempts at guessing a username and password, the attacker's IP address
will be added to this table. Any subsequent SSH attempts from this IP
address will be blocked by pfSense software.

**Note:**

-  Entries that exist in this table, that are equal to or older than
   3600 seconds, will be expired every hour.
-  No checks are made to distinguish between local IP addresses, local
   networks or prior good logins.

