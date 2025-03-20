export class Cart {
  constructor() {
    this.items = [];
  }

  // 添加商品（使用数组操作）
  addItem(product, quantity = 1) {
    const existingItem = this.items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }
  }

  // 删除商品（使用 filter）
  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
  }

  // 计算总价（使用 reduce）
  calculateTotal() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // 获取商品列表（返回副本避免直接修改）
  getItems() {
    return [...this.items];
  }
}
