Developer Style Guide
=====================

This page covers rules and styles to be used when submitting code for
inclusion in pfSense® software.

Developer Rules
---------------

* Never commit untested code.
* If a developer breaks the code, they fix it, even if their code breaks another
  subsystem. This is not glamorous but it is the right thing to do (or back the
  code out until a proper fix can be obtained).
* If a developer commits a kernel change that requires a userland configuration
  change of any type, then that developer must also make sure there is PHP code
  to control the userland change as needed (different sysctls, different means
  of configuring something, upgrade code etc.).
* Avoid changing the XML configuration structure whenever possible. Where that
  is infeasible, do not commit code that changes the XML configuration structure
  without adding configuration upgrade code at the same time.
* Never push a commit to any branch that knowingly causes a regression.
* Any major or high risk changes must first be done in a git clone and reviewed
  by another committer before merging into mainline. Using a
  :doc:`pull request </development/submitting-a-pull-request-via-github>` for
  this workflow is acceptable, and is how every change from those outside the
  development team is handled.
* Pre-commit authorization is not used in pfSense software except in the case
  of major changes. For external/community developers, :doc:`pull requests
  </development/submitting-a-pull-request-via-github>` serve this function.
* Mention relevant ticket numbers in commit messages so that Redmine can
  associate the changes. See :doc:`Referencing Tickets in Commit Messages
  </development/referencing-tickets-in-commit-messages>`.
* When possible, compose and format commit messages similar to entries in the
  change logs. For example:

   * Brief first sentence that describes the commit
   * Start with an action word describing the nature of the change ("Adds...",
     "Changes...", "Improves...", "Corrects...")
   * Reference the ticket number in the first sentence (see previous bullet
     point)
   * Examples:

     * "Change X to Y which fixes #1234"
     * "Correct check for XYZ in some_page.php to prevent badthing. Fixes #2345"
     * "Add coolnewthing to some_page.php. Implements #3456"

   * Longer, more detailed explanations can be placed on the next line and
     later.

* Always use full paths when calling an executable (e.g. ``/usr/bin/grep`` NOT
  ``grep``)

HTML Specific Rules
-------------------

.. note:: Incorrect HTML code is treated as broken code. Breaking the code is
   not allowed. A C compiler for example would complain in most cases if a
   developer breaks the code syntactically. Web browsers may ignore invalid
   code, but this does not mean that the code is not broken. The broken code
   must be fixed by the person who committed the invalid code.

pfSense softare uses the XHTML doctype in its webGUI code. The doctype enforces
code against the following ruleset:

* Use lower case tag names and not a mix of uppercase and lowercase tag names
* Breaks must be closed (``<br />``)
* Image tags must be closed (``<img />``)
* An image tag *always* has an alt attribute, though it may contain no value
* Horizontal rule tags must be closed (``<hr />``)
* HTML form fields must be closed (``<input />``)
* Ampersands in a URL (e.g. within a href attribute) must be coded as a HTML
  entity (e.g. ``&amp;``)
* Special characters (e.g. umlauts) must be coded as `HTML Entities`_:
* A ``<table />`` tag does not have a name attribute
* A ``<div />`` tag does not have a name attribute
* A ``<ul />`` tag does not have a name attribute
* A ``<li />`` tag does not have a name attribute
* Checkbox checked attributes must be coded as ``checked="checked"``
* HTML field ``disabled`` attributes must be coded as ``disabled="disabled"``
* HTML field ``readonly`` attributes must be coded as ``readonly="readonly"``
* Any HTML ``<input />`` field has a type attribute (e.g. ``type="text"``)
* Opening ``<p>``, ``<b>`` tags must have a matching closing tag (e.g. ``</p>``)
* ``<table />`` tags do not contain a ``<form />`` tag
* The ``type`` attribute of a ``<form />`` tag must contain a lower case value
  (e.g. ``type="post"`` or ``type="get"``)
* The ``language=JavaScript`` attribute for ``<script />`` tags is deprecated.
  Use the ``type="text/javascript"`` attribute instead.
