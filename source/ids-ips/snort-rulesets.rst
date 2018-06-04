.. include:: /substitutions.rsti

Snort Rulesets
==============

Categories
----------

If a Snort VRT Oinkmaster code has been obtained (either free registered
user or the paid subscription), and the Snort VRT rules have been
enabled, and the Oinkmaster code has been entered on the Global Settings
tab then the option of choosing from among three pre-configured IPS
policies is available. These greatly simplify the process of choosing
enforcing rules for Snort to use when inspecting traffic. The IPS
policies are only available when the Snort VRT rules are enabled.

The three Snort VRT IPS Policies are: (1) Connectivity, (2) Balanced and
(3) Security. These are listed in order of increasing security. However,
resist the temptation to immediately jump to the most secure “Security”
policy if new to using Snort. False positives can frequently occur with
the more secure policies, and careful tuning by an experienced
administrator may be required. So if new to Snort, then using the less
restrictive “Connectivity” policy in non-blocking mode is recommended as
a starting point. Once experience with Snort has been gained in the
network environment, blocking mode can be enabled and then move up to
more restrictive IPS policies.

.. image:: /_static/ids-ips/snortchooseipspolicy.png

If the Snort VRT rules are not enabled, or to use any of the other rule
packages, then make the rule category selections by checking the
checkboxes beside the rule categories to use.

.. image:: /_static/ids-ips/snortmanualcategoryselection.png

Be sure to click **SAVE** when finished to save the selection and build
the rules file for Snort to use.
