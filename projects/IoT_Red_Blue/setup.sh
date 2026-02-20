#!/bin/bash

# ==============================================================================
# IoT Red vs Blue Capstone Project - Automated Setup Script
# ==============================================================================

echo -e "\n\033[1;36m[*] Initializing IoT Red vs Blue Setup...\033[0m\n"

# 1. Check for Node.js
if ! command -v node >/dev/null 2>&1; then
    echo -e "\033[1;31m[!] Node.js is not installed. Please install Node v14+ to continue.\033[0m"
    exit 1
else
    NODE_VERSION=$(node -v)
    echo -e "\033[1;32m[+] Node.js detected: $NODE_VERSION\033[0m"
fi

# 2. Check for npm
if ! command -v npm >/dev/null 2>&1; then
    echo -e "\033[1;31m[!] npm is not installed. Please install npm to continue.\033[0m"
    exit 1
else
    NPM_VERSION=$(npm -v)
    echo -e "\033[1;32m[+] npm detected: v$NPM_VERSION\033[0m"
fi

# 3. Handle Environment Variables
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo -e "\n\033[1;33m[*] Copying .env.example to .env...\033[0m"
        cp .env.example .env
        echo -e "\033[1;32m[+] .env file created successfully.\033[0m"
    else
        echo -e "\033[1;31m[!] .env.example not found! Missing environment templates.\033[0m"
    fi
else
    echo -e "\n\033[1;32m[+] .env file already exists. Skipping copy.\033[0m"
fi

# 4. Install Dependencies
echo -e "\n\033[1;36m[*] Installing dependencies across all microservices...\033[0m"
# The root package.json install:all script will handle server, client, and simulator.
npm run install:all

if [ $? -eq 0 ]; then
    echo -e "\n\033[1;32m[+] All dependencies installed successfully!\033[0m"
else
    echo -e "\n\033[1;31m[-] Error installing dependencies. Please check npm logs.\033[0m"
    exit 1
fi

# 5. Instructions
echo -e "\n\033[1;36m======================================================================\033[0m"
echo -e "\033[1;32mSetup Complete! The IoT Red vs Blue environment is ready.\033[0m"
echo -e "\033[1;36m======================================================================\033[0m"
echo -e "You can start the entire environment simultaneously with one command:"
echo -e "  \033[1;33mnpm run dev\033[0m\n"
echo -e "Or you can start components individually:"
echo -e "  1. Make sure MongoDB is running locally on port 27017: \033[0;35mmongod\033[0m"
echo -e "  2. Start the API Server: \033[0;35mnpm run dev:server\033[0m (localhost:3000)"
echo -e "  3. Start the Dashboard: \033[0;35mnpm run dev:client\033[0m (localhost:3001)"
echo -e "  4. Start legitimate Simulator traffic: \033[0;35mnpm run dev:sensor\033[0m\n"
echo -e "Happy Hacking!"
