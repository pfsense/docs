IPsec Logs
==========

The IPsec logs show output from the IPsec daemon. Normal output,
successful connections, as well as errors are all displayed here. On
pfSense 2.1.x and before, this output is from the **racoon** daemon. On
pfSense 2.2 and later this task is handled by **strongswan**

Where possible, if a log message contains an IP address of a configured
IPsec tunnel, that tunnel's description is prepended to the log entry.

Entries found in these logs are covered in depth in the |book_link|, and some
errors are covered in :doc:`IPsec Troubleshooting
</vpn/ipsec/ipsec-troubleshooting>`.
