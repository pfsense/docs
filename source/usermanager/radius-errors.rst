Troubleshooting RADIUS Authentication
=====================================

When attempting to authenticate against a RADIUS server, errors may be
encountered in the logs that prevent it from working properly. Here are some
errors and how to resolve them::

  mpd: [pt0] RADIUS: RadiusSendRequest: rad_init_send_request failed: -1

* This appears to happen when the RADIUS shared secret contains special
  characters. Try again with an alphanumeric shared secret.
