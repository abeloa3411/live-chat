const chatForm = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

//join room
socket.emit("connectAgent", { username, room });

socket.on("message", (message) => {
  console.log(message);
  outputConversation(message);

  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
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
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);
}
