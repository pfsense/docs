Troubleshooting Windows/SMB Share Access from OpenVPN Clients
=============================================================

If Windows/SMB shares are not able to accessed by OpenVPN clients but
other services work as desired, visit **VPN > OpenVPN**, edit the server
in question, and *check* **Enable NetBIOS over TCP/IP**.

It may also be necessary to set :doc:`MSS clamping for VPNs </vpn/ipsec/advanced-ipsec-settings>`.
