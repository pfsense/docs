.. include:: /substitutions.rsti

Troubleshooting a Full Filesystem or Inode Errors
=================================================

One unfortunate day encounter error messages may appear indicating that
the hard drive in the firewall is full, such as these::

  /: write failed, filesystem is full
  /: create/symlink failed, no inodes free
  Warning: session_start(): open(/tmp/sess_XXXXXX, O_RDWR) failed: No space left on device

The typical cause of such errors is rarely that the drive is full, but
that the operating system is unable to contact the drive. In short, the
disk (HDD, SSD, CF, etc) is dead or dying.

In cases when the drive is dying, the OS tries to write to the drive,
and receives back an error code that there aren't any inodes left.
Typically other messages about the underlying problem are logged to the
console but not passed back to PHP so they can be seen by the GUI.
Usually those refer to things like g_vfs_done or
:doc:`/hardware/dma-and-lba-errors`.

In order to eliminate the possibility that the drive is actually full
(perhaps a package went crazy eating up space), try to get to a shell
from the console or ssh, and run the following command::

  : df -hi

The output shows disk space usage for both capacity and inodes, using
human-readable numbers. The **System Information** widget on the
Dashboard on pfSense 2.2 shows the usage for all mounted partitions.
Earlier versions only showed usage for the root (/) slice. The
following output is from an ALIX system running NanoBSD::

  Filesystem           Size    Used   Avail Capacity iused ifree %iused  Mounted on
  /dev/ufs/pfsense1    442M    167M    239M    41%    6.3k   52k   11%   /
  devfs                1.0k    1.0k      0B   100%       0     0  100%   /dev
  /dev/ufs/cf           48M    1.7M     43M     4%      26  6.4k    0%   /cf
  /dev/md0              48M     84k     44M     0%      56  6.6k    1%   /tmp
  /dev/md1              77M     16M     54M    24%     133   10k    1%   /var
  devfs                1.0k    1.0k      0B   100%       0     0  100%   /var/dhcpd/dev

Note that the devfs lines do NOT indicate an actual problem; The devfs
filesystem is virtual and used for housing device nodes not for files.

Of special concern on NanoBSD is the space on */var* and */tmp*, since
they are RAM disks. Some things, such as an abnormally large DHCP leases
file, can in fact fill up the */var* memory disk and that is one way to
encounter the problem.

If the root (*/*) slice has space and inodes remaining, and so do */var*
and */tmp* and so on, then the problem is most likely a failing disk.

If disk space has been exhausted, find a way to free it up. This usually
involves uninstalling or removing packages such as squid, or changing
the settings so they use less space.

If the disk is failing, swap it out as soon as possible.

Often when the drive is failing or full the system will continue routing
packets indefinitely until it would need to access the hard drive, at
which point it would quit. We have seen them run for months with a dead
drive unnoticed before, though of course that is not advisable.

Another possible cause is mild filesystem corruption, which could be
helped by :doc:`/hardware/forcing-a-filesystem-check`.
