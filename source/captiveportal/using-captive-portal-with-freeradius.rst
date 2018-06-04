.. include:: /substitutions.rsti

Authenticating Captive Portal Users with FreeRADIUS
===================================================

Using Captive Portal with the
:doc:`FreeRADIUS 2.x package </usermanager/freeradius-2-x-package>`.

General configuration hints
---------------------------

There are some things that can be realized in FreeRADIUS and in Captive
Portal but which do not work together. So take attention when activating
the following things and make sure it works:

-  **Simultaneous-Use** and **Disable concurrent connections**:

   -  **Simultaneous-Use** must be set to a value from at least *2* or
      better leave it empty in FreeRADIUS.
   -  Check **Disable concurrent connections** on CP.

This will make sure that there could only be one connection with this
username/password.

-  **reauthenticate users every minute**:

   -  Enable this on CP so users will be disconnected if their **Amount
      of Time** or **Amount of Traffic** is reached.
   -  **Simultaneous-Use** must be set to a value from at least *2* or
      better leave it empty in FreeRADIUS.
   -  To effectively use this with limits, use **Interim** accounting
      updates.

-  **Bandwidth limits**:

   -  If bandwidth limits are set in FreeRADIUS then bandwidth limits
      must be enabled on CP. The field may be left empty, put in a zero
      or any other value. FreeRADIUS overwrites these value with the one
      set in **FreeRADIUS > Users**

-  **Traffic limits**:

   -  To set traffic limits in FreeRADIUS that can be tracked during
      sessions, enable **Interim** on Captive Portal Accounting Updates.
      **Stop/Start (FreeRADIUS)** can also be used, but the traffic
      counter only counts on accounting stop packets which in general
      will only be sent from NAS to FreeRADIUS when the client
      disconnects, so it is not useful during sessions but only to
      prevent future sessions.

-  **Wrong order** or **Logout but no login found** error messages in
   syslog:

   -  These messages may be ignored. This behaviour exists because CP
      sends some accounting and re-authentication attributes in a way so
      that FreeRADIUS thinks is incorrect. The problem is that it spams
      the system log but it does not limit functionality. Everything
      should work as desired. Give feedback if it doesn't or better
      provide a patch :-)

Accounting with Captive Portal
------------------------------

To use the **Amount of Time** options together with Captive Portal
*Acct\_unique* **must** be disabled in **FreeRADIUS > Settings**.

The **Acct\_unique module** tries to create a unique ID for an
accounting session but this does not work correctly when a user changes
NAS or NAS-Port and so on. Other NAS perhaps do need different
configuration but probably not.

Amount of Time
~~~~~~~~~~~~~~

There is a possibility to give a certain user an amount of time to use.
This can be done within a time period. For example a user should be able
to connect to the Internet for maximum 60 minutes every day but he can
use 20 minutes in the morning, 30 minutes at lunch time and the rest 10
minutes in the afternoon. If the user likes he can use all 60 minutes at
all. To use this, configure the following:

