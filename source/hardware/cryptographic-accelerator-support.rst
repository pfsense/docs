Cryptographic Accelerator Support
=================================

Cryptographic acceleration is available on some platforms, typically on
hardware that has it available in the CPU like AES-NI, or built into the
board such as the one used on ALIX systems. Add on cards such as
those from Hifn are also supported. Any crypto accelerator supported by
FreeBSD will work.

Boards utilizing the AMD Geode platform typically have the "AMD Geode LX
Security Block" which supports certain encryption types. It will show up
in dmesg as the glxsb device::

  glxsb0: <AMD Geode LX Security Block (AES-128-CBC, RNG)> mem 0xefff4000-0xefff7fff irq 9 at device 1.2 on pci0

Ensure that the VPN technology to be used is configured for the cipher
shown in demsg, likely AES-128-CBC.

AES-NI support via the kernel module requires running an amd64 pfSense®
image. It will not work on i386 and will fail with a message similar to::

  Dec  4 14:45:05 pfSense kernel: link_elf: symbol AES_GCM_encrypt undefined

Reload pfSense on that hardware using an amd64 pfSense image and it will
work.

Activating the Hardware
-----------------------

Some hardware, such as Hifn cards, is active at all times and there is
no way to disable it short of removing the crypto card. VIA Padlock and
some others are on the mainboard and cannot be disabled.

Others, such as AES-NI or glxsb on ALIX require choosing the appropriate
module under **System > Advanced** on the **Miscellaneous** tab. Choose
the appropriate module to match the hardware for **Cryptographic
Hardware** and then Save. The module will be loaded and available
immediately.

To deactivate a loaded module, select *None* for **Cryptographic
Hardware**, Save, and then reboot the unit.

Verifying Support
-----------------

To see a list of engines and associated transforms supported by the
hardware and active modules though OpenSSL, run:

On 2.1.x::

  /usr/local/bin/openssl engine -t -c

On 2.2 and later::

  /usr/bin/openssl engine -t -c

Example output on an ALIX with glxsb loaded::

  : /usr/bin/openssl engine -t -c
  (cryptodev) BSD cryptodev engine
   [RSA, DSA, DH, AES-128-CBC]
       [ available ]
  (dynamic) Dynamic engine loading support
       [ unavailable ]

.. note:: That is only for support via OpenSSL. Other areas such as IPsec may
   support additional methods not listed.

Comparison
----------

The difference can be very dramatic, as illustrated in the following
example on an ALIX.2D3::

  alix:~#  openssl speed -evp aes-128-cbc
  To get the most accurate results, try to run this
  program when this computer is idle.
  Doing aes-128-cbc for 3s on 16 size blocks: 977706 aes-128-cbc's in 2.96s
  Doing aes-128-cbc for 3s on 64 size blocks: 265799 aes-128-cbc's in 2.89s
  Doing aes-128-cbc for 3s on 256 size blocks: 70799 aes-128-cbc's in 2.98s
  Doing aes-128-cbc for 3s on 1024 size blocks: 17854 aes-128-cbc's in 2.98s
  Doing aes-128-cbc for 3s on 8192 size blocks: 2242 aes-128-cbc's in 2.99s
  OpenSSL 0.9.8e 23 Feb 2007
  built on: Fri May 15 13:50:54 EDT 2009
  options:bn(64,32) md2(int) rc4(idx,int) des(ptr,risc1,16,long) aes(partial) blowfish(idx)
  compiler: cc
  available timing options: USE_TOD HZ=128 [sysconf value]
  timing function used: getrusage
  The 'numbers' are in 1000s of bytes per second processed.
  type             16 bytes     64 bytes    256 bytes   1024 bytes   8192 bytes
  aes-128-cbc       5291.37k     5885.35k     6076.70k     6130.61k     6141.80k

The numbers appear fairly consistent regardless of size, increasing a
little with larger chunks.

Now compare this to the results when using cryptographic acceleration::

  alix:~#  openssl speed -evp aes-128-cbc -engine cryptodev
  engine "cryptodev" set.
  To get the most accurate results, try to run this
  program when this computer is idle.
  Doing aes-128-cbc for 3s on 16 size blocks: 110894 aes-128-cbc's in 0.10s
  Doing aes-128-cbc for 3s on 64 size blocks: 107049 aes-128-cbc's in 0.11s
  Doing aes-128-cbc for 3s on 256 size blocks: 92452 aes-128-cbc's in 0.11s
  Doing aes-128-cbc for 3s on 1024 size blocks: 58844 aes-128-cbc's in 0.06s
  Doing aes-128-cbc for 3s on 8192 size blocks: 12051 aes-128-cbc's in 0.00s
  OpenSSL 0.9.8e 23 Feb 2007
  built on: Fri May 15 13:50:54 EDT 2009
  options:bn(64,32) md2(int) rc4(idx,int) des(ptr,risc1,16,long) aes(partial) blowfish(idx)
  compiler: cc
  available timing options: USE_TOD HZ=128 [sysconf value]
  timing function used: getrusage
  The 'numbers' are in 1000s of bytes per second processed.
  type             16 bytes     64 bytes    256 bytes   1024 bytes   8192 bytes
  aes-128-cbc      17739.14k    64203.92k   206499.31k   952502.43k 22441871.33k

Quite an increase from before, just shy of a 3694x larger data set
processed at 8192 bytes!

Unfortunately, VPNs do not use chunks of data that large, so the
difference is not so dramatic in practice

Practical Use
-------------

OpenVPN
~~~~~~~

To take advantage of acceleration in OpenVPN, choose a supported cipher
such as *aes-128-cbc* on each end of a given tunnel, then select *BSD
Cryptodev Engine* for **Hardware Crypto**.

Similarly, if the system employs the VIA Padlock engine, choose an
appropriate cipher and select *VIA Padlock* for **Hardware Crypto**.

Nothing needs selected for OpenVPN to utilize AES-NI. The OpenSSL engine
has its own code for handling AES-NI that works well without using the
*BSD Cryptodev Engine*.

IPsec
~~~~~

IPsec will take advantage of cryptodev automatically when a supported
cipher is chosen. For AMD Geode systems, this is *AES* with a *128-bit*
key length, and for Hifn card users, *3DES* or others known to be
accelerated by the crypto card.

For AES-NI acceleration, use AES-GCM on both sides of the tunnel.
(Requires pfSense 2.2)

Benchmarks
----------

Here is a chart showing VPN throughput on an ALIX.2D3. Note the higher
performance when using the accelerated ciphers with *glxsb*.

.. image:: /_static/hardware/alix2d3_vpn_throughput.png

The Hifn accelerator is a much better performer, increasing maximum
throughput on an ALIX to around 34 Mbps.
