.. include:: /substitutions.rsti

Tuning the Squid Package
========================

Performance Tweaks
------------------

`Some users <http://forum.pfsense.org/index.php/topic,14673.0.html>`__
have reported that making the following change has greatly increased
performance:

-  Edit /boot/loader.conf.local
-  Change kern.ipc.nmbclusters="0" to kern.ipc.nmbclusters="32768"
-  Reboot the pfSense router

See :doc:`Tuning and Troubleshooting Network Cards </hardware/tuning-and-troubleshooting-network-cards>`
for more information on that setting.

Some people have also seen better performance by using the *ufs* cache
filesystem setting. When using *ufs* filesystem, **vfs.read\_max=32**
may be increased to **vfs.read\_max=128** in **System > Advanced**,
**Sytem Tunables** tab. Read
`more <http://ivoras.sharanet.org/blog/tree/2010-11-19.ufs-read-ahead.html>`__.

Compact swap.state
------------------

Squid keeps a cache index journal called *swap.state* in the top level
of the squid cache folder, typically */var/squid/cache/swap.sate*.
**This file can grow very large and consume all hard drive space**. To
ensure this does not happen, set a **Log Rotate** value in the squid
configuration.

By setting a number of days to retain the logs, the squid package will
activate a nightly cron job which runs::

  squid -k rotate

Part of this rotation process includes compacting the swap.state file,
keeping it from getting too large.

If this file is too large and needs to be removed, this may be done
while squid is running. After the file is removed, run::

  squid -k rotate

This will cause it to be written out again (but compacted). Alternately,
tell squid to perform a clean shutdown with::

  squid -k shutdown

This will also write the *swap.state* file out again, but squid will
stop after this and must be restarted, so it is a less desirable option.

If the *swap.state* file is removed while squid is *not* running, it
will have to completely rescan the cache folder to rebuild it once squid
is restart. This can be a lengthy and time consuming process. It may be
better to remove the contents of the existing cache folder, and rebuild
the structure again by running::

  squid -z

See the `Squid FAQ entry <http://wiki.squid-cache.org/SquidFaq/SquidLogs#swap.state>`__ for
more details.

Random Tips/Tricks
------------------

.. warning:: There could be any number of reasons not to do the following
   things. Be careful, and test any changes.

Caching Windows Updates
~~~~~~~~~~~~~~~~~~~~~~~

.. warning:: These settings could break things, but when it works it works
   beautifully!

If there are a bunch of local PCs that need Windows Updates, but a WSUS
server is not an option, squid can cache them.

- On the **General Settings** tab of the squid configuration
  (**Services > Proxy Server**), place the following in the **Custom
  Options** box at the bottom::

    refresh_pattern ([^.]+.|)(download|(windows|)update|).(microsoft.|)com/.*\.(cab|exe|msi|msp) 4320 100% 43200 reload-into-ims;
    range_offset_limit -1;

- Click **Save**
- On the **Cache Management** tab of the Squid configuration:

  - Change **Hard Disk Cache size** to something large, say *3000* or
    *4000* (3GB or 4GB), to accommodate the updates.
  - Change the **Maximum object size** to something big, such as
    *512000* for 512MB. Going bigger may be needed if any updates
    larger than that size are released.

- Click **Save**

If that refresh pattern does not work, try::

  refresh_pattern ([^.]+\.)?(download|(windows)?update)\.(microsoft\.)?com/.*\.(cab|exe|msi|msp|psf) 4320 100% 43200 reload-into-ims; range_offset_limit -1;

Caching Mac Updates
~~~~~~~~~~~~~~~~~~~

.. code::

  refresh_pattern ([^.]+.|)(download|adcdownload).(apple.|)com/.*\.(pkg|dmg) 4320 100% 43200 reload-into-ims;

Caching AVG and other Updates
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As above, but add this before the other options. The same warnings
apply::

  refresh_pattern ([^.]+.|)avg.com/.*\.(bin) 4320 100% 43200 reload-into-ims;
  refresh_pattern ([^.]+.|)spywareblaster.net/.*\.(dtb) 4320 100% 64800 reload-into-ims;
  refresh_pattern ([^.]+.|)symantecliveupdate.com/.*\.(zip|exe) 43200 100% 43200 reload-into-ims
  refresh_pattern ([^.]+.|)avast.com/.*\.(vpu|vpaa) 4320 100% 43200 reload-into-ims

Tweaking Update Caching / Squid seems to download on its own
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

From
`here <http://forum.pfsense.org/index.php/topic,38141.msg198482.html#msg198482>`__.
Change This::

  range_offset_limit -1;

To::

  range_offset_limit 0;

As an alternative, also try::

  quick_abort_min 0 KB;
  quick_abort_max 0 KB;

Or::

  quick_abort_pct 70;

To ensure that a file is only downloaded if a user actually receives 70%
or more of it. Otherwise if a user requests a file and then aborts, it
will download the whole file.

.. note:: If range\_offset\_limit is set to -1 the quick abort options will
   NOT work

Parent proxy
~~~~~~~~~~~~

Setting parent proxy available at the **Proxy server: Upstream proxy
settings** tab. In most cases, these settings work if the parent proxy
also squid.

To use a parent proxy on another server (not squid), it is necessary to
disable **Upstream proxy settings**, and use the **Custom options** in
the **Proxy server: General settings** tab. For example for use as a
parent proxy installed package HAVP need to add the line *cache\_peer
127.0.0.1 parent 3121 7 no-query* (Here HAVP configured to use the IP
address *127.0.0.1* port *3121*).
