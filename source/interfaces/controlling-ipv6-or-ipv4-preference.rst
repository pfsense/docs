.. include:: /substitutions.rsti

Controlling IPv6 or IPv4 Preference
===================================

By default, the firewall itself will prefer IPv6 if is is configured and
has a default route. It is possible to control whether services on the
firewall itself will prefer IPv4 over IPv6. This may need to be changed
in order to run a firmware upgrade or manage packages if for some reason
the IPv6 routing is not functional but the system believes it is up and
working.

In pfSense 2.2 this is controlled under **System > Advanced** on the
**Networking** tab. Check **Prefer IPv4 over IPv6**, then click
**Save**.

On pfSense 2.1.x, there is no option in the GUI. It can still be changed
at the shell (or with a shellcmd tag.)

To prefer IPv4::

  env ip6addrctl_enable="yes" ip6addrctl_policy="prefer_ipv4" /etc/rc.d/ip6addrctl start

To prefer IPv6 again::

  ip6addrctl flush
