# Part C: Weak Authentication (Brute Force)

## Objective
The IoT backend has an administration panel protected by a simple login. Your goal is to **brute force** the admin password to gain access to the system configuration.

## Scenario
The administrator used a common password, and the server does not have rate limiting implemented on the login endpoint.

## Red Team Instructions
1.  **Recon:** Identify the login endpoint: `POST /api/admin/login`.
2.  **Analyze:** Try a manual login to see the response format.
3.  **Attack:**
    *   Use a tool (like `ffuf`, `hydra`, or a simple script) to try common passwords against the `admin` username.
    *   Example logic for a script:
        ```bash
        # Pseudocode
        for p in $(cat passwords.txt); do
          curl -s -X POST http://localhost:3000/api/admin/login -d "username=admin&password=$p"
        done
        ```
4.  **Success Condition:** Receive a `200 OK` or a message saying "Login Successful".

## Blue Team Instructions
1.  **Monitor:** Check the server logs for many failed login attempts from the same IP.
2.  **Detect:** Notice the pattern of "Invalid Credentials" followed by a sudden success.
3.  **Defend:**
    *   Implement **Account Lockout**: Lock the `admin` account after 5 failed attempts.
    *   Implement **Rate Limiting**: Block IPs that send more than 3 login requests per minute.
    *   Enforce **Strong Passwords**: Ensure the password cannot be found in common wordlists.
