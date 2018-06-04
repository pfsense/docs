.. include:: /substitutions.rsti

Recovering Access when Locked Out of the WebGUI
===============================================

There are a few tricks that can be used to get back into the WebGUI
should access be lost.

Forgot Password
---------------

If the password for the system has been forgotten it can be reset easily
with console access. Get to the physical console (Keyboard/Monitor, or
:doc:`Serial </hardware/connecting-to-the-serial-console>`) and use option **3)** to
reset the WebGUI password.

Forgotten Password with Locked Console
--------------------------------------

If the console is password protected and the password is unknown, all is
not lost. It will take a couple reboots to accomplish, but it can be
fixed with physical access to the console:

- Reboot the pfSense box
- Choose the option for **Single User Mode** from the loader menu (The
  one with the ASCII logo). Depending on the version of pfSense, it may
  be option 2 or option 4.
- Press **Enter** when prompted to start */bin/sh*
- Remount the drive as rewritable::

    /sbin/mount -o rw /

  If multiple partitions/slices were made during install, mount
  everything::

    /sbin/mount -a -t ufs

- Run the built-in password reset command::

    /etc/rc.initial.password

- Follow the prompts to reset the password
- Reboot::

    /sbin/reboot

The system will now be accessible the default password (**admin** /
**pfsense**)

.. note:: The ease of this process should serve as a reminder that anyone
   with physical access to a pfSense system can bypass basic security
   measures like password protecting the console. If the console is
   password protected to keep out anything more than accidental
   logins/low-knowledge users, rethink the overall security strategy.

HTTP vs HTTPS confusion
-----------------------

Ensure that the proper protocol is in use, either HTTP or HTTPS. The
default WebGUI protocol is HTTPS.

If one doesn't work, try the other. It may also be necessary to force
the “wrong” protocol on a port, like so:

- http://pfsensebox:443
- https://pfsensebox:80

The GUI protocol may be reset from the console. Choose to reset the LAN
IP, enter the same IP, and it will prompt to reset the WebGUI back to
HTTP.

Blocked access with firewall rules
----------------------------------

If access to the WebGUI is denied remotely with a firewall rule, there
may still be hope. This shouldn't happen from the LAN as there is an
anti-lockout rule that maintains access to the WebGUI from that
interface.

Having to walk someone on-site through fixing the rule is better than
losing everything!

Locked Out by Too Many Failed Login Attempts
--------------------------------------------

Attempting to login to the GUI and failing many times will cause the
connecting IP address to be added to the webConfigurator lockout table.
Currently the limit is 15 failures (without success) within 24 hours.
Addresses are not automatically expired from the table on pfSense 2.1.x
and earlier. On pfSense 2.2 and later, addresses are expired after a
minimum of one hour.

To regain access, login successfully from another IP address and then
manually remove the entry as follows:

- Navigate to **Diagnostics > Tables**
- Select *webConfiguratorlockout*
- Click |fa-trash| by the entry or entries for workstations to allow again.

The lockout table may also be cleared by the console or ssh in the
shell::

  pfctl -T flush -t webConfiguratorlockout

Remotely Circumvent Firewall Lockout by Temporarily Changing the Firewall Rules
-------------------------------------------------------------------------------

The firewall rules may (very temporarily) be disabled using the
following shell command::

  pfctl -d

Once access is regained, turn the firewall back on using::

  pfctl -e

Alternately, the loaded ruleset is left in /tmp/rules.debug. That could
be edited to fix the connectivity issue and reload those rules like so::

  pfctl -f /tmp/rules.debug

After that, do whatever work is necessary in the WebGUI to make the fix
permanent. *(From billm in `this forum
post <http://forum.pfsense.org/index.php/topic,14299.msg75932.html#msg75932>`__)*

To get in without disabling pf, the following shell command can be run
to add an “allow all” rule on the WAN::

  pfSsh.php playback enableallowallwan

This is **VERY DANGEROUS** to keep around, so once access to the GUI has
been regained with proper rules, be sure to delete this “allow all”
rule.

Add firewall rule at the command line with easyrule
---------------------------------------------------

The command line version of easyrule may also be used to add a firewall
rule to get back in::

  # easyrule pass wan tcp x.x.x.x y.y.y.y 443

That will pass in from the remote IP x.x.x.x to the WAN IP, y.y.y.y on
port 443. Adjust as needed.

Remotely Circumvent Firewall Lockout With SSH Tunneling
-------------------------------------------------------

If access to the WebGUI has been completely blocked remotely (which is
smart to do!) but SSH access is still available, then there is a
relatively easy way to get in: SSH Tunneling.

If the WebGUI is on port 80, set the ssh client to forward local port 80
(or 8080, or whatever) to remote port “localhost:80”, then point a
browser to http://127.0.0.1:80 (or whichever local port was chosen.) If
the WebGUI is on another port, use that instead. Obviously, if https was
used, use https on the URL to access the WebGUI this way.

Here is how to setup a port 80 tunnel in PuTTY:

.. image:: /_static/usermanager/PuTTYTunnel.jpg

Fill out the options as shown, then click add. Once connected and
authenticated, the WebGUI may be accessed using the redirected local
port.

Squid Took Over My HTTP Port!
-----------------------------

If squid was accidentally configured to use the same port as the WebGUI,
and then the GUI cannot be reached to fix the configuration, it may need
to be fixed as follows:

- Connect to the pfSense system console with ssh or physical access
- Start a shell, typically option 8
- Terminate the squid process like so::

    /usr/local/etc/rc.d/squid.sh stop

- If that doesn't work, try it this way::

    squid -k shutdown

  or::

    killall -9 squid

Once the squid process is fully terminated, access to the WebGUI will be
available again. Be aware that work must be done quickly, or repeat the
shutdown command, as squid may be automatically restarted.

LDAP authentication problems
----------------------------

If LDAP is used for GUI authentication and GUI access is not possible,
then connect to the console or ssh and run option *3* to **Reset
webConfigurator password**. If a non-local authentication method has
been used, then that task will also prompt to reset the authentication
source.
