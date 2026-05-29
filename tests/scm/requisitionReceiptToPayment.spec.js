const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  locators,
  validatePayment,
  processReceiptToPayment,
} = require('../../src/scm/requisitionReceiptToPayment');

describe('requisitionReceiptToPayment', () => {
  it('exposes receipt search locator', () => {
    assert.equal(locators.receiptSearchInput, '[data-testid="receipt-search"]');
  });

  it('validates approved receipts with positive amount', () => {
    const receipt = { amount: 100, status: 'APPROVED' };
    assert.equal(validatePayment(receipt), true);
  });

  it('rejects non-approved receipts', () => {
    const receipt = { amount: 100, status: 'PENDING' };
    assert.equal(validatePayment(receipt), false);
  });

  it('rejects zero or negative amounts', () => {
    const receipt = { amount: 0, status: 'APPROVED' };
    assert.equal(validatePayment(receipt), false);
  });

  it('processes valid receipts as ready for payment', () => {
    const receipt = { amount: 250, status: 'APPROVED' };
    assert.equal(processReceiptToPayment(receipt), 'READY_FOR_PAYMENT');
  });

  it('blocks invalid receipts', () => {
    const receipt = { amount: 250, status: 'REJECTED' };
    assert.equal(processReceiptToPayment(receipt), 'BLOCKED');
  });
});
