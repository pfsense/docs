Clearing the DNS Forwarder Cache
================================

To clear the DNS Forwarder cache, restart the *unbound* daemon as
follows:

-  Click **Status > Services**
-  Find **unbound** in the list
-  Click |fa-repeat|, or stop the service using |fa-stop-circle| then start
   again with |fa-play-circle|.

Restarting the daemon will clear the internal cache, but the client PCs
may still have cached entries. The DNS cache on a Windows PC may be
cleaned from a command prompt or **Start > Run**::

  ipconfig /flushdns

This may need to be executed from an Administrator command prompt on
Windows Vista and later.

Other operating systems will surely have other means to clear the DNS
resolver cache. For example, Ubuntu-based distributions also use
*dnsmasq*, and it may be restarted using::

  sudo service network-manager restart

Browsers also have their own internal DNS caches separate from the OS.
Close and re-open the browser if none of the above help.

As a last resort, rebooting/restarting a client will surely clear any
locally cached data.
