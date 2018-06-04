.. include:: /substitutions.rsti

Developing Packages
===================

.. note:: This document is undergoing work to align it with current
   information for pfSense 2.3 and later. Older revisions of the page may
   be viewed to see relevant information for older/deprecated versions.

When developing packages, always target the latest development version
of pfSense first. At the time of this writing, that is pfSense 2.3.

pfSense Package System
----------------------

On pfSense 2.3, every pfSense package is also a FreeBSD port. These are
installed and managed via pkg, even when using the pfSense GUI to add or
remove packages. Binary packages from FreeBSD are added as dependencies
of the pfSense package, so they are installed automatically as well,
along with any any of their required dependencies.

The basic idea behind the pfSense packaging system on 2.3 and later is
to make our packages similar to FreeBSD packages, but with our own
customizations. One way this is achieved is by adding metadata about
packages to the firewall configuration when it is installed, and also
creating the configuration screen of an application using XML. pfSense
provides an optional framework to create the web interface and to store
it in the XML configuration file of the firewall. The package writer is
expected to convert the data from XML to the native format of the
application.

For help converting older style packages to the new Bootstrap GUI, see
:doc:`Converting Packages to Bootstrap </development/converting-packages-to-bootstrap>`.

Package System
--------------

pfSense packages are typically composed of:

-  A Manifest File
-  Package configuration file(s)
-  Supporting PHP files (.inc files, additional .php web interface
   files, etc)

See :doc:`Package Port Directory Structure </development/package-port-directory-structure>` for a more in-depth list
of files and where they are placed in the package structure.

Manifest File
~~~~~~~~~~~~~

The manifest file is located inside the package's port directory::

  <category>/pfSense-pkg-<package name>/files/usr/local/share/pfSense-pkg-<package name>/info.xml

For example::

  sysutils/pfSense-pkg-Cron/files/usr/local/share/pfSense-pkg-Cron/info.xml

This file contains basic information about the package. The format of
the manifest XML file is as follows::

  <package>
  	<name>someprogram</name>
  	<internal_name>someprogram</internal_name>
  	<pkginfolink>https://forum.pfsense.org/</pkginfolink>
  	<descr><![CDATA[Some cool program]]></descr>
  	<website>http://www.example.org/someprogram</website>
  	<category>Services</category>
  	<version>0.99</version>
  	<status>Beta</status>
  	<required_version>2.2</required_version>
  	<config_file>https://packages.pfsense.org/packages/config/someprogram/someprogram.xml</config_file>
  	<maintainer>me@example.com</maintainer>
  	<configurationfile>someprogram.xml</configurationfile>
  	<only_for_archs>i386 amd64</only_for_archs>
  </package>

