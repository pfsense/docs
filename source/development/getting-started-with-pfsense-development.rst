Getting Started with pfSense Software Development
=================================================

There is no single specific starting point for joining the pfSense®
development effort, but the following items are helpful in getting
started:

-  Review the :doc:`Developer Style Guide </development/developer-style-guide>`
-  Become familiar with the `pfSense git
   repositories <https://github.com/pfsense>`__ (and
   `github <https://github.com>`__ in general):

   -  Current repositories used for developing pfSense software and its
      dependencies:

      -  `pfSense <https://github.com/pfsense/pfSense>`__ - The main
         source repository for pfSense software, containing the GUI code,
         builder code, and related scripts.
      -  `FreeBSD-src <https://github.com/pfsense/FreeBSD-src>`__ - The
         OS source code used to build pfSense software
      -  `FreeBSD-ports <https://github.com/pfsense/FreeBSD-ports>`__ -
         Build information for supporting software used in pfSense software,
         and code for some of our custom programs/daemons/modules and
         packages

   -  Older repositories which are not used for current/new development:

      -  `pfSense-tools <https://github.com/pfsense/pfSense-tools>`__ -
         Deprecated repository with old build tools used for pfSense
         software version 2.2.x and before
      -  `pfSense-packages <https://github.com/pfsense/pfSense-packages>`__
         - Repository with package metadata and files used for pfSense
         software version 2.2.x and before
      -  `xmlrpc-server <https://github.com/pfsense/xmlrpc-server>`__ -
         Repository with the deprecated XMLRPC server used for packages
         on pfSense software version 2.2.x and before

-  Review the list of `open bug reports and other
   issues <https://redmine.pfsense.org/projects/pfsense/issues>`__.

-  Submit changes as `pull requests on
   github <https://help.github.com/articles/using-pull-requests/>`__.

Our developers will review the submissions, offer feedback, and merge
the changes if they are acceptable.

