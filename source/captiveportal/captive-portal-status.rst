Captive Portal Status
=====================

The **Captive Portal Status** page is available at **Status > Captive
Portal**.

The menu entry is only present when the captive portal service is
enabled. It is not shown if Captive Portal has not been configured or
enabled.

Zone Status
-----------

To view the status for a Zone, select it from the **Captive Portal
Zone** drop-down.

This page displays a list of online users, including their **IP
address**, **MAC address**, **Username**, and **Session Start Time**.

The exact output for each field depends on the portal configuration. For
example, if MAC address filtering is disabled, the MAC address may not
be displayed. If user authentication is not required, then there will be
no **Username** to display.

Voucher Status/Management
-------------------------

If :doc:`Captive Portal Vouchers </captiveportal/captive-portal-vouchers>` are enabled,
tabs are also displayed for voucher management: **Active Vouchers**,
**Voucher Rolls**, **Test Vouchers**, and **Expire Vouchers**.

Active Vouchers
^^^^^^^^^^^^^^^

A list of online voucher users in a similar format to online Captive
Portal users described previously.

Voucher Rolls
^^^^^^^^^^^^^

A list of all voucher rolls and their properties, along with utilization
statistics. Consult this periodically to monitor usage to tell when new
voucher rolls must be generated.

Test Vouchers
^^^^^^^^^^^^^

A diagnostic tool to tell if a voucher is valid for use/login, if it has
been used previously or has expired. Enter voucher codes in the box
separated by a space or each on a new line. The status and any time
remaining for a voucher will be displayed.

Expire Vouchers
^^^^^^^^^^^^^^^

This tab offers a means to invalidate/expire voucher(s) so that they may
not be used. If a code was compromised or otherwise must be removed from
use, enter it here.

