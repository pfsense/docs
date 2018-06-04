.. include:: /substitutions.rsti

Manually Editing the pfSense Configuration
==========================================

There isn't one single way to reload the entirety of *config.xml* short
of rebooting the firewall. To apply changes updating a specific section
of *config.xml*, run:

-  rm /tmp/config.cache
-  On a page relevant to the config area changed, press the **Save**
   button.

The command *viconfig* will bring up the *config.xml* in *vi*, and upon
exiting *vi*, removes the configuration cache file automatically.

