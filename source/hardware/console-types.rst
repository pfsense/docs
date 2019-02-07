Console Types
=============

There are two console types available in pfSense, VGA and Serial. The
active default console depends on the image/installer used and
configuration settings. The difference between the two console types is
explained in more detail below.

VGA Console
-----------

The VGA console is a console with a traditional monitor and keyboard.
The keyboard can be PS/2 or USB. The VGA console requires hardware with
a monitor port and either PS/2 or USB ports for the keyboard, or in some
cases a serial BIOS that does VGA redirection.

The VGA console is active by default in a full install using the normal
memstick installer, and NanoBSD+VGA images.

Serial Console
--------------

The Serial console uses a serial/COM port to communicate with a serial
client. It is primarily intended for systems without a monitor or
keyboard, but can be used on systems where those are either not
available or not wanted.

The serial console is active by default on NanoBSD images, and when
installing using the *serial* memstick and may be enabled under **System
> Advanced** on VGA images.

Accessing the serial console requires a null modem serial cable attached
between the COM1 port on the firewall and a serial client. A hardware
serial port is required on the firewall, but the client may use a USB
serial adapter if needed.

Serial clients are quite common, often pre-installed on an operating
system or easily available. The free
`PuTTY <http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html>`__
client is the most popular choice. Other choices include tip/cu on
BSD/Linux, minicom, and Hyperterminal.

The serial port is set for 9600/8/N/1 by default on downloaded
installations of pfSense 2.1 and earlier, so set the client software
appropriately. On pfSense 2.2 the default serial port speed is
115200/8/N/1. For hardware ordered with pfSense preinstalled, consult
the documentation to determine the correct speed. The serial port speed
may be changed under **System > Advanced**.

If the device has a BIOS accessible over serial console, it is also
possible that it will not be using the same serial speed that the OS is
using. For example, ALIX units ship with their BIOS set to 38400.

The most common serial speeds to try would be: 9600, 38400, and 115200

If the BIOS serial speed does not match the OS serial speed, we advise
adjusting one or the other to match, so that POST messages may be viewed
as well as the OS messages without having to adjust the client

