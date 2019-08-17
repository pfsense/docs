Configuring a Captive Portal Zone
=================================

When creating a captive portal zone, multiple settings can be edited : 


Avaliable timeouts
------------------

Captive portal has 3 integrated timeout options :

:**Idle timeout**: Users will automatically disconnected after a defined amount of network inactivity.
  The "last activity time of each user" is retrived using the last byte sent by each device. 
  (meaning last byte "uploaded" from the user perspective)
:**Hard timeout**: Users will be automatically disconnected after a defined time period, whether or not they are active.
:**Traffic quota**: Users will be automatically disconnected after exceeding a defined amount of combined upload and download transfer data.


If one of these options is enabled, pfSense will check once per minute to find users that meet criteria for disconnection.
The way pfSense works is that a scheduled task (cron) will run every minute, checking for users to disconnect.

.. tip:: These options disconnect users but they do not prevent users from immediately logging in again.
 To prevent users from logging in again, use a RADIUS server for authentication with appropriately configured limits. See :ref:`label-radius-server`

Authentication methods
----------------------

Four authentication methods are avaliable on pfSense :

:Don't authenticate users: All users will be redirected to the captive portal
  login page but will get connected as soon as they click **Login**. this is useful for
  displaying a welcome page, or forcing users to see general terms and conditions.
:Use an authentication server from the user manager: See :ref:`label-user-manager` for more information.
:Use RADIUS MAC Authentication: This authentication method emulate 802.1X, allowing some MAC addresses to get automatically connected.
:Use vouchers: Please see :doc:`captive portal vouchers <captive-portal-vouchers>` page for details.


Vouchers can be used in parallel with any authentication method, allowing for example
login/password authentication for employees, and voucher auth for others users.


.. _label-user-manager:

Use an authentication server from the user manager
--------------------------------------------------

It is possible to authenticate users against a server from the server manager, such as an LDAP or RADIUS server.
please check the user manager documentation for details on how to setup remote authentication servers in pfSense.

remote authentication server have to be setup first in the server manager before being able to use it for captive portal authentication.


Special note about "unauthenticated" username
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When using an authentication server, it is recommanded to block/reserve the username "unauthenticated", in order to prevent users to connect using this username.
This can be done by registering a disabled account in the remote authentication server (recommanded when using LDAP) or by preventing this user to login (recommanded when using a RADIUS server).

This username is used internally in pfSense for defining an user not yet authenticated, or for defining connected users when using "no authentication" method and no username has been provided. for this reason, this username is given special rights, such as bypassing "block concurrent logins" option.


.. _label-radius-server:

Authenticating captive portal users using a RADIUS server
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When using an external RADIUS server (such as FreeRADIUS) to authenticate users, it is possible to set
some attributes in the RADIUS Access-Accept response that will be understood by pfSense,
in order to fine-tune the how the captive portal will will behave for each user.

.. tip:: pfSense's RADIUS dictionary may not be included by default in your RADIUS server configuration.
 FreeRADIUS dictionary is available `here`_. for other RADIUS servers, please contact your vendor.

:Individual traffic quota:
 An individual traffic quota may be defined for each user, using ``pfsense-max-total-octets``.

 This attribute should contain, as the name imply, an integer defining the maximum amount of
 data an user could spend before getting disconnected.

 This attribute may override the value defined in the captive portal configuration, if any.

:Individual time limits:
 Custom time limits may be defined using two RADIUS attributes, when connecting an user :

 - ``session-timeout`` attribute will set a custom "hard timeout" for this user.
 - ``idle-timeout`` attribute will set a custom "idle timeout" for this user.
 
 Both values have to be provided in seconds, and may override the value defied in the captive portal configuration, if any.

:Individual bandwith:

 An individual bandwidth may be set for upload and download for each user, 
 using the following RADIUS attributes :

 - ``pfsense-bandwidth-max-up``
 - ``pfsense-bandwidth-max-down``

 These attributes may override the bandwith defined in the captive portal configuration, if any.

 The value of these attributes have to be written in bits per seconds.
 Also, pfSense will assume that 1000 bits = 1kbps when applying these 
 settings (eg, defining `pfsense-bandwidth-max-up = 512000` for one user will limit the 
 user's upload bandwith to 512 kbit/s).


:Custom redirection url:
 A custom redirection url may be defined in ``wispr-redirection-url`` attribute.
 Users will be redirected to this url after a successfull authentication.

 This attribute may override the forced redirection url defined in the captive portal configuration, if any.


Authenticating captive portal users using RADIUS MAC Authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FreeRADIUS and captive portal may be used to authenticate users using
their MAC address, thus performing pseudo 802.1x.

This authentication method is not *true 802.1x* because users will still need to make an http request
in order to get connected. when this authentication method is enabled, the captive portal will try to
authenticate users against the RADIUS server every time an HTTP request is made.

It is possible, although not recommanded, to display the login page as fallback when authentication failed.
It is possible this way to have MAC authentication and login/password authentication altogether,
both authenticating against the same RADIUS server.


Please keep in mind that this authentication method may generate a lot of RADIUS requests, and does
not scale very well.


RADIUS accounting
-----------------

When using a RADIUS server for authentication, it is possible for pfSense 
to send RADIUS accounting messages containing various informations about
each users such as their IP addres, MAC address, login time and amount of uploaded/downloaded data.

pfSense can send 3 type of accounting messages :

:acct-status-type\: start: These messages will report when an user get connected.
:acct-status-type\: stop: These messages will report when an user get disconnected.
:acct-status-type\: interim-update: If enabled, these messages will be sent every minute, updating data on the RADIUS server.
 It is recommended to use **interim** accounting update method. others methods (**stop/start** 
 and **stop/start FreeRADIUS**) are deprecated and should not be used.


General note when using captive portal with FreeRADIUS
------------------------------------------------------

FreeRADIUS Simultaneous-Use and Captive Portal re-authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For obvious reasons, **Simultaneous-Use** is not compatible with "Reauthenticate users" option.
We recommand not using **Simultaneous-Use** in your FreeRADIUS config if you wish to use users re-authentication.


FreeRADIUS Package
~~~~~~~~~~~~~~~~~~

A :doc:`FreeRADIUS package </packages/freeradius-package>` is avaliable on pfSense, it is possible to use it to perform authentication locally.


.. _here: https://github.com/FreeRADIUS/freeradius-server/blob/master/share/dictionary/radius/dictionary.pfsense
