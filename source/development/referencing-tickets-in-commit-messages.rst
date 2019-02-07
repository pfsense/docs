Referencing Tickets in Commit Messages
======================================

By placing a special keyword in a commit message, the bug tracking
system (Currently `Redmine <https://redmine.pfsense.org>`__) can
associate a commit with a specific ticket automatically, creating a link
in the ticket to the relevant commits.

When using these keywords immediately follow them by a # and then the
ticket number, such as "Ticket #1234". They are not case sensitive.

The following keywords will reference a ticket but take no action on the
ticket status:

-  refs, references, IssueID, ticket, bug, feature, todo, redmine

The following keywords will not only reference the ticket, but
automatically move the ticket to a feedback state:

-  fix, fixes, fixed, close, closes, closed, resolve, resolves,
   resolved, implement, implements, implemented, finish, finishes,
   finished

Keep this in mind when submitting changes in github pull requests for
existing issues.
