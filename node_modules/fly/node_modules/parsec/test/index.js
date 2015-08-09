var Parsec = new require("../lib/")
var test = require("tape")
const OPTS = { sliceIndex: 0 }

test("Defaults", function (t) {
  // -T850
  var opts = Parsec.parse(["-T850"], OPTS)
    .options(["T", "terminator"], { default: 800 })
    .options("model", { default: 101 })
    .options("name", { default: "Schwa" })

  t.equal(opts.name, "Schwa")
  t.equal(opts.n, "Schwa")
  t.equal(opts.model, 101)
  t.equal(opts.m, 101)
  t.equal(opts.terminator, "850")
  t.equal(opts.T, "850")

  // -tla
  opts = Parsec.parse(["-tla"], OPTS)
    .options("three")
    .options("letter")
    .options("abbreviation")

    t.equal(opts.three, true)
    t.equal(opts.t, true)
    t.equal(opts.letter, true)
    t.equal(opts.l, true)
    t.equal(opts.abbreviation, true)
    t.equal(opts.a, true)

  // -S true -l false
  opts = Parsec.parse(["-S", true, "-l", false], OPTS)
    .options("arms", { default: 2 })
    .options(["S", "H", "senseOfHumor"], { default: false })
    .options(["L", "l", "luck"], { default: true })

  t.equal(opts.senseOfHumor, true)
  t.equal(opts.S, true)
  t.equal(opts.H, true)

  t.equal(opts.a, 2)
  t.equal(opts.arms, 2)

  t.equal(opts.L, false)
  t.equal(opts.l, false)
  t.equal(opts.luck, false)

  // -v -f ["Myfile", "myfile"]
  opts = Parsec.parse(["-v", "-f", ["Myfile", "myfile"]], OPTS)
    .options("base", { default: "./" })
    .options("logger", { default: "./log/logger" })
    .options("file", { default: ["Xfile", "xfile"] })
    .options("verbose", { default: false })
    .options(["V", "version"], { default: false })

  t.equal(opts.base, "./")
  t.equal(opts.b, "./")
  t.equal(opts.logger, "./log/logger")
  t.equal(opts.l, "./log/logger")
  t.deepEqual(opts.file, ["Myfile", "myfile"])
  t.deepEqual(opts.f, ["Myfile", "myfile"])
  t.equal(opts.verbose, true)
  t.equal(opts.v, true)
  t.equal(opts.V, false)
  t.equal(opts.version, false)

  t.end()
})

test("No-Flags", function (t) {
  var opts = Parsec.parse([
    "--love", "--no-war", "--no-fun",
    "--no-sex=false", "--no-rest", true,
    "--no-mom=false", "--no-2", "--no-1",
    "--no-way=way"
  ], OPTS)

    t.equal(opts.love, true)
    t.equal(opts.war, false)
    t.equal(opts.fun, false)
    t.equal(opts.sex, true)
    t.equal(opts.rest, false)
    t.equal(opts.mom, true)
    t.equal(opts["1"], false)
    t.equal(opts["2"], false)
    t.equal(opts["no-way"], "way")

  t.end()
})

test("Short Options", function (t) {
  var opts = Parsec.parse([
    "-abcde", -0.5, "-qt3", "-xyz-.09", "-Z", null ], OPTS)

  t.equal(opts.a, true)
  t.equal(opts.b, true)
  t.equal(opts.c, true)
  t.equal(opts.d, true)
  t.equal(opts.e, -0.5)
  t.equal(opts.q, true)
  t.equal(parseInt(opts.t), 3)
  t.equal(opts.x, true)
  t.equal(opts.y, true)
  t.equal(parseFloat(opts.z), -0.09)
  t.equal(opts.Z, null)

  t.end()
})

test("Long Options", function (t) {
  var opts = Parsec.parse([
    "--lang", "JavaScript", "--age=25", "--no-future=false"], OPTS)

  t.equal(opts.lang, "JavaScript")
  t.equal(opts.age, "25")
  t.equal(opts.future, true)

  t.end()
})

test("Single Cases", function (t) {

  t.equal(Parsec.parse(["--long"], OPTS).long, true)
  t.equal(Parsec.parse(["--long=value"], OPTS).long, "value")
  t.equal(Parsec.parse(["--no-long"], OPTS).long, false)
  t.equal(Parsec.parse(["--long", 1], OPTS).long, 1)
  t.equal(Parsec.parse(["--long", "--nope"], OPTS).long, true)

  t.equal(Parsec.parse(["A"], OPTS)._, "A")
  t.deepEqual(Parsec.parse(["A", "B"], OPTS)._, ["A", "B"])
  t.deepEqual(Parsec.parse(["A", "B", 5, null, true, false], OPTS)._,
    ["A", "B", 5, null, true, false])

  t.end()
})

test("Operands", function (t) {
  var opts = Parsec.parse(
    [1,2,3, "-a", 100, 4,
    "--nope", 200, 5, "-b", "Hello", "Six",
    "--js=yes", [7, 8], "--ok", -1, 9, "TEN"], OPTS)

  t.deepEqual(opts._, [1,2,3,4,5, "Six", 7, 8, 9, "TEN"])
  t.end()
})

test("Slice Index", function (t) {
  var opts = Parsec.parse(
    [0,1,2,3,4,5,6,7,8,9], { sliceIndex: 5 })

    t.deepEqual(opts._, [5,6,7,8,9])

  t.end()
})

test("Edge Cases", function (t) {
  t.deepEqual(Parsec.parse(
    [
      "O1",
      "-abc",null,
      "O2"
    ], OPTS)._, ["O1", "O2"])

  var opts = Parsec.parse(
    [
      "--foo", "bar", "--no-hoge",
      "-Z1985", "-Z", null, "-c",
      null, false
    ], OPTS)

  t.equal(opts.foo, "bar")
  t.equal(opts.hoge, false)
  t.deepEqual(opts.Z, ["1985", null])
  t.equal(opts._, false)

  t.end()
})

test("End of Options", function (t) {
  t.deepEqual(Parsec.parse(
    [
      "--long=true",
      "-abc","--",
      "-nope", "--neither", "--no-way", "-a1", "ABC"
    ], OPTS)._, ["-nope", "--neither", "--no-way", "-a1", "ABC"])

  t.deepEqual(Parsec.parse(
    [
      "--", "--we", "--are", "--watching", "-you"
    ], OPTS)._, ["--we", "--are", "--watching", "-you"])

  t.deepEqual(Parsec.parse(["-a","--"], OPTS).a, true,
    "Double dash -- is not a value")
  t.deepEqual(Parsec.parse(["-a","---"], OPTS).a, true,
    "Tripple dash --- is not a value")

  t.end()
})
