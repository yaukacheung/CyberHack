# Chapter 1: Introduction to CTFs & Ethics

## 1.1 What are CTFs?
Capture The Flag (CTF) competitions are gamified cybersecurity exercises where participants—either individually or in teams—are challenged to solve security puzzles. The goal is to find a hidden string of text, known as a "flag," which is usually in the format `CTF{s0m3_l33t_str1ng}`.

### Types of CTFs
There are several formats of CTFs, each testing different skill sets.

![CTF Types Comparison](images/ctf_types_dgm.png)

1.  **Jeopardy-Style:**
    *   **Format:** Similar to the TV show Jeopardy! Board of challenges categorized by topic (Web, Crypto, Pwn, Forensics) and difficulty.
    *   **Scoring:** Points are awarded for each solved challenge. Harder challenges yield more points.
    *   **Best For:** Beginners and learning specific skills. This is the most common format.

2.  **Attack-Defense:**
    *   **Format:** Each team is given a vulnerable server to defend. They must patch their own vulnerabilities while exploiting the same vulnerabilities on other teams' servers.
    *   **Scoring:** Points are gained for capturing flags from opponents (Attack) and maintaining service uptime (Defense/SLA).
    *   **Skills:** Requires rapid patch analysis, network monitoring, and exploit automation.

3.  **King of the Hill (KotH):**
    *   **Format:** Players compete to gain control of a machine and maintain access for the longest time.

## 1.2 Ethics and Legal Frameworks
Hacking skills are like superpowers—they can be used for good or evil. Understanding the boundary is critical.

### The "Hat" Terminology
*   **White Hat:** Ethical hackers who secure systems. They have permission to test and report vulnerabilities.
*   **Black Hat:** Malicious hackers who break into systems for personal gain, destruction, or fame. **Illegal.**
*   **Gray Hat:** Operates in a moral gray area, often finding vulnerabilities without permission but reporting them instead of exploiting them. **Still risky and often illegal.**

### Rules of Engagement (RoE)
Before touching any system, you must know the RoE.
1.  **Authorized Access Only:** Never target a system you don't own or have explicit written permission to test.
2.  **Scope:** Know clearly what is in-scope (allowed) and out-of-scope (forbidden). E.g., attacking the application is okay, but DDoS-ing the server is usually banned.
3.  **Responsible Disclosure:** If you find a bug in the wild, report it securely to the vendor (e.g., via Bugcrowd, HackerOne, or security.txt).

## 1.3 Setting Up Your Lab
You need a safe environment to practice attacking without risking your personal computer.

### Step-by-Step: Installing Kali Linux on VirtualBox

**Step 1: Download the Hypervisor**
*   Download and install **VirtualBox** (free) or **VMware Workstation Player**.
*   This software allows you to run a "computer inside a computer."

**Step 2: Download the Guest OS**
*   Go to [kali.org/get-kali](https://www.kali.org/get-kali/) and download the "Virtual Machines" pre-built image for VirtualBox.
*   *Why Kali?* It comes pre-installed with hundreds of hacking tools (Metasploit, Burp Suite, unrar, etc.).

**Step 3: Import the Appliance**
1.  Open VirtualBox.
2.  File -> Import Appliance.
3.  Select the downloaded `.ova` file.
4.  Click "Import".

**Step 4: Network Configuration (Crucial!)**
*   **NAT Network:** Your VM can access the internet, but the internet can't access your VM. Safe default.
*   **Bridged Adapter:** Your VM appears as a separate device on your local Wi-Fi. Useful for Attack-Defense but riskier on public networks.

**Step 5: Snapshots**
*   Before doing anything risky (or breaking your config), take a **Snapshot**. This saves the current state of the VM so you can revert to it instantly if everything breaks.

### Basic Linux Skills
The terminal is your home.
*   `ls -la`: List all files, including hidden ones.
*   `cd /path/to/dir`: Change directory.
*   `pwd`: Print working directory.
*   `sudo command`: Run as root (administrator).
*   `man command`: Read the manual for a command (e.g., `man grep`).
