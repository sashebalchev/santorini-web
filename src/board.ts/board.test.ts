import {
  actionDirections,
  checkIfCellIsOnEdge,
  createEdge,
  Edge,
  possibleDirections,
  fenChecker,
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

describe("Fen notation test", () => {
  it("checks if the fen checker will catch unsupported characters", () => {
    const fen1 = "2ff1=1ssst/4t/3ff/1ssf1 p 4p13 5P20";
    const fen2 = "2FF1/1ssst/4t/3ff/1ssf1 р 4p13 5P20";
    const fen3 = "2ff1/1ssSt/4t/3ff/1ssf1 p 4p13 5P20";
    const fen4 = "2ff1/1ssst/4t/3rR/1Ssf1 p 4p13 5P20";
    const fen5 = "2ff1|1ssst/4t/3ff/1ssf1 p 4p13 5@20";
    // Correct fen with all the supported characters
    const correctFen = "2ff1/1srrt/4t/3ff/1ssf1 p 4p13 5P20";
    expect(fenChecker(fen1)).toBe(false);
    expect(fenChecker(fen2)).toBe(false);
    expect(fenChecker(fen3)).toBe(false);
    expect(fenChecker(fen4)).toBe(false);
    expect(fenChecker(fen5)).toBe(false);
    expect(fenChecker(correctFen)).toBe(true);
  });
  it("checks if splitting works correctly", () => {
    const fen = "2ff1/1ssst/4t/3ff/1ssf1 p 4p13";
    const fen2 = "2ff1/1ssst/4t/3ff/1ssf1 p 4p13 2P12";
    expect(fenChecker(fen)).toBe(false);
    expect(fenChecker(fen2)).toBe(true);
  });
  it("checks if structures test is correct", () => {
    const fen = "2fff1/1ssst/4t/3ff/1ssf1 p 4p13 2P12";
    const fen2 = "5f/11111f/4t/3ff/1ssf1 p 4p13 2P12";
    expect(fenChecker(fen)).toBe(false);
    expect(fenChecker(fen2)).toBe(false);
  });
  it("checks if nextPlayer test is correct", () => {
    const fen = "2ff1/1srrt/4t/3ff/1ssf1 pp 4p13 5P20";
    const fen2 = "2ff1/1srrt/4t/3ff/1ssf1 s 4p13 5P20";
    const fen3 = "2ff1/1srrt/4t/3ff/1ssf1 P 4p13 5P20";
    expect(fenChecker(fen)).toBe(false);
    expect(fenChecker(fen2)).toBe(false);
    expect(fenChecker(fen3)).toBe(true);
  });
  it("checks if player pawn position test is correct", () => {
    const correctFen = "2ff1/1srrt/4t/3ff/1ssf1 p 4p13 5P20";
    const fen2 = "2ff1/1srrt/4t/3ff/1ssf1 p 13p13 5P20";
    const fen3 = "2ff1/1srrt/4t/3ff/1ssf1 p 4p13 5P26";
    const fen4 = "2ff1/1srrt/4t/3ff/1ssf1 p 4p13 5P4";
    const fen5 = "2ff1/1srrt/4t/3ff/1ssf1 p 4p13 5P";
    expect(fenChecker(fen2)).toBe(false);
    expect(fenChecker(fen3)).toBe(false);
    expect(fenChecker(fen4)).toBe(false);
    expect(fenChecker(fen5)).toBe(false);
    expect(fenChecker(correctFen)).toBe(true);
  });
  it("checks if player pawn positions and next player correlate", () => {
    const correctFen = "2ff1/1srrt/4t/3ff/1ssf1 p 0p0 5P20";
    const fen = "2ff1/1srrt/4t/3ff/1ssf1 P 0p0 5P20";
    expect(fenChecker(correctFen)).toBe(true);
    expect(fenChecker(fen)).toBe(false);
  });
});
