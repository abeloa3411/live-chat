const users = [];

//join a user
export const userJoin = (id, username, room) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

//get the current user
export const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

//user leaves chat
export const userLeaves = (id) => {
  const index = users.find((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

//get room users
export const getRoomUser = (room) => {
  return users.filter((user) => user.room === room);
};
