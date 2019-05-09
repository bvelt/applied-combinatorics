import * as comb from "./index";

describe("factorial", () => {
  it("rejects negative number as argument", () => {
    expect(() => comb.factorial(-1)).toThrow();
  });
  it("returns 1 for 0 as argument", () => {
    expect(comb.factorial(0)).toEqual(1);
  });
  it("returns 1 for 1 as argument", () => {
    expect(comb.factorial(1)).toEqual(1);
  });
  it("returns correct answer for arguments greater than 1", () => {
    let last = 1;
    for (let i = 2; i < 10; i++) {
      let next = comb.factorial(i);
      expect(next).toEqual(last * i);
      last = next;
    }
  });
});

describe("numberOfPermutations", () => {
  it("throws error if number of slots or elements is negative", () => {
    expect(() => comb.numberOfPermutations(-1)).toThrow();
    expect(() => comb.numberOfPermutations(1, -1)).toThrow();
  });
  it("number of permutations without replacement P(n, r) is equal to n!/(n - r)!", () => {
    expect(comb.numberOfPermutations(4, 3, false)).toEqual(comb.factorial(4) / comb.factorial(4 - 3));
  });
  it("number of permutations with replacement Pr(n, r) is equal to n^r", () => {
    expect(comb.numberOfPermutations(2, 3)).toEqual(2 ** 3);
  });
  it("throws error if elements cannot repeat and number of slots is greater than number of elements", () => {
    expect(() => comb.numberOfPermutations(3, 4, false)).toThrow();
  });
});

describe("numberOfSubsets", () => {
  it("throws error if number of elements is negative", () => {
    expect(() => comb.numberOfSubsets(-1)).toThrow();
  });
  it("number of subsets (including empty set) is equal to 2^numberOfElements", () => {
    expect(comb.numberOfSubsets(3)).toEqual(2 ** 3);
  });
  it("number of subsets (excluding empty set) is equal to 2^numberOfElements - 1", () => {
    expect(comb.numberOfSubsets(3, false)).toEqual((2 ** 3) - 1);
  });
});

describe("numberOfCombinations", () => {
  it("throws error if number of elements or size is negative", () => {
    expect(() => comb.numberOfCombinations(-1, 4)).toThrow();
    expect(() => comb.numberOfCombinations(4, -1)).toThrow();
  });
  it("throws error if elements cannot repeat and size is greater than number of elements", () => {
    expect(() => comb.numberOfCombinations(3, 4, false)).toThrow();
  });
  it("number of combinations C(n, r) without replacement is equal to n!/r!(n-r)!", () => {
    expect(comb.numberOfCombinations(4, 3, false)).toEqual(4);
  });
  it("number of combinations with replacement Cr(n, r) is equal to C(n + r - 1, r)", () => {
    expect(comb.numberOfCombinations(4, 3, true)).toEqual(comb.numberOfCombinations(4 + 3 - 1, 3, false));
  });
});

describe("distinctElements", () => {
  it("should return copy of original array if all elements are unique", () => {
    const elements = ['a', 'b', 'c'];
    expect(comb.distinctElements(elements)).toEqual(elements);
  });
  it("should return remove duplicate elements of original array", () => {
    const elements = ['a', 'b', 'c'];
    expect(comb.distinctElements(elements.concat(elements))).toEqual(elements);
  });
})

describe("enumeratePermutations", () => {
  const elements = ['a', 'b', 'c'];
  it("throws error if number of slots is negative", () => {
    expect(() => comb.enumeratePermutations(elements, -1)).toThrow();
  });
  it("throws error if slots is greater than number of elements and elements cannot repeat", () => {
    expect(() => comb.enumeratePermutations(elements, 5, false)).toThrow();
    expect(() => comb.enumeratePermutations(elements.concat(elements), 5, false)).toThrow();
  });
  it("enumerates permutations with replacements of correct size", () => {
    const permutations = comb.enumeratePermutations(elements);
    const size = comb.numberOfPermutations(elements.length);
    //console.log(permutations);
    expect(permutations.length).toEqual(size);
  });
  it("enumerates permutations without replacements of correct size", () => {
    const permutations = comb.enumeratePermutations(elements, elements.length, false);
    const size = comb.numberOfPermutations(elements.length, elements.length, false);
    //console.log(permutations);
    expect(permutations.length).toEqual(size);
  });
});

