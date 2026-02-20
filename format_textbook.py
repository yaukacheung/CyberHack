import re

with open('Cyber_Security_Textbook.md', 'r') as f:
    text = f.read()

# 1. Remove lines (---)
text = re.compile(r'^---\n', re.MULTILINE).sub('', text)

# 2. Adjust new chapters in new pages
text = re.compile(r'^(# Chapter \d+:.*)', re.MULTILINE).sub(r'<div style="page-break-before: always;"></div>\n\n\1', text)

# 3. Replace levels
text = text.replace('## Level 1:', '## Section 1:')
text = text.replace('## Level 2:', '## Section 2:')
text = text.replace('## Level 3:', '## Section 3:')

# 4. Remove icons
icons = ['🔐 ', '🌐 ', '⚙️ ', '📡 ', '🏗️ ', '🔴 ', '🔵 ', '🤝 ', '🛡️ ', '🏆 ', '🛠️ ', '🧭 ', '🚨 ', '💉 ', '🔌 ']
for icon in icons:
    text = text.replace(icon, '')

# 5. Remove "End of Textbook"
text = text.replace('**End of Textbook**', '')

# 6. Add appendix
appendix = """
<div style="page-break-before: always;"></div>

# Appendix

## A. Recommended Reading
* The Web Application Hacker's Handbook
* Practical Malware Analysis
* The Tangled Web

## B. Useful Commands Cheat Sheet
* `nmap -sC -sV -oA scan_results <IP>`
* `ffuf -w wordlist.txt -u http://target/FUZZ`
* `john --wordlist=rockyou.txt hashes.txt`
"""
if "Appendix" not in text:
    text += appendix

with open('Cyber_Security_Textbook.md', 'w') as f:
    f.write(text)
print("Textbook updated successfully.")
