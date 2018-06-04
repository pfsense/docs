.. include:: /substitutions.rsti

Troubelshooting Snort Rule Updates
==================================

MD5 Signature Mismatch
~~~~~~~~~~~~~~~~~~~~~~

Periodically, Sourcefire redesigns their site or updates the engine and
rules, and the snort package needs an update to accommodate this change.
Removing and then installing the snort package again is required to
restore proper functionality, assuming the package has been updated to
match the upstream rule format.

Upstream Issues
~~~~~~~~~~~~~~~

Rule problems can almost always be solved by waiting 20-30 minutes and
then trying the download again. Failing that, uninstall the package
completely and then reinstall the package to ensure the snort binaries
are the latest/correct ones.

Space Issues
~~~~~~~~~~~~

If the */tmp* slice is small, either because the firewall is running
NanoBSD or a full install with */tmp* on a RAM disk, current rulesets
can easily fill the slice up and cause numerous rule-related errors.

If there is sufficient RAM, increase the size of */tmp* using the
options on **System > Advanced**, **Miscellaneous** tab.

