# Cyber Hacking Competition Exam Bank

## Rules
*   Total Questions: 60
*   Format: Multiple Choice (MCQ) & Short Answer
*   Passing Score: 70%

---

## Chapter 1: Introduction & Ethics

**Q1.1:** What does "CTF" stand for?
A. Capture The Flag
B. Control The Firewall
C. Crack The File
D. Cyber Task Force

**Q1.2:** Which law in the US governs unauthorized computer access?
A. HIPAA
B. CFAA (Computer Fraud and Abuse Act)
C. GDPR
D. SOX

**Q1.3:** You find a vulnerability in a company's website. What is the ethical action?
A. Tweet about it immediately.
B. Exploit it to prove it exists, then email them.
C. Follow Responsible Disclosure (report securely).
D. Ignore it.

**Q1.4:** Which command lists all files, including hidden ones?
A. `ls`
B. `ls -a` or `ls -la`
C. `cat -all`
D. `dir /hidden`

**Q1.5:** What is the purpose of a Hypervisor?
A. To speed up the internet.
B. To crack passwords.
C. To run Virtual Machines (VMs).
D. To encrypt files.

**(Short Answer) Q1.6:** Define "Root" in the context of Linux.
**(Short Answer) Q1.7:** What is the difference between a White Hat and a Black Hat hacker?
**(Short Answer) Q1.8:** What command would you use to change your current directory to `/home/user`?
**(Short Answer) Q1.9:** True or False: It is legal to hack your friend's WiFi if they give you verbal permission.
**(Short Answer) Q1.10:** What does `pwd` output?

---

## Chapter 2: Cryptography

**Q2.1:** Which of the following is an Encoding, NOT Encryption?
A. AES
B. RSA
C. Base64
D. DES

**Q2.2:** What is the result of `1 XOR 1`?
A. 1
B. 0
C. 2
D. NULL

**Q2.3:** In RSA, which key is kept secret?
A. The Public Key ($e, N$)
B. The Private Key ($d$)
C. The Modulus ($N$)
D. The Ciphertext

**Q2.4:** Why is MD5 considered insecure?
A. It is too slow.
B. It requires a large key.
C. It is vulnerable to Hash Collisions.
D. It is reversible.

**Q2.5:** A Caesar Cipher with a shift of 13 is also known as:
A. ROT13
B. AES-128
C. Vigenère
D. Atbash

**(Short Answer) Q2.6:** Explain the difference between Symmetric and Asymmetric encryption.
**(Short Answer) Q2.7:** Decode this Hex string: `41 42 43` (Hint: ASCII).
**(Short Answer) Q2.8:** If you encrypt "HELLO" with a One-Time Pad, can it be cracked without the key?
**(Short Answer) Q2.9:** What is the purpose of "Salt" in password hashing?
**(Short Answer) Q2.10:** Calculate `5 XOR 3` (binary `101` XOR `011`).

---

## Chapter 3: Web Exploitation

**Q3.1:** What does SQL Injection (SQLi) target?
A. The web server's OS.
B. The database.
C. The user's browser.
D. The network router.

**Q3.2:** Which vulnerability allows an attacker to execute scripts in a victim's browser?
A. SQL Injection
B. CSRF
C. XSS (Cross-Site Scripting)
D. RCE

**Q3.3:** What HTTP method is used to submit a login form (usually)?
A. GET
B. POST
C. HEAD
D. OPTION

**Q3.4:** In a URL `site.com?id=1`, what is `id`?
A. The Protocol
B. The Domain
C. A Parameter
D. A Cookie

**Q3.5:** What tool is best for intercepting HTTP requests?
A. Wireshark
B. Nmap
C. Burp Suite
D. Metasploit

**(Short Answer) Q3.6:** Write a payload to test for SQL Injection.
**(Short Answer) Q3.7:** What acts as the state-keeper in HTTP (since HTTP is stateless)?
**(Short Answer) Q3.8:** Explain "Blind SQL Injection".
**(Short Answer) Q3.9:** What does `1=1` achieve in a SQLi payload?
**(Short Answer) Q3.10:** How do you view the HTML source code of a page?

---

## Chapter 4: Forensics

**Q4.1:** What are "Magic Bytes"?
A. A spell in D&D.
B. The file signature at the beginning of a file.
C. The last bytes of a file.
D. Random data for encryption.

**Q4.2:** Which tool is used to read metadata from images?
A. Strings
B. Grep
C. ExifTool
D. Nmap

**Q4.3:** You want to find readable text in a binary file. Command?
A. `cat`
B. `strings`
C. `text`
D. `read`

**Q4.4:** What format is a network capture usually saved in?
A. .txt
B. .pcap
C. .exe
D. .png

**Q4.5:** Hiding data inside an image is called:
A. Cryptography
B. Steganography
C. Forensics
D. Hashing

**(Short Answer) Q4.6:** Start of a file is `89 50 4E 47`. What file type is it?
**(Short Answer) Q4.7:** What is Binwalk used for?
**(Short Answer) Q4.8:** Name one layer of the OSI model.
**(Short Answer) Q4.9:** In Wireshark, how do you see the full content of a TCP session?
**(Short Answer) Q4.10:** Does deleting a file permanently erase the data from the hard drive immediately?

---

## Chapter 5: Reverse Engineering

