Firewall Rule Schedules
=======================

Firewall rules can be scheduled so that they are only active at certain
times of day or on certain specific days or days of the week.

Before a schedule can be applied to a rule, it must be created in the
pfSense® webGUI under **Firewall > Schedules**. Then, when creating
a rule, pick the defined schedule from the list.

Scheduled rules will act as though they do not exist when the scheduled
time is not active.

By default schedules clear the states of existing connections when the
expiration time is reached. That behavior may be changed to not clear
states for existing connections by checking **Schedule States** under
**System > Advanced** on the **Miscellaneous** tab.

