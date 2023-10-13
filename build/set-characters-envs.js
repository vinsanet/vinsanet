/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");

const buffer = fs.readFileSync("dist/manifest.json");
const manifest = JSON.parse(buffer.toString());

const body = `MANIFEST_INDEX_JS=/${manifest["index.html"]["file"]}
MANIFEST_INDEX_CSS=/${manifest["index.html"]["css"][0]}
MANIFEST_FAVICON_ICO=/${manifest["src/assets/favicon.ico"]["file"]}`;
fs.writeFileSync("functions/.env", body);
