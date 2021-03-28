import { createEdge } from "./board";

describe("Bit Board Tests", () => {
  it("checks if TOP edge creation is correct", () => {
    const edge = createEdge(5, 0);
    expect(edge).toBe('11111');
  });
  it("checks if RIGHT edge creation is correct", () => {
    const edge = createEdge(5, 1);
    expect(edge).toBe('1000010000100001000010000');
  });
  it("checks if BOTTOM edge creation is correct", () => {
    const edge = createEdge(5, 2);
    expect(edge).toBe('1111100000000000000000000');
  });
  it("checks if Left edge creation is correct", () => {
    const edge = createEdge(5, 3);
    expect(edge).toBe('100001000010000100001');
  });
});