Package Configuration Files
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The manifest specifies a Package Configuration File for the package
using the *config\_file* tag. The convention is to keep this file inside
the *files/usr/local/pkg/* directory inside the port structure for the
package.

The easiest way to get a feel for the format is to look at existing
packages and how they use these configuration files, how their fields
loook, how the code behaves, and so on.

The format is::

  <?xml version="1.0" encoding="utf-8" ?>
  <packagegui>
   <name></name>
   <version></version>
   <title></title>
   <include_file></include_file>
   <backup_file></backup_file>
   <aftersaveredirect></aftersaveredirect>
   <configpath></configpath>
   <menu>
      <name></name>
      <section></section>
      <configfile></configfile>
      <tooltiptext></tooltiptext>
      <url>/pkg_edit.php?xml=package.xml&act=edit&id=0</url>
   </menu>
   <service>
      <name></name>
      <rcfile></rcfile>
      <executable></executable>
   </service>
   <tabs>
      <tab>
         <text></text>
         <url></url>
         <active/>
         <tab_level/>
      </tab>
   </tabs>
   <additional_files_needed>
      <prefix></prefix>
      <chmod></chmod>
      <item></item>
   </additional_files_needed>
   <adddeleteeditpagefields>
      <columnitem>
         <fielddescr></fielddescr>
         <fieldname></fieldname>
      </columnitem>
   </adddeleteeditpagefields>
   <fields>
      <field>
         <fielddescr></fielddescr>
         <fieldname></fieldname>
         <description></description>
         <size></size>
         <type></type>
      </field>
   </fields>
   <custom_php_global_functions>      </custom_php_global_functions>
   <custom_php_install_command>       </custom_php_install_command>
   <custom_php_deinstall_command>      </custom_php_deinstall_command>
   <custom_add_php_command>      </custom_add_php_command>
   <custom_add_php_command_late>      </custom_add_php_command_late>
   <custom_delete_php_command>      </custom_delete_php_command>
   <custom_php_resync_config_command> </custom_php_resync_config_command>
   <start_command> </start_command>
   <process_kill_command> </process_kill_command>
  </packagegui>

**Field types:**

- interfaces\_selection - combo/list box with interfaces list::

    <field>
      <fielddescr>Interface Selection</fielddescr>
      <fieldname>interfaces</fieldname>
      <type>interfaces_selection</type>
      <description>Select interfaces to listen on</description>
      <multiple/> (optional)
      <size>10</size> (optional)
      for pfsense 2.1 and above:
      <hideinterfaceregex>(wan|loopback)</hideinterfaceregex> (optional)
      <showvirtualips/> (optional)
      <showips/> (optional)
      <showlistenall/> (optional)
    </field>

- checkbox - field with text description and a enable/disable checkbox::

    <field>
      <fielddescr>Enable</fielddescr>
      <fieldname>enable_package</fieldname>
      <type>checkbox</type>
      <description>Select this option to enable this config</description>
    </field>

- input - single line text edit element::

    <field>
      <fielddescr>username</fielddescr>
      <fieldname>username</fieldname>
      <type>input</type>
      <description>Enter package username</description>
    </field>

- password - special input element for passwords, all input will be
  masked with '\*' symbol on gui but clear text on xml config file::

    <field>
      <fielddescr>password</fielddescr>
      <fieldname>password</fieldname>
      <type>password</type>
      <description>Enter password</description>
    </field>

- textarea - multiline text edit element::

    <field>
      <fielddescr>Custom options</fielddescr>
      <fieldname>custom_options</fieldname>
      <type>textarea</type>
      <description>Paste custom config here</description>
      <encoding>base64</encoding> (optional)
    </field>

- select - combobox with dropdown list items::

    <field>
      <fielddescr>Proxy server</fielddescr>
      <fieldname>proxy_server</fieldname>
      <description><![CDATA[Select proxy server to read logs from]]></description>
      <type>select</type>
        <options>
        <option><name>Dansguardian</name><value>dansguardian</value></option>
        <option><name>Squidguard</name><value>squidguard</value></option>
        <option><name>Squid</name><value>squid</value></option>
        </options>
      <multiple/> (optional)
      <size>10</size> (optional)
    </field>

for pfsense 2.1 and above:

- info - just an info text without any options to select::

    <field>
      <fielddescr>Additional info</fielddescr>
      <fieldname>just_info</fieldname>
      <type>info</type>
      <description>show info text on package gui</description>
    </field>

- button - additional buttons to take additional actions on packages::

    <field>
     <fielddescr>Reload config</fielddescr>
     <fieldname>reload</fieldname>
     <type>button</type>
     <description>click to force a config reload</description>
     <placeonbottom/> - use this option to place the button besides save default button
    </field>
    On package inc file, to check what button was selected, use:
    if (($_POST['Submit'] == 'Save') {...}
    if (($_POST['Submit'] == 'Reload') || !isset($_POST['Submit'])){..}

**Field groups (any pfsense version):**

- rowhelper - used in pkg\_edit.php to add multiple config lines like a
  table on package gui. Inside rowhelper, add any field type described
  above::

    <field>
    <fielddescr><![CDATA[Lists]]></fielddescr>
    <fieldname>none</fieldname>
    <description><![CDATA['Format' - Choose the file format that url will retrieve or local file format.]]></description>
    <type>rowhelper</type>
      <rowhelper>
         <rowhelperfield>
         <fielddescr>Format</fielddescr>
         <fieldname>format</fieldname>
         <type>select</type>
             <options>
             <option><name>gz</name><value>gz</value></option>
      	   <option><name>txt</name><value>txt</value></option>
            </options>
         </rowhelperfield>
         <rowhelperfield>
            <fielddescr>Url or localfile</fielddescr>
            <fieldname>url</fieldname>
      	  <type>input</type>
      	  <size>75</size>
         </rowhelperfield>
      </rowhelper>
    </field>

- adddeleteeditpagefields - used with pkg.php to have multiple config
  of the same xml page. Usefull to access lists, users lists, multi
  daemon configs, etc::

    <adddeleteeditpagefields>
      <columnitem>
        <fielddescr>Alias</fielddescr>
        <fieldname>aliasname</fieldname>
      </columnitem>
      <columnitem>
        <fielddescr>Description</fielddescr>
        <fieldname>description</fieldname>
      </columnitem>
      <columnitem>
        <fielddescr>Action</fielddescr>
        <fieldname>action</fieldname>
      </columnitem>
      <columnitem>
        <fielddescr>Update Frequency</fielddescr>
        <fieldname>cron</fieldname>
      </columnitem>
    </adddeleteeditpagefields>

Binaries from FreeBSD
~~~~~~~~~~~~~~~~~~~~~

The actual binaries are normal FreeBSD package binaries for that
particular program. Once listed as a depencency for a pfSense package in
its :doc:`Makefile </development/package-port-directory-structure>`, they are built
automatically on the pfSense pkg server. There is no need to specify
these in XML any longer.

Updating Packages
~~~~~~~~~~~~~~~~~

When updating a package is it important to bump the version in its
:doc:`Makefile </development/package-port-directory-structure>` otherwise the package
will not be rebuilt and made available to others.

Repository Branches
~~~~~~~~~~~~~~~~~~~

When submitting changes, they are typically submitted to the “devel”
branch of the pfSense copy of FreeBSD-ports. In order to show to all
users, the changes must be placed in the current release branch as well,
such as RELENG\_2\_3\_0. Furthermore, the changes should be on any
current maintenance release branches as well, such as RELENG\_2\_3.

Ideally, the changes should be submitted to the development branches and
tested on systems pulling packages from the development repository. Once
the changes have been tested, they can be placed into the release branch
for deployment to everyone. This was not possible with the old package
system.

Testing/Building Individual Packages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If building the pkg versions of the package, the files may be copied to
the firewall and added with pkg directly. The good thing about using pkg
is that the GUI packages and CLI packages are all the same now. Files
for the pfSense package are all kept together inside the archive,
dependencies such as FreeBSD packages are in separate archives.

The package may be compiled on a local FreeBSD 10.3 builder, then pkg
delete the old version and the pkg add the new one or use any other pkg
operations needed.

For example, a basic thing like Cron is pfSense-pkg-Cron-0.3.3, so if a
new copy is built and put on the firewall::

  pkg add /path/to/file/pfSense-pkg-Cron-0.3.3.txz

It will also work with “pkg add” and a URL to an http or https web
server.

Making the package involves:

- Checking out the `ports tree copy from github <https://github.com/pfsense/FreeBSD-ports>`__.
- :doc:`Locating the port's directory </development/package-port-directory-structure>`
- Making changes
- Running “make package” like so::

    $ git clone git@github.com:pfsense/FreeBSD-ports.git pfSense-ports
    $ cd pfSense-ports/blah/pfSense-pkg-foo/
    [hack, hack, hack]
    $ make package  (might need sudo)
    $ scp work/pkg/pfSense-pkg-foo* root@myfirewall:.

And then on the firewall::

  # pkg add pfSense-pkg-foo-<version>.txz

Poudriere could also be setup for a custom repository but in most cases
that will be overkill.

There are some additional considerations if when adding files, like
updating the :doc:`plist </development/package-port-directory-structure>`, and crafting
a new pfSense package from scratch may be tricky if there is no prior
knowledge of how the FreeBSD ports tree works, but overall it will be
smoother in the long run. Definitely easier than PBIs!
