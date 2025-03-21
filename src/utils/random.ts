export function getUniqueRandomIntegers(min: number, max: number, count: number = 9): number[] {
  if (max - min + 1 < count) {
    throw new Error("Range is too small to get unique numbers.");
  }

  const numbers = new Set<number>();
  while (numbers.size < count) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(randomNum);
  }

  return Array.from(numbers);
}
