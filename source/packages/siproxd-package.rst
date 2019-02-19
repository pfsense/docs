Siproxd package
===============

.. warning:: For many modern SIP configurations this package is unnecessary.
   Please only install and use siproxd if it is absolutely required.

Siproxd is a proxy/masquerading daemon for SIP. It handles registrations
of SIP clients on a private IP network and performs rewriting of the SIP
message bodies to make SIP connections possible via a masquerading
firewall. It allows SIP phones and soft phones (like kphone, linphone)
to work behind an IP masquerading firewall or router.

The most useful thing siproxd does is allow multiple phones to use a
static source port of 5060 when registering to the same remote PBX. **If
the PBX is local, this package should not be installed or used**. Most
remote PBX systems are OK with the phones having random source ports,
but that was not the case many years ago. Unless the remote PBX is
absolutely strict about the 5060 source port requirement for each phone,
this package is not needed.

Install siproxid
----------------

Under **System > Packages**

- Find the **siproxd** package
- Click |fa-plus| to install, and confirm installation
- Wait for it finish

Configure siproxd
-----------------

Under **Services > siproxd**

- **Inbound interface** will generally be *LAN*
- **Outbound interface** will generally by *WAN*
- Fill in any other values (where appropriate)
- **RTP port range (lower)** should be an even number
- Click **Save**

.. seealso:: You can find a list of known issues with the siproxd package
   on the `pfSense bug tracker`_.

.. _pfSense bug tracker: https://redmine.pfsense.org/projects/pfsense-packages/issues?utf8=%E2%9C%93&set_filter=1&sort=id%3Adesc&f%5B%5D=status_id&op%5Bstatus_id%5D=o&f%5B%5D=category_id&op%5Bcategory_id%5D=%3D&v%5Bcategory_id%5D%5B%5D=47&f%5B%5D=&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=assigned_to&c%5B%5D=updated_on&group_by=&t%5B%5D=

