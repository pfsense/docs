QinQ Interfaces
===============

QinQ interfaces may be created that have nested 802.11q VLAN tags. These
are managed at **Interfaces > (assign)** on the **QinQs** tab.

The NIC in use must properly support 802.11q VLANs, or the reduced MTU
from using such an interface may be problematic.

QinQ is used in various places such as Metro Ethernet, or more complex
VLAN setups that span across multiple sites.

When adding a QinQ interface, select the physical **Parent Interface**,
the **First level tag**, optionally add it to a QinQ interface group, a
**Description**, and then add the **Member(s)** (VLAN tags).

Member VLANs are added by clicking |fa-plus| and typing in a VLAN tag number.
To add more, click |fa-plus| again and enter another tag. Repeat as often as
needed. Members can be assigned one by one or using ranges such as
*99-101*.
