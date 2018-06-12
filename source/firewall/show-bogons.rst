.. include:: /substitutions.rsti

Bogons Firewall Table
=====================

pfSense maintains an internal list of "bogon" networks, which are
networks that are marked as reserved and not yet allocated. Traffic from
within these bogon networks should never be seen as coming from the
Internet.

This view will show the current list of bogon networks and offers a
button which, when clicked, will cause pfSense to **Download** an
updated bogon network list. The list will be updated automatically once
per month. This frequency may be changed on pfSense 2.2 and later by
visiting **System > Advanced**, **Firewall/NAT** tab. Set the desired
**Update Frequency** there. The default update frequency is *Monthly*
but it may also be set to *Weekly* or *Daily*.

It is rare, but not unheard of, for netblocks to be assigned from this
list and put into use before the list can be updated to reflect that
fact.

