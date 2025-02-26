#!/bin/bash

# Check if backup exists
if [ -f "css/jodens-stellar-site.webflow.css.backup" ]; then
  echo "Restoring CSS from backup..."
  cp css/jodens-stellar-site.webflow.css.backup css/jodens-stellar-site.webflow.css
  echo "CSS restored successfully!"
else
  echo "Backup file not found: css/jodens-stellar-site.webflow.css.backup"
  
  # Check for other backups
  if [ -f "css/jodens-stellar-site.webflow.css.backup2" ]; then
    echo "Found alternate backup: css/jodens-stellar-site.webflow.css.backup2"
    echo "To restore from this backup, run: cp css/jodens-stellar-site.webflow.css.backup2 css/jodens-stellar-site.webflow.css"
  fi
  
  if [ -f "css/jodens-stellar-site.webflow.css.bak" ]; then
    echo "Found alternate backup: css/jodens-stellar-site.webflow.css.bak"
    echo "To restore from this backup, run: cp css/jodens-stellar-site.webflow.css.bak css/jodens-stellar-site.webflow.css"
  fi
fi 