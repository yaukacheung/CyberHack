# Chapter 1: Introduction to CTFs & Ethics

## Core Concepts & Definitions
**Capture The Flag (CTF)** competitions are cybersecurity exercises where participants solve challenges to find a "flag" (a secret string). They mimic real-world security scenarios in a safe, gamified environment.

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

**Essential Commands:**
*   `pwd` (Print Working Directory): "Where am I?"
*   `ls` (List): "What files are here?"
    *   `ls -la`: Show hidden files (starting with `.`) and details.
*   `cd` (Change Directory): "Go somewhere else."
    *   `cd ..`: Go up one folder.
    *   `cat [file]`: "Read this file."

### 1.2 Ethics: The Golden Rules
1.  **Ownership:** Do not hack what you do not own.
2.  **Permission:** Written consent is mandatory for testing others' systems.
3.  **Privacy:** Respect the data you encounter.

### Practice 1.1: The Hidden File
**Scenario:** You have a folder `challenge`.
1.  Open your terminal.
2.  Navigate to the folder: `cd challenge`
3.  List files: `ls` -> Nothing visible?
4.  List hidden: `ls -la` -> You see `.flag.txt`.
5.  Read it: `cat .flag.txt`.

**Challenge Question 1:** What command would you use to read the first 10 lines of a very long file named `access.log`? (Hint: search for the `head` command).

---

## Level 2: Intermediate
**Goal:** Set up a hacking lab and connect to remote systems.

### 2.1 Virtualization
Never hack from your host OS (Windows/Mac). Use a **Virtual Machine (VM)** like Kali Linux. It isolates dangerous code and keeps your personal data safe.
*   **Hypervisor:** The software running the VM (VirtualBox, VMware).
*   **Guest OS:** The virtualized system (Kali).

### 2.2 Remote Access (SSH)
**Secure Shell (SSH)** is the standard for encrypted remote login.
*   **Syntax:** `ssh user@ip_address -p port`
*   **Example:** `ssh student@10.10.10.5 -p 22`
*   **Key-based Auth:** More secure than passwords. Uses a private key file (`id_rsa`) to authenticate.

### Practice 2.1: The Remote Login
**Scenario:** You are given credentials: IP `192.168.1.50`, User `ctf`, Pass `toor`.
1.  Command: `ssh ctf@192.168.1.50`
2.  Enter password: `toor` (It won't show on screen!).
3.  Once logged in, run `whoami` to verify identity.

**Challenge Question 2:** You are trying to SSH into a server but get a "Connection Refused" error. What are two possible reasons?

---

## Level 3: Advanced
**Goal:** Automate tasks and understand the legal nuances.

### 3.1 Scripting Basics
A hacker who can't script is limited by their tools.
*   **Bash Scripting:** Automating shell commands.
    *   Loop: `for i in {1..10}; do echo $i; done`
*   **Python:** The hacker's Swiss Army Knife.
    *   Libraries like `requests` (Web) and `pwntools` (Binary) are essential.

### 3.2 Advanced Ethics: Disclosure
**Responsible Disclosure:**
*   You find a Critical SQL Injection in a bank's website.
*   **Do:** Find their "Bug Bounty" program or `security.txt` file. Report details encrypted.
*   **Don't:** Tweet about it. Dump the database. Demand money (Extortion).

### Practice 3.1: The Port Sweeper
**Scenario:** You need to check if 5 servers are alive.
**Task:** Write a one-line bash script to ping IPs `192.168.1.1` to `192.168.1.5`.
*   **Solution:** `for i in {1..5}; do ping -c 1 192.168.1.$i; done`

**Challenge Question 3:** Write a Python one-liner to print "Hack the Planet" 100 times.
