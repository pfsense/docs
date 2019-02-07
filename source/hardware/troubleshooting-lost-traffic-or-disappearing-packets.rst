Troubleshooting Lost Traffic or Disappearing Packets
====================================================

If there are issues with traffic being lost, or packets that seem to
disappear or never show up (or leave) an interface, try disabling
Checksum Offloading as follows:

-  Navigate to **System > Advanced** on the **Networking** tab
-  Check **Disable hardware checksum offload** under the **Network
   Interfaces** header.
-  Click save

Then try to reproduce the problem. A reboot may be desired after
applying this option, but it should not be necessary.

This has historically been an issue with Realtek NICs but has also been
seen in some scenarios with Via Rhine NICs some specific Intel fxp
chips, as well as virtualized/emulated NICs in some hypervisors,
especially those that use VirtIO

The problem may also manifest as a PPPoE connection that will establish
a login and bring up the interface, but will not pass traffic.

