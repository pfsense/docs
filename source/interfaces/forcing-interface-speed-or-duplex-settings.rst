Forcing Interface Speed or Duplex Settings
==========================================

Forcing the speed and duplex settings for a network interface is
supported in the GUI on pfSense 2.1 and later. Earlier versions did not
support setting the speed in the GUI and required manually editing the
configuration. If a speed and duplex must be set, upgrade to the most
current firmware.

When forcing a speed and/or duplex option, both sides must match. The
speed cannot be forced to an unmanaged switch. Having a speed/duplex
mismatch will result in errors and/or degraded connectivity. Errors will
result in **In/Out errors** and **Collisions** as reported on on
**Status > Interfaces**.

To manually configure the speed and duplex, do the following:

#. Visit the page for the physical interface under, for example,
   Interfaces > WAN.
#. Click "Advanced" next to "Speed and duplex"
#. Select the desired speed and duplex from the drop-down menu, which
   contains all media types supported by the card. (ex: "100BaseTX
   full-duplex")
#. Click Save
#. Click Apply Changes
#. Visit Status > Interfaces and check the Media line for the interface
   in question. If the selected speed and duplex are listed, then the
   setting has been applied as expected.

To switch back to autoselect, visit the same setting and select
"Default".

NIC Support
-----------

Some network cards do not support manually configuring their speed and
duplex. Notably, this is an issue with many Realtek cards, including
network interfaces which utilize the re(4) driver. The settings appear
to apply, but the card remains in a duplex mismatch state. This is known
to affect the PC Engines APU and is a problem in the hardware. It does
not work on any operating system with an affected NIC.

In these cases the problem may be worked around with a small managed
switch. Set one port's speed and duplex to match the upstream, and then
set the port facing the affected NIC to autoselect/autonegotiate.

