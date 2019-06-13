Formatting Guide
================

.. contents:: :depth: 2

The pfSense documentation is built using Sphinx/reStructuredText. The formatting
is similar in some ways to Markdown, but has significant differences. To get a
feel for the formatting, look at the `source of this documentation`_ and read
through this document.

External resources:

* `A primer on reStructuredText`_
* `reST/Sphinx cheat sheet`_

Text
----

In general, try to keep text in logical paragraphs wrapped at 80 characters.
This ensures the source is easy for everyone to read no matter where it is
being edited.

Add basic inline formatting to the text as follows:

* one asterisk: ``*text*`` for *emphasis* (italics),
* two asterisks: ``**text**`` for **strong emphasis** (boldface), and
* backquotes: ````text```` for ``code samples``.
* Two colons at the end of a line (or on a blank line) to start a code block,
  prefix each line inside the block with two spaces::

    code

These can be applied to text in various ways within the documentation:

* Menu references use bold text and ">" with spaces in between to separate menus
  from menu items: **System > General**

  * Navigation that also refers to a tab name should be formatted like so:
    **System > Advanced**, **Miscellaneous** tab.

* GUI text references and option names use bold text: **Description**
* Text to be entered or replaced by the user uses backquotes: Enter
  ``192.168.1.1`` for the **IPv4 Address**.
* Options selected by the user from a list or drop-down are italic: Select *WAN*
  for the the **Interface**.
* File names and paths use backquotes: ``/root``
* Commands names inline with other text use backquotes, "The ``sudo`` command
  ...".
* Shell commands being demonstrated or directed use code blocks. Lead the line
  with two spaces then "#" to simulate a command prompt:

  .. code:: console

     # ls -l /root

* Program output also uses code blocks, blank lines in output can either be
  blank or preceded by two spaces:

  .. code:: console

     # someprogram
     Output:

     Foo

* For long pages with several sections that may only be relevant to some users,
  split the page into several smaller documents.

Headings
--------

Headings consist of text and a line of characters underneath ("underline") the
same length as the text. The specific characters must be consistent to denote
sections of the same depth. Parts and chapters also use a similar row of
characters above the text ("overline").

