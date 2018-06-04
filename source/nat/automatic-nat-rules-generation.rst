.. include:: /substitutions.rsti

Automatic NAT Rules Generation
==============================

In a default single WAN connection configuration, pfSense automatically
generates NAT rules for every directly connected interface and any
networks reachable through internal gateways defined via :doc:`Static Routes </routing/static-routes>`. These NAT rules will perform NAT on outbound
traffic to translate the source address of Internet-bound traffic to the
WAN IP.

In a default multi-WAN configuration, pfSense automatically generates
NAT rules to NAT any internal subnet leaving any interface with a
gateway (including `OPT WAN <OPT_WAN>`__ connections).

The Outbound NAT Configuration may be changed by visiting **Firewall >
NAT** on the **Outbound** tab.

With :doc:`Manual Outbound NAT </nat/advanced-outbound-nat>` (`AON <AON>`__),
this automatic rule generation may be disabled and custom outbound NAT
rules may be defined manually. When switching to **Manual Outbound NAT**
without any rules defined, a set of rules is created automatically that
is the equivalent of the rules currently in use by **Automatic Outbound
NAT**.
