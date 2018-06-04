.. include:: /substitutions.rsti

RFC2136 Dynamic DNS
===================

If the DNS for a domain is directly controlled, RFC2136 Dynamic DNS
support may be setup so pfSense can act as a client to it. This How-To
will show how to setup BIND to support this feature.

On the server in named.conf::

   zone "dyn.example.com" {
  	type master;
  	file "dynamic/dyn.example.com";
  	update-policy { grant *.dyn.example.com. self *.dyn.example.com. A AAAA; };
  };

Then create the initial zone file. Be aware that BIND will rewrite this
zone file, which is why a subdomain is used in the example. BIND will
also need read/write access to this file and the directory in which it
resides so that it may rewrite the zone and its journal.

dynamic/dyn.example.com contains::

  $ORIGIN	.
  $TTL 30	; 30 seconds
  dyn.example.com		IN SOA	ns.example.com. hostmaster.example.com. (
  				2013062303 ; serial
  				3600	   ; refresh (1 hour)
  				600	   ; retry (10 minutes)
  				2600	   ; expire (43 minutes	20 seconds)
  				30	   ; minimum (30 seconds)
  				)
  			NS	ns.example.com.
  			NS	ns2.example.com.

Reload the named service, and then if any slave name servers are in
place, add a zone there too::

  zone "dyn.example.com" {
  	type slave;
  	file "dynamic/dyn.example.com";
  	masters{ 192.0.2.5; };
  };

On the master name server, make the keys directory::

  # mkdir -p /etc/namedb/keys

And now generate a host key (the second line is the output of the
command, *not* part of the command itself)::

  # /usr/sbin/dnssec-keygen -K /etc/namedb/keys -a HMAC-MD5 -b 128 -n HOST  myhost.dyn.example.com.
  Kmyhost.dyn.example.com.+157+32768

The output ``Kmyhost.dyn.example.com.+157+32768`` is the first part of
the filename for the key, it will append *.private* to one file and
*.key* to another. Both contain the same data in different formats.

Now grab the key from the new key file::

  # /usr/bin/grep ^Key: /etc/namedb/keys/Kmyhost.dyn.example.com.+157+32768.private | /usr/bin/awk '{ print $2; }'
  /0/4bxF9A08n/zke/vANyQ==

And then add that key to /etc/namedb/dns.keys.conf::

  key myhost.dyn.example.com. {
  	algorithm hmac-md5;
  	secret "/0/4bxF9A08n/zke/vANyQ==";
  };

This can be automated a bit with a simple script, **make-ddns-host.sh**::

  #!/bin/sh
  KEY_NAME=${1}
  KEY_DIR=/etc/namedb/keys
  KEYS_CONFIG=/etc/namedb/dns.keys.conf
  /bin/mkdir -p ${KEY_DIR}
  cd ${KEY_DIR}
  KEY_FILE_NAME=`/usr/sbin/dnssec-keygen -K ${KEY_DIR} -a HMAC-MD5 -b 128 -n HOST ${KEY_NAME}.`
  KEY_TEXT=`/usr/bin/grep "^Key:" ${KEY_DIR}/${KEY_FILE_NAME}.private | /usr/bin/awk '{ print $2; }'`
  echo "key ${KEY_NAME}. {" >> ${KEYS_CONFIG}
  echo "	algorithm hmac-md5;" >> ${KEYS_CONFIG}
  echo "	secret \"${KEY_TEXT}\";" >> ${KEYS_CONFIG}
  echo "};" >> ${KEYS_CONFIG}
  echo "Key for ${KEY_NAME} is: ${KEY_TEXT}"

After making the file, make it executable::

  # chmod u+x make-ddns-host.sh

To use the script::

  # ./make-ddns-host.sh mynewhost.dyn.example.com
  # rndc reload

To add a DynDNS entry in the pfSense GUI

-  Navigate to **Services > Dynamic DNS**, **RFC 2136** tab
-  Click |fa-plus| to create a new entry with the following settings:

   -  **Enable**: Checked
   -  **Interface**: *WAN*
   -  **Hostname**: FULL hostname, e.g. *xxxxx.dyn.example.com*
   -  **TTL**: *30*
   -  **Key Name**: FULL hostname again, exactly,
      *xxxxx.dyn.example.com*
   -  **Key Type**: *Host*
   -  **Key**: Secret key from above
   -  **Server**: *192.0.2.5* (Or whatever the new IP is!)
   -  **Protocol**: Unchecked
   -  **Description**: *My DynDNS Entry*

And that should be it. Assuming the firewall has connectivity to the
name server, and there are no other access policies that would prevent
the update, RFC2136 DynDNS service is now working. Should anything not
work as expected, check the system log and/or the log on the name
server.
