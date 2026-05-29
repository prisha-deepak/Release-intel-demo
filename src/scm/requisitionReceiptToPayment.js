const locators = {
  receiptSearchInput: '[data-testid="receipt-global-search"]',
  partialPaymentCheckbox: '[data-testid="allow-partial-payment"]',
  validationMessage: '[data-testid="payment-validation-message"]',
};

function isValidCurrency(currency) {
  return typeof currency === 'string' && /^[A-Za-z]{3}$/.test(currency);
}

function validatePayment(receipt) {
  return (
    receipt.amount > 0 &&
    receipt.status === 'APPROVED' &&
    isValidCurrency(receipt.currency)
  );
}

function processReceiptToPayment(receipt) {
  if (!validatePayment(receipt)) {
    return 'BLOCKED';
  }

  if (
    receipt.partialAmount != null &&
    receipt.partialAmount > 0 &&
    receipt.partialAmount < receipt.amount
  ) {
    return 'PARTIAL_PAYMENT';
  }

  return 'READY_FOR_PAYMENT';
}

module.exports = {
  locators,
  validatePayment,
  processReceiptToPayment,
};
