.. include:: /substitutions.rsti

Using EasyRSA Certificates in 2.x
=================================

When upgrading from 1.2.3 to 2.0 the upgrade process will import
existing CA certificate(s), and the certificates entered into the boxes
for the OpenVPN clients/servers. It will not import the CA key or
certificates for remote access clients as those had no reference in the
1.2.3 pfSense GUI. If the old EasyRSA docs were followed, these should still be
in the old keys folder under */root/easyrsa4pfsense/keys*

If that folder is missing and there is no backup, then there is no way
to generate new certificates from this CA. If the files are backed up
somewhere, locate the backup the files within.

Assuming the files are present, Login to the shell, then run::

  # cat /root/easyrsa4pfsense/keys/ca.key
  -----BEGIN RSA PRIVATE KEY-----
  [...]
  -----END RSA PRIVATE KEY-----

That will show the existing CA key. Then from the GUI, go to **System >
Cert Manager**, find the imported CA, and click |fa-pencil| to edit. Copy/paste
that key (including the BEGIN/END lines into the **Key** field in the
GUI. Adjust the descriptive name if desired, it probably has a generic
name from the upgrade process. Do not click **Save** yet.

From the shell, run::

  # printf '%d\n' 0x`cat /root/easyrsa4pfsense/keys/serial`

That should return a decimal number, such as *11* - that's the serial
number of the next certificate to make. Copy that number into the GUI in
the **Serial** field, then click **Save**. It is important to correct
the serial number, otherwise two certificates can end up with the same
serial number, which will lead to problems with revocation down the
road. Certs are revoked by serial, two certs with the same serial would
both be revoked if either one of the two with the same serial is
revoked.

Now it is possible to create new certificates on the **Certificates**
tab of the Cert Manager in the GUI using this CA.

Any certificates for that CA in the GUI should also show up for use
within the :doc:`/vpn/openvpn/using-the-openvpn-client-export-package`. To have the old certificates
to show up there, import them from easyrsa also. From the
**Certificates** tab, click |fa-plus|. Under method, choose *Import an
existing certificate*. Add a descriptive name (like the name of the
cert). Now to get that certificate and key, go back to the shell and
find the key in */root/easyrsa4pfsense/keys/*. For example::

  # cd /root/easyrsa4pfsense/keys/
  # ls -l tester*
  -rw-r--r-- 1 root staff 3739 Feb 3 2010 tester.crt
  -rw-r--r-- 1 root staff 688 Feb 3 2010 tester.csr
  -rw------- 1 root staff 887 Feb 3 2010 tester.key

Cat the *.crt* and *.key* files, copying them into the GUI box (just the
BEGIN/.../END block that includes the encoded version), then click
**Save**.

Repeat that last process for every key to import. It is not required to
have the user certificates in the GUI in order for clients to connect;
They need only be there for use with the client export package.
