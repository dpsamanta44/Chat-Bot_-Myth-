document.addEventListener("DOMContentLoaded", function () {
  const chatbox = document.getElementById("chatbox");
  const userInput = document.getElementById("userInput");

  function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message " + sender;
    msgDiv.textContent = (sender === "user" ? "You: " : "Myth: ") + text;
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  window.sendMessage = function () {
    const message = userInput.value.trim();
    if (!message) return;
    appendMessage(message, "user");
    userInput.value = "";

    fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        appendMessage(data.reply, "bot");
      })
      .catch(() => {
        appendMessage("Sorry, I couldn't reach the server.", "bot");
      });
  };

  userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
  });
});