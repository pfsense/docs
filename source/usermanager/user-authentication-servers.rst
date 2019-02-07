Configuring User Authentication Servers
=======================================

In pfSense, authentication servers are managed centrally under **System
> User Manager**, on the **Servers** tab. This central location takes
the place of the similar settings that used to be present in many
subsystems but managed separately.

LDAP or Radius servers may be added, and then they will available for
use in other places in the system such as OpenVPN and IPsec.

After adding an authentication source, it may be tested by visiting
**Diagnostics > Authentication**. Select an **Authentication Server**,
provide a **Username** and **Password**, then click **Test**. The result
will be displayed. Check the output of the test, the System Log, and
logs on the authentication server for more information.

When using an authentication server to control access to the pfSense
GUI, group membership relies on the existence of a local group to match
the name of a group on the authentication server.

