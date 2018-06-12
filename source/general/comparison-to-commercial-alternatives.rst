.. include:: /substitutions.rsti

Comparison to Commercial Alternatives
=====================================

The question of security and support vs. commercial alternatives comes
up from time to time. The history of this project since its inception in
2004 proves we're as secure as any, and better than many, commercial
alternatives. The experiences of our customers proves not only can we
match the service of any commercial firewall vendor, we exceed it. This
page serves to debunk the common myths when comparing to commercial
alternatives.

"Hardware" firewalls are better myth
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Commercial firewall companies' marketing departments have done a fine
job engraining the myth of "hardware firewalls" into some people's
minds. The reality is there is no such thing as a "hardware firewall."
All firewalls are hardware that runs software. Most commercial firewalls
are based on BSD (same as pfSense) or Linux. Numerous commercial
firewalls run many of the same underlying software programs that pfSense
uses. Many commercial alternatives run on x86 hardware that's no
different from what people use for pfSense. In fact many people have
loaded pfSense on hardware that used to run their commercial firewall,
including Watchguard, Nortel, Barracuda and more.

Open source is insecure myth
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Some people are of the mindset that because the source is open, it's
insecure because everyone can see how it works. Anyone who has paid any
attention to security over the past 20 years knows the absurdity of that
statement. No software relies on the obscurity of source code for
security. If there was any truth in that, Microsoft Windows would be the
most secure OS ever created, when the reality is all of the open source
operating systems (all the BSDs and Linux) have security track records
that are worlds better than Windows'. History proves the same applies to
any software. Internet Explorer is continually hit with major security
holes that many times take weeks to patch while they're being exploited
in the wild, while open source browsers Firefox, Chrome and others have
had significantly better security track records.

The `widespread UPnP vulnerabilities announced in
2013 <http://blog.pfsense.org/?p=688>`__ affecting over 300 commercial
products is another good example. The vendors of hundreds of commercial
products made extremely basic security mistakes, shipping with absurdly
insecure defaults, and shipping outdated software. That's never been an
issue with pfSense. That's just one example of where we've done a better
job than many commercial vendors.

Commercial alternatives have better support myth
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With some open source projects, it's true that you're stuck if you need
help. With pfSense, we have `commercial
support <https://pfsense.org/get-support/>`__ that rivals anything any
commercial vendor offers, and is a significantly better fit for most
customers than what's provided by commercial vendors by its design.
Early on we found going with the commercial vendors' support model isn't
a good fit for our user base. Some users need significant help getting
things setup, and some just need a little guidance here and there. Some
can support their networks on an ongoing basis with minimal assistance,
and others don't have internal resources and want experts they can rely
on to fill that need in their organization. Many customers need senior
level network and security people to assist in the maintenance and
operation of their network. Some are highly technically competent, but
just like having another set of eyes available on occasion when they hit
a tough issue. Hence why we've been providing strictly hourly support
since 2008.

A significant number of the support calls and tickets we handle aren't
problems with the firewall. Commercial firewall vendors will eliminate
the firewall as the source of the problem, and wish you luck in solving
it. Because we do hourly support, and our staff all have a wide range of
experience, we can frequently not only eliminate the firewall but also
help customers fix or at least nail down the actual source of the
problem. In one recent example, a support call started with "the
firewall isn't routing and it's breaking Active Directory." We quickly
determined there were no network connectivity problems, and a packet
capture of the affected traffic showed numerous Active Directory DNS
queries coming back as NXDOMAIN (host not found). Upon inspection of the
customer's Active Directory DNS, we found something or someone had
deleted the majority of their Active Directory DNS records, which left
their domain completely unusable. At that point we had a sticky enough
situation that we referred them to Microsoft support for a proper fix,
as while we're familiar with Windows Servers, getting into serious
Active Directory repairs is more than we're comfortable doing. But we
were able to find the exact problem, send them a write up they could
refer to with the exact details of the problem, and refer them to
Microsoft for a proper fix in 30 minutes, when they had been
troubleshooting the issue for several hours before calling. This is just
one example of many similar cases where we provide significantly more
value than any commercial firewall vendor's support would provide.
Customers don't care whether the problem is the firewall, they want it
identified and fixed. By providing hourly support, and being staffed
strictly with very experienced and highly skilled people, we can do just
that.
