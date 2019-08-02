Configuring the SquidGuard Package
==================================

squidGuard is a URL redirector used to integrate blacklists with the
Squid proxy software. There are two big advantages to squidGuard: it is
fast and it is free. squidGuard is published under the GNU Public
License.

**squidGuard can be used to**

-  Limit the web access for some users to a list of accepted/well known
   web servers and/or URLs only.
-  Block access to some listed or blacklisted web servers and/or URLs
   for some users.
-  Block access to URLs matching a list of regular expressions or words
   for some users.
-  Enforce the use of domain names/prohibit the use of IP addresses in
   URLs.
-  Redirect blocked URLs to an info page.
-  Redirect banners to an empty GIF.
-  Have different access rules based on time of day, day of the week,
   date etc.

Installation Squid2/3 + squidGuard on pfSense software version 2.1.x
--------------------------------------------------------------------

#. From the pfSense® webGUI, navigate to **System > Packages**, 
   **Available Packages** tab
#. Install the Squid package if it is not already installed.
#. Install the squidGuard package
#. Configure Squid package.
#. Configure squidGuard package.

Configure the squidGuard Package
--------------------------------

Blacklist
~~~~~~~~~

Blacklists are optional, but often useful for allowing access to certain
types of sites.

squidGuard comes with a small blacklist basically for testing purposes.
They should not be used in production. A better way is to start with one
of the blacklist collections listed (alphabetically) below.

-  `MESD blacklists <http://squidguard.mesd.k12.or.us/blacklists.tgz>`__
   - They are freely available.
-  `Shalla's
   Blacklists <http://www.shallalist.de/Downloads/shallalist.tar.gz>`__
   - Free for non commercial/private use. (Recommended)
-  `more.. <http://www.squidguard.org/blacklists.html>`__

**Downloading blacklist:**

#. Open **General Settings** tab in squidGuard package GUI, found at
   **Services > Proxy Filter**.
#. Check **Blacklist** to enable the use of blacklists
#. Enter blacklist URL in the field **Blacklist URL**.
#. If the firewall is itself behind a proxy, enter the proxy information
   in **Blacklist proxy** (this step is not necessary for most people)
#. Click **Save**
#. Navigate to the **Blacklist** tab inside of squidGuard
#. Click the **Download** button.
#. Wait while blacklist will downloaded and prepared to use (10-35 min).
   Progress will be displayed on that page as the list is downloaded and
   processed.

Basic configuration
~~~~~~~~~~~~~~~~~~~

Here describes how to enable and configure squidGuard, and common users
access.

#. Open **General settings** tab.

   #. Check the **Enable** box to activate the package.
   #. Set **Blacklist** options to use blacklist categories. (See above,
      optional)
   #. Click **Save** button.

#. Open **Common ACL** page.

   #. Click **Target Rules List** to show defined blacklists and target
      categories

      #. Define default user access: select **Default access [all]** as
         *allow* or *deny*.
      #. Define other category actions:

         #. Select *---*, to ignore a category.
         #. Select *allow*, to allow this category for clients.
         #. Select *deny*, to deny this category for clients.
         #. Select *white*, to allow this category without any
            restrictions. This option is used for exceptions to
            prohibited categories.

      #. To prohibit clients from using IP addresses in URLs, check **Do
         Not Allow IP Addresses in URL**.
      #. Select **Redirect mode**:

         #. *Int error page*: Use the built-in error page. A custom
            message may be entered in the **Redirect info** box below.
         #. *Int blank page*: Redirect to a blank page
         #. The other options are various redirects to external error
            pages, and a URL must be entered in the **Redirect info**
            box if they are chosen.

      #. **Use safe search engine**: Protect customers from unwanted
         search results. It is supported by *Google, Yandex, Yahoo, MSN,
         Live Search*. Make sure that these search engines are
         available. If this protection should be strictly enforced,
         disable access to all other search engines.

#. After settings are complete, return to the **General Settings** tab
   and press **Apply**.

-= HERE UNDER CONSTRUCTION =-

HowTo
-----

Exclude domain/URL from blacklist
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the squidGuard GUI (**Services > Proxy Filter**):

#. Open the **Target categories** page
#. Click |fa-plus| to add a new item
#. Enter a name for the category - *myWhitelist* for example.
#. Add domains and/or URLs to the lists as needed. Entries should be
   separated by a space. The examples on the page show how entries
   should be formatted.
#. As with the Common ACL discussed previously, redirect and logging
   options specific to this category may be set.
#. Click **Save**
#. Open **Common ACL** or **Groups ACL** page (whichever should have an
   exclusion).
#. Click **Target Rule List** to expand the list of categories. The
   newly created category should show alphabetically in the list, above
   any blacklist categories. Find the *MyWhiteList* entry in the list
   and select *white*.
#. Click **Save**
#. Return to the **General Settings** tab and press **Apply**.

Block download by Extension
~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the squidGuard GUI (**Services > Proxy Filter**):

#. Open the **Target categories** page
#. Click |fa-plus| to add a new item
#. Enter a name for the category - *myBlockExt* for example.
#. Add Expressions (for example for asf, zip, exe and etc files)::

     (.*\/.*\.(asf|wm|wma|wmv|zip|rar|cab|mp3|avi|mpg|swf|exe|mpeg|mp.|mpv|mp3|wm.|vpu))

#. Click **Save**
#. Open **Common ACL** or **Groups ACL** page (whichever should have an
   exclusion).
#. Click **Target Rule List** to expand the list of categories. The
   newly created category should show alphabetically in the list, above
   any blacklist categories. Find the *myBlockExt* entry in the list and
   select *deny*.
#. Click **Save**
#. Return to the *General Settings* tab and press **Apply**.

Troubleshooting
---------------

Netflix
~~~~~~~

If Netflix will not load while squidGuard is active, it is likely
because Netflix requires accessing URLs by IP address. Ensure that ACLs
matching clients allowed to reach Netflix also *do not have* **Do not
allow IP-Addresses in URL** checked.

Service does not Start
~~~~~~~~~~~~~~~~~~~~~~

If the squidGuard service will not start, there are a few possible
explanations:

-  On all versions of Squid, if **only** blacklists have been
   configured, then at startup some important files/directories may not
   be set properly. Add at least one Custom Target Category with a site
   to pass or block and use it along with the blacklist entries to work
   around the problem.
-  On squid 3.x, the squidGuard service will only start when traffic
   requires it to run, so it can appear to be stopped even when working
   properly. Only worry about the service if it appears to not work,
   don't count on the service status alone.

-= to be continued =-
