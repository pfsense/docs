Connecting to the Serial Console
================================

Connecting to a Serial Console with pfSense® software requires
a few things:

-  A serial port on the client system, either built-in or a
   USB-to-serial adapter.
-  A null modem serial cable, or a device-specific serial cable.
-  A terminal program on the client, such as PuTTY.
-  The correct serial settings for the client software.

Locating a Serial Port (Server/Firewall)
----------------------------------------

First, ensure the firewall hardware actually has a serial port. To use
the serial console, the hardware must have a physical serial port at
COM1. Embedded units typically have a DB9 (9-pin) serial port, but some
have an RJ45 style console connector with an adapter cable that ends
with a DB9 connector.

Locating a Serial Port (Client)
-------------------------------

The client can use a built-in or USB-to-serial adapter port to connect.
The important thing to know is the actual device name used by the port.

On Windows, this is typically COM1 for built-in ports and USB-to-serial
ports could be numbered pretty much anything. Check in Device Manager
and locate the name, it could be COM3, COM4, etc.

On FreeBSD, the ports are listed in **dmesg** and are typically
**/dev/cuau0** for a built-in port at COM1 and **/dev/cuaU0** for a
USB-to-serial adapter.

On Linux, it could be **/dev/ttyS0** or **/dev/ttyUSB0**

On a MAC, USB-to-serial adapters are generally **/dev/cu.usbserial**

Null Modem Serial Cables
------------------------

Between the client serial port and firewall serial port, a `Null Modem`
serial cable is required, or a standard serial cable with a Null Modem
Adapter. These cables are wired in a special way that rolls the transmit
and receive pins allowing the serial ports to properly transmit and
receive data from each other.

Some special console cables that ship with embedded systems are already
Null Modem cables. Check with the retailer or OEM to find out for sure.

Terminal Settings
-----------------

To connect to the serial port, the client and server have to agree on
certain parameters, such as the console speed.

The default serial console settings in pfSense 2.2 and later are
**115200/8/N/1**, meaning:

-  **Speed**: 115200
-  **Data Bits**: 8
-  **Parity Bits**: None
-  **Stop Bits**: 1

Previous releases of pfSense defaulted to a console speed of **9600** but
otherwise had the same settings. Devices shipped from retailers with
pfSense pre-installed, such as from the pfSense Store or Netgate,
typically have the console speed set to match the BIOS. For example, on
an ALIX unit, the console speed would be **38400**.

Client Software
---------------

There are many serial terminal programs out there for various operating
systems. Many of them work well. Some examples are provided here for
common usage.

.. warning:: Do NOT use Hyperterminal! It is prone to lose characters/output and
   generally display things incorrectly.

PuTTY
~~~~~

`PuTTY`_ is a Free and easy-to-use SSH and Serial client. To connect to a serial
port, start PuTTY and then set the following parameters:

-  **Connection Type**: Serial
-  **Serial line**: Whichever port was determined previously, likely
   **COM1** or **COM3** on Windows, or **/dev/ttyUSB0** on Linux
-  **Speed**: 115200

The session may be saved for later use. Click **Open** to start the
serial console session.

Screen
~~~~~~

Using `GNU screen`_ on UNIX-based operating systems (Including OSX,
where it is available by default) to connect to a serial port is
extremely simple. Invoke the program like so::

  screen <port> <speed>

For example::

  screen /dev/ttyUSB0 115200

The standard screen controls apply. Press ``Ctrl-A``, ``\`` to quit, or
``Ctrl-A``, ``Ctrl-\`` in some cases.

tip
~~~

The ``tip`` command on FreeBSD consults ``/etc/remotes`` and connects to
serial ports based on the settings there. To setup a connection to a
USB-to-serial adapter at **115200**, add a line such as the following to
``/etc/remote``::

  ucom1fast:dv=/dev/cuaU0:br#115200:pa=none:

To access the port, invoke ``tip``::

  tip ucom1fast

To quit, press **Enter**, then type ``~.``. (If connected through a
terminal ssh client, ``~~.`` may need to be used instead so that the ssh
client itself doesn't interpret the keys.

Other Software
~~~~~~~~~~~~~~

Other software has been reported to work, such as **minicom**,
**SecureCRT**, and **cu**, among others.

.. _GNU screen: http://www.gnu.org/software/screen
.. _Null Modem: https://en.wikipedia.org/wiki/Null_modem
.. _PuTTY: http://www.chiark.greenend.org.uk/~sgtatham/putty
