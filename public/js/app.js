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

      //make a post request to the server to save the name of the client
      // console.log(uname);

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

  app
    .querySelector(".chat__screen #exit__chat")
    .addEventListener("click", () => {
      socket.emit("exituser", uname);
      window.location.href = window.location.href;
    });

  socket.on("update", (update) => {
    renderMsg("update", update);
  });

  socket.on("chat", (message) => {
    renderMsg("other", message);
  });

  //function to render messages
  function renderMsg(type, msg) {
    let msgContainer = document.querySelector(".chat__screen .messages");

    if (type == "my") {
      let el = document.createElement("div");
      el.setAttribute("class", "message my__message");
      el.innerHTML = `
            <div>
                <div class="name">you</div>
                <div class="text">${msg.text}</div>
            </div>
            
            `;
      msgContainer.appendChild(el);
    } else if (type == "other") {
      let el = document.createElement("div");
      el.setAttribute("class", "message other__message");
      el.innerHTML = `
            <div class="message my__message">
                <div class="name">${msg.username}</div>
                <div class="text">${msg.text}</div>
            </div>
            
            `;

      msgContainer.appendChild(el);
    } else if (type == "update") {
      let el = document.createElement("div");
      el.setAttribute("class", "update");
      el.innerText = msg;

      msgContainer.appendChild(el);
    }
    //scroll chat to end

    msgContainer.scrollTop =
      msgContainer.scrollHeight - msgContainer.clientHeight;
  }
})();
