.. include:: /substitutions.rsti

Setting up WPAD Autoconfigure for the Squid Package
===================================================

pfSense can be configured to serve up automatic proxy configuration data
to clients to point users to squid running either on pfSense or another
local system, assuming their systems settings are configured for this
behavior. Though the data can be served from the firewall, the task is
better suited for another local web server if one is available.

.. note:: To use the web server on the firewall to serve this data, the
   GUI must run in HTTP mode, or the vhosts package may be used to
   setup an alternate HTTP server on port 80. Neither of these are
   recommended as much as running a separate local web server for this
   task.

This process is known as WPAD, short for `Web Proxy AutoDiscovery
Protocol <http://en.wikipedia.org/wiki/Web_Proxy_Autodiscovery_Protocol>`__.
If a web browser is configured for autodiscovery, it will try a few
methods to figure out a proxy's location.

A WPAD host may be supplied via DHCP numbered option 252 (string value
containing the entire URL to the WPAD file) or DNS, which is easy to do
with the built-in DNS forwarder.

Why would this be done?
-----------------------

To use squid authentication, squid cannot be used in transparent mode.
HTTPS traffic also cannot be filtered using transparent mode. When squid
is run in normal mode, a proxy IP and port must be configured on each
client machine, which can be tedious. This can also cause problems on
road warrior laptops that come in and out of the network. Rather than
resetting their proxy configuration each time they enter and leave,
autoconfigure will let them come and go without much trouble.

Most, if not all, modern browsers ship with the autoconfigure setting
turned off, so it may still be necessary to push/enter this setting to
client PCs. Even so, another advantage of using autoconfigure is that
should squid move to another IP address, only one file must be changed
to inform the clients of the updated IP address. (This may be easy to
pull off in a windows domain with AD, but not for many others!)

Prerequisites
-------------

This How-To assumes squid is already operating in a non-transparent
configuration. For help with that, look elsewhere in this documentation and on
the Forums.

Create wpad.dat
---------------

Before starting, a *wpad.dat* file must be crafted. This is a single
file with a JavaScript function which tells the browser how to find a
proxy hostname and port. This function can be as simple or as complex as
desired, there are many examples on the web. In this example, all
clients will be directed to the squid instance on the firewall.

The contents of the example *wpad.dat* file are::

  function FindProxyForURL(url,host)
  {
  return "PROXY 192.168.1.1:3128";
  }

The function in that file tells the browser to look for a proxy on
*192.168.1.1* at port *3128*.

Now upload that file to pfSense or another locally accessible web server
with scp, or create it using the built-in file editor. The file must go
in */usr/local/www/*.

Due to the different ways that various browser versions try to access
the file, this same code should exist in at least three different
places::

  /usr/local/www/wpad.dat
  /usr/local/www/wpad.da
  /usr/local/www/proxy.pac

(More advanced users might do this from the shell and use *ln* to link
the files.)

We recommend pointing *wpad.* to an internal web server which can answer
requests for the *wpad.dat* and associated files. It can be any web
server, but typically must be served from both the default *VirtualHost*
as well as one named *wpad*, due to differences in how browsers request
the file.

To make this work using pfSense to serve the file, local IP addresses
will need to be able to access the local interface IP address of the
pfSense router. They do not need to access the WebGUI with a password,
this file will be served without authentication. The GUI must also be
run in HTTP mode, which is less secure. If the GUI is set to use HTTP,
never open up access to the GUI over the WAN.

Configure DNS
-------------

Now to setup the DNS portion. WPAD will take the domain name given to
the machine, likely assigned by DHCP, and prepend *wpad.*. If the domain
is *example.com*, it will look for *wpad.example.com*. This task may be
accomplished with the DNS Forwarder/DNS Resolver in pfSense or with
another internal DNS server used by client PCs.

A client browser will ultimately try to access
*http://wpad.example.com/wpad.dat* - among others. More details on the
hostnames tried by WPAD are available in the `WPAD article on
Wikipedia <http://en.wikipedia.org/wiki/Wpad>`__.

To add the entry using the DNS forwarder on pfSense, navigate to
**Services > DNS Forwarder**. Click |fa-plus| to add a new **Host Override**.

Enter the following (Replace the domain and IP address with their actual
values):

-  **Host**: *wpad*
-  **Domain**: *example.com*
-  **IP Address**: *192.168.1.1*
-  **Description**: *WPAD Autoconfigure Host*

Click **Save**.

Block Port 80 Out from LAN
--------------------------

Create a firewall rule at the TOP of the LAN tab (or appropriate
interface) that blocks anything from **<internal subnet>** to * on port 80.

.. note:: If the firewall is used to serve WPAD and the WebGUI anti-lockout
   rule has been disabled, web traffic must also be allowed to the pfSense
   firewall GUI port. If this is not acceptable, point *wpad.* to another
   internal web server which can answer requests for the *wpad.dat* and
   associated files.

Test Clients
------------

Fire up a browser on a client behind the pfSense firewall, and see what
happens. If squid is configured for authentication, the client will be
greeted with a login prompt. Otherwise, check squid's logs to ensure
traffic is going through the proxy. A proxy test site such as
http://www.lagado.com/proxy-test can also be useful.

If nothing happened, check the browser settings. Many modern browsers
ship with the autoconfigure settings off.

Internet Explorer
^^^^^^^^^^^^^^^^^

-  Open **Internet Options**
-  Click the **Connections** tab
-  Click the **LAN Settings** button
-  Check **Automatically Detect Settings**
-  Click **OK**, and **OK** again.

Firefox
^^^^^^^

-  Click **Tools** (Or the three bar icon)
-  Click **Options**
-  Click **Advanced**
-  Click the **Network** tab
-  Click the **Settings** button
-  Select **Auto-detect proxy settings for this network**
-  Click **OK**

