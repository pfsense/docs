FreeRADIUS package
==================

Basics
------

Installation
^^^^^^^^^^^^

-  Navigate to **System > Packages**, **Available Packages** tab
-  Click |fa-plus| at the end of the row for **freeradius3**
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

After this, have a look at the pfSense® syslog. There should be the
following::

  radiusd[16634]: Ready to process requests.
  radiusd[16627]: Loaded virtual server


Troubleshooting RADIUS Authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When attempting to authenticate against a RADIUS server, errors may be
encountered in the logs that prevent it from working properly. Here are some
errors and how to resolve them::

  mpd: [pt0] RADIUS: RadiusSendRequest: rad_init_send_request failed: -1

* This appears to happen when the RADIUS shared secret contains special
  characters. Try again with an alphanumeric shared secret.


General Information
-------------------

Features
^^^^^^^^

The features below were tested on pfSense software version 2.x

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

    radiusd[3206]: Multiple logins (max 1) : [testuser/testpw] (from client testing port 10)

- A certain amount of time per day/week/month/forever (``CHECK-ITEM:
  Max-Daily-Session := 60``) The user will be disconnected and cannot
  re-login after the amount of time is reached::

    radiusd[3206]: Invalid user (rlm_counter: Maximum daily usage time reached): [testuser/<via Auth-Type = EAP>] (from client pfsense port 0 cli 00-04-23-5C-9D-19)

- A certain amount of traffic per day/week/month/forever. The user will
  be disconnected and cannot re-login after the amount of traffic is
  reached. The syslog output looks like this::

    root: FreeRADIUS: Used amount of daily upload and download traffic by testuser is 0 of 100 MB! The user was accepted!!!
    root: FreeRADIUS: Credentials are probably correct but the user testuser has reached the daily amount of upload and download traffic which is 243 of 100 MB! The user was rejected!!!

- MySQL
- LDAP/ActiveDirectory (connecting to MS AD with PAP)
- User-Auth with SQUID
- One-Time-Password


FreeRADIUS General Configuration
--------------------------------

Related Articles
^^^^^^^^^^^^^^^^

Refer to the following articles for more information on the listed topics:

-  :doc:`Testing FreeRADIUS </packages/testing-freeradius>`
-  :doc:`Mobile One-time Passwords with FreeRADIUS </packages/mobile-one-time-passwords-with-freeradius>`
-  :doc:`Using Captive Portal with FreeRADIUS </captiveportal/captive-portal-configuration>`
-  :doc:`Using EAP and PEAP with FreeRADIUS </packages/using-eap-and-peap-with-freeradius>`
-  :doc:`Using OpenVPN With FreeRADIUS </vpn/openvpn/authenticating-openvpn-users-with-freeradius>`
-  :doc:`Using Squid with FreeRADIUS </cache-proxy/using-squid-with-freeradius>`

Get FreeRADIUS Status Server Updates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The status server will give lots of information about the FreeRADIUS
server. Many stats are shown about Accounting-Packets, dropped packets
and much more. To enable status server and request information from the
server do the following:

- Setup an interface with **Interface-Type**: *status* and a free port.
  The default port for RADIUS accounting is ``1813``.
- Setup a NAS/Client with **IP-Address**: ``127.0.0.1`` and a password.
  Password *testing123* will be used in this how-to.
- SSH to the pfSense firewall and enter the following command on the
  command line::

    echo "Message-Authenticator = 0x00, FreeRADIUS-Statistics-Type = All" | \radclient localhost:1813 status testing123

The output should look like this::

  Received response ID 223, code 3, length = 140
         FreeRADIUS-Total-Access-Requests = 1
         FreeRADIUS-Total-Access-Accepts = 0
         FreeRADIUS-Total-Access-Rejects = 14
         FreeRADIUS-Total-Access-Challenges = 0
         FreeRADIUS-Total-Auth-Responses = 14
         FreeRADIUS-Total-Auth-Duplicate-Requests = 0
         FreeRADIUS-Total-Auth-Malformed-Requests = 0
         FreeRADIUS-Total-Auth-Invalid-Requests = 0
         FreeRADIUS-Total-Auth-Dropped-Requests = 0
         FreeRADIUS-Total-Auth-Unknown-Types = 0

To request other status updates, replace **FreeRADIUS-Statistics-Type =
1** from the command above with another value. More values can be found
in this path on the pfSense firewall::

  /usr/local/share/freeradius/dictionary.freeradius


Copyrights and Credits
^^^^^^^^^^^^^^^^^^^^^^

-  The code of FreeRADIUS package is based on
   `freeradius.org <http://www.freeradius.org>`__
