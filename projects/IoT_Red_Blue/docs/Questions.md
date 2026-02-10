# IoT Security: Review Questions & Challenges

Test your understanding of the concepts and exercises in this project.

## Theoretical Questions

1.  **Red vs. Blue:** If you are implementing a firewall to block suspicious IPs, which team roles are you performing?
2.  **Encryption:** Why is sending data over plain HTTP dangerous for an IoT sensor? Name two specific threats.
3.  **Spoofing:** How does a "Device ID" differ from a "Security Token"? Which one is easier to spoof?
4.  **NoSQL Injection:** Explain why `?deviceId[$ne]=test` is a security risk. What information does it reveal to an attacker?
5.  **OWASP IoT:** Name three items from the OWASP IoT Top 10 and give a real-world example of how they might be exploited.

## Practical Challenges (Red Team)

*   **Challenge A1:** Can you spoof data from a device that doesn't exist yet? What happens to the server?
*   **Challenge B1:** Using the NoSQL Injection vulnerability, can you count exactly how many devices are in the database without seeing their data? (Hint: Think about the response length or status codes).

## Defensive Tasks (Blue Team)

*   **Task A1:** Modify `server/index.js` to only accept `temp` values between `-40` and `80`. What happens when the spoofed 100°C request is sent?
*   **Task B1:** Use the `Joi` library to strictly validate that `deviceId` is a alphanumeric string. This will prevent NoSQL object injection.

---

## Discussion Point
*In a real-world smart home system, if an attacker compromises a smart lightbulb, what else could they potentially reach on the network? Research "Lateral Movement".*

## Advanced Challenges (Customization)
1. **Extensibility**: When you added the `humidity` sensor, what new "Logic Bombs" could an attacker create?
2. **Detection**: How would you update the Blue Team monitor to alert on "Out of Range" humidity values specifically?

