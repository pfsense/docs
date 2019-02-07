Supported Wireless Cards
========================

pfSense includes built in wireless capabilities that turn a pfSense
firewall into a wireless access point, use a wireless 802.11 connection
as a WAN connection, or both.

Recommended Wireless Cards
--------------------------

There are a variety of wireless cards supported in FreeBSD, and pfSense
includes support for every card supported by FreeBSD. Some are supported
better than others. Most pfSense developers work with Atheros hardware,
so it tends to be the most recommended hardware. Many have success with
other cards as well.

Wireless cards from big name vendors
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Linksys, D-Link, Netgear and other major manufacturers commonly change
the chipsets used in their wireless cards without changing the model
number. There is no way to ensure a specific model card from these
vendors will be compatible because there is rarely a way of knowing
which "minor" card revision is being purchased. While one revision of a
particular model may be compatible and work well, another card of the
same model may be incompatible. For this reason, we recommend avoiding
cards from the major manufacturers. If one is already on hand, it's
worth trying to see if it is compatible, but be warned if purchasing one
because the "same" model worked for someone else, it may end up being a
completely different piece of hardware that is incompatible.

Supported Wireless Drivers
--------------------------

The spreadsheet linked below contains a compatibility matrix and driver
list for cards that should work with pfSense 2.0 and later - be aware of
the **hostap** column, which indicates which drivers are capable of
running in access point mode. If the **hostap** column is marked *N*,
then the card may only be used as a client.

The second tab on the sheet lists part numbers for a given driver.

`Wireless Card
Support <https://spreadsheets.google.com/ccc?key=0AojFUXcbH0ROdHgwYkFHbkRUdV9hVWljVWl5SXkxbFE&hl=en>`__

This information was compiled from FreeBSD man pages and driver source
code, and some from submitted information/experience.

