# IoT Security & Infrastructure: Professional Primer

This primer provides the supporting theoretical and technical knowledge required to understand the vulnerabilities, exploits, and defensive architecture implemented throughout the **IoT Red vs Blue Capstone Project**.

---

## 🏗️ 1. IoT Communication Architecture & Protocols

Unlike traditional web-browsers, IoT devices are heavily power-constrained and operate over unpredictable networks. They utilize lightweight protocols, which frequently trade security for performance.

*   **HTTP/HTTPS (REST APIs):** Ubiquitous for web-based applications. Vulnerable to Man-in-the-Middle (MitM) interception and data manipulation if transport-layer encryption (HTTPS/TLS) is not strictly enforced.
*   **MQTT (Message Queuing Telemetry Transport):** Extremely popular in industrial IoT (IIoT). Follows a highly efficient Publish/Subscribe model. *Vulnerability:* Often deployed without TLS or client authentication by default, allowing anyone to subscribe to sensitive telemetry feeds.
*   **CoAP (Constrained Application Protocol):** A specialized, UDP-based web transfer protocol designed for use with constrained nodes (e.g., smart lightbulbs).

---

## 🚨 2. The Threat Landscape (OWASP IoT Top 10)

The Open Worldwide Application Security Project (OWASP) maintains a list of the most critical IoT vulnerabilities. This capstone project simulates several of these:

1.  **Weak, Guessable, or Hardcoded Passwords:** The single largest cause of IoT compromise (e.g., the Mirai Botnet scanning for default `admin`/`1234` factory credentials).
2.  **Insecure Network Services:** Unnecessary, exposed ports (SSH, Telnet, FTP) or unencrypted services (HTTP) exposed to the public internet.
3.  **Insecure Ecosystem Interfaces:** Vulnerabilities in the web API, cloud dashboard, or mobile app that the device natively talks to (e.g., NoSQL Injections, IDOR).
4.  **Lack of Secure Update Mechanism:** Devices that cannot be patched remotely or process unverified, unsigned firmware updates.
5.  **Use of Insecure or Outdated Components:** Utilizing vulnerable third-party software libraries (e.g., outdated versions of Express.js or OpenSSL).

---

## 💉 3. Advanced Injection & Manipulation

### Data Spoofing (Broken Access Control)
Spoofing occurs when an adversary transmits malicious telemetry that masquerades as legitimate data from a trusted node.
*   *Mechanism:* If an API accepts data purely based on a submitted `deviceId` string without a cryptographic signature (like an API Key or Mutual TLS certificate), it is trivial to bypass.
*   *Impact:* Falsifying temperature data to trigger emergency cooling systems in a datacenter, causing physical disruption.

### NoSQL Injection (Database Manipulation)
In document-based databases (like MongoDB), if an application passes unsanitized, user-controlled objects directly to the database driver, an attacker can utilize native query operators against the logic.
*   *Vulnerable Code:* `db.collection.findOne({ deviceId: req.query.deviceId })`
*   *The Exploit:* By passing an object instead of a string in the URL: `?deviceId[$ne]=admin-node`
*   *The Result:* The database engine evaluates `"is the device ID not equal to 'admin-node'?"` This evaluates to true for the first record in the database, seamlessly bypassing the intended logic.

---

## 🔌 4. Hardware Security Fundamentals

While this capstone focuses on network and application security, physical hardware vulnerabilities are critical in the IoT domain:

*   **UART (Universal Asynchronous Receiver-Transmitter):** A serial debugging port frequently left active on production motherboards. If an attacker gains physical access, connecting a $5 USB-to-TTL adapter often yields an unauthenticated root shell.
*   **JTAG (Joint Test Action Group):** A low-level hardware debugging interface allowing an attacker to single-step the CPU, read/write directly to memory, or dump the entire firmware image for reverse engineering and zero-day discovery.
