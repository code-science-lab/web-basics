import { fetchProducts } from "./api";
import { Cart } from "./cart";
import "./styles.css";

// 引入 Bootstrap 的 CSS 文件
import "bootstrap/dist/css/bootstrap.min.css";

// 引入 Bootstrap 的 JS 文件
import "bootstrap";

// 初始化购物车
const cart = new Cart();

// 全局变量（注意：实际项目中应避免过多全局变量，这里为简化示例）
let products = [];

// DOM 操作
const renderProducts = async () => {
  products = await fetchProducts();
  const productList = document.getElementById("product-list");

  // 使用模板字符串生成 HTML
  productList.innerHTML = products
    .map(
      (product) => `
    <div class="product">
      <h3>${product.name}</h3>
      <p>价格：¥${product.price}</p>
      <button class="btn btn-primary" onclick="addToCart(${product.id})">加入购物车</button>
    </div>
  `
    )
    .join("");
};

// 全局函数（实际项目应避免，这里简化演示）
window.addToCart = (productId) => {
  const product = products.find((p) => p.id === productId);
  cart.addItem(product);
  updateCartDisplay();
};

const updateCartDisplay = () => {
  const cartItems = document.getElementById("cart-items");
  const total = document.getElementById("total-price");

  // 使用解构和 map
  cartItems.innerHTML = cart
    .getItems()
    .map(
      ({ id, name, price, quantity }) => `
    <li>
      ${name} × ${quantity} 
      <button class="btn btn-danger" onclick="removeFromCart(${id})">删除</button>
    </li>
  `
    )
    .join("");

  total.textContent = `总价：¥${cart.calculateTotal()}`;
};

window.removeFromCart = (productId) => {
  cart.removeItem(productId);
  updateCartDisplay();
};

// 初始化渲染
renderProducts();
