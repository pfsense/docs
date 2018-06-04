.. include:: /substitutions.rsti

Obtaining Panic Information for Developers
==========================================

Crash dump functionality is built into every kernel on current versions
of pfSense. Crash dumps are automatically saved on Full installs with
swap space, or printed to the serial console on other platforms.

Viewing and Submitting a Crash Dump
-----------------------------------

After a panic/crash leading to a reboot, a box will appear on the
dashboard to view and automatically submit a crash report. If the crash
report is submitted, call attention to it on the forum where a developer
with sufficient access can retrieve the report and analyze it.

Submitted crash dumps must be located by IP address and timestamp. When
referencing a crash dump on the forum or elsewhere, be sure to include
the IP address from which the report was submitted (the default route
WAN IP address) plus the approximate time and time zone from which it it
was submitted.

Crash Dump Format
-----------------

The crash dumps are in FreeBSD textdump format and held in */var/crash*
after they have been recovered.

Serial Console Crash Dump
-------------------------

On systems with a serial console, connect to the serial console and
record the scrollback buffer when a crash happens, or there may not be a
way to retrieve the crash dump otherwise.

Full Install without Swap Space
-------------------------------

If the system is running a full installation without swap space, it may
not be able to take a crash dump or automatically restart, and may stop
at a “**db>**” prompt on the console. Capture the output there, and also
the output of the “*bt*” command at that prompt, then manually restart
the unit.

