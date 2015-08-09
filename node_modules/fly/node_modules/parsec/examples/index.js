var Parsec = require("../lib")

console.log(
  Parsec.parse(process.argv)
  .options("domain", {default: "defaultDomain"})
  .options("env", {default: "defaultEnv"})
)


