.. include:: /substitutions.rsti

Troubleshooting the Squid Package
=================================

Sites not loading with splice / Error 409 in access log
-------------------------------------------------------

As a security measure, squid will not allow a user to connect to a site
that has a hostname that does not match its IP address. This prevents
clients from hardcoding or altering DNS responses to evade access
controls. The side effect of this, however, is that sites which employ
round-robin DNS or other DNS optimizations can cause squid to block or
drop connections those sites unintentionally. The squid access log will
have a 409 (Conflict) error code when a connection is dropped for this
reason.

This happens with sites such as Google or Facebook when the client and
squid use different sources for DNS, and thus get different DNS results
for the same query because the results are randomized. Even though the
address for the server is valid, the disparity causes squid to drop the
connection.

The solution is to have the clients use the firewall as their DNS
server, so that both squid and clients use the same DNS source and the
results will match.

Clear Cache
-----------

Resetting the cache in squid can often clear up issues without
performing a more complicated procedure. Before performing a full reset,
try clearing and resetting the cache.

.. code::

  mv /var/squid/cache /var/squid/cache.old
  squid -z
  rm -rf /var/squid/cache.old

The old cache should be moved, then reset, and then the old cache should
be removed, as above, because removing the cache directory can be time
consuming, and if it is moved first, then its removal will not prevent
squid from being run while it is happening.

Complete Reset
--------------

When troubleshooting squid/squidGuard there are some procedures that may
be followed to ensure things are completely reset.

1. Remove the packages from **System > Packages** on the **Installed
Packages** tab in the proper order: Lightsquid, SquidGuard, then Squid

2. Remove the contents of the squid directory and cache::

     rm -rf /var/squid

3. Remove the Squid and related package include files::

     rm /usr/local/pkg/*squid*
     rm -rf /usr/local/etc/squid/

4. Ensure any leftover PBI symlinks are removed::

     find / -type l -lname '/usr/pbi/*' -delete

5. [Optional] Remove the settings from inside config.xml using one of
the following methods:

   - From **Diagnostics > Command** in the **PHP Execute** box::

       $squid_sections = array("squid", "squidnac", "squidcache", "squidauth", "squidextauth", "squidtraffic", "squidupstream", "squidusers");
       foreach ($squid_sections as $sec) {
       	if (is_array($config['installedpackages'][$sec]))
       		unset($config['installedpackages'][$sec]);
       }
       write_config("Removed Squid");

   - Or to remove squid, squidguard, lightsquid, and anything else with
     'squid' in its package name from **Diagnostics > Command** in the
     **PHP Execute** box::

       foreach (array_keys($config['installedpackages']) as $sec) {
       	if (strpos($sec, "squid") !== false)
       		unset($config['installedpackages'][$sec]);
       }
       write_config("Removed all squid-related settings");

   - Or backup config.xml, edit the settings out, then restore.

6. Reinstall the packages in the proper order from **System > Packages**
on the **Available Packages** tab: Squid, then squidGuard, and then
Lightsquid
