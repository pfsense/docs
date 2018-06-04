.. include:: /substitutions.rsti

Configuring a Pre-authentication Redirect for Captive Portal Users
==================================================================

The **Pre-authentication redirect URL** setting in a Captive Portal zone
redirects the user to a landing page hosted on a different server (local
or remote). The user is then sent back to the portal login URL for
authentication by clicking a link or similar process on the landing
page.

This is often used by businesses to ensure a site-specific page is
presented to users before anything else, including the login page.

To use the **Pre-authentication redirect URL**, the Captive Portal
HTML/PHP page must handle the redirect to the destination page, and the
IP address(es) of the target server must be added as Captive Portal
*Allowed IP Addresses* or **Allowed Hostnames** if the target server is
on a separate subnet. It isn't as easy as doing a post-authentication
redirect to another page.

The portal page must contain code at the top of the page similar to the
following:

.. code::

  <?php
   require("globals.inc");
   $request_uri = urldecode(str_replace("/index.php?redirurl=", "",  $_SERVER["REQUEST_URI"]));
   $portal_redirurl = urldecode("$PORTAL_REDIRURL$");
   if(!stristr(urldecode("$PORTAL_REDIRURL$"), $request_uri)) {
      Header("Location: $PORTAL_REDIRURL$");
      exit;
   }
  ?>

  [Rest of CP login page]

The user will be redirected to that URL, and then when the user clicks
back to pfSense using a link to the firewall IP address/port, such as
*http://x.x.x.x:8000/index.php*, the referring URL will match the
original landing page and the redirect will not happen that time. The
above code will not work for every case, it may need adapted to suit
site-specific needs.

