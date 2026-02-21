# Chapter 2: Cryptography

## Core Concepts & Definitions
**Cryptography** is the science of secure communication. In CTFs, you are often the *cryptanalyst*, trying to break the code.

**Key Terminology:**
*   **Plaintext:** The original message.
*   **Ciphertext:** The scrambled message.
*   **Encoding:** Changing data format (e.g., Base64). No key needed. **Encoding is NOT encryption.**
*   **Hashing:** A one-way "fingerprint" of data.

---

## Section 1
**Goal:** Recognize and break historical ciphers.

### 1.1 Symmetric vs Asymmetric
*   **Symmetric:** One key to rule them all. The same key is used for both encryption and decryption (e.g., AES, Caesar).
*   **Asymmetric:** The Power of Pairs. Uses a Public key (to encrypt) and a Private key (to decrypt). (e.g., RSA).

### 1.2 Historical Ciphers
*   **Caesar Cipher:** Shifts every letter by $N$.
*   **ROT13:** A specific Caesar shift of 13. Applying ROT13 twice returns the original text.
*   **Atbash:** A simple substitution cipher that reverses the alphabet (A becomes Z, B becomes Y).

### 1.3 Tools of the Trade
*   **CyberChef:** The "Cyber Swiss Army Knife." Use it to chain encoding/decoding operations (e.g., "From Base64" -> "To Hex" -> "XOR").

### Practice 1.1: The Base64 Trap
**Scenario:** You find `SGVsbG8gV29ybGQ=`.
1.  Open **CyberChef**.
2.  Input the string.
3.  Drag "From Base64" into the recipe.
4.  Result: `Hello World`.

**Challenge Question 1:** What is the most obvious visual indicator that a string might be Base64 encoded?

---

## Section 2
**Goal:** Master the XOR operator and modern symmetric standards.

### 2.1 The Magic of XOR ($\oplus$)
*   **Property:** `A ^ B = C` and `C ^ B = A`. This makes XOR its own inverse.
*   **CTF Tip:** If you have the original file (plaintext) and the encrypted version, XORing them together reveals the **Key**.

### 2.2 Modern Symmetric: AES
**Advanced Encryption Standard (AES)**.
*   **Modes:** 
    *   **ECB (Electronic Codebook):** Weak. Each block is encrypted independently. Identical blocks produce identical ciphertext (reveals patterns).
    *   **CBC (Cipher Block Chaining):** Stronger. Each block is XORed with the previous ciphertext block before encryption.

### Practice 2.1: The Multi-Layer Decode
**Task:** Decode `NGQ2MTY2ZGM2MjYzNjQ=`.
1.  **From Base64:** `4d61666463626364`
2.  **From Hex:** `Mafdcbcd`
3.  **ROT13:** `Znsqpopq`
4.  *Wait, check the logic again.* CTFs often stack these. Always look for readable fragments.

**Challenge Question 2:** If you have a 4-byte key for XOR, but your message is 20 bytes long, how is the XOR applied?

---

## Section 3
**Goal:** Attack RSA and understand hashing security.

### 3.1 RSA & Prime Factoring
RSA security relies on the difficulty of factoring large numbers into primes.
*   **FactDB:** A public database of known prime factors. If your $N$ is in FactDB, the challenge is over.
*   **RsaCtfTool:** An automated tool that tries dozens of known RSA attacks (Common Modulus, Fermat’s, etc.).

### 3.2 Hashing & Salts
Hashes (MD5, SHA256) are one-way. You can't "decrypt" them, you can only "crack" them by guessing.
*   **Rainbow Tables:** Pre-computed tables of hashes for millions of common passwords.
*   **Salts/Nonces:** Random data added to the password before hashing. A salt makes Rainbow Tables useless because the salt is unique for every user.

### Practice 3.1: Cracking Weak RSA
**Scenario:** $N=33, e=7, C=10$.
1.  $N = 3 \times 11$. $p=3, q=11$.
2.  $\phi(N) = 2 \times 10 = 20$.
3.  $d$ satisfies $d \times 7 \equiv 1 \pmod{20}$. $d=3$.
4.  $M = C^d \pmod N = 10^3 \pmod{33} = 1000 \pmod{33} = 10$.

**Challenge Question 3:** What is a "Hash Collision" and why does it mean MD5 is no longer considered secure for digital signatures?

---

## Academic Connection & Competition
- **Textbook Correlation**: This chapter corresponds to **Chapter 2** of the [Consolidated Textbook](file:///Users/yoga/Documents/WorkDesk/CyberHack/Cyber_Security_Textbook.pdf).
- **Practical Application**: Hashing and Salts are used in the [IoT Project's Admin Panel](file:///Users/yoga/Documents/WorkDesk/CyberHack/projects/IoT_Red_Blue/server/index.js) to secure credentials.
- **Competition Note**: In Round 2 (Defense), your task is to ensure all user passwords are properly salted and hashed.

