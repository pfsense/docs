.. _acme-wildcard:

Wildcard Certificates
---------------------

Let's Encrypt supports wildcard certificates (e.g. ``*.example.com``) with their
ACMEv2 infrastructure. A wildcard certificate will work for any hostname inside
a given domain, which helps with handling certificates for multiple domains.

.. note:: Unrelated to ACME, but wildcard certificates in general: A wildcard
   only helps for **one level** of subdomains. For example, ``*.example.com``
   will work for ``host.example.com`` but will NOT work for
   ``host.sub.example.com``. If hosts are structured in this way, a wildcard
   certificate is required for each sub zone, e.g. ``*.sub.example.com``.

Wildcard validation **requires a DNS-based method** and works similar to
validating a regular domain. For example, to get a certificate for
``*.example.com``, the package updates a TXT record in DNS the same as it would
for ``example.com``, which means the DNS record (and potentially key name) would
be for ``_acme-challenge.example.com``.

To obtain a wildcard certificate, follow the same procedures as other DNS
validation methods, with the following differences:

* The **Account Key** must be registered with an ACME v2 server (staging for
  testing, or production)
* The **Domain SAN list** should contain entries for the base domain (e.g.
  ``example.com`` and the wildcard version of the same domain (e.g.
  ``*.example.com``. The settings will be the same for both entries.
* For *DNS-NSupdate / RFC 2136*: Set the **Key Name** to the base domain
  (``example.com``) for both entries.
