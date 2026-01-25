# Chapter 2: Cryptography

## Core Concepts & Definitions
**Cryptography** is the science of secure communication. In CTFs, you are often the *cryptanalyst*, trying to break the code.

**Key Terminology:**
*   **Plaintext:** The original message.
*   **Ciphertext:** The scrambled message.
*   **Key:** The secret password used to encrypt/decrypt.
*   **Encoding:** Changing data format (e.g., Base64). No key needed.
*   **Encryption:** Scrambling data for secrecy. Key needed.
*   **Hashing:** One-way fingerprint of data.

---

## Level 1: Fundamentals
**Goal:** Recognize and break historical ciphers.

### 1.1 Historical Ciphers
These rely on "Security by Obscurity."
*   **Caesar Cipher:** Shifts every letter by $N$.
    *   Example: `HELLO` + Shift 1 -> `IFMMP`.
*   **Substitution Cipher:** Replaces letters with symbols/other letters.

### 1.2 Basic Encoding
*   **Base64:** The most common encoding.
    *   *Characteristic:* `A-Z, a-z, 0-9, +, /`. Often ends in `=`.
    *   *Usage:* Transmitting binary data as text.

### Practice 1.1: The Caesar Box
**Scenario:** You find a note: `Uryyb Jbeyq`.
1.  Go to [dcode.fr/caesar-cipher](https://www.dcode.fr/caesar-cipher).
2.  Input the text.
3.  Click "Decrypt" (Brute-force all shifts).
4.  Shift 13 gives: `Hello World` (This is ROT13).

**Challenge Question 1:** A string contains only numbers and letters A-F. What encoding is this likely to be?

---

## Level 2: Intermediate
**Goal:** Master the XOR operator and multi-step decoding.

### 2.1 The Magic of XOR ($\oplus$)
Exclusive OR is the foundation of modern crypto.
*   **Logic:** If bits are different -> 1. If same -> 0.
*   **Reversible:** `A XOR B = C` implies `C XOR B = A`.

### 2.2 Modern Symmetric: AES
**Advanced Encryption Standard (AES)** is the global standard.
*   **Key Sizes:** 128, 192, 256 bits.
*   **Weakness:** Implementing **ECB Mode** (Electronic Codebook) leaves patterns visible.

### Practice 2.1: The Onion
**Scenario:** A string is encoded like this: `Base64(Hex(Rot13("Flag")))`.
**Task:** Decode `NGQ2MTY2ZGM2MjYzNjQ=`.
1.  Open **CyberChef**.
2.  Input: `NGQ2MTY2ZGM2MjYzNjQ=`
3.  Recipe: "From Base64" -> Result: `4d6166dc626364`
4.  Add Recipe: "From Hex" -> Result: `Maf\Übcd` (Garbage?)
    *   *Wait!* Let's check the hex. `4d`=`M`, `61`=`a`.
    *   Try Rot13 first? No, Base64 was definitely last.
    *   *Correction:* Base64 -> `4d61666463626364` -> Hex -> `Mafdcbcd` -> Rot13 -> `Znsqpopq`...
    *   *Actual String:* `ZmxhZw==` -> Base64 -> `flag`.

**Challenge Question 2:** If you XOR a file with itself, what is the result?

---

## Level 3: Advanced
**Goal:** Attack RSA and understand hashing collisions.

### 3.1 RSA Mathematics
RSA is asymmetric (Public Key + Private Key).
*   $N = p \times q$ (Public Modulus, where p/q are prime).
*   $C = M^e \pmod N$ (Encryption).
*   $M = C^d \pmod N$ (Decryption).
*   **The Attack:** Calculate $p$ and $q$ by factoring $N$. Once you have $p/q$, you can calculate $d$ (Private Key).

### 3.2 Hashing Collisions
Hashes are unique... theoretically.
*   **MD5 Collision:** Two different files having the exact same MD5 hash.
*   **Tool:** `hashclash`.

### Practice 3.1: Cracking Weak RSA
**Scenario:** You are given $N=33$, $e=7$.
1.  Factorize $N$: $33 = 3 \times 11$. So $p=3, q=11$.
2.  Calculate $\phi(N) = (p-1)(q-1) = 2 \times 10 = 20$.
3.  Calculate $d$: $d$ must satisfy $(d \times e) \pmod {\phi(N)} = 1$.
    *   $(d \times 7) \pmod{20} = 1$.
    *   Try $d=3$: $21 \pmod{20} = 1$. Yes.
    *   **Private Key (d) = 3.**

**Challenge Question 3:** Why is it dangerous to use the same modulus $N$ with different public exponents $e$ for two different users? (Hint: Common Modulus Attack).
