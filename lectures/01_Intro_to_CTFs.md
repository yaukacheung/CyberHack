# Chapter 1: Introduction to CTFs & Ethics

## Core Concepts & Definitions
**Capture The Flag (CTF)** competitions are cybersecurity exercises where participants solve challenges to find a "flag" (a secret string). They mimic real-world security scenarios in a safe, gamified environment.

### CTF Formats
1.  **Jeopardy:** Challenges are categorized (Web, Crypto, Pwn, etc.) with increasing point values. Solved independently.
2.  **Attack-Defense:** Each team has a server to defend while attacking others. Focuses on patching and real-time response.

**Key Terminology:**
*   **Flag:** The target string (e.g., `CTF{w3lc0m3_h4ck3r}`).
*   **Shell:** A command-line interface to interact with an OS.
*   **Root/Admin:** The superuser account with full system privileges.
*   **Exploit:** Code or technique that takes advantage of a vulnerability.

---

## Level 1: Fundamentals
**Goal:** Understand the environment and navigate the command line.

### 1.1 The Command Line Interface (CLI)
Hacking is rarely done with a mouse. You must master the keyboard.

**Essential Navigation:**
*   `pwd` (Print Working Directory): "Where am I?"
*   `ls -la`: "What files are here?" (Includes hidden files starting with `.`).
*   `cd ..`: Go up one directory.
*   `cat [file]`: Display file content.

**Powerful CLI Concepts:**
*   **Redirection (`>`, `>>`):** 
    *   `echo "hello" > file.txt` (Overwrite/Create).
    *   `echo "world" >> file.txt` (Append).
*   **Piping (`|`):** Send the output of one command as input to another.
    *   `cat access.log | grep "admin"` (Search for 'admin' inside the log).

### 1.2 Ethics: The Golden Rules
1.  **Ownership:** Do not hack what you do not own.
2.  **Permission:** Written consent is mandatory for testing others' systems.
3.  **Privacy:** Respect the data you encounter.

### Practice 1.1: The Hidden File
**Scenario:** You have a folder `challenge`.
1.  Open your terminal.
2.  Navigate to the folder: `cd challenge`
3.  List hidden: `ls -la` -> You see `.flag.txt`.
4.  Read it: `cat .flag.txt`.

**Challenge Question 1:** How would you save the list of all files in a directory to a file named `inventory.txt`?

---

## Level 2: Intermediate
**Goal:** Set up a hacking lab and connect to remote systems.

### 2.1 Virtualization
Never hack from your host OS. Use a **Virtual Machine (VM)** like Kali Linux. 
*   **Snapshotting:** Save the state of your VM before doing something dangerous. If you break it, just revert to the snapshot.

### 2.2 Remote Access (SSH)
**Secure Shell (SSH)** is the standard for encrypted remote login.
*   **Syntax:** `ssh user@ip_address`
*   **Pro Tip (Troubleshooting):**
    *   If you get a "Host Key Verification Failed" error, it means the server's fingerprint changed. Use `ssh-keygen -R [IP]` to clear the old key.
    *   Use `-v` for verbose output to debug connection issues.

### Practice 2.1: The Remote Login
**Scenario:** Login to `192.168.1.50` as user `ctf`.
1.  Command: `ssh ctf@192.168.1.50`
2.  Verify identity: Run `whoami` and `hostname`.

**Challenge Question 2:** What flag in SSH allows you to specify a different port (e.g., port 2222)?

---

## Level 3: Advanced
**Goal:** Automate tasks and understand the legal nuances.

### 3.1 Scripting Basics
*   **Variables in Bash:** `NAME="Hacker"; echo $NAME`
*   **Conditionals:**
    ```bash
    if [ -f "flag.txt" ]; then
      echo "Flag found!"
    fi
    ```

### 3.2 Advanced Ethics: Disclosure
**Bug Bounty Programs:** Platforms like HackerOne or Bugcrowd provide a legal framework for reporting vulnerabilities in exchange for rewards. Always stick to the **Scope** defined in the program.

### Practice 3.1: The Port Sweeper
**Task:** Check if machines `.1` to `.5` respond to ping.
*   **Solution:** `for i in {1..5}; do ping -c 1 192.168.1.$i | grep "64 bytes"; done`

**Challenge Question 3:** How do you make a bash script executable? (Hint: `chmod`)

