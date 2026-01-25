# Chapter 4: Forensics

Forensics challenges involve analyzing files and capturing data to find hidden information.

## File Formats and Headers
Every file type has a specific structure.
*   **Magic Bytes:** The first few bytes of a file that identify its format.
    *   `89 50 4E 47`: PNG image.
    *   `FF D8`: JPEG image.
    *   `25 50 44 46`: PDF document.
*   **File Extension:** Can be misleading. Always trust magic bytes over extensions.
*   **Tool:** `file [filename]` command in Linux identifies the file type.

## Steganography (Stego)
Hiding data within other data (e.g., text inside an image).
*   **LSB (Least Significant Bit):** Hiding data in the smallest bits of image pixels.
*   **Exif Data:** Metadata stored in images (camera model, GPS, etc.).
    *   Tool: `exiftools [image]`
*   **Hidden Strings:** Search for readable text in binary files.
    *   Tool: `strings [filename]`

## Network Forensics
Analyzing network traffic captures (PCAP files).
*   **Wireshark:** The standard tool for analyzing packet captures.
    *   Filter traffic (e.g., `http`, `tcp.port == 80`).
    *   Follow TCP streams to see full conversations.
    *   Export objects (extract files transferred over the network).

## Memory Forensics
Analyzing RAM dumps to find processes, passwords, or keys.
*   **Volatility:** Advanced memory forensics framework.
