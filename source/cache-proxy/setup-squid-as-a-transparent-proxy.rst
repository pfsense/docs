.. include:: /substitutions.rsti

Configuring the Squid Package as a Transparent HTTP Proxy
=========================================================

This How-To describes how to install and configure Squid as a
transparent proxy on pfSense.

Install the Package
~~~~~~~~~~~~~~~~~~~

First, install the Squid package.

#. Click **System > Packages**
#. Scroll down until the “squid” package listing is visible
#. Click |fa-plus| located to the right of the squid package description
#. Wait for the installer to download, install, and do post-install
   tasks for squid, such as creating the cache directories.

Configure the Squid Package
~~~~~~~~~~~~~~~~~~~~~~~~~~~

After the installation has finished, the Squid proxy server may be
configured.

#. Click on **Services > Proxy Server**
#. Set the options on the **General Settings** tab as desired.

   #. Proxy Interface: Select which interface the proxy will **listen**
      on. *LAN* is probably the desired setting.
   #. Allow users on interface: If this is checked, the subnets for the
      interfaces selected in the last step will automatically have
      access. There will be no need to add them on the Access Control
      tab.
   #. Transparent Proxy: Check this to have pfSense automatically
      redirect outbound HTTP (tcp/80) traffic through the proxy.
   #. Enabled logging: Check this if logging is needed, be sure to put a
      path in the following box
   #. Log Store Directory: Should be */var/squid/log* unless another
      location is absolutely necessary.
   #. Proxy Port: **Leave this as 3128**. There is no need to change the
      port number for the transparent proxy to work.
   #. The remaining settings may be left at their defaults, or changed
      if desired. It is likely best to leave them alone until the proxy
      is operational and tested.
   #. Click Save

#. Click on the **Cache Management** tab.

   #. Hard disk cache size: Set this as needed, but keep it a reasonable
      size. 3000 (3GB) may be a good place to start.
   #. Hard disk cache location: Should be */var/squid/cache* but may be
      moved if needed
   #. Memory cache size: The amount of RAM that squid should claim for
      caching. Use as much as can be spared, as this is much faster than
      caching to disk. It should not exceed 50% of the installed RAM,
      however.
   #. Minimum object size: Can be left at 0 to cache everything, but may
      be raised if small objects are not desired in the cache.
   #. Maximum object size: Objects larger than this setting will not be
      saved on disk. If speed is more desirable than saving bandwidth,
      this should be set to a low value.
   #. Do Not Cache: Set a list of domains that should never be cached.
      This may also be left blank.
   #. Click Save

#. Click on the **Access Control** tab *(optional for most)*

   #. If any other subnets will pass through the proxy aside from the
      subnet for the interface squid is using, enter them here.
   #. Click Save

That's it! Squid should be up and running. The status of the squid proxy
can be checked by clicking **Status > Services**.

Also available are:

-  lightsquid package to view web access reports from the squid log.
-  SquidGuard package for who wish to have more fine-grained control
   over what web resources may be viewed by clients.
-  :doc:`Squid Package Tuning </cache-proxy/squid-package-tuning>`
