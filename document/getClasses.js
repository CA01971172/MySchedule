const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './ClassDesign.md');
let text = "";
fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
        console.error(err);
        return;
    }
    const regex = /^.*?Class: (\w+).*$/gm;
    let match;
    let output = ""
    while ((match = regex.exec(content)) !== null) {
        const className = match[1];
        output += className + '\n';
    }
    fs.writeFileSync('document/クラスリスト.txt', output);
});


