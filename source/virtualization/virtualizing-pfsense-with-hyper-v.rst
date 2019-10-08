Virtualizing pfSense with Hyper-V
=================================

This article is about building and running a pfSense® virtual machine
under Microsoft Hyper-V. The guide applies to any Hyper-V version,
desktop or server (this includes the standalone Hyper-V Server). The
guide explains how to install any major pfSense software version under
Hyper-V. Article covers the Hyper-V networking setup and pfSense software
virtual machine setup process. The guide does not cover how to install
Hyper-V or Windows Server. A basic, working, pfSense virtual machine will
exist by the end of this article.

.. note:: If pfSense software will be used as a perimeter firewall for an
   organization and the "attack surface" should be minimized, many will say
   it is preferable to run it non-virtualized on stand-alone hardware. That
   is a decision for the user and/or organization to make, however. Now
   back to the topic.

We're going to start at the point where we have a Windows Server 2016
with the Hyper-V role installed. If other VMs are already running on
Hyper-V, then it is not likely necessary to follow the networking steps
too closely. However, we recommend skimming through it to see what is
suggested before building the pfSense virtual machine part.

Assumptions
~~~~~~~~~~~

* Hyper-V host is up and Hyper-V role has been installed.
* The reader has an basic understanding of networking and Hyper-V
  virtualization

Basic Hyper-V Networking
------------------------

To virtualize pfSense software, first create two **Virtual
Switches** via Hyper-V Manager. In the Hyper-V Manager open **Virtual
Switch Manager** from the **Actions** menu. Select **Internal** type of
virtual switch and click **Create Virtual Switch**

|Virtual switch config|

Name the newly added switch LAN and select private network. Click apply.

|Virtual switch config 2|

Now we create WAN switch the same way we did with LAN. Make sure
**Allow management operating system to share this network adapter** is
not selected if you have a dedicated NIC for WAN. For the purpose of
this guide the management was allowed, however in production you must
have a separate NIC for WAN. Click OK.

|Virtual switch config 3|

Creating the virtual machine
----------------------------

After creating WAN and LAN switches, we move to virtual machine
creation. Start the new virtual machine wizard add a name.

|Virtual machine config 1|

After clicking next select the appropriate virtual machine Generation.
If you're installing pfSense software version 2.3.x, select
**Generation 1**. If you are installing pfSense software version 2.4.x,
select **Generation 2**.

|Virtual machine config 2|

On the **Assign Memory** step add enough of RAM for your needs. For
this guide, we have added 1GB. 2GB is recommended if you intend to run
multiple packages.

|Virtual machine config 3|

Next step is to **Configure Networking**, select WAN from
**Connection** drop-down menu. We will add LAN later.

|Virtual machine config 4|

On the next step select **Create a virtual hard disk** and assign
10-20GB to the pfSense firewall. Larger disk size is required if you
plan on running Squid caching.

|Virtual machine config 5|

Select **Install an operating system from a bootable CD/DVD-ROM** and
browse to the pfSense installer ISO.

|Virtual machine config 6|

Review the virtual machine information and finish the wizard!

|Virtual machine config 7|

Open **Settings** of the newly created pfSense virtual machine and add
another network adapter. Select **LAN** virtual switch for the
adapter.

|Virtual machine config 8|

Review the VM settings and make sure you have WAN and LAN switches
selected under network adapters

|Virtual machine config 9|

Installing pfSense Software
---------------------------

After successfully creating and configuring the pfSense virtual machine,
it's time to start it.

|Installing pfSense 1|

Wait for the virtual machine to boot up and press **I** to invoke
installer.

|Installing pfSense 2|

Once installer boots up select the **Quick/Easy Install** and follow
the installer steps.

|Installing pfSense 3|

When prompted, select the standard kernel and continue the
installation.

|Installing pfSense 4|

After installation is complete, select reboot and eject the ISO.

|Installing pfSense 5|

First boot and interfaces assignment
------------------------------------

The pfSense virtual machine should boot up quickly and welcome you
with Interfaces assignments. Select **N** to not set up VLAN's now.

|Interfaces 1|

In the following steps assign WAN and LAN interfaces to the
appropriate network adapters. You can check the MAC address within the
virtual machine settings.

|Interfaces 2|

After assigning interfaces, pfSense software will finish the boot-up.
Verify both interfaces have the correct IP addresses.

|Interfaces 3|

Congratulations! You now have a pfSense firewall running as a virtual
machine on Microsoft Hyper-V.

**Guide under construction, may have minor errors**

.. |Virtual switch config| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.18.16.png
.. |Virtual switch config 2| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.18.37.png
.. |Virtual switch config 3| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.20.22.png
.. |Virtual machine config 1| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.33.03.png
.. |Virtual machine config 2| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.33.18.png
.. |Virtual machine config 3| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.33.24.png
.. |Virtual machine config 4| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.33.34.png
.. |Virtual machine config 5| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.33.45.png
.. |Virtual machine config 6| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.35.51.png
.. |Virtual machine config 7| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.35.56.png
.. |Virtual machine config 8| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.36.18.png
.. |Virtual machine config 9| image:: /_static/virtualization/screen_shot_2017-06-14_at_18.02.23.png
.. |Installing pfSense 1| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.36.46.png
.. |Installing pfSense 2| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.37.17.png
.. |Installing pfSense 3| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.39.23.png
.. |Installing pfSense 4| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.41.56.png
.. |Installing pfSense 5| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.54.48.png
.. |Interfaces 1| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.56.20.png
.. |Interfaces 2| image:: /_static/virtualization/screen_shot_2017-06-14_at_16.56.47.png
.. |Interfaces 3| image:: /_static/virtualization/screen_shot_2017-06-14_at_17.10.47.png

