.. include:: /substitutions.rsti

System Patches Package
======================

The System Patches package allows patches to be added, either from the
official code repository or ones pasted in from e-mail or other sources.

This makes it easier to test and deploy small changes instead of pulling
in many changes.

Installing the package
----------------------

As with any other pfSense package, it's available via the package
repository.

- Navigate to **System > Packages**, **Available Packages** tab
- Find **System Patches** in the list
- Click |fa-plus| at the end of its row, then confirm, to install

Patches may now be managed at **System > Patches**.

Adding a patch
--------------

-  Go to **System > Patches**
-  ***Read the text and warnings!***
-  Click |fa-plus| to add a new patch
-  Enter a **Description** (mandatory, to identify the patch. Free text,
   no restrictions on letters/characters/spaces)
-  Enter any one of:

   -  Commit ID (e.g. *4573641589d50718b544b778cea864cfd725078a*) in the
      **URL/Commit ID** field.
   -  Github commit URL (e.g.
      *https://github.com/pfsense/pfsense/commit/4573641589d50718b544b778cea864cfd725078a*)
      in the **URL/Commit ID** field.
   -  Github Pull Request (PR) URL with '.diff' appended, such as
      https://github.com/pfsense/pfsense/pull/XXXX.diff where XXXX is
      the PR number. Set Path Strip = 2 if it does not adjust
      automatically.
   -  Full URL to a patch from another source (e.g.
      *https://redmine.pfsense.org/attachments/594/0001-Add-support-for-aliases-in-DNS-Forwarder-fixes-2410.patch*)
      in the **URL/Commit ID** field.
   -  Leave **URL/Commit ID** blank and paste the contents of a patch
      into **Patch Contents** text area.

-  Set the **Path Strip Count**. Github commit IDs and URLs should be
   count of *1* (fixed automatically on save). Patches from other
   sources will need to be set appropriately.

   -  If a path like "a/etc/inc/filter.inc" is in the patch header,
      strip off the "a/" so a strip count of *1* is needed. If it's
      deeper, such as *home/me/patches/etc/inc/filter.inc*, strip *3*
      levels in that example.

-  A **Base Directory** of */* is assumed for the patches, but an
   alternate base may be applied if a patch does not supply a full path
   to the file it is patching. (e.g. */usr/local/www*)
-  Set the **Ignore Whitespace** option appropriately. Patches from
   Github should work with either whitespace setting, patches from other
   sources may need the option set to ignore whitespace, especially if
   they contain DOS line endings rather than UNIX.
-  click **Save**

Applying/Reverting a patch
--------------------------

-  If a URL or commit ID was entered, there will be a **fetch** link.
   Click **fetch** and the patch will be retrieved only.
-  Once a patch has been fetched (or pasted in) so its contents are
   present, a set of new links is shown: **Test**, **Apply**,
   **Revert**.

   -  Only options which would succeed are shown. For example, if a
      patch will apply, **Apply** will appear. Same for **Revert**.
      **Test** will always show, and will test an apply and revert to
      tell if either one would work.

-  To apply the patch, simply click **Apply** and it will apply the
   patch. The available link for the patch will then change to say
   **Revert** instead. To revert, click **Revert**.

Troubleshooting
---------------

-  Click **Re-Fetch** for remote patches to make sure a clean copy of
   the patch is present.
-  Click **Test** to run a test and then click **Detail** next to either
   the apply or revert line to get the full patch output
-  If the above test output mentions **No file to patch**, double check
   the **Path Strip Count** and/or the **Base Directory**.
-  If every part of a patch fails, try toggling **Ignore Whitespace**.

Automatic Apply
---------------

When adding a patch, if **Auto-Apply Patch** is checked then the patch
will be automatically applied during each package sync/boot.

The patches may be reordered in the list to arrange them so they apply
in a specific order automatically, in case one patch depends on a
previous patch.

In the future
-------------

Planned features eventually will include the ability to automatically
revert patches.
