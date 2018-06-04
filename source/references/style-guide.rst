Style Guide
===========

.. contents:: :depth: 2

External resources:

* `A primer on reStructuredText`_
* `reST/Sphinx cheat sheet`_

Text
----

* one asterisk: ``*text*`` for emphasis (italics),
* two asterisks: ``**text**`` for strong emphasis (boldface), and
* backquotes: ````text```` for code samples.

Headings
--------

* ``#`` with overline, for parts
* ``*`` with overline, for chapters
* ``=``, for sections
* ``-``, for subsections
* ``^``, for subsubsections
* ``"``, for paragraphs

Lists
-----

List markup is natural: just place an asterisk at
the start of a paragraph and indent properly.  The same goes for numbered lists;
they can also be autonumbered using a ``#`` sign::

   * This is a bulleted list.
   * It has two items, the second
     item uses two lines.

   #. This is a numbered list.
   #. It has two items too.


Nested lists are possible, but be aware that they must be separated from the
parent list items by blank lines::

   * this is
   * a list

     * with a nested list
     * and some subitems

   * and here the parent list continues

Definition lists are created as follows::

   term (up to a line of text)
      Definition of the term, which must be indented

      and can even consist of multiple paragraphs

   next term
      Description.

Note that the term cannot have more than one line of text.

Hyperlinks
----------

Separate the link and the target definition, like this::

  This is a paragraph that contains `a link`_.

.. code::

  .. _a link: http://example.com/

and place the target definition at the bottom of the page in alphabetical order.

.. note:: If the link text will contain a colon, escape it in both the link text
   and the definition, for example::

     See `Link\: Stuff`_.

   .. code::

       .. _Link\: Stuff: http://example.com/stuff

Cross References
----------------

To make a cross reference to another document, first you must create a label
just before the section title::

   .. _label-some-section:

   Some Section
   ------------

And then in the other document, reference it using **:ref:** and the given label::

   See :ref:`label-some-section` for more information

Figures
-------

Figures need a unique label and a caption for proper in-text references, and are
preferred over images.

.. code::

    .. _figure-my-stuff:
    .. figure:: /_static/stuff.png
       :figclass: align-center

       This is the caption

Which can be referred to using the following::

   An example is shown in Figure :ref:`figure-my-stuff`.

*Note the alignment! The caption must be aligned properly with the other
attributes!*

Images
------

.. code::

    .. image:: /_static/<filename>.png
       :align: center
       :alt: <alternative_text_that_describes_the_image>

Inline Images
-------------

For an inline image (no breaks above or below, aka inline with the text) a
substitution must be used. Many common icon substitutions are available in a
common file usable as follows::

  .. include:: substitutions.rst
  <lots of other text>
  To add a blah, click |image_icon_plus|.

To do this in a one-off fashion, use a substitution within the same file::

   Click |image_icon_edit| to edit the entry
   <rest of page>
   .. |image_icon_edit| image:: _static/icon_e.png

Tables
------

For *grid tables*, you have to "paint" the cell grid yourself.  They look like
this::

   +------------------------+------------+----------+----------+
   | Header row, column 1   | Header 2   | Header 3 | Header 4 |
   | (header rows optional) |            |          |          |
   +========================+============+==========+==========+
   | body row 1, column 1   | column 2   | column 3 | column 4 |
   +------------------------+------------+----------+----------+
   | body row 2             | ...        | ...      |          |
   +------------------------+------------+----------+----------+

*Simple tables* are easier to write, but
limited: they must contain more than one row, and the first column cells cannot
contain multiple lines.  They look like this::

   =====  =====  =======
   A      B      A and B
   =====  =====  =======
   False  False  False
   True   False  False
   False  True   False
   True   True   True
   =====  =====  =======

Table of Contents
-----------------

For a group of files::

  .. toctree::
     :maxdepth: 2

     filename1
     filename2

Local to a file::

   .. contents:: :depth: 2

Notes
-----

  .. note:: This is a note, it will be surrounded by a note box when it is built.

Substitutions
-------------

reST supports "substitutions", which
are pieces of text and/or markup referred to in the text by ``|name|``.  They
are defined like footnotes with explicit markup blocks, like this::

   .. |name| replace:: replacement *text*

or this::

   .. |caution| image:: warning.png
                :alt: Warning!

If you want to use some substitutions for all documents,
put them into a separate file and include it into all
documents you want to use them in, using the **include** directive.  (Be
sure to give the include file a file name extension differing from that of other
source files, to avoid Sphinx finding it as a standalone document.)

.. _A primer on reStructuredText: http://sphinx-doc.org/rest.html
.. _reST/Sphinx cheat sheet: http://thomas-cokelaer.info/tutorials/sphinx/rest_syntax.html
