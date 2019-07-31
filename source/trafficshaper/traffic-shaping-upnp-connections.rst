Traffic Shaping UPnP Connections
================================

UPnP rules are generated dynamically by the UPnP daemon happen outside
of the typical user rules. There is a configuration option for UPnP
where a queue can be defined to which UPnP will direct traffic that is
directed through the rules it creates. This may be set through the
pfSense® webGUI at **Services > UPnP & NAT-PMP**, and type in a valid
**Traffic Shaping Queue**.
