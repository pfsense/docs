pfBlocker-NG Package
====================

**pfBlocker-NG** introduces an Enhanced Alias Table Feature to pfSense®
software.

What it allows:

* Assigning many IP address URL lists from sites like I-blocklist to a
  single alias and then choose a rule action.
* Blocking countries and IP ranges.
* Replacment of both **Countryblock** and **IPblocklist** by providing the same
  functionality, and more, in one package.
* Uses native functions of pfSense software instead of file hacks and table
  manipulation.

Features include:

* Country_Block features
* IP_Blocklist features
* Dashboard widget
* XMLRPC Sync
* Dashboard widget with aliases applied and package hit
* Lists update frequency
* Many new options to choose what to block and how to block.
* Network lists may be used for custom rules.

General Setup
-------------

Set the interfaces to be monitored by pfBlocker-NG (both inbound and
outbound), where the inbound is the Internet connection.

To prevent devices or users from accessing sites in the selected
countries/IP addresses, select local interfaces under **outbound**.

Setting up Lists
----------------

This is the IPBlocklist feature, enter IP addresses here to
specifically block. It must be in the file format or CIDR. Create a
list for each type of action to be taken by pfBlocker.

Options are:

``Deny Both`` - Will deny access on Both directions.

``Deny Inbound`` - Will deny access from selected lists to the local
network.

``Deny Outbound`` - Will deny access from local users to IP address lists
selected to block.

``Permit Inbound`` - Will allow access from selected lists to the local
network.

``Permit Outbound`` - Will allow access from local users to IP address
lists selected to block.

``Disabled`` - Will just keep selection and do nothing to selected Lists.

``Alias Only`` - Will create an alias with selected Lists to help custom
rule assignments.

The rest of the tabs (except sync) specify the other lists included with
the package. They are separated by continent with the exception of the
spammer list which contains countries from around the globe that are
known to harbor spammers.

Sync tab configures pfBlocker to sync its configuration to other pfSense
devices.

Available lists
---------------

**Spamhaus** - DROP and EDROP.

* http://www.spamhaus.org/drop/drop.txt
* http://www.spamhaus.org/drop/edrop.txt

**DShield** - Most Active Attacking IPs.

* http://feeds.dshield.org/top10-2.txt

**iblocklist.com** - A number of lists are available.

* http://www.iblocklist.com/lists.php

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

.. seealso:: You can find a list of known issues with the pfBlocker-NG package
   on the `pfSense bug tracker`_.

.. _pfSense bug tracker: https://redmine.pfsense.org/projects/pfsense-packages/issues?utf8=%E2%9C%93&set_filter=1&sort=id%3Adesc&f%5B%5D=status_id&op%5Bstatus_id%5D=o&f%5B%5D=category_id&op%5Bcategory_id%5D=%3D&v%5Bcategory_id%5D%5B%5D=97&f%5B%5D=&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=assigned_to&c%5B%5D=updated_on&group_by=&t%5B%5D=
