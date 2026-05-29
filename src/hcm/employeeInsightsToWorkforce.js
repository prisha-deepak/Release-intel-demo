const locators = {
  employeeFilterInput: '[data-testid="employee-filter-v2"]',
  employmentTypeDropdown: '[data-testid="employment-type-dropdown"]',
  accuracyBadge: '[data-testid="data-accuracy-badge"]',
};

function filterEmployeesByDepartment(employees, department, options = {}) {
  let filtered = employees.filter((employee) => employee.department === department);

  if (options.onlyActive) {
    filtered = filtered.filter((employee) => employee.active);
  }

  return filtered;
}

function calculateWorkforceMetrics(employees) {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((employee) => employee.active).length;
  const inactiveEmployees = totalEmployees - activeEmployees;
  const contractorEmployees = employees.filter(
    (employee) => employee.employmentType === 'CONTRACTOR',
  ).length;
  const activePercentage =
    totalEmployees === 0 ? 0 : Math.round((activeEmployees / totalEmployees) * 100);

  return {
    totalEmployees,
    activeEmployees,
    inactiveEmployees,
    contractorEmployees,
    activePercentage,
  };
}

module.exports = {
  locators,
  filterEmployeesByDepartment,
  calculateWorkforceMetrics,
};
