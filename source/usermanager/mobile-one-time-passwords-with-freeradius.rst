.. include:: /substitutions.rsti

Using Mobile One-Time Passwords with FreeRADIUS
===============================================

Using Mobile-One-Time-Password (mOTP) with the :doc:`FreeRADIUS 2.x package </usermanager/freeradius-2-x-package>`.

Enable Mobile-One-Time-Password (OTP) support
---------------------------------------------

This documentation will cover many parts from installation,
configuration, modification, and more from
`here <http://motp.sourceforge.net/>`__.

A one time password is a password which can be only used one time and
will be only usable within a short time period (10s). So it can be
compared with the handling of tokens from `RSA SecureID <http://en.wikipedia.org/wiki/SecurID>`__.

This kind of password generation makes sense in some scenarios but not
in all. It probably makes no sense to use these passwords in the office
- there shouldn't be any attacker. But the mOTP could make sense for
Road Warriors. Most of them use an state of the art mobile phone and a
notebook to connect to the company VPN. For more take a look at the
chapter below: *Miscellaneous configuration and hints*

pfSense configuration:

-  Enable Mobile-One-Time-Password in **FreeRADIUS > Settings**

This will install the script in */usr/local/bin/otpverify.sh*. To
execute the script we need the additional package *bash*. This will be
installed automatically.

FreeRADIUS configuration:

-  Create a user in **FreeRADIUS > Users**
-  Enter a **username** but **do not** enter any password!
-  Check **Enable Mobile-One-Time-Password For This User**
-  Enter the **Init-Secret**. The init-secret will be created on the
   client (mobile device, mobile phone)
-  Enter the **PIN**. Every time the user wants to generate a new
   password with his mobile token then he has to enter the PIN and then
   the token generates a one-time-password.
-  The **Offset** should be zero by default. If the mobile token is on
   another time zone than the FreeRADIUS server then correct the offset.
   If the mobile device changes its time zone automatically than there
   is no need to do this.

Miscellaneous configuration and hints:

-  The configuration for different mobile devices can be found
   `here <http://motp.sourceforge.net/#3.1>`__.
-  And `here <http://motp.sourceforge.net/#6>`__ is the software for
   mobile devices.
-  Please read the `limitations <http://motp.sourceforge.net/#5>`__ to
   make sure how secure this is.
-  mOTP will probably not work with EAP, CHAP, MSCHAP. If it does - tell
   me how :-)
-  A generated one-time-password can be used for ~20 seconds. For
   example the Windows token generator generates new tokens every ~10
   seconds. Perhaps other token generators use other timespans for
   generating tokens. FreeRADIUS and the OTP script accept tokens which
   were generated within the last 20 seconds.
