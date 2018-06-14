.. include:: /substitutions.rsti

Working with Binary Circular Logs (clog)
========================================

pfSense uses a Circular Log format known as *clog* to maintain a
constant log size.

There are multiple benefits to this method. The primary advantage is
that the log files cannot grow and fill up filesystems. The downside is
that they are no longer plain text logs, and cannot be directly used by
programs like *cat* or *grep*. If they are viewed directly, "random"
binary data may be seen inside the log and entries may appear out of
order.

Viewing Log Contents
--------------------

The *clog* command must be used to view the contents of log files from
the shell, like so::

  clog /var/log/filter.log

Then the output may be piped to tools like *grep* if needed.

In order to follow the log files in a manner like *tail -f* would allow,
use::

  clog -f /var/log/filter.log

The contents of the log will be printed to the console, and then new
entries will appear as they are written.

Log Sizes
---------

The log files created for use by pfSense with *clog* are a fixed size
that holds a certain amount of *data* total, not log entries. As such,
the number of log entries may vary widely depending on the length of the
lines and message content. Log files could contain anywhere between 2000
and 4000 entries, or even more/less than that. The GUI only shows 50
lines per log by default but the files contain many more entries. See
:doc:`Log Settings </monitoring/log-settings>` for more information on that setting.

On pfSense 2.2 and later, the sizes of these log files may be adjusted.
Navigate to **Status > System Logs** on the **Settings** tab. There, a
new **Log File Size (Bytes)** may be entered.

The default is *500* Kilobytes per log file, and there are around 20 log
files. When increasing log sizes, keep disk space in mind. There is a
disk space indicator for the filesystem containing the logs under the
**Log File Size (Bytes)** text description.

