Executing Command Line Programs Using the Web Interface
=======================================================

This article explains how shell command commands may be run directly
from the pfSense WebGUI. Note that this functionality is not officially
supported, ***use at your own risk!***

Description
-----------

- Navigate to **Diagnostics > Command** in the WebGUI
- Enter the command to run in the **Command** field inside the
  **Execute Shell Command** section.

  Commands entered here will be executed as if they were run from a
  command line, and the results returned on the page. Commands *must*
  run non-interactively and must exit on their own. See **Warnings**
  below.

.. image:: /_static/development/execute_command_via_exec_php.jpg

- Click **Execute**
- The output from the command will be displayed, such as:

.. image:: /_static/development/exec.php_command_output.jpg

Warnings
--------

**Commands run from this function must run and then stop/return**.

Commands that run indefinitely, such as **ping** without a count or
**tcpdump** without a limit set will never stop or return output, and
will be left running indefinitely in the backgound until they are
manually killed.

Interactive commands, such as *vi* will fail similarly, or may exit due
to other issues with the terminal being non-interactive.

