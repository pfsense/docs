Manually Editing the pfSense Configuration
==========================================

After editing the pfSense® configuration, you will need to reload the entirety of
**config.xml**. There are a few ways of doing this:

#. Reboot the firewall.

#. Delete the configuration cache file::

     rm /tmp/config.cache
  
   Then, on a page, or pages, relevant to the config area(s) that changed, click
   the **Save** button.

#. Run the ``viconfig`` command to bring up **config.xml** in `vi`_. Upon
   exiting vi, the configuration cache file will automatically be removed.

.. _vi: https://en.wikipedia.org/wiki/Vi
