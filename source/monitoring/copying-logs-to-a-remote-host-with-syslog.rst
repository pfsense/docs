.. include:: /substitutions.rsti

Copying Logs to a Remote Host with Syslog
=========================================

To retain logs for any significant period of time, remote syslog must be
enabled and a syslog server must be configured to accept log messages
from pfSense.

There are several different syslog server software packages. Most
BSD/Linux systems will have one built in, and there are some free
utilities available for Windows to accept syslog messages from remote
hosts.

Setup Syslog on the Logging Host
--------------------------------

First, configure the syslog server to accept remote connections which
means running it with the ``-a <subnet>`` or similar flag.

FreeBSD
^^^^^^^

On FreeBSD, edit **/etc/rc.conf** and add this line::

  syslogd_flags=" -a 192.168.1.1 "

Where 192.168.1.1 is the IP address of the pfSense firewall.

More complex allow rules for syslog are also possible, like so::

  syslogd_flags=" -a 10.0.10.0/24:*"

Using that parameter, syslog will accept from any IP address in the
10.0.10.0 subnet (mask 255.255.255.0) and the messages may come from any
UDP port.

Now, edit ``/etc/syslog.conf`` and add a block at the bottom::

  !*
  +*
  
  +pfSense
  *.*                /var/log/pfsense.log

Where ``pfSense`` is the hostname of the pfSense firewall. An entry may also
need to be added in **/etc/hosts** for that system, depending on the DNS
setup. Logs may be split separate files. Use the **/etc/syslog.conf** file
on the pfSense firewall for more details on which logging facilities are
used for specific items.

The log file may also need to be created manually with proper
permissions::

  touch /var/log/pfsense.log
  chmod 640 /var/log/pfsense.log

Now restart syslog::

  /etc/rc.d/syslogd restart

OpenBSD
^^^^^^^

The configuration for OpenBSD is similar to FreeBSD, with the following notes:

#. The option to accept remote syslog events is ``-u``.
#. This option may be enabled using *rcctl(8)*::

    rcctl set syslogd flags -u

#. To restart the syslogd service::

    rcctl restart syslogd

Linux
^^^^^

Configuration of the system logger on Linux depends on the distribution.
Consult the distribution's documentation on how to change the behavior of
syslogd. It should be similar in many cases to the alterations in the
FreeBSD section.

Windows
^^^^^^^

Setting this up on Windows entirely depends on which syslog server is
being used. Consult the documentation for more information on
configuration.

There is a free multi-purpose utility that can act as a syslog server,
which can be found here: http://tftpd32.jounin.net/

Kiwi Syslog Server is free for up to 5 devices.
http://www.kiwisyslog.com/downloads.aspx

Other Logging Servers
^^^^^^^^^^^^^^^^^^^^^

Other log systems such as Splunk, ELSA, or ELK may also be used but the
methods for implementing them are beyond the scope of this document. If
such a system is syslog-compatible, then the pfSense side should be
fairly simple to setup as it would be for any other syslog system.

Setup pfSense for Remote Logging
--------------------------------

* Click **Status > System Logs**
* Click the **Settings** tab
* Check **Enable syslog'ing to remote syslog server**
* Type the IP of the logging server in the box next to **Remote syslog
  server**
* Check the boxes for the log entries to forward
* Click **Save**

Log messages will begin flowing to the target system.
