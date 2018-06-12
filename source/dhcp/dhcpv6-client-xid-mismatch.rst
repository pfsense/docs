.. include:: /substitutions.rsti

Troubleshooting DHCPv6 Client XID Mismatches
============================================

An IPv6 WAN configured to obtain is address via DHCPv6 can suddenly find itself
without an IPv6 address if the transaction ID for the IPv6 DHCP client does not
match.

When this happens, a log message similar to the following may appear in the DHCP
and/or System logs::

  dhcp6c[xxxxx]: client6_recvadvert: XID mismatch

When this happens, the most common cause is having multiple running copies of
the DHCPv6 client (``dhcp6c``) on the same interface. Both clients send out a
request with different transaction IDs and then get confused by the responses.

When this happens, the quickest way to ensure the clients are reset is to kill
the duplicates and start the client again.

From the shell or from **Diagnostics > Command Prompt**, first check for
duplicate clients::

  # ps uxawww | grep dhcp6c
  root xxxxx 0.0 0.0 5780 1488 ?? INs Sat09PM 0:00.90 /usr/local/sbin/dhcp6c -d -c /var/etc/dhcp6c_wan.conf -p /var/run/dhcp6c_re1.pid re1
  root xxxxy 0.0 0.0 5780 1524 ?? Is Tue07AM 0:00.30 /usr/local/sbin/dhcp6c -d -c /var/etc/dhcp6c_wan.conf -p /var/run/dhcp6c_re1.pid re1

Once it has been confirmed that a duplicate client is running, ``kill`` them::

  # killall -9 dhcp6c

Then navigate to **Interfaces > WAN**, click **Save**, then click **Apply
Changes**.

The WAN should now have its IPv6 address once again.

