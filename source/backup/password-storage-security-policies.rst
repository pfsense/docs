.. include:: /substitutions.rsti

Password Storage Security Policies
==================================

PPPoE/PPTP client, PPTP VPN, DynDNS passwords as well as remote
authentication servers RADIUS (shared secret), LDAP (bind user
password), and IPsec shared secrets appear in plaintext in *config.xml*,
or with reversible Base64 encoding. This is a deliberate design decision
in m0n0wall that has been carried over here. The implementations of PPP,
IKE, RADIUS and the way DynDNS works require plaintext passwords to be
available. We could of course use some snake oil encryption on those
passwords, but that would only create a false sense of security. Since
we cannot prompt the user for a password each time a PPP session is
established or the DynDNS name needs to be updated, etc. any encryption
we apply to the passwords can be reversed by anyone with access to the
pfSense sources - i.e. everybody. Hashes like MD5 cannot be used where
the plaintext password is needed at a later stage, unlike for the system
password, which is only stored as a hash.

By leaving the passwords in plaintext, it is made very clear that
*config.xml* deserves to be stored in a secure location (and/or
encrypted with one of the countless programs out there). Any sort of
hashing used would not be secure, and would be dangerous because it
would give the impression of security where none exists.

