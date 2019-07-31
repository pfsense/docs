DH Parameters
=============

To put it simply, the DH parameters are extra bits of randomness that
help out during the key exchange process. They do not have to match on
both sides of the tunnel, and new DH parameters can be made at any time.
DH parameters are not specific to a given setup in the way that
certificates or keys are. There is no need to import an existing set of
DH parameters because generating new parameters is a better practice.

pfSense® software ships with a default set of DH parameter files so that
new firewalls do not have to spend significant CPU resources to build
them when they are needed. These pre-generated parameters are stored in
*/etc/dh-parameters.*. Selecting a specific length in the GUI will use
the DH parameter set from the corresponding file. These DH parameters
are not stored in config.xml.

To generate a new set of DH parameters, which can take quite a long time
depending on the hardware in use, run the following commands::

  /usr/bin/openssl dhparam -out /etc/dh-parameters.1024 1024
  /usr/bin/openssl dhparam -out /etc/dh-parameters.2048 2048
  /usr/bin/openssl dhparam -out /etc/dh-parameters.4096 4096

CPU time used to generate the parameters increases significantly with
length. For example, generating 1024-bit DH parameters only takes about
7 seconds on a C2758 CPU, but generating 2048-bit parameters takes 4
minutes, and generating 4096-bit parameters takes 10 minutes.

The pfSense webGUI will allow longer DH parameter to be selected if they
exist in /etc/ in the format specified above.

Supported lengths are: 1024, 2048, 3072, 4096, 7680, 8192, 15360, and
16384

For example, to generate a new set of DH parameters of length 8192, run::

  /usr/bin/openssl dhparam -out /etc/dh-parameters.8192 8192
