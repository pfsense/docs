.. include:: /substitutions.rsti

ACME package
============

`Let's Encrypt <https://letsencrypt.org/>`__ is an open, free, and
completely automated Certificate Authority from the non-profit `Internet
Security Research Group (ISRG) <https://letsencrypt.org/isrg/>`__. The
goal of Let's Encrypt is to encrypt the web by removing the cost barrier
and some of the technical barriers that discourage server administrators
and organizations from obtaining certificates for use on Internet
servers, primarily web servers. `Most
browsers <https://letsencrypt.org/docs/certificate-compatibility/>`__
trust certificates from Let's Encrypt. These certificates can be used
for web servers (HTTPS), SMTP servers, IMAP/POP3 servers, and other
similar roles which utilize the same type of certificates.

The ACME Package, available for pfSense firewalls running version
2.3.2-p1 and later, interfaces with Let's Encrypt to handle the
certificate generation, validation, and renewal processes.

Certificates from Let's Encrypt are domain validated, and this
validation ensures that the system requesting the certificate has
authority over the server in question. This validation can be performed
in a number of ways, such as by proving ownership of the domain's DNS
records or hosting a file on a web server for the domain.

By using a certificate from Let's Encrypt for a web server, including
your firewall, the browser will trust the certificate and show a green
check mark, padlock, or similar indication. The connection will be
encrypted without the need for manually trusting an invalid certificate.

Let's Encrypt certificates are valid for a period of 90 days, so they
need to be renewed periodically. The package can automate this renewal
by using a cron job to check once per day to see if a certificate needs
to be renewed.

Rate Limits
-----------

Let's Encrypt enforces some rate limitations when using the production
validation system, such as:

-  Each certificate may have at most 100 SAN entries
-  Only 20 certificates may be created per domain per week

A testing validation system exists for those who are programming clients
or testing their procedures. The test system does not have rate limits,
but also does not produce certificates which are trusted publicly.

Security Limitations
--------------------

When validating using a method such as webroot or standalone the service
must be available to the Internet on its standard port: 80 for HTTP, 443
for HTTPS. This is a security limitation to prevent a user from running
an alternate web server on a high-numbered port and obtaining a
certificate for a server they do not normally control.

Validation Process
------------------

When creating a certificate, one or more fully qualified domain names
(FQDNs) are listed on the certificate in the SAN list. Let's Encrypt
will query each of these domain names in DNS in different ways depending
on the validation method.

When a validation method starts, the client obtains an authorization
value from the server (authz).

For DNS-based methods, Let's Encrypt checks for a TXT record in the form
of *_acme-challenge.* which must contain the authorization value. This
proves that the person or system requesting the certificate controls DNS
records for the domain.

