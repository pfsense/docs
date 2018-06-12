.. include:: /substitutions.rsti

System Activity
===============

The **System Activity** page at **Diagnostics > System Activity**
displays CPU usage, memory usage, swap usage, and the processes and
threads using the most CPU time.

Those familiar with the console will recognize this as the output of
"*top -aSH*". Like top on the console, this output is updated every few
seconds. However, the version of the output shown in the GUI is not
capable of displaying the CPU usage summary at the top of the list.

NOTE: Threads that show **idle** in the **COMMAND** column indicate CPU
time that is *not* in use (idle). It is normal for these to show 100% if
the firewall has little to no load.

