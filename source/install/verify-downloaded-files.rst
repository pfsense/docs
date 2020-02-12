Verifying Downloaded Files
==========================

When downloading files from the `pfSense website`_, SHA256 checksum files are
available, which are viewable in any plain text editor. These SHA256 files can
be used to verify the download completed successfully, and that an official
release is being used.

Hash calculation programs vary by operating system, some common examples
include:

.. tabs::

   .. tab:: Windows

      Use `HashTab`_ to compare the value against the provided hash. With
      HashTab installed, right click on the downloaded file to access the **File
      Hashes** tab containing the **SHA256** hash, among others.

      .. tip:: If a SHA256 hash is not displayed, right click in the hash view
         and click **Settings**, then check the box for **SHA256** and click
         **OK**.

      The generated SHA256 hash from HashTab can be compared with the contents
      of the provided checksum.

      .. note:: It is also possible to use the Linux ``sha256sum`` or ``md5sum``
         commands within Cygwin if the Cygwin command prompt is launched as an
         Admin user.

   .. tab:: Mac OSX

      Use the ``shasum`` or ``md5`` command line utilities to generate a hash of
      the downloaded file.

      Example:

      .. code-block:: none

         shasum -a 256 pfSense-CE-2.4.4-RELEASE-p3-amd64.iso.gz

      The generated SHA256 hash can be compared with the contents of the
      provided **.sha256** checksum.

   .. tab:: Linux

      Use the ``sha256sum`` or ``md5sum`` command line utilities to generate a
      hash of the downloaded file.

      .. code-block:: none

         sha256sum pfSense-CE-2.4.4-RELEASE-p3-amd64.iso.gz

      The generated SHA256 hash can be compared with the contents of the
      provided **.sha256** checksum.

   .. tab:: FreeBSD

      Use the ``sha256`` or ``md5`` command line utilities to generate a
      hash of the downloaded file.

      .. code-block:: none

         sha256 pfSense-CE-2.4.4-RELEASE-p3-amd64.iso.gz

      The generated SHA256 hash can be compared with the contents of the
      provided **.sha256** checksum.

.. _HashTab: http://implbits.com/products/hashtab
.. _pfSense website: https://www.pfsense.org