-  FreeRADIUS configuration:

   -  Disable **Acct\_unique** in **FreeRADIUS > Settings**
   -  Create a user with username and password **Services >
      FreeRADIUS**, **Users** tab
   -  Enter the **Amount of Time** in minutes and the time within the
      user can use this amount for example **daily**.
   -  The time rest will be the following:

      -  daily: Reset on 00:00:00 every day
      -  weekly: Reset on 00:00:00 on sunday
      -  monthly: Reset on 00:00:00 of the first day of each month
      -  forever: never (**IMPORTANT:** If this is set then this
         username will never ever be able to connect to this RADIUS
         server until the whole *db.\*forever* has been removed. So
         monthly is a better choice as maximum and set an expiration
         date for the account.

-  pfSense Captive Portal configuration:

   -  Enable **Services > Captive Portal**
   -  Enable **RADIUS Authentication** and configure for
      *authentication*
   -  Enable **send RADIUS accounting packets**
   -  Enable **Accounting updates > stop/start**
   -  Enable **Reauthenticate connected users every minute**

Now FreeRADIUS is counting the time the user is connected. To make sure
that the time is only counting when the user is connected, enable the
*Logout popup window* in CP to allow the user to disconnect or set the
**Session-Timeout** or **Idle-Timeout** or **Hard-Timeout** to an
adequate value.

The user gets reconnected every minute - if the limit of time is reached
- the user will be disconnected.

Amount of Traffic
~~~~~~~~~~~~~~~~~

It is possibile to give a user a certain amount of traffic (upload and
download is summatized). The configuration for FreeRADIUS and Captive
Portal is the same as for *Amount of Time* from above.

**Exception:**

- This counter is running with *accounting-stop* or *interim-updates*.
  Both types of updates supported by CaptivePortal have a bug. They do
  not reset as they should (pfSense 2.0.1. FIXED on pfSense 2.0.2 and
  2.1).
- *Time Period* is not working as described above. This counter isn't
  using a pre-defined script which comes with FreeRADIUS default
  configuration but uses some small shell scripts. Changing the GUI
  option **Time Period** to *daily, weekly, monthly, forever* changes
  the path where the files will be saved::

    /var/log/radacct/datacounter/daily/
    /var/log/radacct/datacounter/weekly/
    /var/log/radacct/datacounter/monthly/
    /var/log/radacct/datacounter/forever/

To reset the counter *daily* at midnight, manually add a cron job.
Easiest way to do so is to install the “Cron” package from pfSense
package manager: Reset everyday at midnight::

  minute hour    mday    month   wday    who     command
  0      0   *   *   *   root    /bin/rm /var/log/radacct/datacounter/daily/used-octets-*

Reset weekly on sunday needs this cron job::

  minute hour    mday    month   wday    who     command
  0      0   *   *   Sun     root    /bin/rm /var/log/radacct/datacounter/weekly/used-octets-*

Reset monthly on the first day needs this cron job::

  minute hour    mday    month   wday    who     command
  0      0   1   *   *   root    /bin/rm /var/log/radacct/datacounter/monthly/used-octets-*

If a user was offered an amount of 500MB per week and the user reached
this limit then he cannot reconnect or will be disconnected when
**re-authenticate users every minute** is enabled. To increase the
traffic for this user per day, edit the user in GUI and increase the
value to 1000MB. **Attention:** If the *Amount of Traffic* field in GUI
is cleared and *Save* is clicked, this will reset the counter and the
user will have unlimited access. **Hint:** This traffic counter is based
on two small shell scripts and plain textfiles. Don't know how well it
will perform with many users which have traffic limits enabled but
probably not as well as a database as backend.

Amount of Bandwidth
~~~~~~~~~~~~~~~~~~~

Used reply-item attribute:

-  count-attribute = WISPr-Bandwidth-Max-Down
-  count-attribute = WISPr-Bandwidth-Max-Up

An individual bandwidth may be set for upload and download. This will
overwrite the settings in in Captive Portal. To make that bandwidth
limits work, enable it in Captive Portal first and leave this field
blank or fill in a zero. As far as I know - test this and give feedback
- but changes made in FreeRADIUS will first take effect on CP if the
user gets re-authenticated. Perhaps it will help to enable
“re-authenticate every minute” in CP.

MAC Address Authentication with Captive Portal
----------------------------------------------

FreeRADIUS and Captive Portal may be used to authenticate users by
username and password. There is the possibility that a host on Captive
Portal should be authenticated only with MAC address. This can be
realized with Plain-MAC-Auth enabled or with 802.1X. pfSense Captive
Portal allows us to send the authentication attributes in different
ways:

FreeRADIUS Plain-MAC-Auth with Captive Portal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FreeRADIUS configuration

-  Enable Plain-MAC-Auth on **FreeRADIUS > Settings**
-  Enter the MAC address of the host in the following format
   (11-22-a3-bb-44-af) in **FreeRADIUS > MACs**

Captive Portal configuration

-  Enable **RADIUS MAC authentication**
-  Enter any shared secret desired. This field **must** not be empty!
   but it is not important what is entered. This is **not** the shared
   secret which is used for communication between NAS(CP) and the
   FreeRADIUS server. I used *blaaa*
-  **MAC address format**. In general this may be left at **default** or
   any other option because FreeRADIUS is converting the MAC address
   (Calling-Station-ID) into the correct format. To be 100% correct
   choose here **ietf**

This should appear in Syslog::

  radiusd[13660]: Login OK: [00-04-23-5c-9d-19/blaaa] (from client pfsense port 2 cli 00-04-23-5c-9d-19)

This should appear in **Status > System Logs**, **Portal Auth** tab::

  logportalauth[10059]: MACHINE LOGIN: 00-04-23-5c-9d-19, 00:04:23:5c:9d:19, 192.168.0.88

CP recognizes a **MACHINE LOGIN**. This is an indicator that the
authentication was processed with a MAC address.

FreeRADIUS Plain-MAC-Auth as 802.1X request with Captive Portal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FreeRADIUS configuration

-  Disable Plain-MAC-Auth on **FreeRADIUS > Settings**
-  Enter the MAC address of the host in the following format
   (11-22-a3-bb-44-af) in **FreeRADIUS > Users**
-  Enter the password for this MAC address. We will choose **blaaa** in
   this how-to. Read the following steps fo fully understand!

Captive Portal configuration

-  Enable **RADIUS MAC authentication**
-  Enter the same shared secret here chosen above in **FreeRADIUS >
   Users**. This field **must** not be empty! This is **not** the shared
   secret which is used for communication between NAS(CP) and the
   FreeRADIUS server. I used *blaaa* as I wrote above.
-  **MAC address format**. In general this may be left at **default** or
   any other option because FreeRADIUS is converting the MAC address
   (Calling-Station-ID) into the correct format. To be 100% correct
   choose here **ietf**

This should appear in Syslog::

  radiusd[23825]: Login OK: [00-04-23-5c-9d-19/blaaa] (from client pfsense port 2 cli 00-04-23-5c-9d-19)

This should appear in **Status > System Logs**, **Portal Auth** tab:

  logportalauth[10059]: MACHINE LOGIN: 00-04-23-5c-9d-19, 00:04:23:5c:9d:19, 192.168.0.88

Both outputs ('''FreeRADIUS Plain-MAC-Auth with Captive Portal ''' and
**FreeRADIUS Plain-MAC-Auth as 802.1X request with Captive Portal** are
the same. I deleted the password for the MAC address in **FreeRADIUS >
Users** and this appeared in Syslog::

  radiusd[48561]: Login incorrect (rlm_pap: CLEAR TEXT password check failed): [00-04-23-5c-9d-19/blaaa] (from client pfsense port 13 cli 00-04-23-5c-9d-19)

Captive Portal is sending the MAC address as username and the shared
secret as password (blaaa) but FreeRADIUS did not found this password
for this user because I deleted it. So to make it hopefully clear: Using
this method the Captive Portal is sending the MAC address of the host
which wants to authenticate as username and the shared secret as
password. So FreeRADIUS does not need to check the Calling-Station-ID
but gets a full 802.1X request with username and password. This is what
many up-to-date NAS (switches) can do today - converting a MAC address
into an 802.1X request.

This is what was explained in :doc:`When should Plain MAC Auth be used?
</usermanager/plain-mac-authentication-with-freeradius>`

Tutorial
--------

CaptivePortal Self-Registration: FreeRADIUS + MySQL
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Thanks very much
`khan <http://forum.pfsense.org/index.php?action=profile;u=15749>`__ and
`sash99 <http://forum.pfsense.org/index.php?action=profile;u=22012>`__
for explanation. I will try to write a tutorial here in future - or
somebody else does :)

-  `Here <http://forum.pfsense.org/index.php/topic,57260.msg305604.html#msg305604>`__
   is the link to the forum posts.

Others
~~~~~~

Thanks to
`periko <http://forum.pfsense.org/index.php?action=profile;u=1672>`__
for making `a tutorial how to patch the code if
necessary <http://pheriko.blogspot.mx/2013/01/pfsense-2-captive-portalfreeradius2.html>`__
and how to configure everything..
