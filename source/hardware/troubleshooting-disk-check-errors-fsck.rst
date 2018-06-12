.. include:: /substitutions.rsti

Troubleshooting Disk Check Errors (fsck)
========================================

If this message appears when booting a new NanoBSD-based embedded image:

``Disk is dirty, running fsck -y``

Pull the card and try to write the image again, and make sure there were
no errors.

This error can show up if the config slice (Slice 3, or **/dev/ufs/cf**)
is missing or damaged, typically a side effect of writing an image to CF
which was too large for that card.

