export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
  }
  
  export const productData: Product[] = [
    {
      id: 1,
      name: "Racket",
      price: 49.99,
      image: "./public/racket.png",
      description: "High-quality racket suitable for professional gaming.",
      category: "Gaming Accessories",
    },
    {
      id: 2,
      name: "Ball",
      price: 29.99,
      image: "./public/ball.png",
      description: "Durable ball designed for multiple gaming purposes.",
      category: "Gaming Accessories",
    },
    {
      id: 3,
      name: "Gloves",
      price: 19.99,
      image: "./public/gloves.png",
      description: "Comfortable and durable gloves for gaming sessions.",
      category: "Gaming Accessories",
    },
    {
      id: 4,
      name: "Shoes",
      price: 69.99,
      image: "./public/shoes.png",
      description: "Lightweight and supportive shoes for athletes.",
      category: "Sports Equipment",
    },
  ];
  
  