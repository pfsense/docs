Configuring NAT for VoIP Phones
===============================

If VoIP is being used, the default settings may not be correct in
certain circumstances. The default settings handle the majority of
scenarios, but depending on the specifics of a particular setup, changes
may be necessary to obtain a working configuration.

The following sections will help to get local handsets working with a
remote PBX. If the PBX is local and trying to communicate with a remote
SIP trunk, see :doc:`PBX VoIP NAT How-to </nat/configuring-nat-for-a-voip-pbx>` for more
ideas.

Disable source port rewriting
-----------------------------

By default pfSense rewrites the source port on all outbound traffic.
This is necessary for proper NAT in some circumstances such as having
multiple SIP phones behind a single public IP registering to a single
external PBX. With a minority of providers, rewriting the source port of
RTP can cause one way audio. In that case, setup manual outbound NAT and
:doc:`Static Port </nat/static-port>` on all UDP traffic potentially with the
exclusion of UDP 5060.

In old versions (pfSense 1.2.x and before) the firewall performed static
port NAT on UDP 5060 traffic by default, but that is not desirable now
because it breaks more scenarios than not currently. However, in cases
where static port on UDP 5060 is required, configuring manual outbound
NAT to perform static port NAT for udp/5060 will allow it to function.

Set Conservative state table optimization
-----------------------------------------

The default UDP timeouts in pf are too low for some VoIP services. If
phones mostly work, but randomly disconnect, set **Firewall Optimization
Options** to *Conservative* under **System > Advanced**,
**Firewall/NAT** tab.

A keep-alive or re-registration on the phone set for 20-30 seconds or so
can also help, and is often a better solution.

Use the siproxd package
-----------------------

The :doc:`Siproxd package </packages/siproxd-package>` is used only for deployments
with local phones and a remote PBX where rewriting the source port
breaks the ability to connect because the service will not work with
rewritten source ports. In this very specific circumstance the siproxd
package enables multiple phones to connect to a single outside server
with a static source port of 5060.

Do not use this package if the PBX is local. Only use it if the upstream
PBX strictly requires all phones to have a source port of 5060.

Disable scrub
-------------

In very rare circumstances, scrubbing needs to be disabled under
**System > Advanced**, **Firewall/NAT tab**. In most cases this should
be left at the default setting (unchecked). Only change this setting if
it has been determined it is necessary to do so. Some phones send
malformed packets that will be silently dropped without scrub active
(e.g. unfragmented packets that claim to be fragmented).

