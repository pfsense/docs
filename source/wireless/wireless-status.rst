.. include:: /substitutions.rsti

Wireless Status
===============

The Wireless Status screen (**Status > Wireless Status**) shows a list
of access points within range of the wireless radio, along with various
statistics about the access points detected.

If a wireless card is acting as an access point, a list of associated
clients is displayed along with related information.

This page is only available when a wireless interface is detected in the
firewall.

Access Point/Ad-Hoc Peer Capabilities
-------------------------------------

+---------+----------------------------------------+
| Name    | Description                            |
+=========+========================================+
| WME     | Wireless Multimedia Extensions (QoS)   |
+---------+----------------------------------------+
| WPA     | Wi-Fi Protected Access                 |
+---------+----------------------------------------+
| WPS     | Wi-Fi Protected Setup                  |
+---------+----------------------------------------+
| RSN     | 802.11i - Robust Secure Network        |
+---------+----------------------------------------+
| HTCAP   | 802.11n - High Throughput (HT)         |
+---------+----------------------------------------+
| ATH     | Atheros protocol extensions            |
+---------+----------------------------------------+
| VEN     | Unknown vendor-specific extensions     |
+---------+----------------------------------------+

Access Point/Ad-Hoc Peer Flags
------------------------------

+--------+-------------------------------------+
| Flag   | Description                         |
+========+=====================================+
| E      | ESS Mode (Access Point)             |
+--------+-------------------------------------+
| I      | IBSS Mode (Infrastructure/Client)   |
+--------+-------------------------------------+
| c      | CF Pollable                         |
+--------+-------------------------------------+
| C      | CF Poll Request                     |
+--------+-------------------------------------+
| P      | Privacy                             |
+--------+-------------------------------------+
| S      | Short Preamble                      |
+--------+-------------------------------------+
| B      | PBCC                                |
+--------+-------------------------------------+
| A      | Channel Agility                     |
+--------+-------------------------------------+
| s      | Short Slot Time                     |
+--------+-------------------------------------+
| R      | RSN                                 |
+--------+-------------------------------------+
| D      | DSSSOFDM                            |
+--------+-------------------------------------+

Peer Status Flags
-----------------

+--------+------------------------------------------------------+
| Flag   | Description                                          |
+========+======================================================+
| A      | Authorized for Data                                  |
+--------+------------------------------------------------------+
| Q      | QoS (WME)                                            |
+--------+------------------------------------------------------+
| E      | Extended Rate (ERP), 802.11g                         |
+--------+------------------------------------------------------+
| P      | Power Save Mode                                      |
+--------+------------------------------------------------------+
| H      | High Throughput (HT)                                 |
+--------+------------------------------------------------------+
| H+     | HT Compat mode (Setup with vendor OUIs)              |
+--------+------------------------------------------------------+
| W      | Wi-Fi Protected Setup (WPS)                          |
+--------+------------------------------------------------------+
| N      | Transitional Security Network (TSN) association      |
+--------+------------------------------------------------------+
| T      | Aggregated MAC Protocol Data Unit (AMPDU) Transmit   |
+--------+------------------------------------------------------+
| R      | AMPDU Receive                                        |
+--------+------------------------------------------------------+
| M      | MIMO Power Save                                      |
+--------+------------------------------------------------------+
| M+     | MIMO Power Save with RTS                             |
+--------+------------------------------------------------------+
| I      | Reduced Interframe Space (RIFS)                      |
+--------+------------------------------------------------------+
| S      | Short GI in HT40                                     |
+--------+------------------------------------------------------+
| S+     | Short GI in HT40 and HT20                            |
+--------+------------------------------------------------------+
| s      | Short GI in HT20                                     |
+--------+------------------------------------------------------+
| t      | Aggregated MAC Service Data Unit (AMSDU) Transmit    |
+--------+------------------------------------------------------+
| r      | AMSDU Receive                                        |
+--------+------------------------------------------------------+

