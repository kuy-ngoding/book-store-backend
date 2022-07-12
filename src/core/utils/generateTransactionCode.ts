export function generateTransactionCode(userId: string): string {
  const userIdLast4Digit = userId.slice(-4);

  const transactionCode = 'T' + userIdLast4Digit + '-' + Date.now();
  return transactionCode;
}
