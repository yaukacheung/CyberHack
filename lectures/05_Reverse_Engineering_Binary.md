# Chapter 5: Reverse Engineering & Binary Exploitation

## Core Concepts & Definitions
**Reverse Engineering (RevEng)** is the process of deconstructing software to reveal its architecture and logic. **Binary Exploitation (Pwn)** is using that knowledge to make the program do something it wasn't intended to do.

**Key Terminology:**
*   **Source Code:** Human-readable code (C, Python).
*   **Binary/Executable:** Machine code (0s and 1s) run by the CPU.
*   **Assembly (ASM):** Low-level human-readable representation of machine code.
*   **Decompiler:** Tool to try and turn Binary back into Source Code.

---

## Level 1: Fundamentals
**Goal:** Understand compiled vs interpreted code and find low-hanging fruit.

### 1.1 `strings` (Again)
Before opening a complex tool, always check `strings`.
*   Many beginners "hardcode" passwords or flags directly into the binary.
*   *Command:* `strings game.exe | grep "password"`

### 1.2 Basic Logic Patching
*   **Hex Editing:** Changing a single byte to alter logic.
    *   Change `74` (`JE` - Jump if Equal) to `75` (`JNE` - Jump if Not Equal).
    *   This flips the logic: "If password is correct" becomes "If password is NOT correct".

### Practice 1.1: The Hardcoded Pass
**Scenario:** `login` program asks for a PIN.
1.  Run `./login`. Input `1234`. Result: "Access Denied".
2.  Run `strings login`.
3.  You see `Enter PIN:`, `Access Denied`, `Access Granted`, and `8492`.
4.  Run `./login` and try `8492`. Success!

**Challenge Question 1:** What does the instruction `NOP` (No Operation) do? (It does nothing, just takes up space. Often used for padding).

---

## Level 2: Intermediate
**Goal:** Read C-like pseudocode using a Decompiler.

### 2.1 Ghidra
The NSA's open-source reverse engineering suite.
*   **CodeBrowser:** The main window.
*   **Decompiler Pane:** The magic window that shows you C code.
*   **Analysis:** Renaming variables (e.g., changing `iVar1` to `user_input`) makes code readable.

### Practice 2.1: The Keygen
**Scenario:** A program generates a license key based on your name.
1.  Open in **Ghidra**. Find `main`.
2.  Decompile reads:
    ```c
    int valid = 0;
    if (input + 5 == 100) { valid = 1; }
    ```
3.  Logic: My input plus 5 must equal 100.
4.  Solution: Input must be `95`.

**Challenge Question 2:** In C, what function is commonly used to compare two strings? (`strcmp`)

---

## Level 3: Advanced
**Goal:** Smash the Stack (Buffer Overflow).

### 3.1 Memory Layout
*   **Stack:** Where local variables live. Grows down.
*   **Return Address:** Tells the CPU where to go after a function finishes.
*   **Buffer Logic:** If you write past the end of a buffer, you overwrite the Return Address.

### 3.2 GDB (GNU Debugger)
*   `gdb ./vuln`: Start debugging.
*   `break main`: Stop at the start.
*   `run`: Start the program.
*   `x/10s $esp`: Examine 10 lines of the stack pointer.

### Practice 3.1: Controlling EIP
**Scenario:** `vuln` has a buffer of 64 chars.
1.  Create input: Python `print("A"*70)`.
2.  Run inside GDB: `run < input.txt`.
3.  App crashes: `Segmentation Fault`.
4.  Check registers: `info registers`.
5.  `EIP` is `0x41414141` (`AAAA`).
6.  **Conclusion:** You control exactly where the program jumps next.

**Challenge Question 3:** What is "Shellcode"? (A small piece of code used as the payload in an exploit, often spawning a shell).
