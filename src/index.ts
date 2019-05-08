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
  withRepitition: boolean = true): number {
  if (numberOfElements < 0) {
    throw new Error(`Number of elements must be greater than or equal to 0. Received ${numberOfElements}.`);
  }
  if (numberOfSlots < 0) {
    throw new Error(`Number of slots must be greater than or equal to 0. Received ${numberOfSlots}.`);
  }
  if (withRepitition === true) {
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

export function numberOfCombinations(numberOfElements: number, size: number): number {
  if (numberOfElements < 0) {
    throw new Error(`Number of elements must be greater than or equal to 0. Received ${numberOfElements}.`);
  }
  if (size < 0) {
    throw new Error(`Size of combination must be greater than or equal to 0. Received ${size}.`);
  }
  if (size > numberOfElements) {
    throw new Error(`Size of combinations ${size} must be greater than or equal to number of elements ${numberOfElements}`);
  }
  return factorial(numberOfElements) / (factorial(size) * factorial(numberOfElements - size));
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

export function enumeratePermutations<T>(elements: T[], numberOfSlots: number = elements.length, withRepitition: boolean = true): T[][] {
  if (numberOfSlots < 0) {
    throw new Error(`Number of slots must be greater than or equal to 0. Received ${numberOfSlots}.`);
  }
  const distinct = distinctElements(elements);
  if (!withRepitition && numberOfSlots > distinct.length) {
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
          if (withRepitition || prev.indexOf(next) === -1) {
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
        for (let next of distinct) {
          if (distinct.indexOf(next) > distinct.indexOf(prev[pos - 1])) {
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

export function enumerateCombinations<T>(elements: T[], size: number): T[][] {
  if (size === 0) {
    return [[]];
  }
  if (size < 0) {
    throw new Error(`Size of combination must be greater than or equal to 0. Received ${size}.`);
  }
  const distinct = distinctElements(elements);
  if (size > distinct.length) {
    throw new Error(`Size of combinations ${size} must be greater than or equal to number of distinct elements ${distinct.length}`);
  }

  const levels = new Array<Array<Array<T>>>();
  for (let pos = 0; pos < size; pos++) {
    const level = new Array<Array<T>>();
    if (pos === 0) {
      distinct.forEach(x => level.push([x]));
    }
    else {
      for (let prev of levels[pos - 1]) {
        for (let next of distinct) {
          if (distinct.indexOf(next) > distinct.indexOf(prev[pos - 1])) {
            level.push([...prev, next]);
          }
        }
      }
    }
    levels.push(level);
  }

  return levels[size - 1];
}