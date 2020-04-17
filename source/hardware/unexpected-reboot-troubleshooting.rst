Troubleshooting Unexpected Reboots
==================================

Unexpected reboots are caused by one of two things - hardware problems,
or FreeBSD kernel panics. The vast majority of the time, it is hardware
problems. Hardware diagnostics should be run before trying anything
else.

If the reboot was caused by a kernel panic, and a full install with swap
space is in use, a prompt will be shown when logging back into the web
interface asking to :doc:`view and submit a crash report </development/obtaining-panic-information-for-developers>`.
If there is no kernel panic, then the cause is almost certainly a hardware problem.

-  For hardware issues, check on:

   -  Failing power supply
   -  Flaky electricity in general
   -  Overheating CPU
   -  Overheating or bad RAM
   -  Faulty hard drive/SSD/other storage
   -  Faulty drive cables
   -  and many others...

-  If the firewall does panic, and the panic message contains a
   backtrace that mentions things like memory allocation, mbuf,
   uma_zalloc_arg, or similar, then it may be crashing due to mbuf
   exhaustion. See :doc:`Tuning and Troubleshooting Network Cards </hardware/tuning-and-troubleshooting-network-cards>`
   for information on how to overcome that problem.

On full install systems without swap space configured, an automatic
crash dump will not happen. The details of the crash and backtrace would
need to be viewed on the console if possible.
