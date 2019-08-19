Configuring redirection for captive portal users
================================================

Two settings in a captive portal zone can be used to redirect
users **after a successful authentication** to a landing page
hosted on a different server (local or remote).

:Pre-authentication redirect URL: This setting set a default redirection URL,
 meaning users will be redirected to this URL after a successful authentication
 only if the captive portal doesn't know where to redirect them.

:After authentication Redirection URL: This setting set a forced redirection
 URL, meaning users will be redirected to this URL after a successful authentication
 instead of the one they initially tried to access.


These settings are often used by businesses to ensure a specific page is
presented to users before anything else.

To use **Pre-authentication redirect URL**, the captive portal HTML/PHP page
must contain a hidden field in the authentication form named ``redirurl``
and having value ``$PORTAL_REDIRURL$``


Configuring a redirection before authentication
-----------------------------------------------
It is also possible, using a custom captive portal page, to redirect users
to a remote web page before being authenticated by pfSense® software.

- The IP address(es) of the remote website must be added as Captive Portal
  *Allowed IP Addresses* or **Allowed Hostnames** if the target server is
  on a separate subnet.

- The captive portal login page must contain code at the top of the page similar to the following:

.. code::

  <?php
   require("globals.inc");
   $request_uri = urldecode(str_replace("/index.php?redirurl=", "",  $_SERVER["REQUEST_URI"]));
   $portal_redirurl = urldecode("$PORTAL_REDIRURL$");
   if(!stristr(urldecode("$PORTAL_REDIRURL$"), $request_uri)) {
      Header("Location: $PORTAL_REDIRURL$");
      exit();
   }
  ?>

  [Rest of CP login page]

The overall idea of this code is to redirect users on a remote website as long as referrer is different from
**Pre-authentication redirect URL**. It may need adapted to suit site-specific needs.

