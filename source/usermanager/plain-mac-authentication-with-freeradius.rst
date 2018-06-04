.. include:: /substitutions.rsti

Plain MAC Authentication with FreeRADIUS
========================================

Using Plain MAC Auth (other than 802.1x) with the :doc:`FreeRADIUS 2.x package </usermanager/freeradius-2-x-package>`

When should Plain MAC Auth be used?
-----------------------------------

State of the art NAS (switches) can do 802.1X and MAC auth. When using
802.1X the NAS sends an Access-Request with username and password to the
RADIUS. This is what is entered in **FreeRADIUS > Users**. These NAS
often support the ability to put the Calling-Station-Id (MAC) of hosts
into the username and password field. This can be entered in
**FreeRADIUS > Users**, too.

But older NAS equipment is not able to do 802.1X but only Plain MAC
Auth. These NAS can not send any username and password but only the
Calling-Station-Id. FreeRADIUS Package is able to perform first a check
against a list of MACs (authorized\_macs) and if this fails then do a
check against all the other modules like CHAP, EAP and so.

I would advise to only enable plain MAC auth if absolutely necessary.
This will make processing of requests faster. This chapter is based on
`this <http://wiki.freeradius.org/Mac-Auth>`__ page.

How to enable Plain MAC Auth
----------------------------

-  Check **FreeRADIUS > Settings**, **Enable Plain MAC Auth** to enable
   plain MAC auth
-  Add a MAC address by visiting **FreeRADIUS > MACs**. The format must
   be *aa-bb-cc-11-22-33*
