const http = require("http");
const fs = require("fs");

let movies = [];
let id = 1;

if (fs.existsSync("movies.json")) {
  movies = JSON.parse(fs.readFileSync("movies.json"));
}

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  // GET
  if (req.method === "GET" && req.url === "/movies") {
    res.end(JSON.stringify(movies));
  }

  // POST
  else if (req.method === "POST" && req.url === "/movies") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const data = JSON.parse(body);

      const newMovie = {
        id: id++,
        title: data.title
      };

      movies.push(newMovie);
      fs.writeFileSync("movies.json", JSON.stringify(movies));

      res.end(JSON.stringify(newMovie));
    });
  }

  // DELETE ✅ FIXED (MOVED INSIDE)
  else if (req.method === "DELETE" && req.url.startsWith("/movies/")) {
    const movieId = parseInt(req.url.split("/")[2]);

    movies = movies.filter(m => m.id !== movieId);
    fs.writeFileSync("movies.json", JSON.stringify(movies));

    res.end(JSON.stringify({ message: "Deleted" }));
  }

  // NOT FOUND
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});