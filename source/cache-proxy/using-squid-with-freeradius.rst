Authenticating Squid Package Users with FreeRADIUS
==================================================

Using the Squid Proxy package with the :doc:`FreeRADIUS 2.x package </usermanager/freeradius-2-x-package>`.

SQUID Proxy
-----------

Squid provides the possibility to ask for a username and password for
users who want to connect the internt through squid proxy. This works
only if squid is running in non-transparent mode.

-  SQUID configuration:

   -  Disable transparent mode in **Proxy Server > General**
   -  Enable RADIUS as authentication method in **Proxy Server > Auth
      Settings**

-  FreeRADIUS configuration:

   -  Configure an interface in **FreeRADIUS > Interfaces**
   -  Configure a user in **FreeRADIUS > Users**
   -  Configure a NAS/Client in **FreeRADIUS > NAS/Clients**. In this
      case pfSense itself is the NAS/Client. So enter the pfSense
      IP-Address.

For squid in non-transparent mode the IP address and the squid port must
be entered on the host's browser. When a user connects to the Internet
through the proxy then the browser will present a login window where the
user has to enter username and password.
