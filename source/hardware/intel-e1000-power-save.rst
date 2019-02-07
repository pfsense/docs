Intel e1000 power save
======================

From Paul M in a post to support@, in reference to "em0: Watchdog
timeout -- resetting" problem.

.. pull-quote::

   we had this, it was very odd, it only started happening when we
   upgraded the bios on a tyan motherboard to fix other problems, the
   firewalls had never shown the problem before.
   
   in desperation we tried a fix which we'd only ever previously used
   for linux - there used to be a problem with the e1000 driver when
   power saving is enabled in the e1000's eeprom. the fix worked, and I
   applied it by booting a linux rescue disk and ran the eeprom fix
   program that I got from the e1000 sourceforce website; their wiki
   seems to have disappeared so I can't find the script, so I've placed
   a copy here:
   http://www.zaurus.org.uk/download/scripts/fixeep-82573-dspd.sh
   
   if you have the problem on linux you get "detected tx unit hang"
   thus:
   https://sourceforge.net/tracker/index.php?func=detail&aid=1463045&group_id=42302&atid=447449

Also mirrored here:
http://files.pfsense.org/misc/fixeep-82573-dspd.sh.txt
