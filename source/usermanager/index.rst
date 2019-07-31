***************
User Management
***************

pfSense® software can utilize multiple user accounts to grant different types
of access to various functions of the firewall. These can range from access
to services such as captive portal all the way up to being a full
administrator account.

Users can be managed locally on the firewall or pfSense softeare can utilize
RADIUS and LDAP authentication sources.

.. toctree::
   :maxdepth: 1

   pfsense-default-username-and-password
   managing-local-users
   group-manager
   granting-users-access-to-ssh
   accessing-the-firewall-filesystem-with-scp
   sudo-package
   locked-out-of-the-webgui
   logging-out-of-the-webgui
   user-authentication-servers
   ldap-troubleshooting
   radius-errors
   google-gsuite-auth-source

FreeRADIUS
''''''''''

.. toctree::
   :maxdepth: 1

   freeradius-2-x-package
   configuring-additional-logging-for-freeradius
   mobile-one-time-passwords-with-freeradius
   plain-mac-authentication-with-freeradius
   using-eap-and-peap-with-freeradius
   using-mysql-with-freeradius
   testing-freeradius