describe("enumerateSubsets", () => {
  const elements = ['a', 'b', 'c'];
  it("enumerates subsets with empty set", () => {
    const subsets = comb.enumerateSubsets(elements);
    //console.log(subsets);
    expect(subsets.length).toEqual(comb.numberOfSubsets(elements.length));
  });
  it("enumerates subsets without empty set", () => {
    const subsets = comb.enumerateSubsets(elements, false);
    //console.log(subsets);
    expect(subsets.length).toEqual(comb.numberOfSubsets(elements.length, false));
  });
});

describe("enumerateCombinations", () => {
  const elements = ['a', 'b', 'c'];
  it("returns original set when size is equal to size of elements and elements cannot repeat", () => {
    const subsets = comb.enumerateCombinations(elements, elements.length, false);
    //console.log(subsets);
    expect(subsets).toEqual([elements]);
  });
  it("does not repeat elements when replacement is not allowed", () => {
    const subsets = comb.enumerateCombinations(elements, 2, false);
    //console.log(subsets);
    expect(subsets).toEqual([['a', 'b'], ['a', 'c'], ['b', 'c']]);
  });
  it("repeats elements when replacement is allowed", () => {
    const subsets = comb.enumerateCombinations(elements, 2, true);
    //console.log(subsets);
    expect(subsets.length).toEqual(comb.numberOfCombinations(elements.length, 2, true));
    expect(subsets).toEqual([['a', 'a'], ['a', 'b'], ['a', 'c'], ['b', 'b'], ['b', 'c'], ['c', 'c']]);
  });
  it("returns empty set if size is equal to zero", () => {
    const subsets = comb.enumerateCombinations(elements, 0, false);
    expect(subsets).toEqual([[]]);
  });
  it("throws error if size is negative", () => {
    expect(() => comb.enumerateCombinations(elements, -1)).toThrow();
  });
  it("throws error if size is greater than number of elements and elements cannot repeat", () => {
    expect(() => comb.enumerateCombinations(elements, 5, false)).toThrow();
    expect(() => comb.enumerateCombinations(elements.concat(elements), 5, false)).toThrow();
  });
});

describe("grayCodeOrder", () => {
  it("throws error if length is less than 1", () => {
    expect(() => comb.grayCodeOrder(0)).toThrow();
  });
  it("generates first gray code order correctly", () => {
    expect(comb.grayCodeOrder(1)).toEqual([[0], [1]]);
  });
  it("generates second gray code order correctly", () => {
    const result = comb.grayCodeOrder(2);
    //console.log(result);
    expect(result).toEqual([[0, 0], [0, 1], [1, 1], [1, 0]]);
  });
  it("generates third gray code order correctly", () => {
    const actual = comb.grayCodeOrder(3);
    const expected = [[0, 0, 0],
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 0]];
    //console.log(actual);
    expect(actual).toEqual(expected);
  });
});

describe("grayCodeOrderHavingOnes", () => {
  it("throws error if numberOfOnes is less than 0", () => {
    expect(() => comb.grayCodeOrderHavingOnes(4, -1)).toThrow();
  });
  it("throws error if numberOfOnes is greater than length of code", () => {
    expect(() => comb.grayCodeOrderHavingOnes(4, 5)).toThrow();
  });
  it("generates third gray code order with number of ones correctly", () => {
    const order = [[0, 0, 0], // 0
    [0, 0, 1], // 1
    [0, 1, 1], // 2
    [0, 1, 0], // 3
    [1, 1, 0], // 4
    [1, 1, 1], // 5
    [1, 0, 1], // 6
    [1, 0, 0]]; // 7
    const expected = [
      [order[0]], // 0 1's
      [order[1], order[3], order[7]], // 1 1's
      [order[2], order[4], order[6]], // 2 1's
      [order[5]] // 3 1's
    ];
    for (let i = 0; i < 3; i++) {
      const actual = comb.grayCodeOrderHavingOnes(3, i);
      //console.log(actual);
      expect(actual).toEqual(expected[i]);
    }
  })
});
