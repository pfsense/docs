.. include:: /substitutions.rsti

Submitting a Pull Request via Github
====================================

Submitting a Pull Request (PR) via Github is the fastest and best way to
contribute source code changes to the pfSense project.

Using a PR allows developers to easily review and comment on changes,
allows easy testing via patches from the :doc:`System Patches </development/system-patches>`
Package, and allows the changes to be easily merged into the project.

Creating a PR is a relatively straightforward process but we do have a
few guidelines and suggestions to follow when submitting contributions:

-  Ensure the bug or feature has an entry on https://redmine.pfsense.org
   -- :doc:`Create a new entry </development/bug-reporting>` if one does not exist

   -  The only exceptions to this are for very minor typo/wording fixes
      or for FreeBSD-ports package updates that have already been given
      an OK/green light

-  Read through and follow the :doc:`Developer Style Guide </development/developer-style-guide>`
   when making changes to the source code
-  Read through the Github documentation on `pull
   requests <https://help.github.com/articles/creating-a-pull-request/>`__
-  Create a `fork <https://help.github.com/articles/about-forks/>`__ of
   the correct repository (e.g.
   `pfSense/pfSense <https://github.com/pfsense/pfsense>`__ for the base
   system, or
   `pfSense/FreeBSD-ports <https://github.com/pfsense/FreeBSD-ports>`__
   for packages)
-  Always work on the master branch of the pfSense/pfSense repository or
   the devel branch of pfSense/FreeBSD-ports

   -  The exception to this is when making PRs for multiple branches due
      to syntax or other differences which require variations that
      prevent a regular cherry-pick or similar from copying the commit
      to other branches

-  When making commits to the fork, reference the relevant Redmine entry
   as mentioned in :doc:`Referencing Tickets in Commit Messages </development/referencing-tickets-in-commit-messages>`
-  When ready to submit the changes, `create a pull request from the
   fork <https://help.github.com/articles/creating-a-pull-request-from-a-fork/>`__
   to the appropriate branch

   -  The PR title should be a short summary of the changes and include
      a reference to the relevant Redmine issue number(s)
   -  The PR description should include a longer explanation of the
      proposed changes and link to the relevant Redmine issue number(s)

-  After submitting the pull request, add a link to the PR on the
   related Redmine issue so the entries can be cross-referenced

