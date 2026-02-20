const { mdToPdf } = require("md-to-pdf");
const fs = require("fs");

const input = "Cyber_Security_Textbook.md";
const output = "Cyber_Security_Textbook.pdf";

(async () => {
    console.log(`[*] Converting ${input} to ${output}...`);
    try {
        await mdToPdf({ path: input }, { dest: output });
        console.log("[+] Done. PDF created successfully.");
    } catch (err) {
        console.error("[-] Error generating PDF:", err);
    }
})();
