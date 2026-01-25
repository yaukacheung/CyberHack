# Chapter 5: Reverse Engineering & Binary Exploitation

This chapter covers analyzing compiled programs to understand how they work (Reverse Engineering) and exploiting them (Binary Exploitation/Pwn).

## Assembly Basics (x86/x64)
Computer CPUs execute machine code. Assembly is the human-readable representation.
*   **Registers:** Small storage areas in the CPU (e.g., `eax`, `ebx`, `eip` / `rax`, `rbx`, `rip`).
    *   `rip` (Instruction Pointer): Points to the next instruction to execute.
*   **Instructions:**
    *   `mov destination, source`: Move data.
    *   `push`/`pop`: Stack operations.
    *   `call`: Call a function.
    *   `ret`: Return from a function.
    *   `cmp`/`jmp`: Compare and jump (control flow).

## Reverse Engineering Tools
*   **GDB (GNU Debugger):** Dynamic analysis. Run the program step-by-step.
*   **Ghidra / IDA Pro:** Static analysis. Decompilers that turn binary back into C-like code.
*   **ltrace / strace:** Trace library calls and system calls.

## Binary Exploitation Concepts

### Buffer Overflow
Writing more data to a buffer than it can hold, overwriting adjacent memory.
*   **Stack Overflow:** Overwriting the return address on the stack to redirect program execution (e.g., to a shellcode).
*   **Protection Mechanisms:**
    *   **ASLR (Address Space Layout Randomization):** Randomizes memory locations.
    *   **NX (No-Execute):** Prevents code execution on the stack.
    *   **Canaries:** Values placed on the stack to detect overflows.

### Format String Vulnerability
Using user input as a format string in functions like `printf`.
*   Example: `printf(user_input)` instead of `printf("%s", user_input)`.
*   Allows reading/writing arbitrary memory.
