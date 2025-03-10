const USER_KEY = "users";
let users = JSON.parse(localStorage.getItem(USER_KEY)) || [
  { id: 1, username: "admin", email: "admin@example.com" },
  { id: 2, username: "tom", email: "tom@example.com" },
  { id: 3, username: "alan", email: "alan@example.com" },
  { id: 4, username: "jessica", email: "jessica@example.com" },
  { id: 5, username: "luck", email: "luck@example.com" },
];

function renderUsers() {
  const tbody = document.getElementById("userTable");
  tbody.innerHTML = users
    .map(
      (user) => `
        <tr data-id="${user.id}">
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-sm btn-primary edit-btn">编辑</button>
                <button class="btn btn-sm btn-danger delete-btn">删除</button>
            </td>
        </tr>
    `
    )
    .join("");

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", handleEdit);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", handleDelete);
  });
}

function saveUsers() {
  localStorage.setItem(USER_KEY, JSON.stringify(users));
}

document.getElementById("userForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    id: Number(document.getElementById("userId").value),
    username: document.getElementById("modalUsername").value.trim(),
    email: document.getElementById("modalEmail").value.trim(),
  };

  if (!user.username || !user.email) {
    alert("请填写完整信息");
    return;
  }

  if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(user.email)) {
    alert("请输入有效的邮箱地址");
    return;
  }

  if (user.id) {
    const index = users.findIndex((u) => u.id === user.id);
    users[index] = user;
  } else {
    user.id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    users.push(user);
  }

  saveUsers();
  renderUsers();
  bootstrap.Modal.getInstance(document.getElementById("userModal")).hide();
});

function handleEdit(e) {
  const userId = Number(e.target.closest("tr").dataset.id);
  const user = users.find((u) => u.id === userId);

  document.getElementById("modalTitle").textContent = "编辑用户";
  document.getElementById("userId").value = user.id;
  document.getElementById("modalUsername").value = user.username;
  document.getElementById("modalEmail").value = user.email;
  new bootstrap.Modal(document.getElementById("userModal")).show();
}

function handleDelete(e) {
  const userId = Number(e.target.closest("tr").dataset.id);
  const user = users.find((u) => u.id === userId);

  if (confirm(`确定要删除用户 ${user.username} 吗？`)) {
    users = users.filter((u) => u.id !== userId);
    saveUsers();
    renderUsers();
  }
}

document
  .querySelector('[data-bs-target="#userModal"]')
  .addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = "添加用户";
    document.getElementById("userForm").reset();
    document.getElementById("userId").value = "";
  });

document.addEventListener("DOMContentLoaded", () => {
  renderUsers();
});
