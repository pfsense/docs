.. include:: /substitutions.rsti

Checking the Current FreeBSD Version
====================================

The :doc:`Versions of pfSense and FreeBSD </releases/versions-of-pfsense-and-freebsd>` article contains a table of
the versions used in various releases, or follow these instructions:

From the Dashboard in the GUI, look at the **System Information**
widget. It is displayed under the **Version** section. Clicking the
FreeBSD version displays the full kernel *uname -a* output.

In the :doc:`SSH console </usermanager/granting-users-access-to-ssh>` or
:doc:`Execute Shell Command </development/executing-command-line-commands-using-the-web-interface>`
field in the GUI, run the following::

  uname -mrs
