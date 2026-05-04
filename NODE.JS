const express = require("express");
const axios = require("axios");

const app = express();

const sources = [
  "https://filters.adtidy.org/ios/filters/2_optimized.txt",
  "https://filters.adtidy.org/ios/filters/11_optimized.txt",

  // твои 20 ссылок сюда:
  "https://example.com/list1.txt",
  "https://example.com/list2.txt"
];

app.get("/blocklist.txt", async (req, res) => {

  let result = "! IOSCrack Unified Blocklist\n\n";

  for (let url of sources) {
    try {
      const r = await axios.get(url);
      result += r.data + "\n";
    } catch (e) {
      result += `! ERROR ${url}\n`;
    }
  }

  // remove duplicates
  const unique = [...new Set(result.split("\n"))].join("\n");

  res.setHeader("Content-Type", "text/plain");
  res.send(unique);
});

app.listen(3000, () => {
  console.log("Server running");
});