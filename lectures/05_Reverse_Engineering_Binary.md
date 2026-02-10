# Chapter 5: Reverse Engineering & Binary Exploitation

## Core Concepts & Definitions
**Reverse Engineering (RevEng)** is the process of deconstructing software to reveal its architecture and logic. **Binary Exploitation (Pwn)** is using that knowledge to make the program do something it wasn't intended to do.

**Key Terminology:**
*   **Machine Code:** The 0s and 1s the CPU executes.
*   **Assembly (ASM):** Human-readable mnemonics for machine code (e.g., `MOV`, `ADD`, `JMP`).
*   **Decompiler:** A tool that attempts to translate binary back into higher-level C code.

---

## Level 1: Fundamentals
**Goal:** Understand the basics of binary files and assembly.

### 1.1 CPU Registers 101 (x86)
Registers are small, super-fast storage areas inside the CPU.
*   **EAX:** The "Accumulator." Often used for function return values.
*   **ESP:** The "Stack Pointer." Points to the top of the stack.
*   **EBP:** The "Base Pointer." Points to the bottom of the current stack frame.
*   **EIP:** The "Instruction Pointer." Points to the next command to execute. **(The Hacker's Target).**

### 1.2 Basic Logic Patching
If a program says `if (authenticated == 0) exit();`, we can change the assembly to `if (authenticated == 0) continue;`.
*   **Opcode for JNE (Jump Not Equal):** `75`.
*   **Opcode for JE (Jump Equal):** `74`.
*   *Patching:* Swapping these bytes effectively flips the logic of an `if` statement.

### Practice 1.1: The Hardcoded Pass
**Scenario:** A binary checks for a secret key.
1.  Run `strings binary`.
2.  If the key is visible, the challenge is over.
3.  If not, open in a Hex Editor and look for logic jumps (`74` or `75`).

**Challenge Question 1:** What does the `MOV EAX, 1` instruction do?

---

## Level 2: Intermediate
**Goal:** Master Ghidra and understand the Stack Frame.

### 2.1 The Stack Frame
Every function call creates a "Frame" on the stack.
*   **Local Variables:** Stored inside the frame.
*   **Return Address:** Stored just outside/above the frame.
*   **The Vulnerability:** If a program lets you write 100 bytes into a 64-byte variable, you will "overflow" the frame and overwrite the Return Address.

### 2.2 Advanced Ghidra
*   **Cross References (XREFS):** Right-click a function or string to see every place in the program that uses it.
*   **Script Manager:** Use built-in Python scripts to automate tasks like finding all calls to `scanf` (a dangerous function).

### Practice 2.1: The Keygen
**Scenario:** Decompiled code in Ghidra showing a XOR loop.
1.  Code: `for(i=0; i<4; i++) { key[i] = name[i] ^ 0x42; }`
2.  Logic: Every character of your name is XORed with `0x42`.
3.  Solution: Write a small script to perform this XOR on your name to get the valid key.

**Challenge Question 2:** In Ghidra, what does the "Decompile" window show compared to the "Listing" window?

---

## Level 3: Advanced
**Goal:** Control execution flow via Buffer Overflow.

### 3.1 Exploiting the Stack (Pwn)
1.  **Find the Offset:** How many "A"s does it take to overwrite EIP?
2.  **Control EIP:** Prove you can jump to an arbitrary address (e.g., `0xdeadbeef`).
3.  **The Payload (Shellcode):** Instead of `AAAA`, write a series of instructions that spawn a shell (`/bin/sh`).

### 3.2 GDB & Pwntools
*   **GDB-Peda/GEF:** Extensions for GDB that add colors and helpful exploit commands.
*   **Pwntools (Python):** The industry standard for writing exploits.
    ```python
    from pwn import *
    p = process('./vuln')
    payload = b"A" * 68 + p32(0x080484b6) # Overwrite EIP with win() address
    p.sendline(payload)
    p.interactive()
    ```

### Practice 3.1: Controlling EIP
**Task:** Identify the overflow point in `vuln`.
1.  Generate large input: `cyclic 100`.
2.  Run in GDB: `r < input.txt`.
3.  Check EIP: `i r eip` -> `0x6161616a`.
4.  Find offset: `cyclic -l 0x6161616a` -> Offset is 36.

**Challenge Question 3:** What is "ASLR" (Address Space Layout Randomization) and why does it make binary exploitation harder?

