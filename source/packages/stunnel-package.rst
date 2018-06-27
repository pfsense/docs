.. include:: /substitutions.rsti

Stunnel package
===============

The `stunnel`_ program is designed to work as an SSL encryption wrapper
between remote client and local (inetd-startable) or remote servers. It
can be used to add SSL functionality to commonly used inetd daemons like
POP2, POP3, and IMAP servers without any changes in the program's code.

It will negotiate an SSL connection using the **OpenSSL** or **SSLeay**
libraries. It calls the underlying crypto libraries, allowing stunnel to
support whatever cryptographic algorithms were compiled into the crypto
package.

.. note:: The pfSense package implements only a subset of the configuration
   options available in stunnel. For more advanced configurations, please
   consider configuring stunnel manually on the pfSense host, run it in
   a dedicated jail, or on a different system.

The package has two configuration screens (tabs):

* Tunnel definitions
* Certificates

Tunnels
-------

For each tunnel, the following options are available:

* Listening socket IP address and port.
* Certificate to use for the listening socket.
* Target IP address and port.
* IP address to bind to when connecting to the target.

If no certificate is specified for a tunnel, the default certificate
will be used. This is a self-signed certificate which is generated upon
package (re)installation, and is not suited for production use.

Certificates
------------

Certificates are managed in the simplest possible way, by requiring the
user to provide RSA key and certificates/chains in PEM format. The
**Certificates** tab will list the configured certificates along with
status information, indicating whether the certificate is valid, will
expire soon, or is already expired. A sanity check is also performed to
make sure the key and certificate matches.

Note that for private certificates and certain commercial ones (Extended
Validation), a complete certificate chain may be required. This is to
ensure that the client is able to verify the certificate validity. A
chain should be built in the following way:

#. Root certificate of the certificate issuer/CA
#. Any intermediate certificates between the root and the server
   certificate
#. Server certificate

.. seealso:: Refer to the `stunnel documentation`_ for more information on how to format a
   certificate chain.

.. _stunnel: https://en.wikipedia.org/wiki/Stunnel
.. _stunnel documentation: https://www.stunnel.org/docs.html
