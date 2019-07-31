Performing a Remote Backup of a pfSense Configuration
=====================================================

Use the Auto Config Backup Package
----------------------------------

The easiest choice to backup pfSense® software. Utilize the free
:doc:`/backup/autoconfigbackup` package, rest easy knowing it's
being taken care of without needing to worry. Sit back,
have a cup of coffee, and read on for alternate techniques.

Pull it
-------

Using wget
^^^^^^^^^^

This example uses wget to login and fetch a backup:

* Fetch the login form and save the cookies and CSRF token:

  .. code-block:: bash

    $ wget -qO- --keep-session-cookies \
      --save-cookies cookies.txt \
      --no-check-certificate \
      https://192.168.1.1/diag_backup.php \
      | grep "name='__csrf_magic'" \
      | sed 's/.*value="\(.*\)".*/\1/' > csrf.txt

* Submit the login form along with the first CSRF token and save the second CSRF
  token (can't reuse the same file) -- now the script is logged in and can take
  action:

  .. code-block:: bash

    $ wget -qO- --keep-session-cookies --load-cookies cookies.txt \
      --save-cookies cookies.txt --no-check-certificate \
      --post-data "login=Login&usernamefld=admin&passwordfld=pfsense&__csrf_magic=$(cat csrf.txt)" \
      https://192.168.1.1/diag_backup.php \
      | grep "name='__csrf_magic'" \
      | sed 's/.*value="\(.*\)".*/\1/' > csrf2.txt

* Submit the download form along with the second CSRF token to save a copy of
  ``config.xml``:

  .. code-block:: bash

    $ wget --keep-session-cookies --load-cookies cookies.txt --no-check-certificate \
      --post-data "download=download&donotbackuprrd=yes&__csrf_magic=$(head -n 1 csrf2.txt)" \
      https://192.168.1.1/diag_backup.php -O config-router-`date +%Y%m%d%H%M%S`.xml

.. note:: The behavior of variable expansion and other aspects of the commands
   may vary by shell. This example uses ``bash`` for the client shell.

Using cURL
^^^^^^^^^^

For those who prefer to use cURL, the following example accomplishes the same
goal:

* Fetch the login form and save the cookies and CSRF token:

  .. code-block:: bash

    $ curl -L -k --cookie-jar cookies.txt \
         https://192.168.1.1/ \
         | grep "name='__csrf_magic'" \
         | sed 's/.*value="\(.*\)".*/\1/' > csrf.txt

* Submit the login form to complete the login procedure:

  .. code-block:: bash

    $ curl -L -k --cookie cookies.txt --cookie-jar cookies.txt \
         --data-urlencode "login=Login" \
         --data-urlencode "usernamefld=admin" \
         --data-urlencode "passwordfld=pfsense" \
         --data-urlencode "__csrf_magic=$(cat csrf.txt)" \
         https://192.168.1.1/ > /dev/null

  Now the script is logged in and can perform actions!

* Fetch the target page to obtain a new CSRF token:

  .. code-block:: bash

    $ curl -L -k --cookie cookies.txt --cookie-jar cookies.txt \
         https://192.168.1.1/diag_backup.php  \
         | grep "name='__csrf_magic'"   \
         | sed 's/.*value="\(.*\)".*/\1/' > csrf.txt

* Download the backup:

  .. code-block:: bash

    $ curl -L -k --cookie cookies.txt --cookie-jar cookies.txt \
         --data-urlencode "download=download" \
         --data-urlencode "donotbackuprrd=yes" \
         --data-urlencode "__csrf_magic=$(head -n 1 csrf.txt)" \
         https://192.168.1.1/diag_backup.php > config-router-`date +%Y%m%d%H%M%S`.xml

.. note:: The behavior of variable expansion and other aspects of the commands
   may vary by shell. This example uses ``bash`` for the client shell.

Backing up RRD
^^^^^^^^^^^^^^

To have RRD contents included in the backup, omit the ``donotbackuprrd``
variable and its value from the backup URL.

Push it
-------

The details of this approach are covered elsewhere on the web, and it isn't
recommended, but it is possible to make it work over ssh.

* Generate an ssh key for the root pfSense user *without a passphrase*.
  (That's the potentially dangerous part)
* Add a user to a remote system, and add the pfSense root user's new public key
  to its ``~/.ssh/authorized_keys`` file
* Create a cron job on the pfSense firewall that would copy
  ``/cf/conf/config.xml`` to the remote system with ``scp``
* If this is implemented, be careful to manage the remote users as such that
  they have limited access, perhaps lock them down to a single directory to
  which they can only write the config and do nothing else. Use ``chroot`` if
  possible.
