.. include:: /substitutions.rsti

Managing Groups
===============

Users can be a member of groups, which can have different access rights.

Groups are managed from the **Groups** tab on **System > User Manager**.

By default, there are two groups, **All Users**, and **Admins**. Members
of the **Admins** group have full access to the WebGUI. The **All
Users** group is system-defined, and cannot be deleted. This is
indicated by the “grayed out” or “disabled” appearance of its group icon
in the list.

When adding a group, a **Group name** is required. It may not contain
spaces. A **Description** is optional, but recommended.

Group membership may also be managed on the group editing page. To add a
user, click or ctrl-click user(s), and then press the `17px\|alt=“right
pointing triangle”\|right pointing triangle <Image:icon_right.png>`__
button to add them to this group. Members can be removed by clicking (or
ctrl-clicking for multiple) and then pressing `17px\|alt=“left pointing
triangle”\|left pointing triangle <Image:icon_left.png>`__.

A user may also be added to a group by editing the user and managing
their groups on that page instead.

Assigning Privileges
--------------------

After a group has been created and saved, privileges may be assigned.
Edit an existing group and a new section at the bottom of the page
titled **Assign Privileges** appears. Privileges are managed from there.

Click |fa-plus| to add a new privilege, and then select the pages to which
this group will have access. To select privileges, single click, click
and drag, or ctrl-click to select multiple entries. These page
privileges will all appear as separate entries on the group editing
page.

Be careful not to blindly select all options to allow access to
“everything”. There are special options in the list which also deny
privileges.
