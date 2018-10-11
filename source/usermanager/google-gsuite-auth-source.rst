.. include:: /substitutions.rsti

Configuring Google Cloud Identity as an Authentication Source
=============================================================

`Google Cloud Identity LDAP service`_ can be used to authenticate users on
pfSense software installations.

The method varies depending on the version of pfSense software installed on the
firewall. This is due to the fact that Google Cloud Identity requires a client
certificate to make a secure LDAP connection.

* Firewalls running pfSense factory software version 2.4.4-RELEASE-p1 or later
  can use a client certificate directly on LDAP authentication sources.
* Firewalls running pfSense CE or pfSense factory software version 2.4.4-RELEASE
  require the stunnel package to make a secure LDAP connection.

Configuring a firewall running pfSense software to use GSuite LDAP
authentication requires a number of steps, all of which are covered in this
document.

.. contents:: Configuring GSuite LDAP
   :depth: 1
   :local:

Configure the LDAP Application on the GSuite admin portal
---------------------------------------------------------

Follow the instructions from Google for `configuring and enabling the GSuite
LDAP application`_.

.. warning:: **Follow these directions exactly**. No special provisions are
   required for pfSense, but please note that the LDAP application credentials
   (username and password) **are required**.

Download the certificate, key, username and password
----------------------------------------------------

Download the certificate, key, username and password from GSuite to a local
directory on a workstation.

Import the certificate and key
------------------------------

From the web interface of a firewall running pfSense:

* Navigate to **System > Cert manager**, **Certificates** tab
* Click |fa-plus| **Add/Sign** to display the certificate import interface
* Change **Method** to *Import an existing certificate*
* Enter a **Descriptive name**, such as ``GSuite LDAP``
* Copy and paste the contents of the downloaded certificate into the
  **Certificate data** box
* Copy and paste the contents of the downloaded key into the **Private Key
  data** box
* Click "Save"

The certificate is now available for use by the firewall.

The next step depends on the version of pfSense software installed on the
firewall.

For pfSense CE or pfSense factory software version 2.4.4-RELEASE, the stunnel
package is necessary to make a secure LDAP connection. For these environments,
proceed to :ref:`gsuite-ldap-stunnel`.

For users of pfSense factory software version 2.4.4-RELEASE-p1 or later, LDAP
authentication sources can use a client certificate directly. Skip ahead to
:ref:`gsuite-ldap-server`.

.. _gsuite-ldap-stunnel:

Install the stunnel pfSense package (CE or 2.4.4-RELEASE)
---------------------------------------------------------

From the web interface on pfSense:

* Navigate to **System > Package manager**, **Installed Packages** tab
* Check the list for **stunnel** and if it is listed as installed
* If the package is installed and up-to-date, with a version of **5.37** or
  later, no action is required
* If the package is installed but out of date

  * Update the package by clicking |fa-refresh| for the **stunnel** entry
  * Click |fa-check| **Confirm** to confirm the package update

* If **stunnel** is not installed

  * Navigate to the **Available packages** tab
  * Locate the **stunnel** package in the list, or use the search bar
  * Click |fa-plus| **Install** for the **stunnel** package entry
  * Click |fa-check| **Confirm** to confirm the package installation

Configure the stunnel package (CE or 2.4.4-RELEASE)
---------------------------------------------------

From the web interface on pfSense:

* Navigate to **Services > STunnel**
* Click |fa-plus| **Add** to create a new profile
* Enter a ***Description** for this connection, such as ``GSuite``
* Check **Client Mode**
* Set **Listen on IP** to ``127.0.0.1``
* Set **Listen on port** to ``1636``
* Set the **Certificate** to the entry imported previously, in this case *GSuite
  LDAP*
* Set **Redirects to IP** to ``ldap.google.com``
* Set **Redirects to port** to ``636``
* Click **Save**

.. _gsuite-ldap-server:

Configure LDAP authentication on pfSense
----------------------------------------

From the web interface on pfSense:

* Select **System > User manager**, **Authentication servers** tab
* Click |fa-plus| **Add** to create a new entry
* Enter a **Descriptive name** for this LDAP server, such as ``GSuite``
* Set **Type** to *LDAP*
* The server settings depend on the pfSense software version installed on the
  firewall:

  * For pfSense Factory version 2.4.4-RELEASE-p1 or later:

    * Set the **Hostname or IP address** to ``ldap.google.com``
    * Set **Port value** to ``636``
    * Set **Transport** to *SSL - Encrypted*
    * Set **Peer Certificate Authority** to *Global Root CA List*
    * Set *Client Certificate* to the entry imported previously, in this case
      *GSuite LDAP*

  * For pfSense CE or factory version 2.4.4-RELEASE using stunnel:

    * Set the **Hostname or IP address** to ``127.0.0.1``
    * Set **Port value** to ``1636``
    * Set **Transport** to *TCP-Standard*

