FreeBSD Issue Policy
====================

The pfSense® team relies on the work provided by the FreeBSD project,
as the base operating system of pfSense software. On occasion, pfSense
users will run into problems with FreeBSD that are beyond our ability
to help with. This page provides some basic guidance on what to do in
these scenarios.

Most frequently these issues are driver or hardware-specific bugs. We do
not have any developers who work on drivers in FreeBSD, and cannot
assist with such issues.

When driver problems are encountered, we suggest installing a stock
FreeBSD release on the hardware, replicating the problem, and reporting
it to the appropriate FreeBSD list. This is the only way the problem
will be resolved and even at that will only be resolved in future
releases. Alternatively, use different hardware.

If a kernel panic is encountered, we may be able to get someone to
analyze the backtrace. Feel free to post one to the mailing list or
forum. See: :doc:`Obtaining Panic Information for Developers </development/obtaining-panic-information-for-developers>`

The only exception to this is for issues that affect all or a large
number of pfSense users. Examples of this could be problems with PF,
CARP, IPsec, or any number of other components. We will track and work
to resolve issues of this nature, but cannot possibly coordinate testing
and fixes for one off issues encountered by users.
