.. include:: /substitutions.rsti

Testing the FreeRADIUS Package
==============================

Testing the :doc:`FreeRADIUS 2.x Package </usermanager/freeradius-2-x-package>` on
pfSense

Test the FreeRADIUS configuration
---------------------------------

FreeRADIUS offers an easy to use command line tool to check if the
server is running and listening to incoming requests. An **interface**,
a **NAS/Client** and a **user** must all be configured:

- Add a **User** with the following configuration:

  - **Username**: *testuser*
  - **Password**: *testpassword*

- Add a **Client/NAS** with the following configuration:

  - **IP-Address**: *127.0.0.1*
  - **Shared Secret**: *testing123*

- Add an interface with the following configuration:

  - **IP-Address**: *127.0.0.1*
  - **Interface-Type**: *Auth*
  - **Port**: *1812*

- SSH to the pfSense firewall and type in the following on the command
  line while FreeRADIUS is running (check before in System Log)::

    radtest testuser testpassword 127.0.0.1:1812 0 testing123

The following output should appear if everything was setup correctly::

  : radtest testuser testpassword 127.0.0.1:1812 10 testing123
  Sending Access-Request of id 1 to 127.0.0.1 port 1812
         User-Name = "testuser"
         User-Password = "testpassword"
         NAS-IP-Address = 192.168.0.22
         NAS-Port = 10
         Message-Authenticator = 0x00000000000000000000000000000000
  rad_recv: Access-Accept packet from host 127.0.0.1 port 1812, id=1, length=20

The really necessary thing is **Access-Accept**. Check the system log
for the following output::

  radiusd[44793]: Login OK: [testuser/testpassword] (from client testing port 10)

If something was configured wrong (such as an incorrect username) then
this will be displayed::

  : radtest testser testpassword 127.0.0.1:1812 10 testing123
  Sending Access-Request of id 104 to 127.0.0.1 port 1812
         User-Name = "testser"
         User-Password = "testpassword"
         NAS-IP-Address = 192.168.0.22
         NAS-Port = 10
         Message-Authenticator = 0x00000000000000000000000000000000
  rad_recv: Access-Reject packet from host 127.0.0.1 port 1812, id=104, length=20

The **Accesss-Reject** packet is visible, and the system log will
contain the following output::

  radiusd[44793]: Login incorrect: [testser/testpassword] (from client testing port 10)

If the steps above do not work then do not need proceed with any other
configuration. This is the first thing that should be tested.

There is a `Windows test
tool <http://www.novell.com/coolsolutions/tools/14377.html>`__ available
as well. Another nice tool is the `JRadius
Framework <http://coova.org/JRadius>`__, covered next.

Test FreeRADIUS performance with jRadius
----------------------------------------

jRadius is a tool to test a FreeRADIUS server. It can perform many
different request types, numbers of requests, attributes and
authentication methods. It can test how many requests a RADIUS server
can answer at a time, to make sure that it will perform well in a
specific environment. This tool needs a non-windows system with java to
run. I tried with openSUSE:

- Download `JRadius Minimal (client) <http://coova.org/JRadius>`__.
- Unzip the file with the following command::

    unzip jradius-client-1.1.4-release.zip

- Start the application with the following command::

    sh simulator.sh

The application window will open. Fill out the fields:

-  **RADIUS** tab

   -  **Transport**: *UDP*
   -  **RADIUS Server**: *192.168.0.10*
   -  **Shared Secret**: *mysharedsecret*
   -  **Auth Port**: *1812*
   -  **Acct Port**: *1813*
   -  **Send Timeout**: *10* (or fill in what the NAS offers as timeout
      to make test more “real”)
   -  **Send Retries**: *0* (or fill in what the NAS offers as timeout
      to make test more “real”)
   -  **Requester Threads**: *1* (To understand this option think about
      the number of NAS nodes. Every NAS is a *Requester Thread*. In
      worst case after a power cycle all NAS reboot at once so enter
      here the amount of NAS nodes)
   -  **Requests per Thread**: *1* (To understand this think about the
      number of hosts which are connected to this NAS at a time and when
      the NAS rebooted all clients will try to reauthenticate)
   -  **Simulation Type**: *Auth only* (if accounting is chosen, then
      additional attributes must be added later)
   -  **Authentication Protocol**: *PAP* (Change it to suit the needs of
      the site but TLS needs a client cert, PEAP users only the server
      cert from FreeRADIUS)
   -  **Verify Standard**: *None*
   -  Check **Log RADIUS to log tab**

-  **Attributes tab**:

   -  **User-Name**: *myuser*
   -  **User-Password**: *mypass*
   -  **NAS-Port**: *25* (any value is ok)
   -  **NAS-IP-Address**: *192.168.0.111* (IP of the NAS)
   -  Check all four attributes in **AccessReq**

-  **RADIUS** tab

   -  Click **Start**

Then the test will be performed. It could take some time and the display
will show the number of requests can be handled per second and the
response speed. If the server cannot handle the requests fast enough
then think about increasing **FreeRADIUS > Settings**, **Maximum Number
of Threads**. Do not increase this unlimited. It will help on peaks but
if there is a high load all the time, think about a faster backend
(MySQL instead of flat file). There is also a speed difference if the
testuser in **FreeRADIUS > USers** is listed at the bottom of a 100
users long list or at the top. And there is a difference if there are
many reply attributes like VLAN ID and so on.

After this performance test check the FreeRADIUS server as described in
this chapter: :doc:`/usermanager/freeradius-2-x-package`
