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
  it("number of permutations with repitition is equal to numberOfElements^numberOfSlots", () => {
    expect(comb.numberOfPermutations(2, 3)).toEqual(2 ** 3);
  });
  it("throws error if elements cannot repeat and number of slots is greater than number of elements", () => {
    expect(() => comb.numberOfPermutations(3, 4, false)).toThrow();
  });
  it("number of permutations without repitition is equal to numberOfElements!/(numberOfElements - numberOfSlots)!", () => {
    expect(comb.numberOfPermutations(4, 3, false)).toEqual(comb.factorial(4) / comb.factorial(4 - 3));
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
  it("throws error if size is greater than number of elements", () => {
    expect(() => comb.numberOfCombinations(3, 4)).toThrow();
  });
  it("number of combinations is equal to n!/r!(n-r)!", () => {
    expect(comb.numberOfCombinations(4, 3)).toEqual(4);
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
  it("enumerates permutations with repititions of correct size", () => {
    const permutations = comb.enumeratePermutations(elements);
    const size = comb.numberOfPermutations(elements.length);
    //console.log(permutations);
    expect(permutations.length).toEqual(size);
  });
  it("enumerates permutations without repititions of correct size", () => {
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
  it("returns original set when size is equal to size of elements", () => {
    const subsets = comb.enumerateCombinations(elements, elements.length);
    //console.log(subsets);
    expect(subsets).toEqual([elements]);
  });
  it("does not repeat elements with subset size less than size of elements", () => {
    const subsets = comb.enumerateCombinations(elements, 2);
    //console.log(subsets);
    expect(subsets).toEqual([['a', 'b'], ['a', 'c'], ['b', 'c']]);
  });
  it("returns empty set if size is equal to zero", () => {
    const subsets = comb.enumerateCombinations(elements, 0);
    expect(subsets).toEqual([[]]);
  });
  it("throws error if size is negative", () => {
    expect(() => comb.enumerateCombinations(elements, -1)).toThrow();
  });
  it("throws error if size is greater than number of elements", () => {
    expect(() => comb.enumerateCombinations(elements, 5)).toThrow();
    expect(() => comb.enumerateCombinations(elements.concat(elements), 5)).toThrow();
  });
});

