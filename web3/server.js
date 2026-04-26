const http = require("http");

http.createServer((req, res) => {
  res.end("Server works!");
}).listen(3000, () => {
  console.log("Server running");
});