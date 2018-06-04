.. include:: /substitutions.rsti

Troubleshooting "login on console as root" Log Messages
=======================================================

Occasionally, the following messages may appear in the system log:

``login: login on console as root``

or

``login: login on ttyv0 as root``

This is normal. It means that the console menu stopped and restarted, or
someone pressed enter (didn't choose a menu option) at the console menu.
To suppress these messages, enable password protection for the console
login and then it will only login after authentication. If console
logins are already enabled, then this means someone logged into the
console.

To password protect the console:

-  Click **System > Advanced**
-  Find the **Console Options** section near the end of the page
-  Check **Password protect the console menu**
-  Click **Save**

