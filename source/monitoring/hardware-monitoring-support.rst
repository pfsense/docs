.. include:: /substitutions.rsti

Hardware Monitoring Support
===========================

FreeBSD, and thus pfSense, supports hardware monitoring on a few
chipsets. Unfortunately, support for this is limited but growing as
hardware is replaced by newer Intel and AMD CPUs that include better
monitoring. Where supported, it can be handy.

An Intel or AMD temperature monitor module may be selected under
**System > Advanced** on the **Miscellaneous** tab. These work with
Intel Core series and later Intel chips, and similarly recent AMD chips,
respectively. Support is not universal, but it is common, especially on
Intel chips, even Atom-based chips. The temperature can be observed
using the Thermal Sensors dashboard widget, or by sysctl::

  # sysctl -a | grep "dev.cpu.*.temperature"
  dev.cpu.0.temperature: 46.0C
  dev.cpu.1.temperature: 47.0C
  dev.cpu.2.temperature: 47.0C
  dev.cpu.3.temperature: 47.0C

These are typically on-die sensors so they only represent the CPU core
temperatures, not other zones in the system.

FreeBSD also handles some settings through ACPI. To see if the hardware
supports temperature monitoring, try the following command from a shell
prompt or **Diagnostics > Command**::

  sysctl hw.acpi.thermal

If the hardware is supported, output similar to the following will be
shown::

  hw.acpi.thermal.min_runtime: 0
  hw.acpi.thermal.polling_rate: 10
  hw.acpi.thermal.user_override: 0
  hw.acpi.thermal.tz0.temperature: 22.5C
  hw.acpi.thermal.tz0.active: -1
  hw.acpi.thermal.tz0.passive_cooling: 1
  hw.acpi.thermal.tz0.thermal_flags: 0
  hw.acpi.thermal.tz0._PSV: 85.0C
  hw.acpi.thermal.tz0._HOT: -1
  hw.acpi.thermal.tz0._CRT: 100.0C
  hw.acpi.thermal.tz0._ACx: 85.0C -1 -1 -1 -1 -1 -1 -1 -1 -1

In this example, there is only one Thermal Zone, and its temperature is
22.5C (72.5F).

From
`acpi\_thermal(4) <http://www.freebsd.org/cgi/man.cgi?query=acpi_thermal&apropos=0&sektion=0&manpath=FreeBSD+7.2-RELEASE&format=html>`__::

  hw.acpi.thermal.min_runtime
       Number of seconds to continue active cooling once started.  A new
       active cooling level will not be selected until this interval
       expires.
  
  hw.acpi.thermal.polling_rate
       Number of seconds between polling the current temperature.
  
  hw.acpi.thermal.user_override
       If set to 1, allow user override of various setpoints (below).
       The original values for these settings are obtained from the BIOS
       and system overheating and possible damage could occur if
       changed.  Default is 0 (no override).
  
  hw.acpi.thermal.tz%d.active
       Current active cooling system state.  If this is non-negative,
       the appropriate _AC%d object is running.  Set this value to the
       desired active cooling level to force the corresponding fan
       object to the appropriate level.
  
  hw.acpi.thermal.tz%d.passive_cooling
       If set to 1, passive cooling is enabled.  It does cooling without
       fans using cpufreq(4) as the mechanism for controlling CPU speed.
       Default is enabled for tz0 where it is available.
  
  hw.acpi.thermal.tz%d.thermal_flags
       Current thermal zone status.  These are bit-masked values.
  
  hw.acpi.thermal.tz%d.temperature
       Current temperature for this zone.
  
  hw.acpi.thermal.tz%d._PSV
       Temperature to start passive cooling by throttling down CPU, etc.
       This value can be overridden by the user.
  
  hw.acpi.thermal.tz%d._HOT
       Temperature to start critical suspend to disk (S4).  This value
       can be overridden by the user.
  
  hw.acpi.thermal.tz%d._CRT
       Temperature to start critical shutdown (S5).  This value can be
       overridden by the user.
  
  hw.acpi.thermal.tz%d._ACx
       Temperatures at which to switch to the corresponding active cool-
       ing level.  The lower the _ACx value, the higher the cooling
       power.
  
  All temperatures are printed in Celsius.  Values can be set in Celsius
  (by providing a trailing "C") or Kelvin (by leaving off any trailing let-
  ter).  When setting a value by sysctl(8), do not specify a trailing deci-
  mal (i.e., 90C instead of 90.0C).

The defaults for these values are taken from the BIOS, and some systems
will not allow changes. The only way to know is to try. Before
attempting to alter any of these values, set this OID::

  sysctl -w hw.acpi.thermal.user_override=1

These values may be set by adding the appropriate lines for the OIDs to
**System > Advanced** on the **Tunables** tab. Try setting them on the
fly like so::

  sysctl -w hw.acpi.thermal.tz0._CRT=120C

