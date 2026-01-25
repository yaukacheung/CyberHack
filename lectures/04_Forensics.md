# Chapter 4: Forensics

## 4.1 Digital Anatomy
Forensics is about finding the truth hidden in data. It requires understanding how data is structured on disk and in transit.

### File Signatures (Magic Bytes)
Operating systems rely on extensions (`.jpg`), but tools rely on headers.
*   **PNG:** `89 50 4E 47 0D 0A 1A 0A`
*   **JPEG:** `FF D8 FF E0`
*   **ZIP:** `50 4B 03 04` (PK..)
*   **PDF:** `25 50 44 46` (%PDF)

<!-- Placeholder: [Image: file_header_visual.png] - Hex editor view highlighting magic bytes -->

### Corrupted Headers
A common CTF trick is to corrupt the magic bytes so the file doesn't open.
*   **Fix:** Open in a Hex Editor (e.g., `hexeditor` or `HxD`) and restore the correct bytes.

## 4.2 Network Forensics (Packet Analysis)
Analyzing captured network traffic (`.pcap` files).

### The OSI Model
Understanding layers helps you find flags.
1.  **Physical** (Cables)
2.  **Data Link** (MAC addresses)
3.  **Network** (IP addresses)
4.  **Transport** (TCP/UDP ports)
5.  **Session**
6.  **Presentation** (Encryption/Encoding)
7.  **Application** (HTTP, FTP, SMTP) -> **Focus Here!**

<!-- Placeholder: [Image: osi_model_layers.png] - The 7 layers of the OSI model with relevant CTF protocols -->

### Step-by-Step: Analyzing Traffic with Wireshark
**Scenario:** You have a `capture.pcap` file.

1.  **Open:** `wireshark capture.pcap`
2.  **Protocol Hierarchy:** Go to `Statistics -> Protocol Hierarchy`. This gives a bird's-eye view. Is there HTTP? FTP?
3.  **Follow Streams:** Right-click a packet -> `Follow -> TCP Stream`. This reconstructs the full conversation. Look for:
    *   Login credentials (plaintext).
    *   File transfers.
4.  **Export Objects:** Go to `File -> Export Objects -> HTTP`. This automatically extracts images, scripts, or zips downloaded during the capture.

## 4.3 Steganography
The art of hiding secrets in plain sight.

### LSB (Least Significant Bit)
Images are made of pixels (RGB). Each color channel is 8 bits (0-255).
*   Changing the last bit (0000000**1** vs 0000000**0**) changes the color imperceptibly.
*   Attackers hide binary data in these LSBs.
*   **Tool:** `zsteg` (for PNG/BMP) instantly reveals LSB data.

### Step-by-Step: Extracting Hidden Files with Binwalk
**Scenario:** You have an image `challenge.jpg` that is unusually large.

1.  **Analyze:** Run `binwalk challenge.jpg`.
    *   Output: `DECIMAL: 0, DESCRIPTION: JPEG image...`
    *   Output: `DECIMAL: 45023, DESCRIPTION: Zip archive data...`
2.  **Extract:** Run `binwalk -e challenge.jpg`.
3.  **Result:** It creates a `_challenge.jpg.extracted` folder containing the hidden zip file.
