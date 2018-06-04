.. include:: /substitutions.rsti

Troubleshooting LDAP Authentication
===================================

If trouble is encountered getting a connection to an LDAP server, there
are several things to check. Most of the time it is trouble-free, but in
particular, LDAP with SSL can be tricky.

DN and Related Settings
-----------------------

First, ensure the base DN and similar settings match those configured on
the LDAP server. Check the LDAP server for more information.

For **Base DN**, it's typical to use the root of the LDAP tree but
typically **Entire Subtree** should also be selected for the **Search
Scope**.

**Authentication Containers** vary by system and setup. On Windows, it
is commonly *CN=Users,DC=example,DC=com*, but it may vary. Try using an
`LDAP browser <http://directory.apache.org/studio/>`__ or similar to
locate the correct container.

The LDAP path items are not case sensitive, so *CN=Administrator* is
equivalent to *cn=administrator*.

Bind Credentials
----------------

If Anonymous binds are not being used, the username supplied can be the
short name (e.g. *DOMAIN\\User* for AD) or a full LDAP specification for
a user (e.g. *CN=administrator,CN=Users,DC=example,DC=com*).

For a production setup, an unprivileged user should be used for binding
if possible, and not AS Administrator-level account. Such an
unprivileged user may need sufficient permissions to attempt binding as
other users and access the LDAP directory.

Extended Query
--------------

Ensure a directive is used that includes what should be searched as well
as how, such as::

  memberOf=CN=vpnusers,CN=Users,DC=example,DC=com

Connection-Related Issues (non-SSL)
-----------------------------------

Make sure that the LDAP server is listening on the expected port, and
that connectivity to the LDAP server's network is functional.

Performing a packet capture filtered on the LDAP server's IP address and
port will help track down the problem.

Connection-Related Issues (SSL)
-------------------------------

By far the most troublesome connection issues people have are with
LDAP+SSL (ldaps) because it is so secure in how it operates.

Hostname Required
~~~~~~~~~~~~~~~~~

When connecting to LDAP with SSL, the hostname given for the server is
also used to verify the server certificate. The server certificate's
common name **must be its hostname**, and that **hostname must resolve
to the LDAP server's IP address**, e.g. *CN=ldap.example.com*, and
*ldap.example.com* is *192.168.1.5*.

If an IP address has been entered for the hostname of the LDAP server,
it will not work unless that IP happens to also be the CN or a SAN of
the server certificate.

If this must be worked around, it is possible to create a DNS host
override in the DNS forwarder for *(common name of the
cert)*.\ *(firewall's domain name)*. That assumes that the CN is in a
format that could actually be a hostname.

Use the Correct Port
~~~~~~~~~~~~~~~~~~~~

When using LDAP, pfSense will use an **ldaps** URL which defaults to
port **636**. It will **NOT** do starttls on port **389**. Ensure the
LDAP server is listening properly on port **636**.

Ensure CA Matches
~~~~~~~~~~~~~~~~~

The most important factor in making sure that it is possible to
communicate with the LDAP server over SSL is that the correct CA
certificate has been imported into pfSense, and chosen on the LDAP
settings. The key is not required, only the CA certificate.

Nested CAs
~~~~~~~~~~

If the LDAP server certificate CA is part of a chain, or there is an
intermediate CA, every CA certificate must be pasted into the form when
importing the CA into pfSense. For example::

  -----BEGIN CERTIFICATE-----
  Subordinate/Intermediate CA certificate text
  -----END CERTIFICATE-----
  -----BEGIN CERTIFICATE-----
  Root CA certificate text
  -----END CERTIFICATE-----

Other Cert/CA Issues
~~~~~~~~~~~~~~~~~~~~

Confirm that the certificates are otherwise valid, for example they are
not expired or set to be valid in the future.

Debugging LDAP
--------------

If the hostname and CA certificate are believed to be correct, LDAP can
be debugged by applying the following patch (2.1 only) using the :doc:`System Patches </development/system-patches>` package::

  URL: http://files.pfsense.org/jimp/patches/ldap-debug.patch
  Path Strip: 1
  Base: /
  Ignore Whitespace: Checked

Once applied, from the console or ssh, run option **11** to restart the
WebGUI. The patch enables some debug logging for LDAP and also tells
lighttpd to write the error log for the debug messages. Once the GUI has
restarted, try the LDAP query again, and then check
*/var/log/lighttpd-breakage.log* which should have sufficient detail to
track down the cause of the problem. If assistance is needed with
decoding the output, post in the forum for help or seek assistance from
`pfSense Commercial Support <https://portal.pfsense.org>`__.

Group Membership
----------------

Group membership can be tricky with LDAP due to the various ways in
which the LDAP schema can vary. It may be that the LDAP sever requires
the RFC 2307 option to be active, or inactive, or the attributes of the
group membership could be different. Consult your LDAP server
documentation and schema to confirm how group membership must be
checked.

For pfSense to see a group from LDAP, a local group must exist on
pfSense with an identical name to the group on the LDAP server.
