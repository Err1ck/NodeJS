import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;

  response.setHeader(200, { "Content-Type": "application/json" });

  const jsonResponseBody = JSON.stringify({
    location: "https://rickandmortyapi.com/api/location/23",
  });

  response.end(jsonResponseBody);
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
