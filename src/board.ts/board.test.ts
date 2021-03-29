import {
  actionDirections,
  checkIfCellIsOnEdge,
  createEdge,
  Edge,
  possibleDirections
} from "./board";

describe("Bit Board Test for n=5 square", () => {
  const LENGTH: number = 5;
  it("checks if TOP edge creation is correct", () => {
    const edge: number = createEdge(LENGTH, Edge.TOP);
    expect(edge.toString(2)).toBe("11111");
  });
  it("checks if RIGHT edge creation is correct", () => {
    const edge: number = createEdge(LENGTH, Edge.RIGHT);
    expect(edge.toString(2)).toBe("1000010000100001000010000");
  });
  it("checks if BOTTOM edge creation is correct", () => {
    const edge: number = createEdge(LENGTH, Edge.BOTTOM);
    expect(edge.toString(2)).toBe("1111100000000000000000000");
  });
  it("checks if LEFT edge creation is correct", () => {
    const edge: number = createEdge(LENGTH, Edge.LEFT);
    expect(edge.toString(2)).toBe("100001000010000100001");
  });
  it("checks if 1 is on left and top edge", () => {
    const leftEdge: number = createEdge(LENGTH, Edge.LEFT);
    const topEdge: number = createEdge(LENGTH, Edge.TOP);
    const FIRST_CELL_INDEX: number = 0;
    const isOneInCorner: boolean =
      checkIfCellIsOnEdge(FIRST_CELL_INDEX, leftEdge) &&
      checkIfCellIsOnEdge(FIRST_CELL_INDEX, topEdge);
    expect(isOneInCorner).toBe(true);
  });
  it("checks directional possibilities", () => {
    const directions: number[] = actionDirections(LENGTH);
    expect(directions).toEqual([-6, -5, -4, -1, 0, 1, 4, 5, 6]);
  });
  it("checks valid directions for various cells", () => {
    const directions: number[] = actionDirections(LENGTH);
    const cellsToCheck: number[] = [0, 4, 5, 6, 24, 23];
    const validDirections: number[][] = [];
    cellsToCheck.forEach((el: number) => {
      validDirections.push(possibleDirections(directions, el));
    });
    expect(validDirections[0]).toEqual([1, 5, 6]);
    expect(validDirections[1]).toEqual([-1, 4, 5]);
    expect(validDirections[2]).toEqual([-5, -4, 1, 5, 6]);
    expect(validDirections[3]).toEqual([-6, -5, -4, -1, 1, 4, 5, 6]);
    expect(validDirections[4]).toEqual([-6, -5, -1]);
    expect(validDirections[5]).toEqual([-6, -5, -4, -1, 1]);
  });
});
