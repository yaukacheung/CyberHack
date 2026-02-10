# CTF Field Manual: General Practice Labs

This manual is designed to transition you from theory to professional-grade exploration. Follow the structure for each category: **Setup** -> **Discovery** -> **Exploitation** -> **Assessment**.

---

## 🔐 01. Cryptography: The Science of Secrets

### Phase A: Discovery (Recon)
1.  **Identify the Format**: Before attacking, use `Cipher Identifier` tools or look for visual patterns.
    *   *Ends in `==`?* Likely Base64.
    *   *Numbers and A-F only?* Likely Hexadecimal.
    *   *Random-looking blocks?* Likely a Block Cipher (AES).

### Phase B: Exploitation (The Lab)
1.  **The Frequency Attack**: 
    *   **Scenario**: You have a long substitution cipher text.
    *   **Task**: Don't guess. Use a frequency analysis tool. In English, 'E', 'T', and 'A' are the most common letters. Match the frequencies to break the code.
2.  **Multi-Stage Decoding (The Onion)**:
    *   **Challenge**: Decode `U0dWc2JHOGdWMm95YkdRPQ==`.
    *   **Step 1**: Base64 Decode -> `SGVsbG8gV2oy bGQ=`.
    *   **Step 2**: Base64 Decode again -> `Hello Wo2ld`.
    *   **Step 3**: Identify the '2' - it's a ROT13 shift of 'r'. Decrypt `Wo2ld` -> `World`.

### Phase C: Think Like a Hacker (Assessment)
*   **Q1**: If you XOR a secret with a key of `0x00`, what happens to the secret?
*   **Q2**: Why is "Double Base64" encoding no more secure than "Single Base64"?

---

## 🌐 02. Web Exploitation: Breaking the Browser

### Phase A: Setup & Tools
*   **Proxy Everything**: Set up **Burp Suite**. Configure your browser to send all traffic through the "Intercepter".

### Phase B: The Bug Hunter's Checklist
1.  **Parameter Fuzzing**:
    *   **Task**: Find hidden parameters. Visit `target.com/view?id=1`. Try changing `id` to `debug=true` or `admin=1`.
2.  **XSS Cookie Theft**:
    *   **Lab**: Find a search bar that echoes your input.
    *   **Payload**: `<script>alert(document.cookie)</script>`. 
    *   **Advanced**: Can you bypass a filter that blocks the word `script`? (Hint: Use `<img>` with `onerror`).

### Phase C: Think Like a Hacker (Assessment)
*   **Q1**: You found a page `/user/profile?id=50`. What is the first thing you test for to find an IDOR vulnerability?
*   **Q2**: If a website uses `HTTPS`, does that protect it from SQL Injection? Why or why not?

---

## 🔍 03. Forensics: Digital Archaeology

### Phase A: The 10-Second Recon
1.  `file important_data`: Determine the true type.
2.  `strings -n 8 important_data | grep -i "flag"`: Check for low-hanging fruit.

### Phase B: Exploitation (The Lab)
1.  **The Hex Repair**:
    *   **Scenario**: A PNG file header is corrupted (e.g., changed to `XX XX XX XX`).
    *   **Task**: Open the file in a Hex Editor. Change the first 8 bytes to `89 50 4E 47 0D 0A 1A 0A`. Save and try to open the image.
2.  **Packet Hunting (Wireshark)**:
    *   **Lab**: Open a PCAP. Filter for `http.request`. 
    *   **Mission**: Find a packet where a user submits a form. Right-click -> Follow TCP Stream. Can you see their password in plain text?

### Phase C: Think Like a Hacker (Assessment)
*   **Q1**: What is the "End of File" marker for a JPEG, and why do tools like `binwalk` look for it?
*   **Q2**: You find an image that looks perfectly normal but `strings` shows a large amount of random data at the end. What technique is likely being used?

---

## ⚙️ 04. RevEng & Pwn: Software Deconstruction

### Phase A: Static Analysis (Ghidra)
1.  **Analyze the Binary**: Look for the `main` or `entry` function.
2.  **Identify Logic Jumps**: Find the code that says "Access Denied" and trace it back to the `if` statement that caused it.

### Phase B: Exploitation (The Lab)
1.  **The Buffer Overflow (Local)**:
    *   **Lab**: A C program uses `gets(buffer)`.
    *   **Mission**: Input enough 'A' characters to cause a "Segmentation Fault". 
    *   **Goal**: Calculate the exact number of bytes needed to reach the Return Address.
2.  **The Logic Flip**: 
    *   **Task**: Use a hex editor to change a `JZ` (Jump if Zero) to a `JNZ` (Jump if Not Zero) to bypass a license check.

### Phase C: Think Like a Hacker (Assessment)
*   **Q1**: Why is the `strcpy()` function in C considered a high-security risk?
*   **Q2**: In a 32-bit system, how many bytes is an address? How does this change in a 64-bit system?

---

## 📡 05. Networking & Recon: Mapping the Matrix

### Phase A: Setup & Tools
*   **The Scanner**: Install `Nmap`. 
*   **The Listener**: Learn `Netcat` (`nc`).

### Phase B: Exploitation (The Lab)
1.  **The Version Probe**:
    *   **Task**: Run `nmap -sV [Target_IP]`. 
    *   **Mission**: Identify the exact version of the web server. Is it vulnerable to any known CVEs?
2.  **The Netcat Reverse Shell**: 
    *   **Lab**: On your machine (Attacker), run `nc -lvnp 4444`. 
    *   **Mission**: On the target (Victim), run a simple bash reverse shell. Can you execute `whoami` from your attacker terminal?

### Phase C: Think Like a Hacker (Assessment)
*   **Q1**: What is the difference between an `Active` scan and a `Passive` discovery?
*   **Q2**: If you find an open port `445`, what service is likely running and what is a common high-impact vulnerability associated with it?

---

## 🏆 Final Challenge: The Combined Mission
**Scenario**: You are given a password-protected ZIP file (`Forensics`). Inside is an encoded text file (`Crypto`). The key to the ZIP is hidden in an IDOR vulnerability on a mock website (`Web`).
**Task**: Map out the steps you would take to solve this multi-stage challenge.
