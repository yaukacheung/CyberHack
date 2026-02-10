# IoT Security: Lecture Notes

Supporting knowledge for understanding the vulnerabilities and defenses in this project.

## 1. IoT Communication Protocols

Most IoT devices communicate using lightweight protocols:
*   **HTTP/HTTPS:** Common for web-based APIs. Vulnerable to interception if not encrypted (HTTPS).
*   **MQTT (Message Queuing Telemetry Transport):** Extremely popular in IoT. Follows a Publish/Subscribe model. Often lacks default security.
*   **CoAP (Constrained Application Protocol):** A specialized web transfer protocol for use with constrained nodes and networks.

## 2. Common Vulnerabilities (OWASP IoT Top 10)

1.  **Weak, Guessable, or Hardcoded Passwords:** The #1 reason IoT devices are compromised (e.g., Mirai Botnet).
2.  **Insecure Network Services:** Unnecessary ports left open (SSH, Telnet) or unencrypted services.
3.  **Insecure Ecosystem Interfaces:** Vulnerabilities in web or cloud APIs that the device talks to.
4.  **Lack of Secure Update Mechanism:** Devices that cannot be patched or use unverified firmware updates.
5.  **Use of Insecure or Outdated Components:** Using old Linux kernels or outdated libraries (like an old version of Express.js).

## 3. Data Spoofing & Injection

### What is Data Spoofing?
Data spoofing happens when an attacker sends malicious data that masquerades as legitimate data from a trusted source.
*   *Example:* An attacker sends `{ "deviceId": "rpi-01", "temp": 120 }` even though they aren't the real `rpi-01`.

### Understanding NoSQL Injection
In MongoDB, if an application passes user-controlled objects directly into a query, an attacker can use MongoDB operators.
*   *Vulnerable Code:* `db.collection.find({ deviceId: req.query.deviceId })`
*   *Attack Payload:* `?deviceId[$ne]=something`
*   *Result:* Instead of finding one device, it finds *all* devices *not* equal to "something".

## 4. Hardware Security Basics

*   **UART (Universal Asynchronous Receiver-Transmitter):** A serial port often left active on device motherboards, providing a root shell to anyone with a $5 adapter.
*   **JTAG:** A debugging port that allows an attacker to read/write memory directly or dump the device's firmware for analysis.
