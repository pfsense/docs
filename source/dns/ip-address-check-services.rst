.. include:: /substitutions.rsti

Configuring IP Address Check Services for Dynamic DNS
=====================================================

pfSense software version 2.3.3 and later support custom IP address check
services. These services are used by Dynamic DNS clients to determine
the public IP address of the firewall when a WAN interface is behind an
upstream NAT device.

To create or edit one of these services, navigate to **Services >
Dynamic DNS** on the **Check IP Services** tab.

Settings
--------

Fill out the form fields on the page as follows:

-  **Enable**: Allow this service to be used by Dynamic DNS clients
-  **Name**: A short name to identify this service
-  **URL**: The full URL to the IP address check page
-  **Username/Password**: Optional authentication to use when accessing
   the URL
-  **Verify SSL Peer**: Check this box if the server has a self-signed
   SSL certificate or a certificate from a CA that is not trusted by the
   firewall.
-  **Description**: A longer description of this service

Once a service is defined, it may be selected on individual Dynamic DNS
service entries.

Server-Side Configuration Examples
----------------------------------

Hosting one of these services is very simple. The server page need only
print the requesting client IP address in the expected format::

  Current IP Address: x.x.x.x

nginx (internal/native)
^^^^^^^^^^^^^^^^^^^^^^^

.. code::

  location /ip {
      default_type text/html;
      return 200 "<html><head><title>Current IP Check</title></head><body>Current IP Address: $remote_addr</body></html>";
  }

nginx (internal with LUA)
^^^^^^^^^^^^^^^^^^^^^^^^^

.. code::

  location = /ip {
      default_type text/html;
      content_by_lua '
          ngx.say("<html><head><title>Current IP Check</title></head><body>Current IP Address: ")
          ngx.say(ngx.var.remote_addr)
          ngx.say("</body></html>")
      ';
  }

PHP
^^^

.. code::

  <html><head><title>Current IP Check</title></head><body>Current IP Address: <?=$_SERVER['REMOTE_ADDR']?></body></html>

