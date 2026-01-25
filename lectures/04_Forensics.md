# Chapter 4: Forensics

## Core Concepts & Definitions
**Digital Forensics** is the investigation and recovery of material found in digital devices. In CTFs, this usually means extracting a hidden flag from a file (image, audio, memory dump, or network capture).

**Key Terminology:**
*   **Metadata:** Data about data (e.g., GPS location of a photo).
*   **Header (Magic Bytes):** The unique signature at the start of a file identifying its format.
*   **PCAP:** Packet Capture (network traffic recording).
*   **Steganography:** Hiding a secret validly inside another file.

---

## Level 1: Fundamentals
**Goal:** Extract visible text and metadata.

### 1.1 The `strings` Command
Binary files look like garbage in a text editor, but they often contain readable ASCII strings.
*   **Command:** `strings [filename]`
*   **Usage:** Finding hardcoded passwords, URLs, or flags.
*   **Filter:** `strings binary.exe | grep "CTF"`

### 1.2 Metadata Analysis
Every file carries baggage.
*   **ExifTool:** Reads image metadata.
    *   *Look for:* Comments, Camera Model, GPS Coordinates.

### Practice 1.1: The LOUD Whisper
**Scenario:** You are given `image.jpg`.
1.  Run `strings image.jpg`.
2.  Output is 10,000 lines.
3.  Refine: `strings image.jpg | grep "CTF"`.
4.  Found: `CTF{n0th1ng_1s_h1dd3n}`.

**Challenge Question 1:** What command allows you to search for a specific case-insensitive pattern in a text file? (`grep -i`)

---

## Level 2: Intermediate
**Goal:** Analyze file structures and use Steganography tools.

### 2.1 Magic Bytes & Hex Editors
Trust fingerprints, not extensions.
*   **Hex Editor:** Tools like `HxD` or `Okteta` show the raw bytes.
*   **Scenario:** A file named `flag.txt` won't open.
    *   *Check bytes:* `89 50 4E 47...` -> It's a PNG! Rename it to `.png`.

### 2.2 Binwalk
Files can be glued together.
*   **Binwalk:** Scans a file for embedded file signatures.
*   **Command:** `binwalk -e [file]` (Extracts recursively).

### Practice 2.1: The Matryoshka Doll
**Scenario:** A large `cat.jpg`.
1.  Run `binwalk cat.jpg`.
    *   Result: `Zip archive data, at offset 13050`.
2.  Run `binwalk -e cat.jpg`.
3.  Open the extracted folder `_cat.jpg.extracted`.
4.  Find `flag.txt` inside.

**Challenge Question 2:** What is the standard header (Magic Bytes) for a ZIP file? (`PK` or `50 4B`)

---

## Level 3: Advanced
**Goal:** Network analysis and Memory forensics.

### 3.1 Network Forensics (Wireshark)
Analyzing traffic to reconstruct actions.
*   **Follow TCP Stream:** Reassembles the conversation between client and server.
*   **Export Objects:** Extracts files (images, exes) that were downloaded during the capture.

### 3.2 Memory Volatility
Analyzing RAM dumps (`.mem` files) to find running processes, clipboard contents, or cmd history.
*   **Tool:** `volatility`.

### Practice 3.1: The Intercept
**Scenario:** `traffic.pcap`. A user downloaded a secret file.
1.  Open in Wireshark.
2.  Filter: `http.request.method == GET`.
3.  See a request for `secret.pdf`.
4.  Go to `File -> Export Objects -> HTTP`.
5.  Select `secret.pdf` and Save.

**Challenge Question 3:** In Wireshark, what color usually represents TCP retransmissions or bad checksums? (Black/Red)
