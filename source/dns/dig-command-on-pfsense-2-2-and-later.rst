.. include:: /substitutions.rsti

Dig command on pfSense 2.2 and later
====================================

The *dig* command was part of the BIND utilities included in FreeBSD
base on 9.x and below. pfSense had included *dig* in the past as a part
of the FreeBSD base but it is not included currently. On FreeBSD 10.x,
BIND was removed from base and replaced by Unbound. pfSense 2.2 followed
suit and began using Unbound as well.

For situations where *dig* was used in the past, the *drill* command
should be used instead on FreeBSD 10.x.

*drill* has very similar output to dig, but has different syntax. Run
*drill -h* for more information (see below).

Examples
--------

DNS Trace:

.. code::

  dig +trace www.google.com

.. code::

  drill -V5 -T www.google.com

Help
----

.. code::

  # drill -h
  drill version 1.6.16 (ldns version 1.6.16)
  Written by NLnet Labs.
  
  Copyright (c) 2004-2008 NLnet Labs.
  Licensed under the revised BSD license.
  There is NO warranty; not even for MERCHANTABILITY or FITNESS
  FOR A PARTICULAR PURPOSE.
    Usage: drill name [@server] [type] [class]
     <name>  can be a domain name or an IP address (-x lookups)
     <type>  defaults to A
     <class> defaults to IN

     arguments may be placed in random order

    Options:
     -D              enable DNSSEC (DO bit)
     -T              trace from the root down to <name>
     -S              chase signature(s) from <name> to a know key [*]
     -V <number>     verbosity (0-5)
     -Q              quiet mode (overrules -V)
     -f file         read packet from file and send it
     -i file         read packet from file and print it
     -w file         write answer packet to file
     -q file         write query packet to file
     -h              show this help
     -v              show version
    Query options:
     -4              stay on ip4
     -6              stay on ip6
     -a              fallback to EDNS0 and TCP if the answer is truncated
     -b <bufsize>    use <bufsize> as the buffer size (defaults to 512 b)
     -c <file>       use file for rescursive nameserver configuration
                     (/etc/resolv.conf)
     -k <file>       specify a file that contains a trusted DNSSEC key [**]
                     Used to verify any signatures in the current answer.
                     When DNSSEC enabled tracing (-TD) or signature
                     chasing (-S) and no key files are given, keys are read
                     from: /etc/unbound/root.key
     -o <mnemonic>   set flags to:
                     [QR|qr][AA|aa][TC|tc][RD|rd][CD|cd][RA|ra][AD|ad]
                     lowercase: unset bit, uppercase: set bit
     -p <port>       use <port> as remote port number
     -s              show the DS RR for each key in a packet
     -u              send the query with udp (the default)
     -x              do a reverse lookup
     when doing a secure trace:
     -r <file>       use file as root servers hint file
     -t              send the query with tcp (connected)
     -d <domain>     use domain as the start point for the trace
     -y <name:key[:algo]>    specify named base64 tsig key, and optional an
                     algorithm (defaults to hmac-md5.sig-alg.reg.int)
     -z              don't randomize the nameservers before use

    [*] = enables/implies DNSSEC
    [**] = can be given more than once

    ldns-team@nlnetlabs.nl | http://www.nlnetlabs.nl/ldns/