* Always use lowercase attribute names for calling JavaScript events (e.g.
  ``onclick="foobar();"``)
* The ``<embed />`` tag is deprecated, use ``<object />`` instead
* If a style attribute is assigned to an HTML element it must be enclosed by
  quotes, for example: ``element.style.borderTop = "2px solid #990000";``

It is possible to syntax check code in Firefox with the HTML validator plugin,
or use the W3C validator. The latter is supported by Opera even for RFC 1918
networks.

PHP Specific Rules
------------------

Rule #1: Any time a rule is broken, there must be proper justification and
documentation.

General rules
~~~~~~~~~~~~~

* All php files must start with a header block in English
* Use descriptive variable names in English
* Use lowercase variable names (``$my_very_long_var_name``) or Camel Case names
  (``$myVeryLongVarName``)
* When referencing variables inline in double quoted strings, use braces around the variable names::

    $foo = "bar{$bar}bar";

* Add comments in English, whenever necessary or helpful
* Use ``//`` or ``/* */`` style syntax for single line comments, do not use
  ``#``
* Use ``/* */`` style syntax for multi-line comments
* Use ``elseif`` and not ``else if`` when given a choice. The ``else if``
  variant `only works with braced syntax`_ and not colon syntax (e.g. ``if: ...
  elseif: ... endif;``).
* For testing the same variable against multiple strings or values directly, use
  a ``switch`` statement rather than a long chain of
  ``if/elseif/elseif/elseif/.../else`` statements.
* Add ``TODO:`` comments, when there is something to be done
* Add ``FIXME:`` comments, when something is broken
* add ``NOTE:`` comments, when there is something important other people should
  know beyond a traditional comment, for example a warning about not changing
  code in certain ways.
* Try to code in a readable way::

    $header = "<head>{$foo}</head>";
    $message = "SOME{$bar}TEXT";

  Is easier to read than::

    $header="<head>".$foo."</head>";
    $message = "SOME" . $bar . "TEXT";

* Try to simplify code for better readability::

    if ($bool1)
       if ($bool2)
           if ($bool3)
               do_it();
    whatever();

* Should be written as::

    if ($bool1 && $bool2 && $bool3) {
       do_it();
    }
    whatever();

* Do not set unnecessary or single-use variables::

    $is_set = isset($var);
    if ($is_set) ...

* Loop variables are ``$i``, ``$j``, ``$k``, ...

  * Do **NOT** use ``$g`` for a loop variable, as it conflicts with the
    global ``$g`` used by pfSense software

* All ``switch`` statements must have a ``default``
* In classes, use ``private``, ``protected`` and ``public``, not ``var`` for
  attribute declaration
* Do not to use deprecated or obsolete syntax or functions

  * Keep an eye on future versions of PHP to avoid using functions
    that will be deprecated in the future as well

* If a PHP-internal function is an alias for another function, use the original
  (i.e. use ``exit()`` instead of ``die()``)

Indent style
~~~~~~~~~~~~

* Use `K&R, BSD KNF variant style`_::

    if ($x == $y) {
       something();
       ...
    } else {
       somethingelse();
       ...
    }
    finalthing();

* When creating ``if``, ``for``, ``foreach``, and other similar block style
  structures, even if there is only one statement inside, the use of braces is
  required.

  For example, good::

    if ($foo) {
       something();
    }

  Not good::

    if($foo)
       something();

* If a conditional statement must span multiple lines, indent using four spaces
  to align with the start of the conditional above it::

    	if ($foo1 && $foo2 && $foo3 && $foo4 && $foo5 && $foo6 &&
    	    $foo7 && $foo8 && $foo9) {
    	something();
    	}

* Do not put be a space between a function name and its argument list::

    isset($myvar);

  * Conditional/control statements such as ``if``, ``foreach``, and
    ``switch`` are exceptions to this. Those must have a space before the
    parenthesis.

* ... but **do** separate function arguments with a single space::

    do_something($foo, 27, false);

