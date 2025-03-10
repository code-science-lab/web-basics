document.getElementById("search").addEventListener("input", function () {
  let filter = this.value.toLowerCase();
  let products = document.querySelectorAll(".product");

  products.forEach((product) => {
    let name = product.dataset.name.toLowerCase();
    product.style.display = name.includes(filter) ? "block" : "none";
  });
});
