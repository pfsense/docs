Configuring UPnP and NAT-PMP
============================

**UPnP** is short for `Universal Plug and
Play <https://en.wikipedia.org/wiki/Universal_Plug_and_Play>`__ and is
commonly found on Windows, BSD and Linux systems.

**NAT-PMP** is short for `NAT Port Mapping
Protocol <https://en.wikipedia.org/wiki/NAT_Port_Mapping_Protocol>`__ and
is similar to UPnP but found more commonly on Apple devices and
programs.

A growing number of programs support both methods.

pfSense® software supports both, and the service may be configured at **Services >
UPnP & NAT-PMP**.

UPnP and NAT-PMP both allow devices and programs that support them to
automatically add dynamic port forwards and firewall entries. The most
common uses are in gaming systems (XBox, Playstation, etc) and
BitTorrent programs like uTorrent, which both rely on allowing inbound
connections to a local service.

.. warning:: Potential Security Risk!

If UPnP or NAT-PMP are enabled, use only devices and programs which are
trusted. These mechanisms **will** allow these entities to **bypass the
firewall** to allow incoming connections with no additional control or
authorization. *Do not be surprised* when this happens.

Access permissions for the service may be crafted in the options within
pfSense software. The format of these is shown in the GUI at 
**Services > UPnP & NAT-PMP** in the **User specified permissions**
boxes. Using these, access could be restricted to a specific workstation
or device.

