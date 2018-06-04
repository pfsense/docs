.. include:: /substitutions.rsti

Managing Snort IP Address Lists
===============================

Use this tab to manage the IP lists files for the IP Reputation
preprocessor. IP lists are text-format files containing one IP address
or network (expressed in CIDR notation) per line.

.. image:: /_static/ids-ips/SnortIPLists.png

To upload an IP list file to the firewall, click the
|import_alias| icon to open the file upload dialog as shown
below. Browse to the file on the local machine using the **BROWSE**
button, then click the **UPLOAD** button to upload the file to the
firewall for use by the IP Reputation preprocessor in Snort.

.. image:: /_static/ids-ips/SnortIPListUpload.png

To create a new IP list, click the |fa-plus| icon. To edit an
existing IP list, click the |fa-pencil| icon beside the list to
edit. Click SAVE when finished to save changes to the list, or CANCEL
to abandon any changes.

.. image:: /_static/ids-ips/SnortIPListsEdit.png
