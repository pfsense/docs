Configuring RSA Authentication for IPsec
========================================

Using certificate-based RSA authentication for identification of VPN
tunnel peers is much stronger than using a simple Pre-Shared Key.

To utilize RSA authentication, first a PKI structure must be made. This
can be performed in the pfSense® webGUI using the 
:doc:`Certificate Management </certificates/certificate-management>`
feature. Refer to the
:doc:`Certificate Management </certificates/certificate-management>`
article for specifics on creating certificate authorities and
certificates.

First, designate one firewalls to hold the CA/Certificate structure. For
this document, it will be called Firewall A. The other firewall will be
Firewall B.

On Firewall A:

-  Create a Certificate Authority (CA).
-  Create a Certificate for Firewall A. Set the **Common Name** to the
   hostname of Firewall A, add an **Alternative Names** entry with a
   **Type** of *IP* and the **Value** set to the IP address of the WAN
   interface on Firewall A.
-  Create a Certificate for Firewall B. Set the **Common Name** to the
   hostname of Firewall B, add an **Alternative Names** entry with a
   **Type** of *IP* and the **Value** set to the IP address of the WAN
   interface on Firewall B.
-  Export the CA Certificate, and the Firewall B certificate and key

On Firewall B:

-  Import the CA Certificate and the Firewall B certificate and key

On both firewalls:

-  Configure the IPsec tunnel :doc:`as usual </vpn/ipsec/configuring-a-site-to-site-ipsec-vpn>`, with
   the following exceptions

   -  Set **Authentication method** to *Mutual RSA*
   -  Select the certificate for this firewall for **My Certificate**
   -  Select the certificate authority created above for **My
      Certificate Authority**

-  Click **Save**
-  Click **Apply Changes**
