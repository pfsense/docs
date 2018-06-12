.. include:: /substitutions.rsti

IKEv2 with EAP-RADIUS
=====================

To setup IKEv2 with EAP-RADIUS, follow the directions for :doc:`IKEv2 with EAP-MSCHAPv2 </vpn/ipsec/configuring-an-ipsec-remote-access-mobile-vpn-using-ikev2-with-eap-mschapv2>` with a slight variation:

-  Define a RADIUS server under **System > User Manager**, **Servers**
   tab before starting
-  Select the RADIUS server on **VPN > IPsec**, **Mobile Clients** tab
-  Select *EAP-RADIUS* for the **Authentication method** on the Mobile
   IPsec Phase 1 entry

Note: When using Windows 7 as a client, be sure to import the CA
Certificate from the VPN server as a machine certificate under "Computer
Account" as described
`here <https://wiki.strongswan.org/projects/strongswan/wiki/Win7Certs>`__.

EAP-RADIUS with FreeRADIUS
--------------------------

The default settings are OK for this, if not, see :doc:`Using EAP and PEAP with FreeRADIUS </usermanager/using-eap-and-peap-with-freeradius>`

EAP-RADIUS with Windows Network Policy Server (NPS)
---------------------------------------------------

To allow strongSwan to authenticate against NPS using EAP-MSCHAPv2,
alter the NPS policy as follows:

-  Open **Network Policy Server (NPS)**
-  Expand **Policies**
-  Click **Network Policies**
-  Edit the policy currently in use
-  Click on the **Constraints** tab
-  Click **Authentication Methods**
-  Click **Add**
-  Select **Microsoft: Secured Password (EAP-MSCHAP v2)**
-  Click **OK**
-  Click **Apply** (To restart NPS)
-  Click **OK**
