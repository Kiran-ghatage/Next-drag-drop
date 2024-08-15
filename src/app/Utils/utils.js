export const isUserExists = (usrs, newUser) => {
  return usrs.some(
    (user) =>
      user?.userId === newUser?.userId &&
      user?.employeeNumber === newUser?.employeeNumber
  );
};
