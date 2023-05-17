(function () {
  const app = document.querySelector(".app");
  const socket = io();

  let uname;

  app
    .querySelector(".join__screen #join__user")
    .addEventListener("click", () => {
      let username = app.querySelector(".join__screen #username").value;
      if (username.length == 0) {
        return;
      }
      socket.emit("username", username);

      uname = username;
      app.querySelector(".join__screen").classList.remove("active");
      app.querySelector(".chat__screen").classList.add("active");
    });

  app
    .querySelector(".chat__screen #send__message")
    .addEventListener("click", () => {
      let message = app.querySelector(".chat__screen #message__input").value;
      if (message.length == 0) {
        return;
      }
      renderMsg("my", {
        username: uname,
        text: message,
      });

      socket.emit("chat", {
        username: uname,
        text: message,
      });
      app.querySelector(".chat__screen #message__input").value = "";
    });
})();
