.. include:: /substitutions.rsti

FreeRADIUS 2.x package
======================

Basics
------

Installation
^^^^^^^^^^^^

-  Navigate to **System > Packages**, **Available Packages** tab
-  Click |fa-plus| at the end of the row for **freeradius2**
-  Confirm the installation
-  Monitor the progress as it installs

After Installation, the service may be configured at **Services >
FreeRADIUS**.

First Configuration
^^^^^^^^^^^^^^^^^^^

-  Select the **interface(s)** on which the RADIUS server should listen
   on.
-  Configure the **NAS/client(s)** from which the RADIUS server should
   accept packets.
-  Add the **user(s)** who should have access.

After this, have a look at the pfSense syslog. There should be the
following::

  radiusd[16634]: Ready to process requests.
  radiusd[16627]: Loaded virtual server

Testing FreeRADIUS
^^^^^^^^^^^^^^^^^^

See :doc:`Testing FreeRADIUS </usermanager/testing-freeradius>` to check if the
installation is functional.

General Information
-------------------

KNOWN BUGS and FORUM
^^^^^^^^^^^^^^^^^^^^

--- Partly solved on pfSense 2.0.2 and 2.1 ---

-  When using “stop/start accounting” on CP then “Amount of Time” isn't
   working correctly.

`This redmine ticket <http://redmine.pfsense.org/issues/2164>`__ and the
forum links on the ticket it explain how it can be fixed.

-  “Amount of Traffic” isn't working correctly on versions older than
   2.0.2

--- still NOT solved ---

