import { CATEGORIES, CONDITIONS } from "./constants";

const products = [
  {
    id: 1,
    name: "Calculator",
    price: 1500,
    condition: "Used",
    category: "Calculators",
    subcategory: "Basic Calculators",
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
    subcategory: "Tablets",
    images: [
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },

  {
    id: 3,
    name: "Dell Laptop",
    price: 30000,
    condition: "Used",
    category: "Laptops and Computers",
    subcategory: "Laptops",
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
    subcategory: "Academic Books",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSozcb71HXrZLIZx7XOP1DgWa5fEy75gZNghh4EOOfh1TUcLT3SOsSKBZs&s=10",
    ],
  },

  {
    id: 5,
    name: "Mechanical Kit",
    price: 500,
    condition: "Used",
    category: "Lab & Engineering Tools",
    subcategory: "Lab Equipment",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwzwwo4W8U0aUbXCj6davUInvtQAfI-pQrSNnXhwKE13ciXozpC8VAU_Hd&s=10",
    ],
  },

  {
    id: 6,
    name: "HSC Books",
    price: 1000,
    condition: "Used",
    category: "Books",
    subcategory: "Admission & Preparation Books",
    images: [
      "https://rokbucket.rokomari.io/ProductNew20190903/260X372/HSC_1st_year_Biggan_Bivager_Jonopriyo_Le-Dr_Shahjahan_Tapan-238ea-270588.jpg",
    ],
  },

  {
    id: 7,
    name: "Folding Table",
    price: 300,
    condition: "New",
    category: "Furniture",
    subcategory: "Study Tables",
    images: [
      "https://my-live-01.slatic.net/p/1ae425257297205bc4ab21399cf72ddc.jpg",
    ],
  },

  {
    id: 8,
    name: "CSE Book",
    price: 200,
    condition: "Used",
    category: "Books",
    subcategory: "Department Books",
    images: [
      "https://static-01.daraz.com.bd/p/006b90c7d219956d1e78baccfbf8fba2.jpg",
    ],
  },

  {
    id: 9,
    name: "Data Structures & Algorithms",
    price: 450,
    condition: "Gently used",
    category: "Books",
    subcategory: "Department Books",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefB3Lf7I6-L7E_YeWNN4dBsLHQAEG4rweT398o-B2enNkW8axsxwWRKpS&s=10",
    ],
  },

  {
    id: 10,
    name: "Database Management Systems",
    price: 400,
    condition: "Used",
    category: "Books",
    subcategory: "Department Books",
    images: [
      "https://rokbucket.rokomari.io/ProductNew20190903/260X372/Database_Management_Systems_DBMS-Rajiv_Chopra-b2c81-333881.jpg",
    ],
  },

  {
    id: 11,
    name: "Calculus & Analytical Geometry",
    price: 350,
    condition: "Used",
    category: "Books",
    subcategory: "Academic Books",
    images: [
      "https://imgv2-1-f.scribdassets.com/img/document/541083164/original/fe2834874c/1?v=1",
    ],
  },

  {
    id: 12,
    name: "University Admission Guide",
    price: 250,
    condition: "Gently used",
    category: "Books",
    subcategory: "Admission & Preparation Books",
    images: [
      "https://rokbucket.rokomari.io/ProductNew20190903/260X372/Phoenix_Private_University_Admission_Pre-Shadman_Taqi_-37dd4-478710.png",
    ],
  },

  {
    id: 13,
    name: "Previous Year Question Bank",
    price: 150,
    condition: "Used",
    category: "Books",
    subcategory: "Notes & Study Materials",
    images: [
      "https://imgv2-1-f.scribdassets.com/img/document/481946951/original/58f404914e/1?v=1",
    ],
  },

  {
    id: 14,
    name: "HP EliteBook 840 G5 core i5 8th Gen 256GB Laptop",
    price: 28000,
    condition: "Used",
    category: "Laptops and Computers",
    subcategory: "Laptops",
    images: [
      "https://cdn.bdstall.com/product-image/419077_600X600.jpg",
    ],
  },

  {
    id: 15,
    name: "ASUS Gaming Laptop",
    price: 55000,
    condition: "Used",
    category: "Laptops and Computers",
    subcategory: "Gaming Laptops",
    images: [
      "https://cyberbull.com.bd/wp-content/uploads/2025/10/52157-large_default-003-1.jpg",
    ],
  },

  {
    id: 16,
    name: "Dell Monitor",
    price: 8500,
    condition: "Used",
    category: "Laptops and Computers",
    subcategory: "Laptops",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4hgYfaoEl7RIgx3AMATJvJoxPXwGPig6Eeom6tTMRw&s=10",
    ],
  },

  {
    id: 17,
    name: "Wireless Keyboard & Mouse",
    price: 1200,
    condition: "Gently used",
    category: "Laptops and Computers",
    subcategory: "Computer Accessories",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQad0Svbeg21RyLkgsiAlTgdhotNBzN7jkDyT5M0cqcDA&s=10",
    ],
  },

  {
    id: 18,
    name: "External SSD 512GB",
    price: 4500,
    condition: "Used",
    category: "Laptops and Computers",
    subcategory: "Computer Accessories",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThgUkRAUuGdOElb8680sbiheEJXBGA7xg6lZLVDlEZKA&s=10",
    ],
  },

  {
    id: 19,
    name: "Samsung Galaxy Phone",
    price: 18000,
    condition: "Used",
    category: "Phones & Tablets",
    subcategory: "Android Phones",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxQdVD_Usr96LGyauaIIGO6MLgKjYNMajHjes8AFu8Tw&s=10",
    ],
  },

  {
    id: 20,
    name: "iPhone",
    price: 35000,
    condition: "Used",
    category: "Phones & Tablets",
    subcategory: "iPhones",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeIGxehqAfdEv-PXAN-GH1IqTBYDGYU_ao5VnqhR9lcQ&s=10",
    ],
  },

  {
    id: 21,
    name: "Android Tablet",
    price: 12000,
    condition: "Used",
    category: "Phones & Tablets",
    subcategory: "Tablets",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Nosx381ykjChfsczIwpMBGXpxsXLQI9mX0_TyB0D9A&s=10",
    ],
  },

  {
    id: 22,
    name: "20,000mAh Power Bank",
    price: 1800,
    condition: "Gently used",
    category: "Phones & Tablets",
    subcategory: "Power Banks",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTECmVKdAss3SCynxFHcBH-NLywn3TWcrfnEZK5ax1XDg&s=10",
    ],
  },

  {
    id: 23,
    name: "USB-C Fast Charger",
    price: 900,
    condition: "New",
    category: "Phones & Tablets",
    subcategory: "Phone Accessories",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq_cxwH72Xj1zvuX_Z_tRt_1A-3SgYgEW0PKp90Nse0g&s",
    ],
  },

  {
    id: 24,
    name: "Casio fx-991ESPLUS Calculator",
    price: 1200,
    condition: "Used",
    category: "Calculators",
    subcategory: "Scientific Calculators",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMj2ovGJx9rKgueyBuGOZltrI1fIkBk9YaVLNxfRN6g&s=10",
    ],
  },

  {
    id: 25,
    name: "Casio FX-300ESPLUS2 Calculator",
    price: 1500,
    condition: "Used",
    category: "Calculators",
    subcategory: "Scientific Calculators",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7PGs8tEnfwHM3nSvtXN9o6JenOf3Ofw3thzaTb4oT_w&s=10",
    ],
  },

  {
    id: 26,
    name: "Graphing Calculator",
    price: 4500,
    condition: "Gently used",
    category: "Calculators",
    subcategory: "Graphing Calculators",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXp8q4pz_pjUedgstAvsx0ZiYWk0G-ZlR1B41EkqZVUw&s=10",
    ],
  },

  {
    id: 27,
    name: "Financial Calculator",
    price: 1800,
    condition: "Used",
    category: "Calculators",
    subcategory: "Financial Calculators",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS7NqNQHkCkwgiWN5YTwavrPEBAc0monBTFmlRZfcIlw&s=10",
    ],
  },

  {
    id: 28,
    name: "University Notebook Set",
    price: 250,
    condition: "New",
    category: "Stationery",
    subcategory: "Notebooks",
    images: [
      "https://img.drz.lazcdn.com/static/bd/p/fe1295db0c0a85127ba07efcf460305a.jpg_720x720q80.jpg",
    ],
  },

  {
    id: 29,
    name: "Pen Set",
    price: 120,
    condition: "New",
    category: "Stationery",
    subcategory: "Pens & Pencils",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLNu0XwNkt71WKQVmG3tm-4Tgxyf0Qvdzio4c225a2Ug&s=10",
    ],
  },

  {
    id: 30,
    name: "Engineering Drawing Set",
    price: 500,
    condition: "Used",
    category: "Stationery",
    subcategory: "Art Supplies",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLavbqcqUjRKo6QGrYeDDWzZFF8mjAJph0JuH7UJj-qQ&s=10",
    ],
  },

  {
    id: 31,
    name: "Document File Set",
    price: 180,
    condition: "New",
    category: "Stationery",
    subcategory: "Files & Folders",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXgD3cOGMr82Z0XOmZ8fZcFBEsiqE51Jf626BKCyaXw&s=10",
    ],
  },

  {
    id: 32,
    name: "Arduino Uno Kit",
    price: 1500,
    condition: "Used",
    category: "Lab & Engineering Tools",
    subcategory: "Electronics Components",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG9z03bT6_9ta1caEQJKtn3Vqe6v4bm8Xn7qMcw0aErA&s=10",
    ],
  },

  {
    id: 33,
    name: "Digital Multimeter",
    price: 1200,
    condition: "Used",
    category: "Lab & Engineering Tools",
    subcategory: "Engineering Tools",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa3b0NqrvEpAS3EzGltz0YQjz5JmpA9SuzO-W3WgpO8A&s=10",
    ],
  },

  {
    id: 34,
    name: "Physics Lab Equipment Set",
    price: 2000,
    condition: "Used",
    category: "Lab & Engineering Tools",
    subcategory: "Lab Equipment",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpDo2XhLMBUgbstP-X7uysaW3lTlnjBZAJYMA7699Lrg&s",
    ],
  },

  {
    id: 35,
    name: "Engineering Measurement Kit",
    price: 1000,
    condition: "Gently used",
    category: "Lab & Engineering Tools",
    subcategory: "Engineering Tools",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_UEdqHAdA-Nfo6KydnMdmpb6SnCL3k7yK-PUftMoYA&s=10",
    ],
  },

  {
    id: 36,
    name: "Storage Organizer",
    price: 800,
    condition: "Used",
    category: "Furniture",
    subcategory: "Organizer",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQES3NYgYY5_P6qtVUIs7zlcGEDoXvqa1hVIfinifgXow&s=10",
    ],
  },

  {
    id: 37,
    name: "Wireless Headphones",
    price: 1800,
    condition: "Used",
    category: "Gadgets & Accessories",
    subcategory: "Headphones & Earphones",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT9mLVhpk06g5l5JYR9SIoO22KmtMs2Iv_dMZCBGpeVg&s=10",
    ],
  },

  {
    id: 38,
    name: "Bluetooth Speaker",
    price: 1500,
    condition: "Used",
    category: "Gadgets & Accessories",
    subcategory: "Speakers",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiFsOMAcqiGVd0_t6OMg5kpKJyVnbrjh5HIyHtu-QhSQ&s=10",
    ],
  },

  {
    id: 39,
    name: "Smart Watch",
    price: 2500,
    condition: "Used",
    category: "Gadgets & Accessories",
    subcategory: "Smart Watches",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFItw4p3XTBKLp3T-vt0NBvkz2GExLbu3UGcdPe8x3A&s",
    ],
  },

  {
    id: 40,
    name: "USB Hub",
    price: 700,
    condition: "Gently used",
    category: "Gadgets & Accessories",
    subcategory: "USB Accessories",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxaExS4EMbHqtOfrWfgaQKU4kvaFcpv1DoP-7NLv8RDg&s=10",
    ],
  },

  {
    id: 41,
    name: "MacBook",
    price: 55000,
    condition: "Used",
    category: "Laptops and Computers",
    subcategory: "MacBooks",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST65EeRwmQ6eJPPwxxDUHsElbq2OaAvAF0HQRuqUcAgQ&s=10",
    ],
  },

  {
    id: 42,
    name: "Earphone",
    price: 200,
    condition: "Used",
    category: "Gadgets & Accessories",
    subcategory: "Headphones & Earphones",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGw0PW82GE3nIs3I2BOjFALpSiY7qMYFA6cxcTSZEK3w&s",
    ],
  },
];

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}