Using Wireless Interfaces
=========================

Starting with pfSense 2.4, wireless interfaces **must** be created on
the **Wireless** tab under **Interfaces > (assign)** before they can be
assigned.

Certain supported cards and chipsets can have **Virtual Access Points**
(VAPs). This allows multiple access points to be run on a single
wireless card, each with their own SSID, subnet, security settings, and
so on. Even if a card does not support VAPs, a single instance must be
created before assignment is possible.

Some of these cards also support multiple clients, multiple ad-hoc
settings, or some combination of these. Support varies wildly from
driver to driver and even chip to chip on the same driver.

On most supported Atheros cards, this is limited to 4 access points.
Some other cards are also supported. Check our `list of supported
cards <https://spreadsheets.google.com/ccc?key=0AojFUXcbH0ROdHgwYkFHbkRUdV9hVWljVWl5SXkxbFE&hl=en>`__
and look for "Multi" in the **hostap** column.

Some care is needed when testing your hardware to see if this feature is
supported. Some chips will simply fail to add the additional interface,
others may panic and cause a reboot.

Wireless interfaces are added by visiting **Interfaces > (assign)**,
visiting the **Wireless** tab, and then clicking |fa-plus|.

