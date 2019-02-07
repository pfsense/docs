Troubleshooting Thread Errors with Hostnames in Aliases
=======================================================

If a large number of hostnames are present in aliases, the following error may
appear in the system log::

  filterdns: Unable to create monitoring thread for host myhost.example.com! It
  will not be monitored

This error indicated that the ``filterdns`` daemon hit the limit of the number
of concurrent threads it could launch in order to resolve and monitor the
hostnames properly.

The cure for this is to raise the number of allowed threads per process. This
can be done by navigating to **System > Advanced** on the **System Tunables**
tab. There, create an entry for ``kern.threads.max_threads_per_proc`` and set it
to ``4096``.

After raising that value, ``filterdns`` must be restarted. This can be done by
any method that triggers a filter reload, such as navigating to **Status >
Filter Reload** and clicking **Reload Filter**.
