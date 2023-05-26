const chatForm = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const socket = io();

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

//join room
socket.emit("connectAgent", { username, room });

//get message from server
socket.on("message", (message) => {
  outputConversation(message);

  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//get room and users
socket.on("roomUsers", ({ room, user }) => {
  outputRoomName(room);
  outputUsers(user);
});

//message submit

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get message value
  const msg = e.target.elements.msg.value;

  //emit message to server
  socket.emit("conversation", msg);

  //clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputConversation(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.username;
  p.innerHTML += `<span> ${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = `
  ${users.map((user) => `<li>${user.username}</li>`).join("")}
  `;
}

//Prompt the user before leave chat room
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    window.location = "../index.html";
  } else {
  }
});
