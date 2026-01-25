#!/bin/bash

# CyberHack Course Environment Setup Script
# Version 1.0

echo "g-------- CyberHack Environment Setup --------g"
echo "This script will set up your computer for the course."

# Detect OS
OS="$(uname)"
if [ "$OS" == "Darwin" ]; then
    echo "[*] Detected macOS."
    # Check for Homebrew
    if ! command -v brew &> /dev/null; then
        echo "[!] Homebrew not found. Installing..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    else
        echo "[*] Homebrew is installed."
    fi

    echo "[*] Installing Tools via Brew..."
    brew install git python3 node nmap netcat

elif [ "$OS" == "Linux" ]; then
    echo "[*] Detected Linux."
    echo "[*] Installing Tools via APT..."
    sudo apt-get update
    sudo apt-get install -y git python3 python3-pip nodejs npm nmap netcat

else
    echo "[!] Unsupported OS: $OS. Please install tools manually."
    exit 1
fi

# Python Virtual Environment
echo "[*] Setting up Python Virtual Environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "[+] Created 'venv'."
else
    echo "[*] 'venv' already exists."
fi

# Install Python Libraries
echo "[*] Installing Python Dependencies..."
source venv/bin/activate
pip install requests pwntools
echo "[+] Python dependencies installed."

# VSCode Extensions (Optional)
if command -v code &> /dev/null; then
    echo "[*] Installing VSCode Extensions..."
    code --install-extension ms-python.python
    code --install-extension ritwickdey.LiveServer
    echo "[+] VSCode extensions installed."
else
    echo "[!] VSCode 'code' command not found. Skipping extensions."
fi

echo "g---------------------------------------------g"
echo "[+] Setup Complete! Happy Hacking."
