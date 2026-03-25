#!/bin/bash
# Script untuk menjalankan frontend dengan Node.js 20 via nvm

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use 20 --silent

echo "Menggunakan Node.js: $(node --version)"
cd /home/dashboard-dc/Dashboard-DC/frontend-dashboard-admin-panel
npm run dev
