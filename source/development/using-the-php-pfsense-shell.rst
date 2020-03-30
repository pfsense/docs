Using the pfSense PHP Shell
===========================

Using the PHP pfSense® shell allows configuration of the config.xml file
directly without needing to use the webConfigurator. Using this system
can also allow rapid deployment of pfSense software and/or the setup of
exotic configurations.

The following will show an example session, with the text coming from
the "help" command in the PHP shell.

Follow each line or group of lines to run with "exec;"::

  *** Welcome to pfSense 2.4.5-RELEASE (amd64) on rose ***

   WAN (wan)       -> vmx0       -> v4/DHCP4: 198.51.100.3/24
                                    v6/DHCP6: 2001:db8::ffff:22d6/128
   LAN (lan)       -> vmx1       -> v4: 10.3.0.1/24
                                    v6/t6: 2001:db8:1:eee0:20c:29ff:fe45:260/60

   0) Logout (SSH only)                  9) pfTop
   1) Assign Interfaces                 10) Filter Logs
   2) Set interface(s) IP address       11) Restart webConfigurator
   3) Reset webConfigurator password    12) PHP shell + pfSense tools
   4) Reset to factory defaults         13) Update from console
   5) Reboot system                     14) Disable Secure Shell (sshd)
   6) Halt system                       15) Restore recent configuration
   7) Ping host                         16) Restart PHP-FPM
   8) Shell

  Enter an option: 12
  
  
  Starting the pfSense developer shell....
  
  Welcome to the pfSense developer shell
  
  Type "help" to show common usage scenarios.
  
  Available playback commands:
       changepassword disablecarp disabledhcpd disablereferercheck enableallowallwan enablecarp
       enablesshd externalconfiglocator generateguicert gitsync installpkg listpkg removepkgconfig
       removeshaper restartdhcpd restartipsec svc uninstallpkg
  
  pfSense shell: help
  
  	Enter a series of commands and then execute the set with "exec".
  
  	For example:
  	echo "foo"; // php command
  	echo "foo2"; // php command
  	! echo "heh" # shell command
  	exec
  
  	Example commands:
  
  	record <recordingfilename>
  	stoprecording
  	showrecordings
  
  	parse_config(true);  # reloads the $config array
  
  	$temp = print_r($config, true);
  	more($temp);
  
  	/* to output a configuration array */
  	print_r($config);
  
  	/* to output the interfaces configuration portion of config.xml */
  	print_r($config['interfaces']);
  
  	/* to output the dhcp server configuration */
  	print_r($config['dhcpd']);
  
  	/* to exit the  developer shell */
  	exit
  
  	/* to output supported wireless modes for an interface */
  	print_r(get_wireless_modes(\"ath0\"));
  
  	/* to enable SSH */
  	$config['system']['enablesshd'] = true;
  
  	/* change OPTX to the OPT interface name such as BACKHAUL */
  	$config['interfaces']['optx']['wireless']['standard'] = "11a";
  	$config['interfaces']['optx']['wireless']['mode'] = "hostap";
  	$config['interfaces']['optx']['wireless']['channel'] = "6";
  
  	/* to enable dhcp server for an optx interface */
  	$config['dhcpd']['optx']['enable'] = true;
  	$config['dhcpd']['optx']['range']['from'] = "192.168.31.100";
  	$config['dhcpd']['optx']['range']['to'] = "192.168.31.150";
  
  	/* to disable the firewall filter */
  	$config['system']['disablefilter'] = true;
  
  	/* to enable an interface and configure it as a DHCP client */
  	$config['interfaces']['optx']['disabled'] = false;
  	$config['interfaces']['optx']['ipaddr'] = "dhcp";
  
  	/* to enable an interface and set a static IPv4 address */
  	$config['interfaces']['wan']['enable'] = true;
  	$config['interfaces']['wan']['ipaddr'] = "192.168.100.1";
  	$config['interfaces']['wan']['subnet'] = "24";
  
  	/* to save out the new configuration (config.xml) */
  	write_config();
  
  	/* to reboot the system after saving */
  	system_reboot_sync();

Recording and Playback
~~~~~~~~~~~~~~~~~~~~~~

For example check out this sessions which automates a number of
commands. After typing those sets of commands in 5+ times it gets old
quick. Record and playback to the rescue.

Recording a session
-------------------

.. code::

  # /usr/local/sbin/pfSsh.php
  
  Starting the pfSense developer shell....
  
  Welcome to the pfSense developer shell
  
  Type "help" to show common usage scenarios.
  
  Available playback commands:
       changepassword disablecarp disabledhcpd disablereferercheck enableallowallwan enablecarp
       enablesshd externalconfiglocator generateguicert gitsync installpkg listpkg removepkgconfig
       removeshaper restartdhcpd restartipsec svc uninstallpkg
  
  pfSense shell: record resetrrd
  Recording of resetrrd started.
  pfSense shell: require_once("filter.inc");
  pfSense shell: require("shaper.inc");
  pfSense shell: require_once("rrd.inc");
  pfSense shell: ! rm /var/db/rrd/*.rrd
  pfSense shell: enable_rrd_graphing();
  pfSense shell: setup_gateways_monitor();
  pfSense shell: stoprecording
  Recording stopped.
  pfSense shell: exit

Playing back a session
----------------------

.. code::

  # /usr/local/sbin/pfSsh.php
  Starting the pfSense developer shell....
  
  Welcome to the pfSense developer shell
  
  Type "help" to show common usage scenarios.
  
  Available playback commands:
       changepassword disablecarp disabledhcpd disablereferercheck enableallowallwan enablecarp
       enablesshd externalconfiglocator generateguicert gitsync installpkg listpkg removepkgconfig
       removeshaper resetrrd restartdhcpd restartipsec svc uninstallpkg
  
  pfSense shell: playback resetrrd
  
  Playback of file resetrrd started.
  
  pfSense shell: exit

Sessions can be played back directly from the command line as well::

  # pfSsh.php playback resetrrd
