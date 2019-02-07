NTP Server
==========

The NTP Daemon (ntpd), configured at **Services > NTP**, allows pfSense
to act as a Network Time Protocol server for a network, and also keeps
the clock in sync against remote NTP servers as an NTP client itself.

Before enabling this service, ensure that the router's clock keeps
fairly accurate time.

The `ntp.org NTPD <http://www.ntp.org>`__ distribution of ntpd is used.

By default the NTP server will bind to and act as an NTP server on all
available IP addresses. This may be restricted using the
**Interface(s)** selection on **Services > NTP**.

This service should not be exposed publicly. Ensure inbound rules on
WANs do not allow connections from the Internet to reach the NTP server
on the firewall.

GPS
---

If a serial GPS is present, it may be selected and used as a time
source. Currently only NMEA format GPS output is used, other modes may
work but require additional testing/hardware availability.

