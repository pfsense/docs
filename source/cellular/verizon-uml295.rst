Configuring a Verizon UML295 USB Modem
======================================

Connect the UML295 to a computer to do the initial setup and remove the
initial SIM PIN.

Test the connection from the computer to ensure that there is 4G connectivity.

Once the connection is confirmed, remove the modem from computer and plug
in to your pfSense® device. There should be no PPP configuration necessary for
this device in the pfSense software, it should register as a USB-to-Ethernet device in your
interface list.

.. note:: You may need to reboot the pfSense device if the device does not register.

Assign **UE0** as a DHCP interface, and it should show an IP in the
192.168.32.0/24 subnet which then should be accessible from your LAN after
configuring the necessary rules.

You can also configure that interface gateway as a Failover and test it by
unplugging/disabling your WAN connection. Ensure you have DNS configured
correctly so that the device functions properly.
