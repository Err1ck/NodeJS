/* Exercise 4 - Create and use ECMAScript modules

Create a script that uses export default to export a function.
Create another script that uses import to import the function and then calls it. */

function outputModule(text) {
  console.log(`The output module text is ${text}`);
}

export default outputModule;
