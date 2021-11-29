// test readSingle
const readSingle = require("./readSingle");
test("readSingle passes for valid input", () => {
    expect(readSingle(JSON.parse(JSON.stringify(result, null, 2, true))), 50).toBe(true);
})

test("readSingle fails for invalid input", () => {
    expect(readSingle(200)).toBe(false);
})

// test readAll
const readAll = require("./readAll");
test("readAll passes for 25 tickets", () => {
    expect(readAll(JSON.parse(JSON.stringify(result, null, 2, true)))).toBe(true);
})

test("readSingle fails for 25 tickets", () => {
    expect(readAll(JSON.parse(JSON.stringify(result, null, 2, true)))).toBe(false);
})

// test next25
const test25 = require("./test25");
test("test25 passes for 25 tickets", () => {
    expect(test25(0, JSON.parse(JSON.stringify(result, null, 2, true)))).toBe(true);
})

test("test25 fails for 25 tickets", () => {
    expect(test25(102, JSON.parse(JSON.stringify(result, null, 2, true)))).toBe(false);
})