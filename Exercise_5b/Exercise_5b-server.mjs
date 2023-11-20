import { createServer } from "node:http";

const server = createServer((req, resp) => {
  console.log("request recived");
  resp.statusCode = 200;
  resp.setHeader("Content-Type", "aplication/json");
  const jsonRespBody = JSON.stringify({ location: "Mars" });
  resp.end(jsonRespBody);
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
