Performing a Packet Capture
===========================

A packet capture may be performed within the WebGUI under **Diagnostics
> Packet Capture**. The settings work the same as tcpdump. The capture
can be viewed in the GUI or downloaded for later viewing with tcpdump or
`Wireshark <https://www.wireshark.org/>`__.

Various filters may be added to restrict the scope of the capture, such
as a specific **Protocol**, **Host address**, or **Port** (among
others). The size of the capture may be adjusted as well. Often a few
thousand packets are necessary to catch certain activity.

The **Level of detail** selector only controls the level of detail
displayed in the pfSense GUI for viewing the contents of a capture. It
may be adjusted after a capture has been taken, to view the capture with
more detail, adjust this value and click **View Capture**.

Click **Start** to start a capture. While a capture is running, a
**Stop** button is also displayed to stop a capture in progress.

**View Capture** shows the contents of the previous capture.

**Download Capture** initiates a download of the capture file for
viewing locally (or sending to a remote technician.)

tcpdump
-------

tcpdump comes installed with pfSense. It can be used over SSH or on the
console in a shell. In this example a method of capturing traffic other
than SSH, ARP, DNS and STP is highlighted. The capture will be directed
to a file called Sniff_output in the current directory.

.. code::

  tcpdump -i em0 not port 22 and not port 53 and not arp and not stp >> Sniff_output

The -i is designating traffic from the em0 interface. In this example
traffic from one of the subnets em0 connected to pfSense is being
grabbed.

iftop
-----

A second method of sniffing traffic via a shell is with iftop, which is availabe
in the package repository.

iftop allows designating the interface from which to grab traffic.

In this example em1 is the LAN Interface::

  iftop -i em1

Sample Output::

  cf-in-f18.google.com              => 192.168.1.245                        0b
                                    <=                                      0b
  cf-in-f97.google.com              => 192.168.1.245                        0b
                                    <=                                      0b
  cf-in-f103.google.com             => 192.168.1.245                        0b
                                    <=                                      0b
  google.navigation.opendns.com     => 192.168.1.245                        0b
                                    <=                                      0b

pftop
-----

pftop is a tool built into pfSense that can monitor traffic/connections.
This tool can be found in the GUI under **Diagnostics > pftop** or by
connecting to pfSense via SSH or the console.
