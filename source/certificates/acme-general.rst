Rate Limits
-----------

Let's Encrypt `enforces rate limitations`_ when using the production validation
system, such as:

* Five validation failures per account, per hostname, per hour
* Each certificate may have at most 100 SAN entries
* Only 20 certificates may be created per domain per week

A testing validation system exists for those who are programming clients or
testing their procedures. The test system `has higher limits`_, which is better
for testing and development, but also does not produce certificates which are
trusted publicly.

Security Limitations
--------------------

When validating using a method such as webroot or standalone the service must be
available to the Internet on its standard port: 80 for HTTP. This is a security
limitation to prevent a user from running an alternate web server on a high-
numbered port and obtaining a certificate for a server they do not normally
control.

.. warning:: In the past, ACME supported validation using TLS on port 443, but
   inherent limitations in that process made it insecure, so Let's Encrypt has
   deprecated that method.

Validation Process
------------------

When creating a certificate, one or more fully qualified domain names (FQDNs)
are listed on the certificate in the SAN list. Let's Encrypt will query each of
these domain names in DNS in different ways depending on the validation method.

When a validation method starts, the client obtains an authorization value from
the server (authz).

For DNS-based methods, Let's Encrypt checks for a TXT record in the form of
``_acme-challenge.<domain name>`` which must contain the authorization value.
This proves that the person or system requesting the certificate controls DNS
records for the domain.

For File-based methods such as webroot or standalone, Let's Encrypt connects to
an IP address obtained by resolving the A record for the FQDN and requests a
file from the web server at ``.well-known/acme-challenge/`` underneath the
webroot directory. This file contains the authorization value. This proves that
the person or system requesting the certificate controls web server for the
domain name.

.. _enforces rate limitations: https://letsencrypt.org/docs/rate-limits/
.. _has higher limits: https://letsencrypt.org/docs/staging-environment/