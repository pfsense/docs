Restricting Access to the webGUI
================================

To enhance the security of a network, in many environments access to the
management of a pfSense® firewall will be limited with the use of
firewall rules. Restricting access to management interface is strongly
recommended, for reasons as to why, see the blog post `Securely Managing
Web-administered
Devices <https://www.netgate.com/blog/securely-managing-web-administered-devices.html>`__.

The default configuration of pfSense software allows management access from any
machine on the LAN and denies it to anything outside of the local
network. There is also an anti-lockout rule enabled by default that
prevents firewall rules from being configured in a way that will lock
the user out of the web interface.

To restrict management access first ensure the LAN rules allow access to
the port used for the webGUI. This depicts the default LAN rule, which
allows access to the web interface.

.. image:: /_static/firewall/default-lan-rule.png

If a restrictive ruleset is in place on the LAN, make sure it permits
access to the web interface before continuing.

Now disable the anti-lockout rule. Navigate to **System > Advanced**,
**Admin Access** tab and check **Disable webConfigurator anti-lockout
rule**. Click **Save** and the rule will be removed.

Using a network alias for management access is strongly recommended, and
if both web and SSH administration are used, add an alias for those
ports. The following are examplees:

**1.** Example alias for networks allowed to access management interface

.. image:: /_static/firewall/management-access-alias.png

**2.** Example alias for ports allowed to access management interface

.. image:: /_static/firewall/management-ports-alias.png

Now add a firewall rule allowing the sources defined in the management
alias to the destination of the firewall, with the port used or alias
created for those using multiple ports. **Make sure this rule is first
in the list**. Then add a rule based on that rule (click |fa-plus| next to the
rule), changing action to *block* or *reject* (reject is preferred on
internal networks), source to *any*, and destination the same. When
finished the ruleset should look like the following.

.. image:: /_static/firewall/restricted-management-lan-rules.png

Click **Apply Changes** and the management interface is now restricted
to only the defined hosts.
