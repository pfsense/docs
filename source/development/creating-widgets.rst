Creating Dashboard Widgets
==========================

Getting Started
---------------

Creating widgets is simple. First, create the html code to be displayed,
save it to a file named widget_name.widget.php, and put it into the
/usr/local/www/widgets/widgets directory on the firewall.

Do not include any **<body>**, **<html>**, or pgtitle definitions, etc. Just the
basic HTML code for what needs to be displayed. See the current widgets for
examples.

The file must be named in the name_name.widget.php format. No spaces
are allowed. The name that will displayed is the name of the file. For
example the Traffic Graphs widget file is named
traffic_graphs.widget.php.

And that's it! The rest of the widget (buttons, border, dragging,
sequence, etc) is handled automatically by the dashboard.

To include custom PHP or JavaScript code into the widget upon rendering,
create a file named widget_name.inc for PHP or widget_name.js for
JavaScript. Copy .inc files in the /usr/local/www/widgets/include
directory and JavaScript files into the
/usr/local/www/widgets/javascript directory.

Saving Data
-----------

To save configuration data for the widget, some more work is required.

To store the data to the XML config use the following code::

  <input type="hidden" id="widget_name-config" name="widget_name-config" value="">

where widget_name is the name of the widget file minus the .widget.php.
An example is::

  <input type="hidden" id="traffic_graphs-config" name="traffic_graphs-config" value="">

Then copy the data into the value field of this hidden input. The value
stored to this input field the data will be stored as a string into the
config.

To retrieve the stored value for the widget use variables such as
$config['widgets']['widget_name_setting'], where widget_name is the
name of the widget. An example would be
$config['widgets']['filterlogentriesinterfaces']

For even more control, provide specific inputs for the user to modify.
Use the two code sections below to give more control over the widget.

To show the configuration button use the following code::

  <script type="text/javascript">
  //<![CDATA[
      selectIntLink = "widget_name-configure";
      textlink = document.getElementById(selectIntLink);
      textlink.style.display = "inline";
  //]]>
  </script>

where widget_name is the name of the widget file minus the .widget.php.
An example is selectIntLink = "traffic_graphs-configure";

To show additional configuration options use a <div> section at the top
of the widget. Use the following code and insert whatever is needed
between the <div> and </div> tags::

  <div id="services_status-settings" class="widgetconfigdiv" style="display:none;">
    <form action="/widgets/widgets/services_status.widget.php" method="post" name="iformd">
      Comma separated list of services to NOT display in the widget<br />
      <input type="text" size="30" name="servicestatusfilter" class="formfld unknown" id="servicestatusfilter" value="<?= $config['widgets']['servicestatusfilter'] ?>" />
      <input id="submitd" name="submitd" type="submit" class="formbtn" value="Save" />
    </form>
  </div>

Note that it is necessary to copy the data from the various input fields
to the correct backend settings::

  if(isset($_POST['servicestatusfilter'])) {
    $config['widgets']['servicestatusfilter'] = htmlspecialchars($_POST['servicestatusfilter'], ENT_QUOTES | ENT_HTML401);
    write_config("Saved Service Status Filter via Dashboard");
    header("Location: ../../index.php");
  }

Customizing the Title and Linking to page
-----------------------------------------

By default the name of the widget file is what is shown on the Widget in
the dashboard. This title can be changed and also have a link to another
page inserted.

To configure the widget to use a certain name other than the name of the
file, create an .inc file and insert that file into the
/usr/local/www/widgets/include directory.

For example if a widget is named abc.widget.php, the include file will
be abc.inc

In this .inc file use the following code::

  <?php //set variable for custom title
  $abc_title = "A B C custom";
  $abc_title_link = "abc.php";
  ?>

An example of this can be taken from the interfaces.inc file::

  <?php //set variable for custom title
  $interfaces_title = "Interfaces";
  $interfaces_title_link = "interfaces_assign.php";
  ?>

