.. include:: /substitutions.rsti

Editing Files on the Firewall
=============================

**Diagnostics > Edit File** contains a file editor that allows editing
and creating files on the pfSense filesystem.

Enter the filename to edit or create in **Save / Load from path**, or
click **Browse** and locate the file. Once the path is filled in, press
**Load**. If a new file is being created, type the path and filename to
which it will be saved.

Edit or create the text, then press **Save** when finished. For existing
files, the contents will be saved. For new files, the file will be
created.

.. warning:: Be careful when choosing a file to edit! It is very easy to edit
   the wrong file, or break a piece of code, and render the system
   unusable. Use of this tool is not recommended except under guidance of
   support or when there is sufficient knowledge to use it without causing
   unintended side effects.
