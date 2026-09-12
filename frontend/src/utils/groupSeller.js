// utils/groupBySeller.js
export function groupSeller(items) {
  const groups = {};
  items.forEach((item) => {
    const sellerId = item.product.seller?._id || "reshelf";
    const sellerName = item.product.seller?.displayName || "ReShelf";
    if (!groups[sellerId]) groups[sellerId] = { sellerName, items: [] };
    groups[sellerId].items.push(item);
  });
  return Object.values(groups);
}
