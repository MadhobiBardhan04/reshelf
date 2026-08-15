import { CATEGORIES, CONDITIONS } from "./constants";
const products = [
  {
    id: 1,
    name: "Calculator",

    price: 1500,
    condition: "Used",
    category: "Calculators",
    images: [
      "https://images.unsplash.com/photo-1574607383077-47ddc2dc51c4?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 2,
    name: "Tablet",
    price: 10000,
    condition: "Used",
    category: "Phones & Tablets",
    images: [
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 3,
    name: "Dell Laptop ",
    price: 30000,
    condition: "Used",
    category: "Laptops and Computers",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://www.ryans.com/storage/products/main/dell-latitude-14-3420-intel-core-i3-1005g-14-inch-11633503011.webp",
    ],
  },
  {
    id: 4,
    name: "Engineering Mathematics",
    price: 200,
    condition: "Gently used",
    category: "Books",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSozcb71HXrZLIZx7XOP1DgWa5fEy75gZNghh4EOOfh1TUcLT3SOsSKBZs&s=10",
    ],
  },
  {
    id: 5,
    name: "Mechanical kit",
    condition: "Used",
    category: "Lab & Engineeering tools",
    price: 500,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwzwwo4W8U0aUbXCj6davUInvtQAfI-pQrSNnXhwKE13ciXozpC8VAU_Hd&s=10",
    ],
  },
  {
    id: 6,
    name: "HSC books",
    condition: "Used",
    category: "Books",
    price: 1000,
    images: [
      "https://rokbucket.rokomari.io/ProductNew20190903/260X372/HSC_1st_year_Biggan_Bivager_Jonopriyo_Le-Dr_Shahjahan_Tapan-238ea-270588.jpg",
    ],
  },
  {
    id: 7,
    name: "Folding Table",
    category: "Furniture",
    condition: "New",
    price: 300,
    images: [
      "https://my-live-01.slatic.net/p/1ae425257297205bc4ab21399cf72ddc.jpg",
    ],
  },
  {
    id: 8,
    name: "CSE book",
    condition: "Used",
    category: "Books",
    price: 200,
    images: [
      "https://static-01.daraz.com.bd/p/006b90c7d219956d1e78baccfbf8fba2.jpg",
    ],
  },
];

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}
