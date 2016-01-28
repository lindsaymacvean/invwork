#!/bin/bash

#This script will generate a selenium suite of all html files in the current directory (where you run the script from) and any directories below, excluding any files named 'suite.html'.

OUTFILE=generatedsuite.html

echo '<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta content="text/html; charset=UTF-8" http-equiv="content-type" />
  <title>Test Suite</title>
</head>
<body>
  <table id="suiteTable" cellpadding="1" cellspacing="1" border="1" class="selenium"><tbody>
    <tr><td><b>Test Suite</b></td></tr>' > $OUTFILE

find . -type f -name "*.html" ! -name "suite.html" ! -name "$OUTFILE" -print0 | while read -d $'\0' file
do
  echo "    <tr><td><a href=\"$file\">$file</a></td></tr>" >> $OUTFILE
done

echo '  </tbody></table>
</body>
</html>' >> $OUTFILE
