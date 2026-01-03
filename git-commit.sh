#!/bin/bash

time git add . # 2 min
time git commit -m "Auto-commit changes" # 30 s
time git push origin main # 
echo "Changes have been committed and pushed to the main branch."
