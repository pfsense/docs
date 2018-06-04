.. include:: /substitutions.rsti

IPsec Tunnel List
=================

The IPsec page located at **VPN > IPsec** allows management of IPsec VPN
tunnels. A brief summary of existing tunnel settings is also displayed
on this page.

Each IPsec tunnel will have one phase 1 definition, and one or more
phase 2 definitions.

Phase 1 definitions handle how the tunnel connects to the remote peer.
This includes the remote gateway, authentication information such as
identifiers and pre-shared keys or certificates, NAT Traversal and DPD
settings.

After adding a phase 1 definition, click the larger |fa-plus| button
underneath a phase 1 entry to display and manage its phase 2 entries.

Phase 2 definitions handle how local/internal networks are sent across a
tunnel. Multiple local subnets (or individual hosts) can be used on a
single IPsec tunnel by adding multiple Phase 2 entries.

Phase 2 definition settings include the local and remote networks for
traffic which will traverse the tunnel, and phase 2 encryption proposal
settings.

.. seealso:: :doc:`/vpn/ipsec/index` - All other IPsec articles.
