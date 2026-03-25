#!/bin/bash
# Script untuk menjalankan backend dashboard dc dengan Node.js 20 via nvm

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use 20 --silent

echo "Menggunakan Node.js: $(node --version)"
cd /home/dashboard-dc/Dashboard-DC/backend-dashboard-dc
npm run dev