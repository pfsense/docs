Adjusting the Size of Log Files
===============================

pfSense stores its logs in :doc:`binary circular log
files </monitoring/working-with-binary-circular-logs-clog>`
that never grow in size. These are known as "clog" files. The fixed size
prevents the logs from filling up available storage space and eliminates
the need for rotation, but the down side is that the logs wrap around
once full, losing older messages in the process. These log files are
held in */var/log* which is in a RAM disk on NanoBSD (optional on a full
install), and on the SSD/HDD for a full install by default.

Starting with pfSense 2.2, the **Log File Size (Bytes)** field in the
:doc:`Log Settings </monitoring/log-settings>` at **Status > System Logs**,
**Settings** tab, allows the user to specify the amount of storage to
allocate per log file.

Short Version
-------------

To change the log file sizes:

-  Navigate to **Status > System Logs**, **Settings** tab
-  Enter a new value in **Log File Size (Bytes)**, being careful not to
   overfill the disk containing the logs.
-  Click **Save**
-  Click **Reset Log Files**

Details
-------

The default size for a log file is *511488* (~500KB) which can generally
hold between 2000-3000 log entries but varies by entry size. The time
span covered by logs depends entirely on how much data is logged. A
quiet log file could contain months or even years of information, a busy
log file may only contain minutes.

Underneath the text for **Log File Size (Bytes)** the current and
available disk space is displayed based on the current log file sizes
and their location. For example::

  Disk space currently used by log files: 9.8M. Remaining disk space for log files: 11G

There are approximately 20 log files affected by the size control. The
value entered in **Log File Size (Bytes)** is for a single log file, so
the actual usage will be approximately **20 times** that value. As shown
above, with the default value of 511488 (~500KB), the firewall uses
nearly 10MB of total log space. If the size of the logs is increased to
*1024000* (1MB), then nearly 20MB would be used for logs. Be certain
before changing the **Log File Size (Bytes)** value that the disk has
enough space to hold all of the log files.

The change to the log size only takes effect when log files are reset.
On NanoBSD, this would be on reboot or when manually reset. On a full
install, this would only happen when the logs are manually reset. Log
files may be reset individually using the **Clear** button on the
various log tabs, or by using the master **Reset Log Files** button on
the :doc:`Log Settings </monitoring/log-settings>` page.
