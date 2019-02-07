Viewing the Full pf Ruleset
===========================

In the :doc:`SSH console </usermanager/granting-users-access-to-ssh>` or
:doc:`Execute Shell Command </development/executing-command-line-commands-using-the-web-interface>`
field in the GUI, run the following::

  # Show Firewall Rules:
  pfctl -sr

.. code::

  # Show NAT rules
  pfctl -sn

.. code::

  # Show all
  pfctl -sa

For more verbose output including rule counters, ID numbers, and so on,
use::

  pfctl -vvsr
