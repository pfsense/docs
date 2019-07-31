Viewing the Configuration History
=================================

pfSense® software automatically keeps a backup when a change is made to the
configuration. This makes it easy to revert after an undesirable
settings change, but should not be relied upon as a sole means of
backup. There are numerous reasons why having an off-system backup is a
good practice, especially the case of storage media failure.

To switch back to a previous configuration, visit **Diagnostics >
Backup/Restore** and then go to the **Config History** tab. Locate the
desired configuration in the list and click |fa-plus| to restore. A reboot is
recommended after the change unless the alterations were minor.
Triggering a manual filter reload from **Status > Filter Reload**, or an
Edit/Save/Apply action may be needed to activate settings from a
restored section unless a reboot is performed.

Only a certain number of older configurations are kept, so there is no
need to delete the configurations by hand unless it is being removed to
avoid restoring a broken configuration. By default, a full install will
keep *30* backup files and a NanoBSD install will keep *5*. Starting
with pfSense 2.2, the number of old configurations may be manually
changed to a lower or higher value at the cost of increased disk space.
