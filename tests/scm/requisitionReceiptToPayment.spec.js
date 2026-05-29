const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  locators,
  validatePayment,
  processReceiptToPayment,
} = require('../../src/scm/requisitionReceiptToPayment');

describe('requisitionReceiptToPayment', () => {
  it('exposes global receipt search locator', () => {
    assert.equal(locators.receiptSearchInput, '[data-testid="receipt-global-search"]');
  });

  it('exposes partial payment checkbox locator', () => {
    assert.equal(
      locators.partialPaymentCheckbox,
      '[data-testid="allow-partial-payment"]',
    );
  });

  it('exposes payment validation message locator', () => {
    assert.equal(
      locators.validationMessage,
      '[data-testid="payment-validation-message"]',
    );
  });

  it('validates approved receipts with positive amount and currency', () => {
    const receipt = { amount: 100, status: 'APPROVED', currency: 'USD' };
    assert.equal(validatePayment(receipt), true);
  });

  it('blocks approved receipt when currency is missing', () => {
    const receipt = { amount: 100, status: 'APPROVED' };
    assert.equal(validatePayment(receipt), false);
    assert.equal(processReceiptToPayment(receipt), 'BLOCKED');
  });

  it('rejects non-approved receipts', () => {
    const receipt = { amount: 100, status: 'PENDING', currency: 'USD' };
    assert.equal(validatePayment(receipt), false);
  });

  it('rejects zero or negative amounts', () => {
    const receipt = { amount: 0, status: 'APPROVED', currency: 'USD' };
    assert.equal(validatePayment(receipt), false);
  });

  it('processes valid receipts as ready for payment', () => {
    const receipt = { amount: 250, status: 'APPROVED', currency: 'EUR' };
    assert.equal(processReceiptToPayment(receipt), 'READY_FOR_PAYMENT');
  });

  it('supports partial payment flow', () => {
    const receipt = {
      amount: 250,
      partialAmount: 100,
      status: 'APPROVED',
      currency: 'USD',
    };
    assert.equal(processReceiptToPayment(receipt), 'PARTIAL_PAYMENT');
  });

  it('blocks invalid receipts', () => {
    const receipt = { amount: 250, status: 'REJECTED', currency: 'USD' };
    assert.equal(processReceiptToPayment(receipt), 'BLOCKED');
  });
});
