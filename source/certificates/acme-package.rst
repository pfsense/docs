.. include:: /substitutions.rsti

ACME package
============

`Let's Encrypt`_ is an open, free, and completely automated Certificate
Authority from the non-profit `Internet Security Research Group (ISRG)`_. The
goal of Let's Encrypt is to encrypt the web by removing the cost barrier and
some of the technical barriers that discourage server administrators and
organizations from obtaining certificates for use on Internet servers, primarily
web servers. `Most browsers`_ trust certificates from Let's Encrypt. These
certificates can be used for web servers (HTTPS), SMTP servers, IMAP/POP3
servers, and other similar roles which utilize the same type of certificates.

The ACME Package for pfSense interfaces with Let's Encrypt to handle the
certificate generation, validation, and renewal processes.

Certificates from Let's Encrypt are domain validated, and this validation
ensures that the system requesting the certificate has authority over the domain
in question. This validation can be performed in a number of ways, such as by
proving ownership of the domain's DNS records or hosting a file on a web server
for the domain.

By using a certificate from Let's Encrypt for a web server, including a firewall
running pfSense software, the browser will trust the certificate and show a
green check mark, padlock, or similar indication. The connection will be
encrypted without the need for manually trusting an invalid certificate.

Let's Encrypt certificates are valid for a period of 90 days, so they must be
renewed periodically. The ACME package automates this renewal by using a cron
job to check once per day to see if a certificate needs to be renewed.

.. toctree::
   :maxdepth: 2

   acme-general
   acme-certificate
   acme-validation
   acme-wildcard

.. _Let's Encrypt: https://letsencrypt.org/
.. _Internet Security Research Group (ISRG): https://letsencrypt.org/isrg/
.. _Most browsers: https://letsencrypt.org/docs/certificate-compatibility/
