// 模拟获取商品数据（使用 Promise）
export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "苹果", price: 5 },
        { id: 2, name: "香蕉", price: 3 },
        { id: 3, name: "橙子", price: 4 },
      ]);
    }, 1000);
  });
};
