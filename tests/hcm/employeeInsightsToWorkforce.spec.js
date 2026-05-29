const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  locators,
  filterEmployeesByDepartment,
  calculateWorkforceMetrics,
} = require('../../src/hcm/employeeInsightsToWorkforce');

const employees = [
  { id: 1, department: 'Finance', active: true },
  { id: 2, department: 'Finance', active: false },
  { id: 3, department: 'Engineering', active: true },
  { id: 4, department: 'Engineering', active: true },
];

describe('employeeInsightsToWorkforce', () => {
  it('exposes employee filter locator', () => {
    assert.equal(locators.employeeFilterInput, '[data-testid="employee-filter"]');
  });

  it('filters employees by department', () => {
    const financeEmployees = filterEmployeesByDepartment(employees, 'Finance');
    assert.equal(financeEmployees.length, 2);
    assert.ok(financeEmployees.every((employee) => employee.department === 'Finance'));
  });

  it('calculates workforce metrics', () => {
    const metrics = calculateWorkforceMetrics(employees);
    assert.deepEqual(metrics, {
      totalEmployees: 4,
      activeEmployees: 3,
      inactiveEmployees: 1,
    });
  });
});
