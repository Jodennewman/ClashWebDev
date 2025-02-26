#!/bin/bash

# Create a backup just in case
cp css/jodens-stellar-site.webflow.css css/jodens-stellar-site.webflow.css.backup2

# Fix paths in CSS file
# 1. Change ../assets/main/ to ../public/assets/main/
# 2. Change /assets/main/ to /public/assets/main/
# But don't change paths that already have public in them

sed -i.bak \
    -e 's|url(\x27\.\./assets/main/|url(\x27\.\./public/assets/main/|g' \
    -e 's|url(\x22\.\./assets/main/|url(\x22\.\./public/assets/main/|g' \
    -e 's|url(\x27/assets/main/|url(\x27/public/assets/main/|g' \
    -e 's|url(\x22/assets/main/|url(\x22/public/assets/main/|g' \
    css/jodens-stellar-site.webflow.css

echo "Path fixing complete. Original file backed up as css/jodens-stellar-site.webflow.css.bak" 