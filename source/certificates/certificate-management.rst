Managing Certificates on pfSense
================================

pfSense® software includes a central **Certificate Manager** under
**System > Cert Manager**.

This central Certificate Management takes the place of several other
locations inside pfSense software, which used to require certificates
be entered directly into their configurations, such as for HTTPS SSL
access to the webGUI, OpenVPN PKI Certificate Management, and IPsec
Certificate management.

Certificate Authority
---------------------

Each set of certificates is bound to a **Certificate Authority**. These
are managed from the **CAs** tab.

When adding or editing a CA, existing CA may be imported or a new one
may be created.

To import, set the **Method** to *Import an existing Certificate
Authority* then paste the contents of the CA certificate into the
**Certificate data** box. If the CA will be used to create new
certificates or CRL entries on this firewall, the **Certificate Private
Key** must also be added. In that case, also set the **Serial for next
certificate** appropriately to avoid creating certificates with
duplicate serial numbers. Click **Save** when finished.

To generate a new CA, set the **Method** to *Create an internal
Certificate Authority*, fill out the required information and click
**Save**.

Certificates
------------

**Certificates** are managed on the **Certificates** tab.

The certificates and keys may also be downloaded from this list view:

:|fa-certificate|: Exports the certificate file.
:|fa-key|: Exports the private key for this certificate.
:|fa-archive|: Generates a PKCS#12 ``.p12`` file with the CA certificate, user
  certificate, and user key contained inside.

A certificate may be added using the following **Methods**:

-  **Import an existing Certificate** by pasting in the certificate and
   private key
-  **Create an internal Certificate** using a Certificate Authority
   defined on the CAs tab by choosing the appropriate CA and filling out
   the form
-  **Create a Certificate Signing Request** (CSR) for use with an
   external CA

Certificate Revocation Lists
----------------------------

**Certificate Revocation Lists** (CRLs) control which certificates are
valid for a given CA. If a Certificate becomes compromised in some way,
or is invalidated, it can be added to a CRL, and that CRL may be
selected for use by an OpenVPN server, and then an OpenVPN client using
that certificate will no longer be allowed to connect.

Certificate Revocation Lists are managed from the **Certificate Revocation**
tab.

First, add a new CRL for a given CA (|fa-plus|). A existing CRL may be
imported an CRL or a new CRL may be created. Imported CRLs cannot be
altered, as there is no way to add additional certificates. If a new CRL
is being created, it may be edited and certificates may be added to it
for revocation.

Finally, the CRL can be chosen for use by an OpenVPN server instance
(**VPN > OpenVPN**). The CA must be the same for the OpenVPN Server and
the CRL.

When a CRL is updated, the OpenVPN server will automatically pick up the
changes.