**Q5.1:** What does a Decompiler do?
A. Turns Source Code into Binary.
B. Turns Binary into Source Code (or pseudocode).
C. Runs the program.
D. Deletes the program.

**Q5.2:** Which CPU register points to the *Next Instruction*?
A. EAX
B. ESP
C. EIP (or RIP)
D. EBP

**Q5.3:** A Buffer Overflow occurs when:
A. The program runs out of RAM.
B. Data exceeds the allocated space and overwrites adjacent memory.
C. The hard drive is full.
D. The CPU overheats.

**Q5.4:** What does the `NOP` instruction do?
A. Stops the program.
B. Jumps to a function.
C. Nothing (No Operation).
D. Resets the CPU.

**Q5.5:** Which tool is a debugger?
A. Ghidra
B. GCC
C. GDB
D. Nmap

**(Short Answer) Q5.6:** What is the "Stack"?
**(Short Answer) Q5.7:** Convert the hex `0x41` to ASCII.
**(Short Answer) Q5.8:** Why is `strcmp` dangerous in a password check?
**(Short Answer) Q5.9:** What is "Shellcode"?
**(Short Answer) Q5.10:** Explain "Patching a binary".

---

## Chapter 6: Networking

**Q6.1:** Which Nmap flag performs a "Stealth" (SYN) scan?
A. `-sT`
B. `-sS`
C. `-sU`
D. `-sV`

**Q6.2:** Port 22 is typically used for:
A. HTTP
B. FTP
C. SSH
D. DNS

**Q6.3:** What makes a "Reverse Shell" different from a Bind Shell?
A. It is encrypted.
B. The victim connects back to the attacker.
C. It uses UDP instead of TCP.
D. It is slower.

**Q6.4:** `192.168.1.0/24` contains how many usable IPs?
A. 10
B. 100
C. 254
D. 65535

**Q6.5:** Which tool acts as the "Swiss Army Knife" of networking?
A. Netcat (`nc`)
B. Wireshark
C. Ping
D. Dig

**(Short Answer) Q6.6:** What are the 3 steps of the TCP Handshake?
**(Short Answer) Q6.7:** What information does `whois` provide?
**(Short Answer) Q6.8:** Define "OSINT".
**(Short Answer) Q6.9:** Why might you scan all 65,535 ports?
**(Short Answer) Q6.10:** Write the command to listen on port 4444 with Netcat.

---

## Chapter 7-11: Advanced Basics & Operations

**Q7.1:** Which of these is a part of the "Dark Web"?
A. Google
B. Tor Network
C. Wikipedia
D. Instagram

**Q8.1:** Which OSI layer is responsible for IP Addressing?
A. Layer 2 (Data Link)
B. Layer 3 (Network)
C. Layer 4 (Transport)
D. Layer 7 (Application)

**Q9.1:** What is the main differentiator of NoSQL Injection?
A. It targets Oracle databases only.
B. It uses logical objects/operators instead of plain strings.
C. It only works on Windows.
D. It is impossible to prevent.

**Q10.1:** In the PICERL methodology, what does "Containment" mean?
A. Deleting all files.
B. Stopping the threat from spreading further.
C. Paying the ransom.
D. Writing a blog post about the hack.

**(Short Answer) Q11.1:** Name one characteristic of a "Next-Generation Firewall" (NGFW).
**(Short Answer) Q11.2:** What is the primary function of a SIEM?

---

## Answer Key

**Chapter 1**
1. A, 2. B, 3. C, 4. B, 5. C
6. The superuser/administrator.
7. White Hat = Authorized/Ethical; Black Hat = Unauthorized/Malicious.
8. `cd /home/user`
9. No (Verbal is hard to prove; US law requires explicit authorization, often written).
10. Print Working Directory.

**Chapter 2**
1. C, 2. B, 3. B, 4. C, 5. A
6. Symmetric = Same key; Asymmetric = Public/Private keys.
7. "ABC"
8. No (Mathematically unbreakable if key is random).
9. To prevent Rainbow Table attacks (makes identical passwords have different hashes).
10. `110` (6).

**Chapter 3**
1. B, 2. C, 3. B, 4. C, 5. C
6. `' OR 1=1 --`
7. Cookies.
8. SQLi where the DB doesn't return data, only True/False logic.
9. It creates a "True" condition to bypass checks.
10. Right-click -> View Page Source.

**Chapter 4**
1. B, 2. C, 3. B, 4. B, 5. B
6. PNG Image.
7. Extracting files embedded within other files (firmware/images).
8. Physical, Data Link, Network, Transport, Session, Presentation, Application.
9. Right-click packet -> Follow -> TCP Stream.
10. No, it only marks space as available.

**Chapter 5**
1. B, 2. C, 3. B, 4. C, 5. C
6. Memory region for local variables and function control flow.
7. "A"
8. It exposes the password logic; timing attacks possible.
9. Machine code used as payload to execute a shell.
10. Modifying the binary code (hex) to change behavior without source code.

**Chapter 6**
1. B, 2. C, 3. B, 4. C, 5. A
6. SYN, SYN-ACK, ACK.
7. Domain registration/ownership info.
8. Open Source Intelligence (gathering public info).
9. To find services running on non-standard ports.
10. `nc -lvnp 4444`

**Chapters 7-11**
1. B, 8.1 B, 9.1 B, 10.1 B
11.1 Deep Packet Inspection (Layer 7).
11.2 Real-time analysis of security alerts/log correlation.
