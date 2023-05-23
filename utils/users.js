const users = [];

export const userJoin = (id, username, room) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

export const getCurrentUser = (id) => {
  return users.find((user) => (user.id = id));
};
