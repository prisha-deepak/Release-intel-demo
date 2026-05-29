const locators = {
  employeeFilterInput: '[data-testid="employee-filter"]',
};

function filterEmployeesByDepartment(employees, department) {
  return employees.filter((employee) => employee.department === department);
}

function calculateWorkforceMetrics(employees) {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((employee) => employee.active).length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  return {
    totalEmployees,
    activeEmployees,
    inactiveEmployees,
  };
}

module.exports = {
  locators,
  filterEmployeesByDepartment,
  calculateWorkforceMetrics,
};
