Blocking Instant Message Applications
=====================================

pfSense is a firewall that works on layer 3 and layer 4, so it can
handle IP addresses and port numbers well. Instant Message (IM) vendors
actively try to bypass firewalls so they change server IP addresses
frequently, use many IP addresses, and disguise traffic as HTTP. This
presents a major problem because it is difficult to differentiate
between IM HTTP traffic and a legitimate web page traffic when using
layers 3 and 4. Layer 7 information is needed to inspect URLs and
protocols. **This is best done using the SQUID package**, but if that is
not in use, then the workaround is to stop the traffic using DNS and
firewall rules and is detailed below.

Details
-------

First the IM authentication servers must be identified and then they
should be forced to resolve as 127.0.0.1 in the pfSense DNS forwarder.
The clients must use the pfSense firewall as their DNS server and no
other DNS traffic should be allowed out of the network.

MSN
~~~

MSN servers that should be blocked using firewall rules and the DNS
forwarder:

-  webmessenger.msn.com
-  messenger.hotmail.com
-  gateway.messenger.hotmail.com

Also use firewall rules to reject or block ports 1863, 901 and 6891-6900
to stop MSN Messenger.

Yahoo
~~~~~

Yahoo servers that should be blocked using firewall rules and the DNS
forwarder:

-  login.yahoo.com
-  msg.edit.yahoo.com
-  edit.messenger.yahoo.com
-  csa.yahoo.com
-  csb.yahoo.com
-  csc.yahoo.com

Google Talk
~~~~~~~~~~~

General Information
^^^^^^^^^^^^^^^^^^^

Google Talk servers that should be blocked:

-  talk.google.com

**NOTE**: that this is the same as www.google.com so should only be
redirected in DNS and **not** blocked using firewall rules unless Google
search should also be blocked.

Also use firewall rules to block port 5222 to stop Google Talk.

Additional Information
^^^^^^^^^^^^^^^^^^^^^^

::

    From: Google Team <talk-feedback_at_google.com>

    Hello,
       Thank you for contacting the Google Talk Team. We understand that it is
       sometimes necessary to disable instant messaging services on a network. If
       you need to disable Google Talk on your network, we suggest blocking DNS
       lookups to talk.google.com, by returning 127.0.0.1.
       If we can be of further assistance, please respond to this message and a
       member of the Google Talk Team will respond to you shortly.
       Sincerely,
       The Google Team

