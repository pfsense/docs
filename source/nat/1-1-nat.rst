1:1 NAT
=======

1:1 NAT, aka one-to-one NAT or binat, binds a specific internal address
(or subnet) to a specific external address (or subnet). Incoming traffic
from the Internet to the specified IP will be directed toward the
associated internal IP. Outgoing traffic to the Internet from the
specified internal IP will originate from the associated external IP.

To allow traffic in from the Internet, a firewall rule must be added on
the associated WAN interface allowing the desired traffic, using the
destination IP of the internal private IP.

All of the 1:1 NAT mappings are listed in the pfSense® webGUI under 
**Firewall > NAT**, on the **1:1** tab and they are managed from the
list on that page.

When adding or editing a 1:1 NAT entry, pick an **Interface** where the
NAT should happen, specify an **External subnet IP** which is typically
a WAN VIP, an **Internal IP** (or use /32 for a single IP or enter the
starting address of the block), and enter a **Description**. The
**Destination** field should be left set to ``any`` for most all use
cases.

Click **Save** when finished.

