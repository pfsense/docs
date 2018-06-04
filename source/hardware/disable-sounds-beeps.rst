.. include:: /substitutions.rsti

Disabling Sounds/Beeps
======================

Some hardware has a PC Speaker which can be used as a means of
notification. By default, the firewall will play a tone at
startup/shutdown and will emit a beep when a user logs into the GUI.
Additionally, some packages are capable of producing beeps for events.

Disable Startup/Shutdown Tune
-----------------------------

The startup and shutdown tunes may be disabled as follows:

- Navigate to **System > Advanced**, **Notifications** tab
- Check **Disable the startup/shutdown beep**
- Click **Save**

Disable Login Beep
------------------

The GUI login beep happens because the GUI login is sent through syslog
using the LOG\_AUTH facility for which the operating system will beep
when the message appears. To disable the beep, the GUI login messages
must be suppressed as follows:

- Navigate to **System > Advanced**, **Admin Access** tab
- Check **Disable logging of webConfigurator successful logins**
- Click **Save**

Disable All Sounds
------------------

As an alternative, the system bell may be disabled globally:

- Navigate to **System > Advanced**, **System Tunables** tab
- Click |fa-plus| to create a new tunable entry using the following values:

  - **Tunable**: *hw.syscons.bell*
  - **Description**: *Control system sounds*
  - **Value**: *0*

- Click **Save**

Disable All Sounds pfSense 2.4.1
--------------------------------

As an alternative, the system bell may be disabled globally:

- Navigate to **System > Advanced**, **System Tunables** tab
- Click |fa-plus| to create a new tunable entry using the following values:

  - **Tunable**: *kern.vt.enable\_bell*
  - **Description**: *Control system sounds*
  - **Value**: *0*

- Click **Save**
