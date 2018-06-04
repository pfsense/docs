.. include:: /substitutions.rsti

Using gitsync to Update pfSense Between Snapshots
=================================================

Most often, upgrading to a new snapshot is the best way to get updated
code when tracking a prerelease version of pfSense (alpha, beta, RC,
etc).

However, since it does take some time to generate new snapshots, one can
often get by with pulling new code from the pfSense git repository
instead of reloading a whole new snapshot. This process is known as a
gitsync.

.. warning:: This syncs only PHP changes, without any binary changes. At
   times, PHP changes require associated binary changes that only come from
   an upgrade using a snapshot or other upgrade image. **Unless development
   is followed closely and the ramifications of all changes are understood,
   or unless system breakage is not a concern, do not use this!** For most
   users, this action should only be taken if directed to do so by a
   developer.

.. warning:: This process is not recommended for CF-based installs such as
   Embedded/NanoBSD, due to the number of writes involved}}

This only works with code or files that are not compiled. For example:
PHP Code, configuration files, Web GUI pages, etc.

There are two ways to perform a gitsync, both perform the same function:

Method 1: From the console menu, press option 12 to start a developer
shell, then type::

  > playback gitsync master

Method 2: From a normal shell (console menu option 8), type the
following command::

# pfSsh.php playback gitsync master

The “master” part of the command tells the gitsync process to grab the
code for the “master” branch, a.k.a. HEAD, which as of this writing is
the development code for 2.3. That can be replaced with RELENG\_2\_2 for
2.2.x.

For example, on 2.2.4, to sync post-release code changes for 2.2.x, use::

  # pfSsh.php playback gitsync RELENG_2_2

Troubleshooting
---------------

The gitsync script will attempt to install git automatically. However,
if an error occurs that git was not found and a gitsync has never been
performed before, the git package may need to be added manually. This
can be done from the GUI using the 'Available Packages' list, or from a
shell prompt::

  pfSsh.php playback installpkg git

Git URL Moved
-------------

If gitsync was run prior to the pfSense repository moving to github, and
the default 2.0 URL was used, one of the following must be performed
before the next gitsync: 1::

  rm -rf /root/pfsense/

2::

  cd /root/pfsense/pfSenseGITREPO/pfSenseGITREPO; git remote set-url origin git://github.com/pfsense/pfsense.git

.. warning:: There have been times where a gitsync is not enough to bring a
   system up to date and could leave the system in a broken state. Read the
   commit logs from after the last snapshot update until the most current code
   to be sure.
