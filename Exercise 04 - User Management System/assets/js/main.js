document.addEventListener("DOMContentLoaded", function () {
  // 加载公共组件
  loadTemplate("sidebar", ".sidebar-container");
  loadTemplate("navbar", ".navbar-container");

  // 登录表单处理
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      window.location.href = "home.html";
    });
  }
});

function loadTemplate(templateName, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  fetch(`partials/${templateName}.html`)
    .then((response) => response.text())
    .then((html) => {
      container.innerHTML = html;
      const dropdowns = container.querySelectorAll(".dropdown-toggle");
      dropdowns.forEach((dropdown) => {
        new bootstrap.Dropdown(dropdown);
      });
    });
}
