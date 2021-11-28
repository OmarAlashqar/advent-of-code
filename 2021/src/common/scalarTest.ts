// simple assertion that only works with scalar types since equality check is simple
export default <T>(label: string, actual: T, expected: T): boolean => {
  const pass = actual === expected;
  console.log(`${label}:`, pass ? '✔' : '❌');
  if (!pass) console.log(`  Expected: ${expected} | Actual: ${actual}`);
  return pass;
};
