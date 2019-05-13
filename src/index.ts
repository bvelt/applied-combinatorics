export function factorial(n: number): number {
  if (n < 0) {
    throw new Error(`Factorial of negative number ${n} is not defined`);
  }
  let result = 1;
  for (let i = n; i > 1; i--) {
    result *= i;
  }
  return result;
}

export function numberOfPermutations(numberOfElements: number,
  length: number = numberOfElements,
  withReplacement: boolean = true): number {
  if (numberOfElements < 0) {
    throw new Error(`Number of elements must be greater than or equal to 0. Received ${numberOfElements}.`);
  }
  if (length < 0) {
    throw new Error(`Length of permutation must be greater than or equal to 0. Received ${length}.`);
  }
  if (withReplacement) {
    return numberOfElements ** length;
  }
  if (length > numberOfElements) {
    throw new Error(`Length of permutation ${length} must be greater than or equal to number of elements ${numberOfElements} if elements cannot repeat`);
  }
  return factorial(numberOfElements) / factorial(numberOfElements - length);
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
  length: number = numberOfElements,
  withReplacement: boolean = true): number {
  if (numberOfElements < 0) {
    throw new Error(`Number of elements must be greater than or equal to 0. Received ${numberOfElements}.`);
  }
  if (length < 0) {
    throw new Error(`Length of combination must be greater than or equal to 0. Received ${length}.`);
  }
  if (!withReplacement && length > numberOfElements) {
    throw new Error(`Length of combination ${length} must be greater than or equal to number of elements ${numberOfElements} if elements cannot repeat`);
  }
  const n = withReplacement ? numberOfElements + length - 1 : numberOfElements;
  return factorial(n) / (factorial(length) * factorial(n - length));
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
  length: number = elements.length,
  withReplacement: boolean = true): T[][] {
  if (length < 0) {
    throw new Error(`Length of permutation must be greater than or equal to 0. Received ${length}.`);
  }
  const distinct = distinctElements(elements);
  if (!withReplacement && length > distinct.length) {
    throw new Error(`Length of permutation ${length} must be greater than or equal to number of distinct elements ${distinct.length} if elements cannot repeat`);
  }
  let levels = new Array<Array<Array<T>>>();
  for (let slot = 0; slot < length; slot++) {
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
  return levels[length - 1];
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
  length: number = elements.length,
  withReplacement: boolean = true): T[][] {
  if (length === 0) {
    return [[]];
  }
  if (length < 0) {
    throw new Error(`Length of combination must be greater than or equal to 0. Received ${length}.`);
  }
  const distinct = distinctElements(elements);
  if (!withReplacement && length > distinct.length) {
    throw new Error(`Length of combination ${length} must be greater than or equal to number of distinct elements ${distinct.length} if elements cannot repeat`);
  }

  const levels = new Array<Array<Array<T>>>();
  for (let pos = 0; pos < length; pos++) {
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
  return levels[length - 1];
}

export function grayCodeOrder(length: number = 1): number[][] {
  if (length < 1) {
    throw new Error(`Gray code order of length ${length} undefined`);
  }
  let levels = new Array<Array<Array<number>>>();
  for (let i = 0; i < length; i++) {
    let level = new Array<Array<number>>();
    if (i === 0) {
      level.push([0]);
      level.push([1]);
    }
    else {
      const prev = levels[i - 1];
      for (let j = prev.length - 1; j >= 0; j--) {
        level.unshift([0].concat(prev[j]));
        level.push([1].concat(prev[j]));
      }
    }
    levels.push(level);
  }
  return levels[length - 1];
}

export function grayCodeOrderHavingOnes(length: number, numberOfOnes: number) {
  if (numberOfOnes < 0) {
    throw new Error(`Number of ones ${numberOfOnes} must be greater than or equal to zero`);
  }
  if (numberOfOnes > length) {
    throw new Error(`Number of ones ${numberOfOnes} must be less than or equal to length of code ${length}`);
  }
  return grayCodeOrder(length).filter(code => {
    return code.reduce((xs, x) => xs + x) === numberOfOnes;
  });
}