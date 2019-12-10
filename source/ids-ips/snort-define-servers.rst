Snort Server Definitions
========================

Define servers to protect and improve performance
-------------------------------------------------

The **Variables** tab is where the specific types of hosts on the
network are configured. For example, the specific IP addresses or
network ranges containing web servers to protect may be defined. This
can make Snort more efficient because it won't waste time scanning for
web server threats on IP addresses where web servers do not exist.
Similarly, Snort performance can be optimized by instructing it which
addresses contain other critical servers such as SMTP, POP, DNS, etc.

The exact ports or port ranges used for certain services on the network
may also be specified.

Each value entered on this page can only be an existing Alias. Start
typing the name of the Alias into a textbox and a drop-down selection of
matching entries will appear for selection. Aliases are created under
**Firewall > Aliases** from the menu.

.. image:: /_static/ids-ips/snortvariables.png
   :align: center
