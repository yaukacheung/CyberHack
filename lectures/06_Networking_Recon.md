# Chapter 6: Networking & Reconnaissance

## 6.1 The Language of the Internet (TCP/IP)
Hacking is often just manipulating network traffic.

### The TCP 3-Way Handshake
Before data sends, a connection must be established. This is polite networking.

<!-- Placeholder: [Image: tcp_handshake.png] - SYN, SYN-ACK, ACK flow diagram -->

1.  **SYN:** Client sends "Hello, I want to talk" (Synchronization).
2.  **SYN-ACK:** Server sends "Okay, I'm listening" (Synchronization + Acknowledgment).
3.  **ACK:** Client sends "Great, let's start" (Acknowledgment).

*   **CTF Tip:** A "SYN Scan" (Nmap default) sends step 1. If it gets step 2 back, the port is open. It never sends step 3, making it slightly stealthier.

### Subnetting (CIDR Notation)
*   `192.168.1.0/24`: The "slash 24" means the first 24 bits (3 octets) are fixed.
    *   IPs range from `192.168.1.1` to `192.168.1.254`.
*   `127.0.0.1`: Localhost (Your own computer).

## 6.2 Reconnaissance (Enumeration)
"Give me six hours to chop down a tree and I will spend the first four sharpening the axe." - Abraham Lincoln.

### Active Scanning with Nmap
Nmap is the King of Scanners.

<!-- Placeholder: [Image: nmap_scan_types.png] - Visualizing different scan techniques -->

#### Step-by-Step: Enumerating a Target
**Target:** `10.10.10.5`

1.  **Quick Scan:**
    *   Command: `nmap -sC -sV 10.10.10.5`
    *   `-sC`: Use default scripts (finds titles, headers).
    *   `-sV`: Probe open ports to determine service/version info.
2.  **Full Port Scan:**
    *   Command: `nmap -p- 10.10.10.5`
    *   Scans all 65,535 ports. Critical if SSH is hidden on port 2222.
3.  **UDP Scan:**
    *   Command: `nmap -sU 10.10.10.5`
    *   Slow, but finds things like SNMP or TFTP.

### Directory Busting (Web Recon)
Finding hidden folders on a web server.
*   **Tools:** `gobuster`, `dirb`, `dirsearch`.
*   **Concept:** The tool has a list of words (`admin`, `login`, `backup`). It asks the server: "Do you have /admin?".
*   **Command:** `gobuster dir -u http://10.10.10.5 -w /usr/share/wordlists/dirb/common.txt`

## 6.3 The Swiss Army Knife: Netcat
Netcat (`nc`) reads and writes data across network connections.

*   **Connect to a port:** `nc [IP] [PORT]`
    *   Example: `nc 10.10.10.5 1337` (Connect to a challenge service).
*   **Listen on a port:** `nc -lvnp [PORT]`
    *   `-l`: Listen mode.
    *   `-v`: Verbose.
    *   `-n`: No DNS lookup (faster).
    *   `-p`: Port number.
    *   Example: `nc -lvnp 4444` (Waiting for a reverse shell to connect back to you).
