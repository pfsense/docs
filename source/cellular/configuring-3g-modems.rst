.. include:: /substitutions.rsti

Configuring 3G modems
=====================

To configure a 3G modem on pfSense on a current supported release, plug
in a :doc:`known-working-3g-4g-modems` and log into the web
interface to begin configuration.

Configuring PPP
---------------

Browse to **Interfaces > (assign)**, and click the **PPPs** tab. Click
**+** on that screen.

In the **Link Type** drop down, select *PPP*.

In the **Link interface(s)** box, the list will be populated with serial
ports on the system. Select the port for the modem. A modem may list
several serial ports. Typically it is the last one, but may require some
trial and error. Future versions of pfSense may properly auto-detect
modems but that has historically been a source of problems.

Optionally fill in a **Description**, which will be used to reference
this PPP configuration in other parts of the web interface.

Under **Service Provider**, select the **Country**. The **Provider**
list for that country will appear, then select the provider of the card.
Then in the **Plan** drop down, select the plan. This should adequately
fill in all the PPP details needed for the connection. Click **Save**.

.. image:: /_static/cellular/3g-setup-1.png

At the PPPs screen, the newly created PPP interface will be listed.

.. image:: /_static/cellular/3g-setup-2.png

Assigning the PPP Interface
---------------------------

Next the PPP interface must be created. Click the **Interface
assignments** tab, and click the **+** to add a new interface. Select
the PPP interface, click **Save**, then **Apply changes**.

.. image:: /_static/cellular/3g-setup-3.png

Enable the PPP Interface
------------------------

Now browse to **Interfaces > OPT1** (or the interface name shown for the
the PPP interface when it was assigned above). Check the **Enable
Interface** box, rename it if desired, and click **Save**. Do not change
anything else on the page. Then click **Apply changes**.

Check the interface status
--------------------------

Browse to **Status > Interfaces** to check the status of the newly
created and assigned PPP interface. If it does not show connected, check
the logs under **Status > System logs**, **PPP** tab to see why its
connection is failing.

Note that some connection problems are a lack of signal. If the 3G modem
is in a location with poor reception, such as an equipment room,
datacenter, rack, etc, then it may be advisable to use a longer USB
cable and/or Antenna to achieve a better signal.

