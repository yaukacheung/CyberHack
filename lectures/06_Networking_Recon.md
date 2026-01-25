# Chapter 6: Networking & Reconnaissance

Understanding networks is crucial for finding targets and vulnerabilities.

## Ports and Protocols
*   **TCP vs UDP:** Reliable connection vs. connectionless communication.
*   **Common Ports:**
    *   21: FTP
    *   22: SSH
    *   23: Telnet
    *   53: DNS
    *   80: HTTP / 443: HTTPS
    *   445: SMB (Windows File Sharing)

## Reconnaissance (Recon)
Gathering information about a target.

### Passive Recon
Gathering info without directly interacting with the target system.
*   **Whois:** Domain registration info.
*   **OSINT (Open Source Intelligence):** Searching Google, social media, GitHub.
*   **Shodan:** Search engine for connected devices.

### Active Recon
Directly probing the target.
*   **Nmap (Network Mapper):** The standard for network scanning.
    *   `nmap -sC -sV [IP]`: Scan with default scripts and version detection.
    *   `nmap -p- [IP]`: Scan all 65535 ports.
*   **Directory Busting:** Finding hidden directories on web servers.
    *   Tools: `gobuster`, `dirb`, `ffuf`.
    *   Example: `gobuster dir -u http://target.com -w common-wordlist.txt`

## Traffic Analysis
Understanding flow of data.
*   **Wireshark / tcpdump:** As mentioned in Forensics, critical for seeing what's happening on the wire.
