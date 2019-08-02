Enabling Additional PHP Modules
===============================

In some cases, such as packages or advanced Captive Portal code,
additional PHP extensions may be required that are not enabled.

There are several PHP extensions that are included in the pfSense® binary
distribution on pfSense software version 2.2 and before, but are left
disabled by default to conserve resources since they are not required by
the base system. These disabled modules may be activated using the
"dynamodules" system.

The extensions included and activated vary by pfSense software version,
look in */usr/local/lib/php/* to see which extensions are present, and
check the output of *php -m* to see what is enabled on a firewall already.

Examples of extensions that are included but not activated may include:

* bz2
* mysql
* pdo_sqlite
* sockets
* sysvmsg
* sysvsem
* sysvshm
* tokenizer
* xdebug

To activate one of these, create a file named for the extension in the
*/etc/dynamodules* directory, and then trigger a rewrite of the
*php.ini* file.

Activate the *mysql.so* module::

  $ mkdir -p /etc/php_dynamodules/
  $ touch /etc/php_dynamodules/mysql
  $ /etc/rc.php_ini_setup 
  $ php -m | grep mysql
  mysql

A reload of the WebGUI process may also be required. Use option **11**
from the console/ssh menu. On pfSense software version 2.2 and later,
also use option **16** to restart PHP-FPM. A reboot would also fully
activate the module, but should not be necessary.

If a module is needed that is not included nor activated, a copy of the
module may be obtained from an equivalent version FreeBSD system using a
matching PHP version. Drop it into the correct lib directory, and
activate it with dynamodules. This is a lot riskier, and may be prone to
break in various ways, thus is it not supported nor recommended.

Installing Additional Modules on pfSense Software version 2.3
-------------------------------------------------------------

Due to the modular nature of pfSense software version 2.3 using pkg, the
extra modules that were included in the base system before are no longer
there by default. They may be easily added using *pkg install*.

For example, to install the *mysqli* extension, use::

  pkg install php56-mysqli

If the package name is not known, use search to find it::

  pkg search mysql
