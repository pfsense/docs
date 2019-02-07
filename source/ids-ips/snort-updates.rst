Updating Snort
==============

Update the rules
----------------

The **Updates** tab is used to check the status of downloaded rules
packages and to download new updates. The table shows the available rule
packages and their current status (not enabled, not downloaded, or a
valid MD5 checksum and date).

Click on the **Update Rules** button to download the latest rule package
updates. If there is a newer set of packaged rules on the vendor web
site, it will be downloaded and installed. The determination is made by
comparing the MD5 of the local file with that of the remote file on the
vendor web site. If there is a mismatch, a new file is downloaded. The
**FORCE** button can be used to force download of the rule packages from
the vendor web site no matter how the MD5 hash tests out.

In the screenshot below, the Snort VRT and Emerging Threats Open rule
packages have been successfully downloaded. The calculated MD5 hash and
the file download date and time are shown. Also note the last update
time and result are shown in the center of the page.

.. image:: /_static/ids-ips/snortupdaterulesstatus2.png

