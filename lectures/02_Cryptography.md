# Chapter 2: Cryptography

Cryptography is the art of writing or solving codes. In CTFs, this often involves decoding hidden messages or breaking weak encryption.

## Key Concepts

### Encoding vs. Encryption
*   **Encoding:** transforming data into a new format using a publicly available scheme (e.g., Base64, Hex). No key is required to reverse it.
*   **Encryption:** transforming data to keep it secret. Requires a key to decrypt (e.g., AES, RSA).

### Common Encodings
1.  **Base64:** ends with `=`, uses `A-Z, a-z, 0-9, +, /`.
    *   Example: `SGVsbG8=` -> `Hello`
2.  **Hexadecimal:** uses `0-9, A-F`.
    *   Example: `48 65 6c 6c 6f` -> `Hello`
3.  **URL Encoding:** uses `%` followed by hex.
    *   Example: `%20` is a space.

## Classical Ciphers
These are often found in beginner challenges.
1.  **Caesar Cipher:** Shifts letters by a fixed number (e.g., A -> C with shift 2).
2.  **Vigenère Cipher:** Uses a keyword to shift letters.
3.  **Substitution Cipher:** Replaces each letter with another based on a key alphabet.

*Tool:* Use [CyberChef](https://gchq.github.io/CyberChef/) or [dcode.fr](https://www.dcode.fr/) to break these.

## Modern Cryptography
1.  **Symmetric (Private Key):** Same key for encryption and decryption (e.g., AES, DES).
    *   Challenge: Key distribution.
2.  **Asymmetric (Public Key):** Public key to encrypt, Private key to decrypt (e.g., RSA).
    *   Mathematical foundation involves prime factorization.

## Hashing
One-way functions that map data of arbitrary size to fixed-size values.
*   **MD5, SHA-1:** Older, considered weak/broken options.
*   **SHA-256:** Standard secure hash.
*   **Usage:** file integrity verification, password storage.
*   **Attacks:** Rainbow tables, hash collisions.
