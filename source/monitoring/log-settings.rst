Log Settings
============

The **Settings** tab under **Status > System Logs** controls how the
logging system behaves.

**Forward/Reverse Display**: Controls whether the logs are displayed in
forward or reverse order. Forward order has the newest messages at the
bottom of the display. Reverse order has the newest message at the top
of the display. This is completely up to the user, letting them choose
however they prefer to read the logs. Default is unchecked (forward
order).

**GUI Log Entries to Display**: The number of entries to show in GUI
logging tabs. The actual log files hold more entries, so this number may
be increased at will. This will not resize the log files, however, only
how many are displayed.

**Log File Size (bytes)**: The size allocated for each
:doc:`circular log file </monitoring/working-with-binary-circular-logs-clog>`.
Defaults to 500KB per file. Described in more detail in
:doc:`Adjusting the Size of Log Files </monitoring/adjusting-the-size-of-log-files>`.

**Log Firewall Default Blocks**: Controls what logging is performed for
default rules. The options for *block* rules are checked by default.

**Web Server Log**: Controls whether or not the GUI web server process
itself will write its messages to the main system log. While useful for
troubleshooting, it can be quite chatty and log some harmless but
scary-looking messages.

**Raw Logs**: Selecting this option will display the contents of log
files as-is without any parsing from the GUI. Logs such as the firewall
log and PPTP VPN log are parsed and displayed in a simpler fashion,
making them easy to read and follow in the GUI. To see more detail,
check **Show raw filter logs** and then view the log file again.

**Filter descriptions**: Controls whether (and how) or not to display
the firewall rule descriptions in the log. By default they are not
shown, but can be viewed by clicking the action icon (|fa-times| or |fa-play|)
at the far left of the firewall log entry. Using this option, they may
also be displayed in an additional column or a separate row.

**Local Logging**: Local logging on the firewall may be disabled as well
using **Disable writing log files to the local disk**.

**Reset Logs**: Pressing this button will clear log data from all of the
logs managed by the pfSense base system. All logs are reinitialized
having zero entries. The DHCP daemon is restarted when resetting logs.

Remote Logging
--------------

Log entries may be sent to as many as three remote syslog servers
instead of held locally. When using a remote syslog server, there is a
choice of which types of events to send.

Be sure that the receiving syslog server is configured to allow logging
from this pfSense firewall.

**Source Address**: Chooses which interface on pfSense to use for
initiating log messages. If the target syslog server is across an IPsec
tunnel, this should be a local interface address inside of a Phase 2
definition for the IPsec tunnel.

**IP Protocol**: Selects IPv4 or IPv6 to be used for sending log
messages when multiple possibilities exist.

**Enable Remote Logging**: When checked, send syslog entries to the
defined servers.

**Remote Syslog Servers**: List of remote syslog servers. Can be an IP
address (IPv4 or IPv6), hostname, or IP:port if syslog is on a
non-default port.

**Remote Syslog Contents**: Select the items which will be sent via
remote syslog. **Everything** is the preferred choice.

.. seealso::
   * :doc:`Copying Logs to a Remote Host with Syslog </monitoring/copying-logs-to-a-remote-host-with-syslog>`
   * :doc:`/vpn/ipsec/accessing-firewall-services-over-ipsec-vpns`
   * :doc:`/monitoring/working-with-binary-circular-logs-clog`
   * :doc:`Adjusting the Size of Log Files </monitoring/adjusting-the-size-of-log-files>`
