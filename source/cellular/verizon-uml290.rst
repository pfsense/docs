Verizon UML290 Cellular Modem
=============================

These instructions are specifically for the Verizon 4G modem Pantech
UML290.

First, find the phone number associated with the device. One way to find
it is to install the VZAccess Manager on a Windows PC and then plug in
the device and let it detect the phone number. I also connected from the
Windows PC to ensure it was activated but I'm not sure if that is
necessary.

Follow the instructions here for how to configure the interface in
pfSense® software: :doc:`/cellular/configuring-3g-modems`.

Some setups may need to modify the instructions because ``#777`` may not
work. Instead try ``*99***3#``. Also for **username** try
``devicephone#@vzw4g.com`` and for **password** put ``vzw``.

