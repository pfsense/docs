Troubleshooting Time Zone Configuration
=======================================

If the clock is several hours off, but accurate to the minute, it is
most likely a time zone setting issue. If using a GMT offset time (e.g.
*-0500*), try using a more specific **geographic** time zone such as
*America/New_York* instead.

Processes on FreeBSD (and thus pfSense) only pick up time changes when
they are started. If the firewall has not been rebooted since the last
time zone change, doing so will ensure that all running processes are
using the correct time zone.

