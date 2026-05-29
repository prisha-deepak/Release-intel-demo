const locators = {
  receiptSearchInput: '[data-testid="receipt-search"]',
};

function validatePayment(receipt) {
  return receipt.amount > 0 && receipt.status === 'APPROVED';
}

function processReceiptToPayment(receipt) {
  if (validatePayment(receipt)) {
    return 'READY_FOR_PAYMENT';
  }
  return 'BLOCKED';
}

module.exports = {
  locators,
  validatePayment,
  processReceiptToPayment,
};
