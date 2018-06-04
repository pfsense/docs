.. include:: /substitutions.rsti

Increasing the State Table Size
===============================

The state table size may be set in the WebGUI at **System > Advanced**
on the **Firewall/NAT** tab. Enter a new value in the **Firewall Maximum
States** box and then click **Save**.

The default size of the state table is set to use 10% of the system RAM.
Each state consumes approximately 1KB of RAM. So for 1,000,000 states,
1GB of RAM would be required just for states.

Each *connection* flowing *through* the firewall will consume two
states: One state when entering, and one state when exiting. As a
result, the highest number of connections possible *through* the
firewall is approximately half the total size of the state table. For
example if the maximum size of the state table is *500,000* then
approximately 250,000 user connections could be made through the
firewall.

Connections terminating *at* the firewall, such as connections to the
GUI, gateway monitoring traffic, VPN outer tunnel traffic, and so on
each would consume only a single state as they only involve a connection
to or from one interface.