* Use tabs for indentation -- NOT spaces or a mixture of both
* ... but spaces are OK in the middle of a line and for long conditional alignment
* Use a tab stop of 8, rather than 4, in an editor.
* Ensure there is NO trailing whitespace at the end of a line, for
  example spaces or tabs when there is no more text afterward
* Ensure there is NO whitespace on empty lines. For example, a line
  must not contain only spaces or only tabs

Configuration Manipulation
~~~~~~~~~~~~~~~~~~~~~~~~~~

* Boolean values which are false should be un-set::

    $config['system']['enablesshd'] = "no";

  should be::

    unset($config['system']['enablesshd']);

JavaScript Specific Rules
-------------------------

* pfSense software does not support outdated browsers, so do not take
  special measures to use code required by old/obsolete browsers or
  rendering engines
* pfSense software includes, among other JavaScript resources, Bootstrap and
  jQuery. While native JavaScript is best for simple tasks, if a developer
  can accomplish a goal easily using an included library, they can use it
  instead 
* pfSense software does not currently utilize ``transpiler`` or similar
  utilities
* Take special care with user input or statements/variables that can be
  populated with user input to avoid creating a vulnerability vector such as
  XSS. User fields must be encoded or otherwise sanitized

  * For example, be extremely cautions of values inserted into JavaScript via
    PHP variables. ``json_encode()`` can help avoid a situation where a
    user-supplied string could include text such as quotes or semicolons that
    leads to execution of arbitrary JavaScript

Shell Script Specific Rules
---------------------------

* Use braces in **all** variable references for proper parameter expansion::

    ${SOMETHING}

Ports/Packages Specific Rules
-----------------------------

When working with the pkg system and FreeBSD ports structure, adhere to the
FreeBSD guidelines for code in these files.

Useful resources for working with pkg and ports include:

* The `FreeBSD Porter's Handbook`_
* The `FreeBSD Ports bsd.port.mk file`_
* Use `portlint`_ to check the syntax of the Makefile and other supporting files

  * Install portlint on a FreeBSD system and run the following command inside
    the root directory of the port::

      portlint -CN

* Run a the following command to make sure the contents of pkg-plist are
  correct::

    make -DNO_DEPENDS check-plist

Other Guidelines:

* A port version or revision must increase for the port to be rebuilt, otherwise
  changes will not propagate to the pkg servers to be picked up by clients

  * For very minor changes, add or increase the ``PORTREVISION`` line
    immediately beneath ``PORTVERSION`` in the ``Makefile``, starting at 1, for
    example: A second revision would be ``PORTREVISION=2``
  * For more significant changes, increase ``PORTVERSION``

    * When increasing ``PORTVERSION``, completely remove any ``PORTREVISION``
      line, do not comment it out

  * Do not add or change ``PORTEPOCH`` except under direction of a committer

External Code
-------------

Code that has been imported from an external source does not need to be changed
to fit these guidelines.

Editor Configuration
--------------------

The pfSense project uses a similar coding style to FreeBSD, which has `editor
configurations for Emacs and Vim`_. The FreeBSD man page `style(9)`_ contains
additional relevant material.

.. _editor configurations for Emacs and Vim: https://svnweb.freebsd.org/base/head/tools/tools/editing/
.. _FreeBSD Porter's Handbook: https://www.freebsd.org/doc/en_US.ISO8859-1/books/porters-handbook/
.. _FreeBSD Ports bsd.port.mk file: https://github.com/pfsense/FreeBSD-ports/blob/devel/Mk/bsd.port.mk
.. _HTML Entities: http://www.w3schools.com/charsets/ref_html_entities_4.asp
.. _K&R, BSD KNF variant style: https://en.wikipedia.org/wiki/Indent_style#Variant:_BSD_KNF
.. _only works with braced syntax: http://php.net/manual/en/control-structures.elseif.php
.. _portlint: https://www.freebsd.org/doc/en/books/porters-handbook/porting-portlint.html
.. _style(9): https://www.freebsd.org/cgi/man.cgi?query=style&sektion=9
