.. include:: /substitutions.rsti

pfBlocker-NG Package
====================

pfBlocker introduces an Enhanced Aliastable Feature to pfSense.

What it allows:

-  Assigning many IP address URL lists from sites like I-blocklist to a
   single alias and then choose a rule action.
-  Blocking countries and IP ranges.

Replaces Countryblock and IPblocklist (provides same functionality of
both in one package and more)

This package only uses native functions of pfSense instead of file hacks
and table manipulation as was done in Countryblock and IPblocklist.

Current version is 1.0.1 and includes:

`Country\_Block <Country_Block>`__ features

`IP\_Blocklist <IP_Blocklist>`__ features

Dashboard widget

XMLRPC Sync

Dashboard widget with aliases applied and package hit

Lists update frequency

Many new options to choose what to block and how to block. Network lists
may be used in to custom rules.

How to
------

**General** Set the interfaces to be monitored by pfBlocker (both
inbound and outbound). The inbound is the Internet connection. To
prevent devices or users from accessing sites in the countries/IP
addresses selected later, select local interfaces under outbound and
access will be blocked.

**Lists** This is the IPBlocklist feature, enter IP addresses here to
specifically block. It must be in the file format or CIDR. Create a list
for each type of action to be taken by pfBlocker.

Options are:

'Deny Both' - Will deny access on Both directions.

'Deny Inbound' - Will deny access from selected lists to the local
network.

'Deny Outbound' - Will deny access from local users to IP address lists
selected to block.

'Permit Inbound' - Will allow access from selected lists to the local
network.

'Permit Outbound' - Will allow access from local users to IP address
lists selected to block.

'Disabled' - Will just keep selection and do nothing to selected Lists.

'Alias Only' - Will create an alias with selected Lists to help custom
rule assignments.

The rest of the tabs (except sync) specify the other lists included with
the package. They are separated by continent with the exception of the
spammer list which contains countries from around the globe that are
known to harbor spammers.

Sync tab configures pfBlocker to sync its configuration to other pfSense
devices

Available lists
---------------

Spamhaus DROP and EDROP

http://www.spamhaus.org/drop/drop.txt
http://www.spamhaus.org/drop/edrop.txt

DShield Most Active Attacking IPs

http://feeds.dshield.org/top10-2.txt

iblocklist.com has a number of lists available.

http://www.iblocklist.com/lists.php

FAQ
---

:I'm getting memory errors while applying pfblocker lists, how to fix this?:
  Increase table size to avoid memory errors in Advanced settings.
:I can't see any pfblocker rules applied, whats wrong?:
  pfblocker requires at least one firewall entry (any interface) for it to be
  active. One way to verify is to check the front page widget.
:pfBlocker always moves its rules to the top, how can I stop this?:
  Change rule action to Alias only and then apply custom rules using pfBlocker
  aliases with an arbitrary sequence.
:How can I apply pfBlocker lists in floating rules?:
  Aliases are used for customized filter entries and float rules.

Known issues
------------

Some users with 256 MB RAM or less reported boot errors while pfSense
startup is done before GUI is available.

Very large lists need PHP memory increase by doing some file hacks on
pfSense.

Screen shots
------------

.. image:: /_static/packages/country.jpg

.. image:: /_static/packages/general.jpg

.. image:: /_static/packages/pfb_lists.jpg

.. image:: /_static/packages/pfb_spammers.jpg

.. image:: /_static/packages/pfb_sync.jpg

Resources
---------

This package is developed and maintained by marcelloc and
tommyboy180\ `1 <http://tomschaefer.org/pfsense/>`__. This package gets
its lists from the following sites:

IP Blocklist\ `2 <http://www.iblocklist.com>`__

Country IP Blocks\ `3 <http://www.countryipblocks.net/>`__
