.. include:: /substitutions.rsti

Updating Documentation
======================

Documentation updates are easy to make by anyone here on Github. Updates are
submitted in the form of a Github pull request ("PR") which developers can then
review and discuss before merging the change into the documentation.

.. note:: Before submitting a documentation update, please read the
   :doc:`quality-guidelines`, the :doc:`style-guide`, the
   :doc:`formatting-guide`, and the `Github documentation on pull requests`_.

.. warning:: The following documents assume the submitter already has an account
   on Github.

Edit on Github
--------------

The easiest way to make a changes is to edit the file directly on Github.

* Navigate to the page to edit in the documentation
* Click **Edit on Github** to open the document source in Github
* Click |fa-pencil| to edit the source
* Make changes as needed
* Enter an appropriate title and description for the change
* Choose the option to start a pull request
* Click **Propose File Change** and follow the prompts to create a pull request

Local Clone
-----------

* Create a `fork`_ of the `Documentation Source`_
* Clone that fork locally with git
* (optionally) Create a new branch named for the update being proposed
* Make changes
* Commit the changes using an appropriate commit message
* Push the changes
* From Github, initiate a pull request from the local branch to the master
  branch of the documentation repository.

Pull Requests
-------------

No matter how the documentation is edited, all methods result in a pull request
(PR) that needs to be reviewed and merged. Additionally, changes to the
documentation are automatically tested and checked, which makes it easier to
spot problems without manual reviews.

After making changes and submitting a pull request, keep an eye on the PR for
notes from the automated testing framework as well as notes from developers.

Issues
------

For those who do not feel comfortable writing documentation, another avenue to
is to open an `Issue`_ on Github to request changes.

When creating an issue, please be specific and reference documents by filename
where appropriate.

.. _fork: https://help.github.com/articles/about-forks/
.. _Github documentation on pull requests: https://help.github.com/articles/creating-a-pull-request/
.. _Issue: https://github.com/pfsense/docs/issues
