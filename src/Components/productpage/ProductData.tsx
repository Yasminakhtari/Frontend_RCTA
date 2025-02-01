export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    courseId:number;
    groups:string;
  }
  
  export const productData: Product[] = [];
  
  