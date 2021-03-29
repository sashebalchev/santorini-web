import { toBinary } from "./helpers";

describe("Test Helper Functions", () => {
  it("checks if binary to string with padded zeroes function works properly", () => {
    const binaryNumbers: number[] = [0b1, 0b1000, 0b01010101, 0b0];
    const convertedBinaryNumbersWithNinePadding: string[] = [];
    binaryNumbers.forEach((num: number) => {
      convertedBinaryNumbersWithNinePadding.push(toBinary(num, 9));
    });
    expect(convertedBinaryNumbersWithNinePadding[0]).toBe("000000001");
    expect(convertedBinaryNumbersWithNinePadding[1]).toBe("000001000");
    expect(convertedBinaryNumbersWithNinePadding[2]).toBe("001010101");
    expect(convertedBinaryNumbersWithNinePadding[3]).toBe("000000000");
  });
});
