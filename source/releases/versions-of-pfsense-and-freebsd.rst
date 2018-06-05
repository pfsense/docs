.. include:: /substitutions.rsti

Versions of pfSense and FreeBSD
===============================

Each version of pfSense is based on a specific -RELEASE version of
FreeBSD. Below is a table that lists recent versions of pfSense and the
underlying FreeBSD version upon which they are based.

===============  ==========  =========================================================================  ==========================================================================  ==============  ============  ======================================================================================
pfSense Version  Config Rev  pfSense Branch                                                             FreeBSD Version                                                             FreeBSD Branch  Release Date  Release Status
===============  ==========  =========================================================================  ==========================================================================  ==============  ============  ======================================================================================
1.2              3.0         `RELENG_1_2 <https://github.com/pfsense/pfsense/commits/RELENG_1_2>`_      `6.2-RELEASE-p11 <https://www.freebsd.org/releases/6.2R/hardware.html>`_    RELENG_6_2      2008-02-25    No longer supported
1.2.1            3.0         `RELENG_1_2 <https://github.com/pfsense/pfsense/commits/RELENG_1_2>`_      `7.0-RELEASE-p7 <https://www.freebsd.org/releases/7.0R/hardware.html>`_     RELENG_7_0      2008-12-26    No longer supported
1.2.2            3.0         `RELENG_1_2 <https://github.com/pfsense/pfsense/commits/RELENG_1_2>`_      `7.0-RELEASE-p8 <https://www.freebsd.org/releases/7.0R/hardware.html>`_     RELENG_7_0      2009-01-09    No longer supported
1.2.3            3.0         `RELENG_1_2 <https://github.com/pfsense/pfsense/commits/RELENG_1_2>`_      `7.2-RELEASE-p5 <https://www.freebsd.org/releases/7.2R/hardware.html>`_     RELENG_7_2      2009-12-10    No longer supported
2.0              8.0         `RELENG_2_0 <https://github.com/pfsense/pfsense/commits/RELENG_2_0>`_      `8.1-RELEASE-p4 <https://www.freebsd.org/releases/8.1R/hardware.html>`_     RELENG_8_1      2011-09-17    :doc:`No longer supported <2-0-new-features-and-changes>`
2.0.1            8.0         `RELENG_2_0 <https://github.com/pfsense/pfsense/commits/RELENG_2_0>`_      `8.1-RELEASE-p6 <https://www.freebsd.org/releases/8.1R/hardware.html>`_     RELENG_8_1      2011-12-20    :doc:`No longer supported <2-0-1-new-features-and-changes>`
2.0.2            8.0         `RELENG_2_0 <https://github.com/pfsense/pfsense/commits/RELENG_2_0>`_      `8.1-RELEASE-p13 <https://www.freebsd.org/releases/8.1R/hardware.html>`_    RELENG_8_1      2012-12-21    :doc:`No longer supported <2-0-2-new-features-and-changes>`
2.0.3            8.0         `RELENG_2_0 <https://github.com/pfsense/pfsense/commits/RELENG_2_0>`_      `8.1-RELEASE-p13 <https://www.freebsd.org/releases/8.1R/hardware.html>`_    RELENG_8_1      2013-04-15    :doc:`No longer supported <2-0-3-new-features-and-changes>`
2.1              9.8         `RELENG_2_1 <https://github.com/pfsense/pfsense/commits/RELENG_2_1>`_      `8.3-RELEASE-p11 <https://www.freebsd.org/releases/8.3R/hardware.html>`_    RELENG_8_3      2013-09-15    :doc:`No longer supported <2-1-new-features-and-changes>`
2.1.1            10.1        `RELENG_2_1 <https://github.com/pfsense/pfsense/commits/RELENG_2_1>`_      `8.3-RELEASE-p14 <https://www.freebsd.org/releases/8.3R/hardware.html>`_    RELENG_8_3      2014-04-04    :doc:`No longer supported <2-1-1-new-features-and-changes>`
2.1.2            10.1        `RELENG_2_1 <https://github.com/pfsense/pfsense/commits/RELENG_2_1>`_      `8.3-RELEASE-p14 <https://www.freebsd.org/releases/8.3R/hardware.html>`_    RELENG_8_3      2014-04-10    :doc:`No longer supported <2-1-2-new-features-and-changes>`
2.1.3            10.1        `RELENG_2_1 <https://github.com/pfsense/pfsense/commits/RELENG_2_1>`_      `8.3-RELEASE-p16 <https://www.freebsd.org/releases/8.3R/hardware.html>`_    RELENG_8_3      2014-05-02    :doc:`No longer supported <2-1-3-new-features-and-changes>`
2.1.4            10.1        `RELENG_2_1 <https://github.com/pfsense/pfsense/commits/RELENG_2_1>`_      `8.3-RELEASE-p16 <https://www.freebsd.org/releases/8.3R/hardware.html>`_    RELENG_8_3      2014-06-25    :doc:`No longer supported <2-1-4-new-features-and-changes>`
2.1.5            10.1        `RELENG_2_1 <https://github.com/pfsense/pfsense/commits/RELENG_2_1>`_      `8.3-RELEASE-p16 <https://www.freebsd.org/releases/8.3R/hardware.html>`_    RELENG_8_3      2014-08-27    :doc:`No longer supported <2-1-5-new-features-and-changes>`
2.2              11.6        `RELENG_2_2 <https://github.com/pfsense/pfsense/commits/RELENG_2_2>`_      `10.1-RELEASE-p4 <https://www.freebsd.org/releases/10.1R/hardware.html>`_   releng/10.1     2015-01-23    :doc:`Previous stable supported release <2-2-new-features-and-changes>`
2.2.1            11.7        `RELENG_2_2 <https://github.com/pfsense/pfsense/commits/RELENG_2_2>`_      `10.1-RELEASE-p6 <https://www.freebsd.org/releases/10.1R/hardware.html>`_   releng/10.1     2015-03-17    :doc:`Previous stable maintenance/security release <2-2-1-new-features-and-changes>`
2.2.2            11.7        `RELENG_2_2 <https://github.com/pfsense/pfsense/commits/RELENG_2_2>`_      `10.1-RELEASE-p9 <https://www.freebsd.org/releases/10.1R/hardware.html>`_   releng/10.1     2015-04-15    :doc:`Previous stable maintenance/security release <2-2-2-new-features-and-changes>`
2.2.3            11.7        `RELENG_2_2 <https://github.com/pfsense/pfsense/commits/RELENG_2_2>`_      `10.1-RELEASE-p13 <https://www.freebsd.org/releases/10.1R/hardware.html>`_  releng/10.1     2015-06-24    :doc:`Previous stable maintenance/security release <2-2-3-new-features-and-changes>`
2.2.4            11.9        `RELENG_2_2 <https://github.com/pfsense/pfsense/commits/RELENG_2_2>`_      `10.1-RELEASE-p15 <https://www.freebsd.org/releases/10.1R/hardware.html>`_  releng/10.1     2015-07-26    :doc:`Previous stable maintenance/security release <2-2-4-new-features-and-changes>`
2.2.5            12.0        `RELENG_2_2 <https://github.com/pfsense/pfsense/commits/RELENG_2_2>`_      `10.1-RELEASE-p24 <https://www.freebsd.org/releases/10.1R/hardware.html>`_  releng/10.1     2015-11-05    :doc:`Previous stable maintenance/security release <2-2-5-new-features-and-changes>`
2.2.6            12.0        `RELENG_2_2 <https://github.com/pfsense/pfsense/commits/RELENG_2_2>`_      `10.1-RELEASE-p25 <https://www.freebsd.org/releases/10.1R/hardware.html>`_  releng/10.1     2015-12-21    :doc:`Previous stable maintenance/security release <2-2-6-new-features-and-changes>`
2.3              15.0        `RELENG_2_3_0 <https://github.com/pfsense/pfsense/commits/RELENG_2_3_0>`_  `10.3-RELEASE <https://www.freebsd.org/releases/10.3R/hardware.html>`_      releng/10.3     2016-04-12    :doc:`Previous release <2-3-new-features-and-changes>`
2.3.1            15.4        `RELENG_2_3_1 <https://github.com/pfsense/pfsense/commits/RELENG_2_3_1>`_  `10.3-RELEASE-p3 <https://www.freebsd.org/releases/10.3R/hardware.html>`_   releng/10.3     2016-05-18    :doc:`Previous release <2-3-1-new-features-and-changes>`
2.3.2            15.5        `RELENG_2_3_2 <https://github.com/pfsense/pfsense/commits/RELENG_2_3_2>`_  `10.3-RELEASE-p5 <https://www.freebsd.org/releases/10.3R/hardware.html>`_   releng/10.3     2016-07-19    :doc:`Previous release <2-3-2-new-features-and-changes>`
2.3.3            15.8        `RELENG_2_3_3 <https://github.com/pfsense/pfsense/commits/RELENG_2_3_3>`_  `10.3-RELEASE-p16 <https://www.freebsd.org/releases/10.3R/hardware.html>`_  releng/10.3     2017-02-20    :doc:`Previous release <2-3-3-new-features-and-changes>`
2.3.3-p1         15.8        `RELENG_2_3_3 <https://github.com/pfsense/pfsense/commits/RELENG_2_3_3>`_  `10.3-RELEASE-p17 <https://www.freebsd.org/releases/10.3R/hardware.html>`_  releng/10.3     2017-03-09    :doc:`Previous Errata Release <2-3-3-p1-new-features-and-changes>`
2.3.4            15.8        `RELENG_2_3_4 <https://github.com/pfsense/pfsense/commits/RELENG_2_3_4>`_  `10.3-RELEASE-p19 <https://www.freebsd.org/releases/10.3R/hardware.html>`_  releng/10.3     2017-05-04    :doc:`Previous release <2-3-4-new-features-and-changes>`
2.3.4-p1         15.8        `RELENG_2_3_4 <https://github.com/pfsense/pfsense/commits/RELENG_2_3_4>`_  `10.3-RELEASE-p19 <https://www.freebsd.org/releases/10.3R/hardware.html>`_  releng/10.3     2017-07-20    :doc:`Previous release <2-3-4-p1-new-features-and-changes>`
2.3.5            15.8        `RELENG_2_3_5 <https://github.com/pfsense/pfsense/commits/RELENG_2_3_5>`_  `10.3-RELEASE-p20 <https://www.freebsd.org/releases/10.3R/hardware.html>`_  releng/10.3     2017-10-31    `2.3.x Security/Errata Release <2-3-5-new-features-and-changes>`
2.3.5-p1         15.8        `RELENG_2_3_5 <https://github.com/pfsense/pfsense/commits/RELENG_2_3_5>`_  `10.3-RELEASE-p26 <https://www.freebsd.org/releases/10.3R/hardware.html>`_  releng/10.3     2017-12-14    :doc:`Previous release <2-3-5-p1-new-features-and-changes>`
2.3.5-p2         15.8        `RELENG_2_3_5 <https://github.com/pfsense/pfsense/commits/RELENG_2_3_5>`_  `10.3-RELEASE-p26 <https://www.freebsd.org/releases/10.3R/hardware.html>`_  releng/10.3     2018-05-14    :doc:`Current 2.3.x Security/Errata Release <2-3-5-p2-new-features-and-changes>`
2.4              17.0        `RELENG_2_4_0 <https://github.com/pfsense/pfsense/commits/RELENG_2_4_0>`_  `11.1-RELEASE-p1 <https://www.freebsd.org/releases/11.1R/hardware.html>`_   releng/11.1     2017-10-12    :doc:`Previous release <2-4-new-features-and-changes>`
2.4.1            17.3        `RELENG_2_4_1 <https://github.com/pfsense/pfsense/commits/RELENG_2_4_1>`_  `11.1-RELEASE-p2 <https://www.freebsd.org/releases/11.1R/hardware.html>`_   releng/11.1     2017-10-24    :doc:`Previous release <2-4-1-new-features-and-changes>`
2.4.2            17.3        `RELENG_2_4_2 <https://github.com/pfsense/pfsense/commits/RELENG_2_4_2>`_  `11.1-RELEASE-p4 <https://www.freebsd.org/releases/11.1R/hardware.html>`_   releng/11.1     2017-11-20    :doc:`Previous release <2-4-2-new-features-and-changes>`
2.4.2-p1         17.3        `RELENG_2_4_2 <https://github.com/pfsense/pfsense/commits/RELENG_2_4_2>`_  `11.1-RELEASE-p6 <https://www.freebsd.org/releases/11.1R/hardware.html>`_   releng/11.1     2017-12-14    :doc:`Previous release <2-4-2-p1-new-features-and-changes>`
2.4.3            17.9        `RELENG_2_4_3 <https://github.com/pfsense/pfsense/commits/RELENG_2_4_3>`_  `11.1-RELEASE-p7 <https://www.freebsd.org/releases/11.1R/hardware.html>`_   releng/11.1     2018-03-29    :doc:`Previous release <2-4-3-new-features-and-changes>`
2.4.3-p1         18.0        `RELENG_2_4_3 <https://github.com/pfsense/pfsense/commits/RELENG_2_4_3>`_  `11.1-RELEASE-p10 <https://www.freebsd.org/releases/11.1R/hardware.html>`_  releng/11.1     2018-05-14    :doc:`Current supported 2.4.x stable release <2-4-3-p1-new-features-and-changes>`
2.4.4            >=18.2      `master <https://github.com/pfsense/pfsense/commits/master>`_              `11.1-RELEASE-p7 <https://www.freebsd.org/releases/11.1R/hardware.html>`_   releng/11.1     TBD           Next maintenance release
===============  ==========  =========================================================================  ==========================================================================  ==============  ============  ======================================================================================

Legend:

- *TBD = To Be Determined, not yet known.*
- **pfSense Branch** column links to Github to view a specific pfSense
  branch
- **FreeBSD Version** column links to version-specific Hardware notes
  from FreeBSD

