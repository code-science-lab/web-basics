document
  .getElementById("messageForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // 阻止默认提交

    let username = document.getElementById("username").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!username || !message) {
      alert("请填写完整信息！");
      return;
    }

    let newMessage = { username, message };

    // 读取 LocalStorage 中的留言列表
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(messages));

    displayMessages();
    document.getElementById("messageForm").reset();
  });

// 显示留言
function displayMessages() {
  let messages = JSON.parse(localStorage.getItem("messages")) || [];
  let messageList = document.getElementById("messageList");
  messageList.innerHTML = messages
    .map((msg) => `<li><strong>${msg.username}：</strong>${msg.message}</li>`)
    .join("");
}

// 页面加载时显示已存储的留言
displayMessages();
