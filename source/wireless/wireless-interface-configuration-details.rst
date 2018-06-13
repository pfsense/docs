.. include:: /substitutions.rsti

Wireless Interface Configuration Details
========================================

Wireless Card Options
---------------------

These options are common between all SSIDs/VAPs on the same wireless
card.

- **Persist common settings**: Enabling this preserves the common
  wireless configuration through interface deletions and reassignments.
- **Standard**: The wireless standard to use for clients, such as
  *802.11g* or *802.11b*. Only the options supported by the installed
  card are displayed.
- **802.11g OFDM Protection Mode**: For IEEE 802.11g, use the specified
  technique for protecting OFDM frames in a mixed 11b/11g network. May
  be left off is the network is not mixed.
- **Transmit power**: Controls the output (transmit) power of the card.
  Typically only a few discreet power settings are available and the
  driver will use the setting closest to the specified value. Not all
  adapters support changing the transmit power setting, and it may be
  limited by local regulations.
- **Channel**: A list of channels supported by the installed wireless
  adapter, displayed in the following format::

    wireless standards - channel # (frequency @ max TX power / TX power
    allowed in reg. domain)

- When running an access point, it is best to explicitly set a
  channel. Do not leave this on *Auto*!

- **Antenna settings**:

  - **Diversity**: Switch off and on the use of antenna diversity
    (normally only used if two antennas are connected), to allow both
    antenna to be used for both transmit and receive.
  - **Transmit/Receive Antenna**: Allows manually specifying which
    antenna should be used to transmit and which is used to receive.
    The numbers may not line up with the numbers noted on the physical
    adapter.

- **Distance setting**: This field can be used to tune ACK/CTS timers
  to fit the distance between AP and Client. It is measured in *Meters*
  and works only for Atheros based cards.
- Regulatory settings: Specifies the locality in which the card is
  used, so that the card will comply with local laws and regulations
  for radio signals. Use of some channels and behaviors (such as the
  use of 802.11n) require an appropriate **Regulatory Domain** to be
  configured.

  - **Regulatory domain**: The governing body that controls
    transmission regulations in the region where the firewall is
    deployed, such as the *FCC* or *ETSI*.
  - **Country**: The country code and regulatory domain in which the
    card is used. Any country setting other than "Default" will
    override the regulatory domain setting.
  - **Location**: The physical location of the device, typically
    *Indoor*. Some regulatory bodies have different rules for *Indoor*
    vs *Outdoor* use.

Wireless Access Point (hostap) with WPA2
----------------------------------------

Configuration of the wireless Interface:

-  *Channel*: Be sure to explicitly set a desired channel in the top
   section when running an access point
-  **Mode**: *Access Point*
-  **SSID**: Whatever desired, typically something short without spaces
   in the name.
-  **Enable WPA**: *Checked*
-  **WPA Pre-Shared Key**: The "password" to use for wireless access by
   clients (8-63 chars)
-  **WPA mode**: *WPA2*
-  **WPA Key Management Mode**: *Pre Shared Key*
-  **Authentication**: *Open System Authentication*
-  **WPA Pairwise**: *AES (Recommended)*

Other interesting options:

-  **Minimum wireless standard**: Set this to prevent older/slower
   clients from connecting and reducing the speed of the network.
-  **Allow intra-BSS communication**: Check this to allow wireless
   clients to contact each other
-  **Enable WME**: Setting this option will force the card to use WME
   (wireless QoS). Can help especially with higher speeds such as
   802.11n.
-  **Enable Hide SSID**: Stops the firewall from
   transmitting/advertising/broadcasting the SSID to the public. Clients
   must be manually configured to use the SSID in these cases.
-  **WEP**: Older/broken encryption. Only use if someone forces it. All
   modern clients support better options such as WPA2.
-  **Key Rotation**: How often to regenerate client keys. May need to be
   raised to avoid frequently client interruptions on higher speed
   networks.
-  **Master Key Regeneration**: Controls how often the master key is
   regenerated. Should not be shorter than the **Key Rotation** time.
   Defaults to 3600 (1 hour).
-  **Strict Key Regeneration**: Forces the AP to generate new keys when
   a client disassociates, to protect the security of clients that are
   still connected.

Wireless client with AES encryption
-----------------------------------

Config on the wireless page:

    Set Mode: Infrastructure
    Set SSID: SSID of AP
    Enable WPA: Checked
    Set The PSK: Shared key from AP in ascii
    Set WPA mode: WPA
    Set wpa Key Management Mode: Pre Shared Key
    Set Authentication: Open System Authentication
    Set WPA Pairwise: AES

-  *Channel*: Use *Auto* or configure this to match the channel of the
   AP to which this client will connect.
-  **Mode**: *Infrastructure (BSS)*
-  **SSID**: The SSID of the AP to which this client will connect.

The following settings must match those found on the AP, but examples
are provided:

-  **Enable WPA**: *Checked*
-  **WPA Pre-Shared Key**: The "password" set on the AP
-  **WPA mode**: *WPA2*
-  **WPA Key Management Mode**: *Pre Shared Key*
-  **Authentication**: *Open System Authentication*
-  **WPA Pairwise**: *AES (Recommended)*

That should be it, Good luck and have fun.

**Tips** To get card capabilities and more
------------------------------------------

- list available channels::

    ifconfig "IF-NAME" list chan

- lists modes::

    ifconfig -m "IF-NAME"

- view settings::

    ifconfig -v "IF-NAME"

- list stations::

    ifconfig "IF-NAME" list sta

- see available APs (Also shown on **Diagnostics > Wireless**)::

    ifconfig "IF-NAME" list scan

- list wireless QoS settings::

    ifconfig "IF-NAME" list wme

Interesting sysctls from shell that can not be controlled from GUI
------------------------------------------------------------------

-  dev.ath.0.tpscale: **0,1,2,3,4** *(size of increment that TPC will
   use to up/down the power, normally 1 is the best choice, atleast that
   is my experience)*
-  dev.ath.0.tpc: **0,1** *(0=disable 1=enable)*
-  dev.ath.0.tpack: **0 -> 99** *(ack power)*
-  dev.ath.0.tpcts: **0 -> 99** *(cts power)*

**A little more description:**

-  dev.ath.0.tpc: *Switch on or off Transmission Power Control (can be
   tricky in point to multipoint applications)*
-  dev.ath.0.tpscale: *Size of the increment that TPC will use to
   up/down the power, normally 1 is the best choice, atleast that is my
   experience. A higher scale value will most likely make the link drop
   if the signal is close to what it needs to be and the TPC is trottled
   down.)*
-  dev.ath.0.tpack: *controll the ack power seperatly (normally the same
   as tpcts)*
-  dev.ath.0.tpcts: *controll the cts power seperatly (normally the same
   as tpack)*

Tuning ACK timers manually::

  Real life values:
  
  range 		ack-timeout
  
  5GHz	5GHz-turbo	2.4GHz-G
  0km	default	default		default
  5km	52	30		62
  10km	85	48		96
  15km	121	67		133
  20km	160	89		174
  25km	203	111		219
  30km	249	137		268
  35km	298	168		320
  40km	350	190		375
  45km	405	-		-
