export const isUserExists = (usrs, newUser) => {
  return usrs.some(
    (user) =>
      user?.userId === newUser?.userId &&
      user?.employeeNumber === newUser?.employeeNumber
  );
};

export const searchEmployees = (searchTerm, employees) => {
  if (searchTerm?.length > 1 && employees?.length > 0) {
    // Filter the employees based on the search term
    const filteredEmployees = employees.filter((employee) => {
      // Check if the search term is in the firstName or skills
      let skillsMatch;
      if (employee?.skills) {
        skillsMatch = employee?.skills
          .split(" ")
          .some((skill) => skill.includes(searchTerm));
      }
      const firstAndLastName =
        `${employee.firstName.toLowerCase()} ${employee.lastName.toLowerCase()}`.includes(
          searchTerm
        );
      const firstNameMatch = employee.firstName
        .toLowerCase()
        .includes(searchTerm);
      const lastNameMatch = employee.lastName
        .toLowerCase()
        .includes(searchTerm);

      return skillsMatch || firstNameMatch || lastNameMatch || firstAndLastName;
    });
    return filteredEmployees;
  }
};

export const filterTables = (query, data) => {
  const lowerCaseQuery = query.toLowerCase();
  const result = data.filter((item) => {
    // Check if any stateInfo matches the query
    const stateInfoMatches = item.stateInfo.some((state) => {
      const userInfo = state.userInfo;
      if (userInfo) {
        return (
          userInfo.name.toLowerCase().includes(lowerCaseQuery) ||
          userInfo.employeeNumber.toString().includes(lowerCaseQuery) ||
          state.name.toLowerCase().includes(lowerCaseQuery)
        );
      } else {
        return state.name.toLowerCase().includes(lowerCaseQuery);
      }
    });

    return stateInfoMatches;
  });
  return result;
};