-  When using CP + RADIUS + Vouchers and “reauthenticate every minute”
   is enabled then CP sends the voucher as username to RADIUS. This
   causes RADIUS to disconnect the “user/voucher” because of an
   unknown/wrong “username”. ( http://redmine.pfsense.org/issues/2155 )
-  When stop/start accounting on CP is enabled then the syslog shows
   many “wrong order” or “Login found bot no logout detected”. This
   seems to not affect the usage of RADIUS but it is not 100% correct. (
   http://redmine.pfsense.org/issues/2164 )
-  http://redmine.pfsense.org/issues/2143

`Discuss about FreeRADIUS 2 package in the forum <http://forum.pfsense.org/index.php/topic,43675.0.html>`__

Features
^^^^^^^^

The features below were tested on pfSense 2.x

- Authentication with Captive-Portal
- Pre-defined user attributes and custom check-items and reply-items
- NAS/Clients running on IPv4 and IPv6
- Interfaces can listen on IPv4 and IPv6
- OpenVPN + Username + RADIUS and OpenVPN + Username + Cert + RADIUS
- Auth with PAP, CHAP, MSCHAP, MSCHAPv2
- Auth with EAP-MD5 + dynamic VLAN assignment
- Auth with PEAP + dynamic VLAN assignment
- Auth with EAP-TLS/EAP-TTLS + dynamic VLAN assignment

  .. code::

    radiusd[3206]: Login OK: [testuser/<via Auth-Type = EAP>] (from client pfsense port 0 cli 00-04-23-5C-9D-19)
    radiusd[3206]: Login OK: [testuser/<via Auth-Type = EAP>] (from client pfsense port 0 cli 00-04-23-5C-9D-19)
    radiusd[3206]: Login OK: [testuser/<via Auth-Type = EAP>] (from client pfsense port 0 via TLS tunnel)
    radiusd[3206]: Login OK: [testuser/<via Auth-Type = EAP>] (from client pfsense port 0 via TLS tunnel)

- Simultaneous-Use - The following will be present in the system log::

    radiusd[3206]: Multiple logins (max 1) : [testuser/testpw] (from client testing port 10)

- A certain amount of time per day/week/month/forever (CHECK-ITEM:
  Max-Daily-Session := 60 ) The user will be disconnected and cannot
  re-login after the amount of time is reached::

    radiusd[3206]: Invalid user (rlm_counter: Maximum daily usage time reached): [testuser/<via Auth-Type = EAP>] (from client pfsense port 0 cli 00-04-23-5C-9D-19)

- A certain amount of traffic per day/week/month/forever. The user will
  be disconnected and cannot re-login after the amount of traffic is
  reached. The syslog output looks like this::

    root: FreeRADIUS: Used amount of daily upload and download traffic by testuser is 0 of 100 MB! The user was accepted!!!
    root: FreeRADIUS: Credentials are probably correct but the user testuser has reached the daily amount of upload and download traffic which is 243 of 100 MB! The user was rejected!!!

- Plain MAC Auth

  .. code::

    radiusd[36083]: Login OK: [<no User-Name attribute>] (from client pfsense port 0 cli 22-33-44-55-66-77)

- MySQL
- LDAP/ActiveDirectory (connecting to MS AD with PAP)
- User-Auth with SQUID
- One-Time-Password

Ask Questions? - Give Feedback!
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-  To say “Thanks”...
-  To give feedback about a (not) working setting/setup...
-  To ask questions about configuration...
-  To participate on development of this package...
-  To help others who have trouble with this package...

...please come to pfSense Forum and talk with us in this
`thread <http://forum.pfsense.org/index.php/topic,43675.0.html>`__.

FreeRADIUS General Configuration
--------------------------------

Related Articles
^^^^^^^^^^^^^^^^

Many topics have been moved from this article to related entries on the
wiki to cut down on the total length. Refer to the following articles
for more information on the listed topics:

-  :doc:`Testing FreeRADIUS </usermanager/testing-freeradius>`
-  :doc:`Plain MAC Authentication with FreeRADIUS </usermanager/plain-mac-authentication-with-freeradius>`
-  :doc:`Additional Logging for FreeRADIUS </usermanager/configuring-additional-logging-for-freeradius>`
-  :doc:`Mobile One-time Passwords with FreeRADIUS </usermanager/mobile-one-time-passwords-with-freeradius>`
-  :doc:`Using Captive Portal with FreeRADIUS </captiveportal/using-captive-portal-with-freeradius>`
-  :doc:`Using EAP and PEAP with FreeRADIUS </usermanager/using-eap-and-peap-with-freeradius>`
-  :doc:`Using MySQL with FreeRADIUS </usermanager/using-mysql-with-freeradius>`
-  :doc:`Using OpenVPN With FreeRADIUS </vpn/openvpn/authenticating-openvpn-users-with-freeradius>`
-  :doc:`Using Squid with FreeRADIUS </cache-proxy/using-squid-with-freeradius>`

Get FreeRADIUS Status Server Updates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The status server will give lots of information about the FreeRADIUS
server. Many stats are shown about Accounting-Packets, dropped packets
and much more. To enable status server and request information from the
server do the following:

- Setup an interface with **Interface-Type**: *status* and a free port.
  I choose **Port**: *1818* in this how-to.
- Setup a NAS/Client with **IP-Address**: *127.0.0.1*'' and a password.
  I choose *testing123* in this how-to.
- SSH to the pfSense firewall and enter the following command on the
  command line::

    echo "Message-Authenticator = 0x00, FreeRADIUS-Statistics-Type = All" | \radclient localhost:1818 status testing123

The output should look like this::

  Received response ID 223, code 3, length = 140
         FreeRADIUS-Total-Access-Requests = 1
         FreeRADIUS-Total-Access-Accepts = 0
         FreeRADIUS-Total-Access-Rejects = 14
         FreeRADIUS-Total-Access-Challenges = 0
         FreeRADIUS-Total-Auth-Responses = 14
         FreeRADIUS-Total-Auth-Duplicate-Requests = 0
         FreeRADIUS-Total-Auth-Malformed-Requests = 0
         FreeRADIUS-Total-Auth-Invalid-Requests = 0
         FreeRADIUS-Total-Auth-Dropped-Requests = 0
         FreeRADIUS-Total-Auth-Unknown-Types = 0

To request other status updates, replace **FreeRADIUS-Statistics-Type =
1** from the command above with another value. More values can be found
in this path on the pfSense firewall::

  /usr/local/share/freeradius/dictionary.freeradius

This is an excerpt from the following
`page <http://wiki.freeradius.org/Status#Asking+with+radclient>`__.

Porting Users/Clients/Setting from FreeRADIUS v1.x to v2.x
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The configuration of the freeradius1 package is **not** compatible and
can **not** automatically be upgraded. There is a workaround for doing
this - that the system which is running freeradius1 on production -
doesn't have to go down to long. This can be done:

-  Backup pfSense config from the machine running freeradius1
-  Install pfSense in a virtual machine. VMware Player works fine and is
   free.
-  Both systems should communicate with each other over network
-  Install freeradius2 package on the virtual machine
-  Setup all Users, MACs and Clients/NAS on this virtual machine
-  Deinstall freeradius1 on production system
-  SSH to pfSense and delete all entries depending on freeradius1
   package from **/config/config.xml**
-  Reboot pfSense, install freeradius2 package and setup interfaces
-  On virtual machine go to **Service > FreeRADIUS**, **XMLRPC Sync**
   tab
-  Enter the IP and admin password of the pfSense on production
-  Enable sync and click **Save**

Now all Users, MACs and NAS entries will be synced to the production
system running new freeradius2 package. The freeradius2 service may need
to be restarted.

-  Check system log if freeradius2 is ready to process requests
-  Check users, macs and clients file user **Service > FreeRADIUS**,
   **View config** tab

Microsoft Active Directory and LDAP
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Thanks very much
`pszafer <http://forum.pfsense.org/index.php?action=profile;u=103941>`__
for explanation. I will try to write a tutorial here in future - or
somebody else does :)

-  `Here <http://forum.pfsense.org/index.php/topic,43675.msg235285.html#msg235285>`__
   is the link to the forum posts.

Video tutorials
^^^^^^^^^^^^^^^

Forum user
`Blasterreal <http://forum.pfsense.org/index.php?action=profile;u=11733>`__
made a video tutorial for some FreeRADIUS features. It can be found on
`youtube.com <http://www.youtube.com/watch?v=B6Hjxd1Af-s>`__ or in the
`forum <http://forum.pfsense.org/index.php/topic,45312.0.html>`__.

Copyrights and Credits
^^^^^^^^^^^^^^^^^^^^^^

-  The code of FreeRADIUS2 package is based on
   `freeradius.org <http://www.freeradius.org>`__
-  Many thanks go to Marcello Coutinho who is helping me on compiling
   packages and php coding! :D
-  Many thanks to pfSense team. They support me on integration of this
   package to pfSense and pointing me in the right direction when
   implementing some features ;-)
-  Thanks very much to all other developers, beta-testers and users who
   give feedback and help to improve this package!