* ``####`` with overline, for parts
* ``****`` with overline, for chapters
* ``====``, for sections
* ``----``, for subsections
* ``^^^^``, for subsubsections
* ``""""``, for paragraphs

Lists
-----

List markup is natural: place an asterisk at the start of a paragraph and indent
properly. The same goes for numbered lists; they can also be auto-numbered using
a ``#`` sign:

.. code:: console

   * This is a bulleted list.
   * It has two items, the second
     item uses two lines.

   #. This is a numbered list.
   #. It has two items too.


Nested lists are possible, but be aware that they must be separated from the
parent list items by blank lines:

.. code:: console

   * this is
   * a list

     * with a nested list
     * and some subitems

   * and here the parent list continues

Definition lists are created as follows:

.. code:: console

   term (up to a line of text)
      Definition of the term, which must be indented

      and can even consist of multiple paragraphs

   next term
      Description.

.. note:: The term itself cannot have more than one line of text.

Field lists are perfect for lists of options:

.. code:: console

   :Option Name: What it does.
   :Option 2: Another option. This is a long description that wraps
     to the next line, with two spaces indentation.
   :Third Option: Something else.

Hyperlinks
----------

Separate the link and the target definition, like this:

.. code:: console

  This is a paragraph that contains `a link`_.

.. code:: console

  .. _a link: http://example.com/

and place the target definition at the bottom of the page in alphabetical order.

.. note:: If the link text will contain a colon, escape it in both the link text
   and the definition, for example::

     See `Link\: Stuff`_.

   .. code:: console

       .. _Link\: Stuff: http://example.com/stuff

Cross References
----------------

To make a cross reference to another document, first you must create a label
immediately before the section title:

.. code:: console

   .. _label-some-section:

   Some Section
   ------------

And then in the other document, reference it using ``:ref:`` and the given label:

.. code:: console

   See :ref:`label-some-section` for more information

If a cross-reference will instead reference an entire document rather than a
specific section, figure, or similar label, use the ``:doc:`` method instead.
For example, to reference this entire document, ``/references/style-guide.rst``,
use the following text, omitting the file extension:

.. code:: console

   :doc:`/references/style-guide`

Figures
-------

Figures need a unique label and a caption for proper in-text references, and are
preferred over images.

.. code:: console

   .. _figure-my-stuff:
   .. figure:: /_static/stuff.png

      This is the caption

Which can be referred to using the following:

.. code:: console

   An example is shown in Figure :ref:`figure-my-stuff`.

.. note::  The indention is important! The caption *must* be aligned properly
   with the other attributes!

Images
------

.. code:: console

   .. image:: /_static/<filename>.png
      :alt: <alternative_text_that_describes_the_image>
      :target: /_static/<filename>.png

.. note:: `:target:` is optional and only necessary if it is a large image.

Inline Images
-------------

For an inline image (no breaks above or below, aka inline with the text) a
substitution must be used. Many common icon substitutions are available in a
`common substitutions file`_ usable as follows:

.. code:: console

   .. include:: substitutions.rst
   <lots of other text>
   To add a blah, click |image_icon_plus|.

To do this in a one-off fashion, use a substitution within the same file:

.. code:: console

   Click |image_icon_edit| to edit the entry
   <rest of page>
   .. |image_icon_edit| image:: _static/icon_e.png

Tables
------

For *grid tables*, the grid must be "painted" in the document source. They look
like this example:

.. code:: console

   +------------------------+------------+----------+----------+
   | Header row, column 1   | Header 2   | Header 3 | Header 4 |
   | (header rows optional) |            |          |          |
   +========================+============+==========+==========+
   | body row 1, column 1   | column 2   | column 3 | column 4 |
   +------------------------+------------+----------+----------+
   | body row 2             | ...        | ...      |          |
   +------------------------+------------+----------+----------+

*Simple tables* are easier to write, but limited: they must contain more than
one row, and the first column cells cannot contain multiple lines.  They look
like this:

.. code:: console

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

For a group of files, reference filenames without their ``.rst`` extension:

.. code:: console

  .. toctree::
     :maxdepth: 2

     filename1
     filename2

Local to a file:

.. code:: console

   .. contents:: :depth: 2

Admonitions
-----------

Admonitions are text, distinguished in friendly boxes, that bring attention to
important items. The most common example is a "Note" box:

.. code:: console

   .. note:: This is a note, it will be surrounded by a note box when it is built.

Which renders as:

.. note:: This is a note, it will be surrounded by a note box when it is built.

Admonitions are available for a wide variety of types, including: note, tip,
warning, attention, caution, danger, error, hint, and important.

Substitutions
-------------

reST supports "substitutions", which are pieces of text and/or markup referred
to in the text by ``|name|``.  They are defined like footnotes with explicit
markup blocks, like this:

.. code:: console

   .. |name| replace:: replacement *text*

or this:

.. code:: console

   .. |caution| image:: warning.png
                :alt: Warning!

To use substitutions for multiple documents, put them into a separate file and
include it into all documents where they will be used, using the ``include``
directive. Give the include file a file name extension differing from that of
other source files, such as ``.rsti``, to avoid Sphinx finding it as a
standalone document.

A `common substitutions file`_ is available and is already referenced in a
number of existing documents. Check that file before adding more substitutions
in other files. Substitutions which will be widely used in many documents should
be placed there.

Literal (code) Blocks
---------------------

Briefly described earlier, literal or "code" blocks allow for pre-formatted
text, most commonly used for source code, shell commands, command output, and so
on.

A code block can be started by ending a sentence with two colons, and then a
blank line. These two colons may also be on a line by themselves::

  ::

    code code code

The lines inside the code block must be indented to the same level, usually two
spaces.

Blank spaces may be used between lines of code, they do not need to contain
spaces.

For more complex examples, syntax highlighting can be used for source code using
the ``code-block`` directive:

.. code:: console

   .. code-block:: html
      :linenos:

      <b>some html</b>

Which renders as:

.. code-block:: html
   :linenos:

   <b>some html</b>


.. _A primer on reStructuredText: http://sphinx-doc.org/rest.html
.. _common substitutions file: https://github.com/pfsense/docs/blob/master/source/substitutions.rsti
.. _reST/Sphinx cheat sheet: http://thomas-cokelaer.info/tutorials/sphinx/rest_syntax.html
.. _source of this documentation: https://github.com/pfsense/docs/tree/master/source
