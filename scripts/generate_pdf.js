const markdownpdf = require("markdown-pdf");
const fs = require("fs");

const input = "Cyber_Security_Textbook.md";
const output = "Cyber_Security_Textbook.pdf";

console.log(`[*] Converting ${input} to ${output}...`);

markdownpdf()
    .from(input)
    .to(output, function () {
        console.log("[+] Done. PDF created.");
    });
