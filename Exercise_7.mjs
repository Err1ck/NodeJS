/* Use a method with a callback

Create a script that uses the Node.js core fs.writeFile() (callback API) method to write a text file.
 The documentation for this method is on the Node.js File system page:

 https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback */

import { writeFile } from "node:fs";
import { Buffer } from "node:buffer";

const data = new Uint8Array(Buffer.from("Use a method with a callback"));
writeFile("Exercise_7_txt.txt", data, (err) => {
  if (err) throw err;
  console.log("This file has been saved!");
});
