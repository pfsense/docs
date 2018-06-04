.. include:: /substitutions.rsti

Verizon UML295 Cellular Modem
=============================

These are the configuration instructions for the Verizon UML295 USB
Modem.

Connect the device to a computer to do the initial setup and remove the
initial SIM PIN.

Test the connection from the computer to ensure 4G connectivity.

Once the connection is active, remove from computer and plug in to your
pfSense device. You may need to reboot pfSense if the device does not
register.

There should be no PPP configuration necessary for this device in
pfSense. It should register as a USB-to-Ethernet device in your
interface list.

Assign UE0 as a DHCP interface, and it should show an IP in the
192.168.32.0/24 subnet which should be accessible from your LAN after
configuring necessary rules.

You can configure that interface gateway as a Failover and test by
unplugging/disabling your WAN connection. Ensure you have DNS configured
correctly and the device should function properly.