For File-based methods such as webroot or standalone, Let's Encrypt
connects to an IP address obtained by resolving the A record for the
FQDN and requests a file from the web server at
*.well-known/acme-challenge/* underneath the webroot directory. This
file contains the authorization value. This proves that the person or
system requesting the certificate controls web server for the domain
name.

Obtaining a Certificate
-----------------------

Generate an Account Key
^^^^^^^^^^^^^^^^^^^^^^^

Before a certificate can be created by the firewall, the firewall must
first obtain an account key. This key is typically unique for each
server.

For users unfamiliar with Let's Encrypt, the first key should be for the
staging system which has no rate limits but is not valid for public use.
Once a certificate is successfully issued from the staging system,
create an account key for the production system and then issue the
certificate again.

To create an account key:

-  Navigate to **Services > ACME Certificates**, **Account Keys** tab
-  Click + **Add**
-  Fill in the info

   -  **Name**: A short name for the key
   -  **Description**: A longer bit of text describing the key
   -  **ACME Server**: Use staging for testing, production for real
      certificates
   -  **Account Key**: This will be filled in by the create action

-  Click + **Create new account key**
-  Click **Register acme account key**
-  Click **Save**

Create a certificate
^^^^^^^^^^^^^^^^^^^^

-  Navigate to **Services > ACME Certificates**, **Certificates** tab
-  Click + **Add**
-  Fill in the info

   -  **Name**: A short name for the certificate
   -  **Description**: A longer bit of text describing the certificate
   -  **Status**: Active
   -  **Acme Account**: Choose the account key made previously
   -  **Key Size**: *2048* is a good choice
   -  **Domain SAN List**: Depends on the chosen method (see other
      sections)

      -  A certificate can contain up to 100 SAN entries, and they can
         use the same or different update methods. Each SAN must be
         individually validated by Let's Encrypt before a certificate
         will be issued.

   -  **DNS-Sleep**: Leave blank unless a DNS method needs more time to
      take effect
   -  **Actions List**: Command to run after a certificate is renewed.
      Depends on the purpose of the certificate.

      -  **Mode**: Enabled
      -  **Command**: Full path to command and arguments, service name,
         name of script
      -  **Method**: How the Command is executed

   -  **Cert Renewal After**: When to attempt a renewal for the
      certificate. Default is 60 days (2 months). Certificates are valid
      for 90 days.

Validation Methods
------------------

Let's Encrypt can validate by checking the contents of a TXT record in
DNS, or by fetching a file in a known location from a web server running
on the hostname it is validating.

nsupdate
^^^^^^^^

The ``nsupdate`` method uses RFC2136 style DNS updates to populate a TXT
record in DNS to validate ownership of the domain.

We recommend using this method as it does not require external inbound
access, so it can be used for internal systems that do not allow or
cannot receive Internet traffic.

Before starting, an appropriate DNS key and settings must be in place in
the DNS infrastructure for the domain to allow the host to update a TXT
DNS record for *_acme-challenge.*.

To use this method:

-  Add a SAN Entry
-  **Mode**: Enabled
-  Enter domain name (e.g. *myhost.example.com*)
-  Choose **Method** *DNS-Nsupdate*
-  Click + to expand the method-specific settings
-  Fill in the info

   -  The package assumes the key name *_acme-challenge.*
   -  **Server**: The IP address or hostname of the DNS server
   -  **Key Type**: The type of update key to use (Typically Host)
   -  **Key Algorithm**: The algorithm used for the key
   -  **Key**: The update key for this record

-  Click **Save**
-  Click **Issue/Renew**

DNS-Manual
^^^^^^^^^^

The manual DNS method can be utilized when a firewall cannot receive
inbound traffic and it does not have access to any automatic DNS-based
method.

The *manual* in the name indicates that the process must be performed by
hand initially and when it is time to renew the certificate. The
firewall obtains the authorization value and then the TXT record must be
manually created or updated with this value.

We do not recommend using this method unless no other method is
available for a firewall.

To use this method:

- Add a SAN Entry
- **Mode**: Enabled
- Enter domain name (e.g. *myhost.example.com*)
- Choose **Method** *DNS-Manual*
- Click **Save**
- Click **Issue**
- Locate the record info in the output::

    [Mon Feb 6 14:49:23 EST 2017] Add the following TXT record:
    [Mon Feb 6 14:49:23 EST 2017] Domain: '_acme-challenge.www.example.com'
    [Mon Feb 6 14:49:23 EST 2017] TXT value: 'xPrykHSri5epT5yrJJWyY536Z1T51r_Ef4LkWJry-iw'
    [Mon Feb 6 14:49:23 EST 2017] Please be aware that you prepend _acme-challenge. before your domain
    [Mon Feb 6 14:49:23 EST 2017] so the resulting subdomain will be: _acme-challenge.www.example.com
    [Mon Feb 6 14:49:23 EST 2017] Please add the TXT records to the domains, and retry again.

- Add or update the TXT record in the domain's DNS server for
  *_acme-challenge.* with the TXT value from the output
- Wait ~2+ minutes for DNS to propagate
- Click **Renew**

Other DNS Methods
^^^^^^^^^^^^^^^^^

The package contains several other DNS-based methods for other
providers. These work similar to the nsupdate method above, but have
configuration values specific to each provider. Contact the DNS provider
or server administrator to obtain the necessary settings or credentials.

FTP Webroot
^^^^^^^^^^^

The **FTP webroot** method is useful when the firewall is performing NAT
(port forward or 1:1) or reverse proxy duty for handling traffic for the
domain. The firewall can use SFTP or FTPS to store the domain validation
files on a web server behind the firewall so it does not have to host
the files itself.

We recommend using this method when no DNS update method is available
for use by the firewall.

To use this method:

-  Add a SAN Entry
-  **Mode**: Enabled
-  Enter domain name (e.g. *myhost.example.com*)
-  Choose **Method** *webroot FTP*
-  Click + to expand the method-specific settings
-  Fill in the required info:

   -  **Server**: e.g. *sftp://x.x.x.x*

      -  This method supports supports ftps:// and sftp:// servers

   -  **Username/password**: Credentials for the SFTP/FTPS account
   -  **Folder**: Full path to the target directory including
      /.well-known/acme-challenge at the end

      -  Make sure the specified user has write permissions to the
         directory!

-  Click **Save**
-  Click **Issue/Renew**

Webroot Local Folder
^^^^^^^^^^^^^^^^^^^^

This method works similar to FTP Webroot but with the files hosted on
the firewall itself. This method cannot be utilized by the WebGUI web
server as that would mean exposing the GUI to the Internet, which is a
major security issue.

This method can, however, be used in conjunction with the HAProxy
package to host the files on the firewall itself in some circumstances.
See https://forum.pfsense.org/index.php?topic=101186.msg690924#msg690924
for details.

Standalone
^^^^^^^^^^

The **Standalone** method runs a small web server natively that is only
active while the validation process is running.

This service **must** be accessible using port 80 for HTTP or port 443
for TLS for security reasons!

If the firewall is using port 80 or 443 for another service, such as the
WebGUI, then this method may not be viable. If the service on the port
is public, then it cannot be used. If the service is private, then it
may be possible to relocate the existing service or bind the update
method to an alternate port, then port forward on the WAN interface. The
standalone binding should only be changed if the port is forwarded via
NAT to a different port (e.g. 80 forwarded to 8080)

A firewall rule must allow traffic to the target port at all times, it
cannot be automatically enabled and disabled in the current package. If
port 80 is used by the standalone service, the WebGUI redirect must be
disabled on **System > Advanced** using the **Disable webConfigurator
redirect rule** option. If the redirect is active when standalone mode
attempts to use the port, it will print an error message stating that nc
is unable to bind to the port.

We do not recommend using this method as it exposes a service on the
firewall to the Internet. Only use this method if no other method is
available.

To use this method:

-  Add a SAN Entry
-  **Mode**: Enabled
-  Enter domain name (e.g. *myhost.example.com*)
-  Choose **Method** *standalone HTTP server* or *standalone TLS server*
-  Click + to expand the method-specific settings
-  Fill in the port number when using a non-default port

   -  *80* = HTTP, *443* = TLS

-  Click **Save**
-  Click **Issue/Renew**

