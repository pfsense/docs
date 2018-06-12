.. include:: /substitutions.rsti

Executing Commands at Boot
==========================

There are three primary options for executing custom commands at boot
time: shellcmd, earlyshellcmd, and shell script.

The shellcmd package can manage the shellcmd and earlyshellcmd tags in
the GUI, so *config.xml* values need not be edited by hand.

At boot time, the earlyshellcmd commands are executed first, shellcmd is
executed later in the boot process, and the shell scripts are executed
at the very end when packages are initialized.

shellcmd option
---------------

The hidden **config.xml** option **<shellcmd>** will run the command
specified towards the end of the boot process.

To add a shellcmd to a configuration, either use the shellcmd package or
edit the config by hand. To edit the config, back it up via
**Diagnostics > Backup/restore**, and open the resulting XML file in a
text editor (other than the stock Windows Notepad). Above the **</system>** line,
add a line such as the following::

  <shellcmd>mycommand -a -b -c 123</shellcmd>

Where "mycommand -a -b -c 123" is the command to run. Multiple lines may
be added to execute multiple commands. Save the changes and restore the
modified configuration.

earlyshellcmd option
--------------------

The hidden **config.xml** option **<earlyshellcmd>** will run the command
specified at the beginning of the boot process. Normally, **<shellcmd>** should
be used instead, though this may be necessary in some circumstances. Similarly
to **<shellcmd>**, to add a **<earlyshellcmd>** option, either use the shellcmd
package or edit it in by hand. To edit it manually, backup the configuration,
open it in a text editor, and add a line such as the following above
**</system>**::

  <earlyshellcmd>mycommand -a -b -c 123</earlyshellcmd>

Where ``mycommand -a -b -c 123`` is the command to run. Multiple
**<earlyshellcmd>** lines may be added to execute multiple commands. Save the
changes and restore the modified configuration.

Shell script option
-------------------

Any shell script can be placed in the */usr/local/etc/rc.d/* directory.
The filename must end in *.sh* and it must be marked as executable
(*chmod +x myscript.sh*). Every shell script ending in *.sh* in this
directory will be executed at boot time.

The first two options are preferable as they are retained in the config
file and hence do not require additional modifications should the
storage medium be replaced and reinstalled, or if the configuration is
restored to a different piece of hardware.