* Set **Protocol version** to *3*
* Set **Server timeout** = ``25``
* Set **Search scope** to *Entire tree*

The next few settings are **UNIQUE TO THE DOMAIN**. For this example, assume
that is ``example.com``.

.. warning:: Substitute the actual domain when entering these values!

* Set **Base DN** to the domain name in DN format, for example
  ``dc=example,dc=com``
* Set **Authentication containers** to the **Base DN** prepended by the
  ``Users`` organizational unit, for example: ``ou=Users,dc=example,dc=com``
* **Uncheck** the **Bind anonymous** box to show the **Bind Credentials** fields
* Set **Bind credentials** to the GSuite LDAP username and password that were
  created with the certificate and key

The remaining attributes are not specific to the domain, or are defaults

* Set **User naming attribute** to ``uid``
* Set **Group naming attribute** to ``cn``
* Set **Group member attribute** to ``memberOf``

Create a Group
--------------

Using a remote authentication server to manage administrative logins to services
on pfSense requires a matching group to be present on both the authentication
source server and on the firewall. The existing ``admins`` group could be used,
but since the name is so general it may conflict with other desired permissions
in GSuite.

This example uses a new group called ``fwadmins``.

First, create the ``fwadmins`` group in GSuite and assign users to the group.
The exact details will vary based on the domain and its organization.

Next, create a group on the firewall running pfSense software. This does not
require local users, only a group entry. The group entry must have appropriate
permissions.

To create the group on pfSense:

* Navigate to **System > User Manager**, **Groups** tab
* Click |fa-plus| **Add** to make a new group
* Enter the **Group name**, in this example: ``fwadmins``
* Set the **Scope** to *Remote*
* Enter a **Description**, such as **Remote Firewall Administrators**
* Click **Save**

Now the group needs privileges:

* Click |fa-pencil| on the row for the newly created group
* Click |fa-plus| **Add** in the **Assigned Privileges** section
* Select the desired permissions for the group, for example: ``WebCfg - All
  pages``

  .. warning:: **Do not select every item** in this list! Doing so will also
     select the ``User - Config: Deny Config Write`` privilege which will
     prevent users in this group from making changes to the firewall
     configuration.

* Click **Save** to store the privileges

Test GSuite Authentication
--------------------------

With the complete configuration described above, it is now possible to
authenticate against Google GSuite LDAP. First, test the authentication to
ensure it is working properly.

* Navigate to **Diagnostics > Authentication**
* Set the **Authentication server** to the name used for the LDAP Server entry,
  such as *GSuite*
* Enter a known username and password on the domain that GSuite controls

  .. note:: By default only the username part of the login is checked against
     the configured LDAP base DN. If a username is submitted with a domain part,
     for example ``user@example.com``, the ``@example.com`` part is ignored.

* Click |fa-wrench| **Test**

The user should show as authenticating successfully, and if the user entered is
a member of the ``fwadmins`` group in GSuite, that should also be reflected in
the test output.

If the test succeeds, the service is ready for use. pfSense can use it as an
authentication source for the GUI, for VPNs, or anywhere the user manager
authentication servers work.

If the test fails, check the main system log for error messages from LDAP.
Start from the beginning of this document and compare all settings between this
document, GSuite, and pfSense. Most common problems are with parameters being
input incorrectly, such as selecting the wrong certificate, using an incorrect
LDAP attribute name, or not using correct bind credentials.

Use GSuite for pfSense Administrative Logins
--------------------------------------------

If all is well and the user authenticated as expected:

* Navigate to **System > User manager**, **Settings**
* Set the **Authentication server** to *GSuite*
* Click **Save**

After saving, firewall users will be authenticated against Google Cloud
Identity.

.. note:: pfSense will automatically fall back to local authentication if it
   cannot authenticate using the chosen LDAP server.


.. _configuring and enabling the GSuite LDAP application: https://support.google.com/cloudidentity/answer/9048516
.. _Google Cloud Identity LDAP service: https://cloud.google.com/blog/products/identity-security/simplifying-identity-and-access-management-for-more-businesses
