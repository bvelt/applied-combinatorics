export function factorial(a: number): number {
  if (a < 0) {
    throw new Error(`Factorial of negative number ${a} is not defined`);
  }
  if (a === 0 || a === 1) {
    return 1;
  }
  return a * factorial(a - 1);
}

export function numberOfPermutations(numberOfElements: number,
  numberOfSlots: number = numberOfElements,
  withReplacement: boolean = true): number {
  if (numberOfElements < 0) {
    throw new Error(`Number of elements must be greater than or equal to 0. Received ${numberOfElements}.`);
  }
  if (numberOfSlots < 0) {
    throw new Error(`Number of slots must be greater than or equal to 0. Received ${numberOfSlots}.`);
  }
  if (withReplacement) {
    return numberOfElements ** numberOfSlots;
  }
  if (numberOfSlots > numberOfElements) {
    throw new Error(`Number of slots ${numberOfSlots} must be greater than or equal to number of elements ${numberOfElements} if elements cannot repeat`);
  }
  return factorial(numberOfElements) / factorial(numberOfElements - numberOfSlots);
}

export function numberOfSubsets(numberOfElements: number, allowEmptySet: boolean = true): number {
  if (numberOfElements < 0) {
    throw new Error(`Number of elements must be greater than or equal to 0. Received ${numberOfElements}.`);
  }
  let n: number = 2 ** numberOfElements;
  if (!allowEmptySet) {
    n--;
  }
  return n;
}

export function numberOfCombinations(numberOfElements: number,
  sizeOfCombination: number = numberOfElements,
  withReplacement: boolean = true): number {
  if (numberOfElements < 0) {
    throw new Error(`Number of elements must be greater than or equal to 0. Received ${numberOfElements}.`);
  }
  if (sizeOfCombination < 0) {
    throw new Error(`Size of combination must be greater than or equal to 0. Received ${sizeOfCombination}.`);
  }
  if (!withReplacement && sizeOfCombination > numberOfElements) {
    throw new Error(`Size of combinations ${sizeOfCombination} must be greater than or equal to number of elements ${numberOfElements} if elements cannot repeat`);
  }
  const n = withReplacement ? numberOfElements + sizeOfCombination - 1 : numberOfElements;
  return factorial(n) / (factorial(sizeOfCombination) * factorial(n - sizeOfCombination));
}

export function distinctElements<T>(elements: T[]): T[] {
  const distinct = Array<T>();
  for (let element of elements) {
    if (distinct.indexOf(element) === -1) {
      distinct.push(element);
    }
  }
  return distinct;
}

export function enumeratePermutations<T>(elements: T[],
  numberOfSlots: number = elements.length,
  withReplacement: boolean = true): T[][] {
  if (numberOfSlots < 0) {
    throw new Error(`Number of slots must be greater than or equal to 0. Received ${numberOfSlots}.`);
  }
  const distinct = distinctElements(elements);
  if (!withReplacement && numberOfSlots > distinct.length) {
    throw new Error(`Number of slots ${numberOfSlots} must be greater than or equal to number of distinct elements ${distinct.length} if elements cannot repeat`);
  }
  let levels = new Array<Array<Array<T>>>();
  for (let slot = 0; slot < numberOfSlots; slot++) {
    const level = new Array<Array<T>>();
    for (let next of elements) {
      if (slot === 0) {
        level.push([next]);
      }
      else {
        for (let prev of levels[slot - 1]) {
          if (withReplacement || prev.indexOf(next) === -1) {
            level.push([next].concat(prev))
          }
        }
      }
    }
    levels.push(level);
  }
  return levels[numberOfSlots - 1];
}

export function enumerateSubsets<T>(elements: T[], allowEmptySet: boolean = true): T[][] {
  const distinct = distinctElements(elements);
  const levels = new Array<Array<Array<T>>>();

  for (let pos = 0; pos < distinct.length; pos++) {
    const level = new Array<Array<T>>();
    if (pos === 0) {
      distinct.forEach(x => level.push([x]));
    }
    else {
      for (let prev of levels[pos - 1]) {
        const iprev = distinct.indexOf(prev[pos - 1]);
        for (let next of distinct) {
          if (distinct.indexOf(next) > iprev) {
            level.push([...prev, next]);
          }
        }
      }
    }
    levels.push(level);
  }

  if (allowEmptySet) {
    levels.unshift([new Array<T>()]);
  }

  return levels.flat();
}

export function enumerateCombinations<T>(elements: T[],
  sizeOfCombination: number = elements.length,
  withReplacement: boolean = true): T[][] {
  if (sizeOfCombination === 0) {
    return [[]];
  }
  if (sizeOfCombination < 0) {
    throw new Error(`Size of combination must be greater than or equal to 0. Received ${sizeOfCombination}.`);
  }
  const distinct = distinctElements(elements);
  if (!withReplacement && sizeOfCombination > distinct.length) {
    throw new Error(`Size of combination ${sizeOfCombination} must be greater than or equal to number of distinct elements ${distinct.length} if elements cannot repeat`);
  }

  const levels = new Array<Array<Array<T>>>();
  for (let pos = 0; pos < sizeOfCombination; pos++) {
    const level = new Array<Array<T>>();
    if (pos === 0) {
      distinct.forEach(x => level.push([x]));
    }
    else {
      for (let prev of levels[pos - 1]) {
        const iprev = distinct.indexOf(prev[pos - 1]);
        for (let next of distinct) {
          const inext = distinct.indexOf(next);
          if (inext > iprev || (withReplacement && inext === iprev)) {
            level.push([...prev, next]);
          }
        }
      }
    }
    levels.push(level);
  }
  return levels[sizeOfCombination - 1];
}