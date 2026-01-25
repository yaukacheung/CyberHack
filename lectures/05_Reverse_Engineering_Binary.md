# Chapter 5: Reverse Engineering & Binary Exploitation

## 5.1 Memory Layout
To exploit a program, you must know how it lives in memory.

<!-- Placeholder: [Image: stack_memory_layout.png] - Visualization of the stack frame, return address, and buffer overflow direction -->

1.  **Text Segment:** The actual machine code (Read-Only).
2.  **Data Segment:** Global variables (initialized).
3.  **Heap:** Dynamic memory (grows upwards). Used by `malloc()`/`new`.
4.  **Stack:** Local variables (grows downwards). Used by function calls. **Most common attack surface.**

## 5.2 CPU Registers (x86)
Registers are super-fast storage locations inside the CPU.

<!-- Placeholder: [Image: cpu_registers_diagram.png] - Map of common registers (EAX, ESP, EIP) and their roles -->

*   **EAX (Accumulator):** Stores return values of functions.
*   **ESP (Stack Pointer):** Points to the top of the stack.
*   **EBP (Base Pointer):** Anchors the bottom of the stack frame.
*   **EIP (Instruction Pointer):** **The most critical register.** It controls what instruction runs next. If you control EIP, you control the program.

## 5.3 Reverse Engineering Workflow
The goal is to understand the logic without source code.

### Step-by-Step: Decompiling with Ghidra
**Scenario:** You have a binary `auth` that asks for a password.

1.  **Import:** Open Ghidra, create a project, and import `auth`.
2.  **Analyze:** Double-click `auth` to open the CodeBrowser. When asked to "Analyze?", click "Yes" (Defaults are fine).
3.  **Symbol Tree:** On the left, expand "Functions". Look for `main`.
4.  **Decompile:** Click `main`. The window on the right ("Decompile") shows semi-readable C code.
5.  **Read:** Look for logic like:
    ```c
    if (strcmp(input, "SuperSecretPassing") == 0) {
        give_flag();
    }
    ```
6.  **Solve:** The password is `SuperSecretPassing`.

## 5.4 Binary Exploitation (Pwn)
Breaking the program to run your own code (Shellcode).

### Buffer Overflow
A buffer overflow happens when a program reads more data into a fixed-size buffer than it can hold.

**The Logic:**
1.  Variable `buffer` is allocated 64 bytes on the stack.
2.  Important data (like the **Return Address**) sits right next to it.
3.  User inputs 100 bytes.
4.  The first 64 fill the buffer. The remaining 36 spill over ("overflow") and overwrite the Return Address.
5.  When the function finishes (`ret`), the CPU tries to jump to the overwritten address.
6.  If you overwrite it with the address of "Give Shell" function -> **You win.**

### Step-by-Step: Analysis with GDB
**Scenario:** `vuln` crashes when you give it long input.

1.  **Start GDB:** `gdb ./vuln`
2.  **Run:** `r` -> Program starts.
3.  **Crash it:** Type `AAAAAAAAAA...` (lots of A's).
4.  **Check Crash:** Program stops with `Segmentation fault`.
5.  **Inspect EIP:** `info registers`.
    *   If `eip` is `0x41414141` (`AAAA`), it means you successfully controlled the execution pointer.
