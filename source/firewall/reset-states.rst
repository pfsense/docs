Resetting Connection States
===========================

To clear all active connection states, visit **Diagnostics > States**,
then go to **Reset States** tab.

The **Firewall state table** box must be checked as a safety precaution,
then click the **Reset** button.

Before proceeding, be sure to read the warning text, reproduced below:

    Resetting the state tables will remove all entries from the
    corresponding tables. This means that all open connections will be
    broken and will have to be re-established. This may be necessary
    after making substantial changes to the firewall and/or NAT rules,
    especially if there are IP protocol mappings (e.g. for PPTP or IPv6)
    with open connections.

    The firewall will normally leave the state tables intact when
    changing rules.

If the firewall state table is reset, the browser session may appear to
be hung after clicking **Reset**. Simply refresh the page to continue.

