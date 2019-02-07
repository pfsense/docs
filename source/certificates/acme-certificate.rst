Obtaining a Certificate
-----------------------

.. _acme-generate-key:

Generate an Account Key
^^^^^^^^^^^^^^^^^^^^^^^

Before a certificate can be created by the firewall, the firewall must first
obtain an account key. This key is typically unique for each server, but can
be shared.

For users unfamiliar with Let's Encrypt, the first key should be for the staging
system which has no rate limits but is not valid for public use. Once a
certificate is successfully issued from the staging system, create an account
key for the production system and then issue the certificate again.

To create an account key:

* Navigate to **Services > ACME Certificates**, **Account Keys** tab
* Click |fa-plus| **Add**
* Fill in the info:

   :Name: A short name for the key
   :Description: A longer bit of text describing the key
   :ACME Server: Use staging for testing, production for real certificates. ACME
     v2 servers are required for wildcard certificates.
   :E-Mail Address: An e-mail address which Let's Encrypt will use to send
     certificate expiration notices if they are not renewed in a timely manner.
   :Account Key: This will be filled in by the create action

* Click |fa-plus| **Create new account key**
* Click |fa-key| **Register acme account key**
* Click **Save**

.. _acme-create-certificate:

Create a certificate
^^^^^^^^^^^^^^^^^^^^

* Navigate to **Services > ACME Certificates**, **Certificates** tab
* Click |fa-plus| **Add**
* Fill in the info

   :Name: A short name for the certificate
   :Description: A longer bit of text describing the certificate
   :Status: Active
   :Acme Account: Choose the account key made previously (see :ref:`acme-generate-key`)
   :Private Key: *2048* is a good choice, or select *Custom* to manually enter
     a private key generated elsewhere.
   :Domain SAN List: Depends on the chosen method (see :ref:`acme-validation-methods`)

     .. note:: A certificate can contain up to 100 SAN entries, and they can use
        the same or different update methods. Each SAN must be individually
        validated by Let's Encrypt before a certificate will be issued.

   :DNS-Sleep: Leave blank unless a DNS method needs more time to take effect
   :Actions List: Command to run after a certificate is renewed. Depends on the
     purpose of the certificate.

     :Mode: Enabled
     :Command: Full path to command and arguments, service name, name of script
     :Method: How the Command is executed

   :Cert Renewal After: When to attempt a renewal for the certificate. Default
     is 60 days (2 months). Certificates are valid for 90 days.
* Click **Save**
