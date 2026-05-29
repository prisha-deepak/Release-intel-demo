const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  locators,
  filterEmployeesByDepartment,
  calculateWorkforceMetrics,
} = require('../../src/hcm/employeeInsightsToWorkforce');

const employees = [
  { id: 1, department: 'Finance', active: true, employmentType: 'FULL_TIME' },
  { id: 2, department: 'Finance', active: false, employmentType: 'FULL_TIME' },
  { id: 3, department: 'Engineering', active: true, employmentType: 'CONTRACTOR' },
  { id: 4, department: 'Engineering', active: true, employmentType: 'FULL_TIME' },
];

describe('employeeInsightsToWorkforce', () => {
  it('exposes employee filter v2 locator', () => {
    assert.equal(locators.employeeFilterInput, '[data-testid="employee-filter-v2"]');
  });

  it('exposes employment type dropdown locator', () => {
    assert.equal(
      locators.employmentTypeDropdown,
      '[data-testid="employment-type-dropdown"]',
    );
  });

  it('exposes data accuracy badge locator', () => {
    assert.equal(locators.accuracyBadge, '[data-testid="data-accuracy-badge"]');
  });

  it('filters employees by department', () => {
    const financeEmployees = filterEmployeesByDepartment(employees, 'Finance');
    assert.equal(financeEmployees.length, 2);
    assert.ok(financeEmployees.every((employee) => employee.department === 'Finance'));
  });

  it('filters active employees when onlyActive is enabled', () => {
    const activeFinanceEmployees = filterEmployeesByDepartment(employees, 'Finance', {
      onlyActive: true,
    });
    assert.equal(activeFinanceEmployees.length, 1);
    assert.equal(activeFinanceEmployees[0].id, 1);
  });

  it('calculates workforce metrics including contractors and active percentage', () => {
    const metrics = calculateWorkforceMetrics(employees);
    assert.deepEqual(metrics, {
      totalEmployees: 4,
      activeEmployees: 3,
      inactiveEmployees: 1,
      contractorEmployees: 1,
      activePercentage: 75,
    });
  });
});
