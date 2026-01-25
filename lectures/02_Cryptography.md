# Chapter 2: Cryptography

## 2.1 Introduction to Cryptography
Cryptography is the backbone of secure communication. In CTFs, you face "broken" crypto—weak logic, leaked keys, or implementation errors.

### Encoding vs. Encryption vs. Hashing
Understanding the difference is critical.

| Type | Reversible? | Key Required? | Purpose | Example |
| :--- | :--- | :--- | :--- | :--- |
| **Encoding** | Yes | No | Usability / Formatting | Base64, Hex, ASCII |
| **Encryption** | Yes | Yes | Confidentiality | AES, RSA |
| **Hashing** | No | No | Integrity | SHA-256, MD5 |

## 2.2 Classical Ciphers
These are historical ciphers. They are insecure but frequent in beginner CTFs.

### Caesar Cipher (Shift Cipher)
*   **Concept:** Shift every letter by $N$ positions.
*   **Weakness:** Only 25 possible keys (in English). Trivial to brute-force.
*   **Math:** $C = (P + K) \pmod{26}$

### Vigenère Cipher
*   **Concept:** Polyalphabetic substitution using a keyword.
*   **Weakness:** Vulnerable to frequency analysis if the text is long enough. 
*   **Tool:** Use [dcode.fr](https://www.dcode.fr/vigenere-cipher) or Kasiski test.

## 2.3 Modern Symmetric Cryptography
The same key is used for encryption and decryption.

### XOR (Exclusive OR)
The most important operator in CTF crypto.
*   **Truth Table:**
    *   0 XOR 0 = 0
    *   0 XOR 1 = 1
    *   1 XOR 0 = 1
    *   1 XOR 1 = 0
*   **Property:** $A \oplus B = C$ and $C \oplus B = A$. It is its own inverse.
*   **One-Time Pad (OTP):** If the key is random and as long as the message, it is mathematically unbreakable.

### AES (Advanced Encryption Standard)
*   **Block Cipher:** Encrypts data in fixed-size blocks (128 bits).
*   **Modes of Operation:**
    *   **ECB (Electronic Codebook):** Weak. Same plaintext block always equals same ciphertext block. Patterns remain visible (e.g., the Tux penguin image).
    *   **CBC (Cipher Block Chaining):** Secure. Uses an IV (Initialization Vector) to randomize the first block.

## 2.4 Modern Asymmetric Cryptography
Uses a Public Key (encrypt) and Private Key (decrypt).

### RSA (Rivest–Shamir–Adleman)
Security relies on the difficulty of factoring large semiprime numbers.
*   **Variables:**
    *   $p, q$: Large prime numbers.
    *   $N = p \times q$: The modulus (Public).
    *   $e$: Public exponent (usually 65537).
    *   $d$: Private exponent (Secret).
*   **Attacks:**
    *   **Small N:** Factorize $N$ using online databases (factordb.com).
    *   **Small e:** If $e=3$, susceptible to cube root attacks.

## 2.5 Practical Guide: Breaking Codes

### Step-by-Step: Multi-Layer Decoding with CyberChef
Often, flags are encoded multiple times (e.g., Base64 -> Hex -> Rot13).

1.  **Open CyberChef:** [https://gchq.github.io/CyberChef/](https://gchq.github.io/CyberChef/)
2.  **Input:** Paste the "gibberish" string into the Input box.
3.  **Recipes:** Dragon-and-drop "Magic" block into the Recipe area.
4.  **Analyze:** If "Magic" fails, look at the format.
    *   Ends in `=`? Try "From Base64".
    *   Only 0-9, A-F? Try "From Hex".
    *   Readable but scrambled? Try "ROT13".

### Step-by-Step: Cracking Hash Passwords
You found a hash in a database dump: `5f4dcc3b5aa765d61d8327deb882cf99`.

1.  **Identify:** Use `hash-identifier` in Kali or an online tool. Result: MD5.
2.  **Wordlist:** Locate `rockyou.txt` in Kali (`/usr/share/wordlists/rockyou.txt.gz`). Unzip it.
3.  **Hashcat:**
    *   Command: `hashcat -m 0 -a 0 hash.txt rockyou.txt`
    *   `-m 0`: Mode 0 (MD5).
    *   `-a 0`: Attack mode 0 (Wordlist).
4.  **Result:** The tool will output the plaintext password.

<!-- Placeholder: [Image: sym_vs_asym_enc.png] - Diagram showing shared key vs public/private key flows -->
<!-- Placeholder: [Image: hashing_visual.png] - Visualizing how different inputs produce fixed-length hashes -->
