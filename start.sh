#!/bin/bash
cd /usr/local/service/stock_admin
pm2 --name Stock_Admin_Server --log AdminServer.log --time start src/app.js