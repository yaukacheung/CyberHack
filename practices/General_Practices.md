# General Practice Exercises

Practicing is the only way to get better at CTFs. Here are some exercises and platforms to get you started.

## Online Platforms
These platforms offer legal, safe environments to practice hacking.
1.  **[PicoCTF](https://picoctf.org/):** Best for absolute beginners.
2.  **[TryHackMe](https://tryhackme.com/):** Guided learning paths with virtual machines.
3.  **[HackTheBox](https://www.hackthebox.com/):** More advanced, real-world scenarios.
4.  **[OverTheWire](https://overthewire.org/wargames/):** Wargames like "Bandit" (for Linux skills) and "Natas" (for Web).

## Hands-on Exercises

### Cryptography
1.  **Base64 Decoding:** Decode `Q1RGe3dlbGNvbWVfdG9fY3J5cHRvfQ==`.
2.  **Caesar Cipher:** Decrypt `FYYFHP` (Hint: Shift 5).
3.  **Hash Cracking:** Find the plaintext for MD5 hash `5f4dcc3b5aa765d61d8327deb882cf99` (Hint: it's a common word).

### Web Exploitation
1.  **View Source:** Go to any website, right-click, and "View Page Source". Look for comments `<!-- -->`.
2.  **SQLi:** Set up [DVWA (Damn Vulnerable Web App)](https://github.com/digininja/DVWA) locally and try the SQL Injection module.
3.  **Command Injection:** Try the specific command injection labs on PortSwigger Academy.

### Forensics
1.  **Magic Bytes:** Take a PNG file, open it in a hex editor, change the first byte, and try to open it. Fix it back.
2.  **Exif:** Take a photo with your phone (with GPS on) and use `exiftool` to see your location data.
3.  **Stego:** Use `steghide` to embed a text file into an image.

### Binary Exploitation
1.  **Buffer Overflow:** Follow a tutorial to smash the stack in a simple C program (disable ASLR/NX protection for learning).
