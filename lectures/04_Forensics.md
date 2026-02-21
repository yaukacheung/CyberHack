# Chapter 4: Forensics

## Core Concepts & Definitions
**Digital Forensics** is the investigation and recovery of material found in digital devices. In CTFs, this usually means extracting a hidden flag from a file (image, audio, memory dump, or network capture).

**Key Terminology:**
*   **Header (Magic Bytes):** The unique signature at the start of a file identifying its format.
*   **Steganography:** Hiding a secret inside another file without changing its appearance.
*   **LSB (Least Significant Bit):** A steganography technique that modifies the last bit of a pixel's color value to hide data.

---

## Section 1
**Goal:** Extract visible text and identify file types correctly.

### 1.1 The `file` Command (First Step)
Never trust a file extension. A `.txt` might be a `.pdf` in disguise.
*   **Command:** `file [filename]`
*   **Effect:** It looks at the "Magic Bytes" to tell you what the file *actually* is.

### 1.2 Text Extraction
*   **Strings command:** `strings [filename]` extracts ASCII text.
*   **Pro Tip:** Use `strings -n 10` to only show strings at least 10 characters long (reduces noise).

### Practice 1.1: The Identity Crisis
**Scenario:** `mystery_file.jpg` won't open.
1.  Run `file mystery_file.jpg`.
2.  Output: `mystery_file.jpg: POSIX tar archive`.
3.  Rename: `mv mystery_file.jpg mystery_file.tar`.
4.  Extract: `tar -xvf mystery_file.tar`.

**Challenge Question 1:** If `strings` doesn't find the flag, what other encoding should you check for inside the binary? (Hint: Base64).

---

## Section 2
**Goal:** Analyze file structures and use Steganography tools.

### 2.1 Binwalk & Foremost
*   **Binwalk:** The standard tool for finding embedded files. `binwalk -e [file]` extracts everything it finds.
*   **Foremost:** An alternative to Binwalk that "carves" files based on headers and footers.

### 2.2 LSB Steganography
Images are made of pixels. Each pixel has RGB values (e.g., 255, 255, 255). Changing a value by 1 (e.g., to 254) is invisible to the human eye but can be used to store bits of a flag.
*   **Tool:** `StegSolve` or `zsteg` (for PNG).

### Practice 2.1: The Hidden Archive
**Scenario:** A `photo.png`.
1.  Run `zsteg photo.png`.
2.  Found: `b1,rgb,lsb,xy .. text: "CTF{lsb_is_sneaky}"`.

**Challenge Question 2:** What is "Data Carving" in forensics?

---

## Section 3
**Goal:** Network analysis and Memory forensics.

### 3.1 Network Forensics (Wireshark)
**Essential Filters:**
*   `http`: Only show web traffic.
*   `ip.addr == 10.0.0.5`: Only show traffic to/from this IP.
*   `tcp.port == 4444`: Look for shells.
*   `frame contains "CTF"`: Search the entire packet dump for a string.

### 3.2 Memory Volatility
**Tool:** `volatility2` or `volatility3`.
1.  **Identify Image Info:** `volatility -f mem.raw imageinfo` (finds the OS version).
2.  **List Processes:** `volatility -f mem.raw --profile=... pslist`.
3.  **Command History:** `volatility -f mem.raw --profile=... cmdline`.

### Practice 3.1: Reconstructing a File
**Scenario:** `dump.pcap`. A user uploaded a secret.
1.  Open in Wireshark.
2.  Filter: `http` and look for `POST` requests.
3.  Right-click the packet -> "Follow TCP Stream."
4.  Select "Raw" data and save the portion that looks like a file header.

**Challenge Question 3:** What is the difference between an "Active" and "Passive" network capture?

---

## Academic Connection & Competition
- **Textbook Correlation**: This chapter corresponds to **Chapter 4** and **Chapter 10 (Operations)** of the [Consolidated Textbook](file:///Users/yoga/Documents/WorkDesk/CyberHack/Cyber_Security_Textbook.pdf).
- **Practical Application**: Network forensics is key to identifying the "Invisible Attacker" in the [IoT Project](file:///Users/yoga/Documents/WorkDesk/CyberHack/projects/IoT_Red_Blue/docs/Part_E_Guide.md).
- **Competition Note**: Use Wireshark filters learned here to identify the Red Team's IP address and score 10 points.

