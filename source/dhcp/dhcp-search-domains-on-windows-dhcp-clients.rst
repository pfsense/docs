Using DHCP Search Domains on Windows DHCP Clients
=================================================

The DNS Search Domain functionality present in the DHCP Server settings
in pfSense® software is only supported by some DHCP clients; pfSense
software uses the standard DHCP option 119 mechanism to deliver the
search domains to clients which request them.

Unfortunately, The Microsoft Windows DHCP client **does not support**
requesting option 119, so no matter which DHCP server is used, clients
running Microsoft Windows can never receive or use a search domain list
from DHCP.

If the settings must be used by clients, they can be pushed via GPO or
in the extreme case, the clients can be replaced by ones which support
option 119 such as BSD, Linux, OSX, and so on.

Sources:

-  http://social.technet.microsoft.com/Forums/en-US/winserverNIS/thread/9ba77f86-4708-42ca-a193-2a01b813ec27/
-  http://social.technet.microsoft.com/Forums/en-US/winserverNIS/thread/7ba59619-3484-43fa-8585-a2d69ccd00df/
-  http://technet.microsoft.com/en-us/library/dd572752%28v=office.13%29.aspx
   (See comments)
-  http://serverfault.com/questions/37417/which-dhcp-client-os-support-dhcp-option-119-domain-suffix-search

