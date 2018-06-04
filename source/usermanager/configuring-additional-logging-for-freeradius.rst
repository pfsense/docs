.. include:: /substitutions.rsti

Configuring Additional Logging for FreeRADIUS
=============================================

How to get additional logging detail from the :doc:`FreeRADIUS 2.x package </usermanager/freeradius-2-x-package>`.

It is possible to add additional logging information if a user
authenticates with correct or incorrect credentials. Instead of **Login:
OK** or **Login: incorrect** any FreeRADIUS attribute may be added. So
it is able to get the remaining daily amount of time a user has, the
Bandwidth the user is limited to or the IP address. Here is an example
and how it looks afterwards in syslog.

-  **FreeRADIUS > Settings**: Enable logging, good attempts and/or bad
   attempts

   -  Edit: **Additional information for bad attempts**
   -  Edit: **Additional information for good attempts**

``Host IP-Address: %{Framed-IP-Address} accepted using Auth-Type: %{control:Auth-Type} Remaining volume down/up: %{reply:Acct-Output-Octets}/%{reply:Acct-Input-Octets} Remaining online-time: %{reply:Session-Timeout} Maximum simultaneous connections: %{check:Simultaneous-Use} Bandwidth down/up: %{reply:WISPr-Bandwidth-Max-Down}/%{reply:WISPr-Bandwidth-Max-Up}``

This is how it looks in syslog:

``radiusd[51547]: Login OK: [myuser/mypass] (from client captiveportal port 35 cli 00:04:23:5c:9d:19) Host IP-Address: 192.168.0.98 accepted using Auth-Type: PAP Remaining volume down/up: 1787444/979428 Remaining online-time: 7174 Maximum simultaneous connections: 2 Bandwidth down/up: 1000000/128000``

`This <http://freeradius.org/radiusd/doc/variables.txt>`__ may help with
syntax: It must be specified if the value of an attribute is in a
*request* or a *reply* or something else. *Outer.request* is for
EAP-TTLS or PEAP.

-  %{request:Attribute-Name}
-  %{reply:Attribute-Name}
-  %{check:Attribute-Name}
-  %{control:Auth-Type}
-  %{outer.reqest:User-Name}
