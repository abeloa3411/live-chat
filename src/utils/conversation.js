import moment from "moment";

export const fomartMessage = (username, text) => {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
};
